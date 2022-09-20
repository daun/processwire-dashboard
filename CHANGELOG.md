# Changelog

## [Unreleased]

## [1.5.2] - 2022-09-20

- Fix notice when adding shortcut URLs as strings

## [1.5.1] - 2022-09-03

- Confirm before trashing pages in collection panel
- Avoid overflowing shortcut titles
- Add default color variables for third-party plugins

## [1.5.0] - 2022-09-02

- Add new panel size micro (@netcarver)
- Allow publishing & hiding pages in collection panel by using special column names

## [1.4.2] - 2022-05-20

- Fix invisible icons by checking for supported icons

## [1.4.1] - 2022-05-18

- Fix invisible icons in collection panel

## [1.4.0] - 2022-05-15

- Display pagination links in collection panel

## [1.3.0] - 2022-05-13

- Allow setting browser title separately from headline
- Display optional empty-result placeholder in collection panel
- Add ability to trash pages from collection panel
- Allow custom order of actions in collection panel
- Open external links in shortcut panel in new tab
- Allow passing post params when reloading panels

## [1.2.1] - 2022-01-30

- Display details in empty number panels

## [1.2.0] - 2021-10-14

- Allow grouping panels in tabs
- Make add-new button fill available width

## [1.1.1] - 2021-09-24

- Verify ajax requests to avoid errors with Tracy debug bar

## [1.1.0] - 2021-09-12

- Use CSS variables to allow style customization
- Update to parcel v2 for asset bundling
- Fix error when parsing server locale for number formatting

## [1.0.3] - 2021-01-13

- Improve compatibility on multisite installations
- Fix overflowing panel content
- Fix stylesheets not getting picked up

## [1.0.2] - 2020-12-20

- Fix outdated module version

## [1.0.1] - 2020-12-17

- Fix notice for missing trend parameter

## [1.0.0] - 2020-12-13

- **Require minimum PW version 3.0.165**
- Add new panel type: Add New Page
- Move module into private namespace

## [0.7.3] - 2020-08-07

- PageList panel: allow adding new pages in modal
- Fix clipped drop shadow of panels nested in groups

## [0.7.2] - 2020-08-07

- Fix error when using markup strings in collection field names

## [0.7.1] - 2020-08-05

- Remove unintended session message in collections panel

## [0.7.0] - 2020-08-02

- Set sane table header defaults in collection panels
- Add option to hide shortcut summaries
- Fix undefined indexes when destructuring shortcuts

## [0.6.9] - 2020-01-31

- Fix missing version number in module directory
- Improve documentation of panel parameters
- Code quality improvements

## [0.6.8] - 2020-01-20

- Enable module installation via ZIP download in admin interface

## [0.6.7] - 2020-01-18

- Allow setting HTML attributes of panel elements
- Set `data-file` attribute on `template` panels to simplify CSS namespacing
- Auto-include associated CSS & JS files of `template` panels
- Allow event handlers to cancel panel reload
- Intercept `chart` panel reloads and update canvas manually

## [0.6.6] - 2020-01-17

- Fix error in case of undefined Uikit helper
- Fix notice in case of undefined URL parts
- Re-enable default theme tooltips
- Fix multi-language display of links
- Use DOM events to trigger panel reloads

## [0.6.5] - 2020-01-15

- Add dashboard page to user dropdown navigation

## [0.6.4] - 2020-01-15

- Support multiple `page-list` panels per dashboard
- Add option to open `page-list` links in modal or new tab

## [0.6.3] - 2020-01-15

- Simplify overwriting the default panel size
- Add CSS & JS to hello-world module implementation
- Fix missing modal scripts

## [0.6.2] - 2020-01-14

- Allow adding multiple items at once via `$panels->add()`

## [0.6.1] - 2020-01-14

- Allow importing multiple items at once via `$panels->import()`

## [0.6.0] - 2020-01-14

- Animate panel refresh
- Re-init tooltips after panel refresh
- Add support for modals in collection panels

## [0.5.1] - 2020-01-14

- Fix closing canvas tag
- Use compass as module icon

## [0.5.0] - 2020-01-10

- Implement AJAX auto-refresh for panels
- Set default chart color theme via hook

## [0.4.14] - 2020-01-08

- Use asset bundler to transpile and minify JS & CSS
- Improve horizontal padding of PageList panel

## [0.4.13] - 2020-01-06

- Fix color column output formatting
- Disable word wrap in action column
- Allow disabling access checks in shortcuts panel
- Implement fallback number formatter

## [0.4.12] - 2020-01-06

- Allow setting vertical alignment per panel
- Add helpers for rendering footer buttons

Chart panel improvements:

- Color themes
- Default styles for donut charts
- Aspect ratio placeholder while chart is loading

## [0.4.11] - 2020-01-06

- Display shortcut summaries as tooltips
- Add list view for shortcuts panel

## [0.4.10] - 2020-01-06

- Allow custom icons per shortcut
- Hide sort buttons in actions column
- Improve table display
- Make default panel size hookable

## [0.4.9] - 2020-01-04

- Add PHP & ProcessWire version constraints
- Add create/view buttons to collection panel
- Add support for color picker columns in collection panel
- Add panel size: mini (one quarter)
- Fix empty user label

## [0.4.8] - 2020-01-04

- Improve table and page list display in default admin theme
- Fix trailing comma when username is empty
- Support pages and selectors as page list parent

## [0.4.7] - 2020-01-04

- Enable display of panel icons

## [0.4.6] - 2020-01-03

- Remember bumping versions

## [0.4.5] - 2020-01-03

- Support image columns in collection panel
- Support icons as collection column headers

## [0.4.4] - 2020-01-03

- Fix regression introduced in previous release

## [0.4.3] - 2020-01-03

- Fix assets auto-loading in frontend

## [0.4.2] - 2020-01-03

- Add support for AdminThemeDefault
- Add code examples in readme
- Allow URLs in shortcut list

## [0.4.1] - 2020-01-03

- AdminThemeReno support
- Set chart library defaults
- Make chart data manipulation hookable

## [0.4.0] - 2020-01-03

- Allow nesting of panels in groups

## [0.3.0] - 2020-01-02

- Initial public release

[Unreleased]: https://github.com/daun/processwire-dashboard/compare/v1.5.2...HEAD

[1.5.2]: https://github.com/daun/processwire-dashboard/releases/tag/v1.5.2
[1.5.1]: https://github.com/daun/processwire-dashboard/releases/tag/v1.5.1
[1.5.0]: https://github.com/daun/processwire-dashboard/releases/tag/v1.5.0
[1.4.2]: https://github.com/daun/processwire-dashboard/releases/tag/v1.4.2
[1.4.1]: https://github.com/daun/processwire-dashboard/releases/tag/v1.4.1
[1.4.0]: https://github.com/daun/processwire-dashboard/releases/tag/v1.4.0
[1.3.0]: https://github.com/daun/processwire-dashboard/releases/tag/v1.3.0
[1.2.1]: https://github.com/daun/processwire-dashboard/releases/tag/v1.2.1
[1.2.0]: https://github.com/daun/processwire-dashboard/releases/tag/v1.2.0
[1.1.1]: https://github.com/daun/processwire-dashboard/releases/tag/v1.1.1
[1.1.0]: https://github.com/daun/processwire-dashboard/releases/tag/v1.1.0
[1.0.3]: https://github.com/daun/processwire-dashboard/releases/tag/v1.0.3
[1.0.2]: https://github.com/daun/processwire-dashboard/releases/tag/v1.0.2
[1.0.1]: https://github.com/daun/processwire-dashboard/releases/tag/v1.0.1
[1.0.0]: https://github.com/daun/processwire-dashboard/releases/tag/v1.0.0
[0.7.3]: https://github.com/daun/processwire-dashboard/releases/tag/v0.7.3
[0.7.2]: https://github.com/daun/processwire-dashboard/releases/tag/v0.7.2
[0.7.1]: https://github.com/daun/processwire-dashboard/releases/tag/v0.7.1
[0.7.0]: https://github.com/daun/processwire-dashboard/releases/tag/v0.7.0
[0.6.9]: https://github.com/daun/processwire-dashboard/releases/tag/v0.6.9
[0.6.8]: https://github.com/daun/processwire-dashboard/releases/tag/v0.6.8
[0.6.7]: https://github.com/daun/processwire-dashboard/releases/tag/v0.6.7
[0.6.6]: https://github.com/daun/processwire-dashboard/releases/tag/v0.6.6
[0.6.5]: https://github.com/daun/processwire-dashboard/releases/tag/v0.6.5
[0.6.4]: https://github.com/daun/processwire-dashboard/releases/tag/v0.6.4
[0.6.3]: https://github.com/daun/processwire-dashboard/releases/tag/v0.6.3
[0.6.2]: https://github.com/daun/processwire-dashboard/releases/tag/v0.6.2
[0.6.1]: https://github.com/daun/processwire-dashboard/releases/tag/v0.6.1
[0.6.0]: https://github.com/daun/processwire-dashboard/releases/tag/v0.6.0
[0.5.1]: https://github.com/daun/processwire-dashboard/releases/tag/v0.5.1
[0.5.0]: https://github.com/daun/processwire-dashboard/releases/tag/v0.5.0
[0.4.14]: https://github.com/daun/processwire-dashboard/releases/tag/v0.4.14
[0.4.13]: https://github.com/daun/processwire-dashboard/releases/tag/v0.4.13
[0.4.12]: https://github.com/daun/processwire-dashboard/releases/tag/v0.4.12
[0.4.11]: https://github.com/daun/processwire-dashboard/releases/tag/v0.4.11
[0.4.10]: https://github.com/daun/processwire-dashboard/releases/tag/v0.4.10
[0.4.9]: https://github.com/daun/processwire-dashboard/releases/tag/v0.4.9
[0.4.8]: https://github.com/daun/processwire-dashboard/releases/tag/v0.4.8
[0.4.7]: https://github.com/daun/processwire-dashboard/releases/tag/v0.4.7
[0.4.6]: https://github.com/daun/processwire-dashboard/releases/tag/v0.4.6
[0.4.5]: https://github.com/daun/processwire-dashboard/releases/tag/v0.4.5
[0.4.4]: https://github.com/daun/processwire-dashboard/releases/tag/v0.4.4
[0.4.3]: https://github.com/daun/processwire-dashboard/releases/tag/v0.4.3
[0.4.2]: https://github.com/daun/processwire-dashboard/releases/tag/v0.4.2
[0.4.1]: https://github.com/daun/processwire-dashboard/releases/tag/v0.4.1
[0.4.0]: https://github.com/daun/processwire-dashboard/releases/tag/v0.4.0
[0.3.0]: https://github.com/daun/processwire-dashboard/releases/tag/v0.3.0
