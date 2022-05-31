import requests
import json

#Aquecimento 


apikey =  "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNGNiYTg0OWJhYmI2NjdjYmZkYzE2ZSIsImlhdCI6MTY1MzM5MTc0NiwiZXhwIjoxNjU1OTgzNzQ2fQ.DxCI1zx_2Tq8tue_iDO3-bA8_IuDUVxcDSYzXMNplhDKzfLFtHX7Po4AVWPi6fYIcQ1KZ1KPoRT_svOQ89zuySPRg0wnKosDIWPRF2_YPJVZvw5wZn76mRD7wKRBciSRqpe8lzcRIVGIhifJ9Jk-KikKHhQx4W1OBqrWGanT2pOQoEDwyS55KrwXN7eabvRQn1J01mQ5c7e0sPqjcEQmoB8vM_u7c4MWAMjTFQFw_iAaI-N7wkUkoDAfLnY3HMY3zTMq23P0-AYD4_Jjl9-Gy0e8mEZAIIYmhd6vWLQG3CV3BLmU27khiXZ95nOk620kYD7BwPr5jz-JpF0eLavKaA"


#1
content = requests.get('http://clav-api.di.uminho.pt/v2/classes?nivel=3&info=completa&apikey=' + apikey)
totalNivel3 = len(content.json())
print('1: ',totalNivel3)

#2
content = requests.get('http://clav-api.di.uminho.pt/v2/classes?nivel=4&info=completa&apikey=' + apikey)
totalNivel4 = len(content.json())
print('2: ',totalNivel4)


#3
content = requests.get('http://clav-api.di.uminho.pt/v2/classes/c150.10?apikey=' + apikey)
totalNivel3 = len(content.json()['filhos'])
print('3: ',totalNivel3)


#4
content = requests.get('http://clav-api.di.uminho.pt/v2/classes/c150.10.702?apikey=' + apikey)
totalNivel3 = len(content.json()['processosRelacionados'])
print('4: ',totalNivel3)