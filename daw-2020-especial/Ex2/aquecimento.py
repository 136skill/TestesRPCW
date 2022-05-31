import requests
import json

#Aquecimento 

apikey =  "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNGNiYTg0OWJhYmI2NjdjYmZkYzE2ZSIsImlhdCI6MTY1MzM5MTc0NiwiZXhwIjoxNjU1OTgzNzQ2fQ.DxCI1zx_2Tq8tue_iDO3-bA8_IuDUVxcDSYzXMNplhDKzfLFtHX7Po4AVWPi6fYIcQ1KZ1KPoRT_svOQ89zuySPRg0wnKosDIWPRF2_YPJVZvw5wZn76mRD7wKRBciSRqpe8lzcRIVGIhifJ9Jk-KikKHhQx4W1OBqrWGanT2pOQoEDwyS55KrwXN7eabvRQn1J01mQ5c7e0sPqjcEQmoB8vM_u7c4MWAMjTFQFw_iAaI-N7wkUkoDAfLnY3HMY3zTMq23P0-AYD4_Jjl9-Gy0e8mEZAIIYmhd6vWLQG3CV3BLmU27khiXZ95nOk620kYD7BwPr5jz-JpF0eLavKaA"


#1
content = requests.get('http://clav-api.di.uminho.pt/v2/tipologias?apikey=' + apikey)
totalT = len(content.json())
print('1: ',totalT)


#2
count = 0
content = requests.get('http://clav-api.di.uminho.pt/v2/entidades?info=completa&apikey=' + apikey)
for ele in content.json():
    for e in ele['tipologias']:
        if e['id'] == "tip_FSS":
            count += 1
print('2: ',count)


#3
#tipoPar': 'temParticipanteComunicador

#content = requests.get('http://clav-api.di.uminho.pt/v2/classes/c150.10?apikey=' + apikey)
#totalNivel3 = len(content.json()['filhos'])
#print('3: ',totalNivel3)



#4
content = requests.get('http://clav-api.di.uminho.pt/v2/entidades?info=completa&apikey=' + apikey)
lista = []
for ele in content.json():
    if ele['id'] == "ent_SEF":
        for e in ele['tipologias']:
            lista.append(e['id'])
print(lista)



