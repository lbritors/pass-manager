/*
  Warnings:

  - You are about to drop the column `user` on the `credentials` table. All the data in the column will be lost.
  - Added the required column `userId` to the `credentials` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userLogin` to the `credentials` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `sections` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "credentials" DROP COLUMN "user",
ADD COLUMN     "userId" INTEGER NOT NULL,
ADD COLUMN     "userLogin" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "sections" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "sections" ADD CONSTRAINT "sections_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "credentials" ADD CONSTRAINT "credentials_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
