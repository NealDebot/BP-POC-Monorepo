BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[huisarts] ADD CONSTRAINT [huisarts_in_opleiding_df] DEFAULT 0 FOR [in_opleiding];

-- AlterTable
ALTER TABLE [dbo].[praktijk] ALTER COLUMN [betalingssysteem] NVARCHAR(1000) NULL;
ALTER TABLE [dbo].[praktijk] ALTER COLUMN [e_mail] NVARCHAR(1000) NULL;
ALTER TABLE [dbo].[praktijk] ALTER COLUMN [netwerk_aantal] INT NULL;
ALTER TABLE [dbo].[praktijk] ALTER COLUMN [netwerk_type] NVARCHAR(1000) NULL;
ALTER TABLE [dbo].[praktijk] ALTER COLUMN [patient_stop] NVARCHAR(1000) NULL;
ALTER TABLE [dbo].[praktijk] ALTER COLUMN [praktijkvorm] NVARCHAR(1000) NULL;
ALTER TABLE [dbo].[praktijk] ALTER COLUMN [telefoon_nummer] NVARCHAR(1000) NULL;
ALTER TABLE [dbo].[praktijk] ADD CONSTRAINT [praktijk_multidisciplinair_df] DEFAULT 0 FOR [multidisciplinair], CONSTRAINT [praktijk_netwerk_riziv_df] DEFAULT 0 FOR [netwerk_riziv], CONSTRAINT [praktijk_online_afspraken_df] DEFAULT 0 FOR [online_afspraken], CONSTRAINT [praktijk_telesecretariaat_df] DEFAULT 0 FOR [telesecretariaat];

-- AlterTable
ALTER TABLE [dbo].[team] ALTER COLUMN [andere] NVARCHAR(1000) NULL;
ALTER TABLE [dbo].[team] ADD CONSTRAINT [team_coordinator_directeur_df] DEFAULT 0 FOR [coordinator_directeur], CONSTRAINT [team_dietist_voedingsdeskundige_df] DEFAULT 0 FOR [dietist_voedingsdeskundige], CONSTRAINT [team_gezondheidspromoter_df] DEFAULT 0 FOR [gezondheidspromoter], CONSTRAINT [team_kinesitherapeut_manueeltherapeut_osteopaat_df] DEFAULT 0 FOR [kinesitherapeut_manueeltherapeut_osteopaat], CONSTRAINT [team_onthaal_administratief_df] DEFAULT 0 FOR [onthaal_administratief], CONSTRAINT [team_podoloog_df] DEFAULT 0 FOR [podoloog], CONSTRAINT [team_psycholoog_df] DEFAULT 0 FOR [psycholoog], CONSTRAINT [team_sociaal_werker_df] DEFAULT 0 FOR [sociaal_werker], CONSTRAINT [team_verpleegkundige_df] DEFAULT 0 FOR [verpleegkundige];

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
