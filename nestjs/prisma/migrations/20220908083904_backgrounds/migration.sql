-- CreateTable
CREATE TABLE "Background" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "rarity" TEXT NOT NULL DEFAULT 'COMMON',
    "price" INTEGER NOT NULL,

    CONSTRAINT "Background_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_BackgroundToProfile" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_BackgroundToProfile_AB_unique" ON "_BackgroundToProfile"("A", "B");

-- CreateIndex
CREATE INDEX "_BackgroundToProfile_B_index" ON "_BackgroundToProfile"("B");

-- AddForeignKey
ALTER TABLE "_BackgroundToProfile" ADD CONSTRAINT "_BackgroundToProfile_A_fkey" FOREIGN KEY ("A") REFERENCES "Background"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BackgroundToProfile" ADD CONSTRAINT "_BackgroundToProfile_B_fkey" FOREIGN KEY ("B") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
