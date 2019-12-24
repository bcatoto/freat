from flask import Flask, request, Response, json, render_template, session
from flask_sqlalchemy import SQLAlchemy
# from flask_cas import CAS
# from flask_cas import login_required
from pprint import pprint

import os

from .config import app_config
from .models import db
from .routes.PostingRoute import posting_api as posting_blueprint
from .routes.UserRoute import user_api as user_blueprint
from .routes.AttendingRoute import attending_api as attending_blueprint
from .models.PostingModel import PostingModel, PostingSchema
from .models.UserModel import UserModel, UserSchema


from .CASClient import CASClient

def create_app(env_name):
  """
  Create app
  """

  # app initiliazation
  app = Flask(__name__, static_folder='./../../build/static',
    template_folder='./../../build')

  app.secret_key = b'\xcdt\x8dn\xe1\xbdW\x9d[}yJ\xfc\xa3~/'
  app.config.from_object(app_config[env_name])

  # db.init_app(app)

  # adding all routes to main route
  app.register_blueprint(posting_blueprint, url_prefix='/api/v1/posting')
  app.register_blueprint(user_blueprint, url_prefix='/api/v1/user')
  app.register_blueprint(attending_blueprint, url_prefix='/api/v1/attendance')

  posting_schema = PostingSchema()


  @app.route('/')
  def index():
    """
    example endpoint
    """
    return render_template('index.html')

  @app.route('/home')
  @app.route('/profile')
  def home():
    """
    example endpoint
    """
    CASClient().authenticate()
    return render_template('index.html')

  @app.route('/logout')
  def casLogout():
    """
    logout from cas
    """
    session.clear()
    CASClient().logout()

  def custom_response(res, status_code):
    """
    Custom Response Function
    """
    return Response(
      mimetype="application/json",
      response=json.dumps(res),
      status=status_code
    )

  return app
