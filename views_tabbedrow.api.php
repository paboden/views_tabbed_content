<?php

/**
 * @file
 * Hooks provided by Views tabbedrow.
 */

/**
 * @addtogroup hooks
 * @{
 */

/**
 * Define the type of the tabbedrow (eg.: cycle, imageflow, ddblock).
 *
 * @return
 *  Associative array of tabbedrow type and its information.
 */
function hook_views_tabbedrow_tabbedrow_info() {
  $options = array(
    'views_tabbedrow_cycle' => array(
      'name' => t('Cycle'),
      'accepts' => array(
        'goToSlide',
        'nextSlide',
        'pause',
        'play',
        'previousSlide',
      ),
      'calls' => array(
        'transitionBegin',
        'transitionEnd',
        'goToSlide',
        'pause',
        'play',
        'nextSlide',
        'previousSlide',
      ),
    ),
  );
  return $options;
}

/**
 * Define form fields to be displayed in the views settings form.
 * These fields would help configure your tabbedrow type.
 */
function hook_views_tabbedrow_tabbedrow_type_form(&$form, &$form_state, &$view) {
  $form['views_tabbedrow_cycle']['effect'] = array(
    '#type' => 'select',
    '#title' => t('Effect'),
    '#options' => $effects,
    '#default_value' => $view->options['views_tabbedrow_cycle']['effect'],
    '#description' => t('The transition effect that will be used to change between images. Not all options below may be relevant depending on the effect. ' . l('Follow this link to see examples of each effect.', 'http://jquery.malsup.com/cycle/browser.html', array('attributes' => array('target' => '_blank')))),
  );
}

/**
 * Set default values for your form fields specified in hook_views_tabbedrow_type_form
 *
 * @return
 *  Associative array of tabbedrow type name and options.
 */
function hook_views_tabbedrow_option_definition() {
  $options['views_tabbedrow_cycle'] = array(
    'contains' => array(
      // Transition
      'effect' => array('default' => 'fade'),
      'transition_advanced' => array('default' => 0),
      'timeout' => array('default' => 5000),
      'speed' => array('default' => 700), //normal
      'delay' => array('default' => 0),
      'sync' => array('default' => 1),
      'random' => array('default' => 0),
    )
  );
  return $options;
}

/**
 * Form validation callback for the tabbedrow settings.
 */
function hook_views_tabbedrow_options_form_validate(&$form, &$form_state, &$view) {
  if (!is_numeric($form_state['values']['style_options']['views_tabbedrow_cycle']['speed'])) {
    form_error($form['views_tabbedrow_cycle']['speed'], t('!setting must be numeric!', array('Speed')));
  }
  if (!is_numeric($form_state['values']['style_options']['views_tabbedrow_cycle']['timeout'])) {
    form_error($form['views_tabbedrow_cycle']['speed'], t('!setting must be numeric!', array('timeout')));
  }
  if (!is_numeric($form_state['values']['style_options']['views_tabbedrow_cycle']['remember_slide_days'])) {
    form_error($form['views_tabbedrow_cycle']['remember_slide_days'], t('!setting must be numeric!', array('Slide days')));
  }
}

/**
 * Form submission callback for the tabbedrow settings.
 */
function hook_views_tabbedrow_options_form_submit($form, &$form_state) {
  // Act on option submission.
}

/**
 * Define tabbedrow skins to be available to the end user.
 */
function hook_views_tabbedrow_skin_info() {
  return array(
    'default' => array(
      'name' => t('Default'),
    ),
  );
}

/**
 * Define new widgets (pagers, controls, counters).
 *
 * Available events for accepts and calls
 *  - pause
 *  - play
 *  - nextSlide
 *  - previousSlide
 *  - goToSlide
 *  - transitionBegin
 *  - transitionEnd
 *
 * @return
 *  Array keyed by the widget names.
 */
function hook_views_tabbedrow_widget_info() {
  return array(
    'views_tabbedrow_pager' => array(
      'name' => t('Pager'),
      'accepts' => array(
        'transitionBegin' => array('required' => TRUE),
        'goToSlide',
        'previousSlide',
        'nextSlide',
      ),
      'calls' => array(
        'goToSlide',
        'pause',
        'play',
      ),
    ),
    'views_tabbedrow_controls' => array(
      'name' => t('Controls'),
      'accepts' => array(
        'pause' => array('required' => TRUE),
        'play' => array('required' => TRUE),
      ),
      'calls' => array(
        'nextSlide',
        'pause',
        'play',
        'previousSlide',
      ),
    ),
    'views_tabbedrow_slide_counter' => array(
      'name' => t('Slide Counter'),
      'accepts' => array(
        'transitionBegin' => array('required' => TRUE),
        'goToSlide',
        'previousSlide',
        'nextSlide',
      ),
      'calls' => array(),
    ),
  );
}

/**
 * Form fields to be added for a specific widget type. Example of a widget type would be views_tabbedrow_pager or views_tabbedrow_slide_counter.
 */
function INSERT_WIDGET_TYPE_HERE_views_tabbedrow_widget_form_options(&$form, $form_state, $view, $defaults, $dependency) {
}

/**
 * Hook called by the pager widget to configure it, the fields that should be shown.
 */
function hook_views_tabbedrow_widget_pager_info($view) {
}

/**
 * Hook called by the pager widget to add form items.
 */
function INSERT_WIDGET_TYPE_HERE_views_tabbedrow_widget_pager_form_options(&$form, &$form_state, &$view, $defaults, $dependency) {
}

/**
 * Hook called by the controls widget to configure it, the fields that should be shown.
 */
function hook_views_tabbedrow_widget_controls_info($view) {
}

/**
 * Hook called by the controls widget to add form items.
 */
function INSERT_WIDGET_TYPE_HERE_views_tabbedrow_widget_controls_form_options(&$form, &$form_state, &$view, $defaults, $dependency) {
}

/**
 * @} End of "addtogroup hooks".
 */
