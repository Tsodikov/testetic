/*
  Warnings:

  - You are about to drop the column `organizationModelId` on the `UserModel` table. All the data in the column will be lost.
  - You are about to drop the column `testModelId` on the `UserModel` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserModel" DROP CONSTRAINT "UserModel_organizationModelId_fkey";

-- AlterTable
ALTER TABLE "UserModel" DROP COLUMN "organizationModelId",
DROP COLUMN "testModelId";

-- CreateTable
CREATE TABLE "_OrganizationModelToUserModel" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_OrganizationModelToUserModel_AB_unique" ON "_OrganizationModelToUserModel"("A", "B");

-- CreateIndex
CREATE INDEX "_OrganizationModelToUserModel_B_index" ON "_OrganizationModelToUserModel"("B");

-- AddForeignKey
ALTER TABLE "_OrganizationModelToUserModel" ADD CONSTRAINT "_OrganizationModelToUserModel_A_fkey" FOREIGN KEY ("A") REFERENCES "OrganizationModel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OrganizationModelToUserModel" ADD CONSTRAINT "_OrganizationModelToUserModel_B_fkey" FOREIGN KEY ("B") REFERENCES "UserModel"("id") ON DELETE CASCADE ON UPDATE CASCADE;
