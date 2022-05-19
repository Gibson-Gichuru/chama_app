import os

basedir = os.path.abspath(os.path.dirname(__file__))


class Config:

    SQLALCHEMY_TRACK_MODIFICATIONS = False

    debug = True

    port = 5000

    host = "0.0.0.0"

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