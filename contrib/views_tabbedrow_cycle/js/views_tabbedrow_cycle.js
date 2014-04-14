
/**
 *  @file
 *  A simple jQuery Cycle Div tabbedrow Rotator.
 */

/**
 * This will set our initial behavior, by starting up each individual tabbedrow.
 */
(function ($) {
  Drupal.behaviors.viewstabbedrowCycle = {
    attach: function (context) {
      $('.views_tabbedrow_cycle_main:not(.viewstabbedrowCycle-processed)', context).addClass('viewstabbedrowCycle-processed').each(function() {
        var fullId = '#' + $(this).attr('id');
        var settings = Drupal.settings.viewstabbedrowCycle[fullId];
        settings.targetId = '#' + $(fullId + " :first").attr('id');

        settings.tabbedrowId = settings.targetId.replace('#views_tabbedrow_cycle_teaser_section_', '');
        // Pager after function.
        var pager_after_fn = function(curr, next, opts) {
          // Need to do some special handling on first load.
          var slideNum = opts.currSlide;
          if (typeof settings.processedAfter == 'undefined' || !settings.processedAfter) {
            settings.processedAfter = 1;
            slideNum = (typeof settings.opts.startingSlide == 'undefined') ? 0 : settings.opts.startingSlide;
          }
          Drupal.viewstabbedrow.action({ "action": 'transitionEnd', "tabbedrowID": settings.tabbedrowId, "slideNum": slideNum });
        }
        // Pager before function.
        var pager_before_fn = function(curr, next, opts) {
          var slideNum = opts.nextSlide;

          // Remember last slide.
          if (settings.remember_slide) {
            createCookie(settings.vss_id, slideNum, settings.remember_slide_days);
          }

          // Make variable height.
          if (!settings.fixed_height) {
            //get the height of the current slide
            var $ht = $(next).height();
            //set the container's height to that of the current slide
            $(next).parent().animate({height: $ht});
          }

          // Need to do some special handling on first load.
          if (typeof settings.processedBefore == 'undefined' || !settings.processedBefore) {
            settings.processedBefore = 1;
            slideNum = (typeof opts.startingSlide == 'undefined') ? 0 : opts.startingSlide;
          }

          Drupal.viewstabbedrow.action({ "action": 'transitionBegin', "tabbedrowID": settings.tabbedrowId, "slideNum": slideNum });
        }
        settings.loaded = false;

        settings.opts = {
          speed:settings.speed,
          timeout:settings.timeout,
          delay:settings.delay,
          sync:settings.sync,
          random:settings.random,
          nowrap:settings.nowrap,
          after:pager_after_fn,
          before:pager_before_fn,
          cleartype:(settings.cleartype)? true : false,
          cleartypeNoBg:(settings.cleartypenobg)? true : false
        }

        // Set the starting slide if we are supposed to remember the slide
        if (settings.remember_slide) {
          var startSlide = readCookie(settings.vss_id);
          if (startSlide == null) {
            startSlide = 0;
          }
          settings.opts.startingSlide = parseInt(startSlide);
        }

        if (settings.effect == 'none') {
          settings.opts.speed = 1;
        }
        else {
          settings.opts.fx = settings.effect;
        }

        // Take starting item from fragment.
        var hash = location.hash;
        if (hash) {
          var hash = hash.replace('#', '');
          var aHash = hash.split(';');
          var aHashLen = aHash.length;

          // Loop through all the possible starting points.
          for (var i = 0; i < aHashLen; i++) {
            // Split the hash into two parts. One part is the tabbedrow id the
            // other is the slide number.
            var initialInfo = aHash[i].split(':');
            // The id in the hash should match our tabbedrow.
            // The slide number chosen shouldn't be larger than the number of
            // slides we have.
            if (settings.tabbedrowId == initialInfo[0] && settings.num_divs > initialInfo[1]) {
              settings.opts.startingSlide = parseInt(initialInfo[1]);
            }
          }
        }

        // Pause on hover.
        if (settings.pause) {
          var mouseIn = function() {
            Drupal.viewstabbedrow.action({ "action": 'pause', "tabbedrowID": settings.tabbedrowId });
          }

          var mouseOut = function() {
            Drupal.viewstabbedrow.action({ "action": 'play', "tabbedrowID": settings.tabbedrowId });
          }

          if (jQuery.fn.hoverIntent) {
            $('#views_tabbedrow_cycle_teaser_section_' + settings.vss_id).hoverIntent(mouseIn, mouseOut);
          }
          else {
            $('#views_tabbedrow_cycle_teaser_section_' + settings.vss_id).hover(mouseIn, mouseOut);
          }
        }

        // Pause on clicking of the slide.
        if (settings.pause_on_click) {
          $('#views_tabbedrow_cycle_teaser_section_' + settings.vss_id).click(function() {
            Drupal.viewstabbedrow.action({ "action": 'pause', "tabbedrowID": settings.tabbedrowId, "force": true });
          });
        }

        if (typeof JSON != 'undefined') {
          var advancedOptions = JSON.parse(settings.advanced_options);
          for (var option in advancedOptions) {
            switch(option) {

              // Standard Options
              case "activePagerClass":
              case "allowPagerClickBubble":
              case "autostop":
              case "autostopCount":
              case "backwards":
              case "bounce":
              case "cleartype":
              case "cleartypeNoBg":
              case "containerResize":
              case "continuous":
              case "delay":
              case "easeIn":
              case "easeOut":
              case "easing":
              case "fastOnEvent":
              case "fit":
              case "fx":
              case "height":
              case "manualTrump":
              case "metaAttr":
              case "next":
              case "nowrap":
              case "pager":
              case "pagerEvent":
              case "pause":
              case "pauseOnPagerHover":
              case "prev":
              case "prevNextEvent":
              case "random":
              case "randomizeEffects":
              case "requeueOnImageNotLoaded":
              case "requeueTimeout":
              case "rev":
              case "slideExpr":
              case "slideResize":
              case "speed":
              case "speedIn":
              case "speedOut":
              case "startingSlide":
              case "sync":
              case "timeout":
              case "width":
                var optionValue = advancedOptions[option];
                optionValue = Drupal.viewstabbedrowCycle.advancedOptionCleanup(optionValue);
                settings.opts[option] = optionValue;
                break;

              // These process options that look like {top:50, bottom:20}
              case "animIn":
              case "animOut":
              case "cssBefore":
              case "cssAfter":
              case "shuffle":
                var cssValue = advancedOptions[option];
                cssValue = Drupal.viewstabbedrowCycle.advancedOptionCleanup(cssValue);
                settings.opts[option] = eval('(' + cssValue + ')');
                break;

              // These options have their own functions.
              case "after":
                var afterValue = advancedOptions[option];
                afterValue = Drupal.viewstabbedrowCycle.advancedOptionCleanup(afterValue);
                // transition callback (scope set to element that was shown): function(currSlideElement, nextSlideElement, options, forwardFlag)
                settings.opts[option] = function(currSlideElement, nextSlideElement, options, forwardFlag) {
                  pager_after_fn(currSlideElement, nextSlideElement, options);
                  eval(afterValue);
                }
                break;

              case "before":
                var beforeValue = advancedOptions[option];
                beforeValue = Drupal.viewstabbedrowCycle.advancedOptionCleanup(beforeValue);
                // transition callback (scope set to element to be shown):     function(currSlideElement, nextSlideElement, options, forwardFlag)
                settings.opts[option] = function(currSlideElement, nextSlideElement, options, forwardFlag) {
                  pager_before_fn(currSlideElement, nextSlideElement, options);
                  eval(beforeValue);
                }
                break;

              case "end":
                var endValue = advancedOptions[option];
                endValue = Drupal.viewstabbedrowCycle.advancedOptionCleanup(endValue);
                // callback invoked when the tabbedrow terminates (use with autostop or nowrap options): function(options)
                settings.opts[option] = function(options) {
                  eval(endValue);
                }
                break;

              case "fxFn":
                var fxFnValue = advancedOptions[option];
                fxFnValue = Drupal.viewstabbedrowCycle.advancedOptionCleanup(fxFnValue);
                // function used to control the transition: function(currSlideElement, nextSlideElement, options, afterCalback, forwardFlag)
                settings.opts[option] = function(currSlideElement, nextSlideElement, options, afterCalback, forwardFlag) {
                  eval(fxFnValue);
                }
                break;

              case "onPagerEvent":
                var onPagerEventValue = advancedOptions[option];
                onPagerEventValue = Drupal.viewstabbedrowCycle.advancedOptionCleanup(onPagerEventValue);
                settings.opts[option] = function(zeroBasedSlideIndex, slideElement) {
                  eval(onPagerEventValue);
                }
                break;

              case "onPrevNextEvent":
                var onPrevNextEventValue = advancedOptions[option];
                onPrevNextEventValue = Drupal.viewstabbedrowCycle.advancedOptionCleanup(onPrevNextEventValue);
                settings.opts[option] = function(isNext, zeroBasedSlideIndex, slideElement) {
                  eval(onPrevNextEventValue);
                }
                break;

              case "pagerAnchorBuilder":
                var pagerAnchorBuilderValue = advancedOptions[option];
                pagerAnchorBuilderValue = Drupal.viewstabbedrowCycle.advancedOptionCleanup(pagerAnchorBuilderValue);
                // callback fn for building anchor links:  function(index, DOMelement)
                settings.opts[option] = function(index, DOMelement) {
                  var returnVal = '';
                  eval(pagerAnchorBuilderValue);
                  return returnVal;
                }
                break;

              case "pagerClick":
                var pagerClickValue = advancedOptions[option];
                pagerClickValue = Drupal.viewstabbedrowCycle.advancedOptionCleanup(pagerClickValue);
                // callback fn for pager clicks:    function(zeroBasedSlideIndex, slideElement)
                settings.opts[option] = function(zeroBasedSlideIndex, slideElement) {
                  eval(pagerClickValue);
                }
                break;

              case "paused":
                var pausedValue = advancedOptions[option];
                pausedValue = Drupal.viewstabbedrowCycle.advancedOptionCleanup(pausedValue);
                // undocumented callback when tabbedrow is paused:    function(cont, opts, byHover)
                settings.opts[option] = function(cont, opts, byHover) {
                  eval(pausedValue);
                }
                break;

              case "resumed":
                var resumedValue = advancedOptions[option];
                resumedValue = Drupal.viewstabbedrowCycle.advancedOptionCleanup(resumedValue);
                // undocumented callback when tabbedrow is resumed:    function(cont, opts, byHover)
                settings.opts[option] = function(cont, opts, byHover) {
                  eval(resumedValue);
                }
                break;

              case "timeoutFn":
                var timeoutFnValue = advancedOptions[option];
                timeoutFnValue = Drupal.viewstabbedrowCycle.advancedOptionCleanup(timeoutFnValue);
                settings.opts[option] = function(currSlideElement, nextSlideElement, options, forwardFlag) {
                  eval(timeoutFnValue);
                }
                break;

              case "updateActivePagerLink":
                var updateActivePagerLinkValue = advancedOptions[option];
                updateActivePagerLinkValue = Drupal.viewstabbedrowCycle.advancedOptionCleanup(updateActivePagerLinkValue);
                // callback fn invoked to update the active pager link (adds/removes activePagerClass style)
                settings.opts[option] = function(pager, currSlideIndex) {
                  eval(updateActivePagerLinkValue);
                }
                break;
            }
          }
        }

        // If selected wait for the images to be loaded.
        // otherwise just load the tabbedrow.
        if (settings.wait_for_image_load) {
          // For IE/Chrome/Opera we if there are images then we need to make
          // sure the images are loaded before starting the tabbedrow.
          settings.totalImages = $(settings.targetId + ' img').length;
          if (settings.totalImages) {
            settings.loadedImages = 0;

            // Add a load event for each image.
            $(settings.targetId + ' img').each(function() {
              var $imageElement = $(this);
              $imageElement.bind('load', function () {
                Drupal.viewstabbedrowCycle.imageWait(fullId);
              });

              // Removing the source and adding it again will fire the load event.
              var imgSrc = $imageElement.attr('src');
              $imageElement.attr('src', '');
              $imageElement.attr('src', imgSrc);
            });

            // We need to set a timeout so that the tabbedrow doesn't wait
            // indefinitely for all images to load.
            setTimeout("Drupal.viewstabbedrowCycle.load('" + fullId + "')", settings.wait_for_image_load_timeout);
          }
          else {
            Drupal.viewstabbedrowCycle.load(fullId);
          }
        }
        else {
          Drupal.viewstabbedrowCycle.load(fullId);
        }
      });
    }
  };

  Drupal.viewstabbedrowCycle = Drupal.viewstabbedrowCycle || {};

  // Cleanup the values of advanced options.
  Drupal.viewstabbedrowCycle.advancedOptionCleanup = function(value) {
    value = $.trim(value);
    value = value.replace(/\n/g, '');
    if (!isNaN(parseInt(value))) {
      value = parseInt(value);
    }
    else if (value.toLowerCase() == 'true') {
      value = true;
    }
    else if (value.toLowerCase() == 'false') {
      value = false;
    }

    return value;
  }

  // This checks to see if all the images have been loaded.
  // If they have then it starts the tabbedrow.
  Drupal.viewstabbedrowCycle.imageWait = function(fullId) {
    if (++Drupal.settings.viewstabbedrowCycle[fullId].loadedImages == Drupal.settings.viewstabbedrowCycle[fullId].totalImages) {
      Drupal.viewstabbedrowCycle.load(fullId);
    }
  };

  // Start the tabbedrow.
  Drupal.viewstabbedrowCycle.load = function (fullId) {
    var settings = Drupal.settings.viewstabbedrowCycle[fullId];

    // Make sure the tabbedrow isn't already loaded.
    if (!settings.loaded) {
      $(settings.targetId).cycle(settings.opts);
      settings.loaded = true;

      // Start Paused
      if (settings.start_paused) {
        Drupal.viewstabbedrow.action({ "action": 'pause', "tabbedrowID": settings.tabbedrowId, "force": true });
      }

      // Pause if hidden.
      if (settings.pause_when_hidden) {
        var checkPause = function(settings) {
          // If the tabbedrow is visible and it is paused then resume.
          // otherwise if the tabbedrow is not visible and it is not paused then
          // pause it.
          var visible = viewstabbedrowCycleIsVisible(settings.targetId, settings.pause_when_hidden_type, settings.amount_allowed_visible);
          if (visible) {
            Drupal.viewstabbedrow.action({ "action": 'play', "tabbedrowID": settings.tabbedrowId });
          }
          else {
            Drupal.viewstabbedrow.action({ "action": 'pause', "tabbedrowID": settings.tabbedrowId });
          }
        }

        // Check when scrolled.
        $(window).scroll(function() {
         checkPause(settings);
        });

        // Check when the window is resized.
        $(window).resize(function() {
          checkPause(settings);
        });
      }
    }
  };

  Drupal.viewstabbedrowCycle.pause = function (options) {
    //Eat TypeError, cycle doesn't handle pause well if options isn't defined.
    try{
      if (options.pause_in_middle && $.fn.pause) {
        $('#views_tabbedrow_cycle_teaser_section_' + options.tabbedrowID).pause();
      }
      else {
        $('#views_tabbedrow_cycle_teaser_section_' + options.tabbedrowID).cycle('pause');
      }
    }
    catch(e){
      if(!e instanceof TypeError){
        throw e;
      }
    }
  };

  Drupal.viewstabbedrowCycle.play = function (options) {
    Drupal.settings.viewstabbedrowCycle['#views_tabbedrow_cycle_main_' + options.tabbedrowID].paused = false;
    if (options.pause_in_middle && $.fn.resume) {
      $('#views_tabbedrow_cycle_teaser_section_' + options.tabbedrowID).resume();
    }
    else {
      $('#views_tabbedrow_cycle_teaser_section_' + options.tabbedrowID).cycle('resume');
    }
  };

  Drupal.viewstabbedrowCycle.previousSlide = function (options) {
    $('#views_tabbedrow_cycle_teaser_section_' + options.tabbedrowID).cycle('prev');
  };

  Drupal.viewstabbedrowCycle.nextSlide = function (options) {
    $('#views_tabbedrow_cycle_teaser_section_' + options.tabbedrowID).cycle('next');
  };

  Drupal.viewstabbedrowCycle.goToSlide = function (options) {
    $('#views_tabbedrow_cycle_teaser_section_' + options.tabbedrowID).cycle(options.slideNum);
  };

  // Verify that the value is a number.
  function IsNumeric(sText) {
    var ValidChars = "0123456789";
    var IsNumber=true;
    var Char;

    for (var i=0; i < sText.length && IsNumber == true; i++) {
      Char = sText.charAt(i);
      if (ValidChars.indexOf(Char) == -1) {
        IsNumber = false;
      }
    }
    return IsNumber;
  }

  /**
   * Cookie Handling Functions
   */
  function createCookie(name,value,days) {
    if (days) {
      var date = new Date();
      date.setTime(date.getTime()+(days*24*60*60*1000));
      var expires = "; expires="+date.toGMTString();
    }
    else {
      var expires = "";
    }
    document.cookie = name+"="+value+expires+"; path=/";
  }

  function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
      var c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1,c.length);
      if (c.indexOf(nameEQ) == 0) {
        return c.substring(nameEQ.length,c.length);
      }
    }
    return null;
  }

  function eraseCookie(name) {
    createCookie(name,"",-1);
  }

  /**
   * Checks to see if the slide is visible enough.
   * elem = element to check.
   * type = The way to calculate how much is visible.
   * amountVisible = amount that should be visible. Either in percent or px. If
   *                it's not defined then all of the slide must be visible.
   *
   * Returns true or false
   */
  function viewstabbedrowCycleIsVisible(elem, type, amountVisible) {
    // Get the top and bottom of the window;
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();
    var docViewLeft = $(window).scrollLeft();
    var docViewRight = docViewLeft + $(window).width();

    // Get the top, bottom, and height of the slide;
    var elemTop = $(elem).offset().top;
    var elemHeight = $(elem).height();
    var elemBottom = elemTop + elemHeight;
    var elemLeft = $(elem).offset().left;
    var elemWidth = $(elem).width();
    var elemRight = elemLeft + elemWidth;
    var elemArea = elemHeight * elemWidth;

    // Calculate what's hiding in the slide.
    var missingLeft = 0;
    var missingRight = 0;
    var missingTop = 0;
    var missingBottom = 0;

    // Find out how much of the slide is missing from the left.
    if (elemLeft < docViewLeft) {
      missingLeft = docViewLeft - elemLeft;
    }

    // Find out how much of the slide is missing from the right.
    if (elemRight > docViewRight) {
      missingRight = elemRight - docViewRight;
    }

    // Find out how much of the slide is missing from the top.
    if (elemTop < docViewTop) {
      missingTop = docViewTop - elemTop;
    }

    // Find out how much of the slide is missing from the bottom.
    if (elemBottom > docViewBottom) {
      missingBottom = elemBottom - docViewBottom;
    }

    // If there is no amountVisible defined then check to see if the whole slide
    // is visible.
    if (type == 'full') {
      return ((elemBottom >= docViewTop) && (elemTop <= docViewBottom)
      && (elemBottom <= docViewBottom) &&  (elemTop >= docViewTop)
      && (elemLeft >= docViewLeft) && (elemRight <= docViewRight)
      && (elemLeft <= docViewRight) && (elemRight >= docViewLeft));
    }
    else if(type == 'vertical') {
      var verticalShowing = elemHeight - missingTop - missingBottom;

      // If user specified a percentage then find out if the current shown percent
      // is larger than the allowed percent.
      // Otherwise check to see if the amount of px shown is larger than the
      // allotted amount.
      if (amountVisible.indexOf('%')) {
        return (((verticalShowing/elemHeight)*100) >= parseInt(amountVisible));
      }
      else {
        return (verticalShowing >= parseInt(amountVisible));
      }
    }
    else if(type == 'horizontal') {
      var horizontalShowing = elemWidth - missingLeft - missingRight;

      // If user specified a percentage then find out if the current shown percent
      // is larger than the allowed percent.
      // Otherwise check to see if the amount of px shown is larger than the
      // allotted amount.
      if (amountVisible.indexOf('%')) {
        return (((horizontalShowing/elemWidth)*100) >= parseInt(amountVisible));
      }
      else {
        return (horizontalShowing >= parseInt(amountVisible));
      }
    }
    else if(type == 'area') {
      var areaShowing = (elemWidth - missingLeft - missingRight) * (elemHeight - missingTop - missingBottom);

      // If user specified a percentage then find out if the current shown percent
      // is larger than the allowed percent.
      // Otherwise check to see if the amount of px shown is larger than the
      // allotted amount.
      if (amountVisible.indexOf('%')) {
        return (((areaShowing/elemArea)*100) >= parseInt(amountVisible));
      }
      else {
        return (areaShowing >= parseInt(amountVisible));
      }
    }
  }
})(jQuery);
