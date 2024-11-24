/*
  Warnings:

  - You are about to drop the column `options` on the `CheckBox` table. All the data in the column will be lost.
  - You are about to drop the column `choices` on the `MultipleChoice` table. All the data in the column will be lost.
  - Added the required column `option` to the `CheckBox` table without a default value. This is not possible if the table is not empty.
  - Added the required column `choice` to the `MultipleChoice` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CheckBox" DROP COLUMN "options",
ADD COLUMN     "option" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "MultipleChoice" DROP COLUMN "choices",
ADD COLUMN     "choice" TEXT NOT NULL;
