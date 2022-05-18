import os

basedir = os.path.abspath(os.path.dirname(__file__))


class Config:

    debug = True

    port = 5000

    host = "0.0.0.0"

    @staticmethod
    def init_app(app):

        pass


class Development(Config):

    @staticmethod
    def init_app(app):

        pass


class Testing(Config):

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

}