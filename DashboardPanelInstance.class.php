<?php namespace Daun\Dashboard;

use ProcessWire\WireArray;
use ProcessWire\WireData;

if (!function_exists('array_key_first')) {
    function array_key_first(array $arr)
    {
        foreach ($arr as $key => $unused) {
            return $key;
        }

        return null;
    }
}

/**
 * Dashboard panel instance.
 *
 * Wire-derived object that holds
 * the configuration of a single panel instance
 */
class DashboardPanelInstance extends WireData
{
}

/**
 * Dashboard panel group.
 *
 * Wire-derived object that holds
 * the configuration of a group of panel instances
 */
class DashboardPanelGroup extends DashboardPanelInstance
{
    public function add($item)
    {
        return $this->panels->add($item);
    }

    public function import($items)
    {
        return $this->panels->import($items);
    }

    public function insertBefore($item, $existingItem)
    {
        return $this->panels->insertBefore($item, $existingItem);
    }

    public function insertAfter($item, $existingItem)
    {
        return $this->panels->insertAfter($item, $existingItem);
    }

    public function remove($item)
    {
        return $this->panels->remove($item);
    }

    public function flatten()
    {
        return $this->panels->flatten();
    }
}

/**
 * Dashboard panel tab.
 *
 * Wire-derived object that holds
 * the configuration of a tab of panel instances
 */
class DashboardPanelTab extends DashboardPanelGroup
{
}

/**
 * Dashboard panel array class.
 *
 * WireArray that holds a collection of panel instances
 */
class DashboardPanelArray extends WireArray
{
    protected $duplicateChecking = false;
    protected $frozen = false;

    public function freeze()
    {
        $this->frozen = true;
    }

    public function frozen()
    {
       return $this->frozen;
    }

    public function makeBlankItem()
    {
        return null;
    }

    public function isValidItem($item)
    {
        return $item instanceof DashboardPanelInstance;
    }

    /**
     * Flatten the panels in this array to include panels in any
     * panel groups.
     *
     * @return DashboardPanelArray
     */
    public function flatten()
    {
        $flattened = new self();

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

    public function add($config)
    {
        // Account for array of configs: all panel configs have associative
        // keys, so numerical keys indicate an array of configs
        if (is_array($config) && is_int(array_key_first($config))) {
            return $this->import($config);
        } else {
            return parent::add($this->createInstance($config));
        }
    }

    public function set($key, $value)
    {
        return parent::set($key, $this->createInstance($value));
    }

    public function prepend($item)
    {
        return parent::prepend($this->createInstance($item));
    }

    public function unshift($item)
    {
        return parent::unshift($this->createInstance($item));
    }

    public function insertBefore($item, $existingItem)
    {
        return parent::insertBefore($this->createInstance($item), $existingItem);
    }

    public function insertAfter($item, $existingItem)
    {
        return parent::insertAfter($this->createInstance($item), $existingItem);
    }

    public function import($items)
    {
        $instances = [];
        foreach ($items as $key => $item) {
            $instances[$key] = $this->createInstance($item);
        }

        return parent::import($instances);
    }

    /**
     * Create a panel and return it.
     *
     * @param array $config
     *
     * @return DashboardPanelGroup
     */
    public function createPanel(array $config)
    {
        if (!is_array($config)) {
            return;
        }
        if (!($config['panel'] ?? false)) {
            throw new \Exception('Missing required `panel` parameter');
        }

        $config['type'] = 'panel';
        if ($config['data'] ?? false) {
            $config['dataArray'] = $config['data'];
            unset($config['data']);
        }
        $instance = new DashboardPanelInstance();
        $instance->setArray($config);

        return $instance;
    }

    /**
     * Create a group of panels and return it.
     *
     * @param array $config
     *
     * @return DashboardPanelGroup
     */
    public function createGroup(array $config)
    {
        if (!is_array($config)) {
            return;
        }

        $config['type'] = 'group';
        $config['panels'] = new self();
        $group = new DashboardPanelGroup();
        $group->setArray($config);

        return $group;
    }

    /**
     * Create a tab and return it.
     *
     * @param array $config
     *
     * @return DashboardPanelTab
     */
    public function createTab(array $config)
    {
        if (!is_array($config)) {
            return;
        }

        $config['type'] = 'tab';
        $config['panels'] = new self();
        $tab = new DashboardPanelTab();
        $tab->setArray($config);

        return $tab;
    }

    /**
     * Create an instance of the DashboardPanelInstance class.
     *
     * @param array $config
     *
     * @return DashboardPanelInstance
     */
    public function createInstance($config)
    {
        if (!is_array($config)) {
            return $config;
        }

        switch ($config['type'] ?? null) {
            case 'tab':
                return $this->createTab($config);
            case 'group':
                return $this->createGroup($config);
            case 'panel':
            default:
                return $this->createPanel($config);
        }
    }
}
