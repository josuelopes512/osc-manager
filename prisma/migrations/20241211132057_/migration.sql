-- DropForeignKey
ALTER TABLE "survey_answers" DROP CONSTRAINT "survey_answers_surveyId_fkey";

-- AddForeignKey
ALTER TABLE "survey_answers" ADD CONSTRAINT "survey_answers_surveyId_fkey" FOREIGN KEY ("surveyId") REFERENCES "surveys"("id") ON DELETE CASCADE ON UPDATE CASCADE;
