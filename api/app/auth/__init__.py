from flask import Blueprint

auth_blueprint = Blueprint("auth", __name__,)

from . import views

auth_blueprint.add_url_rule(
    "/register", 
    view_func=views.RegisterUser.as_view('register')
    )