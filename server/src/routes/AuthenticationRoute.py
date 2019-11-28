from flask import request, json, Response, Blueprint, jsonify


authentication_api = Blueprint('authentication', __name__)

@authentication_api.route('/authenticate', methods=['GET'])

