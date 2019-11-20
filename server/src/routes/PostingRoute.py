from flask import request, json, Response, Blueprint, jsonify
from ..models.PostingModel import PostingModel, PostingSchema
# from flask_cas import login_required


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

# returns a post with the id postid
@posting_api.route('/<int:postid>', methods=['GET'])
def postDetails(postid):
  """
  Get the information from this specific post
  """
  post = PostingModel.get_one_post(postid)
  data = posting_schema.dump(post, many=True)
  return custom_response(data, 200)

# deletes the post with the id postid
@posting_api.route('/<int:postid>', methods=['DELETE'])
def deletePost(postid):
  """
  Delete the post with id postid
  """
  post = PostingModel.get_one_post(postid)
  data = posting_schema.dump(post, many=True)

  if (len(data) == 0):
    return custom_response({'error': 'post not found'}, 404)

  # this checks ownership...
  # data = posting_schema.dump(post, many=True)
  # if data.get('owner_id') != g.user.get('id'):
  #   return custom_response({'error': 'permission denied'}, 400)

  post[0].delete()
  return custom_response({'message': 'deleted'}, 204)

# updates fields of a post with the corresponding postid
@posting_api.route('/<int:postid>', methods=['PUT'])
def updatePost(postid):
  """
  Update the post with id postid
  """
  req_data = request.get_json()
  print("DEBUG!: ", req_data)
  post = PostingModel.get_one_post(postid)
  data = posting_schema.dump(post, many=True)

  if (len(data) == 0):
    return custom_response({'error': 'post not found'}, 404)

  # make sure this is only accessible by the creator user
  # if data.get('owner_id') != g.user.get('id'):
  # return custom_response({'error': 'permission denied'}, 400)

  try:
    #data = posting_schema.load(req_data['post'], partial=True)
    data = posting_schema.load(req_data['post'])
    post[0].update(data) # need post[0] b/c the PostingModel.get_one_post(postid) list/only way to get sqlalchemy to return an object
    data = posting_schema.dump(post)
    return custom_response(data, 200)
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
