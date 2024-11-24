/*
  Warnings:

  - You are about to drop the column `other` on the `CheckBox` table. All the data in the column will be lost.
  - You are about to drop the column `other` on the `MultipleChoice` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "CheckBox" DROP COLUMN "other";

-- AlterTable
ALTER TABLE "MultipleChoice" DROP COLUMN "other";
