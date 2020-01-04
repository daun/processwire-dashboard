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
     * Module info stub to extend by panel modules
     */
    public static function getModuleInfo() {
        return [
            'title'       => __('Dashboard Panel: Base Class', __FILE__),
            'icon'        => 'safari',
            'requires'    => 'Dashboard',
            'installs'    => 'Dashboard',
            'autoload'    => false,
            'singular'    => false,
        ];
    }

    /**
     * Constructor
     */
    public function __construct() {
        // Store reference to main dashboard instance
        $this->dashboard = $this->modules->get('Dashboard');

        // Determine module folders
        $this->moduleFolder = dirname($this->modules->getModuleFile($this));
        $this->viewFolder = "{$this->moduleFolder}/views/";
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
     * Render the panel markup
     *
     * @param array $options Options passed to this panel instance
     * @return string
     */
    final public function render($options = []) {
        // Create shortcut properties
        $this->options = $options;
        $this->name = $options['panel'] ?? [];
        $this->class = $this->modules->getModuleInfoProperty($this, 'name');
        $this->size = $this->dashboard->sanitizePanelSize($options['size'] ?? false);
        $this->data = $options['dataArray'] ?? [];
        $this->layout = $options['layout'] ?? [];

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

        // Render panel
        return $this->dashboard->view('panel', [
            'panel' => $this->name,
            'module' => $this->class,
            'options' => $this->options,
            'size' => $this->size,
            'data' => $this->data,
            'layout' => $this->layout,
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
