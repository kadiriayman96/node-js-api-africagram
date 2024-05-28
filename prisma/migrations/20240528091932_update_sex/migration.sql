-- CreateTable
CREATE TABLE `aime` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `utilisateur_id` INTEGER NULL,
    `post_id` INTEGER NULL,
    `date_creation` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `post_id`(`post_id`),
    INDEX `utilisateur_id`(`utilisateur_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `commentaire` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `utilisateur_id` INTEGER NULL,
    `post_id` INTEGER NULL,
    `message` TEXT NULL,
    `date_creation` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `post_id`(`post_id`),
    INDEX `utilisateur_id`(`utilisateur_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `follower` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `following_id` INTEGER NULL,
    `follower_id` INTEGER NULL,
    `date_creation` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `follower_id`(`follower_id`),
    INDEX `following_id`(`following_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `post` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `utilisateur_id` INTEGER NULL,
    `caption` TEXT NULL,
    `image_url` VARCHAR(255) NULL,
    `date_creation` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `date_modification` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `utilisateur_id`(`utilisateur_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `profile` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_utilisateur` INTEGER NULL,
    `sexe` VARCHAR(255) NULL,
    `pays` VARCHAR(255) NULL,
    `ville` VARCHAR(255) NULL,
    `date_creation` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `date_modification` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `utilisateur` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_profile` INTEGER NULL,
    `firstname` VARCHAR(255) NULL,
    `lastname` VARCHAR(255) NULL,
    `email` VARCHAR(255) NULL,
    `password` VARCHAR(255) NULL,
    `isAdmin` BOOLEAN NULL,
    `date_creation` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `date_modification` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `email`(`email`),
    INDEX `id_profile`(`id_profile`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `aime` ADD CONSTRAINT `aime_ibfk_1` FOREIGN KEY (`utilisateur_id`) REFERENCES `utilisateur`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `aime` ADD CONSTRAINT `aime_ibfk_2` FOREIGN KEY (`post_id`) REFERENCES `post`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `commentaire` ADD CONSTRAINT `commentaire_ibfk_1` FOREIGN KEY (`utilisateur_id`) REFERENCES `utilisateur`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `commentaire` ADD CONSTRAINT `commentaire_ibfk_2` FOREIGN KEY (`post_id`) REFERENCES `post`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `follower` ADD CONSTRAINT `follower_ibfk_1` FOREIGN KEY (`following_id`) REFERENCES `utilisateur`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `follower` ADD CONSTRAINT `follower_ibfk_2` FOREIGN KEY (`follower_id`) REFERENCES `utilisateur`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `post` ADD CONSTRAINT `post_ibfk_1` FOREIGN KEY (`utilisateur_id`) REFERENCES `utilisateur`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `utilisateur` ADD CONSTRAINT `utilisateur_ibfk_1` FOREIGN KEY (`id_profile`) REFERENCES `profile`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
