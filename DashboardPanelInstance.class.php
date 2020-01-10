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
    public function add($item) {
        return $this->panels->add($item);
    }
    public function import($item) {
        return $this->panels->import($item);
    }
	public function insertBefore($item, $existingItem) {
		return $this->panels->insertBefore($item, $existingItem);
	}
	public function insertAfter($item, $existingItem) {
		return $this->panels->insertAfter($item, $existingItem);
	}
    public function remove($item) {
        return $this->panels->remove($item);
    }
    public function flatten() {
        return $this->panels->flatten();
    }
}

/**
 * Dashboard panel array class
 *
 * WireArray that holds a collection of panel instances
 */
class DashboardPanelArray extends WireArray {
    public function makeBlankItem() {
        return null;
    }

    public function isValidItem($item) {
        return $item instanceof DashboardPanelInstance;
    }

    /**
     * Flatten the panels in this array to include panels in any
     * panel groups
     *
     * @return DashboardPanelArray
     */
    public function flatten() {
        $flattened = new DashboardPanelArray();
        $flattened->setDuplicateChecking(false);

        /* Recursively flatten nested groups */
        foreach ($this->getAll() as $item) {
            if ($item instanceof DashboardPanelGroup) {
                $flattened->import($item->flatten());
            } elseif ($item instanceof DashboardPanelInstance) {
                $flattened->add($item);
            }
        }

        return $flattened;
    }

    public function add($config) {
        // Create panel object from config array
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
        // Add all other types directly (group or panel object)
        return parent::add($config);
    }

    /**
     * Create a group of panels and return it
     *
     * @param array $config
     * @return DashboardPanelGroup
     */
    public function createGroup($config) {
        if (!is_array($config)) return;
        $config['type'] = 'group';
        $config['panels'] = new DashboardPanelArray;
        $group = new DashboardPanelGroup;
        $group->setArray($config);
        return $group;
    }
}
