-- DropForeignKey
ALTER TABLE "SurveyResponse" DROP CONSTRAINT "SurveyResponse_questionId_fkey";

-- AddForeignKey
ALTER TABLE "SurveyResponse" ADD CONSTRAINT "SurveyResponse_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "questions"("id") ON DELETE CASCADE ON UPDATE CASCADE;
