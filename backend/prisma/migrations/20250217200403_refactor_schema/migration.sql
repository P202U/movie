/*
  Warnings:

  - The values [DENIED] on the enum `RequestStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `movieId` on the `ReviewRequest` table. All the data in the column will be lost.
  - You are about to drop the `Review` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ReviewRating` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Rating` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[movieId]` on the table `Rating` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `category` to the `Movie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `releaseYear` to the `Movie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `review` to the `Movie` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `value` on the `Rating` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `movieName` to the `ReviewRequest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `releaseYear` to the `ReviewRequest` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "RequestStatus_new" AS ENUM ('PENDING', 'APPROVED');
ALTER TABLE "ReviewRequest" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "ReviewRequest" ALTER COLUMN "status" TYPE "RequestStatus_new" USING ("status"::text::"RequestStatus_new");
ALTER TYPE "RequestStatus" RENAME TO "RequestStatus_old";
ALTER TYPE "RequestStatus_new" RENAME TO "RequestStatus";
DROP TYPE "RequestStatus_old";
ALTER TABLE "ReviewRequest" ALTER COLUMN "status" SET DEFAULT 'PENDING';
COMMIT;

-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_movieId_fkey";

-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_userId_fkey";

-- DropForeignKey
ALTER TABLE "ReviewRating" DROP CONSTRAINT "ReviewRating_reviewId_fkey";

-- DropForeignKey
ALTER TABLE "ReviewRating" DROP CONSTRAINT "ReviewRating_userId_fkey";

-- DropForeignKey
ALTER TABLE "ReviewRequest" DROP CONSTRAINT "ReviewRequest_movieId_fkey";

-- DropIndex
DROP INDEX "ReviewRequest_movieId_idx";

-- AlterTable
ALTER TABLE "Movie" ADD COLUMN     "adminRating" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "category" TEXT NOT NULL,
ADD COLUMN     "genre" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "releaseYear" TEXT NOT NULL,
ADD COLUMN     "review" TEXT NOT NULL,
ALTER COLUMN "imgUrl" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Rating" DROP COLUMN "value",
ADD COLUMN     "value" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "ReviewRequest" DROP COLUMN "movieId",
ADD COLUMN     "movieName" TEXT NOT NULL,
ADD COLUMN     "releaseYear" TEXT NOT NULL;

-- DropTable
DROP TABLE "Review";

-- DropTable
DROP TABLE "ReviewRating";

-- CreateIndex
CREATE UNIQUE INDEX "Rating_userId_key" ON "Rating"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Rating_movieId_key" ON "Rating"("movieId");
