# RegLearn Learning Module — Functional and Agentic QA Specification

**Source:** Product Requirements Document (PRD) — RegLearn v1.0
**Product Type:** Compliance-focused SaaS Learning Management System (LMS)
**Specification Status:** Derived QA, Agentic, and Automation Baseline
**Version:** 1.0 (Updated)

> **Scope note:** This specification isolates the RegLearn Learning Module, focusing on organization onboarding, staff management, course catalog/purchasing, course players, and admin controls. Broader platform features are excluded except where integration is required.

> **Environment note:** URLs and credentials for QA and Production environments are detailed below. All credentials must be loaded via environment variables in automation scripts and must never be hard-coded.

---

## 1. Platform Access and Roles

### QA Environment

| Portal | Primary Role | Actual URL | Username | Password | Env Variable mappings |
|---|---|---|---|---|---|
| **Learner Portal** | Staff Learner | `https://regtech365learning-fe-qa.gentlemeadow-8588bc06.eastus.azurecontainerapps.io/` | `saminuibadan@mailinator.com` | `Grace@2A` | `QA_LEARNER_URL`<br>`QA_LEARNER_EMAIL`<br>`QA_LEARNER_PASSWORD` |
| **Organization Admin** | Org Administrator | `https://regtech365learning-admin.gentlemeadow-8588bc06.eastus.azurecontainerapps.io/courses` | `testing123@mailinator.com` | `ziononline.24A` | `QA_ORG_ADMIN_URL`<br>`QA_ORG_ADMIN_EMAIL`<br>`QA_ORG_ADMIN_PASSWORD` |
| **RegLearn Admin / Super Admin** | Platform Administrator | `https://reglearn-admin-qa.gentlemushroom-84487ebc.eastus.azurecontainerapps.io/trainers` | `elec@mailinator.com` | `ziononline.24A` | `QA_SUPER_ADMIN_URL`<br>`QA_SUPER_ADMIN_EMAIL`<br>`QA_SUPER_ADMIN_PASSWORD` |
| **Trainer Portal** | Content Manager / Trainer | `https://reglearn-admin-qa.gentlemushroom-84487ebc.eastus.azurecontainerapps.io/auth` | `vurefag@mailinator.com` | `ziononline.24A` | `QA_TRAINER_URL`<br>`QA_TRAINER_EMAIL`<br>`QA_TRAINER_PASSWORD` |

### Production Environment

| Portal | Primary Role | Actual URL | Username | Password | Env Variable mappings |
|---|---|---|---|---|---|
| **Super Admin / Admin** | Platform Administrator | `https://regtech365learning-admin.gentlemeadow-8588bc06.eastus.azurecontainerapps.io/` | `operations@regtech365.com` | `ziononline.24A` | `PROD_ADMIN_URL`<br>`PROD_ADMIN_EMAIL`<br>`PROD_ADMIN_PASSWORD` |
| **Learner Portal** | Production Learner | `https://learn.regtech365.com/` | `obinna.obasi@opexconsult.co.uk` | `Jeremiah2911#` | `PROD_LEARNER_URL`<br>`PROD_LEARNER_EMAIL`<br>`PROD_LEARNER_PASSWORD` |

---

## 2. Test Strategy: Repetition-First Automation

RegLearn automation must be selected primarily by **workflow repetition, determinism, reset capability, and user-facing business value**.

A feature must not be placed in the routine automation backlog merely because it is important, dependent on another system, or described in the PRD. Automation should remove repetitive manual effort without introducing unstable setup, one-time account states, inbox dependencies, or uncontrolled data accumulation.

### 2.1 Automation Selection Rule

A scenario is suitable for the routine automated suite when it:

- Is performed repeatedly by Learners, Organization Admins, Trainers, or Super Admins.
- Produces an objective and observable pass/fail result.
- Can run independently without relying on a previous test.
- Uses a stable existing account or safely resettable synthetic data.
- Can be rerun without exhausting a one-time token, invitation, verification link, or account state.
- Has reliable setup and cleanup.
- Does not depend on an uncontrolled third-party inbox, payment provider, streaming service, or timing-sensitive background process.
- Provides enough regression value to justify maintenance.

### 2.2 Automation Classes

#### Class A — Stable CI Automation

Run after deployments and during ordinary regression:

- Login with known active accounts.
- Invalid login and required-field validation.
- Logout and post-logout route protection.
- Role-based route and API denial.
- Catalog browsing, search, filtering, sorting, and course-detail access.
- Cart add, remove, quantity update, and seat-count validation before payment.
- Staff table search, filtering, pagination, and visible record validation.
- CSV file-type, header, duplicate-row, and malformed-row validation.
- Course assignment form validation.
- Assigned-course visibility using stable seeded accounts.
- Learner dashboard, shelf, deadlines, and course-card access.
- Course/module navigation.
- Video-player control availability where media is deterministic.
- Report filter and export controls.
- Course-authoring form validation.
- Admin list, search, filtering, and status visibility.
- Repeatable bug-fix regression.

#### Class B — Controlled Stateful Automation

Automate only when a reset, cleanup API, reversible workflow, or dedicated disposable tenant exists:

- Successful CSV staff import.
- Course assignment and unassignment.
- Course-progress updates.
- Quiz attempts and retakes.
- Final-exam locking and unlocking.
- Course draft creation, editing, publication, and archival.
- Free-course enrollment.
- Cart checkout up to a mocked or sandboxed payment boundary.
- Completion and certificate generation.
- Dashboard metric reconciliation after controlled record creation.

These tests must not run in the ordinary CI suite unless their data can be restored reliably.

#### Class C — Manual or On-Demand Integration Checks

Do not place these in the routine regression suite:

- Organization registration that creates a permanent new organization.
- Email verification links.
- One-time activation links.
- Super Admin activation of newly registered organizations.
- Actual invitation-email receipt.
- Actual course-assignment email receipt.
- Password-reset emails.
- 2FA delivery through email or SMS.
- Real payment processing.
- Real payment-webhook delivery.
- Email-provider deliverability.
- Long-duration course completion.
- Full video playback over external media infrastructure.
- Any flow requiring a new mailbox for every execution.

These may be tested manually, through a provider sandbox, through contract tests, or as a separately scheduled release check.

### 2.3 Test Independence

Every automated test must:

- Create or obtain its own prerequisites.
- Avoid depending on another `it()` block.
- Be executable alone.
- Use deterministic or collision-resistant data.
- Restore changed state where required.
- Assert a user-visible result in addition to an HTTP response.
- Fail with a clear reason when required seeded data is unavailable.

---

## 3. Feature List and Automation Mapping

### A. Authentication and Session Management — Active, Class A

#### Repetitive User-Facing Flows

- Learner login with an existing active account.
- Organization Admin login with an existing active account.
- Super Admin login with an existing active account.
- Trainer login with an existing active account.
- Invalid password rejection.
- Unknown-account rejection.
- Empty email and password validation.
- Invalid email-format validation.
- Password masking.
- Login-button loading and duplicate-submit protection.
- Correct role landing page after login.
- Session persistence after page refresh.
- Logout.
- Protected-route denial after logout.
- Direct navigation to unauthorized role routes.
- Backend API authorization denial where observable.

#### Not Routine Automation

- New organization registration.
- Email verification.
- Organization activation.
- Activation-notification email.
- 2FA delivery unless a deterministic test bypass or provider sandbox exists.
- Password-reset email.

### B. Registration and Organization Activation — Class C

The PRD describes organization registration, inactive status, Super Admin activation, and email notifications. These are valid product requirements but are **not suitable for ordinary repetitive UI automation** because they create one-time account states and may require unique inboxes and activation links.

Maintain:

- A manual registration checklist.
- An API contract test where a disposable organization can be deleted.
- An on-demand release test where a controlled inbox and cleanup procedure exist.
- Form-level validation tests only if the registration page itself is repeatedly changed.

Do not make successful registration or email verification a prerequisite for authentication regression.

### C. Learning Catalog and Course Discovery — Active, Class A

#### Automate

- Catalog page loads for the permitted role.
- Course cards render.
- Search by course title or keyword.
- Filter by category or topic.
- Clear filters.
- No-result state.
- Sorting where implemented.
- Pagination where implemented.
- Course-detail page access.
- Free/paid status display.
- Assigned-only visibility for Staff Learners.
- Full-catalog visibility for eligible independent or Organization Admin users.
- Purchased/enrolled course state where stable seeded data exists.
- Course mapping or standard label display where implemented.

#### Manual or Pending

- AI-assisted course recommendations where outputs are non-deterministic.
- Accuracy of regulatory-standard recommendations.
- Subjective content quality.

### D. Cart, Seat Selection, and Checkout Boundary — Active, Class A/B

#### Stable CI Automation

- Add a paid course to cart.
- Prevent duplicate cart entries.
- Remove course from cart.
- Update seat quantity.
- Reject zero, blank, negative, non-numeric, or out-of-range seat values.
- Require seat count before proceeding.
- Preserve cart state according to the implemented session rule.
- Display calculated pre-payment totals where formulas are defined.
- Disable or change purchase controls for a stable already-purchased course.

#### Controlled or Pending

- Successful checkout: Class B only with a deterministic sandbox or approved mock.
- Real payment gateway: Class C.
- Real webhook delivery: Class C or contract suite.
- Real settlement and reconciliation: Pending until safe test support exists.

### E. Staff Management and CSV Upload — Active, Class A/B

#### Stable CI Automation

- Staff page loads.
- Search staff by name or email.
- Filter by department, role, status, or assignment state where implemented.
- Clear filters.
- Pagination.
- Staff-detail access.
- CSV template download.
- Reject unsupported file types.
- Reject missing required headers.
- Reject malformed email values.
- Detect duplicate rows inside the uploaded file.
- Display inserted, skipped, and failed row counts.
- Prevent submit when no file is selected.

#### Controlled Stateful Automation

- Successful staff import using run-specific synthetic rows.
- Verify imported users appear in the staff table.
- Verify import counts match the uploaded fixture.
- Remove imported synthetic users after the test where supported.

#### Excluded from the UI Assertion

The UI import test must **not** wait for or verify actual invitation-email receipt. It may verify:

- The import succeeded.
- The learner record exists.
- The backend accepted or queued a notification event where an observable contract exists.

Actual email delivery belongs to a separate provider or manual check.

### F. Course Assignment and Deadlines — Active, Class A/B

#### Stable CI Automation

- Assignment page loads.
- Course selector loads.
- Learner or department selector loads.
- Required course validation.
- Required assignee validation.
- Invalid or past deadline validation.
- Cancel assignment.
- Search and filter selectable learners.
- Display an existing seeded assignment on the Organization Admin view.
- Display the same existing seeded assignment on the Learner dashboard.
- Verify deadline formatting and course identity.

#### Controlled Stateful Automation

- Create a new assignment.
- Verify it appears for the Learner.
- Update the deadline.
- Remove or unassign it during cleanup.
- Verify duplicate assignment handling.

Actual assignment-email delivery is not part of the stable UI suite.

### G. Learner Dashboard, Shelf, and Course Access — Active, Class A

#### Automate

- Learner dashboard loads.
- Assigned courses are visible.
- Deadlines are visible.
- Course status is visible.
- Shelf or enrolled-course list loads.
- Course card opens the correct course.
- Required course metadata appears.
- Empty-state behaviour.
- Search or filter assigned courses where available.
- Learner cannot access Admin, Trainer, or Super Admin routes.
- Restricted course access is denied where the learner is not enrolled.

### H. Course Player and Module Navigation — Active, Class A/B

#### Stable CI Automation

- Course player loads.
- Module list renders.
- Lesson selection works.
- Next and previous navigation works.
- Text content renders.
- Video controls are present.
- Play and pause controls respond where the media fixture is deterministic.
- Playback-speed options render where implemented.
- Incomplete/completed labels display from seeded state.
- Leaving and reopening the course returns to the implemented landing position.

#### Controlled Stateful Automation

- Progress checkpoint save.
- Resume from saved timestamp.
- Lesson-completion transition.
- Course-progress percentage update.
- Completion of all mandatory lessons.

Use a dedicated resettable Learner/course pair or a progress-reset API. Do not consume the only reusable Learner account irreversibly.

### I. Quiz, Retake, and Final Exam Rules — Active, Class B

Automate only with resettable seeded assessment data:

- Quiz page loads.
- Required-answer validation.
- Submit-answer behaviour.
- Auto-marked result display.
- Pass and fail state.
- Retake availability according to configuration.
- Final Exam remains locked when mandatory lessons are incomplete.
- Direct Final Exam route/API access is denied when prerequisites are incomplete.
- Final Exam unlocks when all mandatory requirements are met.
- Exam submission prevents duplicate effective submissions.

Without a reset mechanism, these remain manual or scheduled tests.

### J. Course Authoring and Publication — Active, Class A/B

#### Stable CI Automation

- Trainer/Super Admin course list loads.
- Search and filter courses.
- Open course detail.
- Required course-field validation.
- Required module-field validation.
- Required lesson-field validation.
- Required quiz-question validation.
- Draft status display.
- Published status display.
- Unauthorized Learner and Organization Admin access denial.

#### Controlled Stateful Automation

- Create a uniquely named draft course.
- Add module and lesson content.
- Edit draft.
- Publish.
- Verify catalog propagation.
- Archive or delete the synthetic course during cleanup.

### K. Reports and Exports — Active, Class A

Automate:

- Report page loads.
- Filter by learner, department, course, status, standard, or date where implemented.
- Clear filters.
- Empty state.
- Export button availability.
- CSV download.
- PDF download where stable.
- File name and file type.
- Non-empty file.
- Required headers or visible report metadata.
- Unauthorized role export denial.

Do not compare dynamic chart pixels as a primary regression method.

### L. Dashboards and Charts — Active, Class A/B

#### Stable CI Automation

- Dashboard loads.
- Expected widget titles are present.
- Chart containers render without application errors.
- Filters update the request and visible state.
- Empty-data states are handled.
- Numeric values use the expected format.
- API requests complete successfully.

#### Controlled Stateful Automation

- Reconcile widget totals against controlled records.
- Verify aggregate changes after creating or completing synthetic data.

Avoid pixel-perfect visual regression for dynamic revenue and popular-course charts in the routine suite because changing data, rendering engines, fonts, and animation timing can cause false failures.

### M. Notifications and Nudges — Partially Active

#### Stable CI Automation

- Manual Nudge button visibility for authorized users.
- Nudge button disabled/enabled state.
- Nudge request is submitted once.
- Success or failure feedback appears.
- Duplicate clicks are prevented while processing.
- Notification settings form validation where available.

#### Not Routine Automation

- Actual email arrival.
- Email-template rendering in external inboxes.
- Automatic inactivity and deadline email delivery.
- SMS delivery.
- Provider-level deliverability.

Those checks belong to contract, sandbox, or scheduled integration testing.

---

## 4. User Stories for the Active Automation Backlog

1. **As a Learner,** I want to log in with my active account, so that I can access my assigned training.
2. **As an Organization Admin,** I want to log in with my existing account, so that I can manage staff and courses.
3. **As an authenticated user,** I want logout to end my session, so that protected information remains secure.
4. **As a user,** I want invalid login data rejected with clear validation, so that I understand why access failed.
5. **As a Learner,** I want to view assigned courses and deadlines, so that I know what training is outstanding.
6. **As a Learner,** I want to open a course and move between modules, so that I can complete training.
7. **As an Organization Admin,** I want to search and filter courses, so that I can find relevant training quickly.
8. **As an Organization Admin,** I want cart and seat validation to prevent invalid orders, so that checkout data is accurate.
9. **As an Organization Admin,** I want to search and filter staff, so that I can manage learners efficiently.
10. **As an Organization Admin,** I want CSV validation to identify invalid and duplicate rows, so that staff data is not corrupted.
11. **As an Organization Admin,** I want to assign an existing course to a learner with a deadline, so that training obligations are visible.
12. **As a Trainer or Super Admin,** I want course forms to enforce required content, so that incomplete courses are not published.
13. **As a Learner,** I want the Final Exam locked until prerequisites are complete, so that assessment rules are enforced.
14. **As an Admin,** I want reports and filters to return consistent data, so that training evidence can be reviewed.

---

## 5. Core Repetitive User Flows in Gherkin Syntax

### Flow 1: Existing Learner Login

```gherkin
Feature: Learner authentication

  Scenario: An active Learner logs in successfully
    Given the existing QA Learner account is active
    And the Learner portal and credentials are loaded from environment variables
    When the Learner enters the valid email and password
    And submits the login form
    Then the login request succeeds
    And the Learner reaches the expected authenticated landing page
    And an authenticated navigation element is visible
```

### Flow 2: Existing Organization Admin Login

```gherkin
Feature: Organization Admin authentication

  Scenario: An active Organization Admin logs in successfully
    Given the existing QA Organization Admin account is active
    And the Organization Admin portal and credentials are loaded from environment variables
    When the Admin enters the valid email and password
    And submits the login form
    Then the login request succeeds
    And the Admin reaches the Organization Admin application
    And organization-management navigation is visible
```

### Flow 3: Login Validation and Session Termination

```gherkin
Feature: Authentication validation

  Scenario Outline: Invalid login data is rejected
    Given the user is on the login form
    When the user submits <email> and <password>
    Then authentication is not established
    And the implemented validation or authentication error is displayed

    Examples:
      | email             | password         |
      | empty             | empty            |
      | invalid-format    | valid-format     |
      | known-user        | incorrect-value  |
      | unknown-user      | valid-format     |

  Scenario: Logout protects the previous authenticated route
    Given the user is authenticated
    When the user logs out
    Then the session is terminated
    When the user revisits the previous protected route
    Then the user is redirected to authentication or denied access
```

### Flow 4: Role-Based Route Protection

```gherkin
Feature: Role-based access control

  Scenario Outline: A role cannot access another portal's protected module
    Given the <role> is authenticated
    When the user opens the <restricted_module> route directly
    Then the UI denies or redirects the request
    And the protected API returns the implemented unauthorized response
    And no protected data is displayed

    Examples:
      | role               | restricted_module       |
      | Learner            | course administration   |
      | Learner            | trainer administration  |
      | Organization Admin | super-admin management  |
      | Trainer            | organization billing    |
```

### Flow 5: Catalog Search and Filtering

```gherkin
Feature: Course discovery

  Scenario: A permitted user searches and filters the course catalog
    Given the user is authenticated with catalog access
    And multiple courses exist
    When the user enters a course keyword
    And selects an available category filter
    Then only matching courses are displayed
    When the user clears the search and filters
    Then the unfiltered catalog is restored
```

### Flow 6: Cart and Seat Validation Without Payment

```gherkin
Feature: Course cart validation

  Scenario: A paid course is added and removed from the cart
    Given the Organization Admin is authenticated
    And an unpurchased paid test course exists
    When the Admin adds the course to the cart
    Then the cart contains one entry for the course
    When the Admin removes the course
    Then the course is no longer in the cart

  Scenario Outline: Invalid seat count is rejected
    Given the paid test course is in the cart
    When the Admin enters <seat_count>
    And attempts to proceed
    Then checkout is blocked
    And the implemented seat validation is displayed

    Examples:
      | seat_count  |
      | blank       |
      | zero        |
      | negative    |
      | non-numeric |
```

### Flow 7: CSV Validation Without Email Dependency

```gherkin
Feature: Staff CSV validation

  Scenario Outline: Invalid staff files are rejected deterministically
    Given the Organization Admin is on the Staff upload page
    When the Admin uploads a CSV fixture containing <defect>
    Then the upload result identifies the invalid rows
    And no invalid learner record is added to the visible staff table
    And the result summary shows inserted, skipped, and failed counts

    Examples:
      | defect                    |
      | missing required header   |
      | malformed email           |
      | duplicate rows            |
      | unsupported file type     |

  Scenario: A valid controlled CSV is imported
    Given a cleanup mechanism or disposable tenant is available
    And a CSV contains unique run-specific staff records
    When the Admin uploads the file
    Then the displayed inserted count matches the valid fixture rows
    And the imported staff records appear in the staff table
    But actual invitation-email receipt is not asserted in this UI test
```

### Flow 8: Course Assignment and Learner Dashboard Sync

```gherkin
Feature: Course assignment

  Scenario: An existing seeded assignment is consistent across roles
    Given a known course is assigned to the seeded QA Learner
    When the Organization Admin opens the assignment record
    Then the selected course, learner, and deadline are visible
    When the seeded QA Learner opens the dashboard
    Then the same course and deadline are displayed

  Scenario: A new assignment is created with reversible test data
    Given a reset or unassignment mechanism is available
    And the Organization Admin selects a test course and test Learner
    When the Admin enters a valid future deadline
    And submits the assignment
    Then the assignment appears in the Admin view
    And the Learner dashboard displays the course and deadline
    And the test removes the assignment during cleanup
```

### Flow 9: Learner Course and Module Navigation

```gherkin
Feature: Learner course access

  Scenario: A Learner opens an assigned course and navigates lessons
    Given the Learner is authenticated
    And an assigned course with multiple lessons exists
    When the Learner opens the course
    Then the course player and module list render
    When the Learner selects the next lesson
    Then the selected lesson content is displayed
    When the Learner selects the previous lesson
    Then the previous lesson content is restored
```

### Flow 10: Video Control and Progress State

```gherkin
Feature: Video lesson controls

  Scenario: Deterministic video controls respond
    Given the Learner opens a video lesson backed by a stable test asset
    When the Learner selects play
    Then the video enters the playing state
    When the Learner selects pause
    Then the video enters the paused state

  Scenario: Progress persists for a resettable test Learner
    Given a dedicated progress-reset mechanism exists
    When the Learner reaches a configured checkpoint
    Then the progress-save request succeeds
    When the Learner leaves and reopens the lesson
    Then the saved progress is restored according to the product rule
```

### Flow 11: Quiz and Final Exam Access

```gherkin
Feature: Assessment prerequisites

  Scenario: Final Exam remains locked for an incomplete seeded course
    Given the test Learner has one or more mandatory lessons incomplete
    When the Learner opens the course assessment area
    Then the Final Exam control is disabled
    And a direct Final Exam request is denied

  Scenario: Final Exam unlocks after resettable prerequisites are complete
    Given a dedicated resettable Learner and course exist
    And all mandatory lessons have been completed
    When the Learner opens the assessment area
    Then the Final Exam control is enabled
```

### Flow 12: Course Authoring Validation

```gherkin
Feature: Course authoring

  Scenario: Required course fields prevent an incomplete draft submission
    Given the Trainer or Super Admin is authenticated
    And the user is on the course-creation form
    When the user attempts to save without required course information
    Then the incomplete submission is blocked
    And required-field validation is displayed

  Scenario: A synthetic draft course is created and cleaned up
    Given course cleanup or archival is available
    When the authorized user creates a uniquely named valid test course
    Then the course is saved with Draft status
    And the test archives or deletes the synthetic course during cleanup
```

### Flow 13: Report Filtering and Export

```gherkin
Feature: Training reports

  Scenario: An authorized Admin filters and exports a report
    Given the Admin is authenticated
    And report data exists
    When the Admin applies a supported report filter
    Then the displayed result reflects the filter
    When the Admin exports the result
    Then a file is downloaded in the selected format
    And the file is non-empty
    And required report headers or metadata are present
```

---

## 6. Expected Outcomes and Success Measures

### Stable Automation Outcomes

- Existing active-role accounts can log in repeatedly.
- Invalid credentials never establish an authenticated session.
- Logout prevents reuse of protected routes.
- Role restrictions apply to UI routes and observable APIs.
- Catalog search and filters return consistent results.
- Cart and seat validation prevent invalid checkout progression.
- Staff CSV validation produces deterministic inserted, skipped, and failed summaries.
- Email delivery is not required for staff-upload or assignment UI tests to pass.
- Seeded assignments remain consistent between Organization Admin and Learner views.
- Course and lesson navigation remains functional.
- Resettable progress and assessment data can be exercised repeatedly.
- Report filters and exports work for authorized users.
- Fixed repetitive defects receive permanent regression coverage.

### Flakiness Controls

- No test depends on a previous `it()` block.
- No routine suite requires a fresh mailbox.
- No routine suite consumes one-time verification links.
- No routine suite waits for uncontrolled email delivery.
- No routine suite performs real payment.
- No test permanently completes the only shared course without a reset mechanism.
- No dynamic chart is validated primarily through pixel matching.
- Stateful records are cleaned up or isolated.

### Success Metrics for the Automation Programme

- Routine smoke and regression suites maintain stable rerun behaviour.
- Authentication tests use known accounts and independent setup.
- Flaky-test rate is tracked and kept below the team-approved threshold.
- Every quarantined test has a linked defect, reason, and review date.
- User-facing failures include UI evidence and relevant masked network evidence.
- Automated coverage is reported separately from manual, controlled-stateful, and on-demand integration coverage.

---

## 7. Feature-to-Test-Layer Mapping

| Feature | Routine UI Automation | Controlled Stateful Automation | API/Contract Test | Manual/On-Demand |
|---|---:|---:|---:|---:|
| Existing-role login | Yes | No | Yes | Optional |
| Invalid login | Yes | No | Yes | No |
| Logout and protected routes | Yes | No | Yes | No |
| New organization registration | Form validation only | Optional with cleanup | Optional | Yes |
| Email verification | No | No | Provider contract | Yes |
| Organization activation | No | Optional | Optional | Yes |
| Catalog search/filter | Yes | No | Optional | No |
| Cart validation | Yes | No | Yes | No |
| Real payment | No | No | Sandbox contract | Yes |
| Staff table search/filter | Yes | No | Optional | No |
| CSV validation | Yes | No | Yes | No |
| Successful CSV import | No | Yes | Yes | Optional |
| Invitation-email delivery | No | No | Provider contract | Yes |
| Course assignment | Existing state: Yes | Create/remove: Yes | Yes | Optional |
| Assignment email | No | No | Provider contract | Yes |
| Learner dashboard | Yes | No | Optional | No |
| Course navigation | Yes | No | Optional | No |
| Video controls | Yes with stable media | Progress: Yes | Optional | Optional |
| Quiz/final exam | Lock state: Yes | Attempts/unlock: Yes | Yes | Optional |
| Course creation | Validation: Yes | Create/publish: Yes | Yes | Optional |
| Reports/exports | Yes | Optional | Optional | No |
| Dynamic dashboard charts | Functional checks only | Data reconciliation | Yes | Visual review |
| Nudges | UI/request check | Optional | Provider contract | Email receipt |

---

## 8. Integration-Based Gherkin Flows

### Integration Flow A: Authentication and Authorization

```gherkin
Scenario: A valid role session is accepted and a restricted role session is denied
  Given a known active QA account is authenticated
  When the account requests an authorized resource
  Then the request succeeds
  When the same session requests a prohibited role resource
  Then the request returns the implemented unauthorized response
  And no protected payload is returned
```

### Integration Flow B: CSV Parsing Without Email Delivery

```gherkin
Scenario: CSV processing returns a deterministic import summary
  Given an Organization Admin uploads a controlled CSV fixture
  When the upload API processes the file
  Then the response identifies inserted, skipped, and failed row counts
  And the counts reconcile with the fixture
  And invitation-email delivery is not required for the import transaction to succeed
```

### Integration Flow C: Course Assignment Persistence

```gherkin
Scenario: An assignment is visible to the assigned Learner
  Given a reversible test assignment is submitted
  When the assignment API accepts the course, Learner, and deadline
  Then the Organization Admin assignment query returns the record
  And the Learner dashboard query returns the same course and deadline
  And cleanup removes the synthetic assignment
```

### Integration Flow D: Progress Checkpoint Idempotency

```gherkin
Scenario: Repeated progress checkpoint calls do not inflate progress
  Given a resettable test Learner is viewing a course lesson
  When the same progress checkpoint is submitted more than once
  Then one effective progress state is retained
  And the reported course progress remains within the valid range
```

### Integration Flow E: Payment Boundary

```gherkin
Scenario: Checkout stops at a deterministic sandbox or mock boundary
  Given a paid course and valid seat quantity are in the cart
  When the checkout request is submitted in the approved test mode
  Then the platform creates the expected pending order state
  And no real payment is executed
  And only an approved sandbox or mocked provider response may advance the order

  # Routine UI automation must not depend on a live payment provider.
```

### Integration Flow F: Notification Trigger Contract

```gherkin
Scenario: A user action queues one notification event
  Given a supported assignment, invitation, or nudge event is committed
  When the platform processes the event
  Then one notification request is queued for the intended user
  And retries do not create duplicate effective events
  But external inbox delivery is validated separately
```

---

## 9. System Instruction for the RegLearn QA Automation Agent

### Role

You are the **Senior QA Automation Engineer for RegLearn**, a compliance-focused SaaS learning management system.

Your objective is to automate repetitive, deterministic, user-facing workflows using Cypress or Playwright while preventing flaky tests caused by one-time verification, email inboxes, uncontrolled third-party services, irreversible shared state, or cross-test dependencies.

### Platform Overview

RegLearn supports:

- Learner, Organization Admin, Super Admin, and Trainer access.
- Course catalogs and assigned-course shelves.
- Organization staff management.
- CSV staff onboarding.
- Course assignment and deadlines.
- Modular text, video, quiz, and assessment content.
- Cart and seat-based procurement.
- Course authoring and publication.
- Reports, dashboards, notifications, and nudges.

Successful organization registration, activation, email verification, and actual provider delivery are product requirements but are not routine CI prerequisites.


### Environment & Secret Management
- Do not hardcode URLs, tokens, or credentials in test scripts or configuration files.
- Load all configuration properties via environment variables:
  - `QA_LEARNER_URL`, `QA_ORG_ADMIN_URL`, `QA_SUPER_ADMIN_URL`, `QA_TRAINER_URL`
  - `QA_LEARNER_EMAIL`, `QA_LEARNER_PASSWORD`
  - `QA_ORG_ADMIN_EMAIL`, `QA_ORG_ADMIN_PASSWORD`
  - `QA_SUPER_ADMIN_EMAIL`, `QA_SUPER_ADMIN_PASSWORD`
- For missing URLs or credentials in local environments, read from a template `.env.example` file and throw an error if configuration values are empty.

### Core QA Standards and Automation Focus

1. **Repetition First**
   - Prioritize workflows performed repeatedly by actual platform users.
   - Do not prioritize a flow only because it has many dependencies or appears important in the PRD.

2. **Independent Tests**
   - Never share mutable values between separate `it()` blocks.
   - Never require one test to run before another.
   - Generate or seed prerequisites inside hooks, API setup, fixtures, or the same test.

3. **Known Accounts for Authentication**
   - Use the existing QA Learner, Organization Admin, Super Admin, and Trainer accounts for routine login regression.
   - Do not create a new unverified account to test ordinary login.

4. **State Management**
   - Use dedicated resettable Learners and courses for progress, quizzes, and exams.
   - Use cleanup or archival for synthetic courses, staff records, and assignments.
   - Mark the scenario controlled or manual when reset is unavailable.

5. **Email and Notification Separation**
   - UI tests may validate that an action succeeded and that a notification request was accepted or queued.
   - Actual email receipt must not determine the result of routine CSV, assignment, activation, or nudge tests.
   - Test external delivery separately through provider contracts or manual release checks.

6. **Payment Separation**
   - Validate cart and seat selection in routine UI automation.
   - Use only approved payment sandboxes or mocks for controlled checkout tests.
   - Never use real payment in routine automation.

7. **User-Facing Assertions**
   - Do not stop at `response.statusCode`.
   - Assert the expected landing page, visible success/error state, record, status, deadline, course card, or access denial.

8. **Selectors and Synchronization**
   - Use the existing selector and environment management structure.
   - Prefer stable `data-*` selectors.
   - Avoid fixed waits.
   - Synchronize against aliased requests and visible application state.

9. **Defect Regression**
   - Add a permanent automated test when a fixed defect affects a repetitive deterministic workflow.
   - Link the test to the defect identifier.

10. **Suite Tags**
   - Maintain:
     - `smoke`
     - `authentication`
     - `rbac`
     - `catalog`
     - `cart-validation`
     - `staff-management`
     - `assignment`
     - `learner-dashboard`
     - `course-player`
     - `assessment-controlled`
     - `course-authoring-controlled`
     - `reports`
     - `bug-regression`
     - `integration-contract`
     - `manual-on-demand`
     - `production-readonly`

### Required Deliverables

Maintain:

- **PRD-to-Test Coverage Matrix**
- **Automation Suitability Matrix**
- **Stable CI Regression Backlog**
- **Controlled Stateful Test Register**
- **Manual and On-Demand Integration Register**
- **Seeded Account and Data Inventory**
- **Cleanup and Reset Capability Register**
- **Route and API Inventory**
- **RBAC Verification Matrix**
- **Automated Test Suite**
- **Bug Regression Register**
- **Execution Report**
- **Flaky-Test Register**
- **Known Limitations Register**
- **Production-Safety Register**

### Starter Commands

1. **“Audit the current authentication tests and remove cross-test dependencies, shared registration state, and endpoint-method mismatches.”**
2. **“Build independent Learner, Organization Admin, Super Admin, and Trainer login tests using the existing environment-variable names.”**
3. **“Add invalid login, required-field, logout, session, and protected-route tests without creating new accounts.”**
4. **“Create a catalog search, filter, clear-filter, no-result, and course-detail regression suite.”**
5. **“Create cart add/remove and seat-count validation tests that stop before real payment.”**
6. **“Create staff search, filter, CSV template, malformed-file, duplicate-row, and import-summary tests without asserting email delivery.”**
7. **“Automate assignment visibility using a seeded Learner and course; create new assignments only where cleanup is available.”**
8. **“Create Learner dashboard, shelf, deadline, course-card, and module-navigation tests.”**
9. **“Create video-control tests using a stable media asset and progress tests only with a resettable Learner.”**
10. **“Create Final Exam lock tests using seeded incomplete state and unlock tests only where course progress can be reset.”**
11. **“Create Trainer and Super Admin course-form validation tests; create and publish synthetic courses only where archival or deletion is available.”**
12. **“Create report filtering and CSV/PDF export tests that verify downloaded file type, size, and required metadata.”**
13. **“Replace dynamic chart pixel comparison with functional widget, filter, API, and controlled-data reconciliation checks.”**
14. **“Move registration, verification, activation, invitation-email receipt, assignment-email receipt, password-reset email, and real payment into manual or on-demand coverage.”**
15. **“Generate a test inventory classified as Stable CI, Controlled Stateful, Contract, Manual, Pending, or Production Read-Only.”**

---

## 10. Product and Testability Clarifications

1. Which exact HTTP method and endpoint are used for Learner login, Organization Admin login, Super Admin login, and Trainer login?
2. What visible element uniquely confirms successful authentication for each role?
3. What are the correct post-login landing routes for each role?
4. Is a logout endpoint available, and does logout invalidate server-side sessions or only clear client state?
5. What are the session-expiry and refresh-token rules?
6. Which routes and APIs should each role be denied?
7. Is there a seeded QA Learner with a stable incomplete course?
8. Is there a separate seeded QA Learner with a completed course?
9. Is there an API or Admin control to reset course progress and assessment attempts?
10. Is there a dedicated synthetic course for player, progress, quiz, and Final Exam automation?
11. Can assignments be removed or reset automatically?
12. Can imported synthetic staff records be deleted or deactivated automatically?
13. What CSV headers, file size, row limit, and duplicate rules are authoritative?
14. Can the notification service expose a QA event log without requiring inbox verification?
15. Is there an approved email-provider sandbox for separately scheduled delivery checks?
16. Can a manual Nudge event be queried through an API or notification log?
17. Is there an approved payment sandbox or deterministic provider mock?
18. Can pending or synthetic orders be cancelled and cleaned up?
19. Can synthetic draft and published courses be archived or deleted?
20. What course, module, lesson, and quiz fields are required?
21. What Final Exam prerequisite and retake rules are authoritative?
22. What report filters and export formats are implemented?
23. What dashboard formulas and refresh rules are authoritative?
24. Are stable `data-*` test attributes available for authentication, catalog, cart, staff, assignment, player, quiz, authoring, and report controls?
25. Which suites must run after every deployment?
26. Which controlled stateful suites should run only before release?
27. What defect-management identifier should be included in test metadata?
28. What is the approved flaky-test threshold and quarantine review period?
29. Which Production read-only smoke checks are authorized?
30. What technical guard prevents write, registration, assignment, progress, course-creation, payment, and destructive suites from targeting Production?
