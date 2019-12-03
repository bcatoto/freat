from sys import argv, stderr

def main():
    inFile = open('coordinates.json', mode='r', encoding='ISO-8859-1')
    with inFile as file:
        text = file.read()
    inFile.close()

    inFile = open('buildings.json', mode='r', encoding='ISO-8859-1')
    for line in inFile:
        if text.find(line[2:-2]) == -1:
            print(line)

    inFile.close()

if __name__ == '__main__':
    main()
