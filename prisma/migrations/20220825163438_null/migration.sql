/*
  Warnings:

  - You are about to drop the column `name` on the `MediaFileModel` table. All the data in the column will be lost.
  - Added the required column `filename` to the `MediaFileModel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MediaFileModel" DROP COLUMN "name",
ADD COLUMN     "filename" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "TestModel" ALTER COLUMN "qtnOfQuestion" SET DEFAULT 0,
ALTER COLUMN "qtnUsers" SET DEFAULT 0;
