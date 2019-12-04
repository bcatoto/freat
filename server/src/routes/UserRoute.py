from flask import request, json, Response, Blueprint, jsonify
from ..CASClient import CASClient


user_api = Blueprint('user', __name__)

@user_api.route('/getUser', methods=['GET'])
def getUsername():
  """
  Get CAS username
  """
  username = CASClient().authenticate().rstrip('\n') # removes ending newline
  return custom_response({'netid': username}, 200)


def custom_response(res, status_code):
  """
  Custom Response Function
  """
  return Response(
    mimetype="application/json",
    response=json.dumps(res),
    status=status_code
  )

