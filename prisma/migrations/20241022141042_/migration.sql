-- DropForeignKey
ALTER TABLE "osc_socials" DROP CONSTRAINT "osc_socials_oscId_fkey";

-- AddForeignKey
ALTER TABLE "osc_socials" ADD CONSTRAINT "osc_socials_oscId_fkey" FOREIGN KEY ("oscId") REFERENCES "oscs"("id") ON DELETE CASCADE ON UPDATE CASCADE;
