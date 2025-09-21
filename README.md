# $${\color{red}[UNFINISHED]}$$

# Invoicing Test App 

<p>
  Created by Jordy Jonathan Sjarif
</p>
<br>

# Features

- React.js
- React Redux
- Drizzle ORM
- Node.js
- Express
- MySQL
- WebSocket
  
# Getting Started
## Backend
```bash
cd backend
npm install
npm run build
npm run start
```


## Frontend

```bash
cd frontend
npm install
npm run start
```


## Docker Setup
MySQL
```bash
docker pull mysql8
docker run -d --name mysql8 -p 3306:3306 -e MYSQL_ROOT_PASSWORD= -e MYSQL_ALLOW_EMPTY_PASSWORD=yes mysql:8
```


## Database Setup (Drizzle)
first, you have to create the database first
```bash
CREATE DATABASE invoicing;
```

second, run this command
```bash
cd backend
npx drizzle-kit push
```

