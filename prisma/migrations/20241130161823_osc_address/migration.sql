-- CreateTable
CREATE TABLE "OSCAddress" (
    "id" SERIAL NOT NULL,
    "street" TEXT NOT NULL,
    "neighborhood" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "oscId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OSCAddress_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "OSCAddress" ADD CONSTRAINT "OSCAddress_oscId_fkey" FOREIGN KEY ("oscId") REFERENCES "oscs"("id") ON DELETE CASCADE ON UPDATE CASCADE;
