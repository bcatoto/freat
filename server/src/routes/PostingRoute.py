import os
from flask import request, json, Response, Blueprint, jsonify
from ..models.PostingModel import PostingModel, PostingSchema
from ..models.AttendingModel import AttendingModel
from ..CASClient import CASClient
import cloudinary
import cloudinary.uploader
import cloudinary.api
from urllib.parse import urlparse # to deal w/ image urls

# configures cloudinary. note: should we move cloud name, etc. to config.py?
cloudinary.config(cloud_name = os.getenv('CLOUDINARY_CLOUDNAME'),
    api_key = os.getenv('CLOUDINARY_API_KEY'),
    api_secret = os.getenv('CLOUDINARY_API_SECRET'))

posting_api = Blueprint('posting', __name__)
posting_schema = PostingSchema()

@posting_api.route('/', methods=['GET'])
def getPostings():
    """
    Get all the available postings
    """
    print(request.url)
    print(request.host)
    CASClient().authenticate()
    posts = PostingModel.get_all_postings()
    data = posting_schema.dump(posts, many=True)
    return custom_response(data, 200)

@posting_api.route('/', methods=['POST'])
def newPost():
  """
  Create a new post and add to the database
  """
  CASClient().authenticate()
  req_data = request.get_json()
  try:
    data = posting_schema.load(req_data['post'])
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
  CASClient().authenticate()
  post = PostingModel.get_one_post(postid)
  data = posting_schema.dump(post, many=True)
  return custom_response(data, 200)

# deletes the post with the id postid, and delete image from cloudinary
@posting_api.route('/<int:postid>', methods=['DELETE'])
def deletePost(postid):
  """
  Delete the post with id postid
  """
  CASClient().authenticate()
  post = PostingModel.get_one_post(postid)
  data = posting_schema.dump(post)
  if (len(data) == 0):
    return custom_response({'error': 'post not found'}, 404)

  # check ownership
  if data['owner_id'] != CASClient().authenticate().rstrip():
    return custom_response({'error': 'permission denied'}, 400)

  for public_id in data['images']:
    cloudinary.uploader.destroy(public_id)

  post.delete()
  return custom_response({'message': 'deleted'}, 204)


# updates fields of a post with the corresponding postid
@posting_api.route('/<int:postid>', methods=['PUT'])
def updatePost(postid):
  """
  Update the post with id postid
  """
  CASClient().authenticate()
  req_data = request.get_json()

  post = PostingModel.get_one_post(postid)
  data = posting_schema.dump(post)

  if (len(data) == 0):
    return custom_response({'error': 'post not found'}, 404)

  # check ownership
  if data['owner_id'] != CASClient().authenticate().rstrip():
    return custom_response({'error': 'permission denied'}, 400)

  try:
    data = posting_schema.load(req_data['post'], partial=True)
    post.update(data) 
    data = posting_schema.dump(post)
    return custom_response(data, 200)

  except Exception as err:
    return custom_response({'message': err}, 400)


# get all posts of a certain user
@posting_api.route('/getByUser/<string:netid>', methods=['GET'])
def getPostsByUser(netid):
  """
  Get all available posts of a certain user
  """
  CASClient().authenticate()
  posts = PostingModel.get_by_user(netid)
  data = posting_schema.dump(posts, many=True)
  return custom_response(data, 200)


def custom_response(res, status_code):
  """
  Custom Response Function
  """
  return Response(
    mimetype="application/json",
    response=json.dumps(res),
    status=status_code
  )
