(function ($) {
  Drupal.viewstabbedrow = Drupal.viewstabbedrow || {};

  /**
   * Views tabbedrow Controls
   */
  Drupal.viewstabbedrowControls = Drupal.viewstabbedrowControls || {};

  /**
   * Implement the play hook for controls.
   */
  Drupal.viewstabbedrowControls.play = function (options) {
    // Route the control call to the correct control type.
    // Need to use try catch so we don't have to check to make sure every part
    // of the object is defined.
    try {
      if (typeof Drupal.settings.viewstabbedrowControls[options.tabbedrowID].top.type != "undefined" && typeof Drupal[Drupal.settings.viewstabbedrowControls[options.tabbedrowID].top.type].play == 'function') {
        Drupal[Drupal.settings.viewstabbedrowControls[options.tabbedrowID].top.type].play(options);
      }
    }
    catch(err) {
      // Don't need to do anything on error.
    }

    try {
      if (typeof Drupal.settings.viewstabbedrowControls[options.tabbedrowID].bottom.type != "undefined" && typeof Drupal[Drupal.settings.viewstabbedrowControls[options.tabbedrowID].bottom.type].play == 'function') {
        Drupal[Drupal.settings.viewstabbedrowControls[options.tabbedrowID].bottom.type].play(options);
      }
    }
    catch(err) {
      // Don't need to do anything on error.
    }
  };

  /**
   * Implement the pause hook for controls.
   */
  Drupal.viewstabbedrowControls.pause = function (options) {
    // Route the control call to the correct control type.
    // Need to use try catch so we don't have to check to make sure every part
    // of the object is defined.
    try {
      if (typeof Drupal.settings.viewstabbedrowControls[options.tabbedrowID].top.type != "undefined" && typeof Drupal[Drupal.settings.viewstabbedrowControls[options.tabbedrowID].top.type].pause == 'function') {
        Drupal[Drupal.settings.viewstabbedrowControls[options.tabbedrowID].top.type].pause(options);
      }
    }
    catch(err) {
      // Don't need to do anything on error.
    }

    try {
      if (typeof Drupal.settings.viewstabbedrowControls[options.tabbedrowID].bottom.type != "undefined" && typeof Drupal[Drupal.settings.viewstabbedrowControls[options.tabbedrowID].bottom.type].pause == 'function') {
        Drupal[Drupal.settings.viewstabbedrowControls[options.tabbedrowID].bottom.type].pause(options);
      }
    }
    catch(err) {
      // Don't need to do anything on error.
    }
  };


  /**
   * Views tabbedrow Text Controls
   */

  // Add views slieshow api calls for views tabbedrow text controls.
  Drupal.behaviors.viewstabbedrowControlsText = {
    attach: function (context) {

      // Process previous link
      $('.views_tabbedrow_controls_text_previous:not(.views-tabbedrow-controls-text-previous-processed)', context).addClass('views-tabbedrow-controls-text-previous-processed').each(function() {
        var uniqueID = $(this).attr('id').replace('views_tabbedrow_controls_text_previous_', '');
        $(this).click(function() {
          Drupal.viewstabbedrow.action({ "action": 'previousSlide', "tabbedrowID": uniqueID });
          return false;
        });
      });

      // Process next link
      $('.views_tabbedrow_controls_text_next:not(.views-tabbedrow-controls-text-next-processed)', context).addClass('views-tabbedrow-controls-text-next-processed').each(function() {
        var uniqueID = $(this).attr('id').replace('views_tabbedrow_controls_text_next_', '');
        $(this).click(function() {
          Drupal.viewstabbedrow.action({ "action": 'nextSlide', "tabbedrowID": uniqueID });
          return false;
        });
      });

      // Process pause link
      $('.views_tabbedrow_controls_text_pause:not(.views-tabbedrow-controls-text-pause-processed)', context).addClass('views-tabbedrow-controls-text-pause-processed').each(function() {
        var uniqueID = $(this).attr('id').replace('views_tabbedrow_controls_text_pause_', '');
        $(this).click(function() {
          if (Drupal.settings.viewstabbedrow[uniqueID].paused) {
            Drupal.viewstabbedrow.action({ "action": 'play', "tabbedrowID": uniqueID, "force": true });
          }
          else {
            Drupal.viewstabbedrow.action({ "action": 'pause', "tabbedrowID": uniqueID, "force": true });
          }
          return false;
        });
      });
    }
  };

  Drupal.viewstabbedrowControlsText = Drupal.viewstabbedrowControlsText || {};

  /**
   * Implement the pause hook for text controls.
   */
  Drupal.viewstabbedrowControlsText.pause = function (options) {
    var pauseText = Drupal.theme.prototype['viewstabbedrowControlsPause'] ? Drupal.theme('viewstabbedrowControlsPause') : '';
    $('#views_tabbedrow_controls_text_pause_' + options.tabbedrowID + ' a').text(pauseText);
    $('#views_tabbedrow_controls_text_pause_' + options.tabbedrowID).removeClass('views-tabbedrow-controls-text-status-play');
    $('#views_tabbedrow_controls_text_pause_' + options.tabbedrowID).addClass('views-tabbedrow-controls-text-status-pause');
  };

  /**
   * Implement the play hook for text controls.
   */
  Drupal.viewstabbedrowControlsText.play = function (options) {
    var playText = Drupal.theme.prototype['viewstabbedrowControlsPlay'] ? Drupal.theme('viewstabbedrowControlsPlay') : '';
    $('#views_tabbedrow_controls_text_pause_' + options.tabbedrowID + ' a').text(playText);
    $('#views_tabbedrow_controls_text_pause_' + options.tabbedrowID).removeClass('views-tabbedrow-controls-text-status-pause');
    $('#views_tabbedrow_controls_text_pause_' + options.tabbedrowID).addClass('views-tabbedrow-controls-text-status-play');
  };

  // Theme the resume control.
  Drupal.theme.prototype.viewstabbedrowControlsPause = function () {
    return Drupal.t('Resume');
  };

  // Theme the pause control.
  Drupal.theme.prototype.viewstabbedrowControlsPlay = function () {
    return Drupal.t('Pause');
  };

  /**
   * Views tabbedrow Pager
   */
  Drupal.viewstabbedrowPager = Drupal.viewstabbedrowPager || {};

  /**
   * Implement the transitionBegin hook for pagers.
   */
  Drupal.viewstabbedrowPager.transitionBegin = function (options) {
    // Route the pager call to the correct pager type.
    // Need to use try catch so we don't have to check to make sure every part
    // of the object is defined.
    try {
      if (typeof Drupal.settings.viewstabbedrowPager != "undefined" && typeof Drupal.settings.viewstabbedrowPager[options.tabbedrowID].top.type != "undefined" && typeof Drupal[Drupal.settings.viewstabbedrowPager[options.tabbedrowID].top.type].transitionBegin == 'function') {
        Drupal[Drupal.settings.viewstabbedrowPager[options.tabbedrowID].top.type].transitionBegin(options);
      }
    }
    catch(err) {
      // Don't need to do anything on error.
    }

    try {
      if (typeof Drupal.settings.viewstabbedrowPager != "undefined" && typeof Drupal.settings.viewstabbedrowPager[options.tabbedrowID].bottom.type != "undefined" && typeof Drupal[Drupal.settings.viewstabbedrowPager[options.tabbedrowID].bottom.type].transitionBegin == 'function') {
        Drupal[Drupal.settings.viewstabbedrowPager[options.tabbedrowID].bottom.type].transitionBegin(options);
      }
    }
    catch(err) {
      // Don't need to do anything on error.
    }
  };

  /**
   * Implement the goToSlide hook for pagers.
   */
  Drupal.viewstabbedrowPager.goToSlide = function (options) {
    // Route the pager call to the correct pager type.
    // Need to use try catch so we don't have to check to make sure every part
    // of the object is defined.
    try {
      if (typeof Drupal.settings.viewstabbedrowPager[options.tabbedrowID].top.type != "undefined" && typeof Drupal[Drupal.settings.viewstabbedrowPager[options.tabbedrowID].top.type].goToSlide == 'function') {
        Drupal[Drupal.settings.viewstabbedrowPager[options.tabbedrowID].top.type].goToSlide(options);
      }
    }
    catch(err) {
      // Don't need to do anything on error.
    }

    try {
      if (typeof Drupal.settings.viewstabbedrowPager[options.tabbedrowID].bottom.type != "undefined" && typeof Drupal[Drupal.settings.viewstabbedrowPager[options.tabbedrowID].bottom.type].goToSlide == 'function') {
        Drupal[Drupal.settings.viewstabbedrowPager[options.tabbedrowID].bottom.type].goToSlide(options);
      }
    }
    catch(err) {
      // Don't need to do anything on error.
    }
  };

  /**
   * Implement the previousSlide hook for pagers.
   */
  Drupal.viewstabbedrowPager.previousSlide = function (options) {
    // Route the pager call to the correct pager type.
    // Need to use try catch so we don't have to check to make sure every part
    // of the object is defined.
    try {
      if (typeof Drupal.settings.viewstabbedrowPager[options.tabbedrowID].top.type != "undefined" && typeof Drupal[Drupal.settings.viewstabbedrowPager[options.tabbedrowID].top.type].previousSlide == 'function') {
        Drupal[Drupal.settings.viewstabbedrowPager[options.tabbedrowID].top.type].previousSlide(options);
      }
    }
    catch(err) {
      // Don't need to do anything on error.
    }

    try {
      if (typeof Drupal.settings.viewstabbedrowPager[options.tabbedrowID].bottom.type != "undefined" && typeof Drupal[Drupal.settings.viewstabbedrowPager[options.tabbedrowID].bottom.type].previousSlide == 'function') {
        Drupal[Drupal.settings.viewstabbedrowPager[options.tabbedrowID].bottom.type].previousSlide(options);
      }
    }
    catch(err) {
      // Don't need to do anything on error.
    }
  };

  /**
   * Implement the nextSlide hook for pagers.
   */
  Drupal.viewstabbedrowPager.nextSlide = function (options) {
    // Route the pager call to the correct pager type.
    // Need to use try catch so we don't have to check to make sure every part
    // of the object is defined.
    try {
      if (typeof Drupal.settings.viewstabbedrowPager[options.tabbedrowID].top.type != "undefined" && typeof Drupal[Drupal.settings.viewstabbedrowPager[options.tabbedrowID].top.type].nextSlide == 'function') {
        Drupal[Drupal.settings.viewstabbedrowPager[options.tabbedrowID].top.type].nextSlide(options);
      }
    }
    catch(err) {
      // Don't need to do anything on error.
    }

    try {
      if (typeof Drupal.settings.viewstabbedrowPager[options.tabbedrowID].bottom.type != "undefined" && typeof Drupal[Drupal.settings.viewstabbedrowPager[options.tabbedrowID].bottom.type].nextSlide == 'function') {
        Drupal[Drupal.settings.viewstabbedrowPager[options.tabbedrowID].bottom.type].nextSlide(options);
      }
    }
    catch(err) {
      // Don't need to do anything on error.
    }
  };


  /**
   * Views tabbedrow Pager Fields
   */

  // Add views slieshow api calls for views tabbedrow pager fields.
  Drupal.behaviors.viewstabbedrowPagerFields = {
    attach: function (context) {
      // Process pause on hover.
      $('.views_tabbedrow_pager_field:not(.views-tabbedrow-pager-field-processed)', context).addClass('views-tabbedrow-pager-field-processed').each(function() {
        // Parse out the location and unique id from the full id.
        var pagerInfo = $(this).attr('id').split('_');
        var location = pagerInfo[2];
        pagerInfo.splice(0, 3);
        var uniqueID = pagerInfo.join('_');

        // Add the activate and pause on pager hover event to each pager item.
        if (Drupal.settings.viewstabbedrowPagerFields[uniqueID][location].activatePauseOnHover) {
          $(this).children().each(function(index, pagerItem) {
            var mouseIn = function() {
              Drupal.viewstabbedrow.action({ "action": 'goToSlide', "tabbedrowID": uniqueID, "slideNum": index });
              Drupal.viewstabbedrow.action({ "action": 'pause', "tabbedrowID": uniqueID });
            };

            var mouseOut = function() {
              Drupal.viewstabbedrow.action({ "action": 'play', "tabbedrowID": uniqueID });
            };

            if (jQuery.fn.hoverIntent) {
              $(pagerItem).hoverIntent(mouseIn, mouseOut);
            }
            else {
              $(pagerItem).hover(mouseIn, mouseOut);
            }
          });
        }
        else {
          $(this).children().each(function(index, pagerItem) {
            $(pagerItem).click(function() {
              Drupal.viewstabbedrow.action({ "action": 'goToSlide', "tabbedrowID": uniqueID, "slideNum": index });
            });
          });
        }
      });
    }
  };

  Drupal.viewstabbedrowPagerFields = Drupal.viewstabbedrowPagerFields || {};

  /**
   * Implement the transitionBegin hook for pager fields pager.
   */
  Drupal.viewstabbedrowPagerFields.transitionBegin = function (options) {
    for (pagerLocation in Drupal.settings.viewstabbedrowPager[options.tabbedrowID]) {
      // Remove active class from pagers
      $('[id^="views_tabbedrow_pager_field_item_' + pagerLocation + '_' + options.tabbedrowID + '"]').removeClass('active');

      // Add active class to active pager.
      $('#views_tabbedrow_pager_field_item_'+ pagerLocation + '_' + options.tabbedrowID + '_' + options.slideNum).addClass('active');
    }
  };

  /**
   * Implement the goToSlide hook for pager fields pager.
   */
  Drupal.viewstabbedrowPagerFields.goToSlide = function (options) {
    for (pagerLocation in Drupal.settings.viewstabbedrowPager[options.tabbedrowID]) {
      // Remove active class from pagers
      $('[id^="views_tabbedrow_pager_field_item_' + pagerLocation + '_' + options.tabbedrowID + '"]').removeClass('active');

      // Add active class to active pager.
      $('#views_tabbedrow_pager_field_item_' + pagerLocation + '_' + options.tabbedrowID + '_' + options.slideNum).addClass('active');
    }
  };

  /**
   * Implement the previousSlide hook for pager fields pager.
   */
  Drupal.viewstabbedrowPagerFields.previousSlide = function (options) {
    for (pagerLocation in Drupal.settings.viewstabbedrowPager[options.tabbedrowID]) {
      // Get the current active pager.
      var pagerNum = $('[id^="views_tabbedrow_pager_field_item_' + pagerLocation + '_' + options.tabbedrowID + '"].active').attr('id').replace('views_tabbedrow_pager_field_item_' + pagerLocation + '_' + options.tabbedrowID + '_', '');

      // If we are on the first pager then activate the last pager.
      // Otherwise activate the previous pager.
      if (pagerNum == 0) {
        pagerNum = $('[id^="views_tabbedrow_pager_field_item_' + pagerLocation + '_' + options.tabbedrowID + '"]').length() - 1;
      }
      else {
        pagerNum--;
      }

      // Remove active class from pagers
      $('[id^="views_tabbedrow_pager_field_item_' + pagerLocation + '_' + options.tabbedrowID + '"]').removeClass('active');

      // Add active class to active pager.
      $('#views_tabbedrow_pager_field_item_' + pagerLocation + '_' + options.tabbedrowID + '_' + pagerNum).addClass('active');
    }
  };

  /**
   * Implement the nextSlide hook for pager fields pager.
   */
  Drupal.viewstabbedrowPagerFields.nextSlide = function (options) {
    for (pagerLocation in Drupal.settings.viewstabbedrowPager[options.tabbedrowID]) {
      // Get the current active pager.
      var pagerNum = $('[id^="views_tabbedrow_pager_field_item_' + pagerLocation + '_' + options.tabbedrowID + '"].active').attr('id').replace('views_tabbedrow_pager_field_item_' + pagerLocation + '_' + options.tabbedrowID + '_', '');
      var totalPagers = $('[id^="views_tabbedrow_pager_field_item_' + pagerLocation + '_' + options.tabbedrowID + '"]').length();

      // If we are on the last pager then activate the first pager.
      // Otherwise activate the next pager.
      pagerNum++;
      if (pagerNum == totalPagers) {
        pagerNum = 0;
      }

      // Remove active class from pagers
      $('[id^="views_tabbedrow_pager_field_item_' + pagerLocation + '_' + options.tabbedrowID + '"]').removeClass('active');

      // Add active class to active pager.
      $('#views_tabbedrow_pager_field_item_' + pagerLocation + '_' + options.tabbedrowID + '_' + slideNum).addClass('active');
    }
  };


  /**
   * Views tabbedrow Slide Counter
   */

  Drupal.viewstabbedrowSlideCounter = Drupal.viewstabbedrowSlideCounter || {};

  /**
   * Implement the transitionBegin for the slide counter.
   */
  Drupal.viewstabbedrowSlideCounter.transitionBegin = function (options) {
    $('#views_tabbedrow_slide_counter_' + options.tabbedrowID + ' .num').text(options.slideNum + 1);
  };

  /**
   * This is used as a router to process actions for the tabbedrow.
   */
  Drupal.viewstabbedrow.action = function (options) {
    // Set default values for our return status.
    var status = {
      'value': true,
      'text': ''
    };

    // If an action isn't specified return false.
    if (typeof options.action == 'undefined' || options.action == '') {
      status.value = false;
      status.text =  Drupal.t('There was no action specified.');
      return error;
    }

    // If we are using pause or play switch paused state accordingly.
    if (options.action == 'pause') {
      Drupal.settings.viewstabbedrow[options.tabbedrowID].paused = 1;
      // If the calling method is forcing a pause then mark it as such.
      if (options.force) {
        Drupal.settings.viewstabbedrow[options.tabbedrowID].pausedForce = 1;
      }
    }
    else if (options.action == 'play') {
      // If the tabbedrow isn't forced pause or we are forcing a play then play
      // the tabbedrow.
      // Otherwise return telling the calling method that it was forced paused.
      if (!Drupal.settings.viewstabbedrow[options.tabbedrowID].pausedForce || options.force) {
        Drupal.settings.viewstabbedrow[options.tabbedrowID].paused = 0;
        Drupal.settings.viewstabbedrow[options.tabbedrowID].pausedForce = 0;
      }
      else {
        status.value = false;
        status.text += ' ' + Drupal.t('This tabbedrow is forced paused.');
        return status;
      }
    }

    // We use a switch statement here mainly just to limit the type of actions
    // that are available.
    switch (options.action) {
      case "goToSlide":
      case "transitionBegin":
      case "transitionEnd":
        // The three methods above require a slide number. Checking if it is
        // defined and it is a number that is an integer.
        if (typeof options.slideNum == 'undefined' || typeof options.slideNum !== 'number' || parseInt(options.slideNum) != (options.slideNum - 0)) {
          status.value = false;
          status.text = Drupal.t('An invalid integer was specified for slideNum.');
        }
      case "pause":
      case "play":
      case "nextSlide":
      case "previousSlide":
        // Grab our list of methods.
        var methods = Drupal.settings.viewstabbedrow[options.tabbedrowID]['methods'];

        // if the calling method specified methods that shouldn't be called then
        // exclude calling them.
        var excludeMethodsObj = {};
        if (typeof options.excludeMethods !== 'undefined') {
          // We need to turn the excludeMethods array into an object so we can use the in
          // function.
          for (var i=0; i < excludeMethods.length; i++) {
            excludeMethodsObj[excludeMethods[i]] = '';
          }
        }

        // Call every registered method and don't call excluded ones.
        for (i = 0; i < methods[options.action].length; i++) {
          if (Drupal[methods[options.action][i]] != undefined && typeof Drupal[methods[options.action][i]][options.action] == 'function' && !(methods[options.action][i] in excludeMethodsObj)) {
            Drupal[methods[options.action][i]][options.action](options);
          }
        }
        break;

      // If it gets here it's because it's an invalid action.
      default:
        status.value = false;
        status.text = Drupal.t('An invalid action "!action" was specified.', { "!action": options.action });
    }
    return status;
  };
})(jQuery);
