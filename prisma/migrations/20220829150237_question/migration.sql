-- AlterTable
ALTER TABLE "QuestionModel" ADD COLUMN     "answerType" TEXT,
ADD COLUMN     "oneAnswer" BOOLEAN NOT NULL DEFAULT true;
