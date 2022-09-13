/*
  Warnings:

  - A unique constraint covering the columns `[id,name]` on the table `OrganizationModel` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "TestModel" DROP CONSTRAINT "TestModel_organizationModelId_fkey";

-- DropIndex
DROP INDEX "OrganizationModel_id_key";

-- AlterTable
ALTER TABLE "TestModel" ADD COLUMN     "organizationModelName" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "OrganizationModel_id_name_key" ON "OrganizationModel"("id", "name");

-- AddForeignKey
ALTER TABLE "TestModel" ADD CONSTRAINT "TestModel_organizationModelId_organizationModelName_fkey" FOREIGN KEY ("organizationModelId", "organizationModelName") REFERENCES "OrganizationModel"("id", "name") ON DELETE CASCADE ON UPDATE CASCADE;
