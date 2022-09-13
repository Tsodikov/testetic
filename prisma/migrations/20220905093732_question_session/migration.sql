/*
  Warnings:

  - You are about to drop the column `choiceAnswerId` on the `QuestionSessionModel` table. All the data in the column will be lost.
  - You are about to drop the column `testSessionModelId` on the `QuestionSessionModel` table. All the data in the column will be lost.
  - Added the required column `questionId` to the `QuestionSessionModel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `result` to the `QuestionSessionModel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `testSessionId` to the `QuestionSessionModel` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "QuestionSessionModel" DROP CONSTRAINT "QuestionSessionModel_choiceAnswerId_fkey";

-- DropForeignKey
ALTER TABLE "QuestionSessionModel" DROP CONSTRAINT "QuestionSessionModel_testSessionModelId_fkey";

-- AlterTable
ALTER TABLE "QuestionSessionModel" DROP COLUMN "choiceAnswerId",
DROP COLUMN "testSessionModelId",
ADD COLUMN     "questionId" INTEGER NOT NULL,
ADD COLUMN     "result" BOOLEAN NOT NULL,
ADD COLUMN     "testSessionId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "_AnswerModelToQuestionSessionModel" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_AnswerModelToQuestionSessionModel_AB_unique" ON "_AnswerModelToQuestionSessionModel"("A", "B");

-- CreateIndex
CREATE INDEX "_AnswerModelToQuestionSessionModel_B_index" ON "_AnswerModelToQuestionSessionModel"("B");

-- AddForeignKey
ALTER TABLE "QuestionSessionModel" ADD CONSTRAINT "QuestionSessionModel_testSessionId_fkey" FOREIGN KEY ("testSessionId") REFERENCES "TestSessionModel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionSessionModel" ADD CONSTRAINT "QuestionSessionModel_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "QuestionModel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AnswerModelToQuestionSessionModel" ADD CONSTRAINT "_AnswerModelToQuestionSessionModel_A_fkey" FOREIGN KEY ("A") REFERENCES "AnswerModel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AnswerModelToQuestionSessionModel" ADD CONSTRAINT "_AnswerModelToQuestionSessionModel_B_fkey" FOREIGN KEY ("B") REFERENCES "QuestionSessionModel"("id") ON DELETE CASCADE ON UPDATE CASCADE;
