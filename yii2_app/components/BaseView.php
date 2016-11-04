<?php

namespace app\components;

/**
 * BaseView Component
 *
 * @author  Kettan Wu kettanwu@talk2yam.com
 * @since   0.0.1
 * @version 0.0.1
 */

use Yii;

class BaseView extends \yii\web\View implements \yii\base\Configurable
{
    /**
     * The key for rendering asset files,
     * used by app\helpers\Webpack,
     * default value is empty.
     * It can be setted within view contents to
     * overide default value.
     * @var string ''
     */
    public $bundleKey;
}
