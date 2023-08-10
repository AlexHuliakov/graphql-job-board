# GraphQL Job Board API

This is a GraphQL API for managing job listings and company information. It allows you to create, update, delete, and query job listings and associated companies.

## Features

- List job listings with pagination.
- Retrieve detailed information about a specific job.
- Get information about a company and its associated job listings.
- Create, update, and delete job listings.
- Secure authentication using JWT.
- Built on Express and Apollo Server for efficient GraphQL communication.
- Uses SQLite as the database backend.

## Getting Started

### Installation

1. Install the dependencies:

   ```bash
   npm install
   ```  
2. Create a `.env` file in the project root and configure the environment variables:

   ```env
   APP_PORT=9000
   DB_FILENAME="./data/db.sqlite3"
   ```  
3. Start the development server:

   ```bash
   npm run dev
   ```

   This will start the server using `nodemon`, which automatically restarts the server when changes are detected.

Open a web browser or use a tool like [Postman](https://www.postman.com/) to interact with the GraphQL API at `http://localhost:9000/graphql` or open it at browser with Apollo Server interface..

## API Documentation

Certainly! Here's a documentation section for the GraphQL schema of your Job Board API:

## GraphQL Schema Documentation

The GraphQL schema defines the structure of the API and the types of operations that can be performed. This documentation provides an overview of the available types, queries, mutations, and input types.

### Types

### Job

A type representing a job listing.

- `id` (ID!): The unique identifier for the job.
- `title` (String!): The title of the job.
- `description` (String!): The description of the job.
- `date` (String!): The date the job was created.
- `company` (Company!): The company associated with the job.

### Company

A type representing a company that posts job listings.

- `id` (ID!): The unique identifier for the company.
- `name` (String!): The name of the company.
- `description` (String!): The description of the company.
- `jobs` ([Job!]!): The list of jobs associated with the company.

### SubList

A type representing a paginated list of items.

- `items` ([Job!]!): The list of items in the sublist.
- `total` (Int!): The total count of items in the entire list.

### Queries

### jobs(limit: Int, offset: Int): SubList!

Retrieve a paginated list of job listings.

- `limit` (Int): The maximum number of items to retrieve (optional).
- `offset` (Int): The offset for pagination (optional).
- Returns a `SubList` containing job items and the total count.

### job(id: ID!): Job

Retrieve detailed information about a specific job.

- `id` (ID!): The unique identifier of the job.
- Returns a single `Job` item.

### company(id: ID!): Company

Retrieve detailed information about a specific company and its associated jobs.

- `id` (ID!): The unique identifier of the company.
- Returns a single `Company` item.

### Mutations

### createJob(input: CreateJobInput!): Job!

Create a new job listing.

- `input` (CreateJobInput!): The input data for creating a job.
  - `title` (String!): The title of the job.
  - `description` (String!): The description of the job.
- Returns the newly created `Job` item.

### updateJob(id: ID!, input: UpdateJobInput!): Job!

Update an existing job listing.

- `id` (ID!): The unique identifier of the job to update.
- `input` (UpdateJobInput!): The input data for updating the job.
  - `title` (String): The updated title of the job (optional).
  - `description` (String): The updated description of the job (optional).
- Returns the updated `Job` item.

### deleteJob(id: ID!): Job!

Delete a job listing.

- `id` (ID!): The unique identifier of the job to delete.
- Returns the deleted `Job` item.

### Input Types

### CreateJobInput

Input data for creating a new job listing.

- `title` (String!): The title of the job.
- `description` (String!): The description of the job.

### UpdateJobInput

Input data for updating an existing job listing.

- `id` (ID!): The unique identifier of the job.
- `title` (String): The updated title of the job (optional).
- `description` (String): The updated description of the job (optional).
