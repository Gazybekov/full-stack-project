/*
  Warnings:

  - You are about to drop the column `firsName` on the `Employee` table. All the data in the column will be lost.
  - Added the required column `firstName` to the `Employee` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Employee" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "age" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Employee_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Employee" ("address", "age", "id", "lastName", "userId") SELECT "address", "age", "id", "lastName", "userId" FROM "Employee";
DROP TABLE "Employee";
ALTER TABLE "new_Employee" RENAME TO "Employee";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
