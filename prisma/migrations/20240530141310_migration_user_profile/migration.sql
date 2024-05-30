/*
  Warnings:

  - You are about to drop the column `id_profile` on the `utilisateur` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id_utilisateur]` on the table `profile` will be added. If there are existing duplicate values, this will fail.
  - Made the column `id_utilisateur` on table `profile` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `aime` DROP FOREIGN KEY `aime_ibfk_1`;

-- DropForeignKey
ALTER TABLE `aime` DROP FOREIGN KEY `aime_ibfk_2`;

-- DropForeignKey
ALTER TABLE `commentaire` DROP FOREIGN KEY `commentaire_ibfk_1`;

-- DropForeignKey
ALTER TABLE `commentaire` DROP FOREIGN KEY `commentaire_ibfk_2`;

-- DropForeignKey
ALTER TABLE `follower` DROP FOREIGN KEY `follower_ibfk_1`;

-- DropForeignKey
ALTER TABLE `follower` DROP FOREIGN KEY `follower_ibfk_2`;

-- DropForeignKey
ALTER TABLE `post` DROP FOREIGN KEY `post_ibfk_1`;

-- DropForeignKey
ALTER TABLE `utilisateur` DROP FOREIGN KEY `utilisateur_ibfk_1`;

-- AlterTable
ALTER TABLE `profile` MODIFY `id_utilisateur` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `utilisateur` DROP COLUMN `id_profile`;

-- CreateIndex
CREATE UNIQUE INDEX `profile_id_utilisateur_key` ON `profile`(`id_utilisateur`);

-- AddForeignKey
ALTER TABLE `aime` ADD CONSTRAINT `aime_utilisateur_id_fkey` FOREIGN KEY (`utilisateur_id`) REFERENCES `utilisateur`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `aime` ADD CONSTRAINT `aime_post_id_fkey` FOREIGN KEY (`post_id`) REFERENCES `post`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `commentaire` ADD CONSTRAINT `commentaire_utilisateur_id_fkey` FOREIGN KEY (`utilisateur_id`) REFERENCES `utilisateur`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `commentaire` ADD CONSTRAINT `commentaire_post_id_fkey` FOREIGN KEY (`post_id`) REFERENCES `post`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `follower` ADD CONSTRAINT `follower_following_id_fkey` FOREIGN KEY (`following_id`) REFERENCES `utilisateur`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `follower` ADD CONSTRAINT `follower_follower_id_fkey` FOREIGN KEY (`follower_id`) REFERENCES `utilisateur`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `post` ADD CONSTRAINT `post_utilisateur_id_fkey` FOREIGN KEY (`utilisateur_id`) REFERENCES `utilisateur`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `profile` ADD CONSTRAINT `profile_id_utilisateur_fkey` FOREIGN KEY (`id_utilisateur`) REFERENCES `utilisateur`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- RenameIndex
ALTER TABLE `aime` RENAME INDEX `post_id` TO `aime_post_id_idx`;

-- RenameIndex
ALTER TABLE `aime` RENAME INDEX `utilisateur_id` TO `aime_utilisateur_id_idx`;

-- RenameIndex
ALTER TABLE `commentaire` RENAME INDEX `post_id` TO `commentaire_post_id_idx`;

-- RenameIndex
ALTER TABLE `commentaire` RENAME INDEX `utilisateur_id` TO `commentaire_utilisateur_id_idx`;

-- RenameIndex
ALTER TABLE `follower` RENAME INDEX `follower_id` TO `follower_follower_id_idx`;

-- RenameIndex
ALTER TABLE `follower` RENAME INDEX `following_id` TO `follower_following_id_idx`;

-- RenameIndex
ALTER TABLE `post` RENAME INDEX `utilisateur_id` TO `post_utilisateur_id_idx`;

-- RenameIndex
ALTER TABLE `utilisateur` RENAME INDEX `email` TO `utilisateur_email_key`;
