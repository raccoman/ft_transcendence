-- CreateTable
CREATE TABLE "Match" (
    "id" TEXT NOT NULL,
    "winner_id" INTEGER NOT NULL,
    "loser_id" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "started_at" TIMESTAMP(3) NOT NULL,
    "elapsed" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Match_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_winner_id_fkey" FOREIGN KEY ("winner_id") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_loser_id_fkey" FOREIGN KEY ("loser_id") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
