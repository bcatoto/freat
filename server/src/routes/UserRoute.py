from flask import request, json, Response, Blueprint, jsonify
from ..CASClient import CASClient
from ..models.UserModel import UserModel, UserSchema


user_api = Blueprint('user', __name__)

@user_api.route('/getCurrentUser', methods=['GET'])
def getUsername():
  """
  Get CAS username
  """
  username = CASClient().authenticate().rstrip() 
  ## check is user is already in users table, if not add to table
  if not UserModel.get_user_byNetId(username):
      print("added new user "+ username)
      user = UserModel({"netid":username})
      user.save()
  return custom_response({'netid': username}, 200)

# @user_api.route('/', methods=['POST'])
# def newUser():


def custom_response(res, status_code):
  """
  Custom Response Function
  """
  return Response(
    mimetype="application/json",
    response=json.dumps(res),
    status=status_code
  )

