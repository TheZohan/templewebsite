## ADDED Requirements

### Requirement: Registration fields
The form SHALL collect the following fields, mirroring the original Google Form: first name, last name, email, gender (choice of man / woman / other — all welcome), phone, health & sensitivities note (free text), "which element of nature are you" (free text), volunteer/contribution interest (free text), and general notes/requests (free text).

#### Scenario: All fields present
- **WHEN** a visitor views the form
- **THEN** inputs exist for first name, last name, email, gender, phone, health note, nature-element, volunteer interest, and notes

#### Scenario: Gender options offered
- **WHEN** a visitor reaches the gender field
- **THEN** the options man, woman, and other (all welcome) are selectable

### Requirement: Consent agreements
The form SHALL present the 5 safety/consent agreement statements as required checkboxes. The form SHALL NOT allow submission unless all 5 are checked.

#### Scenario: Submission blocked without all consents
- **WHEN** a visitor attempts to submit with one or more consent checkboxes unchecked
- **THEN** submission is blocked
- **AND** the unchecked required consents are indicated as errors

#### Scenario: Submission permitted with all consents
- **WHEN** all 5 consent checkboxes are checked and required fields are valid
- **THEN** the consent requirement no longer blocks submission

### Requirement: Required-field and format validation
The form SHALL require first name, last name, email, gender, and phone, and SHALL validate that email is a well-formed address before allowing submission. Free-text fields (health, nature-element, volunteer, notes) SHALL be optional.

#### Scenario: Missing required field
- **WHEN** a visitor submits with a required field empty
- **THEN** an inline Hebrew error identifies the missing field and submission is blocked

#### Scenario: Invalid email
- **WHEN** a visitor enters a malformed email and attempts to submit
- **THEN** an inline Hebrew error indicates the email is invalid and submission is blocked

#### Scenario: Optional fields may be empty
- **WHEN** a visitor leaves the free-text fields empty but completes required fields
- **THEN** validation passes for those optional fields

### Requirement: Submission states
The form SHALL communicate submitting, success, and error states. While a submission is in flight, it SHALL prevent duplicate submits. On success it SHALL show a Hebrew confirmation; on failure it SHALL show a Hebrew error and preserve entered data for retry.

#### Scenario: In-flight submission
- **WHEN** the visitor submits a valid form
- **THEN** the submit control shows a loading/disabled state and cannot be triggered again until the request resolves

#### Scenario: Successful submission confirmation
- **WHEN** the server confirms the registration was saved
- **THEN** the form is replaced by a Hebrew confirmation that restates the event details and pay-later instructions

#### Scenario: Failed submission retains data
- **WHEN** the server returns an error
- **THEN** a Hebrew error message is shown and the visitor's entered values are preserved so they can retry

### Requirement: Accessible RTL inputs
Form inputs SHALL be keyboard-accessible, have associated labels, and render correctly in the right-to-left layout, including mixed LTR tokens (email, phone, currency).

#### Scenario: Label association
- **WHEN** assistive technology focuses an input
- **THEN** the input's purpose is announced via its associated label

#### Scenario: Mixed-direction values
- **WHEN** a visitor types an email or phone number in an RTL field
- **THEN** the value renders left-to-right within the right-to-left layout without visual corruption
