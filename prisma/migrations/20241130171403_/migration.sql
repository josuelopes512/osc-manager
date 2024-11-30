-- DropForeignKey
ALTER TABLE "oscs" DROP CONSTRAINT "oscs_addressId_fkey";

-- AddForeignKey
ALTER TABLE "oscs" ADD CONSTRAINT "oscs_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "OSCAddress"("id") ON DELETE CASCADE ON UPDATE CASCADE;
