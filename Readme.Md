
# Template Back-End

Proceed to launch from the root of the project directory (see `Readme.md`).

# Signup
## Request Body
### Type
JSON string
### Content
```JSON
user: {
    "fname": //User's First Name,
    "lname": //User's Last Name,
    "username": // User's Username,
    "mail": // User's E-Mail,
    "password": // User's Password,
}
```
### Response
#### Code 409

##### Body:
###### Username AND Mail are already in registred:
```JSON
{
    alreadyInUse: 'both',
    error: 'Both Username and Email are already registred'
}
```

###### Only user name is already in user:
```JSON
{
    alreadyInUse: 'username',
    error: 'Username already in use'
}
```

###### Only user name is already in user:
```JSON
{
    alreadyInUse: 'mail',
    error: 'Email already registred'
}
```

#### Code 500
##### Body:
```JSON
{
    error: 'Internal server error'
}
```

#### Code 200
##### Body:
```JSON
{
    message: 'Successfully Register'
}
```