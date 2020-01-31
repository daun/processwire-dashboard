<div class="DashboardPanelNumber__content" data-trend="<?= htmlspecialchars($trend) ?>">

    <?php if ($number && $detail) { ?>
        <dl>
            <dt><?= $number ?> <i class="fa fa-arrow-right fa-fw"></i></dt>
            <dd><?= $detail ?></dd>
        </dl>
    <?php } else { ?>
        <p><?= $number ?> <i class="fa fa-arrow-right fa-fw"></i></p>
    <?php } ?>

</div>
