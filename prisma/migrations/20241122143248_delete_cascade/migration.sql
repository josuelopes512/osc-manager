-- DropForeignKey
ALTER TABLE "CheckBox" DROP CONSTRAINT "CheckBox_questionId_fkey";

-- DropForeignKey
ALTER TABLE "MultipleChoice" DROP CONSTRAINT "MultipleChoice_questionId_fkey";

-- DropForeignKey
ALTER TABLE "questions" DROP CONSTRAINT "questions_surveyId_fkey";

-- AddForeignKey
ALTER TABLE "questions" ADD CONSTRAINT "questions_surveyId_fkey" FOREIGN KEY ("surveyId") REFERENCES "surveys"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MultipleChoice" ADD CONSTRAINT "MultipleChoice_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "questions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CheckBox" ADD CONSTRAINT "CheckBox_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "questions"("id") ON DELETE CASCADE ON UPDATE CASCADE;
