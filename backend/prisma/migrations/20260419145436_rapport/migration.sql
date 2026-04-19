BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[rapport] (
    [id] INT NOT NULL IDENTITY(1,1),
    [titel] NVARCHAR(1000) NOT NULL,
    [created_at] DATETIME2 NOT NULL CONSTRAINT [rapport_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [samenvatting] NVARCHAR(max) NOT NULL,
    [Uitleg] NVARCHAR(max) NOT NULL,
    [survey_antwoord_id] INT NOT NULL,
    CONSTRAINT [rapport_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[rapport] ADD CONSTRAINT [rapport_survey_antwoord_id_fkey] FOREIGN KEY ([survey_antwoord_id]) REFERENCES [dbo].[survey_antwoorden]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
