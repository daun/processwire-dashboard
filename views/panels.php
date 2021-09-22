<?php if (count($tabs)) { ?>

    <div class="Dashboard__tabs">
        <ul class="Dashboard__tabs__header">
            <?php foreach ($tabs as $tab) { ?>
                <li><a href="#<?= $tab->anchor ?>"><?= $tab->title ?></a></li>
            <?php } ?>
        </ul>
        <?php foreach ($tabs as $tab) { ?>
            <section id="<?= $tab->anchor ?>" class="Dashboard__tabs__content">
                <?= $tab->panels ?>
            </section>
        <?php } ?>
    </div>

<?php } ?>

<?php if (count($panels)) { ?>

    <div class="Dashboard__grid">
        <?php foreach ($panels as $markup) { ?>
            <?= $markup ?>
        <?php } ?>
    </div>

<?php } ?>
