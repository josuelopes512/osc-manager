-- DropForeignKey
ALTER TABLE "students" DROP CONSTRAINT "students_oscId_fkey";

-- AlterTable
ALTER TABLE "students" ALTER COLUMN "oscId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "students" ADD CONSTRAINT "students_oscId_fkey" FOREIGN KEY ("oscId") REFERENCES "oscs"("id") ON DELETE SET NULL ON UPDATE CASCADE;
