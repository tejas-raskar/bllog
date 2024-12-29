/*
  Warnings:

  - Added the required column `blog` to the `Blog` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Blog" ADD COLUMN     "blog" JSONB NOT NULL,
ALTER COLUMN "title" DROP NOT NULL,
ALTER COLUMN "content" DROP NOT NULL;
