# src/models/UserModel.py

from marshmallow import fields, Schema
from . import db
from .PostingModel import PostingSchema

class UserModel(db.Model):
    """
    User Model
    """

    #table name
    __tablename__ = 'users'

    netid = db.Column(db.String(20), primary_key=True)
    posts = db.relationship('PostingModel', backref='posts')

    def __init__(self, data):
        self.netid = data.get('netid')
    
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
    def get_all_users():
        return UserModel.query.all()
    
    @staticmethod
    def get_user_posts(netid):
        return ""

class UserSchema(Schema):
    netid = fields.Str()
    posts = fields.Nested(PostingSchema, many=True)

        
