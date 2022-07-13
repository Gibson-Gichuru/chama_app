
from flask.views import MethodView
from flask import request, jsonify, current_app, abort, render_template

from app.models import User
from app.schema import RegisterSchema

from flask_httpauth import HTTPBasicAuth, HTTPTokenAuth

basic_auth = HTTPBasicAuth()

token_auth = HTTPTokenAuth()



# basic authentication callback function

@basic_auth.verify_password
def verify_user_password(email, password):

    user = User.query.filter_by(email = email).first()

    if user is None or not user.check_password(password):

        return None

    return user


# token authentication callback function

@token_auth.verify_token
def verify_user_token(token):

    jwt = User.validate_token(token, current_app.config['REFRESH_KEY'])
    if not jwt:

        return None

    return User.query.get(jwt['sub'])



class RegisterUser(MethodView):

    def post(self):

        request_data = request.get_json()

        schema = RegisterSchema()

        errors = schema.validate(request_data)

        if errors:

            return jsonify({ 
                "errors":errors
            }), 400

        user = User(
            username=request_data['username'],
            email = request_data['email'],
        )

        user.password = request_data['password']

        user.add(user)

        return jsonify({

            "message":{
                "status":"success",
                "text":"account created!"
            }

        }), 200

class Login(MethodView):

    @basic_auth.login_required
    def get(self):

        current_user = basic_auth.current_user()

        if not  current_user.active:

            return abort(403, description = "Account not activated")

        tokens = current_user.get_access_refresh_token()

        current_app.redis.hmset(

            f"{current_user.username}:tokens",
            {
                "refresh":tokens[1],
                "access":tokens[0]
            }
        )


        return jsonify({

            "message":{

                "status":"success",
                "text":f"Login sucessful {current_user.username}"
            },

            "tokens":{
                "access": tokens[0],
                "refresh":tokens[1]
            }
        })

class Tokens(MethodView):

    @token_auth.login_required
    def post(self):

        current_user = token_auth.current_user()

        if not current_user.active:

            return abort(401)

        request_data = request.get_json()

        # check if the current_user refresh token is cached

        cached_access_token = current_app.redis.hmget(
            f"{current_user.username}:tokens",
            ['access']
        )

        if not current_app.redis.hexists(f"{current_user.username}:tokens", "refresh") or \
            cached_access_token[0].decode('utf-8') != request_data['access']:

            return abort(401)

        # generate some new access token and update the cache

        new_access_token = current_user.get_access_token()

        current_app.redis.hmset(
            f"{current_user.username}:tokens",
            {
                "access": new_access_token
            }
        )

        return jsonify(

            {
                "message": {
                    "status":"success",
                    "text":"token generated"
                },

                "access": new_access_token
            }
        )


class ConfirmAccount(MethodView):

    def get(self, token):

        if User.activate(token= token):

            return jsonify(

                {
                    'message':{
                        "status":"success",
                        "text":"account now confirmed"
                    }
                }
            )

        return jsonify(

                {
                    'message':{
                        "status":"fail",
                        "text":"account not confirmedd"
                    }
                }
            ), 400