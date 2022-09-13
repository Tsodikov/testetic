/*
  Warnings:

  - Added the required column `departmentId` to the `TestModel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MediaFileModel" ADD COLUMN     "testId" INTEGER,
ALTER COLUMN "questionModelId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "QuestionModel" ADD COLUMN     "weight" INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE "TestModel" ADD COLUMN     "departmentId" INTEGER NOT NULL,
ADD COLUMN     "timeLimitPassTest" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "UserModel" ADD COLUMN     "departmentId" INTEGER;

-- CreateTable
CREATE TABLE "DepartmentModel" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "organizationId" INTEGER NOT NULL,

    CONSTRAINT "DepartmentModel_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "DepartmentModel" ADD CONSTRAINT "DepartmentModel_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "OrganizationModel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserModel" ADD CONSTRAINT "UserModel_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "DepartmentModel"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestModel" ADD CONSTRAINT "TestModel_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "DepartmentModel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MediaFileModel" ADD CONSTRAINT "MediaFileModel_testId_fkey" FOREIGN KEY ("testId") REFERENCES "TestModel"("id") ON DELETE CASCADE ON UPDATE CASCADE;
