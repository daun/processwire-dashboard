<div
    class="Dashboard__panel Dashboard__group"
    data-size="<?= $size ?>"
    data-align="<?= $align ?>"
    data-margin="<?= $margin ? 'true' : 'false' ?>"
>

    <?php if ($title) { ?>
        <h2 class="Dashboard__group__title">
            <?= $icon ?> <?= $title ?>
        </h2>
    <?php } ?>

    <?php if ($panels) { ?>
        <?= $panels ?>
    <?php } ?>

</div>
