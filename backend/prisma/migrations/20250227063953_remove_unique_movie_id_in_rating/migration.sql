-- DropIndex
DROP INDEX "Rating_movieId_key";

-- CreateIndex
CREATE INDEX "Comment_createdAt_idx" ON "Comment"("createdAt");
