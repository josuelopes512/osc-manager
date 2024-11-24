-- AlterTable
ALTER TABLE "questions" ADD COLUMN     "shortAnswer" TEXT;

-- CreateTable
CREATE TABLE "MultipleChoice" (
    "id" SERIAL NOT NULL,
    "choices" TEXT[],
    "questionId" INTEGER NOT NULL,

    CONSTRAINT "MultipleChoice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CheckBox" (
    "id" SERIAL NOT NULL,
    "options" TEXT[],
    "questionId" INTEGER NOT NULL,

    CONSTRAINT "CheckBox_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MultipleChoice" ADD CONSTRAINT "MultipleChoice_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "questions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CheckBox" ADD CONSTRAINT "CheckBox_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "questions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
