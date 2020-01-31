<div
    class="Dashboard__panel <?= $module ?> <?= $classNames ?> uk-card uk-card-default uk-card-small ui-corner-all"
    data-dashboard-panel
    data-key="<?= $key ?>"
    data-panel="<?= $panel ?>"
    data-size="<?= $size ?>"
    data-align="<?= $align ?>"
    data-interval="<?= $interval ?>"
    <?= $attributes ?>
>

    <?php if ($title) { ?>
        <div class="uk-card-header">
            <h3 class="uk-card-title">
                <?= $icon ?> <?= $title ?>
            </h3>
        </div>
    <?php } ?>

    <div class="uk-card-body">
        <?= $content ?>
    </div>

    <?php if ($footer) { ?>
        <div class="uk-card-footer">
            <?= $footer ?>
        </div>
    <?php } ?>

</div>
