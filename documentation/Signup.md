# Signup
## Request

### Method
```POST```

### Headers
```JSON
{
    "Access": "application/json",
    "Content-Type": "application/json"
}
```

### Body:
```JSON
// Type JSON String
{
    "user": {
        "fname": "User's First Name",
        "lname": "User's Last Name",
        "username": "User's Username",
        "mail": "User's E-Mail",
        "password": "User's Password",
    }
}
```
## Response
### Code 409: Already in use
#### Username AND Mail are already in registred:
##### Body:
```JSON
{
    "alreadyInUse": "both",
    "error": "Both Username and Email are already registred"
}
```
#### Only user name is already in user:
##### Body:
```JSON
{
    "alreadyInUse": "username",
    "error": "Username already in use"
}
```
#### Only user name is already in user:
##### Body:
```JSON
{
    "alreadyInUse": "mail",
    "error": "Email already registred"
}
```
### Code 500: Internal Server error
#### Body:
```JSON
{
    "error": "Internal server error"
}
```
### Code 200: Success
#### Body:
```JSON
{
    "message": "Successfully Register"
}
```