/*
  Warnings:

  - You are about to drop the column `chapterModelId` on the `TestModel` table. All the data in the column will be lost.
  - You are about to drop the column `chapterModelTitle` on the `TestModel` table. All the data in the column will be lost.
  - You are about to drop the column `organizationModelId` on the `TestModel` table. All the data in the column will be lost.
  - You are about to drop the column `organizationModelName` on the `TestModel` table. All the data in the column will be lost.
  - Added the required column `chapterId` to the `TestModel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `chapterTitle` to the `TestModel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `organizationId` to the `TestModel` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "TestModel" DROP CONSTRAINT "TestModel_chapterModelId_chapterModelTitle_fkey";

-- DropForeignKey
ALTER TABLE "TestModel" DROP CONSTRAINT "TestModel_organizationModelId_organizationModelName_fkey";

-- AlterTable
ALTER TABLE "TestModel" DROP COLUMN "chapterModelId",
DROP COLUMN "chapterModelTitle",
DROP COLUMN "organizationModelId",
DROP COLUMN "organizationModelName",
ADD COLUMN     "chapterId" INTEGER NOT NULL,
ADD COLUMN     "chapterTitle" TEXT NOT NULL,
ADD COLUMN     "organizationId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "UserModel" ADD COLUMN     "avatar" TEXT;

-- AddForeignKey
ALTER TABLE "TestModel" ADD CONSTRAINT "TestModel_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "OrganizationModel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestModel" ADD CONSTRAINT "TestModel_chapterId_chapterTitle_fkey" FOREIGN KEY ("chapterId", "chapterTitle") REFERENCES "ChapterModel"("id", "chapterTitle") ON DELETE CASCADE ON UPDATE CASCADE;
