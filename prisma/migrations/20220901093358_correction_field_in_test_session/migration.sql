/*
  Warnings:

  - You are about to drop the column `testModelId` on the `TestSessionModel` table. All the data in the column will be lost.
  - You are about to drop the column `userModelId` on the `TestSessionModel` table. All the data in the column will be lost.
  - Added the required column `testId` to the `TestSessionModel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `TestSessionModel` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "TestSessionModel" DROP CONSTRAINT "TestSessionModel_testModelId_fkey";

-- DropForeignKey
ALTER TABLE "TestSessionModel" DROP CONSTRAINT "TestSessionModel_userModelId_fkey";

-- AlterTable
ALTER TABLE "TestSessionModel" DROP COLUMN "testModelId",
DROP COLUMN "userModelId",
ADD COLUMN     "testId" INTEGER NOT NULL,
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "TestSessionModel" ADD CONSTRAINT "TestSessionModel_userId_fkey" FOREIGN KEY ("userId") REFERENCES "UserModel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestSessionModel" ADD CONSTRAINT "TestSessionModel_testId_fkey" FOREIGN KEY ("testId") REFERENCES "TestModel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
