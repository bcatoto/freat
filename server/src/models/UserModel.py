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
        self.posts_going = data.get('posts_going')
    
    def save(self):
        db.session.add(self)
        db.session.commit()
    
    def update(self, data):
        for key, item in data.items():
            setattr(self, key, item)
        db.session.commit()
    
    def delete(self):
        db.session.delete(self)
        db.session.commit()
    
    @staticmethod
    def get_all_users():
        return UserModel.query.all()
    
    def get_user_byNetId(value):
        return bool(UserModel.query.filter_by(netid=value).first())

    

class UserSchema(Schema):
    """
    User Schema
    """
    netid = fields.Str()
    posts = fields.Nested(PostingSchema, many=True)

        
