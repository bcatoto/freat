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


@user_api.route('/addUserGoing/<string:netid>', methods=['POST'])
def addGoing(netid):
  """
  add postid to show a user's going
  """

  # will get sent an int (the postid)
  postid = request.get_json()

  user = UserModel.get_user_byNetId(netid)

  try:
    print("DEBUG_USER_ROUTE: ", user['posts_going'])
    user['posts_going'].append(postid) # append the new postid to the array
    data = user['posts_going']
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

