/*
  Warnings:

  - You are about to drop the column `name` on the `Rooms` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[roomname]` on the table `Rooms` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `roomname` to the `Rooms` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Rooms_name_key";

-- AlterTable
ALTER TABLE "Rooms" DROP COLUMN "name",
ADD COLUMN     "roomname" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Rooms_roomname_key" ON "Rooms"("roomname");
