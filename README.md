# 🌌 Astronomy AI Explorer — Frontend

A modern, responsive astronomy discovery web application built with **Angular and TypeScript**, integrated with a Spring Boot REST API. The application allows users to explore astronomical objects, search for relevant content using semantic search, and manage astronomy data through a role-based interface.

## 🔗 Project Repositories

- **Frontend (this repository):** Angular — [astronomy-ai-explorer-ui](https://github.com/GhezaeGoitom/astronomy-ai-explorer-ui)
- **Backend:** Spring Boot — [astronomy-ai-explorer](https://github.com/GhezaeGoitom/astronomy-ai-explorer)

## ✨ Features

### 🌠 Astronomy Exploration

Browse and manage nine categories of astronomical objects:

- Universe
- Galaxy
- Galactic Cluster
- Galactic Supercluster
- Solar System
- Planet
- Star
- Supernova
- Black Hole

Each category has dedicated list, detail, and create/edit pages, with modification actions displayed according to the user's role.

### 🔐 Authentication and Authorization

- Login using JWT-based authentication.
- Persist authentication tokens and user roles.
- Automatically attach authentication tokens to API requests using an HTTP interceptor.
- Protect routes using Angular route guards.
- Restrict administrative pages based on user roles.
- Display or hide modification actions according to permissions.

**Supported roles:**

| Role | Frontend access |
|---|---|
| `ROLE_GUEST` | Browse astronomy information and use permitted search features. |
| `ROLE_SCIENTIST` | Browse, create, and modify astronomy records. |
| `ROLE_ADMIN` | Manage astronomy records and access administrative user management. |

The current frontend permission model allows scientists to modify astronomy records generally. Scientist-specific record ownership is planned for a future version and must be enforced by the backend.

### 👤 User Registration

- Public account registration.
- Username, email, password, and password confirmation fields.
- Form validation and submission feedback.
- Loading, success, and error states.
- Navigation to the login page after successful registration.

### 🛡️ Administration

The administrative interface provides:

- User listing and account information.
- User creation and editing.
- Account enable/disable controls.
- Role assignment and updates.
- User deletion.
- Role-specific badges and account status indicators.

### 🔎 Semantic Search

Search for astronomy content using natural-language queries.

- Submit queries through the backend's semantic search API.
- Display matching content with its entity type and ID.
- Navigate from a result to the corresponding astronomy detail page.
- Show loading, empty, and search-result states.

The semantic search and vector similarity processing are handled by the Spring Boot backend; the Angular frontend provides the search interface and result navigation.

### 📊 Dashboard and Navigation

- Central dashboard for navigating the application.
- Shared navigation bar and sidebar.
- Dedicated routes for astronomy categories, authentication, search, and administration.
- Consistent layout across application features.

### 🎨 User Interface

- Modern dark-space and observatory-inspired design.
- Consistent colors, typography, rounded cards, and subtle gradients.
- Entity-specific accent colors.
- Responsive layouts for different screen sizes.
- Form validation messages and interactive button states.
- Loading, empty, and error states for a clearer user experience.

## 🛠️ Technology Stack

- **Angular** — frontend framework
- **TypeScript** — application logic and type safety
- **Angular Signals** — reactive state management
- **Angular Router** — navigation and route protection
- **Angular Forms** — form handling and validation
- **Angular HttpClient** — backend API communication
- **HTTP Interceptors** — JWT attachment to API requests
- **HTML5 and CSS3** — structure and styling

## 🏗️ Project Structure

The application uses Angular standalone components and organizes functionality by feature.

```text
src/
└── app/
    ├── core/
    │   ├── auth/
    │   ├── guards/
    │   ├── interceptors/
    │   └── services/
    │       ├── search/
    │       └── user/
    │
    ├── shared/
    │   └── components/
    │       ├── navbar/
    │       └── sidebar/
    │
    ├── features/
    │   ├── auth/
    │   │   ├── login/
    │   │   └── register/
    │   │
    │   ├── dashboard/
    │   ├── search/
    │   ├── admin/
    │   │   └── users/
    │   │       ├── user-list/
    │   │       └── user-form/
    │   │
    │   ├── planets/
    │   ├── stars/
    │   ├── galaxies/
    │   ├── solar-systems/
    │   ├── universes/
    │   ├── galactic-clusters/
    │   ├── galactic-superclusters/
    │   ├── supernovae/
    │   └── black-holes/
    │
    ├── app.routes.ts
    └── app.config.ts
```

Astronomy features follow a consistent component organization:

```text
features/<entity>/
├── <entity>-list/
├── <entity>-form/
├── <entity>-detail/
└── <entity>.models.ts
```

The exact filenames may differ between features.

## ⚙️ Getting Started

### Prerequisites

- Node.js and npm compatible with the project's Angular version.
- Angular CLI.
- The [Spring Boot backend](https://github.com/GhezaeGoitom/astronomy-ai-explorer) configured and running.

### 1. Clone the repository

```bash
git clone https://github.com/GhezaeGoitom/astronomy-ai-explorer-ui.git
cd astronomy-ai-explorer-ui
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure the backend API

Ensure the frontend's API configuration points to your running Spring Boot backend. The current development API base URL is:

```text
http://localhost:8080/api
```

Check the project's environment configuration if your backend uses a different host or port.

### 4. Start the development server

```bash
ng serve
```

Open the local URL shown in the terminal, typically:

```text
http://localhost:4200
```

## 🔗 Backend Integration

The frontend communicates with the Spring Boot backend for:

- Authentication and JWT-based access.
- User and role administration.
- Astronomy entity operations.
- Semantic search.
- Data retrieval and persistence.

See the [backend repository](https://github.com/GhezaeGoitom/astronomy-ai-explorer) for server-side implementation, database configuration, API endpoints, and security logic.

## 🗺️ Future Improvements

Potential future enhancements include:

- Scientist-specific ownership and record-level permissions.
- An AI astronomy assistant integrated with Spring AI.
- Natural-language question answering about astronomical objects.
- Expanded automated frontend tests.
- Production deployment and improved accessibility.

## 🎯 Project Goal

Astronomy AI Explorer aims to make astronomy information easier to discover through a clean web interface that combines structured astronomy data, secure access, and semantic search.

The project demonstrates modern Angular development, reactive state management, REST API integration, authentication, and role-aware user experiences.
