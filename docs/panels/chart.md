# Panel Type: Chart

Display a chart using [Chart.js](https://www.chartjs.org/).

![Chart](../images/chart.png ':size=400')

## Options

Required parameters are marked with an asterisk `*`

|   Parameter   |  Type   | Default |          Description           |
| ------------- | ------- | ------- | ------------------------------ |
| **`chart *`** | `array` | `[]`    | Chart.js configuration options |

## Example

```php
$panels->add([
  'panel' => 'chart',
  'title' => 'Chart',
  'data' => [
    'chart' => [
      'type' => 'line',
      'data' => [
        'labels' => ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        'datasets' => [
          [
            'label' => 'Lorem ipsum',
            'data' => [7, 10, 8, 12, 4, 6, 3]
          ],
          [
            'label' => 'Dolor sit amet',
            'data' => [5, 6, 7, 8, 6, 8, 14]
          ]
        ]
      ],
      'options' => [
        'aspectRatio' => 2.5,
        'scales' => [
          'xAxes' => [
            ['gridLines' => ['display' => false]]
          ]
        ]
      ]
    ]
  ]
]);
```
