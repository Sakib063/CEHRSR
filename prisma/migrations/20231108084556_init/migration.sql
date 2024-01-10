-- CreateTable
CREATE TABLE `patient` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `patientid` INTEGER NOT NULL,
    `doctorid` INTEGER NOT NULL,
    `phone` VARCHAR(100) NOT NULL,
    `ehrid` INTEGER NOT NULL,
    `test` INTEGER NOT NULL,
    `date` INTEGER NOT NULL,
    `observation` INTEGER NOT NULL,
    `doctorname` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
