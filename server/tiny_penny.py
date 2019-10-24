#!/usr/bin/env python

#-----------------------------------------------------------------------
# tiny_penny.py
# Author: Bob Dondero
#-----------------------------------------------------------------------

from sys import argv
from tiny_database import Database
from time import localtime, asctime, strftime
from flask import Flask, request, make_response, redirect, url_for
from flask import render_template

#-----------------------------------------------------------------------

app = Flask(__name__, template_folder='.') # connection via flask

#-----------------------------------------------------------------------

def getAmPm():
    if strftime('%p') == "AM":
        return 'morning'
    return 'afternoon' 
    
def getCurrentTime():
    return asctime(localtime())

#-----------------------------------------------------------------------

@app.route('/') # decorators; for the overall webpage
@app.route('/index')

def index():
 
    html = render_template('index.html',
        ampm=getAmPm(),
        currentTime=getCurrentTime())
    response = make_response(html)
    return response
    
#-----------------------------------------------------------------------

@app.route('/searchform')
def searchForm():

    errorMsg = request.args.get('errorMsg')
    if errorMsg is None:
        errorMsg = ''
    
    prevAuthor = request.cookies.get('prevAuthor')
    if prevAuthor is None:
        prevAuthor = '(None)'
    
    html = render_template('searchform.html',
        ampm=getAmPm(),
        currentTime=getCurrentTime(),
        errorMsg=errorMsg,
        prevAuthor=prevAuthor)
    response = make_response(html)
    return response    
    
#-----------------------------------------------------------------------

@app.route('/searchresults')
def searchResults():
    
    food = request.args.get('author')
    if (food is None) or (food.strip() == ''):
        errorMsg = 'Please type an author name.'
        return redirect(url_for('searchForm', errorMsg=errorMsg))

    database = Database()
    database.connect()
    database.append(food)
    books = database.get_all()
    database.disconnect()
     
    html = render_template('searchresults.html',
        ampm=getAmPm(),
        currentTime=getCurrentTime(),
        author=food,
        books=books)
    response = make_response(html)
    response.set_cookie('prevAuthor', food)
    return response         
    
#-----------------------------------------------------------------------

if __name__ == '__main__':
    if len(argv) != 2:
        print('Usage: ' + argv[0] + ' port')
        exit(1)
    app.run(host='0.0.0.0', port=int(argv[1]), debug=True)
