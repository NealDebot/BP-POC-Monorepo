/*
  Warnings:

  - A unique constraint covering the columns `[team_id]` on the table `praktijk` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `betalingssysteem` to the `praktijk` table without a default value. This is not possible if the table is not empty.
  - Added the required column `e_mail` to the `praktijk` table without a default value. This is not possible if the table is not empty.
  - Added the required column `multidisciplinair` to the `praktijk` table without a default value. This is not possible if the table is not empty.
  - Added the required column `netwerk_aantal` to the `praktijk` table without a default value. This is not possible if the table is not empty.
  - Added the required column `netwerk_riziv` to the `praktijk` table without a default value. This is not possible if the table is not empty.
  - Added the required column `netwerk_type` to the `praktijk` table without a default value. This is not possible if the table is not empty.
  - Added the required column `online_afspraken` to the `praktijk` table without a default value. This is not possible if the table is not empty.
  - Added the required column `patient_stop` to the `praktijk` table without a default value. This is not possible if the table is not empty.
  - Added the required column `praktijkvorm` to the `praktijk` table without a default value. This is not possible if the table is not empty.
  - Added the required column `telefoon_nummer` to the `praktijk` table without a default value. This is not possible if the table is not empty.
  - Added the required column `telesecretariaat` to the `praktijk` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[praktijk] ADD [betalingssysteem] NVARCHAR(1000) NOT NULL,
[e_mail] NVARCHAR(1000) NOT NULL,
[multidisciplinair] BIT NOT NULL,
[netwerk_aantal] INT NOT NULL,
[netwerk_riziv] BIT NOT NULL,
[netwerk_type] NVARCHAR(1000) NOT NULL,
[online_afspraken] BIT NOT NULL,
[patient_stop] NVARCHAR(1000) NOT NULL,
[praktijkvorm] NVARCHAR(1000) NOT NULL,
[team_id] INT,
[telefoon_nummer] NVARCHAR(1000) NOT NULL,
[telesecretariaat] BIT NOT NULL;

-- CreateTable
CREATE TABLE [dbo].[team] (
    [id] INT NOT NULL IDENTITY(1,1),
    [coordinator_directeur] BIT NOT NULL,
    [onthaal_administratief] BIT NOT NULL,
    [verpleegkundige] BIT NOT NULL,
    [dietist_voedingsdeskundige] BIT NOT NULL,
    [kinesitherapeut_manueeltherapeut_osteopaat] BIT NOT NULL,
    [sociaal_werker] BIT NOT NULL,
    [podoloog] BIT NOT NULL,
    [psycholoog] BIT NOT NULL,
    [gezondheidspromoter] BIT NOT NULL,
    [andere] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [team_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[huisarts] (
    [id] INT NOT NULL IDENTITY(1,1),
    [in_opleiding] BIT NOT NULL,
    [email] NVARCHAR(1000) NOT NULL,
    [rizivnr] NVARCHAR(1000) NOT NULL,
    [geboortejaar] INT NOT NULL,
    [stopzetten] NVARCHAR(1000) NOT NULL,
    [team_id] INT NOT NULL,
    [adres_id] INT,
    CONSTRAINT [huisarts_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[adres] (
    [id] INT NOT NULL IDENTITY(1,1),
    [straat] NVARCHAR(1000) NOT NULL,
    [huisnr] NVARCHAR(1000) NOT NULL,
    [postcode] NVARCHAR(1000) NOT NULL,
    [Stad] NVARCHAR(1000) NOT NULL,
    [praktijk_id] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [adres_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateIndex
ALTER TABLE [dbo].[praktijk] ADD CONSTRAINT [praktijk_team_id_key] UNIQUE NONCLUSTERED ([team_id]);

-- AddForeignKey
ALTER TABLE [dbo].[praktijk] ADD CONSTRAINT [praktijk_team_id_fkey] FOREIGN KEY ([team_id]) REFERENCES [dbo].[team]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[huisarts] ADD CONSTRAINT [huisarts_team_id_fkey] FOREIGN KEY ([team_id]) REFERENCES [dbo].[team]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[huisarts] ADD CONSTRAINT [huisarts_adres_id_fkey] FOREIGN KEY ([adres_id]) REFERENCES [dbo].[adres]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[adres] ADD CONSTRAINT [adres_praktijk_id_fkey] FOREIGN KEY ([praktijk_id]) REFERENCES [dbo].[praktijk]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
