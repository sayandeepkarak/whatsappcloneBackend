
# WhatsappClone backend

It is the backend part of WhatsappClone project with Mern Stack. I used Socket.io for real time communication. For authentication i used otp verification process in email with nodemailer. And for authorization i used jsonwebtoken with refresh and access token functionality.

## Tech Stack

**Client:** React, Redux, Socket.io-Client

**Server:** Node, Express, Socket.io

**Database:** Mongodb

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`APP_PORT`

`DATABASE_URL`

`EMAIL_SERVICE_USERNAME`

`EMAIL_SERVICE_KEY`

`SECRET_KEY`

`SECRET_KEY_ACCESS`




## API Reference

#### Send otp in email

```http
  POST /api/sendOtp
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `string` | **Required**.  |

#### Verify otp and create user if not exist

```http
  POST /api/verifyOtp
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `string` | **Required**.  |
| `otp` | `string` | **Required**.  |

#### Delete otp

```http
  DELETE /api/deleteOtp
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `string` | **Required**.  |

#### Upload user details

```http
  POST /api/uploadDetails
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `fullName` | `string` | **Required**.  |
| `email` | `string` | **Required**.  |

### Logout

```http
  POST /api/logout
```

| Cookie | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `refresh-key` | `string` | **Required**.  |

### Get access token

```http
  GET /api/refresh
```

| Cookie | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `refresh-key` | `string` | **Required**.  |

### Get user details

```http
  GET /api/userDetails
```

| Cookie | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `access-key` | `string` | **Required**.  |

### Get all users

```http
  GET /api/users
```

### Create connection between users

```http
  POST /api/createConnection
```

| Cookie | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `access-key` | `string` | **Required**.  |

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `personId` | `string` | **Required**.  |

### Get all connections

```http
  GET /api/allConnection
```

| Cookie | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `access-key` | `string` | **Required**.  |

### Get a single chat

```http
  GET /api/getChat
```

| Cookie | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `access-key` | `string` | **Required**.  |

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `chatId` | `string` | **Required**.  |

### Send message

```http
  POST /api/sendMessage
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `message` | `string` | **Required**.  |
| `chatId` | `string` | **Required**.  |
| `userId` | `string` | **Required**.  |

### Get last message

```http
  GET /api/lastMessage
```

| Cookie | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `access-key` | `string` | **Required**.  |

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `chatId` | `string` | **Required**.  |

## Socket events

#### IO connection

```socket
  connection
```

| Parameter     | Type     | Description                         |
| :------------ | :------- | :---------------------------------- |
| `userId` | `string` | **Required**. |
| `name`     | `string` | **Required**. |

#### Join a chat room

```socket
  join-chat-room
```

| Parameter     | Type     | Description                         |
| :------------ | :------- | :---------------------------------- |
| `chatId` | `string` | **Required**. |

#### Join a chat room

```socket
  addFriend
```

| Parameter     | Type     | Description                         |
| :------------ | :------- | :---------------------------------- |
| `id` | `string` | **Required**. |
| `userName` | `string` | **Required**. |
| `friendName` | `string` | **Required**. |

#### Send active response

```socket
  sendActiveResponse
```

| Parameter     | Type     | Description                         |
| :------------ | :------- | :---------------------------------- |
| `chatId` | `string` | **Required**. |

#### New chat send

```socket
  chatsend
```

| Parameter     | Type     | Description                         |
| :------------ | :------- | :---------------------------------- |
| `chatId` | `string` | **Required**. |
| `message` | `string` | **Required**. |

#### Recieve message

```socket
  messageRecieved
```

| Parameter     | Type     | Description                         |
| :------------ | :------- | :---------------------------------- |
| `chatId` | `string` | **Required**. |
| `message` | `string` | **Required**. |





