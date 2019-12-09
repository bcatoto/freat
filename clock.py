from apscheduler.schedulers.blocking import BlockingScheduler
import requests
URL = 'https://freat.herokuapp.com/api/vi/posting'

sched = BlockingScheduler()

@sched.scheduled_job('interval', minutes=1)
def timed_job():
    print('This job is run every two minutes.')
    PARAMS = {'postid':118} 
    requests.delete(url = URL, params = PARAMS)















    # """
    # Delete any posts older than 2 hours
    # """
    # posts = PostingModel.get_all_postings()
    # data = posting_schema.dump(posts, many=True)
    # oldPosts = []

    # for post in data[0]:
    #     if post['created_at'] == '2019-12-09T17:12:37.758369':
    #         oldPosts.append(post) # add to list of things to delete

    # for i in range(len(oldPosts)):
    #     oldPosts[i][0].delete()
    #     for public_id in data[i][0]['images']:
    #         cloudinary.uploader.destroy(public_id)

sched.start()


# def deleteOldPost():
#   """
#   Delete any posts older than 2 hours
#   """
#   posts = PostingModel.get_all_postings()
#   data = posting_schema.dump(posts, many=True)
#   oldPosts = []

#   for post in data[0]:
#     if post['created_at'] == '2019-12-09T16:29:55.065099':
#       oldPosts.append(post) # add to list of things to delete

#   for i in range(len(oldPosts)):
#     oldPosts[i][0].delete()
#     for public_id in data[i][0]['images']:
#       cloudinary.uploader.destroy(public_id)

#   return custom_response({'message': 'deleted'}, 204)


# def custom_response(res, status_code):
#   """
#   Custom Response Function
#   """
#   return Response(
#     mimetype="application/json",
#     response=json.dumps(res),
#     status=status_code
# )