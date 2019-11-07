import os

class Development(object):
    """
    Development envrionment configuration
    """
    DEBUG = True
    TESTING = False
    SECRET_KEY = 'something'
    SQLALCHEMY_DATABASE_URI = os.environ['DATABASE_URL']

class Production(object):
    """
    Production environment configurations
    """
    DEBUG = False
    TESTING = False
    SQLALCHEMY_DATABASE_URI = os.environ['DATABASE_URL']
    JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY')

app_config = {
    'development': Development,
    'production': Production,
}