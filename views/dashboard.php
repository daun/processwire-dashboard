<div
    class="Dashboard"
    data-icons="<?= $settings->displayIcons ? 'true' : 'false' ?>"
>
    <?php if (count($panels)): ?>
        <div class='Dashboard__grid'>
            <?php foreach ($panels as $markup): ?>
                <?= $markup ?>
            <?php endforeach; ?>
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
    <?php else: ?>
        <div class='Dashboard__getStarted'>
            <!-- <p><i class="fa fa-compass"></i></p> -->
            <!-- <p><i class="fa fa-trello"></i></p> -->
            <p><i class="fa fa-hand-peace-o"></i></p>
            <p><?= $texts->empty_panel_notice ?></p>
            <p><?= sprintf($texts->setup_hint, $texts->repo_url) ?></p>
            <p>
                <a href="<?= $texts->repo_url ?>" target="_blank" class="ui-button ui-priority-secondary">
                    <?= $texts->get_started ?>
                </a>
            </p>
        </div>
    <?php endif; ?>
</div>
