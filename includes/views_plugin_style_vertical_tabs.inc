<?php

/**
 * @file
 * Contains views_plugin_style_vertical_tabs.
 */

/**
 * Defines a style plugin that renders the full view as vertical_tabs.
 *
 * @ingroup views_style_plugins
 */
class views_plugin_style_vertical_tabs extends views_plugin_style_default {

  /**
   * Overrides views_plugin_style::options_definition().
   */
  function option_definition() {
    $options = parent::option_definition();

    $options['title'] = array('default' => '');
    $options['description'] = array('default' => '');
    $options['summary'] = array('default' => '');

    return $options;
  }

  /**
   * Overrides views_plugin_style::options_form().
   */
  function options_form(&$form, &$form_state) {
    parent::options_form($form, $form_state);
    $options = array('' => t('- None -'));
    $field_labels = $this->display->handler->get_field_labels(TRUE);
    $options += $field_labels;

    $form['title'] = array(
      '#type' => 'select',
      '#title' => t('Tab Title'),
      '#options' => $options,
      '#default_value' => $this->options['title'],
      '#description' => t('Choose the title of each tab.'),
      '#weight' => -49,
    );

    $form['summary'] = array(
      '#type' => 'select',
      '#title' => t('Tab Summary'),
      '#options' => $options,
      '#default_value' => $this->options['summary'],
      '#description' => t('Optional tab summary.'),
      '#weight' => -48,
    );

    $form['description'] = array(
      '#type' => 'select',
      '#title' => t('Fieldset Description'),
      '#options' => $options,
      '#default_value' => $this->options['description'],
      '#description' => t('Optional tab description.'),
      '#weight' => -47,
    );
  }

}
