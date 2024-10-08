/*
  Warnings:

  - The primary key for the `Book` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Book" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "isbn" TEXT NOT NULL,
    "coverType" TEXT NOT NULL
);
INSERT INTO "new_Book" ("coverType", "id", "image", "isbn", "title") SELECT "coverType", "id", "image", "isbn", "title" FROM "Book";
DROP TABLE "Book";
ALTER TABLE "new_Book" RENAME TO "Book";
CREATE UNIQUE INDEX "Book_title_key" ON "Book"("title");
CREATE UNIQUE INDEX "Book_isbn_key" ON "Book"("isbn");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
