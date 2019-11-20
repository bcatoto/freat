from flask import Flask,request, Response, json, render_template
from flask_sqlalchemy import SQLAlchemy
# from flask_cas import CAS
# from flask_cas import login_required
from pprint import pprint

import os

from .config import app_config
from .models import db
from .routes.PostingRoute import posting_api as posting_blueprint
from .models.PostingModel import PostingModel, PostingSchema

from .CASClient import CASClient

def create_app(env_name):
  """
  Create app
  """

  # app initiliazation
  app = Flask(__name__, static_folder='./../../build/static',
    template_folder='./../../build')

  app.secret_key = b'\xcdt\x8dn\xe1\xbdW\x9d[}yJ\xfc\xa3~/'
  # CAS Authentication setup
  # cas = CAS(app, '/cas')
  # app.config['CAS_SERVER'] = 'https://fed.princeton.edu/cas/' 
  # app.config['CAS_AFTER_LOGIN'] = 'index'

  app.config.from_object(app_config[env_name])

  db.init_app(app)

  app.register_blueprint(posting_blueprint, url_prefix='/api/v1/posting')

  posting_schema = PostingSchema()


  @app.route('/', methods=['GET'])

  def index():
    """
    example endpoint
    """
    username = CASClient().authenticate()
    print(username)
    # pprint(vars(cas._app))
    # print(cas.username)
    
    # print(cas.attributes)
    
    return render_template('index.html')

  @app.route('/logout')
  def casLogout():
    """
    logout from cas
    """
    CASClient().logout()

  #@cross_origin(supports_credentials=True)
  @app.route('/test', methods=['GET'])
  def getPostings():
    """
    Get all the available postings
    """
    posts = PostingModel.get_all_postings()
    data = posting_schema.dump(posts, many=True)
    print(data)
    return custom_response(data, 200)

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
