/*
  Warnings:

  - You are about to drop the column `active` on the `TestSessionModel` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "TestSessionModel" DROP COLUMN "active",
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'idle';
