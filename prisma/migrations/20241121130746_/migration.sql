-- AlterTable
ALTER TABLE "CheckBox" ALTER COLUMN "options" SET NOT NULL,
ALTER COLUMN "options" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "MultipleChoice" ALTER COLUMN "choices" SET NOT NULL,
ALTER COLUMN "choices" SET DATA TYPE TEXT;