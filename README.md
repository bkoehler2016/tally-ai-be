# Tally AI Back End

##  Contributors
## Web Development 


|                                       [Patrick Stevenson](http://github.com/patjonstevenson)                                        |                                       [Steve Renner](http://github.com/steverenner1)                                        |                                       [Rohan Kulkarni](https://github.com/Turtled)                                        |                                       [David Downes](http://github.com/Gatrrr)                                        |
| :-----------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------: |
|                      [<img src="https://i.ibb.co/891s4yF/T4-JUEB3-ME-UJB1-REJ0-K-352ea65be2c5-512.jpg" width = "200" />](https://github.com/patjonstevenson)                       |                      [<img src="https://i.ibb.co/cvZhx8s/T4-JUEB3-ME-ULM4-H6-FJP-e22eb325f93c-512.jpg" width = "200" />](https://github.com/steverenner1)                       |                      [<img src="https://i.ibb.co/mh3JSTz/T4-JUEB3-ME-ULP37-SQ65-8dc869b04d13-512.jpg" width = "200" />](https://github.com/Turtled)                       |                      [<img src="https://i.ibb.co/MSq1Jhq/T4-JUEB3-ME-ULPAHPVPT-a30231215728-512.jpg" width = "200" />](https://github.com/Gatrrr)                       |
|                 [<img src="https://github.com/favicon.ico" width="15"> ](http://github.com/patjonstevenson)                 |            [<img src="https://github.com/favicon.ico" width="15"> ](http://github.com/steverenner1)             |           [<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/Turtled)            |          [<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/Gatrrr)           | 
| [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](http://linkedin.com/in/patjstevenson/) | [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](http://www.linkedin.com/in/steverenner1) | [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://www.linkedin.com/in/daniel-firpo/) | [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://www.linkedin.com/in/david-downes-a71216194/) | 



## Data Science


|                                       [Wenjing Liu](https://github.com/Nov05)                                        |                                       [Lily Su](https://github.com/LilySu)                                        |                                       [Rohan Kulkarni](https://github.com/kulkarohan)                                        |
| :-----------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------: |
|                      [<img src="https://i.ibb.co/N6vySPR/T4-JUEB3-ME-UJ7-MM6147-da306f44172b-512.jpg" width = "200" />](https://github.com/Nov05)                       |                      [<img src="https://i.ibb.co/S5Ltcj7/download.png" width = "200" />](https://github.com/LilySu)                       |                      [<img src="https://i.ibb.co/gmh9m0f/0.jpg" width = "200" />](https://github.com/kulkarohan)                       |
|                 [<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/Nov05)                 |            [<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/LilySu)             |           [<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/kulkarohan)            |
| [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://twitter.com/wenjingliu7) | [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://www.linkedin.com/lilyxsu) | [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://www.linkedin.com/in/kulkarohan/) | 



## Product Manager | UX Designer


|                                       [Elizabeth Ter Sahakyan](https://github.com/elizabethts)                                        |                                       [Colton Mortensen](https://medium.com/@colton.j.mortensen)                                        |
| :-----------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------: |
|                      [<img src="https://i.ibb.co/4Tx1qKw/T4-JUEB3-ME-UJ9-CTFQ12-52e3af3f04a4-512.png" width = "200" />](https://github.com/elizabethts)                       |                      [<img src="https://i.ibb.co/vcxqt2x/1.jpg" width = "200" />](https://medium.com/@colton.j.mortensen)                       |
|                 [<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/elizabethts)                 |                 [<img src="https://github.com/favicon.ico" width="15"> ](https://medium.com/@colton.j.mortensen)                 |
| [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://www.linkedin.com/in/elizabethts) | [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://www.linkedin.com/in/colton-mortensen/) |



# API Documentation

#### Backend delpoyed at AWS Elastic Beanstalk with Code Pipeline at http://tallyai.us-east-1.elasticbeanstalk.com/

## Getting started

To get the server running locally:

- Clone this repo
- **npm install** to install all required dependencies
- **npm start** to start the local server
- **npm test** to start server using testing environment

TODO: Create a testing database and set up testing environment. Configure existing tests to use this environment, and write more tests.

### Tech Stack
- Node / Express
- Postgres
- Knex
- JWT
- bcrypt.js

## 2️⃣ Endpoints

#### Authentication Routes

| Method | Endpoint                | Access Control | Description                                      |
| ------ | ----------------------- | -------------- | ------------------------------------------------ |
| POST   | `/api/auth/register`    | all users      | Creates a new user. Returns a token and user id. |
| POST   | `/api/auth/login`       | all users      | Logs a user in. Returns a token and a user id.   |

#### User / Business Routes

| Method | Endpoint                | Access Control         | Description                                                                   |
| ------ | ----------------------- | ---------------------- | ----------------------------------------------------------------------------- |
| GET    | `/users/:id`            | logged-in user with id | Returns user, business, and favorites (competitor) info.                      |
| PUT    | `/users/:id`            | logged-in user with id | Updates user information.                                                     |
| DELETE | `/users/:id`            | logged-in user with id | Deletes user.                                                                 |
| POST   | `/users/:id/business`   | logged-in user with id | Adds a new business to the user's account. Returns new list of businesses.    |
| POST   | `/users/:id/favorite`   | logged-in user with id | Adds a new competitor to the user's account. Returns new list of competitors. |
| DELETE | `/users/:id/business`   | logged-in user with id | Deletes an existing business from a user's account.                           |
| DELETE | `/users/:id/favorite`   | logged-in user with id | Deletes an existing competitor from a user's account.                         |

# Data Model

🚫This is just an example. Replace this with your data model

#### 2️⃣ ORGANIZATIONS

---

```
{
  id: UUID
  name: STRING
  industry: STRING
  paid: BOOLEAN
  customer_id: STRING
  subscription_id: STRING
}
```

#### USERS

---

```
{
  id: UUID
  organization_id: UUID foreign key in ORGANIZATIONS table
  first_name: STRING
  last_name: STRING
  role: STRING [ 'owner', 'supervisor', 'employee' ]
  email: STRING
  phone: STRING
  cal_visit: BOOLEAN
  emp_visit: BOOLEAN
  emailpref: BOOLEAN
  phonepref: BOOLEAN
}
```

## 2️⃣ Actions

🚫 This is an example, replace this with the actions that pertain to your backend

`getOrgs()` -> Returns all organizations

`getOrg(orgId)` -> Returns a single organization by ID

`addOrg(org)` -> Returns the created org

`updateOrg(orgId)` -> Update an organization by ID

`deleteOrg(orgId)` -> Delete an organization by ID
<br>
<br>
<br>
`getUsers(orgId)` -> if no param all users

`getUser(userId)` -> Returns a single user by user ID

`addUser(user object)` --> Creates a new user and returns that user. Also creates 7 availabilities defaulted to hours of operation for their organization.

`updateUser(userId, changes object)` -> Updates a single user by ID.

`deleteUser(userId)` -> deletes everything dependent on the user

## 3️⃣ Environment Variables

In order for the app to function correctly, the user must set up their own environment variables.

create a .env file that includes the following:

🚫 These are just examples, replace them with the specifics for your app
    
    *  STAGING_DB - optional development db for using functionality not available in SQLite
    *  NODE_ENV - set to "development" until ready for "production"
    *  JWT_SECRET - you can generate this by using a python shell and running import random''.join([random.SystemRandom().choice('abcdefghijklmnopqrstuvwxyz0123456789!@#\$%^&amp;*(-*=+)') for i in range(50)])
    *  SENDGRID_API_KEY - this is generated in your Sendgrid account
    *  stripe_secret - this is generated in the Stripe dashboard
    
## Contributing

When contributing to this repository, please first discuss the change you wish to make via issue, email, or any other method with the owners of this repository before making a change.

Please note we have a [code of conduct](./code_of_conduct.md). Please follow it in all your interactions with the project.

### Issue/Bug Request

 **If you are having an issue with the existing project code, please submit a bug report under the following guidelines:**
 - Check first to see if your issue has already been reported.
 - Check to see if the issue has recently been fixed by attempting to reproduce the issue using the latest master branch in the repository.
 - Create a live example of the problem.
 - Submit a detailed bug report including your environment & browser, steps to reproduce the issue, actual and expected outcomes,  where you believe the issue is originating from, and any potential solutions you have considered.

### Feature Requests

We would love to hear from you about new features which would improve this app and further the aims of our project. Please provide as much detail and information as possible to show us why you think your new feature should be implemented.

### Pull Requests

If you have developed a patch, bug fix, or new feature that would improve this app, please submit a pull request. It is best to communicate your ideas with the developers first before investing a great deal of time into a pull request to ensure that it will mesh smoothly with the project.

Remember that this project is licensed under the MIT license, and by submitting a pull request, you agree that your work will be, too.

#### Pull Request Guidelines

- Ensure any install or build dependencies are removed before the end of the layer when doing a build.
- Update the README.md with details of changes to the interface, including new plist variables, exposed ports, useful file locations and container parameters.
- Ensure that your code conforms to our existing code conventions and test coverage.
- Include the relevant issue number, if applicable.
- You may merge the Pull Request in once you have the sign-off of two other developers, or if you do not have permission to do that, you may request the second reviewer to merge it for you.

### Attribution

These contribution guidelines have been adapted from [this good-Contributing.md-template](https://gist.github.com/PurpleBooth/b24679402957c63ec426).

## Documentation

See [Frontend Documentation](🚫link to your frontend readme here) for details on the fronend of our project.
🚫 Add DS iOS and/or Andriod links here if applicable.
