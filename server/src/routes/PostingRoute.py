from flask import request, json, Response, Blueprint, jsonify
from ..models.PostingModel import PostingModel, PostingSchema
from flask_cors import CORS,cross_origin


posting_schema = PostingSchema()

posting_api = Blueprint('posting', __name__)
posting_schema = PostingSchema()
CORS(posting_api, support_credentials=True)

@posting_api.route('/', methods=['GET'])
def getPostings():
    """
    Get all the available postings
    """
    posts = PostingModel.get_all_postings()
    data = posting_schema.dump(posts, many=True)
    print(data)
    return custom_response(data, 200)

@posting_api.route('/', methods=['POST'])
def newPost():
  """
  Create a new post and add to the database
  """

  req_data = request.get_json().post
  print(req_data)
  try:
    data = posting_schema.load(req_data)
    print(data)
    ## future check for if the post id already exists
    post = PostingModel(req_data)
    post.save()
    data = posting_schema.dump(post)
    print(data)
    return custom_response(data,201)
  except ValidationError as err:
    errors = err.messages
    return custom_response({'message': err}, 400)

  # # this is the owner
  # # req_data['owner_id'] = g.user.get('id') # idk what the g. is

  # # get the data
  # data, error = posting_schema.load(req_data)

  # if error:
  #   return custom_response(error, 400)

  # new_post = PostingModel(data)
  # new_post.save() # save and commit this into database

  # data = posting_schema.dump(new_post).data # returns the formatted result

  # return custom_response(data, 201)


def custom_response(res, status_code):
  """
  Custom Response Function
  """
  return Response(
    mimetype="application/json",
    response=json.dumps(res),
    status=status_code
  )
