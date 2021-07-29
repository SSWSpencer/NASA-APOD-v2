# This file exists because I wanted to have a search function on the website, which the nasa APOD api doesn't have the ability to do natively.
# Basically I copy/pasted all of the text from https://apod.nasa.gov/apod/archivepixFull.html and quickly realized that it would take hours to format almost 10,000 lines to json data manually
# That's why this file exists. I noticed **most** of the data was pretty normally formatted, and figured it would take five minutes to write up a python script to automatically convert it all to json data.
# Unfortunately, nasa decided to change up the date format from year-month-date to month-date-year in 2000, so making fixes for that really made my code uglier.
# Here's a fun fact though, in all of the almost-10,000 entries, only one of them has quotation marks. Can you guess why I know that? That's right, because quotes inside of json data will break it, and I had to make fixes for that too.
# On second thought, it probably would've been quicker to just change it all to json data manually... 

file1 = open("ArchiveList.txt", "r")
file2 = open("ArchiveList.json", "w+")

lines = file1.readlines()

newArr = []
file2.write("{\n")
for j in range(0, len(lines)):
    lineArr = lines[j].split()
    # print(lineArr)
    for i in range(0, len(lineArr)):
        lineArr[i] = lineArr[i].replace('"',"'")
        if i == 0 or i == 3:
            lineArr[i] = '"' + lineArr[i]
            # print(lineArr[i])
        if i == 2:
            letterArr = list(lineArr[i])
            if(len(letterArr) == 3):
                letterArr[2] = '"'
                letterArr.append(":")
            elif(len(letterArr) == 5):
                letterArr[4] = '"'
                letterArr.append(":")
            lineArr[i] = "".join(letterArr)
            # print(lineArr[i])

        if i == len(lineArr) - 1:
            letterArr = list(lineArr[i])
            letterArr.append('"')
            lineArr[i] = "".join(letterArr)
            # print(lineArr[i])
    if(j < len(lines)-1):
        file2.write(f'{" ".join(lineArr)},\n')
    else:
        file2.write(f'{" ".join(lineArr)}\n')
file2.write("}\n")

file1.close()
file2.close()