-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_channel_id_fkey";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_profile_id_fkey";

-- DropForeignKey
ALTER TABLE "Partecipant" DROP CONSTRAINT "Partecipant_channel_id_fkey";

-- DropForeignKey
ALTER TABLE "Partecipant" DROP CONSTRAINT "Partecipant_profile_id_fkey";

-- AddForeignKey
ALTER TABLE "Partecipant" ADD CONSTRAINT "Partecipant_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Partecipant" ADD CONSTRAINT "Partecipant_channel_id_fkey" FOREIGN KEY ("channel_id") REFERENCES "Channel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_channel_id_fkey" FOREIGN KEY ("channel_id") REFERENCES "Channel"("id") ON DELETE CASCADE ON UPDATE CASCADE;
