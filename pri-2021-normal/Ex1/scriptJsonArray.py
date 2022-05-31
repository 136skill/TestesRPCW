import encodings
import re
import json

# Ao utilizar json.load trata o ficheiro json como sendo um dicionário.
with open ('casamentos.json', encoding="utf-8") as f:
    content = json.load(f)


for entry in content:
    new_id = re.sub('/','_',entry['ref'])
    entry.pop('ref')
    entry['_id'] = new_id



with open ('casamentos_tratado2.json','w',encoding="utf-8") as result:
    json.dump(content,result,indent=4,ensure_ascii=False)