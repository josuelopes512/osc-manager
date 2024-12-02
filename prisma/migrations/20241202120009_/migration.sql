-- AlterTable
ALTER TABLE "survey_answers" ADD COLUMN     "oscId" INTEGER,
ADD COLUMN     "stuentId" INTEGER;

-- AddForeignKey
ALTER TABLE "survey_answers" ADD CONSTRAINT "survey_answers_stuentId_fkey" FOREIGN KEY ("stuentId") REFERENCES "students"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "survey_answers" ADD CONSTRAINT "survey_answers_oscId_fkey" FOREIGN KEY ("oscId") REFERENCES "oscs"("id") ON DELETE SET NULL ON UPDATE CASCADE;
