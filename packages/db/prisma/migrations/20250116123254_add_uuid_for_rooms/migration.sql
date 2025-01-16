/*
  Warnings:

  - The required column `roomCode` was added to the `Rooms` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "Rooms" ADD COLUMN     "roomCode" TEXT NOT NULL;
