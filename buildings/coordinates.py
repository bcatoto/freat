from sys import argv, stderr
import bs4
from bs4 import BeautifulSoup

def main():
    inFile = open('buildings.xml', mode='r', encoding='ISO-8859-1')
    with inFile as file:
        text = file.read()
    inFile.close()

    outFile = open('coordinates.json', mode='w', encoding='ISO-8859-1')
    outFile.write('{\n')

    soup = BeautifulSoup(text, 'html.parser')
    count = 0;

    for location in soup.find_all('location'):
        if location.group.string == 'Building':
            building = location.group.next_sibling.string
            lat = location.latitude.string
            long = location.longitude.string

            outFile.write('\t"%s" : [%s, %s],\n' % (building, lat, long))
            count += 1;

    print('Number of buildings:', count)

    outFile.write('}')
    outFile.close()

if __name__ == '__main__':
    main()
