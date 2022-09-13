/*
  Warnings:

  - You are about to drop the column `stste` on the `OrganizationModel` table. All the data in the column will be lost.
  - You are about to drop the column `typeOrganization` on the `OrganizationModel` table. All the data in the column will be lost.
  - Added the required column `state` to the `OrganizationModel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `terms` to the `OrganizationModel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `zip` to the `OrganizationModel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "OrganizationModel" DROP COLUMN "stste",
DROP COLUMN "typeOrganization",
ADD COLUMN     "state" TEXT NOT NULL,
ADD COLUMN     "terms" BOOLEAN NOT NULL,
ADD COLUMN     "zip" TEXT NOT NULL;
