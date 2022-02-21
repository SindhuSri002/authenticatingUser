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

    statusCode : 200

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

### Errors

- Login will be successfull if email and password are valid and match with user in db.

![login-incPass](images/dev/unauth-incPass.png)

- While logging in user must provide both email and password.

![login-NotFound](images/dev/notFound-pass.png)


## Signup

**Query**
    *POST* /api/v1/users/signup

**Response _(for-success)_**

    statusCode : 201

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

- A user is accepted if following requirements are fullfilled:
    - Must have a name.
    - Must have a valid email address.
    - Must have a valid password i.e which is of length atleast 8, must have atleast 1 upper case character, atleast 1 lowercase character,atleast one digit.
    - Must have a valid phone number.
    - Must provide date in format of "YYYY-MM-DD" format. 

Here's screenshot of successfull signup

![signup-successfull](images/dev/signup-successfull.png)

### Errors

- There will be mainly three types of errors:

    1. ValidationError
        - This error occurs when user doesn't provided validations are not satisfied

        ![signup-validError](images/dev/validationError.png)

    2. MongoError
        - One of the reasons is that if user provides duplicate values, this error occurs.

        ![signup-dup](images/dev/mongoerror-dup.png)

    3. CastError
        - This occurs if user is trying to access with invalid id.

- I have sent errors during development with error satck so that It would be easy for me to trace them. 

## Responses and Errors during production

![image](images/prod/login-success.png)

![image](images/prod/signup-success.png)

![image](images/prod/404-userNotFound.png)

![image](images/prod/unAuth-401.png)

![image](images/prod/dup-400.png)

![image](images/prod/NumberMust-400.png)

![image](images/prod/passNotMatch-400.png)

## packages

- Following are the packages I used

    - express => This a node framework which allows rapid development and provides features like easy routing.

    - morgan => Got to know about this when I ran into a bug, Where I was unable to access req.body . Using this package developer gets access to request's body.

    - dotenv => This is used to inform files about presence of environment variables.

    - mongoose => This is a ODM library for Mongodb. It provides features like modelling data, simple query API, middlewares etc.

    - validator => I used this packages multiple times in this package, for validating email,phone number and date of birth.

    - password-validator => It validates given password based on provided options.

    - bcrptjs => I used this package cause I thought storing passwords directly into database would be harmful. So passwords given by users are first encrypted then stored in database.

    - jsonwebtoken => It is used for authenticating users.

    - ndb => It is a dev-dependecy, used for debugging.

    - nodemon => It is a dev-dependecy, used so that developer dont need to start server everytime developer change something.

## Resources I used

- Mongodb documentation.
- Express documentation.
- mongoose documentation.
- Github pages of packages that I used.
- For error handling I followed methods which I learnt in a MERN stack bootcamp.