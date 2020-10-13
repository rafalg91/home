<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20201013184515 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE log ADD access_id INT NOT NULL');
        $this->addSql('ALTER TABLE log ADD CONSTRAINT FK_8F3F68C54FEA67CF FOREIGN KEY (access_id) REFERENCES access (id)');
        $this->addSql('CREATE INDEX IDX_8F3F68C54FEA67CF ON log (access_id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE log DROP FOREIGN KEY FK_8F3F68C54FEA67CF');
        $this->addSql('DROP INDEX IDX_8F3F68C54FEA67CF ON log');
        $this->addSql('ALTER TABLE log DROP access_id');
    }
}
