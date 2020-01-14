<div class="DashboardPanelChart__content">
    <canvas
        class="DashboardPanelChart__canvas"
        data-theme="<?= $theme ?>"
        data-default-theme="<?= $default ?>"
        data-chart="<?= htmlspecialchars(json_encode($chart), ENT_QUOTES, 'UTF-8'); ?>"
    ></canvas>
    <div class="DashboardPanelChart__placeholder" style="<?= $padding ?>"></div>
</div>
