<?php

/**
 * @file
 * Defines the View Style Plugins for Views tabbedrow module.
 */

/**
 * Implements hook_views_plugins().
 */
function views_tabbedrow_views_plugins() {
  return array(
    'style' => array(
      'tabbedrow' => array(
        'title' => t('tabbedrow'),
        'help' => t('Display the results as a tabbedrow.'),
        'handler' => 'views_tabbedrow_plugin_style_tabbedrow',
        'uses options' => TRUE,
        'uses row plugin' => TRUE,
        'uses grouping' => FALSE,
        'uses row class' => TRUE,
        'type' => 'normal',
        'path' => drupal_get_path('module', 'views_tabbedrow'),
        'theme' => 'views_tabbedrow',
        'theme path' => drupal_get_path('module', 'views_tabbedrow') . '/theme',
        'theme file' => 'views_tabbedrow.theme.inc',
      ),
    ),
  );
}
