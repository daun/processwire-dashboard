<?php

declare(strict_types=1);

use Rector\Config\RectorConfig;

return RectorConfig::configure()
    ->withPaths([__DIR__])
    ->withSkip([__DIR__ . '/vendor'])
    ->withPhpSets(php83: true)
    ->withRules([
        // TypedPropertyFromStrictConstructorRector::class
    ])
    // here we can define, what prepared sets of rules will be applied
    ->withPreparedSets(
        // deadCode: true,
        // codeQuality: true
    );
