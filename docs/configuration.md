# Configuration

## Dashboard as entry point

The dashboard can be configured to serve as the default entry point of the admin interface. In this case, users will see the dashboard after login and can return to it by clicking the ProcessWire logo. The page list can then only be accessed by clicking the `Pages` menu item.

To use the dashboard as entry point, you need to edit the `Admin` page (ID `2`) and manually assign the process `Dashboard`. Make sure to restore it to `ProcessHome` in case you decide to uninstall the dashboard module.

## Enable Panel Icons

Panel icons are hidden by default to achieve a clean look across the whole dashboard. If you want to display icons in panel headers, hook into the `getSettings` method and set the `displayIcons` switch.

```php
wire()->addHookAfter('Dashboard::getSettings', function ($event) {
    $settings = $event->return;
    $settings->displayIcons = true;
});
```

## Customize the Headline

Use the `getHeadline` hook to set the main headline or hide it by returning an empty string.

```php
wire()->addHookAfter('Dashboard::getHeadline', function ($event) {
  $event->return = 'Instrumententafel';
});
```
