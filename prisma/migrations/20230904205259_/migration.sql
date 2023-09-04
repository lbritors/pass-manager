/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `cards` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "cards_title_key" ON "cards"("title");
