from flask import request, json, Response, Blueprint, jsonify
from ..CASClient import CASClient
from ..models.UserModel import UserModel, UserSchema
import requests


user_api = Blueprint('user', __name__)
user_schema = UserSchema()
URL = 'https://freat.herokuapp.com/api/v1/posting/'

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

@user_api.route('/updateGoing/<string:netid>', methods=['POST'])
def updateGoing(netid):
  """
  Update that this user has clicked going
  """
  postid = request.get_json()['postid'] # does this work?
  user = UserModel.get_user_byNetId(netid)
  data = user_schema.dump(user, many=True) # get all this user's data
  if (len(data) == 0):
    return custom_response({'error': 'user not found'}, 404)

  try:
    posts_going = data[0]['posts_going']
    
    if postid in posts_going:
      # removals
      posts_going.remove(postid)
      new_url = URL + 'removeGoing/' + str(postid)
      requests.post(url = new_url)

    else:
      # additions
      posts_going.append(postid)
      new_url = URL + 'addGoing/' + str(postid)
      requests.post(url = new_url)

    data = {'posts_going': posts_going} # the new postid array
    user[0].update(data) 
    data = user_schema.dump(user)
    return custom_response(data, 201)

  except Exception as err:
    return custom_response({'message': err}, 400)

@user_api.route('/addUserGoing/<string:netid>', methods=['POST'])
def addGoing(netid):
  """
  add postid to show a user's going
  """

  # will get sent an int (the postid)
  postid = request.get_json() # does this work??
  print("Pineapple1 ", postid) # idk what format this will be in.
  user = UserModel.get_user_byNetId(netid)
  data = user_schema.dump(user, many=True) # get all this user's data

  if (len(data) == 0):
    return custom_response({'error': 'user not found'}, 404)

  try:
    print("DEBUG_USER_ROUTE_ADD: ", data[0]['posts_going'])
    posts_going = data[0]['posts_going']
    posts_going.append(postid)
    data = {'posts_going': posts_going} # the new postid array
    user[0].update(data) 
    data = user_schema.dump(user)
    return custom_response(data, 201)

  except Exception as err:
    return custom_response({'message': err}, 400)

@user_api.route('/removeUserGoing/<string:netid>', methods=['POST'])
def removeGoing(netid):
  """
  remove postid to show a user's not going anymore
  """

  # will get sent an int (the postid)
  postid = request.get_json() # does this work??
  print("Pineapple2 ", postid) # idk what format this will be in.
  user = UserModel.get_user_byNetId(netid)
  data = user_schema.dump(user, many=True) # get all this user's data

  if (len(data) == 0):
    return custom_response({'error': 'user not found'}, 404)

  try:
    print("DEBUG_USER_ROUTE_REMOVE: ", data[0]['posts_going'])
    posts_going = data[0]['posts_going']
    posts_going.remove(postid) # remove that postid
    data = {'posts_going': posts_going} # the new postid array
    user[0].update(data) 
    data = user_schema.dump(user)
    return custom_response(data, 201)

  except Exception as err:
    return custom_response({'message': err}, 400)


def custom_response(res, status_code):
  """
  Custom Response Function
  """
  return Response(
    mimetype="application/json",
    response=json.dumps(res),
    status=status_code
  )

