<?php namespace ProcessWire;

/**
 * Dashboard panel instance class
 *
 * Wire-derived object that holds
 * the configuration of a single panel instance
 */
class DashboardPanelInstance extends WireData {

}

/**
 * Dashboard panel array class
 *
 * WireArray that holds a collection of panel instances
 */
class DashboardPanelArray extends WireArray {

    public function isValidItem($item) {
        return $item instanceof DashboardPanelInstance;
    }

    public function add($config) {
        if (is_array($config)) {
            if ($config['data'] ?? false) {
                $config['dataArray'] = $config['data'];
                unset($config['data']);
            }
            $instance = new DashboardPanelInstance;
            $instance->setArray($config);
            return parent::add($instance);
        }
        return parent::add($config);
    }
}
