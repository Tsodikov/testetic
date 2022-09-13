-- CreateEnum
CREATE TYPE "Roles" AS ENUM ('ADMIN', 'CREATOR', 'END_USER');

-- CreateTable
CREATE TABLE "OrganizationModel" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "stste" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "adress" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "webSite" TEXT NOT NULL,
    "backgroundImage" TEXT NOT NULL,
    "logo" TEXT NOT NULL,
    "typeOrganization" TEXT NOT NULL,
    "specialUserId" INTEGER NOT NULL,

    CONSTRAINT "OrganizationModel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserModel" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT false,
    "role" "Roles" NOT NULL DEFAULT 'ADMIN',
    "testModelId" INTEGER[],
    "organizationModelId" INTEGER NOT NULL,

    CONSTRAINT "UserModel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChapterModel" (
    "id" SERIAL NOT NULL,
    "chapterTitle" TEXT NOT NULL,
    "chapterDescription" TEXT NOT NULL,
    "dateOfCreate" TEXT NOT NULL,
    "qtnTests" INTEGER NOT NULL,
    "userModelId" INTEGER NOT NULL,
    "userModelName" TEXT NOT NULL,
    "organizationId" INTEGER NOT NULL,

    CONSTRAINT "ChapterModel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TestModel" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "dateOfCreate" TEXT NOT NULL,
    "qtnOfQuestion" INTEGER NOT NULL,
    "qtnUsers" INTEGER NOT NULL,
    "readyToUse" BOOLEAN NOT NULL,
    "chapterModelId" INTEGER NOT NULL,
    "chapterModelTitle" TEXT NOT NULL,
    "userModelId" INTEGER NOT NULL,
    "userModelName" TEXT NOT NULL,

    CONSTRAINT "TestModel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuestionModel" (
    "id" SERIAL NOT NULL,
    "questionText" TEXT NOT NULL,
    "testModelId" INTEGER NOT NULL,

    CONSTRAINT "QuestionModel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MediaFileModel" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "lastModified" INTEGER NOT NULL,
    "lastModifiedDate" TEXT NOT NULL,
    "webkitRelativePath" TEXT NOT NULL,
    "questionModelId" INTEGER NOT NULL,

    CONSTRAINT "MediaFileModel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AnswerModel" (
    "id" SERIAL NOT NULL,
    "textAnswer" TEXT NOT NULL,
    "answerRight" BOOLEAN NOT NULL,
    "questionModelId" INTEGER NOT NULL,

    CONSTRAINT "AnswerModel_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "OrganizationModel_name_key" ON "OrganizationModel"("name");

-- CreateIndex
CREATE UNIQUE INDEX "OrganizationModel_id_key" ON "OrganizationModel"("id");

-- CreateIndex
CREATE UNIQUE INDEX "UserModel_email_key" ON "UserModel"("email");

-- CreateIndex
CREATE UNIQUE INDEX "UserModel_id_key" ON "UserModel"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ChapterModel_id_key" ON "ChapterModel"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ChapterModel_chapterTitle_key" ON "ChapterModel"("chapterTitle");

-- CreateIndex
CREATE UNIQUE INDEX "ChapterModel_id_chapterTitle_key" ON "ChapterModel"("id", "chapterTitle");

-- CreateIndex
CREATE UNIQUE INDEX "TestModel_id_key" ON "TestModel"("id");

-- CreateIndex
CREATE UNIQUE INDEX "QuestionModel_id_key" ON "QuestionModel"("id");

-- CreateIndex
CREATE UNIQUE INDEX "MediaFileModel_id_key" ON "MediaFileModel"("id");

-- CreateIndex
CREATE UNIQUE INDEX "AnswerModel_id_key" ON "AnswerModel"("id");

-- AddForeignKey
ALTER TABLE "UserModel" ADD CONSTRAINT "UserModel_organizationModelId_fkey" FOREIGN KEY ("organizationModelId") REFERENCES "OrganizationModel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChapterModel" ADD CONSTRAINT "ChapterModel_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "OrganizationModel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChapterModel" ADD CONSTRAINT "ChapterModel_userModelId_fkey" FOREIGN KEY ("userModelId") REFERENCES "UserModel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestModel" ADD CONSTRAINT "TestModel_userModelId_fkey" FOREIGN KEY ("userModelId") REFERENCES "UserModel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestModel" ADD CONSTRAINT "TestModel_chapterModelId_chapterModelTitle_fkey" FOREIGN KEY ("chapterModelId", "chapterModelTitle") REFERENCES "ChapterModel"("id", "chapterTitle") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionModel" ADD CONSTRAINT "QuestionModel_testModelId_fkey" FOREIGN KEY ("testModelId") REFERENCES "TestModel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MediaFileModel" ADD CONSTRAINT "MediaFileModel_questionModelId_fkey" FOREIGN KEY ("questionModelId") REFERENCES "QuestionModel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnswerModel" ADD CONSTRAINT "AnswerModel_questionModelId_fkey" FOREIGN KEY ("questionModelId") REFERENCES "QuestionModel"("id") ON DELETE CASCADE ON UPDATE CASCADE;
