<?php

/**
 * @file
 * Views tabbedrow: Single Frame template file.
 */
?>

<div class="skin-<?php print $settings['views_tabbedrow_cycle']['skin']; ?>">
  <?php if (isset($top_widget_rendered)): ?>
    <div class="views-tabbedrow-controls-top clearfix">
      <?php print $top_widget_rendered; ?>
    </div>
  <?php endif; ?>

  <?php print $tabbedrow; ?>

  <?php if (isset($bottom_widget_rendered)): ?>
    <div class="views-tabbedrow-controls-bottom clearfix">
      <?php print $bottom_widget_rendered; ?>
    </div>
  <?php endif; ?>
</div>
