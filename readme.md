# Authenticating User

This is a restfull api made using node.js,express.js,mongodb.
API is tested in postman(which is super easy to use).

Before explaining functionality of api, here's how one can run this project on their local computer

- Download repository by clicking code button on the repository git page or pull the repo on to your local computer
- To run this project use commands : 

     ```
     npm install
     npm start
     ```
- `npm start` for running application in development environment.
- To run this project in production environment use `npm run start:prod`.
- Connect your own mongodb database to check. I have used environment variables to connect to mongodb. create config.env file and add these environment variables:

    ```
    NODE_ENV=development
    PORT=8000
    DATABASE=mongodb+srv://USERNAME:<PASSWORD>@cluster0.ehevc.mongodb.net/DBNAME?retryWrites=true&w=majority
    DATABASE_PASSWORD=PASSWORD GIVEN WHILE CREATING DB

    JWT_SECRET=create-your-own-secret-token-for-authentication
    JWT_EXPIRES_IN=90d
    ```
This api has following functionalities.
1. Login
2. Signup

## Login

**Query**
    *GET* /api/v1/users/login

**Response _(for-success)_**

    ```
    {
        "status": "success",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMTM5MzE2MTlhNmE5MzFiNDNlNDBjNCIsImlhdCI6MTY0NTQ1MDA2NiwiZXhwIjoxNjUzMjI2MDY2fQ.AbBIF614C_alCojRkhhk6m-F71Jc6zRNo8HclYSL8fU"
    }
    ```

- tested against data

    ```
    {
        "email" :"user1@gmail.com",
        "password":"ValidUser1"
    }
    ```
Here's screenshot of successfull login

![login-successfull](images/dev/login-successfull.png)


## Signup

**Query**
    *POST* /api/v1/users/signup

**Response _(for-success)_**

    ```
    {
        "status": "success",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMTM5MzE2MTlhNmE5MzFiNDNlNDBjNCIsImlhdCI6MTY0NTQ1MDAwNiwiZXhwIjoxNjUzMjI2MDA2fQ.FKxkEbudpXHNOlmL5YVJgIPKR4B40HDxMqdQ5h5jDJ8",
        "data": {
            "_id": "6213931619a6a931b43e40c4",
            "name": "user1",
            "email": "user1@gmail.com",
            "password": "$2a$12$iVhbSXW53EY1TGYD3ERBYebRrW0OWt5DktYRBXW/2bymw8/6nhBXW",
            "phoneNumber": "9298102887",
            "dob": "2002-04-09",
            "__v": 0
        }
    }
    ```

- tested against data

    ```
    {
        "name" :"user1",
        "email" :"user1@gmail.com",
        "password":"ValidUser1",
        "passwordConfirm":"ValidUser1",
        "phoneNumber":"9298102887",
        "dob":"2002-04-09"
    }
    ```
Here's screenshot of successfull signup

![signup-successfull](images/dev/signup-successfull.png)