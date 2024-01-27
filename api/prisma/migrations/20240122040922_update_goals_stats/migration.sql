/*
  Warnings:

  - A unique constraint covering the columns `[date]` on the table `stats` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `date` to the `stats` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "goals" ADD COLUMN     "completedAt" TIMESTAMP(3),
ADD COLUMN     "lastSync" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "stepsWalked" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "stats" ADD COLUMN     "date" DATE NOT NULL,
ADD COLUMN     "lastSync" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE UNIQUE INDEX "stats_date_key" ON "stats"("date");
