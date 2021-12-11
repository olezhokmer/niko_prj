# Start api commands.
docker-compose build
docker-compose up

# Register new user

POST http://localhost:8080/auth/register

{ "email" : "abc@gmail.com", "password" : "12345678", "passwordConfirm" : "12345678" }

# Login existed user

POST http://localhost:8080/auth/login

{ "email" : "abc@gmail.com", "password" : "12345678" }


# Next endpoints need a http header
Copy token from previous steps and paste to headers like this:
Authorization:Bearer token


# Add todolist item

PUT http://localhost:8080/plan/

{ "value" : "Do something" }

# Update todolist item

PATCH http://localhost:8080/plan/

{ "value" : "Do something else" }

# do todolist item

GET http://localhost:8080/plan/do/1

# delete todolist item

DELETE http://localhost:8080/plan/do/1

# get all user's todolist items

GET http://localhost:8080/plan/

