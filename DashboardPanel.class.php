<?php namespace ProcessWire;

/**
 * Dashboard panel base class
 *
 * Base class all dashboard panels must inherit from. Defines basic behavior and
 * minimum expected public interface
 */
abstract class DashboardPanel extends Wire implements Module {

    /**
     * Instance of the main dashboard module
     *
     * @var Dashboard
     */
    private $dashboard = null;

    /**
     * Options passed to this instance
     *
     * @var array
     */
    protected $options = [];

    /**
     * Data passed to this instance
     *
     * @var array
     */
    protected $data = [];

    /**
     * Constants to define how edit and view links open
     * Defined here because it is used in multiple panels
     *
     */
    const windowModeNone  = 'none';  // regular link
    const windowModeModal = 'modal'; // opens modal
    const windowModeBlank = 'blank'; // opens target=_blank

    /**
     * Buttons displayed as floating modal buttons
     *
     */
    const modalButtons = '#submit_publish, #submit_save, #submit_save_unpublished, #Inputfield_submit_save';

    /**
     * Buttons that autmatically close a modal after save
     *
     * #submit_save = Add new > Save, Edit > Save
     * #submit_publish = Edit > Save & Publish
     * #submit_save_unpublished = Edit > Save & Keep Unpublished
     *
     */
    const modalAutocloseEdit = '#submit_publish, #submit_save_unpublished, #submit_save';
    const modalAutocloseAdd = '#submit_publish, #submit_save_unpublished';

    /**
     * Module info stub to extend by panel modules
     */
    public static function getModuleInfo() {
        return [
            'title'    => __('Dashboard Panel: Base Class', __FILE__),
            'requires' => 'Dashboard',
            'installs' => 'Dashboard',
            'icon'     => 'compass',
            'autoload' => false,
            'singular' => false,
        ];
    }

    /**
     * Constructor
     */
    public function __construct() {
        $this->dashboard = $this->modules->Dashboard;
        $this->viewFolder = __DIR__.'/views/';
    }

    /**
     * Setup the panel: fetch data, do calculations, check for config errors, etc.
     *
     * @return bool
     */
    public function setup() {
        return true;
    }

    /**
     * Get the panel's FontAwesome icon code (without the fa- prefix)
     *
     * @return string
     */
    public function getIcon() {
        return '';
    }

    /**
     * Get the panel's title
     *
     * @return string
     */
    public function getTitle() {
        return '';
    }

    /**
     * Get the panel's main content
     *
     * @return string
     */
    abstract public function getContent();

    /**
     * Get the panel's footer
     *
     * @return string
     */
    public function getFooter() {
        return '';
    }

    /**
     * Get a list of additional class names for the panel card
     *
     * @return array  Array of class names
     */
    public function getClassNames() {
        return [];
    }

    /**
     * Get a list of the panel's stylesheets
     *
     * @return array  Array of file names or URLs
     */
    public function getStyles() {
        return [];
    }

    /**
     * Get a list of the panel's script files
     *
     * @return array  Array of file names or URLs
     */
    public function getScripts() {
        return [];
    }

    /**
     * Get the interval at which this panel will auto-reload via AJAX
     *
     * @return int  Reload interval (milliseconds)
     */
    public function getInterval() {
        return 0;
    }

    /**
     * Render the panel markup
     *
     * @param array $options Options passed to this panel instance
     * @param int $key Key of this instance among all panels
     * @return string
     */
    final public function render($options, $key = -1) {
        // Create shortcut properties
        $this->options = $options;
        $this->name = $options['panel'] ?? '';
        $this->class = "$this";
        $this->data = $options['dataArray'] ?? [];
        $this->size = $this->dashboard->sanitizePanelSize($options['size'] ?? false);
        $this->style = $options['style'] ?? [];
        $this->align = $options['align'] ?? '';

        // Include scripts and stylesheets
        $this->includeFiles();

        // Setup panel
        $this->setup();

        // Create output partials
        $icon = $this->renderIcon($options['icon'] ?? $this->getIcon());
        $title = $options['title'] ?? $this->getTitle();
        $content = $this->getContent();
        $footer = $this->getFooter();
        $classNames = join(' ', $this->getClassNames());
        $interval = (int) ($options['interval'] ?? $this->getInterval());

        // Render panel
        return $this->dashboard->view('panel', [
            'key' => $key,
            'panel' => $this->name,
            'module' => $this->class,
            'options' => $this->options,
            'size' => $this->size,
            'data' => $this->data,
            'style' => $this->style,
            'align' => $this->align,
            'interval' => $interval,
            'classNames' => $classNames,
            'icon' => $icon,
            'title' => $title,
            'content' => $content,
            'footer' => $footer,
        ]);
    }

    /**
     * Render panel icon as markup
     *
     * @return string
     */
    final protected function renderIcon(...$args) {
        return $this->dashboard->renderIcon(...$args);
    }

    /**
     * Render markup table
     *
     */
    protected function renderTable($rows, $options = []) {
        $table = $this->modules->get('MarkupAdminDataTable');

        $table->setSortable($options['sortable'] ?? false);
        $table->setEncodeEntities($options['entities'] ?? false);

        if ($options['header'] ?? false) {
            $header = array_shift($rows);
            if ($header) {
                $table->headerRow($header);
            }
        }
        if ($options['footer'] ?? false) {
            $footer = array_pop($rows);
            if ($footer) {
                $table->footerRow($footer);
            }
        }
        if ($options['class'] ?? false) {
            $table->addClass($options['class']);
        }

        foreach ($rows as $row) {
            $table->row($row);
        }

        return $table->render();
    }

    /**
     * Render a button
     *
     */
    protected function renderButton($href, $label, $options = []) {
        $icon = $options['icon'] ?? '';
        $small = $options['small'] ?? null;
        $secondary = $options['secondary'] ?? null;
        $light = $options['light'] ?? null;
        $class = $options['class'] ?? '';
        $modal = $options['modal'] ?? null;
        $blank = $options['blank'] ?? null;

        $button = $this->modules->get('InputfieldButton');
        $button->attr('value', $label);
        $button->href = $href;
        $button->icon = $icon;
        $button->secondary = $secondary;
        $button->small = $small;
        $button->aclass = "DashboardButton {$class}";
        // $button->class = '';

        if ($light) {
            $button->aclass .= ' DashboardButton--light';
        }
        if ($modal) {
            $this->includeModalScripts();
            $button->class .= ' pw-modal pw-modal-large';
            $buttons = $options['modalButtons'] ?? null;
            $autoclose = $options['modalAutoclose'] ?? null;
            $close = $options['modalClose'] ?? null;
            $reload = $options['reloadOnModalClose'] ?? false;
            if ($buttons) {
                $button->attr('data-buttons', $buttons);
                if ($autoclose) {
                    $button->attr('data-autoclose', $autoclose);
                }
                if ($close) {
                    $button->attr('data-close', $close);
                }
                if ($reload) {
                    $button->attr('data-reload-on-close', true);
                }
            }
        } elseif ($blank) {
            $button->attr('target', '_blank');
        }

        return $button->render();
    }

    /**
     * Render footer button
     *
     * Identical to renderButton(), but with smaller & lighter buttons by default
     *
     */
    protected function renderFooterButton($href, $label, $options = []) {
        $options['light'] = $options['secondary'] ?? false;
        $options['small'] = true;
        $options['secondary'] = true;

        return $this->renderButton($href, $label, $options);
    }

    /**
     * Add/update query parameters on a url
     *
     */
    protected function setQueryParameter($url, $key, $value) {
        $info = parse_url($url);
        $query = $info['query'] ?? '';
        parse_str($query, $params);

        $params[$key] = $value;
        $query = http_build_query($params);

        $result = $info['path'] ?? '';
        if ($info['host'] ?? false) {
            $origin = $info['scheme'] . '://' . $info['host'];
            $result = $origin . $result;
        }
        if ($query) {
            $result .= '?' . $query;
        }
        return $result;
    }

    /**
     * Include modal functionality
     *
     */
    protected function includeModalScripts() {
        $this->modules->get('JqueryUI')->use('modal');
    }

    /**
     * Include module scripts and stylesheets
     *
     */
    final protected function includeFiles() {
        $path = $this->config->paths->$this;
        $url = $this->config->urls->$this;
        $version = $this->modules->getModuleInfoProperty($this, 'version');

        // Stylesheets
        $styles = (array) $this->getStyles();
        $styles[] = "{$this}.css";
        foreach ($styles as $file) {
            if (stripos($file, '://') !== false) {
                $this->config->scripts->add($file);
            } else if (file_exists($path.$file)) {
                $this->config->styles->add("{$url}{$file}?v={$version}");
            }
        }

        // Scripts
        $scripts = (array) $this->getScripts();
        $scripts[] = "{$this}.js";
        foreach ($scripts as $file) {
            if (stripos($file, '://') !== false) {
                $this->config->scripts->add($file);
            } else if (file_exists($path.$file)) {
                $this->config->scripts->add("{$url}{$file}?v={$version}");
            }
        }
    }

    /**
     * Render local view with supplied data
     *
     */
    final protected function view($view, $data ) {
        return $this->files->render($this->viewFolder.$view, $data);
    }

    /**
     * Load a page from either an ID, a selector or return the page itself
     *
     */
    protected function getPageFromObjectOrSelectorOrID($input) {
        if (!$input) return;

        if (is_object($input) && $input instanceof Page) {
            $page = $input;
        } else if (is_int($input)) {
            $page = $this->pages->get($input);
        } else if (is_string($input) && Selectors::stringHasSelector($input)) {
            $page = $this->pages->get($input);
        }

        return $page;
    }
}
