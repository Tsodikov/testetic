/*
  Warnings:

  - You are about to drop the column `lastModified` on the `MediaFileModel` table. All the data in the column will be lost.
  - You are about to drop the column `lastModifiedDate` on the `MediaFileModel` table. All the data in the column will be lost.
  - You are about to drop the column `questionModelId` on the `MediaFileModel` table. All the data in the column will be lost.
  - You are about to drop the column `webkitRelativePath` on the `MediaFileModel` table. All the data in the column will be lost.
  - You are about to drop the column `avatar` on the `UserModel` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userAvatarId]` on the table `MediaFileModel` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "MediaFileModel" DROP CONSTRAINT "MediaFileModel_questionModelId_fkey";

-- AlterTable
ALTER TABLE "MediaFileModel" DROP COLUMN "lastModified",
DROP COLUMN "lastModifiedDate",
DROP COLUMN "questionModelId",
DROP COLUMN "webkitRelativePath",
ADD COLUMN     "answerId" INTEGER,
ADD COLUMN     "questionId" INTEGER,
ADD COLUMN     "userAvatarId" INTEGER;

-- AlterTable
ALTER TABLE "UserModel" DROP COLUMN "avatar",
ADD COLUMN     "avatarId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "MediaFileModel_userAvatarId_key" ON "MediaFileModel"("userAvatarId");

-- AddForeignKey
ALTER TABLE "MediaFileModel" ADD CONSTRAINT "MediaFileModel_userAvatarId_fkey" FOREIGN KEY ("userAvatarId") REFERENCES "UserModel"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MediaFileModel" ADD CONSTRAINT "MediaFileModel_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "QuestionModel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MediaFileModel" ADD CONSTRAINT "MediaFileModel_answerId_fkey" FOREIGN KEY ("answerId") REFERENCES "AnswerModel"("id") ON DELETE SET NULL ON UPDATE CASCADE;
