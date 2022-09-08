/*
  Warnings:

  - You are about to drop the column `background` on the `Profile` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "background",
ADD COLUMN     "active_bg" INTEGER NOT NULL DEFAULT 0;
