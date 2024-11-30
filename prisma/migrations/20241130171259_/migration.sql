-- DropForeignKey
ALTER TABLE "projects" DROP CONSTRAINT "projects_oscId_fkey";

-- AddForeignKey
ALTER TABLE "projects" ADD CONSTRAINT "projects_oscId_fkey" FOREIGN KEY ("oscId") REFERENCES "oscs"("id") ON DELETE CASCADE ON UPDATE CASCADE;
