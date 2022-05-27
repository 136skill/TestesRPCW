import json
import re

with open("batismos.json") as f:
    data = json.load(f)
    patternP = 'Pai:\s([a-zA-Z\séãçóêíá]+)'
    patternM = '(?:Mãe:\s)([a-zA-Z\séãçóêíÂ]+)'
    for ele in data:
        ele["_id"] = ele["ref"].replace('/', '_')
        ele["pai"] = re.search(patternP, ele['title']).group(1)
        if(re.search(patternM, ele['title'])):
            ele["mãe"] = re.search(patternM, ele['title']).group(1)
        else:
            ele["mãe"] = "Sem mãe registada"
        
        

with open("batismos_mongo.json", "w") as f:
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