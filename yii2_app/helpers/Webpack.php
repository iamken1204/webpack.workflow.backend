<?php

namespace app\helpers;

/**
 * Webpack Helper
 *
 * @author  Kettan Wu kettanwu@talk2yam.com
 * @since   0.0.1
 * @version 0.0.1
 */

use Exception;
use Yii;

class Webpack
{
    /**
     * The bundleKey
     * format: md5($view->bundleKey)
     * @var string
     */
    public $bundleKey = '';

    /**
     * Fetch view component, generate corresponding bundleKey
     *
     * The View class should contains property: 'bundleKey',
     * default is empty, and will be setted as
     * Yii::$app->controller->id . Yii::$app->controller->action->id,
     * bundleKey can be setted within view contents to overide default value.
     *
     * @param  \yii\base\Configurable $view  The View class.
     * @return app\helpers\Webpack    $this
     */
    public function __construct(\yii\base\Configurable $view)
    {
        $key = isset($view->bundleKey) ? (string) $view->bundleKey : '';
        if (empty($key) && isset(Yii::$app->controller)) {
            $key = sprintf('%s%s.%s',
                           Yii::$app->controller->module->id,
                           Yii::$app->controller->id,
                           Yii::$app->controller->action->id
            );
        }
        $this->bundleKey = md5($key);
        return $this;
    }

    /**
     * Prepare for rendering assets tag
     * @param  string  $suffix The sufix of asset file, must be (js|css)
     * @param  boolean $force  Force Webpack to export assets tag
     * @return string
     */
    public function getSourceTag($suffix='', $force=false)
    {
        $res = '';

        $src = sprintf('/dist/%s.%s', $this->bundleKey, $suffix);
        $flag = is_file(Yii::getAlias('@webroot') . $src);
        if (!empty($this->bundleKey) && $flag || $force) {
            switch ($suffix) {
                case 'js':
                    $res = sprintf('<script src="%s"></script>', $src);
                    break;
                case 'css':
                    $res = sprintf('<link rel="stylesheet" href="%s">', $src);
                    break;
                default:
                    throw new Exception("Wrong suffix (should be 'js' or 'css')", 500);
                    break;
            }
        }

        return $res;
    }

    /**
     * Render assets tag
     * @param  string  $suffix The sufix of asset file, default is 'js'
     * @param  boolean $force  Force Webpack to export assets tag
     */
    public function render($suffix='js', $force=false)
    {
        $tag = $this->getSourceTag($suffix, $force);
        echo $tag;
    }
}
