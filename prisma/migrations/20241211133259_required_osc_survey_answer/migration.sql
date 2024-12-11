/*
  Warnings:

  - Made the column `oscId` on table `survey_answers` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "survey_answers" DROP CONSTRAINT "survey_answers_oscId_fkey";

-- AlterTable
ALTER TABLE "survey_answers" ALTER COLUMN "oscId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "survey_answers" ADD CONSTRAINT "survey_answers_oscId_fkey" FOREIGN KEY ("oscId") REFERENCES "oscs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
