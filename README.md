
# Authentication System

Although the name is self-explanatory, here is a repository intended for a basic CRUD application.

## Stack

### **Back-end:**
[![Back-end](https://skillicons.dev/icons?i=nodejs,express,mongodb&perline=3)](https://skillicons.dev)
#### Features
* GET/POST/PATCH/DELETE HTTP methods
* JWT Token Authorization based
* Invalid JWT Tokens Blacklist
* Client access key validation
* Password Hashing
* MongoDB

### **Front-end:** 
[![Front-end](https://skillicons.dev/icons?i=nextjs,react,tailwind,ts&perline=4)](https://skillicons.dev)
#### Features
* Register/Login
* Update profile
* Delete account
* Logout
* Forms validation via <a href="https://zod.dev/">zod</a>
* React ContextAPI


## Environment Variables

for security reasons, an access key is defined on the server that must be passed in the header of each client request, thus avoiding requests from unwanted sources. 

the server uses the following environment variables:

`MONGO_URL` Mongodb connection string 

`API_KEY` Key used for client application authorization

`JWT_SECRET` JWT secret key

`PORT`  HTTP server port configuration


## API documentation

#### NOTE: Client application must use same api_key on headers:
```js
headers: {
    api_key: "topsecretapikey",
}

#

```
#### Login request

```http
  POST /auth/login
```

| Parameter   | Type       | Description                           |
| :---------- | :--------- | :---------------------------------- |
| `username` | `string` | **Required**. This is the username |
| `password` | `string` | **Required**. This is the password |

#### Returns
* 404 - `{ error: "Not Found." }`
* 403 - `{ error: "Access Denied." }`
* 200 - ` { message: "Login Sucessful.", token: "xxxxxxxx..." }`

#

#### Register request

```http
  POST /auth/register
```

| Parameter   | Type       | Description                           |
| :---------- | :--------- | :---------------------------------- |
| `username` | `string` | **Required**. This is the username |
| `password` | `string` | **Required**. This is the password |

#### Returns
* 409 - `{ error: "Conflict within server information." }`
* 409 - `{ error: "No valid data." }`
* 403 - `{ error: "Access Denied." }`
* 201 - ` { message: "Account Registered." }`

#

#### Logout request

```http
  POST /auth/logout
```

| Header   | Type       | Description                           |
| :---------- | :--------- | :---------------------------------- |
| `Authorization` | `string` | **Required**. This is the Logged user token |

#### Returns
* 409 - `{ error: "Could not logout." }`
* 403 - `{ error: "Access Denied." }`
* 200 - ` { message: "Logged out." }`

#

#### Profile requests

```http
  GET /profile
```

| Header   | Type       | Description                           |
| :---------- | :--------- | :---------------------------------- |
| `Authorization` | `string` | **Required**. This is the Logged user token |

#### Returns
* 403 - `{ error: "Access Denied." }`
* 200 - ` { message: "Welcome to your profile (username)" }`

#

```http
  DELETE /profile
```

| Header   | Type       | Description                           |
| :---------- | :--------- | :---------------------------------- |
| `Authorization` | `string` | **Required**. This is the Logged user token |



#### Returns
* 403 - `{ error: "Access Denied." }`
* 200 - ` { message: "Account Deleted." }`

#

```http
  PATCH /profile
```

| Header   | Type       | Description                           |
| :---------- | :--------- | :---------------------------------- |
| `Authorization` | `string` | **Required**. This is the Logged user token |

| Parameter   | Type       | Description                           |
| :---------- | :--------- | :---------------------------------- |
| `username` | `string` | **Required**. This is the username |
| `password` | `string` | **Required**. This is the password |

#### Returns
* 403 - `{ error: "Access Denied." }`
* 400 - `{ error: "Bad Request." }`
* 200 - ` { message: "Data Updated." }`
## Run the server

Clone repo

```bash
  git clone https://github.com/GabrielDasNevesPinheiro/authentication-system.git
```

Enter the project directory

```bash
  cd authentication-system-main
```

install the dependencies

```bash
  npm install
```

Start server

```bash
  node src/app.js
```


## Author

- [@Gabriel das Neves](https://www.github.com/gabrieldasnevespinheiro)

