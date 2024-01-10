/*
  Warnings:

  - You are about to drop the column `firstname` on the `reg` table. All the data in the column will be lost.
  - Added the required column `fisrtname` to the `reg` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `reg` DROP COLUMN `firstname`,
    ADD COLUMN `fisrtname` VARCHAR(100) NOT NULL;
