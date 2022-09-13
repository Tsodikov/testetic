/*
  Warnings:

  - You are about to drop the column `departmentModelId` on the `TestModel` table. All the data in the column will be lost.
  - You are about to drop the column `departmentModelId` on the `UserModel` table. All the data in the column will be lost.
  - You are about to drop the `DepartmentModel` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "DepartmentModel" DROP CONSTRAINT "DepartmentModel_organizationModelId_fkey";

-- DropForeignKey
ALTER TABLE "TestModel" DROP CONSTRAINT "TestModel_departmentModelId_fkey";

-- DropForeignKey
ALTER TABLE "UserModel" DROP CONSTRAINT "UserModel_departmentModelId_fkey";

-- AlterTable
ALTER TABLE "TestModel" DROP COLUMN "departmentModelId";

-- AlterTable
ALTER TABLE "UserModel" DROP COLUMN "departmentModelId";

-- DropTable
DROP TABLE "DepartmentModel";
