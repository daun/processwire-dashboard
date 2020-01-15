# Panel Type: Chart

Display a chart using [Chart.js](https://www.chartjs.org/).

![Chart](../images/chart.png ':size=400')

## Options

- `chart`: array of configuration options to pass to Chart.js (converted to JSON)

## Example

```php
[
  'chart' => [
    'type' => 'line',
    'data' => [
      'labels' => ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
      'datasets' => [
        [
          'label' => 'Lorem ipsum',
          'data' => [7, 10, 8, 12, 4, 6, 3],
        ],
        [
          'label' => 'Dolor sit amet',
          'data' => [5, 6, 7, 8, 6, 8, 14],
        ],
      ],
    ],
    'options' => [
      'aspectRatio' => 2.5,
      'scales' => [
        'xAxes' => [
          ['gridLines' => ['display' => false]],
        ],
      ],
    ],
  ],
]
```
