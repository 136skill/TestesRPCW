import json
import re

with open("movies.json") as f:
    data = json.load(f)
    n = 1

    patternM = "[a-zA-Z]+\s[a-zA-Z]*\'[a-zA-Z]+"
    for ele in data:
        ele["id"] = "F" + str(n)
        n += 1
        ele["title"] = ele["title"].replace("'", ' ')
        x = 0
        matches = re.findall(patternM, ele['cast'])
        if(matches):
            for s in matches:
                ele = re.sub("'" , " ", s)
             
        
        

with open("movies_mongo.json", "w") as f:
    for ele in data:
        f.write("{")
        k = 0
        for i,j in ele.items():
            if k != len(ele) -1:
                f.write(f'"{i}":"{j}",')
                k += 1
            else:
                f.write(f'"{i}":"{j}"')
        
        f.write("}")
        f.write("\n")