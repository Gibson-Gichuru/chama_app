from flask import Flask

from config import env_config

from flask_sqlalchemy  import SQLAlchemy

from flask_migrate import Migrate

db = SQLAlchemy()

migrate = Migrate()

def create_app(config):

    app = Flask(__name__)

    app.config.from_object(env_config[config])

    env_config[config].init_app(app)

    db.init_app(app = app)

    migrate.init_app(app = app, db = db)

    return app
