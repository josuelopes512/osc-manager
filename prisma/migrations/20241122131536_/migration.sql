/*
  Warnings:

  - You are about to drop the `answers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "answers" DROP CONSTRAINT "answers_questionId_fkey";

-- DropTable
DROP TABLE "answers";
