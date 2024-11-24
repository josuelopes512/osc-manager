/*
  Warnings:

  - You are about to drop the column `name` on the `questions` table. All the data in the column will be lost.
  - You are about to drop the column `shortAnswer` on the `questions` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "questions" DROP COLUMN "name",
DROP COLUMN "shortAnswer";
