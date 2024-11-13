/*
  Warnings:

  - You are about to drop the column `blocked` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `user_approvals` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "blocked",
ADD COLUMN     "approved" BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE "user_approvals";
