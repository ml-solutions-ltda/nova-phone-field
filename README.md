# A global Phone Number field for Laravel Nova

[![Latest Version](https://img.shields.io/github/release/ml-solutions-ltda/nova-phone-field?style=flat-square)](https://github.com/ml-solutions-ltda/nova-phone-field/releases)
[![Total Downloads](https://img.shields.io/packagist/dt/mlsolutions/nova-phone-field?style=flat-square)](https://packagist.org/packages/mlsolutions/nova-phone-field)

Nova Phone Number field with a dynamic mask based on the country code inserted by the user.

Fork from [bissolli/nova-phone-field](https://github.com/bissolli/nova-phone-field) to maintain package.

![screenshot of the phone field](https://raw.githubusercontent.com/MlSolutions/nova-phone-field/main/screenshot.gif)

## Requirements

- PHP **8.3+**
- Laravel Nova **5.0+**
- Laravel Framework **11.0+**

**NOTE**: For Laravel version < 8.0 or Nova < 4 use [bissolli/nova-phone-field](https://github.com/bissolli/nova-phone-field).

## Installation

You can install this package into a Laravel app that uses [Nova](https://nova.laravel.com) via composer:

```bash
composer require mlsolutions/nova-phone-field
```

## Usage

Go straight to your Nova resource and use `MlSolutions\NovaPhoneField\PhoneNumber` field:

```php
namespace App\Nova;

use MlSolutions\NovaPhoneField\PhoneNumber;

class Member extends Resource
{
    // ...
    
    public function fields(Request $request)
    {
        return [
            // ...
            
            PhoneNumber::make('Phone Number'),

            // ...
        ];
    }
}
```

Now you can view and add tags on the blog posts screen in your Nova app. All tags will be saved in the `tags` table. 

### Filtering

By default, every country mask available inside `ml-solutions-ltda/nova-phone-field/resources/js/data/phone-masks.json` will be loaded and working. However, you can always select the desired countries calling the `onlyCountries()` method.

```php
PhoneNumber::make('Phone Number')
    ->onlyCountries('BR', 'US', 'IE'),
```

### Custom number format

You can also add custom phone formats with `withCustomFormats()`.

```php
PhoneNumber::make('Phone Number')
    ->withCustomFormats('+123 ## #.#', '+123 ## ####.####'),
```

Or else use only your own phone formats calling for `withCustomFormats()` among with `onlyCustomFormats()`.

```php
PhoneNumber::make('Phone Number')
    ->withCustomFormats('+123 ## #.#', '+123 ## ####.####')
    ->onlyCustomFormats(),
```

## Migrate from 1.0.x

In 2.0 values are now stored in [E.164 format](https://en.wikipedia.org/wiki/E.164). Previously, the formatted value was stored, which later caused problems for usage.

With the E.164 format, you can use the phone number directly. We use [libphonenumber-js](https://www.npmjs.com/package/libphonenumber-js) to format it on the Index and Detail of your resources.

To replace previously saved values you can use this query :

```sql
UPDATE _table_ SET _field_=CONCAT('+', REGEXP_REPLACE(_field_, '\\D', ''))
``` 

## Changelog

Please see [CHANGELOG](CHANGELOG.md) for more information on what has changed recently.

## Contributing

Please see [CONTRIBUTING](CONTRIBUTING.md) for details.

### Security

If you've found a bug regarding security please mail [contact@ml-solutions-ltda.fr](mailto:contact@ml-solutions-ltda.fr) instead of using the issue tracker.

## Credits

- [James Hemery](https://github.com/jameshemery)
- [Gustavo Bissolli](https://github.com/bissolli)
- Special thanks to [Robin Herbots](https://github.com/RobinHerbots) who built one of the best [InputMask](https://github.com/RobinHerbots/Inputmask) from the internet.

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.
