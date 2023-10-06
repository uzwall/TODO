#  Todo App

This is a simple Todo application Dockerized for easy development and deployment. It consists of a frontend and a backend, both containerized using Docker.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- [Docker](https://www.docker.com/get-started) installed on your machine.
- [Docker Compose](https://docs.docker.com/compose/install/) installed on your machine (usually comes with Docker).

## Getting Started

To get started with this Todo app, follow these steps:

1. Clone this repository to your local machine:

   ```shell
   git clone https://github.com/uzwall/TODO

2. Navigate to the project folder:
   
    ```shell
    cd TODO
    
3. add .env file to main folder
   ```shell
   DB_CONNECT = mongodb+srv://node-api/
   PORT = port


4.Build and start the Docker containers:

  ```shell
  docker-compose up -d --build

 Command to remove all images:  
   `docker rmi -f $(docker images -a -q)`
   
 Command to remove all containers:  
   `docker rm -vf $(docker ps -a -q)`

