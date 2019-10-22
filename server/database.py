#!/usr/bin/env python

#-----------------------------------------------------------------------
# database.py
# connecting our thing with the actual database...
#-----------------------------------------------------------------------

from sqlite3 import connect
from sys import stderr
from os import path
from post import Post

#-----------------------------------------------------------------------

class Database:
    
    def __init__(self):
        self._connection = None

    # connect to the database **rename this. also: how to postgres?
    def connect(self):      
        DATABASE_NAME = 'penny.sqlite'
        if not path.isfile(DATABASE_NAME):
            raise Exception('Database connection failed')
        self._connection = connect(DATABASE_NAME)
                    
    # disconnect from the database
    def disconnect(self):
        self._connection.close()

    # append a new post to the database
    def append(self):
        cursor = self._connection.cursor() # the cursor
        APPEND_STRING = 'INSERT INTO postings(?) '
        



    # search for a post based on author?
    def search(self, author):
        cursor = self._connection.cursor()

        QUERY_STRING = \
            'select author, title, price from books ' + \
            'where author like ?'
        cursor.execute(QUERY_STRING, (author+'%',)) 
        
        books = []
        row = cursor.fetchone()
        while row is not None:  
            book = Book(str(row[0]), str(row[1]), float(row[2]))
            books.append(book);
            row = cursor.fetchone()
        cursor.close()
        return books

#-----------------------------------------------------------------------

# For testing:

if __name__ == '__main__':
    database = Database()
    database.connect()
    books = database.search('Kernighan')
    for book in books:
        print(book)
    database.disconnect()
