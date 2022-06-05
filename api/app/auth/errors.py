from views import basic_auth, token_auth

from auth import auth_blueprint

from flask import jsonify


@auth_blueprint.errorhandler(404)
def not_found(error):

    return jsonify(
        {
            "message": "resourse not found"
        }
    ), 404

@auth_blueprint.errorhandler(405)
def method_not_allowed(error):

    return jsonify(
        {
            "message":"method not allowed"
        }
    ), 405

@basic_auth.error_handler
def basic_auth_error(status):

    return jsonify({
        "message":{
            "status":"failed",
            "text":"access denied"
        }
    }), status

@token_auth.error_handler
def token_auth_error(status):

    return jsonify({
        "message":{
            "status":"failed",
            "text":"access denied"
        }
    }), status