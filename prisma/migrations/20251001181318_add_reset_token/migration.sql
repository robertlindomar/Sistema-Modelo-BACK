-- AlterTable
ALTER TABLE "Usuario" ADD COLUMN     "reset_token" VARCHAR(255),
ADD COLUMN     "reset_token_expires" TIMESTAMP(3);
