# Title Management App

## Setup Instructions

1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Start the application by running `npm start`.
4. The app will open at `http://localhost:3000`.

## Features

- User Authentication (login, register).
- MetaMask wallet integration.
- Title management (add, view, delete titles).

## Notes

I was unable to connect to the backend. I followed the setup instructions for Node.js (v20) and MySQL, but despite this, I encountered an issue with the client-req-scopes package, which prevented backend connectivity. Since this task focuses on the frontend, I concentrated on developing the UI and core functionality without backend integration.

Therefore, this app currently uses localStorage to store titles and authentication details.

Actual error message:

Cannot read properties of undefined (reading 'trim') at Object.<anonymous> (/hiring-task/node_modules/client-req-bans/lib/ip.js:1:2712)