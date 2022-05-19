from app import create_app
import click
import os

app = create_app(os.environ.get("FLASK_ENV") or "default")

# application shell context

@app.shell_context_processor
def make_shell_context():

    return dict(app = app)


# custom commands

@app.cli.command()
def test():

    import unittest

    tests = unittest.TestLoader().discover('tests')
    unittest.TextTestRunner(verbosity = 2).run(tests)

