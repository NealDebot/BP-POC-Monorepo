-- CreateTable
CREATE TABLE "praktijk" (
    "id" TEXT NOT NULL,
    "auth0_id" TEXT NOT NULL,
    "telefoon_nummer" TEXT,
    "e_mail" TEXT,
    "praktijkvorm" TEXT,
    "betalingssysteem" TEXT,
    "patient_stop" TEXT,
    "online_afspraken" BOOLEAN NOT NULL DEFAULT false,
    "multidisciplinair" BOOLEAN NOT NULL DEFAULT false,
    "telesecretariaat" BOOLEAN NOT NULL DEFAULT false,
    "netwerk_type" TEXT,
    "netwerk_aantal" INTEGER,
    "netwerk_riziv" BOOLEAN NOT NULL DEFAULT false,
    "team_id" INTEGER,

    CONSTRAINT "praktijk_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "team" (
    "id" SERIAL NOT NULL,
    "coordinator_directeur" BOOLEAN NOT NULL DEFAULT false,
    "onthaal_administratief" BOOLEAN NOT NULL DEFAULT false,
    "verpleegkundige" BOOLEAN NOT NULL DEFAULT false,
    "dietist_voedingsdeskundige" BOOLEAN NOT NULL DEFAULT false,
    "kinesitherapeut_manueeltherapeut_osteopaat" BOOLEAN NOT NULL DEFAULT false,
    "sociaal_werker" BOOLEAN NOT NULL DEFAULT false,
    "podoloog" BOOLEAN NOT NULL DEFAULT false,
    "psycholoog" BOOLEAN NOT NULL DEFAULT false,
    "gezondheidspromoter" BOOLEAN NOT NULL DEFAULT false,
    "andere" TEXT,

    CONSTRAINT "team_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "huisarts" (
    "id" SERIAL NOT NULL,
    "in_opleiding" BOOLEAN NOT NULL DEFAULT false,
    "email" TEXT NOT NULL,
    "rizivnr" TEXT NOT NULL,
    "geboortejaar" INTEGER NOT NULL,
    "stopzetten" TEXT NOT NULL,
    "team_id" INTEGER NOT NULL,
    "adres_id" INTEGER,

    CONSTRAINT "huisarts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "adres" (
    "id" SERIAL NOT NULL,
    "straat" TEXT NOT NULL,
    "huisnr" TEXT NOT NULL,
    "postcode" TEXT NOT NULL,
    "Stad" TEXT NOT NULL,
    "praktijk_id" TEXT NOT NULL,

    CONSTRAINT "adres_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vragenlijst" (
    "id" SERIAL NOT NULL,
    "naam" TEXT NOT NULL,
    "json" TEXT NOT NULL,
    "deadline" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "vragenlijst_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "survey_antwoorden" (
    "id" SERIAL NOT NULL,
    "antwoorden" TEXT NOT NULL,
    "vooruitgang" INTEGER NOT NULL,
    "vragenlijst_id" INTEGER NOT NULL,
    "praktijk_id" TEXT NOT NULL,

    CONSTRAINT "survey_antwoorden_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rapport" (
    "id" SERIAL NOT NULL,
    "titel" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "samenvatting" TEXT NOT NULL,
    "Uitleg" TEXT NOT NULL,
    "survey_antwoord_id" INTEGER NOT NULL,

    CONSTRAINT "rapport_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "praktijk_auth0_id_key" ON "praktijk"("auth0_id");

-- CreateIndex
CREATE UNIQUE INDEX "praktijk_team_id_key" ON "praktijk"("team_id");

-- AddForeignKey
ALTER TABLE "praktijk" ADD CONSTRAINT "praktijk_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "team"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "huisarts" ADD CONSTRAINT "huisarts_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "huisarts" ADD CONSTRAINT "huisarts_adres_id_fkey" FOREIGN KEY ("adres_id") REFERENCES "adres"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "adres" ADD CONSTRAINT "adres_praktijk_id_fkey" FOREIGN KEY ("praktijk_id") REFERENCES "praktijk"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "survey_antwoorden" ADD CONSTRAINT "survey_antwoorden_vragenlijst_id_fkey" FOREIGN KEY ("vragenlijst_id") REFERENCES "vragenlijst"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "survey_antwoorden" ADD CONSTRAINT "survey_antwoorden_praktijk_id_fkey" FOREIGN KEY ("praktijk_id") REFERENCES "praktijk"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rapport" ADD CONSTRAINT "rapport_survey_antwoord_id_fkey" FOREIGN KEY ("survey_antwoord_id") REFERENCES "survey_antwoorden"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
