from flask.views import MethodView

from flask import request, jsonify, current_app, abort

from app.models import User

from app.schema import RegisterSchema

from flask_httpauth import HTTPBasicAuth, HTTPTokenAuth

from app.email import send_email

basic_auth = HTTPBasicAuth()

token_auth = HTTPTokenAuth()


@basic_auth.verify_password  # basic auth call back function
def verify_user_password(email, password):

    user = User.query.filter_by(email=email).first()

    if user is None or not user.check_password(password):

        return None

    return user


@basic_auth.error_handler
def basic_auth_error(status):

    abort(status, description="Invalid username or password")


@token_auth.verify_token  # Auth authentication callback function
def verify_user_token(token):

    jwt = User.validate_token(token, current_app.config['REFRESH_KEY'])
    if not jwt:

        return None

    return User.query.get(jwt['sub'])


@token_auth.error_handler
def token_auth_error(status):

    abort(status, description="Invalid or expired token used")


class RegisterUser(MethodView):

    def post(self):

        request_data = request.get_json()

        schema = RegisterSchema()

        errors = schema.validate(request_data)

        if errors:

            return jsonify({
                "errors": errors
            }), 400

        user = User(
            username=request_data['username'],
            email=request_data['email'],
        )

        user.password = request_data['password']

        user.origin_url = request_data['remote_url']

        user.add(user)

        return jsonify({
            "message": {
                "status": "success",
                "text": "account created!"
            }

        }), 200


class Login(MethodView):

    @basic_auth.login_required
    def get(self):

        current_user = basic_auth.current_user()

        if not current_user.active:

            return abort(403, description="Account not activated")

        tokens = current_user.get_access_refresh_token()

        current_app.redis.hmset(

            f"{current_user.username}:tokens",
            {
                "refresh": tokens[1],
                "access": tokens[0]
            }
        )

        return jsonify({

            "message": {
                "status": "success",
                "text": f"Login sucessful {current_user.username}"
            },

            "tokens": {
                "access": tokens[0],
                "refresh": tokens[1]
            }
        })


class Tokens(MethodView):

    @token_auth.login_required
    def post(self):

        current_user = token_auth.current_user()

        if not current_user.active:

            abort(403, description="Account not activated")

        request_data = request.get_json()

        # check if the current_user refresh token is cached

        cached_access_token = current_app.redis.hmget(
            f"{current_user.username}:tokens",
            ['access']
        )[0].decode('utf-8')

        refresh_exits = current_app.redis.hexists(
            f"{current_user.username}:tokens", "refresh"
            )

        if not refresh_exits or cached_access_token != request_data['access']:

            abort(401, description="Invalid or expired token used")

        # generate some new access token and update the cache

        new_access_token = current_user.get_access_token()

        current_app.redis.hmset(
            f"{current_user.username}: tokens",
            {
                "access": new_access_token
            }
        )

        return jsonify(

            {
                "message": {
                    "status": "success",
                    "text": "token generated"
                },

                "access": new_access_token
            }
        )


class ConfirmAccount(MethodView):

    def get(self, token):

        if User.activate(token=token):

            return jsonify({'message': "account now confirmed"})

        abort(400, description="invalid or expired activation token")


class NewActivationLink(MethodView):

    @basic_auth.login_required
    def post(self):

        request_data = request.get_json()

        current_user = basic_auth.current_user()

        send_email(
                current_user.email,
                "Account Confirmation",
                "email",
                username=current_user.username,
                token=current_user.generate_activation_token(),
                host_name=f"{request_data['remote_url']}account/confirm"
            )

        return jsonify({
            "message":"Success"
        }), 200


class ResetPassword(MethodView):

    def get(self):

        user_email = request.args.get("email")
        
        remote_url = request.args.get("remote_url")

        user = User.query.filter_by(email=user_email).first()

        if user is None:

            abort(404, description=f"No account regesterd with {user_email}")

        send_email(
            user.email,
            "Password reset",
            "email",
            username=user.username,
            token=user.generate_password_reset_token(),
            host_name=f"{remote_url}reset/password"
        )

        return jsonify({
            "message":f"Password reset link sent to {user_email}"
        })

    def post(self):

        request_data = request.get_json()

        if request_data is None:

            abort(400)
            
        jwt = User.validate_token(
            request_data['token'],
            current_app.config.get("SECRET_KEY")
        )

        if jwt is None:

            abort(401)

        user = User.query.get(jwt['sub'])

        user.password = request_data['password']

        user.update()

        return jsonify({
            "message":"Password reset successful"
        }),200
