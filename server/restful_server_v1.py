#!/usr/bin/env python

#-----------------------------------------------------------------------
# restful_server_v1.py
#-----------------------------------------------------------------------
from sys import argv
from flask import Flask, request, jsonify
from flask_restful import Resource, Api
from tiny_database import Database

# set up app
app = Flask(__name__, template_folder='.')
api = Api(app) 

# intro page of website
class Welcome(Resource):
    def get(self):
        return {'about':'Welcome to Freat!'}


# shows a single posting, allows you to delete
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

# main page of website
class MainPage(Resource):
    def get(self, title):

        def post(self):
            some_json = request.get_json()
            return{'you sent': some_json}, 201


        database = Database()
        database.connect()
        database.append(title)
        rows = database.get_all()
        database.disconnect()

        foods = {'about' : 'Main Page of Freat'}


        for row in rows:
            print(row.getTitle())
        return foods


class Multi(Resource):
    def get(self, num):
        return {'result' : num*10}

api.add_resource(Welcome, '/')
api.add_resource(MainPage, '/info/<string:title>')
api.add_resource(Multi, '/multi/<int:num>')


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=int(argv[1]), debug=True)