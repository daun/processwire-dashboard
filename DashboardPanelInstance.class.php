<?php namespace ProcessWire;

/**
 * Dashboard panel instance
 *
 * Wire-derived object that holds
 * the configuration of a single panel instance
 */
class DashboardPanelInstance extends WireData {}

/**
 * Dashboard panel group
 *
 * Wire-derived object that holds
 * the configuration of a group of panel instances
 */
class DashboardPanelGroup extends DashboardPanelInstance {
    public function add($config) {
        return $this->children->add($config);
    }
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
            $config['type'] = 'panel';
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

    /**
     * Create a group of panels and return it
     *
     * @param array $config
     * @return DashboardPanelGroup
     */
    public function createGroup($config) {
        if (is_array($config)) {
            $config['type'] = 'group';
            $config['children'] = new DashboardPanelArray;
            $group = new DashboardPanelGroup;
            $group->setArray($config);
            return $group;
        }
        return $config;
    }
}
