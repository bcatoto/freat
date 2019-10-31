#!/usr/bin/env python

# as;dlfjas;ldkfjl;adkjf;laskdjf;lasdkfj

#-----------------------------------------------------------------------
# tiny_database.py
# connecting our thing with the actual database...
#-----------------------------------------------------------------------

from sqlite3 import connect
from sys import stderr
from os import path
from tiny_post import Post

#-----------------------------------------------------------------------

class Database:
    
    def __init__(self):
        self._connection = None

    # connect to the database **rename this. also: how to postgres?
    def connect(self):      
        DATABASE_NAME = 'freat.sqlite'
        if not path.isfile(DATABASE_NAME):
            raise Exception('Database connection failed')
        self._connection = connect(DATABASE_NAME)
                    
    # disconnect from the database
    def disconnect(self):
        self._connection.close()

    # append a new post to the database
    def append(self, title):
        print("called append with title: ", title)
        cursor = self._connection.cursor() # the cursor
        APPEND_STRING = 'INSERT INTO postings(title) VALUES(?)'
        cursor.execute(APPEND_STRING, [title]) 
        self._connection.commit()

    # return all the entries in the postings table
    def get_all(self):
        cursor = self._connection.cursor()
        QUERY_STRING = \
            'select title FROM postings'
        cursor.execute(QUERY_STRING) 
        self._connection.commit()

        titles = []
        row = cursor.fetchone()
        while row is not None:
            titles.append(Post(row[0]))
            row = cursor.fetchone()
        cursor.close()
        return(titles)

    # search for a post based on author?
    def search(self, title):
        cursor = self._connection.cursor()

        QUERY_STRING = \
            'select title from postings ' + \
            'where title like ?'
        cursor.execute(QUERY_STRING, [title]) 
        self._connection.commit()
        
        titles = []
        row = cursor.fetchone()
        while row is not None:  
            titles.append(row[0])
            row = cursor.fetchone()
        cursor.close()
        return titles

#-----------------------------------------------------------------------

# For testing:

if __name__ == '__main__':
    database = Database()
    database.connect()
    database.append("asdfasdf")

    books = database.get_all()
    for book in books:
        print(book.getTitle())
    database.disconnect()
