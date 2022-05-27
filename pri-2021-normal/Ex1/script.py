import json
import re

with open("casamentos.json") as f:
    data = json.load(f)
    for ele in data:
        ele["_id"] = ele["ref"].replace('/', '_')
        

with open("casamentos_mongo.json", "w") as f:
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