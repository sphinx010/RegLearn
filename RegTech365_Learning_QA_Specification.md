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

## 2. Test Strategy: Agentic & Automation Focus

To ensure high reliability, this QA specification utilizes Agentic QA Testing. Unlike traditional automation, these tests leverage AI-driven agents capable of:
- **Visual Regression:** Validating dynamic charts (Revenue, Popular Courses) via computer vision to detect pixel rendering errors and layout shifts.
- **Behavioral Simulation:** Simulating "Learner" behavior (e.g., watching videos, taking quizzes) to ensure course content accessibility, interactivity, and playback tracking work correctly.
- **Data Integrity Verification:** Automated reconciliation of bulk staff uploads (CSV file data) vs. relational database records to ensure no record drops or partial writes occur.

---

## 3. Feature List

### A. Organization Onboarding and Activation
- **Registration Flow:** Organizations register on the platform with valid organizational details. Initially, registered accounts are set to "Inactive" and cannot log in.
- **Super Admin Activation:** Ecosystem/Super Admins have exclusive permission to activate registered organizations, which transitions their status to "Active" and enables logins.
- **Account Inactivity Lock:** Inactive accounts are blocked from accessing any authenticated routes or APIs.

### B. Course Management, Procurement and Library
- **Paid Course Procurement:** Organization Admins can browse paid courses, add them to a shopping cart, and proceed to checkout.
- **Seat Count Selection:** Organization Admins must specify a number of seats/licenses during checkout. Proceeding without a seat selection triggers a validation error.
- **Library Enrollment:** Successfully purchased courses are immediately added to the organization's course library, and the "Add to Cart" button for that course becomes disabled.
- **Trainer Content Authoring:** Trainers and Super Admins can create courses, build modules, upload text/video content, and structure quizzes.

### C. Staff Management and Course Assignment
- **Bulk Staff Onboarding:** Organization Admins can upload a CSV file containing staff details (Name, Email, Department).
- **CSV Validation:** The upload parser validates columns, duplicate records, email formats, and row limits. Valid rows create or invite learners; invalid rows generate report summaries.
- **Automatic Invitations:** On successful upload, staff members receive an invitation email with credentials and login instructions.
- **Targeted Assignment:** Organization Admins can assign courses to specific learners or departments and configure completion deadlines.
- **Dashboard Visibility:** Assigned courses and their deadlines must appear immediately on the designated learner’s dashboard.

### D. Learner Experience and Course Consumption
- **Modular Course Player:** Learners navigate through modular text, interactive media, and video lessons.
- **Video Player Simulation:** Features include play, pause, playback speed adjustments, and fast-forward controls.
- **Quiz and Assessment Checks:** Module quizzes test knowledge. Failed quizzes prompt retakes according to configured retake thresholds.
- **Final Exam Access Control:** The "Final Exam" button is conditionally unlocked only when all mandatory module lessons are completed. If any lessons are incomplete, the button remains locked and disabled.

### E. Super Admin Controls and Configuration
- **Course Lifecycle Management:** Super Admins can create courses, save them as Drafts, edit modules, and publish them.
- **Publication Visibility:** Published courses are immediately propagated to the active course libraries and catalogs of Organization Admins.
- **Global Dashboard Controls:** Super Admins view platform-wide metrics (total revenue, active organizations, popular courses, and overall completion rates).

---

## 4. User Stories

1. **As a new Organization Admin,** I want to submit my registration form, so that my organization can be registered on the platform pending admin approval.
2. **As a Super Admin,** I want to review and activate inactive organizations, so that authorized companies can start utilizing the training modules.
3. **As an Organization Admin,** I want to purchase seats for a compliance course and complete payment, so that the course is added to my organization's library.
4. **As an Organization Admin,** I want to upload a CSV list of employees, so that I can onboard them in bulk and trigger email invitations automatically.
5. **As an Organization Admin,** I want to assign courses with deadlines to specific staff, so that I can manage compliance training schedules.
6. **As a Staff Learner,** I want to see assigned courses and their deadlines on my dashboard, so that I know what compliance training is outstanding.
7. **As a Staff Learner,** I want the final exam of a course to remain locked until I finish all prerequisite lessons, so that I cover the material before testing.
8. **As a Super Admin,** I want to create, save drafts of, and publish courses, so that the course catalog remains updated and available to organizations.
9. **As a Super Admin,** I want to view platform-wide revenue and popular course charts, so that I can track platform growth and engagement trends.

---

## 5. Core User Flows in Gherkin Syntax

### Flow 1: Organization Registration and Activation

**Scenario: Successful registration results in an inactive account**
```gherkin
Given the user is on the organization registration page "https://regtech365learning-fe-qa.gentlemeadow-8588bc06.eastus.azurecontainerapps.io/register" [QA_LEARNER_URL + /register]
When the user fills out the registration form with a unique email and valid organization details
And submits the registration form
Then the system displays a confirmation message "Registration successful. Pending admin activation."
And the new organization status is set to "Inactive" in the database
And the Organization Admin attempt to login at "https://regtech365learning-admin.gentlemeadow-8588bc06.eastus.azurecontainerapps.io/" [QA_ORG_ADMIN_URL] fails with "Account is inactive"
```

**Scenario: Super Admin activates an organization**
```gherkin
Given a registered organization has the status "Inactive"
And the Super Admin is authenticated on the platform administration portal
When the Super Admin navigates to the Organization Management list
And selects the inactive organization
And clicks "Activate Organization"
Then the organization status changes to "Active"
And the Organization Admin receives an email notification confirming account activation
And the Organization Admin can successfully log in at "https://regtech365learning-admin.gentlemeadow-8588bc06.eastus.azurecontainerapps.io/" [QA_ORG_ADMIN_URL]
```

### Flow 2: Course Procurement and Cart Validation

**Scenario: Successful purchase of a paid course**
```gherkin
Given an Organization Admin is authenticated and on the Course Library page
When the admin selects a paid course
And chooses a valid seat quantity (e.g., 10 seats)
And clicks "Add to Cart"
And completes checkout successfully using the payment gateway
Then the course appears in the organization's course list
And the "Add to Cart" and "Buy Now" options for this course are disabled or marked as "Purchased"
And the database records an active enrollment allocation of 10 seats for this course
```

**Scenario: Mandatory seat selection validation**
```gherkin
Given an Organization Admin is on the checkout page for a paid course
When the admin attempts to proceed to checkout without entering or selecting a seat quantity
Then the system blocks the checkout action
And displays a validation error message "Seat count required"
And the order status remains "Draft"
```

### Flow 3: Bulk Staff Onboarding and CSV Validation

**Scenario: Bulk invite via valid file upload**
```gherkin
Given an Organization Admin is authenticated and on the Staff Directory page
When the admin uploads a CSV file containing valid staff names, emails, and departments
Then the system processes the file successfully
And updates the staff table with the new learner records
And sends an automated invitation email to each uploaded staff member
And displays a summary message "Successfully imported X staff members"
```

**Scenario: Validation of duplicate emails in bulk upload**
```gherkin
Given an Organization Admin is uploading a CSV file to onboard staff
When the CSV contains email addresses that already exist in the organization
Then the system skips the duplicate rows
And creates records only for unique new email addresses
And displays a warning summary "Imported Y records, skipped Z duplicates"
```

### Flow 4: Course Assignment and Dashboard Sync

**Scenario: Assigning a course with a deadline**
```gherkin
Given an Organization Admin is authenticated and viewing the Course Assignment panel
And selects a course and the learner "John Doe"
When the admin configures a completion deadline of "2026-07-31"
And clicks "Assign Course"
Then the course assignment is recorded in the database
And when learner "John Doe" logs into the Learner Portal
Then the assigned course appears under "Assigned Courses" on the learner dashboard
And the dashboard displays the correct deadline "July 31, 2026"
```

### Flow 5: Learner Access Control and Player Restrictions

**Scenario: Accessing final exam restriction**
```gherkin
Given a Learner is authenticated and viewing the course page
When the learner has completed all lessons inside the course modules
Then the "Final Exam" button becomes active and unlocked
And the learner is permitted to launch the final assessment
```

**Scenario: Attempting to access final exam with incomplete lessons**
```gherkin
Given a Learner is viewing a course player
When one or more lessons inside the course modules are still marked as "Incomplete"
Then the "Final Exam" button is disabled and locked
And the learner cannot click or launch the final exam
And a tooltip displays "Complete all module lessons to unlock the exam"
```

### Flow 6: Course Creation and Publication

**Scenario: Creating and publishing a course**
```gherkin
Given a Super Admin is logged in and viewing the Content Creation module
When the Super Admin creates a course, adds modules, lessons, and quiz questions
And saves the course
Then the course status is set to "Draft"
And the course is not visible to learners or Organization Admins
When the Super Admin clicks "Publish"
Then the course status transitions to "Published"
And the course immediately appears in the catalog for all Organization Admins
```

---

## 6. Expected Outcomes and Success Measures

- **Zero Unauthenticated Access:** 100% block rate on all private dashboard and administrative URLs when accessed without valid authentication.
- **Accurate Activation Rule:** No inactive organization accounts should successfully log in, bypass the landing page, or make authenticated API calls.
- **Bulk Upload Integrity:** 100% of valid CSV records must result in database entry and a corresponding email send request.
- **100% Seat Allocation Enforcement:** No organization can enroll more learners into a paid course than the number of purchased seats.
- **Strict Prerequisite Verification:** Under no circumstances should a learner be allowed to fetch or submit the final exam API if their lesson progress counter is less than 100%.
- **Chart Rendering Accuracy:** Dashboard visualizations (such as popular courses and revenue analytics) must render within 2 seconds, displaying accurate data coordinates matching the database records.

---

## 7. Feature-to-Technical Integration Mapping

| Feature Area | Core Functionality | Likely Technical Integration |
|---|---|---|
| **Organization Activation** | Transitioning status and enabling logins | Super Admin portal interface, Database (Organization table update), Email notification service (SMTP/SES API) |
| **Course Cart & Payments** | Handling course seat purchases | Frontend Cart store, Payment gateway (Stripe/Flutterwave SDK), webhook receiver endpoint, Order management service |
| **Bulk CSV Import** | Reading, parsing, and storing staff records | File upload service, csv-parser module (Node/Python), bulk database inserts, transaction logging |
| **Course Assignment** | Setting deadlines and visibility | Assignment service, user dashboard query API, background scheduler (for tracking upcoming deadlines) |
| **Video Player & Checkpoints** | Progress tracking and media control | HTML5 video player APIs, progress event handlers, database progress state API |
| **Assessment & Final Exam** | Lock/Unlock check and exam submission | Quiz/Exam API, lesson completion validation check service, grading service |

---

## 8. Integration-Based Gherkin Flows

### Integration Flow A: CSV Upload Processing and DB Synchronization

```gherkin
Scenario: CSV Upload process handles validation and DB insert transactions
  Given an Organization Admin uploads a staff onboarding CSV file
  When the file reaches the upload API endpoint
  Then the API parses the CSV data
  And validates email format, roles, and checks for existing DB records
  And initiates a database transaction to insert new staff records
  And updates the organization user count
  And returns a JSON payload detailing the count of inserted, failed, and skipped rows
```

### Integration Flow B: Payment Webhook and Enrollment Allocation

```gherkin
Scenario: Verified successful payment webhook updates enrollment permissions
  Given an Organization Admin has completed checkout for a course
  When the third-party payment gateway fires a success webhook (e.g., Stripe `payment_intent.succeeded`)
  Then the platform webhook receiver validates the webhook signature
  And checks the transaction ID against the orders database
  And updates the order status to "Paid"
  And allocates the purchased seat count to the organization's library database
  And returns a 200 OK response to the payment gateway provider
```

### Integration Flow C: Video Progress Saving API

```gherkin
Scenario: Video player triggers checkpoint saves during playback
  Given a Learner is watching a module video lesson
  When the video playback reaches standard intervals (e.g., every 10 seconds or on pause)
  Then the player client fires a background API request to the progress checkpoint endpoint
  And the backend updates the learner's progress percentage idempotently
  And returns a success status without interrupting video playback
```

---

## 9. System Instruction for the RegLearn QA Automation Agent

### Role
You are the **Lead Agentic QA Test Architect for RegLearn**, a compliance-focused SaaS learning management system. Your primary responsibility is to design, write, execute, and maintain automated tests (using Cypress/Playwright) to validate the core user journeys, platform APIs, visual dashboards, and role-based permissions.

### Platform Overview
RegLearn supports:
- Organization onboarding, activation workflows, and staff management (bulk imports).
- Multi-tenant role configurations (Super Admin, Organization Admin, Trainer, Learner).
- Course catalog browsing, shopping carts, seat-based paid purchasing, and library enrollment.
- Modular course players, video progression tracking, quiz checking, and prerequisite-based exam unlocks.

### Environment & Secret Management
- Do not hardcode URLs, tokens, or credentials in test scripts or configuration files.
- Load all configuration properties via environment variables:
  - `QA_LEARNER_URL`, `QA_ORG_ADMIN_URL`, `QA_SUPER_ADMIN_URL`, `QA_TRAINER_URL`
  - `QA_LEARNER_EMAIL`, `QA_LEARNER_PASSWORD`
  - `QA_ORG_ADMIN_EMAIL`, `QA_ORG_ADMIN_PASSWORD`
  - `QA_SUPER_ADMIN_EMAIL`, `QA_SUPER_ADMIN_PASSWORD`
- For missing URLs or credentials in local environments, read from a template `.env.example` file and throw an error if configuration values are empty.

### Core QA Standards & Automation Focus
1. **Agentic Visual Checks**: Utilize visual regression tools (e.g., Percy or Cypress-Image-Diff) to compare Super Admin dashboard charts (Revenue, Popular Courses) against base snapshots. Report pixel mismatches above a 1% threshold.
2. **API Testing**: Verify background file uploads and JSON responses. Validate CSV bulk uploads via raw API calls before verifying client UI rendering.
3. **Player Simulation**: Mock or trigger media play/pause controls programmatically. Verify lesson progress updating events and checkpoint saves.
4. **Integration Mocking**: Mock third-party payment gateway callback routes during Cart E2E testing to simulate successful checkout flows deterministically.
5. **Direct Navigation and RBAC**: Attempt to access Admin routes using a Learner session. Ensure the frontend router redirects to unauthorized screens, and verify the backend API throws a 403 Forbidden error.

### Starter Commands for the Agent
1. *"Verify the login and RBAC restrictions by attempting to access `/admin/courses` using a Learner account, confirming redirects and 403 API responses."*
2. *"Run an E2E test for organization registration, ensuring the registered account remains inactive in the DB and is blocked from logging in until activated."*
3. *"Write a visual validation test for the Super Admin dashboard, capturing and comparing charts under `/admin/dashboard`."*
4. *"Automate the CSV bulk staff onboarding test, validating successful data imports and verifying that duplicates are gracefully handled."*
5. *"Write an integration test that mocks a successful payment webhook response from Stripe and verifies the course appears in the Org Admin's library."*
6. *"Test the course player prerequisite logic by checking that the 'Final Exam' button remains disabled until all lesson progress indicators hit 100%."*
7. *"Test video player checkpoint syncing by playing a video, interrupting the session, logging back in, and verifying the player resumes from the correct timestamp."*
8. *"Verify validation errors during the purchase checkout flow when no seat counts are selected."*

---

## 10. Product Clarifications Required Before Full Automation

1. **Payment Gateway Credentials**: What are the sandbox API test keys and integration accounts for testing checkout flows?
2. **CSV Limits and Formatting**: What is the maximum file size and row limit for the bulk staff onboarding CSV? Are there specific header formats that must be enforced?
3. **Activation Notification**: Is there a default email template or automated system notification sent out to the Organization Admin immediately after Super Admin activation?
4. **Final Exam Rules**: Are there limits to the number of final exam retakes a learner can perform, and does this require manual admin reset?
5. **Dashboard Chart Refresh**: Do the Admin dashboard statistics refresh in real-time on page load, or are they cached/computed via a background cron job?
6. **Ecosystem Synchronization**: How does the organization register outside the ecosystem sync back to the master database? Is this database mapping synchronous?
