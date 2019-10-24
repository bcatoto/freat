#!/usr/bin/env python

#-----------------------------------------------------------------------
# common.py
# Author: Bob Dondero
#-----------------------------------------------------------------------

from time import localtime, asctime, strftime

#-----------------------------------------------------------------------

def getHeader():
    html = ''
    if strftime('%p') == "AM":
        greeting = 'morning'
    else:
        greeting = 'afternoon'
    html += '<hr>'
    html += 'Good ' + greeting + ' and welcome to '
    html += '<strong>Penny.com</strong>'
    html += '<hr>'
    return html

#-----------------------------------------------------------------------

def getFooter():
    html = ''
    html += '<hr>'
    html += 'Today is ' + asctime(localtime()) + '.<br>'
    html += 'Created by '
    html += '<a href="https://www.cs.princeton.edu/~rdondero">'
    html += 'Bob Dondero</a>'
    html += '<hr>'
    return html

#-----------------------------------------------------------------------

# For testing:

if __name__ == '__main__':
    print(getHeader())
    print()
    print()
    print(getFooter())
