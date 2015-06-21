<?php

/**
 * @file
 * Views integration for the views_vertical_tabs module.
 */

/**
 * Implements hook_views_plugins().
 */
function views_tabbed_content_views_plugins() {
  $plugins = array();

  $plugins['style'] = array(
    'accordian_tabs' => array(
      'title' => t('Tabbed Content: Accordian'),
      'handler' => 'views_plugin_style_accordian_tabs',
      'path' => drupal_get_path('module', 'views_tabbed_content') . '/includes',
      'parent' => 'views_plugin_style_default',
      'uses options' => TRUE,
      'help' => t('Renders the full views output in accordian tabs'),
      'theme' => 'views_view_accordian_tabs',
      'type' => 'normal',
      'uses row plugin' => TRUE,
      'uses fields' => TRUE,
      'uses row class' => TRUE,
      'uses grouping' => TRUE,
    ),
    'horizontal_tabs' => array(
      'title' => t('Tabbed Content: Horizontal'),
      'handler' => 'views_plugin_style_horizontal_tabs',
      'path' => drupal_get_path('module', 'views_tabbed_content') . '/includes',
      'parent' => 'views_plugin_style_default',
      'uses options' => TRUE,
      'help' => t('Renders the full views output in a horizontal tabs'),
      'theme' => 'views_view_horizontal_tabs',
      'type' => 'normal',
      'uses row plugin' => TRUE,
      'uses fields' => TRUE,
      'uses row class' => TRUE,
      'uses grouping' => TRUE,
    ),
    'vertical_tabs' => array(
      'title' => t('Tabbed Content: Vertical'),
      'handler' => 'views_plugin_style_vertical_tabs',
      'path' => drupal_get_path('module', 'views_tabbed_content') . '/includes',
      'parent' => 'views_plugin_style_default',
      'uses options' => TRUE,
      'help' => t('Renders the full views output in a vertical tabs'),
      'theme' => 'views_view_vertical_tabs',
      'type' => 'normal',
      'uses row plugin' => TRUE,
      'uses fields' => TRUE,
      'uses row class' => TRUE,
      'uses grouping' => TRUE,
    ),
  );

  return $plugins;
}
