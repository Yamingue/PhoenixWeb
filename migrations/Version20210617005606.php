<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210617005606 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE case_studies ADD case_groupe_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE case_studies ADD CONSTRAINT FK_6C0AEF3454664577 FOREIGN KEY (case_groupe_id) REFERENCES case_groupe (id)');
        $this->addSql('CREATE INDEX IDX_6C0AEF3454664577 ON case_studies (case_groupe_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE case_studies DROP FOREIGN KEY FK_6C0AEF3454664577');
        $this->addSql('DROP INDEX IDX_6C0AEF3454664577 ON case_studies');
        $this->addSql('ALTER TABLE case_studies DROP case_groupe_id');
    }
}
