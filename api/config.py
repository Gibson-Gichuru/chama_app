import os

basedir = os.path.abspath(os.path.dirname(__file__))


class Config:

    SQLALCHEMY_TRACK_MODIFICATIONS = False

    debug = True

    port = 5000

    host = "0.0.0.0"

    DATABASE_NAMEING_CONVENTIONS = {

        "ix": 'ix_%(column_0_label)s',
        "uq": "uq_%(table_name)s_%(column_0_name)s",
        "ck": "ck_%(table_name)s_%(constraint_name)s",
        "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
        "pk": "pk_%(table_name)s"
    }

    @staticmethod
    def init_app(app):

        pass


class Development(Config):

    SQLALCHEMY_DATABASE_URI = os.environ.get("DATABASE_URL") or "sqlite:///"+ os.path.join(basedir, "dev-data.sqlite")

    @staticmethod
    def init_app(app):

        pass


class Testing(Config):

    TESTING = True

    SQLALCHEMY_DATABASE_URI = os.environ.get("DATABASE_URL") or "sqlite:///"+ os.path.join(basedir, "test-data.sqlite")

    @staticmethod
    def init_app(app):

        pass


class Production(Config):

    @staticmethod
    def init_app(app):

        pass



env_config = {

    "development": Development,
    "default": Development,
    "production": Production,
    "testing":Testing
}