# GUC CHAT

A Chatroom for all GUC Students. Login using your valid GUC account then enter the username that will be displayed to other students. Validation is done by checking if account is present in the mock GUC Database.


# Dependencies
- NodeJS
- MongoDB
- pusher chatkit

# Config

1 config file .env that contains Database name, API Key & InstanceLocator.

# Docker
- 2 Dockerfiles
- 1 Dockerfile for the client
- 1 Dockerfile for the server
- run docker build . -t IMAGE NAME for each Dockerfile to create an image

# Docker-compose
- Created a docker-compose.yml file.
- Services that make up the app are defined inside this file.
- Run docker-compose up to start the entire project.
