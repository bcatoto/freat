#from server.src.models.PostingModel import PostingModel, PostingSchema
from apscheduler.schedulers.blocking import BlockingScheduler
import requests
from datetime import datetime
from flask import request, json, Response, Blueprint, jsonify
import json
import time

tz_offset = time.timezone
URL = 'https://freat.herokuapp.com/api/v1/posting/'
local_URL = 'http://localhost:5000/api/v1/posting/'
sched = BlockingScheduler()


@sched.scheduled_job('interval', minutes=1)
def timed_job():
    print("Job runs every 1 minute")

    # get all the postings
    # postings = json.loads(requests.get(url = local_URL).text)
    postings = json.loads(requests.get(url = URL).text)

    for post in postings:
        date_time_obj = datetime.strptime(post['created_at'], '%Y-%m-%dT%H:%M:%S.%f')
        diff = datetime.now() - date_time_obj
        mins_elapsed = (diff.total_seconds() + tz_offset)/60

        if mins_elapsed > 120:
            postid = post['id']
            # new_url = local_URL + str(postid)
            new_url = URL + str(postid)
            requests.delete(url = new_url) # send a delete request

        # test case!
        if mins_elapsed > 3:
            postid = post['id']
            print('postid ', postid)
            # new_url = local_URL + str(postid)
            new_url = URL + str(postid)
            requests.delete(url = new_url) # send a delete request

        
sched.start()