from app import create_app
from app.models import User, Role
from app.schema import RegisterSchema
from werkzeug.exceptions import HTTPException
from flask import json
import os
import sys

app = create_app(os.environ.get("FLASK_ENV") or "default")

# Make all HTTPExceptions return json reponse
@app.errorhandler(HTTPException)
def handle_exception(e):

    response = e.get_response()

    response.data = json.dumps({
        "code": e.code,
        "name": e.name,
        "description": e.description
    })

    response.content_type = "application/json"

    return response


@app.shell_context_processor
def make_shell_context():

    return dict(
        app=app,
        User=User,
        Role=Role,
        RegisterSchema=RegisterSchema)


# custom commands


@app.cli.command()
def test():

    import unittest

    tests = unittest.TestLoader().discover('tests')
    results = unittest.TextTestRunner(verbosity=2).run(tests)

    if not results.wasSuccessful():

        sys.exit(1)


@app.cli.command()
def deploy():

    from flask_migrate import upgrade

    from app.models import Role
    # Run all the database migrations
    
    upgrade()

    Role.register_roles()
