from apscheduler.schedulers.blocking import BlockingScheduler
from server.src.routes.PostingRoute import deleteOldPost

sched = BlockingScheduler()

@sched.scheduled_job('interval', minutes=2)
def timed_job():
    print('This job is run every two minutes.')
    deleteOldPost() # call this function
sched.start()