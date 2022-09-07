/*
  Warnings:

  - You are about to drop the `_followers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_followers" DROP CONSTRAINT "_followers_A_fkey";

-- DropForeignKey
ALTER TABLE "_followers" DROP CONSTRAINT "_followers_B_fkey";

-- DropTable
DROP TABLE "_followers";
