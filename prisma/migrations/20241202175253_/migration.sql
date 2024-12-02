/*
  Warnings:

  - You are about to drop the column `stuentId` on the `survey_answers` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "survey_answers" DROP CONSTRAINT "survey_answers_stuentId_fkey";

-- AlterTable
ALTER TABLE "survey_answers" DROP COLUMN "stuentId",
ADD COLUMN     "studentId" INTEGER;

-- AddForeignKey
ALTER TABLE "survey_answers" ADD CONSTRAINT "survey_answers_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE SET NULL ON UPDATE CASCADE;
