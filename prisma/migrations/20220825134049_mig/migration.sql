/*
  Warnings:

  - You are about to drop the column `userModelId` on the `TestModel` table. All the data in the column will be lost.
  - You are about to drop the column `userModelName` on the `TestModel` table. All the data in the column will be lost.
  - Added the required column `creatorId` to the `TestModel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `creatorName` to the `TestModel` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `dateOfCreate` on the `TestModel` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "TestModel" DROP CONSTRAINT "TestModel_userModelId_fkey";

-- AlterTable
ALTER TABLE "TestModel" DROP COLUMN "userModelId",
DROP COLUMN "userModelName",
ADD COLUMN     "creatorId" INTEGER NOT NULL,
ADD COLUMN     "creatorName" TEXT NOT NULL,
DROP COLUMN "dateOfCreate",
ADD COLUMN     "dateOfCreate" TIMESTAMP(3) NOT NULL;

-- AddForeignKey
ALTER TABLE "TestModel" ADD CONSTRAINT "TestModel_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "UserModel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
