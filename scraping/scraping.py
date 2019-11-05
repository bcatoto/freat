from sys import argv, stderr
import bs4
from bs4 import BeautifulSoup

def main():
    inFile = open('buildings.xml', mode='r', encoding='ISO-8859-1')
    with inFile as file:
        text = file.read()
    inFile.close()

    outFile = open('buildings_scraped.txt', mode='w', encoding='ISO-8859-1')

    soup = BeautifulSoup(text, 'html.parser')
    count = 0;

    for location in soup.find_all('location'):
        if location.group.string == 'Building':
            outFile.write('%s\n' % (location.group.next_sibling.string))
            count += 1;

    print('Number of buildings:', count)

    outFile.close()

if __name__ == '__main__':
    main()
