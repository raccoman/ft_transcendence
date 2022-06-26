/*
  Warnings:

  - You are about to drop the column `sender_id` on the `Message` table. All the data in the column will be lost.
  - Added the required column `profile_id` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_sender_id_fkey";

-- AlterTable
ALTER TABLE "Message" DROP COLUMN "sender_id",
ADD COLUMN     "profile_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Punishment" (
    "id" TEXT NOT NULL,
    "channel_id" TEXT NOT NULL,
    "profile_id" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "duration" BIGINT NOT NULL DEFAULT -1,
    "issued_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Punishment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Partecipant" (
    "id" TEXT NOT NULL,
    "profile_id" INTEGER NOT NULL,
    "channel_id" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT E'MEMBER',

    CONSTRAINT "Partecipant_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Punishment" ADD CONSTRAINT "Punishment_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Punishment" ADD CONSTRAINT "Punishment_channel_id_fkey" FOREIGN KEY ("channel_id") REFERENCES "Channel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Partecipant" ADD CONSTRAINT "Partecipant_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Partecipant" ADD CONSTRAINT "Partecipant_channel_id_fkey" FOREIGN KEY ("channel_id") REFERENCES "Channel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
