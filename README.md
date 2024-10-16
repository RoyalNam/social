# Social

## Overview

The `social` project is designed to facilitate social interactions and networking through a user-friendly interface. It aims to provide features such as user profiles, messaging, and content sharing, making it a versatile platform for connecting with others.

### Demo

You can try the demo of the project at this link: [Social](https://social-eight-psi.vercel.app)

## Features

-   **User Profiles**: Create and manage user profiles with personal information and preferences.
-   **Messaging**: Send and receive messages in real-time with other users.
-   **Content Sharing**: Share posts, images with your network.
-   **Notifications**: Stay updated with real-time notifications for messages, likes, and comments.

## Technologies Used

-   **Frontend**: [Next.js](https://nextjs.org/)
-   **Backend**: [Node.js](https://nodejs.org/) with [Express.js](https://expressjs.com/)
-   **Database**: [MongoDB](https://www.mongodb.com/)
-   **Real-time Communication**: [Socket.IO](https://socket.io/)

## Installation

To get started with the `social` project, follow these steps:

1. Clone the repository:

    ```bash
    git clone https://github.com/RoyalNam/social.git
    ```

2. Navigate to the project directory:

    ```bash
    cd social
    ```

3. Install the dependencies for the server:

    ```bash
    cd server
    npm install
    ```

4. Start the server:

    ```bash
    npm run dev
    ```

5. Open a new terminal window/tab, navigate to the client directory, and install the dependencies:

    ```bash
    cd ../client
    npm install
    ```

6. Start the client:

    ```bash
    npm run dev
    ```

7. Open your browser and navigate to `http://localhost:3000` to see the application in action.

## Usage

-   **Sign Up**: Create a new account by filling out the registration form.
-   **Log In**: Access your account with your credentials.
-   **Explore**: Browse through user profiles and content shared by others.
-   **Connect**: Follow other users to see their updates and shared content in your feed.

## Environment Variables

To set up your `social` project, you'll need to configure environment variables for both the client and server:

1. **Create a `.env` File**:

    - Copy the provided `.env.example` file in both the `server` and `client` directories and rename it to `.env`:
        ```bash
        cp server/.env.example server/.env
        cp client/.env.example client/.env
        ```

2. **Customize Your Variables**:

    - Open the `.env` file in each directory and update the values based on your setup. Key variables include:
        - **Server:**
            - `DATABASE_URL`: Your MongoDB connection string.
            - `JWT_SECRET`: Secret key for signing JSON Web Tokens.
            - `PORT`: The port for your server (default is `5000`).
        - **Client:**
            - `NEXT_PUBLIC_API_URL`: Base URL for your API endpoints.

3. **Accessing Variables**:
    - In your Node.js backend, use `process.env.VARIABLE_NAME` to access the variables, e.g., `process.env.DATABASE_URL`.
    - In your Next.js frontend, use `process.env.NEXT_PUBLIC_VARIABLE_NAME` to access the variables.

## License

This project is licensed under the [MIT License](LICENSE).

## Contact

For questions or feedback, please reach out to [hoangnam242003@gmail.com](mailto:hoangnam242003@gmail.com).
