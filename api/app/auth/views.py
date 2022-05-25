from email import message
from ntpath import join
from flask.views import MethodView
from flask import request, jsonify

from app.models import User
from app.schema import RegiserSchema

from app import db

class RegisterUser(MethodView):

    def post(self):

        request_data = request.get_json()

        schema = RegiserSchema()

        errors = schema.validate(request_data)

        if errors:

            return jsonify({
                "message": {
                    "status": "fail",
                    "text":"No data passed!"
                }
            }), 400

        user = User(
            username=request_data['username'],
            email = request_data['email'],
        )

        user.password = request_data['password']

        db.session.add(user)

        db.session.commit()

        tokens = user.get_access_refresh_token()

        return jsonify({

            "message":{
                "status":"success",
                "text":"account created!"
            },

            "tokens": {

                "refresh":tokens[1],
                "access":tokens[0],
            }

        }), 200


        # data validation 

        
        return "something good  is cooking!"


