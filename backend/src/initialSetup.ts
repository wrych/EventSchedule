import ORM from "./data/ORM.js";
import { MigrationStep } from "./models/Migration.js";
import {
  isMigrationComplete,
  markMigrationComplete,
} from "./services/migration.js";
import { setupAll } from "./setup/all.js";

const syncDatabase = async () => {
  console.log("syncing database...");
  try {
    await ORM.sync({ alter: true });
  } catch (error) {
    console.error("error creating database tables:", error);
  }
};

const runInitialSetup = async (env: string): Promise<void> => {
  if (!(await isMigrationComplete(MigrationStep.initial))) {
    console.log("running initial setup...");

    await setupAll();

    await markMigrationComplete(MigrationStep.initial);

    console.log("initial setup complete...");
  } else {
    console.log("initial setup already completed, skipping...");
  }
};

export default syncDatabase;
export { runInitialSetup };
