#!/usr/bin/env python

#-----------------------------------------------------------------------
# tiny_post.py, based on book.py
#-----------------------------------------------------------------------

# object post will store/allow us to access relevant information about a post
class Post:

    # def __init__(self, title, location, description, num_ppl, time_posted):
    def __init__(self, title):
        self._title = title

    # only one used in very simplified version
    def getTitle(self):
        return self._title