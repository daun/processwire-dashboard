<?php

namespace ProcessWire;

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
 * Dashboard panel array class.
 *
 * WireArray that holds a collection of panel instances
 */
class DashboardPanelArray extends WireArray
{
    protected $duplicateChecking = false;

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
        }
        $instance = $this->createInstance($config);

        return parent::add($instance);
    }

    public function set($key, $value)
    {
        $instance = $this->createInstance($value);

        return parent::set($key, $instance);
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
     * Create a group of panels and return it.
     *
     * @param array $config
     *
     * @return DashboardPanelGroup
     */
    public function createGroup($config)
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
     * Create an instance of the DashboardPanelInstance class.
     *
     * @param array $config
     *
     * @return DashboardPanelInstance
     */
    public function createInstance($config)
    {
        if (is_array($config)) {
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
        } else {
            return $config;
        }
    }
}
