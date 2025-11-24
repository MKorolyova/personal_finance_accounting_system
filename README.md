# Multi-Service Node.js Project with PostgreSQL and RabbitMQ

## Project Description
This project is a **microservices-based application** built with **Node.js** and **NestJS**, featuring multiple services that communicate through **RabbitMQ**. It also includes a React front-end and end-to-end testing with Playwright.  

### Key Components
| Service | Description | Port |
|---------|-------------|------|
| Front-end | React application | 4000 |
| API Gateway | Handles routing, authentication | 3000 |
| Users Service | Manages user accounts and data | 3001 |
| Transactions Service | Handles transactions | 3002 |
| Goals Service | Manages user financial goals | 3003 |
| PostgreSQL | Database for services | 5432 |
| RabbitMQ | Message broker | 5672 (AMQP), 15672 (Management UI) |
| End-to-End Tests | Playwright tests for the application | N/A |

### Features
- Each service runs in its own Docker container.
- Services connect to PostgreSQL databases.
- RabbitMQ enables asynchronous communication between services.
- End-to-end tests can be executed using the dedicated container.

---

## Getting Started

### Prerequisites
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

### Run the Project
Open a terminal in the project root directory and run: 

```bash
docker-compose up --build
```

This will build and start all containers.

### Access the Services
 - Front-end: http://localhost:4000
 - API Gateway: http://localhost:3000
 - Users Service: http://localhost:3001
 - Transactions Service: http://localhost:3002
 - Goals Service: http://localhost:3003
 - RabbitMQ Management UI: http://localhost:15672 (Username: guest Password: guest)
