<div class="DashboardPanelChart__content">
    <div class="DashboardPanelChart__placeholder"></div>
    <canvas class="DashboardPanelChart__canvas" data-theme="<?= $theme ?>" data-chart="<?= htmlspecialchars(json_encode($chart), ENT_QUOTES, 'UTF-8'); ?>"></canvas>
</div>
