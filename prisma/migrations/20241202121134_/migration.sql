/*
  Warnings:

  - You are about to drop the column `deletedAt` on the `OSCAddress` table. All the data in the column will be lost.
  - You are about to drop the `_OSCToOSCAddress` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_OSCToOSCAddress" DROP CONSTRAINT "_OSCToOSCAddress_A_fkey";

-- DropForeignKey
ALTER TABLE "_OSCToOSCAddress" DROP CONSTRAINT "_OSCToOSCAddress_B_fkey";

-- AlterTable
ALTER TABLE "OSCAddress" DROP COLUMN "deletedAt";

-- AlterTable
ALTER TABLE "oscs" ADD COLUMN     "addressId" INTEGER;

-- DropTable
DROP TABLE "_OSCToOSCAddress";

-- AddForeignKey
ALTER TABLE "oscs" ADD CONSTRAINT "oscs_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "OSCAddress"("id") ON DELETE CASCADE ON UPDATE CASCADE;
