<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20201013185300 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE worker_access (worker_id INT NOT NULL, access_id INT NOT NULL, INDEX IDX_87CB9A3D6B20BA36 (worker_id), INDEX IDX_87CB9A3D4FEA67CF (access_id), PRIMARY KEY(worker_id, access_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE worker_access ADD CONSTRAINT FK_87CB9A3D6B20BA36 FOREIGN KEY (worker_id) REFERENCES worker (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE worker_access ADD CONSTRAINT FK_87CB9A3D4FEA67CF FOREIGN KEY (access_id) REFERENCES access (id) ON DELETE CASCADE');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP TABLE worker_access');
    }
}
