# src/models/PostingModel.py

import datetime
from marshmallow import fields, Schema
from . import db
from sqlalchemy import desc # allows sorting sqlalchemy query
# from pytz import timezone

# eastern = timezone('US/Eastern')

class PostingModel(db.Model):

    """
    Posting Model
    """

    # table name
    __tablename__ = 'postings'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(128), nullable=False)
    desc = db.Column(db.String(250))
    room = db.Column(db.String(50))
    building = db.Column(db.String(128), nullable=False)
    created_at = db.Column(db.DateTime)
    diet = db.Column(db.ARRAY(db.Integer))
    feeds = db.Column(db.Integer)

    def __init__(self,data):
        self.title = data.get('title')
        self.desc = data.get('desc')
        self.room = data.get('room')
        self.building = data.get('building')
        self.created_at = datetime.datetime.now() # eastern later...
        self.diet = data.get('diet')
        self.feeds = data.get('feeds')

    ## serialize might be useful for returning json objects

    def save(self):
        db.session.add(self)
        db.session.commit()
    
    def update(self, data):
        for key, item in data.items():
            print("hit update with key: ", key)
            setattr(self, key, item)
        db.session.commit()
    
    def delete(self):
        db.session.delete(self)
        db.session.commit()


    @staticmethod
    def get_all_postings():
        return PostingModel.query.order_by(desc(PostingModel.created_at)).all()

    @staticmethod
    def get_one_post(postid):
        return PostingModel.query.filter_by(id=postid)
    
    def __repr(self):
        return '<id {}>'.format(self.id)


class PostingSchema(Schema):
  """
  Posting Schema
  """
  id = fields.Int(dump_only=True)
  title = fields.Str()
  desc = fields.Str()
  room = fields.Str()
  building = fields.Str()
  created_at = fields.DateTime()
  diet = fields.List(fields.Int)
  feeds = fields.Int()

  
