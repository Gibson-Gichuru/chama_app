from app import create_app
from app.models import User, Role
from app.schema import RegiserSchema
import click
import os

app = create_app(os.environ.get("FLASK_ENV") or "default")

# application shell context

@app.shell_context_processor
def make_shell_context():

    return dict(

        app = app, 
        User =User, 
        Role = Role, 
        RegiserSchema = RegiserSchema
        
        )


# custom commands

@app.cli.command()
def test():

    import unittest

    tests = unittest.TestLoader().discover('tests')
    unittest.TextTestRunner(verbosity = 2).run(tests)

