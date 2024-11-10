/*
  Warnings:

  - You are about to drop the column `semesterId` on the `students` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "students" DROP CONSTRAINT "students_semesterId_fkey";

-- AlterTable
ALTER TABLE "students" DROP COLUMN "semesterId";
