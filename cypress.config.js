require("dotenv").config();
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },

    env: {
      // ==========================================
      // QA ENVIRONMENT
      // ==========================================

      // Learner portal
      QA_LEARNER_URL:          process.env.QA_LEARNER_URL,
      QA_LEARNER_EMAIL:        process.env.QA_LEARNER_EMAIL,
      QA_LEARNER_PASSWORD:     process.env.QA_LEARNER_PASSWORD,

      // Org Admin portal
      QA_ORG_ADMIN_URL:        process.env.QA_ORG_ADMIN_URL,
      QA_ORG_ADMIN_EMAIL:      process.env.QA_ORG_ADMIN_EMAIL,
      QA_ORG_ADMIN_PASSWORD:   process.env.QA_ORG_ADMIN_PASSWORD,

      // Super Admin portal
      QA_SUPER_ADMIN_URL:      process.env.QA_SUPER_ADMIN_URL,
      QA_SUPER_ADMIN_EMAIL:    process.env.QA_SUPER_ADMIN_EMAIL,
      QA_SUPER_ADMIN_PASSWORD: process.env.QA_SUPER_ADMIN_PASSWORD,

      // Trainer portal
      QA_TRAINER_URL:          process.env.QA_TRAINER_URL,
      QA_TRAINER_EMAIL:        process.env.QA_TRAINER_EMAIL,
      QA_TRAINER_PASSWORD:     process.env.QA_TRAINER_PASSWORD,

      // ==========================================
      // PRODUCTION ENVIRONMENT
      // ==========================================

      // Admin portal
      PROD_ADMIN_URL:          process.env.PROD_ADMIN_URL,
      PROD_ADMIN_EMAIL:        process.env.PROD_ADMIN_EMAIL,
      PROD_ADMIN_PASSWORD:     process.env.PROD_ADMIN_PASSWORD,

      // Learner portal
      PROD_LEARNER_URL:        process.env.PROD_LEARNER_URL,
      PROD_LEARNER_EMAIL:      process.env.PROD_LEARNER_EMAIL,
      PROD_LEARNER_PASSWORD:   process.env.PROD_LEARNER_PASSWORD,
    },
  },
});
