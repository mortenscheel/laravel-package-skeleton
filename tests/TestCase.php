<?php

namespace Scheel\PackagePascal\Tests;

use Orchestra\Testbench\TestCase as Orchestra;
use Scheel\PackagePascal\PackagePascalServiceProvider;

class TestCase extends Orchestra
{
    protected function getPackageProviders($app)
    {
        return [
            PackagePascalServiceProvider::class,
        ];
    }

    public function getEnvironmentSetUp($app)
    {
        config()->set('database.default', 'testing');

        /*
        $migration = include __DIR__.'/../database/migrations/create_PackagePascal_table.php.stub';
        $migration->up();
        */
    }
}
