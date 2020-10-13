<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20201013184127 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE log ADD worker_id INT NOT NULL');
        $this->addSql('ALTER TABLE log ADD CONSTRAINT FK_8F3F68C56B20BA36 FOREIGN KEY (worker_id) REFERENCES worker (id)');
        $this->addSql('CREATE INDEX IDX_8F3F68C56B20BA36 ON log (worker_id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE log DROP FOREIGN KEY FK_8F3F68C56B20BA36');
        $this->addSql('DROP INDEX IDX_8F3F68C56B20BA36 ON log');
        $this->addSql('ALTER TABLE log DROP worker_id');
    }
}
