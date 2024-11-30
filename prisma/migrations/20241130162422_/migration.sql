/*
  Warnings:

  - Added the required column `zipCode` to the `OSCAddress` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "OSCAddress" ADD COLUMN     "zipCode" TEXT NOT NULL;
