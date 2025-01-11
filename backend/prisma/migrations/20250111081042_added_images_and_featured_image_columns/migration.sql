-- AlterTable
ALTER TABLE "Blog" ADD COLUMN     "featuredImage" TEXT,
ADD COLUMN     "images" TEXT[] DEFAULT ARRAY[]::TEXT[];
