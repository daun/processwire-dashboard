function initDashboardChart () {
  var $canvas = $('#DashboardPanelChart__Canvas');
  if (!$canvas.length) return;

  var config = $canvas.data('chart');
  var chart = new Chart($canvas, config);
}

$(function() {
  initDashboardChart();
});
