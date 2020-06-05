# Signin

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
    "identifiant": "User's mail or username",
    "password":  "User's Password",
}
```

## Response

### Code 404: Identifiant Not Found

#### Body:

```JSON
{
    "error": "Unknown User"
}
```
### Code 401: Wrong Password
#### Body:
```JSON
{
    "error": "Wrong Password"
}
```
### Code 403: Account not verified
#### Body:
```JSON
{
    "error": "You need to validate your email to login"
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
    "message": "Successfully Signed Up",
    "accessToken": "token"
}
```
