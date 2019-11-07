from flask import Flask,request
from flask_sqlalchemy import SQLAlchemy
import os

from .config import app_config
from .models import db
from .routes.PostingRoute import posting_api as posting_blueprint
def create_app(env_name):
  """
  Create app
  """
  
  # app initiliazation
  app = Flask(__name__)

  app.config.from_object(app_config[env_name])

  db.init_app(app)

  app.register_blueprint(posting_blueprint, url_prefix='/api/v1/posting')
  
  @app.route('/', methods=['GET'])
  def index():
    """
    example endpoint
    """
    return 'Congratulations! Your first endpoint is workin'

  return app