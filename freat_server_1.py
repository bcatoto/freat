#!/usr/bin/env python

#-----------------------------------------------------------------------
# freat_server_1.py
# trying to implement something that matches better w/ freat, using restful flask
#-----------------------------------------------------------------------
from sys import argv
from flask import Flask, request, jsonify
from flask_restful import Resource, Api
from tiny_database import Database

# set up app
app = Flask(__name__, template_folder='.')
api = Api(app) 

# welcome page of website
class Welcome(Resource):
    def get(self):
        return {'about':'Welcome to Freat!'} # response code defaults to 200


# Main page of website: handles showing all live postings the the scrolling panel
class MainPage(Resource):
    def get(self):

        # connect to freat.sqlite database via tiny_database.py file
        database = Database()
        database.connect()
        rows = database.get_all() # retrieve all current information
        database.disconnect()

        foods = { 'Title' : [ row.getTitle() for row in rows ] }

        return foods


# and the form for a new post
class NewPosting(Resource):
    def get(self, title):

        # connect to freat.sqlite database via tiny_database.py file
        database = Database()
        database.connect()
        database.append(title) # add this to the database
        database.disconnect()

        return { 'message': 'New posting added!'}


# details "page" of the website: after you click a single posting, you get the 
# post_id of that posting, and it goes into the url as a ?postid=2534 or something
class Posting(Resource):

    def get(self, post_title):
        #abort_if_todo_doesnt_exist(todo_id)
        database = Database()
        database.connect()
        results = database.search(post_title)
        database.disconnect()

        if (len(results) == 0):
            return "none"

        return results










api.add_resource(Welcome, '/')
api.add_resource(MainPage, '/mainpage')
api.add_resource(NewPosting, '/mainpage/<string:title>')



if __name__ == '__main__':
    app.run(host='0.0.0.0', port=int(argv[1]), debug=True)