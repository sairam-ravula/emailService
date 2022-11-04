# emailService

## Dependencies Used
1. Express
2. body-parser
3. mongoose
4. dotenv
5. node-cron
6. nodemailer

## Features.
1. I used nodemailer to send the mails. (I have removed the mail id and password for security reasons)
2. I used node-cron to schedule the notification service. I set it fot 1 minute. Node-cron checks for every one minute if there are any notifications that are unsent.

## RestAPI Paths

### 1. create User
/api/v1/users/add
User is created by giving the below details : name, email, gender

### 2. update User
/api/v1/users/update/:id
User is updated by giving the below details : email and/or gender

### 3. delete User
/api/v1/users/delete/:id
User is deleted by giving the user id as request param.

### 4. get All Users
/api/v1/users/all
You can fetch all the users available

### 5. get User by Id
/api/v1/users/:id
You can fetch the user by giving the user id as request param.

### 6. get Notifications that are unsent
/api/v1/notifications/unsent
You can fetch all the notifications that are unsent.
