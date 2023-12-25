# :package_name

[![Latest Version on Packagist](https://img.shields.io/packagist/v/mortenscheel/:package_slug.svg?style=flat-square)](https://packagist.org/packages/mortenscheel/:package_slug)
[![GitHub Tests Action Status](https://img.shields.io/github/actions/workflow/status/mortenscheel/:package_slug/run-tests.yml?branch=main&label=tests&style=flat-square)](https://github.com/mortenscheel/:package_slug/actions?query=workflow%3Arun-tests+branch%3Amain)
[![GitHub Code Style Action Status](https://img.shields.io/github/actions/workflow/status/mortenscheel/:package_slug/fix-php-code-style-issues.yml?branch=main&label=code%20style&style=flat-square)](https://github.com/mortenscheel/:package_slug/actions?query=workflow%3A"Fix+PHP+code+style+issues"+branch%3Amain)
[![Total Downloads](https://img.shields.io/packagist/dt/mortenscheel/:package_slug.svg?style=flat-square)](https://packagist.org/packages/mortenscheel/:package_slug)

This is where your description should go. Limit it to a paragraph or two. Consider adding a small example.

## Installation

You can install the package via composer:

```bash
composer require mortenscheel/:package_slug
```

You can publish and run the migrations with:

```bash
php artisan vendor:publish --tag=":package_slug.migrations"
php artisan migrate
```

You can publish the config file with:

```bash
php artisan vendor:publish --tag=":package_slug.config"
```

This is the contents of the published config file:

```php
return [
];
```

Optionally, you can publish the views using

```bash
php artisan vendor:publish --tag=":package_slug.views"
```

Optionally, you can publish the assets using

```bash
php artisan vendor:publish --tag=":package_slug.assets"
```

Optionally, you can publish the translations using

```bash
php artisan vendor:publish --tag=":package_slug.lang"
```

## Usage

```php
// Usage examples
```

## Testing

```bash
composer test
```

## Changelog

Please see [CHANGELOG](CHANGELOG.md) for more information on what has changed recently.

## Contributing

Please see [CONTRIBUTING](CONTRIBUTING.md) for details.

## Security Vulnerabilities

Please review [our security policy](../../security/policy) on how to report security vulnerabilities.

## Credits

-   [:author_name](https://github.com/:author_username)
-   [All Contributors](../../contributors)

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.
