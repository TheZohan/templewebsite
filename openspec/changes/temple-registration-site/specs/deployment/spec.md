## ADDED Requirements

### Requirement: Railway-deployable build
The application SHALL build and run as a single web service deployable to Railway, binding to the port provided by the platform via the `PORT` environment variable.

#### Scenario: Build and start
- **WHEN** Railway builds and starts the service
- **THEN** the production build succeeds and the server starts, listening on the platform-provided `PORT`

#### Scenario: Honors PORT
- **WHEN** the platform sets the `PORT` environment variable
- **THEN** the server binds to that port rather than a hard-coded one

### Requirement: Environment-based configuration
All deployment-specific secrets and settings (Google service-account credentials, spreadsheet id, optional sheet tab/range) SHALL be supplied via environment variables, with no secrets committed to the repository.

#### Scenario: Missing required configuration
- **WHEN** a required environment variable (e.g. credentials or spreadsheet id) is absent at runtime
- **THEN** the server fails fast or the submission endpoint returns a clear configuration error rather than silently failing

#### Scenario: Documented configuration
- **WHEN** a developer prepares to deploy
- **THEN** the repository documents the required environment variables (e.g. via `.env.example` and README) without containing real secret values

### Requirement: Health check
The service SHALL expose a health endpoint that returns a successful response when the app is running, suitable for platform health checks.

#### Scenario: Health endpoint responds
- **WHEN** the health endpoint is requested on a running instance
- **THEN** it returns a successful (2xx) response
