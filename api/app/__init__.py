from flask import Flask

from config import env_config

from flask_sqlalchemy import SQLAlchemy

from flask_marshmallow import Marshmallow

from flask_mail import Mail

from flask_migrate import Migrate

from sqlalchemy import MetaData

from redis import Redis

conventions = {

    "ix": 'ix_%(column_0_label)s',
    "uq": "uq_%(table_name)s_%(column_0_name)s",
    "ck": "ck_%(table_name)s_%(constraint_name)s",
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
    "pk": "pk_%(table_name)s"
}

meta_data = MetaData(naming_convention=conventions)

db = SQLAlchemy(metadata=meta_data)

ma = Marshmallow()

migrate = Migrate()

mail = Mail()


def create_app(config):

    app = Flask(__name__)

    app.config.from_object(env_config[config])

    env_config[config].init_app(app)

    app.redis = Redis(
        host=app.config.get("REDIS_HOST"),
        port=app.config.get("REDIS_PORT"),
        password=app.config.get("REDIS_PASSWORD")
    )

    db.init_app(app=app)

    """
    render_as_batch serves as a workaround
    for the alter error in sqlite databases
    """
    migrate.init_app(app=app, db=db, render_as_batch=True)

    ma.init_app(app=app)

    mail.init_app(app=app)
    # Registering Application BluePrints

    from .auth import auth_blueprint

    app.register_blueprint(blueprint=auth_blueprint, url_prefix="/api/auth/")

    return app
