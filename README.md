# student-crud-api
```
sudo apt update
sudo apt install -y wget unzip nodejs npm
mkdir project
cd project/
git clone https://github.com/Junnygram/student-crud-api.git
ls 
cd student-crud-api/
npm install
npm start
```

Add an Inbound Rule to access api:

In the security group details, go to the Inbound rules tab.
Click on Edit inbound rules.
Add a new rule with the following settings:
Type: Custom TCP
Port Range: 3000
Source: Anywhere (0.0.0.0/0) 
Click Save rules.

to access go to your browser 
```
#to fetch all students 
publicIP/api/v1/students
```

