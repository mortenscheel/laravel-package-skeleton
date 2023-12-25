<?php

namespace Scheel\PackagePascal\Facades;

use Illuminate\Support\Facades\Facade;

/**
 * @see \Scheel\PackagePascal\PackagePascal
 */
class PackagePascal extends Facade
{
    protected static function getFacadeAccessor()
    {
        return \Scheel\PackagePascal\PackagePascal::class;
    }
}
