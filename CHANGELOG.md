# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## v0.6.8 - 2020-01-20

- Enable module installation via ZIP download in admin interface

## v0.6.7 - 2020-01-18

- Allow setting HTML attributes of panel elements
- Set `data-file` attribute on `template` panels to simplify CSS namespacing
- Auto-include associated CSS & JS files of `template` panels
- Allow event handlers to cancel panel reload
- Intercept `chart` panel reloads and update canvas manually

## v0.6.6 - 2020-01-17

- Fix error in case of undefined Uikit helper
- Fix notice in case of undefined URL parts
- Re-enable default theme tooltips
- Fix multi-language display of links
- Use DOM events to trigger panel reloads

## v0.6.5 - 2020-01-15

- Add dashboard page to user dropdown navigation

## v0.6.4 - 2020-01-15

- Support multiple `page-list` panels per dashboard
- Add option to open `page-list` links in modal or new tab

## v0.6.3 - 2020-01-15

- Simplify overwriting the default panel size
- Add CSS & JS to hello-world module implementation
- Fix missing modal scripts

## v0.6.2 - 2020-01-14

- Allow adding multiple items at once via `$panels->add()`

## v0.6.1 - 2020-01-14

- Allow importing multiple items at once via `$panels->import()`

## v0.6.0 - 2020-01-14

- Animate panel refresh
- Re-init tooltips after panel refresh
- Add support for modals in collection panels

## v0.5.1 - 2020-01-14

- Fix closing canvas tag
- Use compass as module icon

## v0.5.0 - 2020-01-10

- Implement AJAX auto-refresh for panels
- Set default chart color theme via hook

## v0.4.14 - 2020-01-08

- Use asset bundler to transpile and minify JS & CSS
- Improve horizontal padding of PageList panel

## v0.4.13 - 2020-01-06

- Fix color column output formatting
- Disable word wrap in action column
- Allow disabling access checks in shortcuts panel
- Implement fallback number formatter

## v0.4.12 - 2020-01-06

- Allow setting vertical alignment per panel
- Add helpers for rendering footer buttons

Chart panel improvements:

- Color themes
- Default styles for donut charts
- Aspect ratio placeholder while chart is loading

## v0.4.11 - 2020-01-06

- Display shortcut summaries as tooltips
- Add list view for shortcuts panel

## v0.4.10 - 2020-01-06

- Allow custom icons per shortcut
- Hide sort buttons in actions column
- Improve table display
- Make default panel size hookable

## v0.4.9 - 2020-01-04

- Add PHP & ProcessWire version constraints
- Add create/view buttons to collection panel
- Add support for color picker columns in collection panel
- Add panel size: mini (one quarter)
- Fix empty user label

## v0.4.8 - 2020-01-04

- Improve table and page list display in default admin theme
- Fix trailing comma when username is empty
- Support pages and selectors as page list parent

## v0.4.7 - 2020-01-04

- Enable display of panel icons

## v0.4.6 - 2020-01-03

- Remember bumping versions

## v0.4.5 - 2020-01-03

- Support image columns in collection panel
- Support icons as collection column headers

## v0.4.4 - 2020-01-03

- Fix regression introduced in previous release

## v0.4.3 - 2020-01-03

- Fix assets auto-loading in frontend

## v0.4.2 - 2020-01-03

- Add support for AdminThemeDefault
- Add code examples in readme
- Allow URLs in shortcut list

## v0.4.1 - 2020-01-03

- AdminThemeReno support
- Set chart library defaults
- Make chart data manipulation hookable

## v0.4.0 - 2020-01-03

- Allow nesting of panels in groups

## v0.3.0 - 2020-01-02

- Initial public release
