<?php namespace Daun\Dashboard;

use ProcessWire\Module;
use ProcessWire\Page;
use ProcessWire\Selectors;
use ProcessWire\Wire;
use function ProcessWire\__;

/**
 * ProcessWire Dashboard
 * Panel base class.
 *
 * Base module class all dashboard panel modules must inherit from.
 * Defines basic behavior and a minimal expected public interface.
 *
 * @author Philipp Daun <post@philippdaun.net>
 * @license GPL-3.0
 */
abstract class DashboardPanel extends Wire implements Module
{
    /**
     * Instance of the main dashboard module.
     *
     * @var Dashboard
     */
    private $dashboard = null;

    /**
     * Options passed to this instance.
     *
     * @var array
     */
    protected $options = [];

    /**
     * Data passed to this instance.
     *
     * @var array
     */
    protected $data = [];

    /**
     * Open links in the current tab.
     */
    const windowModeNone = 'none';  // regular link
    /**
     * Open links in a modal popup.
     */
    const windowModeModal = 'modal'; // opens modal
    /**
     * Open links in a new tab.
     */
    const windowModeBlank = 'blank'; // opens target=_blank

    /**
     * Buttons displayed as floating modal buttons.
     */
    const modalButtons = '#submit_publish, #submit_save, #submit_save_unpublished, #Inputfield_submit_save';
    /**
     * Buttons that automatically close a modal after save (edit-page screen).
     */
    const modalAutocloseEdit = '#submit_publish, #submit_save_unpublished, #submit_save';
    /**
     * Buttons that automatically close a modal after save (add-page screen).
     */
    const modalAutocloseAdd = '#submit_publish, #submit_save_unpublished';

    /**
     * Module info stub to be extended by the implementing panel modules.
     */
    public static function getModuleInfo()
    {
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
     * Constructor.
     */
    public function __construct()
    {
        $this->dashboard = $this->modules->Dashboard;
        $this->viewFolder = $this->config->paths->{$this} . 'views';
    }

    /**
     * Setup the panel: fetch data, do calculations, check for config errors, etc.
     *
     * @return bool
     */
    public function setup()
    {
        return true;
    }

    /**
     * Get the panel's FontAwesome icon code (without the fa- prefix).
     *
     * @return string Icon code
     */
    public function getIcon()
    {
        return '';
    }

    /**
     * Get the panel's title.
     *
     * @return string Panel title
     */
    public function getTitle()
    {
        return '';
    }

    /**
     * Get the panel's main content.
     *
     * @return string Panel content
     */
    abstract public function getContent();

    /**
     * Get the panel's footer.
     *
     * @return string Panel footer
     */
    public function getFooter()
    {
        return '';
    }

    /**
     * Get a list of additional class names for the panel card.
     *
     * @return array Array of class names
     */
    public function getClassNames()
    {
        return [];
    }

    /**
     * Get a list of additional HTML attributes for the panel card.
     *
     * @return array Array of attributes (['attr' => 'value'])
     */
    public function getAttributes()
    {
        return [];
    }

    /**
     * Get a list of the panel's required stylesheets.
     *
     * @return array Array of file names or URLs
     */
    public function getStylesheets()
    {
        return [];
    }

    /**
     * Get a list of the panel's required script files.
     *
     * @return array Array of file names or URLs
     */
    public function getScripts()
    {
        return [];
    }

    /**
     * Get the default style options of this panel.
     *
     * @return array Array of style options (['attr' => 'value'])
     */
    public function getStyleOptions()
    {
        return [];
    }

    /**
     * Get the interval at which this panel will auto-reload via AJAX.
     *
     * @return int Reload interval (milliseconds)
     */
    public function getInterval()
    {
        return 0;
    }

    /**
     * Render the panel markup.
     *
     * @param array $options Options passed to this panel instance
     * @param int   $key     Key of this instance among all panels
     *
     * @return string
     */
    final public function render($options, $key = -1)
    {
        // Create shortcut properties
        $this->options = $options;
        $this->name = $options['panel'] ?? '';
        $this->class = "$this";
        $this->data = $options['dataArray'] ?? [];
        $this->size = $this->dashboard->sanitizePanelSize($options['size'] ?? false);
        $this->style = $options['style'] ?? null;
        $this->align = $options['align'] ?? '';

        // Setup panel, abort if negative return
        $status = $this->setup();
        if ($status === false) {
            return '';
        }

        // Update style with default options after setup
        $this->style = $this->style ?? $this->getStyleOptions() ?? [];

        // Include scripts and stylesheets
        $this->includeFiles();

        // Create output partials
        $icon = $this->renderIcon($options['icon'] ?? $this->getIcon());
        $title = $options['title'] ?? $this->getTitle();
        $content = $this->getContent();
        $footer = $this->getFooter();
        $interval = (int) ($options['interval'] ?? $this->getInterval());
        $classNames = implode(' ', $this->getClassNames());
        $attributes = $this->renderAttributes(
            array_merge(
                $this->generateStyleAttributes(),
                $this->getAttributes()
            )
        );

        // Render panel
        return $this->dashboard->view('panel', [
            'key'        => $key,
            'panel'      => $this->name,
            'module'     => $this->class,
            'options'    => $this->options,
            'size'       => $this->size,
            'data'       => $this->data,
            'style'      => $this->style,
            'align'      => $this->align,
            'interval'   => $interval,
            'classNames' => $classNames,
            'attributes' => $attributes,
            'icon'       => $icon,
            'title'      => $title,
            'content'    => $content,
            'footer'     => $footer,
        ]);
    }

    /**
     * Render icon as markup.
     *
     * @param string $icon Icon code (without fa-)
     *
     * @return string
     */
    final protected function renderIcon($icon)
    {
        return $this->dashboard->renderIcon($icon);
    }

    /**
     * Render data table.
     *
     * @param array $rows    Table rows
     * @param array $options Array of options
     *
     * @return string
     */
    protected function renderTable($rows, $options = [])
    {
        /** @var \ProcessWire\MarkupAdminDataTable $table */
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
     * Render a button.
     *
     * @param string $href    Link target
     * @param string $label   Button label
     * @param array  $options Array of options
     *
     * @return string
     */
    protected function renderButton($href, $label, $options = [])
    {
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
     * Render a footer button. Identical to renderButton(), but with smaller & lighter buttons by default.
     *
     * @param string $href    Link target
     * @param string $label   Button label
     * @param array  $options Array of options
     *
     * @return string
     */
    protected function renderFooterButton($href, $label, $options = [])
    {
        $options['light'] = $options['secondary'] ?? false;
        $options['small'] = true;
        $options['secondary'] = true;

        return $this->renderButton($href, $label, $options);
    }

    /**
     * Render attribute array as HTML attribute string.
     *
     * @param array $attributes Attributes (['attr' => 'value'])
     *
     * @return string
     */
    protected function renderAttributes($attributes = [])
    {
        if (!is_array($attributes)) {
            return $attributes;
        }
        if (empty($attributes)) {
            return '';
        }

        $attributePairs = [];
        foreach ($attributes as $key => $val) {
            if (is_int($key)) {
                $attributePairs[] = $val;
                continue;
            }
            $val = htmlspecialchars($val, ENT_QUOTES);
            $attributePairs[] = "{$key}=\"{$val}\"";
        }

        return implode(' ', $attributePairs);
    }

    /**
     * Add/update query parameters on a url.
     */

    /**
     * Add/update query parameters on a url (either ? or &).
     *
     * @param string $url   URL to update
     * @param string $key   Query parameter to add/change
     * @param string $value Value to set parameter to
     *
     * @return string Updated URL
     */
    protected function setQueryParameter($url, $key, $value = null)
    {
        $info = parse_url($url);
        $query = $info['query'] ?? '';
        parse_str($query, $params);

        if (is_array($key)) {
            foreach ($key as $k => $v) {
                $params[$k] = $v;
            }
        } else {
            $params[$key] = $value;
        }

        $query = http_build_query($params);

        $result = $info['path'] ?? '';
        if ($info['host'] ?? false) {
            $origin = $info['scheme'].'://'.$info['host'];
            $result = $origin.$result;
        }
        if ($query) {
            $result .= '?'.$query;
        }

        return $result;
    }

    /**
     * Generate HTML attribute array from style options.
     */
    protected function generateStyleAttributes()
    {
        // Map styles array, and also transform the keys
        return array_column(
            array_map(function ($option, $value) {
                $option = $this->sanitizer->kebabCase($option);
                $key = "data-style-{$option}";
                $value = $value ? 'true' : 'false';

                return [$key, $value];
            }, array_keys($this->style), $this->style),
            1,
            0
        );
    }

    /**
     * Include required JS files for modal popups.
     *
     * @return void
     */
    protected function includeModalScripts()
    {
        $this->modules->get('JqueryUI')->use('modal');
    }

    /**
     * Include module scripts and stylesheets.
     *
     * @return void
     */
    final protected function includeFiles()
    {
        $modulePath = $this->config->paths->$this;
        $moduleUrl = $this->config->urls->$this;
        $version = $this->modules->getModuleInfoProperty($this, 'version');

        $templatePath = $this->config->paths->templates;
        $templateUrl = $this->config->urls->templates;

        // Stylesheets
        $styles = (array) $this->getStylesheets();
        $styles[] = "{$this}.css";
        foreach ($styles as $file) {
            if (stripos($file, '://') !== false) {
                $this->config->styles->add($file);
            } elseif (file_exists($modulePath.$file)) {
                $this->config->styles->add("{$moduleUrl}{$file}?v={$version}");
            } elseif (file_exists($templatePath.$file)) {
                $this->config->styles->add("{$templateUrl}{$file}?v={$version}");
            }
        }

        // Scripts
        $scripts = (array) $this->getScripts();
        $scripts[] = "{$this}.js";
        foreach ($scripts as $file) {
            if (stripos($file, '://') !== false) {
                $this->config->scripts->add($file);
            } elseif (file_exists($modulePath.$file)) {
                $this->config->scripts->add("{$moduleUrl}{$file}?v={$version}");
            } elseif (file_exists($templatePath.$file)) {
                $this->config->scripts->add("{$templateUrl}{$file}?v={$version}");
            }
        }
    }

    /**
     * Render local view with supplied variables.
     *
     * @param string $view      View name (filename relative to /views/ folder)
     * @param array  $variables Array of variables (['var' => 'value'])
     *
     * @return string Rendered view
     */
    final protected function view($view, $variables)
    {
        $filename = $this->viewFolder. DIRECTORY_SEPARATOR . $view;
        return $this->files->render($filename, $variables);
    }

    /**
     * Load a page from either an ID, a selector or return the page itself.
     */

    /**
     * Load a page from either an ID, a selector or return the page itself.
     *
     * @param Page|int|string|null $input
     *
     * @return Page|NullPage|null
     */
    protected function getPageFromObjectOrSelectorOrID($input)
    {
        if (!$input) {
            return null;
        }

        if (is_object($input) && $input instanceof Page) {
            $page = $input;
        } elseif (is_int($input)) {
            $page = $this->pages->get($input);
        } elseif (is_string($input) && Selectors::stringHasSelector($input)) {
            $page = $this->pages->get($input);
        }

        return $page ?? null;
    }
}
