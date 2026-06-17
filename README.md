# Budget Tracker App

A personal finance management application that helps users 
track income and expenses, set budgets, save toward goals, 
and gain insights into their spending habits.

---

## Table of Contents
- [About](#about)
- [Project Goals](#project-goals)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [System Architecture](#system-architecture)
- [Project Structure](#project-structure)
- [Development Methodology](#development-methodology)
- [Database Design](#database-design)
- [API Endpoints](#api-endpoints)
- [Setup Instructions](#setup-instructions)
- [Running the Application](#running-the-application)
- [Running Tests](#running-tests)
- [CI/CD Pipeline](#cicd-pipeline)
- [Security Practices](#security-practices)
- [Monitoring and Logging](#monitoring-and-logging)
- [Future Enhancements](#future-enhancements)
- [Documentation](#documentation)
- [Definition of Done](#definition-of-done)
- [Roadmap](#roadmap)
- [Learning Objectives](#learning-objectives)
- [License](#license)
- [Author](#author)

---

## About

Budget Tracker App allows users to securely manage their 
personal finances in one place — connecting accounts, 
tracking spending, setting budgets, working toward savings 
goals, and receiving alerts to avoid overspending or 
missed payments.

---

## Project Goals

- Develop a production-style web application.
- Apply industry-standard software development practices.
- Learn full-stack development using modern technologies.
- Gain hands-on experience with DevOps and cloud deployment.
- Build a portfolio project suitable for internships and job applications.

---

## Features

- **Account Setup** — secure sign up, login, profile editing, 
  and multi-account linking
- **Budget Management** — create categories, set spending 
  limits, track remaining budget
- **Spending Tracking** — manual entry, automatic 
  categorization, history and monthly summaries
- **Goals & Savings** — create and track progress toward 
  savings goals
- **Alerts & Reminders** — overspending alerts, bill 
  reminders, unusual purchase notifications
- **Reports & Insights** — charts, category comparisons, 
  budget improvement suggestions
- **Advanced Features** — transaction import/export, 
  recurring payment tracking, mobile home screen shortcut (PWA)

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Backend | Node.js with Express, Typescript, Prisma ORM | 
| Frontend | React+Vite, React Router, Typescript, Axios, Tailwind CSS |
| Database | PostgreSQL |
| Authentication | Password hashing (e.g. bcrypt), JWT-based auth |
| File Storage | Cloudinary |
| Containerization | Docker, Docker Compose |
| Testing | Vitest, Jest, Supertest, Playwright (unit test, api test) |
| Version Control | Git / GitHub |
| Documentation | Swagger OpenAPI |
| Devops | GitHub Actions, Docker Hub |
| Deployment | Vercel (Frontend), Railway/ Render (Backend), Supabase PostgreSQL |

---

## System Architecture

```text
┌──────────────┐
│   Frontend   │
│ React + TS   │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│  REST API    │
│ Express.js   │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ PostgreSQL   │
│   Prisma     │
└──────────────┘
```

---

## Project Structure

```text
budget-tracker-app/
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── tests/
│   │   ├── unit/
│   │   └── integration/
│   ├── .env.example
│   ├── package.json
│   └── .eslintrc.json          # or equivalent lint config
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── middleware/
│   │   ├── services/
│   │   ├── validators/
│   │   ├── config/              # app/db/env config setup
│   │   ├── models/               # if not using prisma schema only
│   │   └── utils/
│   │
│   ├── prisma/
│   │   └── schema.prisma
│   ├── tests/
│   │   ├── unit/
│   │   └── integration/
│   ├── .env.example
│   ├── package.json
│   └── .eslintrc.json
│
├── docs/
│   ├── api/                     # endpoint documentation
│   ├── architecture/
│   ├── diagrams/
│   └── test-plan/
│       └── TEST_PLAN.md
│
├── AI/
│   └── AI_LOG.md                # AI usage log (prompts, output, changes made)
│
├── docker/
│   ├── frontend.Dockerfile
│   └── backend.Dockerfile
│
├── .github/
│   └── workflows/
│       ├── ci.yml               # lint + test pipeline
│       └── deploy.yml           # optional deployment pipeline
│
├── .gitignore
├── docker-compose.yml
├── README.md
└── .env.example                 # root-level template if shared across services
```

---

## Development Methodology

### Agile Development

The project follows Agile principles using:

- Epics
- User Stories
- Sprint Planning
- Sprint Reviews
- Backlog Grooming

### Branching Strategy

```text
main
develop

feature/authentication
feature/listings
feature/search

bugfix/login-validation
hotfix/critical-bug
```

Workflow:

```text
Create Feature Branch
        ↓
Develop Feature
        ↓
Open Pull Request
        ↓
Code Review
        ↓
Merge to Develop
        ↓
Release to Main
```

---

---

## Database Design

### 1. `users`

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PK, default uuid() | Unique user identifier |
| email | VARCHAR(255) | UNIQUE, NOT NULL | Login email |
| password_hash | VARCHAR(255) | NOT NULL | Hashed password (bcrypt) |
| display_name | VARCHAR(100) | NOT NULL | Name shown in app |
| currency_preference | VARCHAR(10) | DEFAULT 'SGD' | Preferred currency |
| notification_settings | JSONB | DEFAULT '{}' | Notification preferences |
| created_at | TIMESTAMP | DEFAULT now() | Account creation date |
| updated_at | TIMESTAMP | DEFAULT now() | Last profile update |

---

### 2. `accounts`

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PK, default uuid() | Unique account identifier |
| user_id | UUID | FK → users.id, NOT NULL | Owner of the account |
| provider_name | VARCHAR(100) | NOT NULL | e.g. "DBS", "Chase" |
| account_type | VARCHAR(50) | NOT NULL | e.g. "checking", "savings", "credit" |
| balance | DECIMAL(12,2) | DEFAULT 0 | Current balance |
| currency | VARCHAR(10) | DEFAULT 'USD' | Account currency |
| is_active | BOOLEAN | DEFAULT true | Soft connect/disconnect flag |
| created_at | TIMESTAMP | DEFAULT now() | When linked |

---

### 3. `categories`

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PK, default uuid() | Unique category identifier |
| user_id | UUID | FK → users.id, NOT NULL | Owner of the category |
| name | VARCHAR(100) | NOT NULL | e.g. "Groceries" |
| icon | VARCHAR(50) | NULLABLE | Optional icon identifier |
| created_at | TIMESTAMP | DEFAULT now() | Creation date |
| | | UNIQUE(user_id, name) | Prevent duplicate category names per user |

---

### 4. `budget_limits`

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PK, default uuid() | Unique identifier |
| category_id | UUID | FK → categories.id, NOT NULL | Linked category |
| user_id | UUID | FK → users.id, NOT NULL | Owner (redundant for query speed) |
| monthly_limit | DECIMAL(12,2) | NOT NULL, CHECK >= 0 | Spending limit per month |
| month | DATE | NOT NULL | First day of month this limit applies to |
| created_at | TIMESTAMP | DEFAULT now() | Creation date |
| | | UNIQUE(category_id, month) | One limit per category per month |

---

### 5. `transactions`

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PK, default uuid() | Unique transaction identifier |
| user_id | UUID | FK → users.id, NOT NULL | Owner |
| account_id | UUID | FK → accounts.id, NULLABLE | Linked account (null if manual) |
| category_id | UUID | FK → categories.id, NULLABLE | Assigned category |
| type | VARCHAR(10) | NOT NULL, CHECK IN ('income','expense') | Transaction type |
| amount | DECIMAL(12,2) | NOT NULL, CHECK > 0 | Transaction amount |
| description | VARCHAR(255) | NULLABLE | Merchant/note |
| transaction_date | DATE | NOT NULL | When it occurred |
| is_auto_categorized | BOOLEAN | DEFAULT false | Auto vs manual category assignment |
| is_unusual | BOOLEAN | DEFAULT false | Flagged as large/unusual |
| created_at | TIMESTAMP | DEFAULT now() | Record creation |

---

### 6. `goals`

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PK, default uuid() | Unique goal identifier |
| user_id | UUID | FK → users.id, NOT NULL | Owner |
| name | VARCHAR(150) | NOT NULL | e.g. "Emergency Fund" |
| target_amount | DECIMAL(12,2) | NOT NULL, CHECK > 0 | Goal target |
| current_amount | DECIMAL(12,2) | DEFAULT 0 | Amount saved so far |
| target_date | DATE | NULLABLE | Optional deadline |
| status | VARCHAR(20) | DEFAULT 'active', CHECK IN ('active','completed') | Goal state |
| created_at | TIMESTAMP | DEFAULT now() | Creation date |
| updated_at | TIMESTAMP | DEFAULT now() | Last update |

---

### 7. `goal_contributions`

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PK, default uuid() | Unique contribution identifier |
| goal_id | UUID | FK → goals.id, NOT NULL | Linked goal |
| amount | DECIMAL(12,2) | NOT NULL, CHECK > 0 | Contribution amount |
| contributed_at | TIMESTAMP | DEFAULT now() | When contribution was made |

---

### 8. `subscriptions`

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PK, default uuid() | Unique identifier |
| user_id | UUID | FK → users.id, NOT NULL | Owner |
| name | VARCHAR(150) | NOT NULL | e.g. "Netflix" |
| amount | DECIMAL(12,2) | NOT NULL, CHECK > 0 | Billing amount |
| billing_frequency | VARCHAR(20) | NOT NULL, CHECK IN ('weekly','monthly','yearly') | Frequency |
| next_due_date | DATE | NOT NULL | Next charge date |
| reminder_sent | BOOLEAN | DEFAULT false | Avoid duplicate reminders |
| is_active | BOOLEAN | DEFAULT true | Soft delete flag |
| created_at | TIMESTAMP | DEFAULT now() | Creation date |

---

### 9. `notifications`

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PK, default uuid() | Unique identifier |
| user_id | UUID | FK → users.id, NOT NULL | Recipient |
| type | VARCHAR(50) | NOT NULL | e.g. "budget_limit", "bill_reminder", "unusual_purchase" |
| message | VARCHAR(255) | NOT NULL | Notification text |
| related_entity_id | UUID | NULLABLE | e.g. category_id, subscription_id |
| is_read | BOOLEAN | DEFAULT false | Read status |
| created_at | TIMESTAMP | DEFAULT now() | When triggered |

---

### 10. `pwa_install_events` (supports US-24 mobile shortcut)

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PK, default uuid() | Unique identifier |
| user_id | UUID | FK → users.id, NOT NULL | User who installed |
| platform | VARCHAR(20) | NOT NULL | e.g. "android", "ios" |
| installed_at | TIMESTAMP | DEFAULT now() | When shortcut was added |

---

### 11. `bills` (optional — only if one-off bills need separate tracking from subscriptions)

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PK, default uuid() | Unique identifier |
| user_id | UUID | FK → users.id, NOT NULL | Owner |
| name | VARCHAR(150) | NOT NULL | e.g. "Electricity Bill" |
| amount | DECIMAL(12,2) | NOT NULL, CHECK > 0 | Bill amount |
| due_date | DATE | NOT NULL | When payment is due |
| reminder_sent | BOOLEAN | DEFAULT false | Avoid duplicate reminders |
| is_paid | BOOLEAN | DEFAULT false | Payment status |
| created_at | TIMESTAMP | DEFAULT now() | Creation date |

---

### 12. `budget_suggestions` (optional — only if you want to track suggestion history)

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PK, default uuid() | Unique identifier |
| user_id | UUID | FK → users.id, NOT NULL | Owner |
| category_id | UUID | FK → categories.id, NULLABLE | Related category, if applicable |
| suggestion_text | VARCHAR(255) | NOT NULL | The suggestion shown |
| status | VARCHAR(20) | DEFAULT 'shown', CHECK IN ('shown','dismissed','accepted') | User response |
| created_at | TIMESTAMP | DEFAULT now() | When generated |

---

## API Endpoints

### Auth & Users (US-01, US-02)

| Method | Endpoint | Description | Auth Required |
|--------|----------|--------------|---------------|
| POST | /api/auth/register | Sign up new user | No |
| POST | /api/auth/login | Log in, returns session/JWT | No |
| POST | /api/auth/logout | Log out, invalidate session | Yes |
| GET | /api/users/me | Get current user profile | Yes |
| PUT | /api/users/me | Update profile details | Yes |

### Accounts (US-03)

| Method | Endpoint | Description | Auth Required |
|--------|----------|--------------|---------------|
| GET | /api/accounts | List all linked accounts | Yes |
| POST | /api/accounts | Connect a new account | Yes |
| DELETE | /api/accounts/:id | Disconnect/remove an account | Yes |

### Categories & Budgets (US-04, US-05, US-06, US-07)

| Method | Endpoint | Description | Auth Required |
|--------|----------|--------------|---------------|
| GET | /api/categories | List all categories | Yes |
| POST | /api/categories | Create a new category | Yes |
| PUT | /api/categories/:id | Edit a category | Yes |
| DELETE | /api/categories/:id | Delete a category | Yes |
| GET | /api/budgets?month=YYYY-MM | Get budget limits for a month | Yes |
| POST | /api/budgets | Set a spending limit for a category | Yes |
| PUT | /api/budgets/:id | Update a budget limit | Yes |
| GET | /api/budgets/remaining?month=YYYY-MM | Get remaining budget overview | Yes |

### Transactions (US-08, US-09, US-10, US-11, US-21, US-22)

| Method | Endpoint | Description | Auth Required |
|--------|----------|--------------|---------------|
| GET | /api/transactions?start=&end=&category= | List transactions with filters | Yes |
| POST | /api/transactions | Add income/expense manually | Yes |
| PUT | /api/transactions/:id | Edit a transaction (e.g. recategorize) | Yes |
| DELETE | /api/transactions/:id | Delete a transaction | Yes |
| GET | /api/transactions/summary?month=YYYY-MM | Get monthly income/expense summary | Yes |
| POST | /api/transactions/import | Import transactions via CSV | Yes |
| GET | /api/transactions/export?format=csv | Export transactions | Yes |
| POST | /api/transactions/:id/auto-categorize | Run auto-categorization logic on a transaction | Yes |

### Goals (US-12, US-13, US-14)

| Method | Endpoint | Description | Auth Required |
|--------|----------|--------------|---------------|
| GET | /api/goals | List all savings goals | Yes |
| POST | /api/goals | Create a new goal | Yes |
| PUT | /api/goals/:id | Update a goal | Yes |
| DELETE | /api/goals/:id | Delete a goal | Yes |
| POST | /api/goals/:id/contributions | Add a contribution to a goal | Yes |
| GET | /api/goals/:id/progress | Get progress details for a goal | Yes |

### Subscriptions (US-23)

| Method | Endpoint | Description | Auth Required |
|--------|----------|--------------|---------------|
| GET | /api/subscriptions | List recurring payments | Yes |
| POST | /api/subscriptions | Add a recurring payment | Yes |
| PUT | /api/subscriptions/:id | Edit a recurring payment | Yes |
| DELETE | /api/subscriptions/:id | Remove a recurring payment | Yes |

### Notifications (US-15, US-16, US-17)

| Method | Endpoint | Description | Auth Required |
|--------|----------|--------------|---------------|
| GET | /api/notifications | List notifications | Yes |
| PUT | /api/notifications/:id/read | Mark notification as read | Yes |
| POST | /api/notifications/check-budget-limits | Trigger check for category limit alerts (US-15) | Yes (or internal/cron) |
| POST | /api/notifications/check-bill-reminders | Trigger check for upcoming bill reminders (US-16) | Yes (or internal/cron) |
| POST | /api/notifications/check-unusual-purchases | Trigger check for large/unusual transactions (US-17) | Yes (or internal/cron) |


### Reports & Insights (US-18, US-19, US-20)

| Method | Endpoint | Description | Auth Required |
|--------|----------|--------------|---------------|
| GET | /api/reports/income-vs-expense?start=&end= | Chart data for income vs expense | Yes |
| GET | /api/reports/category-comparison?start=&end= | Spending breakdown by category | Yes |
| GET | /api/reports/suggestions | Budget improvement suggestions | Yes |

### PWA / Mobile Shortcut (US-24)

| Method | Endpoint | Description | Auth Required |
|--------|----------|--------------|---------------|
| GET | /manifest.json | Web app manifest for installability | No |
| POST | /api/pwa/install-event | Log a successful home screen install | Yes |

### Health Check

| Method | Endpoint | Description | Auth Required |
|--------|----------|--------------|---------------|
| GET | /api/health | Health check endpoint | No |

---

## Setup Instructions

**1. Clone the repository**
```bash
git clone 
cd budget-tracker-app
```

**2. Install dependencies**
```bash
npm install
```

**3. Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Port the server runs on | `3000` |
| `DATABASE_URL` | Connection string for the database | — |
| `SECRET_KEY` | Secret key for session/JWT signing | — |

Never commit `.env` to version control. 
Use `.env.example` as a reference template only.


**4. Docker Setup

### Build Containers

```bash
docker-compose build
```

### Start Containers

```bash
docker-compose up
```

### Stop Containers

```bash
docker-compose down
```

---

**5. Database Migration

### Generate Migration

```bash
npx prisma migrate dev
```

### Apply Migration

```bash
npx prisma migrate deploy
```

### Open Prisma Studio

```bash
npx prisma studio
```

---

## Running the Application

```bash
# Development mode (with auto-reload, if nodemon is installed)
npm run dev

# Production mode
npm start
```

Application runs at `http://localhost:3000` (or your 
configured `PORT`).

---

## Running Tests

### Unit Tests

```bash
npm run test
```

### API Tests

```bash
npm run test:api
```

### End-to-End Tests

```bash
npm run test:e2e
```

### Test Coverage

```bash
npm run test:coverage
```

---

## CI/CD Pipeline

The GitHub Actions pipeline performs:

1. Install Dependencies
2. Lint Source Code
3. Run Unit Tests
4. Run API Tests
5. Build Application
6. Build Docker Images
7. Deploy Application

---

## Security Practices

- JWT Authentication
- Password Hashing (bcrypt)
- Input Validation (Zod)
- SQL Injection Prevention
- Rate Limiting
- Environment Variables
- CORS Protection

---

## Monitoring and Logging

### Logging

- Pino Logger

### Monitoring

- Sentry

### Metrics (Future)

- Prometheus
- Grafana

---

## Future Enhancements

- Real-Time Chat
- Push Notifications
- Wishlist
- Recommendation Engine
- AI Listing Description Generator
- AI Content Moderation
- Admin Dashboard
- Analytics Dashboard
- Mobile Application
- Multi-language Support

---

## Documentation

Project documentation includes:

- Software Requirements Specification (SRS)
- System Architecture Diagram
- ER Diagram
- API Documentation
- Deployment Diagram
- Sequence Diagrams
- User Manual

---

## Definition of Done

Full Definition of Done is documented in the 
[Wiki](./wiki/Definition-of-Done) and referenced in 
every user story.

Summary of key requirements:
- Acceptance criteria met and verified
- Code committed via feature branch and merged via 
  pull/merge request
- Unit tests written and passing
- No hardcoded secrets or credentials
- Passwords always hashed, never stored in plaintext
- Correct HTTP status codes returned by all endpoints

---

## Roadmap

| Theme | Status |
|-------|--------|
| Core Account Setup | Planned |
| Budget Management | Planned |
| Tracking Spending | Planned |
| Goals and Savings | Planned |
| Alerts and Reminders | Planned |
| Reports and Insights | Planned |
| Advanced Features | Planned |

---

## Learning Objectives

This project aims to provide practical experience in:

- Frontend Development
- Backend Development
- Database Design
- REST API Development
- Authentication & Security
- Docker & Containerization
- CI/CD Automation
- Automated Testing
- Cloud Deployment
- Agile Development
- Software Architecture

---

## License

This project is developed for educational and portfolio purposes.

---

## Author

Shin Paing Min

©2026 Shin Paing Min

This README will be updated as features are implemented.