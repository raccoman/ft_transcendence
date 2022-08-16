/*
  Warnings:

  - You are about to drop the column `elapsed` on the `Match` table. All the data in the column will be lost.
  - The `started_at` column on the `Match` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Match" DROP COLUMN "elapsed",
ADD COLUMN     "playtime" DOUBLE PRECISION NOT NULL DEFAULT 0,
ALTER COLUMN "type" SET DEFAULT 'DRAFT_1vs1',
ALTER COLUMN "type" SET DATA TYPE TEXT,
DROP COLUMN "started_at",
ADD COLUMN     "started_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
