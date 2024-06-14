# Deep Thoughts Social Media App

Deep Thoughts is a social media application built with the MERN stack (MongoDB, Express.js, React, Node.js). Users can sign up, post their thoughts, and interact with others, similar to real-life social media apps.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Available Scripts](#available-scripts)
- [Project Structure](#project-structure)
- [Learn More](#learn-more)
- [License](#license)

## Features

- User authentication with JWTs
- Create and manage thoughts
- Interact with other users
- GraphQL API integration with Apollo Server and Client
- Single-page application routing with React Router

## Technologies Used

- **MongoDB**: NoSQL database for storing user data and thoughts.
- **Express.js**: Web framework for Node.js.
- **React**: Front-end library for building user interfaces.
- **Node.js**: JavaScript runtime for the server.
- **GraphQL**: Query language for APIs.
- **Apollo Server**: GraphQL server for Express.js.
- **Apollo Client**: GraphQL client for React.
- **React Router**: Declarative routing for React applications.
- **Concurrently**: Run multiple processes with a single command.
- **jsonwebtoken**: JSON Web Token implementation for authentication.
- **jwt-decode**: Decode JWT tokens.
- **faker**: Generate fake data for development.
- **nodemon**: Automatically restart Node.js server on file changes.

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/deep-thoughts.git
    ```

2. Navigate to the project directory:
    ```sh
    cd deep-thoughts
    ```

3. Install the dependencies:
    ```sh
    npm install
    ```

4. Start the development server:
    ```sh
    npm run develop
    ```

## Usage

- Visit `http://localhost:3000` to view the application.
- Use the sign-up form to create a new account.
- Post new thoughts and interact with other users.

## Available Scripts

In the project directory, you can run:

- `npm run develop`: Runs both the server and client in development mode using concurrently.
- `npm run server`: Runs the Express.js server only.
- `npm run client`: Runs the React client only.

## Project Structure

```plaintext
deep-thoughts/
├── client/                 # React front-end
│   ├── public/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── utils/
│       └── App.js
├── server/                 # Express.js server
│   ├── config/
│   ├── models/
│   ├── schemas/
│   ├── utils/
│   └── server.js
├── .gitignore
├── package.json
└── README.md

## Learn More

- **MongoDB**: NoSQL database for flexible data storage.
- **Express.js**: Web framework for Node.js applications.
- **React**: JavaScript library for building user interfaces.
- **Node.js**: Runtime environment for server-side JavaScript.
- **GraphQL**: Query language for APIs, enabling precise data requests.
- **Apollo Server & Client**: Tools for building GraphQL servers and clients.
- **React Router**: Navigational components for single-page applications.
- **Concurrently**: Utility for running multiple processes simultaneously.
- **jsonwebtoken & jwt-decode**: Libraries for managing JWTs in authentication.
- **faker**: Library for generating mock data during development.
- **nodemon**: Tool for auto-restarting Node.js applications on file changes.

## License

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)


