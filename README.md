# leave-application
NodeJS application for a leave application submission and approval.

## Dev

```
$ npm install
```

### Run

```
$ npm start
```

#### Use Postman to test routes

##### Follow these steps:

1. Starting the session by making `POST` request
```
http://localhost:3000/login
```
##### JSON Body
```
{
	"username": "jassy321"
}
```

2. Add sample users to the database by making `POST` request
```
http://localhost:3000/user
```
##### JSON Body
```
{
  "firstName": "Utkarsh",
  "lastName": "Gupta",
  "role": "Employee",
  "username": "utk123",
  "email": "utk123@gmail.com"
}
```

3. To create leave request use by making `POST` request
```
http://localhost:3000/leave
```
##### JSON Body
```
{
  "startDate": "2017-06-06",
  "endDate": "2017-06-06",
  "leaveType": "Type1",
  "reason": "Trip to Manali"
}
```
4. To see all of the leave request according to user 'Role' by making `GET` request
```
http://localhost:3000/all
```

5. To Approve or Reject outstanding leave request (using object id) by making `PUT` request
```
http://localhost:3000/approving
```
##### JSON Body
```
{
  
	"id": "594fecd1d89e35cb6810081b",
  "approvalStatus": "Approved"
}
```

6. To destroy the session by making `GET` request
```
http://localhost:3000/logout
```


## License

MIT © [UtkarshGupta-CS](https://github.com/UtkarshGupta-CS)

