# Frontend

Welcome to the frontend of movie query engine project!


## Getting Started

You can run this project locally by following these steps:

### 1. Clone the Repository

```
git clone https://github.com/Lav-kaushik/movie-query-engine-frontend
cd frontend
```

### 2. Install Dependencies

Make sure you have [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed. Then run:

```
npm install
```

### 3. Start the Development Server

```
npm run dev
```

This will start the development server with hot reloading. Open your browser and go to the URL shown in the terminal.


## Technologies Used

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## Deployment

To deploy your project, follow your preferred deployment process (e.g., Vercel, Render , or your own server).

## Dockerfile

```
docker build   --build-arg VITE_API_URL=http://localhost:8000   -t frontend-app:v1 .

docker run -p 3000:80 --name frontend-app frontend-app:v1
```
Access the app on localhost:3000

