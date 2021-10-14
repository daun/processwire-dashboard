<div
    class="Dashboard"
    data-icons="<?= $settings->displayIcons ? 'true' : 'false' ?>"
>
    <?php if ($panels) { ?>
        <div class="Dashboard__panels">
            <?= $panels ?>
        </div>
        <div class="Dashboard__info">
            <p>
                <?= $module ?>
                <small class="uk-text-small uk-text-muted">
                    <?= $version ?>
                    <a href="<?= $texts->repo_url ?>" target="_blank">
                        <i class="fa fa-github fa-fw"></i>
                    </a>
                </small>
            </p>
        </div>
    <?php } else { ?>
        <div class="Dashboard__getStarted">
            <p><i class="fa fa-magic"></i></p>
            <p><?= $texts->empty_panel_notice ?></p>
            <p><?= sprintf($texts->setup_hint, $texts->docs_url) ?></p>
            <p>
                <a href="<?= $texts->get_started_url ?>" target="_blank" class="ui-button ui-priority-secondary">
                    <?= $texts->get_started ?>
                </a>
            </p>
        </div>
    <?php } ?>
</div>
