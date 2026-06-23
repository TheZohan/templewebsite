## ADDED Requirements

### Requirement: Submission endpoint
The system SHALL expose a server endpoint that accepts a registration payload via HTTP POST as JSON.

#### Scenario: Accepts POST
- **WHEN** a client sends a POST request with a JSON registration payload to the endpoint
- **THEN** the server processes it and returns a JSON response

#### Scenario: Rejects non-POST
- **WHEN** a client sends a non-POST request to the endpoint
- **THEN** the server responds with a method-not-allowed error

### Requirement: Server-side validation
The endpoint SHALL validate the payload server-side using the same rules as the client (required fields present, valid email, all 5 consents true) and SHALL reject invalid payloads without persisting them.

#### Scenario: Invalid payload rejected
- **WHEN** the endpoint receives a payload missing a required field or with a consent set to false
- **THEN** it responds with a 400-class error describing the validation failure
- **AND** no row is written to the sheet

#### Scenario: Valid payload accepted
- **WHEN** the endpoint receives a payload that passes all validation rules
- **THEN** it proceeds to persist the registration

### Requirement: Persist to Google Sheet
On a valid submission, the endpoint SHALL append one row to the configured Google Sheet containing the submitted field values, using a Google service account for authentication. Configuration (spreadsheet id, credentials, optional tab/range) SHALL come from environment variables.

#### Scenario: Row appended on success
- **WHEN** a valid registration is submitted
- **THEN** a new row containing the submission's values is appended to the configured sheet
- **AND** the endpoint responds with a success status

#### Scenario: Credentials come from environment
- **WHEN** the server authenticates to Google Sheets
- **THEN** it uses service-account credentials and spreadsheet id read from environment variables, never hard-coded or exposed to the client

### Requirement: Graceful persistence failure
If appending to the sheet fails, the endpoint SHALL respond with a server-error status and a user-presentable message, and SHALL NOT report success.

#### Scenario: Sheets API failure
- **WHEN** the Google Sheets append call fails
- **THEN** the endpoint responds with a 5xx error and a message the client can display
- **AND** the client is not told the registration succeeded

### Requirement: Secrets not exposed to client
The service-account credentials SHALL exist only on the server and SHALL never be sent to or referenced by client-side code.

#### Scenario: No credential leakage
- **WHEN** the client bundle and network responses are inspected
- **THEN** no service-account private key or credential material is present
