/*
  Warnings:

  - You are about to drop the column `height` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `weight` on the `users` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "users_phone_key";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "height",
DROP COLUMN "phone",
DROP COLUMN "weight";
