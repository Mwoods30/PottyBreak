# Bathroom Sign-In App

This is a bathroom sign-in application built with Next.js. It allows users to sign in to use the bathroom, manage a waiting list, and track the current user.

## Features

- User authentication with a simple login form.
- Sign-in functionality with time intervals and shower preferences.
- Displays a waiting list of users and the current user using the bathroom.
- Logout functionality to allow users to exit the application.

## Getting Started

To get started with the project, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd bathroom-signin-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser and navigate to:**
   ```
   http://localhost:3000
   ```

## Project Structure

- `pages/api/index.js`: API route for handling sign-in and sign-out requests.
- `pages/index.js`: Main page of the application with the sign-in form and user lists.
- `pages/_app.js`: Initializes pages and can wrap the application with context providers.
- `public/styles.css`: Contains the CSS styles for the application.
- `package.json`: Configuration file for npm, listing dependencies.
- `next.config.js`: Configuration settings for the Next.js application.

## Usage

- Users can log in with a username.
- After logging in, users can sign in to use the bathroom by selecting a time interval and indicating if they will take a shower.
- The application displays a waiting list and the current user using the bathroom.
- Users can log out when they are done.

## License

This project is licensed under the MIT License.