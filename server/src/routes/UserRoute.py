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


@user_api.route('/addUserGoing', methods=['POST'])
def addGoing():
  """
  add postid to show a user's going
  """

  try 


  

  return custom_response({'netid': username}, 201)


  ////

req_data = request.get_json()

  post = PostingModel.get_one_post(postid)
  data = posting_schema.dump(post, many=True)

  if (len(data) == 0):
    return custom_response({'error': 'post not found'}, 404)

  # # check ownership
  # if data[0]['owner_id'] != CASClient().authenticate().rstrip():
  #   return custom_response({'error': 'permission denied'}, 400)

  try:
    data = posting_schema.load(req_data['post'], partial=True)
    post[0].update(data) # need post[0] b/c the PostingModel.get_one_post(postid) list/only way to get sqlalchemy to return an object
    data = posting_schema.dump(post)
    return custom_response(data, 200)

  except Exception as err:
    return custom_response({'message': err}, 400)
  ////







@user_api.route('/removeUserGoing', methods=['POST'])
def removeGoing():
  """
  remove postid to show a user's not going
  """

  return custom_response({'netid': username}, 201)




def custom_response(res, status_code):
  """
  Custom Response Function
  """
  return Response(
    mimetype="application/json",
    response=json.dumps(res),
    status=status_code
  )

