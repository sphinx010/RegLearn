// cypress/e2e/learner-login.cy.js
import env from '../support/env';

describe('Learner Login', () => {

  beforeEach(() => {
    // Ensure we start clean for each test
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  let email_field,
    sign_in_button,
    password_field,
    submit_button,
    sign_in_endpoint;

  beforeEach(() => {
    //visit the login page
    cy.visit(env.qa.learner.url);
    //Set up selectors from fixtures
    cy.fixture('selectorHub').then((selectors) => {
      sign_in_button = selectors.loginPage.sign_in_button;
      email_field = selectors.loginPage.email;
      password_field = selectors.loginPage.password;
      submit_button = selectors.loginPage.submit;
      sign_in_endpoint = selectors.loginPage.sign_in_endpoint;

    })
  })

  it('should log in successfully', () => {
    cy.intercept('GET', `**${sign_in_endpoint}`).as('login');
    cy.get(sign_in_button).click({ timeout: 5000 });
    cy.get(email_field).type(env.qa.learner.email);
    cy.get(password_field).type(env.qa.learner.password);
    cy.get(submit_button).click();
    cy.wait('@login').its('response.statusCode').should('eq', 200);
  });
});


describe.only('Registration Page', () => {
  beforeEach(() => {
    // Ensure we start clean for each test
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  let fullName_field,
    work_email_field,
    password_field,
    confirmPassword_field,
    organisationName_field,
    submit_button,
    sign_up_endpoint,
    register_button;

  let user = {
    fullName: 'Ayooluwa Paul',
    work_email: `weAreTesters${Math.random() * 100}@co.za`,
    password: 'password@@',
    confirmPassword: 'password@@',
    organisationName: `organisationName${Math.random() * 100} we are`,
  }

  beforeEach(() => {
    cy.visit(env.qa.learner.url);
    cy.fixture('selectorHub').then((selectors) => {
      fullName_field = selectors.signUpPage.fullName;
      work_email_field = selectors.signUpPage.work_email;
      password_field = selectors.signUpPage.password;
      confirmPassword_field = selectors.signUpPage.confirmPassword;
      organisationName_field = selectors.signUpPage.organisationName;
      register_button = selectors.signUpPage.register_button;
      submit_button = selectors.signUpPage.submit;
      sign_up_endpoint = selectors.signUpPage.sign_up_endpoint;
    })
  })

  it('should register successfully', () => {
    cy.intercept('POST', `**${sign_up_endpoint}`).as('signUp');
    cy.contains(register_button).click({ timeout: 5000 });
    cy.get(fullName_field).type(user.fullName);
    cy.get(work_email_field).type(user.work_email);
    cy.get(password_field).type(user.password);
    cy.get(confirmPassword_field).type(user.confirmPassword);
    cy.get(organisationName_field).type(user.organisationName);
    cy.get(submit_button).click();
    cy.wait('@signUp').its('response.statusCode').should('eq', 200);
  })

})

