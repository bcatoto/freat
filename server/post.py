#!/usr/bin/env python

#-----------------------------------------------------------------------
# post.py, based on book.py
#-----------------------------------------------------------------------

# object post will store/allow us to access relevant information about a post
class Post:

    # def __init__(self, title, location, description, num_ppl, time_posted):
    def __init__(self, title):
        self._title = title
        # self._location = location
        # self._description = description
        # self._num_ppl = num_ppl
        # self._time_posted = time_posted

    # very simplified version? :
    # def __init__(self, title):
    #     self._title = title

    # deal with __str__ later .... 
    # def __str__(self):
    #     return self._author + ', ' + self._title + ', ' + \
    #        str(self._price)

    # only one used in very simplified version
    def getTitle(self):
        return self._title
    
    # note: should we change location so that it's a building and a number? 
    # how to standardize this? we need a building location to pop up in google maps
    # but we need classroom number/more description for ppl to actually find 
    # -- maybe have a reminder to ppl to add location details in the description
#     def getLocation(self):
#         return self._location

#     def getDescription(self):
#         return self._description

#     def getNumPpl(self):
#         return self._num_ppl

#     def getTimePosted(self):
#         return self._time_posted

# print("hello universe")
