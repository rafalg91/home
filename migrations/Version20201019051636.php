<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20201019051636 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE access (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE log (id INT AUTO_INCREMENT NOT NULL, worker_id INT NOT NULL, access_id INT NOT NULL, status TINYINT(1) NOT NULL, date DATE NOT NULL, INDEX IDX_8F3F68C56B20BA36 (worker_id), INDEX IDX_8F3F68C54FEA67CF (access_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE skill (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE worker (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, surname VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE worker_skill (worker_id INT NOT NULL, skill_id INT NOT NULL, INDEX IDX_429A40A36B20BA36 (worker_id), INDEX IDX_429A40A35585C142 (skill_id), PRIMARY KEY(worker_id, skill_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE worker_access (worker_id INT NOT NULL, access_id INT NOT NULL, INDEX IDX_87CB9A3D6B20BA36 (worker_id), INDEX IDX_87CB9A3D4FEA67CF (access_id), PRIMARY KEY(worker_id, access_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE log ADD CONSTRAINT FK_8F3F68C56B20BA36 FOREIGN KEY (worker_id) REFERENCES worker (id)');
        $this->addSql('ALTER TABLE log ADD CONSTRAINT FK_8F3F68C54FEA67CF FOREIGN KEY (access_id) REFERENCES access (id)');
        $this->addSql('ALTER TABLE worker_skill ADD CONSTRAINT FK_429A40A36B20BA36 FOREIGN KEY (worker_id) REFERENCES worker (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE worker_skill ADD CONSTRAINT FK_429A40A35585C142 FOREIGN KEY (skill_id) REFERENCES skill (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE worker_access ADD CONSTRAINT FK_87CB9A3D6B20BA36 FOREIGN KEY (worker_id) REFERENCES worker (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE worker_access ADD CONSTRAINT FK_87CB9A3D4FEA67CF FOREIGN KEY (access_id) REFERENCES access (id) ON DELETE CASCADE');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE log DROP FOREIGN KEY FK_8F3F68C54FEA67CF');
        $this->addSql('ALTER TABLE worker_access DROP FOREIGN KEY FK_87CB9A3D4FEA67CF');
        $this->addSql('ALTER TABLE worker_skill DROP FOREIGN KEY FK_429A40A35585C142');
        $this->addSql('ALTER TABLE log DROP FOREIGN KEY FK_8F3F68C56B20BA36');
        $this->addSql('ALTER TABLE worker_skill DROP FOREIGN KEY FK_429A40A36B20BA36');
        $this->addSql('ALTER TABLE worker_access DROP FOREIGN KEY FK_87CB9A3D6B20BA36');
        $this->addSql('DROP TABLE access');
        $this->addSql('DROP TABLE log');
        $this->addSql('DROP TABLE skill');
        $this->addSql('DROP TABLE worker');
        $this->addSql('DROP TABLE worker_skill');
        $this->addSql('DROP TABLE worker_access');
    }
}
