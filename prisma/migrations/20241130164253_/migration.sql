/*
  Warnings:

  - You are about to drop the column `oscId` on the `OSCAddress` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "OSCAddress" DROP CONSTRAINT "OSCAddress_oscId_fkey";

-- AlterTable
ALTER TABLE "OSCAddress" DROP COLUMN "oscId";

-- AlterTable
ALTER TABLE "oscs" ADD COLUMN     "oscAddressId" INTEGER;

-- AddForeignKey
ALTER TABLE "oscs" ADD CONSTRAINT "oscs_oscAddressId_fkey" FOREIGN KEY ("oscAddressId") REFERENCES "OSCAddress"("id") ON DELETE SET NULL ON UPDATE CASCADE;
