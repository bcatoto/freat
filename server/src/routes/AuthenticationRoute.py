from flask import request, json, Response, Blueprint, jsonify
from PostingRoute import custom_response
from ..CASClient import CASClient


authentication_api = Blueprint('authentication', __name__)

@authentication_api.route('/authenticate', methods=['GET'])
def getUsername():
  """
  Get CAS username
  """
  username = CASClient().authenticate().rstrip('\n') # removes ending newline
  return custom_response({'netid': username}, 200)

