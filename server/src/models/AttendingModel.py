from marshmallow import fields, Schema
from . import db

class AttendingModel(db.Model):
    """
    Attending Model
    """

    #table name
    __tablename__ = 'attendings'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.String(20), db.ForeignKey('users.netid'), nullable = False)
    post_id = db.Column(db.Integer, db.ForeignKey('postings.id'), nullable = False)

    def __init__(self, data):
        self.user_id = data.get('user_id')
        self.post_id = data.get('post_id')
    
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
    def get_going_num(value):
        return AttendingModel.query.filter_by(post_id=value).count()
    
    @staticmethod
    def get_user_going_posts(netid):
        return AttendingModel.query.filter_by(user_id=netid).all()
    
    @staticmethod
    def get_single_attending(netid, postid):
        return AttendingModel.query.filter_by(user_id=netid, post_id=postid).first()

class AttendingSchema(Schema):
    """
    Attending Schema
    """
    user_id = fields.Str()
    post_id = fields.Int()
