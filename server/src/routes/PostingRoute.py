from flask import request, json, Response, Blueprint, jsonify
from ..models.PostingModel import PostingModel, PostingSchema
from flask_cors import CORS,cross_origin


posting_schema = PostingSchema()

posting_api = Blueprint('posting', __name__)
posting_schema = PostingSchema()

@posting_api.route('/', methods=['GET'])
def getPostings():
    """
    Get all the available postings
    """
    posts = PostingModel.get_all_postings()
    data = posting_schema.dump(posts, many=True)
    return custom_response(data, 200)

@posting_api.route('/', methods=['POST'])
def newPost():
  """
  Create a new post and add to the database
  """
  req_data = request.get_json()
  print(req_data)
  try:
    data = posting_schema.load(req_data['post'])
    ## future check for if the post id already exists
    post = PostingModel(data)
    post.save()
    data = posting_schema.dump(post)
    return custom_response(data,201)
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
