import os

basedir = os.path.abspath(os.path.dirname(__file__))


class Config:

    SQLALCHEMY_TRACK_MODIFICATIONS = False

    SECRETE_KEY = os.environ.get("SECRETE_KEY")

    TOKEN_ALGO = os.environ.get("TOKEN_ALGO")

    MAIL_SUBJECT_PREFIX = "Chama App"

    MAIL_SENDER = os.environ.get("MAIL_SENDER")

    MAIL_SERVICE = os.environ.get("MAIL_SERVICE")

    MAIL_USERNAME = os.environ.get("MAIL_USERNAME")

    MAIL_PASSWORD = os.environ.get("MAIL_PASSWORD")

    MAIL_PORT = os.environ.get("MAIL_PORT")

    MAIL_USE_TLS = True 

    


    debug = True

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