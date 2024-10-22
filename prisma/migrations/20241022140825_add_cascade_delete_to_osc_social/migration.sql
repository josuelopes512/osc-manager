-- DropForeignKey
ALTER TABLE "osc_socials" DROP CONSTRAINT "osc_socials_socialPlatformId_fkey";

-- AddForeignKey
ALTER TABLE "osc_socials" ADD CONSTRAINT "osc_socials_socialPlatformId_fkey" FOREIGN KEY ("socialPlatformId") REFERENCES "social_platforms"("id") ON DELETE CASCADE ON UPDATE CASCADE;
