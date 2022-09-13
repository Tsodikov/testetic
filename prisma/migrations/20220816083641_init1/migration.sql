/*
  Warnings:

  - Added the required column `weight` to the `QuestionModel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `departmentModelId` to the `TestModel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `departmentModelId` to the `UserModel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "QuestionModel" ADD COLUMN     "weight" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "TestModel" ADD COLUMN     "departmentModelId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "UserModel" ADD COLUMN     "departmentModelId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "DepartmentModel" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "organizationModelId" INTEGER NOT NULL,

    CONSTRAINT "DepartmentModel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TestSessionModel" (
    "id" SERIAL NOT NULL,
    "testModelId" INTEGER NOT NULL,
    "userModelId" INTEGER NOT NULL,
    "registrationDateTime" TIMESTAMP(3) NOT NULL,
    "confirmationRegister" TIMESTAMP(3) NOT NULL,
    "invitationSended" TIMESTAMP(3) NOT NULL,
    "confirmationInvite" TIMESTAMP(3) NOT NULL,
    "startTest" TIMESTAMP(3) NOT NULL,
    "endTest" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TestSessionModel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuestionSessionModel" (
    "id" SERIAL NOT NULL,
    "startQuestion" TIMESTAMP(3) NOT NULL,
    "endQuestion" TIMESTAMP(3) NOT NULL,
    "testSessionModelId" INTEGER NOT NULL,
    "choiceAnswerId" INTEGER NOT NULL,

    CONSTRAINT "QuestionSessionModel_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "DepartmentModel" ADD CONSTRAINT "DepartmentModel_organizationModelId_fkey" FOREIGN KEY ("organizationModelId") REFERENCES "OrganizationModel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserModel" ADD CONSTRAINT "UserModel_departmentModelId_fkey" FOREIGN KEY ("departmentModelId") REFERENCES "DepartmentModel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestSessionModel" ADD CONSTRAINT "TestSessionModel_userModelId_fkey" FOREIGN KEY ("userModelId") REFERENCES "UserModel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestSessionModel" ADD CONSTRAINT "TestSessionModel_testModelId_fkey" FOREIGN KEY ("testModelId") REFERENCES "TestModel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionSessionModel" ADD CONSTRAINT "QuestionSessionModel_testSessionModelId_fkey" FOREIGN KEY ("testSessionModelId") REFERENCES "TestSessionModel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionSessionModel" ADD CONSTRAINT "QuestionSessionModel_choiceAnswerId_fkey" FOREIGN KEY ("choiceAnswerId") REFERENCES "AnswerModel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestModel" ADD CONSTRAINT "TestModel_departmentModelId_fkey" FOREIGN KEY ("departmentModelId") REFERENCES "DepartmentModel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
