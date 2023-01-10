# node-crud-api

## Installation
1. Clone repository to you computer
2. hange directory
3. Checkout to `develop` branch
4. Install dependecies

```sh
git clone git@github.com:Alexander-M-rss/node-crud-api.git
cd node-crud-api
git checkout develop
npm install
```
## Usage
- `npm run start:dev` - to start in development mode
- `npm run start:prod` - to build and start in production mode
- `npm test` - to run test suites

Default port is 4000. You can change port in `.env` file with 
```
port = port_number
```

## Implemented endpoint: `/api/users`

**GET** _/api/users_ - to get all users

**GET** _/api/users/${userId}_ - to get user by id (uuid)

**POST** _/api/users_ - to create record about new user and store it in database

**PUT** _/api/users/${userId}_ - to update existing user

**DELETE** _/api/users/${userId}_ - to delete existing user from database

Use JSON for request body (**all fields required!**):

```json
{
  "username": string,
  "age": number,
  "hobbies": []
}
```
`Notice:` Server will response with `404` code for security reason if unsupported method has been recieved.