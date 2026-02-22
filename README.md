# llm-gen-weather-article

![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![Swagger](https://img.shields.io/badge/-Swagger-%23Clojure?style=for-the-badge&logo=swagger&logoColor=white)

`llm-gen-weather-article` is a project designed to generate weather articles using AI. The project leverages machine learning models to analyze weather data and produce coherent and informative articles. This can be particularly useful for news agencies, bloggers, and anyone interested in automating the creation of weather-related content.

## Quick Start (Monorepo)

### 1. Database

Run docker compose from the root directory:

```sh
    docker compose up -d
```

### 2. Install Dependencies

Install dependencies for all apps from the root:

```sh
    npm install
```

### 3. Configure Environment

1.  **Backend**: Copy `.env.local` to `.env` in `apps/backend` and add your `GEMINI_API_KEY`.
2.  **Frontend**: Copy `.env.local` to `.env` in `apps/frontend`.

### 4. Run Applications

Start both backend and frontend concurrently:

```sh
    npm run dev
```

- Frontend UI: `http://localhost:3000`
- Backend API: `http://localhost:3001`
- **Swagger Documentation**: `http://localhost:3001/api`

### 5. Accessing API Documentation

Once the backend is running, you can access the interactive OpenAPI (Swagger) documentation to explore and test the endpoints directly from your browser:
👉 [Swagger UI - http://localhost:3001/api](http://localhost:3001/api)

## Features

- **Automated Article Generation**: Uses AI to generate weather articles based on the latest weather data.
- **Continuous Integration/Continuous Deployment (CI/CD)**: Implements CI/CD pipelines to ensure smooth and automated deployment of updates.
- **Serverless Deployment**: Utilizes Google Cloud Run for deploying the application in a serverless environment with autoscaling capabilities.
- **Advanced Language Model**: Generates articles using the Gemini LLM for high-quality, coherent content.

The repository is structured as a Turborepo monorepo, separating the UI and API logic:

1. **Frontend (`apps/frontend`)**: A Next.js application served on port 3000, responsible for capturing user preferences and displaying the generated articles.
2. **Backend (`apps/backend`)**: A standard NestJS API served on port 3001, providing endpoints for weather data retrieval and proxying requests to the Gemini AI model. It features robust architecture including:
   - **Global Exception Filters** to standardize error responses.
   - **Rate Limiting & Security Headers** to prevent abuse.
   - **Structured Logging (Pino)** for production-ready observability.
   - **Interactive API Documentation** generated automatically via Swagger.
3. **Database**: A MongoDB instance orchestrating via Docker Compose, used for caching and serving past weather articles quickly without recalling the LLM.

## Google Cloud Run

Google Cloud Run is a fully managed serverless platform that automatically scales your stateless containers. It abstracts away all infrastructure management, allowing you to focus on writing code. Key features include:

- **Autoscaling**: Automatically scales the number of container instances based on incoming traffic.
- **Serverless**: No need to manage servers, as Google Cloud Run handles all infrastructure.
- **Fast Deployment**: Quickly deploy and update your applications with minimal downtime.
- **Integrated Monitoring**: Built-in monitoring and logging to keep track of application performance.

## Article Generation with Gemini LLM

The project leverages the Gemini LLM to generate high-quality weather articles. Key features include:

- **Natural Language Processing**: Uses advanced NLP techniques to produce coherent and contextually accurate articles.
- **Customizable Outputs**: Allows customization of article tone and style to fit different audiences.
- **Real-time Data Integration**: Integrates with real-time weather data sources to ensure articles are up-to-date.
- **Scalability**: Capable of generating a large volume of articles to meet high demand.

## License

This project is licensed under the MIT License.
