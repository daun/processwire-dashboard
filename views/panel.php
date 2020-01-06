<?php

$attrs = array_map(function ($value, $option) use ($sanitizer) {
    $name = $sanitizer->kebabCase($option);
    $value = $value ? 'true' : 'false';
    return "data-style-{$name}='{$value}'";
}, $style, array_keys($style));

?>

<div
    class="Dashboard__panel <?= $module ?> <?= $classNames ?> uk-card uk-card-default uk-card-small ui-corner-all"
    data-size="<?= $size ?>"
    data-panel="<?= $panel ?>"
    <?= join(' ', $attrs) ?>
>

    <?php if ($title): ?>
        <div class="uk-card-header">
            <h3 class="uk-card-title">
                <?= $icon ?> <?= $title ?>
            </h3>
        </div>
    <?php endif; ?>

    <div class="uk-card-body">
        <?= $content ?>
    </div>

    <?php if ($footer): ?>
        <div class="uk-card-footer">
            <?= $footer ?>
        </div>
    <?php endif; ?>

</div>
