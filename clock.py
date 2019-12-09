from apscheduler.schedulers.blocking import BlockingScheduler
from server.src.models.PostingModel import PostingModel, PostingSchema
import cloudinary
import cloudinary.uploader
import cloudinary.api
from flask import json, Response

cloudinary.config(cloud_name = 'hadg27jul', api_key = '752588741865624', api_secret = 'Q0JigeE-1yXsch3qqfkMWvHJoiI')
posting_schema = PostingSchema()
sched = BlockingScheduler()

@sched.scheduled_job('interval', minutes=2)
def timed_job():
    print('This job is run every two minutes.')
    deleteOldPost() # call this function
sched.start()


def deleteOldPost():
  """
  Delete any posts older than 2 hours
  """
  posts = PostingModel.get_all_postings()
  data = posting_schema.dump(posts, many=True)
  oldPosts = []

  for post in data[0]:
    if post['created_at'] == '2019-12-09T16:29:55.065099':
      oldPosts.append(post) # add to list of things to delete

  for i in range(len(oldPosts)):
    oldPosts[i][0].delete()
    for public_id in data[i][0]['images']:
      cloudinary.uploader.destroy(public_id)

  return custom_response({'message': 'deleted'}, 204)


def custom_response(res, status_code):
  """
  Custom Response Function
  """
  return Response(
    mimetype="application/json",
    response=json.dumps(res),
    status=status_code
)