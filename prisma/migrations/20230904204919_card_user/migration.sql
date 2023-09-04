/*
  Warnings:

  - You are about to drop the column `cvc` on the `cards` table. All the data in the column will be lost.
  - Added the required column `cv` to the `cards` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `cards` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "cards" DROP COLUMN "cvc",
ADD COLUMN     "cv" INTEGER NOT NULL,
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "cards" ADD CONSTRAINT "cards_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
