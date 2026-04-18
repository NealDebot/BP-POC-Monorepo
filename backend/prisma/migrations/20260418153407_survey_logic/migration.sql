BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[vragenlijst] (
    [id] INT NOT NULL IDENTITY(1,1),
    [naam] NVARCHAR(1000) NOT NULL,
    [json] NVARCHAR(1000) NOT NULL,
    [deadline] DATETIME2 NOT NULL,
    CONSTRAINT [vragenlijst_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[survey_antwoorden] (
    [id] INT NOT NULL IDENTITY(1,1),
    [antwoorden] NVARCHAR(1000) NOT NULL,
    [vooruitgang] INT NOT NULL,
    [vragenlijst_id] INT NOT NULL,
    [praktijk_id] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [survey_antwoorden_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[survey_antwoorden] ADD CONSTRAINT [survey_antwoorden_vragenlijst_id_fkey] FOREIGN KEY ([vragenlijst_id]) REFERENCES [dbo].[vragenlijst]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[survey_antwoorden] ADD CONSTRAINT [survey_antwoorden_praktijk_id_fkey] FOREIGN KEY ([praktijk_id]) REFERENCES [dbo].[praktijk]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
