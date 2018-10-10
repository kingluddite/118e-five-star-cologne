# 5 Star Cologne MERN App

- Clone this repo

## Install app dependencies

- In the root of the app

`$ npm i`

- In the `/server` of the app

`$ cd server && npm i`

- In the client of the app

`$ cd ../` (go back to root of your app)

`$ cd client && npm i`

## variables.env

- You need to create a variables.env
- This file is not on github and in order for you to connect to MongoDB and
  authenticate you need to create this file

`variables.env`

```
MONGO_URI=put your mongo info here
SECRET=put your secret here
PORT=put your port here
```

## How to run app

- In the root of your app

`$ npm run dev`
