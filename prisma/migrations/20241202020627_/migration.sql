/*
  Warnings:

  - The values [MultipleChoice,CheckBox,ShortAnswer] on the enum `QuestionType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `updateAt` on the `courses` table. All the data in the column will be lost.
  - You are about to drop the column `updateAt` on the `osc_socials` table. All the data in the column will be lost.
  - You are about to drop the column `addressId` on the `oscs` table. All the data in the column will be lost.
  - You are about to drop the column `updateAt` on the `oscs` table. All the data in the column will be lost.
  - You are about to drop the column `updateAt` on the `questions` table. All the data in the column will be lost.
  - You are about to drop the column `updateAt` on the `semesters` table. All the data in the column will be lost.
  - You are about to drop the column `updateAt` on the `social_platforms` table. All the data in the column will be lost.
  - You are about to drop the column `oscId` on the `students` table. All the data in the column will be lost.
  - You are about to drop the column `updateAt` on the `students` table. All the data in the column will be lost.
  - You are about to drop the column `updateAt` on the `surveys` table. All the data in the column will be lost.
  - You are about to drop the column `updateAt` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `courses` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[matriculation]` on the table `students` will be added. If there are existing duplicate values, this will fail.
  - Made the column `emailVerified` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- AlterEnum
BEGIN;
CREATE TYPE "QuestionType_new" AS ENUM ('MULTIPLE_CHOICE', 'CHECK_BOX', 'SHORT_ANSWER');
ALTER TABLE "questions" ALTER COLUMN "type" TYPE "QuestionType_new" USING ("type"::text::"QuestionType_new");
ALTER TYPE "QuestionType" RENAME TO "QuestionType_old";
ALTER TYPE "QuestionType_new" RENAME TO "QuestionType";
DROP TYPE "QuestionType_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "oscs" DROP CONSTRAINT "oscs_addressId_fkey";

-- DropForeignKey
ALTER TABLE "projects" DROP CONSTRAINT "projects_oscId_fkey";

-- DropForeignKey
ALTER TABLE "projects" DROP CONSTRAINT "projects_semesterId_fkey";

-- DropForeignKey
ALTER TABLE "students" DROP CONSTRAINT "students_courseId_fkey";

-- AlterTable
ALTER TABLE "CheckBox" ADD COLUMN     "deletedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "MultipleChoice" ADD COLUMN     "deletedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "OSCAddress" ADD COLUMN     "deletedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "SurveyResponse" ADD COLUMN     "deletedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "accounts" ADD COLUMN     "deletedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "courses" DROP COLUMN "updateAt",
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "osc_socials" DROP COLUMN "updateAt",
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "socialPlatformId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "oscs" DROP COLUMN "addressId",
DROP COLUMN "updateAt",
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "location" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "projects" ADD COLUMN     "deletedAt" TIMESTAMP(3),
ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "semesterId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "questions" DROP COLUMN "updateAt",
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "semesters" DROP COLUMN "updateAt",
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "sessions" ADD COLUMN     "deletedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "social_platforms" DROP COLUMN "updateAt",
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "students" DROP COLUMN "oscId",
DROP COLUMN "updateAt",
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "courseId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "survey_answers" ADD COLUMN     "deletedAt" TIMESTAMP(3),
ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "surveys" DROP COLUMN "updateAt",
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "updateAt",
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'USER',
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "emailVerified" SET NOT NULL;

-- AlterTable
ALTER TABLE "verificationtokens" ADD COLUMN     "deletedAt" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "_OSCToOSCAddress" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_OSCToOSCAddress_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_OSCToOSCAddress_B_index" ON "_OSCToOSCAddress"("B");

-- CreateIndex
CREATE UNIQUE INDEX "courses_name_key" ON "courses"("name");

-- CreateIndex
CREATE INDEX "courses_name_idx" ON "courses"("name");

-- CreateIndex
CREATE INDEX "oscs_name_idx" ON "oscs"("name");

-- CreateIndex
CREATE INDEX "projects_name_idx" ON "projects"("name");

-- CreateIndex
CREATE UNIQUE INDEX "students_matriculation_key" ON "students"("matriculation");

-- CreateIndex
CREATE INDEX "students_name_idx" ON "students"("name");

-- AddForeignKey
ALTER TABLE "students" ADD CONSTRAINT "students_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "projects" ADD CONSTRAINT "projects_oscId_fkey" FOREIGN KEY ("oscId") REFERENCES "oscs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "projects" ADD CONSTRAINT "projects_semesterId_fkey" FOREIGN KEY ("semesterId") REFERENCES "semesters"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OSCToOSCAddress" ADD CONSTRAINT "_OSCToOSCAddress_A_fkey" FOREIGN KEY ("A") REFERENCES "oscs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OSCToOSCAddress" ADD CONSTRAINT "_OSCToOSCAddress_B_fkey" FOREIGN KEY ("B") REFERENCES "OSCAddress"("id") ON DELETE CASCADE ON UPDATE CASCADE;
