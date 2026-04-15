/*
  Warnings:

  - A unique constraint covering the columns `[auth0_id]` on the table `praktijk` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `auth0_id` to the `praktijk` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[praktijk] ADD [auth0_id] NVARCHAR(1000) NOT NULL;

-- CreateIndex
ALTER TABLE [dbo].[praktijk] ADD CONSTRAINT [praktijk_auth0_id_key] UNIQUE NONCLUSTERED ([auth0_id]);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
