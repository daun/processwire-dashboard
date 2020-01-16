# Configuration

## Dashboard as entry point

The dashboard can be configured to serve as the default entry point of the admin interface. In this case, users will see the dashboard after login and can return to it by clicking the ProcessWire logo. The page list can then only be accessed by clicking the `Pages` menu item.

To use the dashboard as entry point, you need to edit the `Admin` page (ID `2`) and manually assign the process `Dashboard`. Make sure to restore it to `ProcessHome` in case you decide to uninstall the dashboard module.

## Remove dashboard from main navigation

When using the dashboard as entry point, you might want to also hide the created `Dashboard` page in the main navigation. Simply edit the page in the admin and set the `hidden` status.

## Display panel icons

Panel icons are hidden by default to achieve a clean look across the whole dashboard. If you want to display icons in panel headers, hook into the `getSettings` method and set the `displayIcons` switch.

```php
wire()->addHookAfter('Dashboard::getSettings', function ($event) {
  $event->return->displayIcons = true;
});
```

## Default panel size

The default panel size can be changed from `normal` to whatever size makes sense for your dashboard. Again, hook into `getSettings` to set the `defaultPanelSize` key.

```php
wire()->addHookAfter('Dashboard::getSettings', function ($event) {
  $event->return->defaultPanelSize = 'full';
});
```

## Customize the headline

Use the `getHeadline` hook to set the main headline or hide it by returning an empty string.

```php
wire()->addHookAfter('Dashboard::getHeadline', function ($event) {
  $event->return = 'Instrumententafel';
});
```
