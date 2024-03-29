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

    REDIS_HOST = os.environ.get("REDIS_HOST") or "redis"

    REDIS_PORT = 6379

    REDIS_PASSWORD = os.environ.get("REDIS_PASSWORD")

    debug = True

    @staticmethod
    def init_app(app):

        pass


class Development(Config):

    SQLALCHEMY_DATABASE_URI = os.environ.get("DATABASE_URL") or \
        "sqlite:///" + os.path.join(basedir, "dev-data.sqlite")

    REDIS_HOST = "127.0.0.1"
    REDIS_PORT = 6379
    REDIS_PASSWORD = os.environ.get("DEV_REDIS_PASSWORD")

    MAIL_SUPPRESS_SEND = False

    @staticmethod
    def init_app(app):

        pass


class Testing(Config):

    TESTING = True

    REDIS_HOST = "127.0.0.1"

    REDIS_PORT = 6379

    REDIS_PASSWORD = os.environ.get("DEV_REDIS_PASSWORD")

    SQLALCHEMY_DATABASE_URI = (
        "sqlite:///" + os.path.join(basedir, "test-data.sqlite"))

    MAIL_DEFAULT_SENDER = "testing@testing.com"

    @staticmethod
    def init_app(app):

        pass


class RemoteTesting(Testing):

    REDIS_HOST = "redis"

    REDIS_PASSWORD = os.environ.get("REDIS_PASSWORD")

    @staticmethod
    def init_app(app):

        pass


class Production(Config):

    DATABASE_USER = os.environ.get("MARIADB_USER")

    DATABASE_PASSWORD = os.environ.get("MARIADB_PASSWORD")

    DATABASE_NAME = os.environ.get("MARIADB_DATABASE")
    
    SQLALCHEMY_DATABASE_URI = "mysql+pymysql://{0}:{1}@database/{2}".format(
        DATABASE_USER,
        DATABASE_PASSWORD,
        DATABASE_NAME
    )

    @staticmethod
    def init_app(app):

        pass


env_config = {

    "development": Development,
    "default": Development,
    "production": Production,
    "testing": Testing,
    "remote_testing": RemoteTesting,
}
