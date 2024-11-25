/*
  Warnings:

  - You are about to drop the column `answer` on the `survey_answers` table. All the data in the column will be lost.
  - You are about to drop the column `questionId` on the `survey_answers` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "survey_answers" DROP CONSTRAINT "survey_answers_questionId_fkey";

-- AlterTable
ALTER TABLE "survey_answers" DROP COLUMN "answer",
DROP COLUMN "questionId";

-- CreateTable
CREATE TABLE "SurveyResponse" (
    "id" SERIAL NOT NULL,
    "questionId" INTEGER NOT NULL,
    "answer" TEXT NOT NULL,
    "other" TEXT,
    "surveyAnswerId" INTEGER,

    CONSTRAINT "SurveyResponse_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SurveyResponse" ADD CONSTRAINT "SurveyResponse_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "questions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SurveyResponse" ADD CONSTRAINT "SurveyResponse_surveyAnswerId_fkey" FOREIGN KEY ("surveyAnswerId") REFERENCES "survey_answers"("id") ON DELETE SET NULL ON UPDATE CASCADE;
