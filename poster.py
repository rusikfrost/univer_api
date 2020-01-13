import requests
import json 

user = json.dumps({
        #"id": 1707,
        #"name": "Волочаев Роман Олегович",
        "group_id": 1,
        #"email": "ЗБВТ-18250",
        #"student_id": "ЗБВТ-18250"
})

#user1 = "name=Бадаев Руслан Александрович&group=В-31&status=студент&message=test message"
user1 = "name=Иванов Руслан Александрович&group=В-21"
#url = 'http://localhost:3000/user?'+user1

url = 'http://localhost:3000/wall/get_messages?'+user1

print(url)
request = requests.post(url)

print('------------------------------------------------------------')
print(request.json())