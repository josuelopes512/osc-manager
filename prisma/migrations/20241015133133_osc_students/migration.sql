-- CreateTable
CREATE TABLE "social_platforms" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "social_platforms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "osc_socials" (
    "id" SERIAL NOT NULL,
    "oscId" INTEGER NOT NULL,
    "socialPlatformId" INTEGER NOT NULL,
    "link" TEXT NOT NULL,

    CONSTRAINT "osc_socials_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "oscs" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,

    CONSTRAINT "oscs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "students" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "courseId" INTEGER NOT NULL,
    "semester" TEXT NOT NULL,
    "oscId" INTEGER NOT NULL,

    CONSTRAINT "students_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "courses" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "courses_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "social_platforms_name_key" ON "social_platforms"("name");

-- AddForeignKey
ALTER TABLE "osc_socials" ADD CONSTRAINT "osc_socials_oscId_fkey" FOREIGN KEY ("oscId") REFERENCES "oscs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "osc_socials" ADD CONSTRAINT "osc_socials_socialPlatformId_fkey" FOREIGN KEY ("socialPlatformId") REFERENCES "social_platforms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "students" ADD CONSTRAINT "students_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "students" ADD CONSTRAINT "students_oscId_fkey" FOREIGN KEY ("oscId") REFERENCES "oscs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
