<?php

namespace Solspace\Calendar\migrations;

use craft\db\Migration;
use craft\db\Query;
use Solspace\Calendar\FieldTypes\EventFieldType;
use Solspace\Commons\Migrations\ForeignKey;
use Solspace\Commons\Migrations\Table;

/**
 * m180316_130028_Craft3Upgrade migration.
 */
class m180316_130028_Craft3Upgrade extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp(): bool
    {
        $calendar = (new Query())
            ->select(['id', 'version'])
            ->from('{{%plugins}}')
            ->where([
                'handle' => 'calendar',
            ])
            ->one()
        ;

        if (!$calendar) {
            return true;
        }

        $version = $calendar['version'];

        // Only touch version below the 2.0
        if (version_compare($version, '2.0.0-dev', '>=')) {
            return true;
        }

        $this->update(
            '{{%fields}}',
            ['type' => EventFieldType::class],
            ['type' => 'Calendar_Event'],
            [],
            false
        );

        $table = (new Table('calendar_calendar_sites'))
            ->addField('id', $this->primaryKey())
            ->addField('calendarId', $this->integer())
            ->addField('siteId', $this->integer())
            ->addField('enabledByDefault', $this->boolean()->defaultValue(true))
            ->addField('hasUrls', $this->boolean()->defaultValue(false))
            ->addField('uriFormat', $this->string())
            ->addField('template', $this->string())
            ->addForeignKey('siteId', 'sites', 'id', ForeignKey::CASCADE)
            ->addForeignKey('calendarId', 'calendar_calendars', 'id', ForeignKey::CASCADE)
            ->addIndex(['calendarId', 'siteId'], true)
            ->addField('dateCreated', $this->dateTime()->notNull())
            ->addField('dateUpdated', $this->dateTime()->notNull())
            ->addField('uid', $this->uid())
        ;

        $this->createTable($table->getDatabaseName(), $table->getFieldArray(), $table->getOptions());

        foreach ($table->getIndexes() as $index) {
            $this->createIndex(
                $index->getName(),
                $table->getDatabaseName(),
                $index->getColumns(),
                $index->isUnique()
            );
        }

        foreach ($table->getForeignKeys() as $foreignKey) {
            $this->addForeignKey(
                $foreignKey->getName(),
                $table->getDatabaseName(),
                $foreignKey->getColumn(),
                $foreignKey->getDatabaseReferenceTableName(),
                $foreignKey->getReferenceColumn(),
                $foreignKey->getOnDelete(),
                $foreignKey->getOnUpdate()
            );
        }

        $calTable = '{{%calendar_calendars}}';

        if ($this->db->tableExists('{{%calendar_calendars_i18n}}')) {
            $calI18nTable = '{{%calendar_calendars_i18n}}';
            $i18nResults = (new Query())
                ->select(
                    [
                        $calI18nTable.'.id',
                        $calI18nTable.'.calendarId',
                        $calI18nTable.'.locale__siteId',
                        $calI18nTable.'.enabledByDefault',
                        $calI18nTable.'.eventUrlFormat',
                        $calTable.'.hasUrls',
                        $calTable.'.eventTemplate',
                    ]
                )
                ->from($calI18nTable)
                ->innerJoin($calTable, '{{%calendar_calendars}}.id = {{%calendar_calendars_i18n}}.calendarId')
                ->all()
            ;

            foreach ($i18nResults as $i18n) {
                $this->insert(
                    '{{%calendar_calendar_sites}}',
                    [
                        'calendarId' => $i18n['calendarId'],
                        'siteId' => $i18n['locale__siteId'],
                        'enabledByDefault' => $i18n['enabledByDefault'],
                        'hasUrls' => $i18n['hasUrls'],
                        'uriFormat' => $i18n['eventUrlFormat'],
                        'template' => $i18n['eventTemplate'],
                    ]
                );
            }

            $this->dropTable($calI18nTable);
        }

        if ($this->db->columnExists($calTable, 'hasUrls')) {
            $this->dropColumn($calTable, 'hasUrls');
        }

        if ($this->db->columnExists($calTable, 'eventTemplate')) {
            $this->dropColumn($calTable, 'eventTemplate');
        }
        
        if (!$this->db->columnExists($calTable, 'color')) {
            $this->addColumn(
                $calTable,
                'color',
                $this->string(10)->notNull()
            );
        }

        if (!$this->db->columnExists($calTable, 'fieldLayoutId')) {
            $this->addColumn(
                $calTable,
                'fieldLayoutId',
                $this->integer()
            );
            $this->addForeignKey(null, $calTable, 'fieldLayoutId', 'fieldlayouts', 'id', ForeignKey::SET_NULL);
        }

        if (!$this->db->columnExists($calTable, 'titleFormat')) {
            $this->addColumn(
                $calTable,
                'titleFormat',
                $this->string()
            );
        }

        if (!$this->db->columnExists($calTable, 'titleLabel')) {
            $this->addColumn(
                $calTable,
                'titleLabel',
                $this->string()->defaultValue('Title')
            );
        }

        if (!$this->db->columnExists($calTable, 'hasTitleField')) {
            $this->addColumn(
                $calTable,
                'hasTitleField',
                $this->boolean()->notNull()->defaultValue(true)
            );
        }

        if (!$this->db->columnExists($calTable, 'descriptionFieldHandle')) {
            $this->addColumn(
                $calTable,
                'descriptionFieldHandle',
                $this->string()
            );
        }

        if (!$this->db->columnExists($calTable, 'locationFieldHandle')) {
            $this->addColumn(
                $calTable,
                'locationFieldHandle',
                $this->string()
            );
        }

        if (!$this->db->columnExists($calTable, 'icsHash')) {
            $this->addColumn(
                $calTable,
                'icsHash',
                $this->string()
            );

            $this->createIndex(null, $calTable, ['icsHash'], true);
        }

        return true;
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown(): bool
    {
        return true;
    }
}
