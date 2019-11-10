# /run.py
import os
from flask import Flask
from flask_cors import CORS,cross_origin
 

from src.app import create_app

# env_name = os.getenv('FLASK_ENV')
app = create_app('production')

if __name__ == '__main__':
  # run app
  app.run()