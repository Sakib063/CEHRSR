/*
  Warnings:

  - You are about to drop the column `fisrtname` on the `reg` table. All the data in the column will be lost.
  - Added the required column `firstname` to the `reg` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `reg` DROP COLUMN `fisrtname`,
    ADD COLUMN `firstname` VARCHAR(100) NOT NULL;
