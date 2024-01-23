/*
  Warnings:

  - A unique constraint covering the columns `[userId,date]` on the table `stats` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "stats_date_key";

-- CreateIndex
CREATE UNIQUE INDEX "stats_userId_date_key" ON "stats"("userId", "date");
