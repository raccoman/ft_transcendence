/*
  Warnings:

  - Changed the type of `started_at` on the `Match` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `elapsed` on the `Match` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Match" DROP COLUMN "started_at",
ADD COLUMN     "started_at" DOUBLE PRECISION NOT NULL,
DROP COLUMN "elapsed",
ADD COLUMN     "elapsed" DOUBLE PRECISION NOT NULL;
