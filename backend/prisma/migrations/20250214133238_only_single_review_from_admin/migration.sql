/*
  Warnings:

  - A unique constraint covering the columns `[movieId]` on the table `Review` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Review_movieId_key" ON "Review"("movieId");
