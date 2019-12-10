from server.src.models.PostingModel import PostingModel, PostingSchema
from apscheduler.schedulers.blocking import BlockingScheduler
import requests
from datetime import datetime

URL = 'https://freat.herokuapp.com/api/vi/posting'
sched = BlockingScheduler()
posting_schema = PostingSchema()


@sched.scheduled_job('interval', minutes=1)
def timed_job():
    print('This job is run every two minutes.')
    posts = PostingModel.get_all_postings()
    data = posting_schema.dump(posts, many=True)

    for post in data[0]:
        diff = datetime.now() - post['created_at']
        mins_elapsed = diff.total_seconds()/60
        print("DEBUG ID: ", post['id'])
        print("DEBUG TIMEDIFF ", mins_elapsed)

        if mins_elapsed > 120:
            PARAMS = {'postid':post['id']} 
            requests.delete(url = URL, params = PARAMS) # send a delete request

sched.start()