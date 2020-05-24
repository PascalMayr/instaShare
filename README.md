# InstaShare

A simple application to upload large files and share them instantly.

# Dev setup guide

  - Download and install MongoDB on your system: https://docs.mongodb.com/manual/installation/
  - Start the Mongo deamon
  - Clone and cd into the repo
  
  SERVER SETUP:
  
  - Go into the server folder
  - Create a .env file at the root specifying:
     ```
     JWT_SECRET=<SET_RANDOM_SECRET_KEY/> - use 'openssl rand -base64 32' to create a secret key
     DB_CONNECTION=<SET_DB_CONNECTION/> - on localhost mostly: mongodb://localhost:27017/
     DB_NAME=<SET_DB_NAME/>  - the name of a new or already existing db
     BUCKET_NAME=<SET_BUCKET_NAME/>  - the name of the  bucket where your files will be stored
     PORT=<SET_SERVER_PORT/> - the port on which your express server will be started. Default is 5000
     ```
  - install node_modules with yarn install
     ```sh
    $ yarn install
    ```
  - install nodemon globally: https://www.npmjs.com/package/nodemon
  - start the server
    ```sh
    $ yarn run dev
    ```
    
  CLIENT SETUP:
  - Go into the client folder
  - Create a .env file at the root specifying:
      ```
     REACT_APP_SERVER_HOST=<SERVER_HOST /> - default should be: http://localhost:5000/
     ```
  - install node_modules with yarn install
     ```sh
    $ yarn install
    ```
  - start the react development server
    ```sh
    $ yarn run start
    ```
    You can now sign up and upload your first files!