from flask import Flask
from importlib_metadata import metadata

from config import env_config


from flask_sqlalchemy  import SQLAlchemy

from flask_migrate import Migrate
from sqlalchemy import MetaData

conventions = {

    "ix": 'ix_%(column_0_label)s',
    "uq": "uq_%(table_name)s_%(column_0_name)s",
    "ck": "ck_%(table_name)s_%(constraint_name)s",
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
    "pk": "pk_%(table_name)s"
}

metadata = MetaData(naming_convention=conventions)

db = SQLAlchemy(metadata=metadata)

migrate = Migrate()

def create_app(config):

    app = Flask(__name__)

    app.config.from_object(env_config[config])

    env_config[config].init_app(app)

    db.init_app(app = app)

    # render_as_batch serves as a workaround for the alter error in sqlite databases
    migrate.init_app(app = app, db = db, render_as_batch = True)

    return app
