# /run.py
import os
from flask import Flask
from flask_cors import CORS,cross_origin
 

from src.app import create_app

if __name__ == '__main__':
  env_name = os.getenv('FLASK_ENV')
  
  app = create_app(env_name)
  # app = Flask(__name__)
  # CORS(app, support_credentials=True)

  # @app.route('/test')
  # @cross_origin(supports_credentials=True)
  # def tets():
  #   return 'this is working'
  # run app
  app.run()