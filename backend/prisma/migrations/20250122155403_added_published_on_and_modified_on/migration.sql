/*
  Warnings:

  - Made the column `title` on table `Blog` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Blog" ADD COLUMN     "modifiedOn" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "publishedOn" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "title" SET NOT NULL;
