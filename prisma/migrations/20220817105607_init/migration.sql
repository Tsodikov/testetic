-- AlterTable
ALTER TABLE "TestModel" ADD COLUMN     "organizationModelId" INTEGER;

-- AlterTable
ALTER TABLE "TestSessionModel" ALTER COLUMN "status" DROP DEFAULT;

-- AddForeignKey
ALTER TABLE "TestModel" ADD CONSTRAINT "TestModel_organizationModelId_fkey" FOREIGN KEY ("organizationModelId") REFERENCES "OrganizationModel"("id") ON DELETE CASCADE ON UPDATE CASCADE;
