## Environment Variables

for security reasons, an access key is defined on the server that must be passed in the header of each client request, thus avoiding requests from unwanted sources. 

the server uses the following environment variables:

`API_KEY` Key used for client application authorization (you should encrypt...)

`SERVER_URL` Server URL to make requests (ex: http://localhost:3000)




## Run the client project

Clone repo

```bash
  git clone https://github.com/GabrielDasNevesPinheiro/authentication-system.git
```

Enter the project directory

```bash
  cd authentication-system-main
  cd client
```

install the dependencies

```bash
  npm install
```

Start server

```bash
  npm run dev
```
