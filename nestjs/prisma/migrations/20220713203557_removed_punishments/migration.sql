/*
  Warnings:

  - You are about to drop the `Punishment` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Punishment" DROP CONSTRAINT "Punishment_channel_id_fkey";

-- DropForeignKey
ALTER TABLE "Punishment" DROP CONSTRAINT "Punishment_profile_id_fkey";

-- AlterTable
ALTER TABLE "Partecipant" ADD COLUMN     "banned" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "muted" BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE "Punishment";
