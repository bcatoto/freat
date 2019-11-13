from flask import Flask,request, Response, json, render_template
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS,cross_origin
import os

from .config import app_config
from .models import db
from .routes.PostingRoute import posting_api as posting_blueprint
from .models.PostingModel import PostingModel, PostingSchema

def create_app(env_name):
  """
  Create app
  """

  # app initiliazation
  app = Flask(__name__, static_folder='./../../client/build/static',
    template_folder='./../../client/build')

  app.config.from_object(app_config[env_name])

  db.init_app(app)

  app.register_blueprint(posting_blueprint, url_prefix='/api/v1/posting')

  posting_schema = PostingSchema()


  @app.route('/', methods=['GET'])

  def index():
    """
    example endpoint
    """
    return render_template('index.html')

  # # take care of new posts
  # @app.route('/', methods=['POST'])
  # def add_post():
  #   # check if this posting is valid: do we need to verify userid?

  #   # get all the information
  #   title = request.form.get('title')
  #   room = request.form.get('room')
  #   building = request.form.get('building')
  #   description = request.form.get('description')
  #   diet = request.form.get('diet')
  #   feeds = request.form.get('feeds')
  #   userid = request.form.get('userid') # ? userid doesn't show up in PostingModel 

  #   # add a row to the postings table
  #   new_post = PostingModel(title=title, desc=description, room=room, building=building, diet=diet, feeds=feeds)
  #   db.session.add(new_post)
  #   db.session.commit()

  #   # still same html file
  #   return render_template('index.html')



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