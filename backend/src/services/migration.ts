import Migration, { MigrationStep } from "../models/Migration.js";

export const isMigrationComplete = async (step: MigrationStep) =>
  (await Migration.findOne({
    where: { migrationName: step },
  }))
    ? true
    : false;

export const markMigrationComplete = async (
  step: MigrationStep
): Promise<void> => {
  await Migration.create({
    migrationName: step as MigrationStep,
    completedAt: new Date(),
  });
};
