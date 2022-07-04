from flask import Blueprint

auth_blueprint = Blueprint("auth", __name__,)

from . import views, errors

auth_blueprint.add_url_rule(
    "/register", 
    view_func=views.RegisterUser.as_view('register')
    )

auth_blueprint.add_url_rule(
    '/login',
    view_func=views.Login.as_view('login')
)

auth_blueprint.add_url_rule(

    "/token/renew",
    view_func= views.Tokens.as_view('token')

)

auth_blueprint.add_url_rule(
    "/account/confirmation/<string:token>",
    view_func = views.ConfirmAccount.as_view("account_confirmation")
)
