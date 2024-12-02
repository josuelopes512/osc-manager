-- DropForeignKey
ALTER TABLE "SurveyResponse" DROP CONSTRAINT "SurveyResponse_questionId_fkey";

-- DropForeignKey
ALTER TABLE "SurveyResponse" DROP CONSTRAINT "SurveyResponse_surveyAnswerId_fkey";

-- DropForeignKey
ALTER TABLE "survey_answers" DROP CONSTRAINT "survey_answers_surveyId_fkey";

-- AlterTable
-- ALTER TABLE "survey_answers" ADD COLUMN     "oscId" INTEGER,
-- ADD COLUMN     "studentId" INTEGER;

-- AddForeignKey
ALTER TABLE "survey_answers" ADD CONSTRAINT "survey_answers_surveyId_fkey" FOREIGN KEY ("surveyId") REFERENCES "surveys"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
-- ALTER TABLE "survey_answers" ADD CONSTRAINT "survey_answers_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- -- AddForeignKey
-- ALTER TABLE "survey_answers" ADD CONSTRAINT "survey_answers_oscId_fkey" FOREIGN KEY ("oscId") REFERENCES "oscs"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SurveyResponse" ADD CONSTRAINT "SurveyResponse_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "questions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SurveyResponse" ADD CONSTRAINT "SurveyResponse_surveyAnswerId_fkey" FOREIGN KEY ("surveyAnswerId") REFERENCES "survey_answers"("id") ON DELETE CASCADE ON UPDATE CASCADE;
