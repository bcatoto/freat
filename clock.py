#from server.src.models.PostingModel import PostingModel, PostingSchema
from apscheduler.schedulers.blocking import BlockingScheduler
import requests
from datetime import datetime
from flask import request, json, Response, Blueprint, jsonify
import json
import time
import os

tz_offset = time.timezone
URL = 'https://freat.herokuapp.com/api/v1/posting/'
secret =  '?' + str(os.getenv('SECRET_TOKEN'))
sched = BlockingScheduler()


@sched.scheduled_job('interval', minutes=1)
def timed_job():
    print("Job runs every 1 minute")

    # get all the postings
    URL = URL + secret
    postings = json.loads(requests.get(url = URL).text)

    for post in postings:
        date_time_obj = datetime.strptime(post['created_at'], '%Y-%m-%dT%H:%M:%S.%f')
        diff = datetime.now() - date_time_obj
        mins_elapsed = (diff.total_seconds() + tz_offset)/60

        if mins_elapsed > 120:
            postid = post['id']
            # new_url = local_URL + str(postid)
            new_url = URL + str(postid) + secret
            requests.delete(url = new_url) # send a delete request
        
sched.start()