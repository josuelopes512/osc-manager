/*
  Warnings:

  - You are about to drop the column `oscAddressId` on the `oscs` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "oscs" DROP CONSTRAINT "oscs_oscAddressId_fkey";

-- AlterTable
ALTER TABLE "oscs" DROP COLUMN "oscAddressId",
ADD COLUMN     "addressId" INTEGER;

-- AddForeignKey
ALTER TABLE "oscs" ADD CONSTRAINT "oscs_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "OSCAddress"("id") ON DELETE SET NULL ON UPDATE CASCADE;
