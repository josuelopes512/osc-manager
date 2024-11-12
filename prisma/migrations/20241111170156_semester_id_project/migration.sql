/*
  Warnings:

  - You are about to drop the `_ProjectToSemester` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `semesterId` to the `projects` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_ProjectToSemester" DROP CONSTRAINT "_ProjectToSemester_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProjectToSemester" DROP CONSTRAINT "_ProjectToSemester_B_fkey";

-- AlterTable
ALTER TABLE "projects" ADD COLUMN     "semesterId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "_ProjectToSemester";

-- AddForeignKey
ALTER TABLE "projects" ADD CONSTRAINT "projects_semesterId_fkey" FOREIGN KEY ("semesterId") REFERENCES "semesters"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
