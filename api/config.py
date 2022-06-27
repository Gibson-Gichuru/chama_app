import os

basedir = os.path.abspath(os.path.dirname(__file__))


class Config:

    # SQLAlchemy Config SetUp

    SQLALCHEMY_TRACK_MODIFICATIONS = False

    SECRET_KEY = os.environ.get("SECRET_KEY")

    ACTIVATION_KEY = os.environ.get("ACTIVATION_KEY")

    ACCESS_KEY = os.environ.get("ACCESS_KEY")

    REFRESH_KEY = os.environ.get("REFRESH_KEY")

    TOKEN_ALGO = os.environ.get("TOKEN_ALGO")

    # Flask Mail Config Set Up

    MAIL_SUBJECT_PREFIX = "Chama App"

    MAIL_SENDER = os.environ.get("MAIL_SENDER") 

    MAIL_SERVER = os.environ.get("MAIL_SERVER")

    MAIL_USERNAME = os.environ.get("MAIL_USERNAME")

    MAIL_PASSWORD = os.environ.get("MAIL_PASSWORD")

    MAIL_PORT = 587

    MAIL_USE_TLS = True

    MAIL_USE_SSL=False


    # Redis Configs SetUp

    REDIS_HOST = os.environ.get("REDIS_HOST") or "redis"
    REDIS_PORT =  6379 
    REDIS_PASSWORD = os.environ.get("REDIS_PASSWORD")

    


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