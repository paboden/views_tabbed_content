
/**
 *  @file
 *  Javascript to enhance the views tabbedrow cycle form options.
 */

/**
 * This will set our initial behavior, by starting up each individual tabbedrow.
 */
(function ($) {

  // Since Drupal 7 doesn't support having a field based on one of 3 values of
  // a select box we need to add our own javascript handling.
  Drupal.behaviors.viewstabbedrowCycleAmountAllowedVisible = {
    attach: function (context) {

      // If necessary at start hide the amount allowed visible box.
      var type = $(":input[name='style_options[views_tabbedrow_cycle][pause_when_hidden_type]']").val();
      if (type == 'full') {
        $(":input[name='style_options[views_tabbedrow_cycle][amount_allowed_visible]']").parent().hide();
      }

      // Handle dependency on action advanced checkbox.
      $(":input[name='style_options[views_tabbedrow_cycle][action_advanced]']").change(function() {
        processValues('action_advanced');
      });

      // Handle dependency on pause when hidden checkbox.
      $(':input[name="style_options[views_tabbedrow_cycle][pause_when_hidden]"]').change(function() {
        processValues('pause_when_hidden');
      });

      // Handle dependency on pause when hidden type select box.
      $(":input[name='style_options[views_tabbedrow_cycle][pause_when_hidden_type]']").change(function() {
        processValues('pause_when_hidden_type');
      });

      // Process our dependencies.
      function processValues(field) {
        switch (field) {
          case 'action_advanced':
            if (!$(':input[name="style_options[views_tabbedrow_cycle][action_advanced]"]').is(':checked')) {
              $(":input[name='style_options[views_tabbedrow_cycle][amount_allowed_visible]']").parent().hide();
              break;
            }
          case 'pause_when_hidden':
            if (!$(':input[name="style_options[views_tabbedrow_cycle][pause_when_hidden]"]').is(':checked')) {
              $(":input[name='style_options[views_tabbedrow_cycle][amount_allowed_visible]']").parent().hide();
              break;
            }
          case 'pause_when_hidden_type':
            if ($(":input[name='style_options[views_tabbedrow_cycle][pause_when_hidden_type]']").val() == 'full') {
              $(":input[name='style_options[views_tabbedrow_cycle][amount_allowed_visible]']").parent().hide();
            }
            else {
              $(":input[name='style_options[views_tabbedrow_cycle][amount_allowed_visible]']").parent().show();
            }
        }
      }
    }
  }

  // Manage advanced options
  Drupal.behaviors.viewstabbedrowCycleOptions = {
    attach: function (context) {
      if ($(":input[name='style_options[views_tabbedrow_cycle][advanced_options]']").length) {
        $(":input[name='style_options[views_tabbedrow_cycle][advanced_options]']").parent().hide();

        $(":input[name='style_options[views_tabbedrow_cycle][advanced_options_entry]']").parent().after(
          '<div style="margin-left: 10px; padding: 10px 0;">' +
            '<a id="edit-style-options-views-tabbedrow-cycle-advanced-options-update-link" href="#">' + Drupal.t('Update Advanced Option') + '</a>' +
          '</div>'
        );

        $("#edit-style-options-views-tabbedrow-cycle-advanced-options-table").append('<tr><th colspan="2">' + Drupal.t('Applied Options') + '</th><tr>')

        var initialValue = $(":input[name='style_options[views_tabbedrow_cycle][advanced_options]']").val();
        var advancedOptions = JSON.parse(initialValue);
        for (var option in advancedOptions) {
          viewstabbedrowCycleAdvancedOptionsAddRow(option);
        }

        // Add the remove event to the advanced items.
        viewstabbedrowCycleAdvancedOptionsRemoveEvent();

        $(":input[name='style_options[views_tabbedrow_cycle][advanced_options_choices]']").change(function() {
          var selectedValue = $(":input[name='style_options[views_tabbedrow_cycle][advanced_options_choices]'] option:selected").val();
          if (typeof advancedOptions[selectedValue] !== 'undefined') {
            $(":input[name='style_options[views_tabbedrow_cycle][advanced_options_entry]']").val(advancedOptions[selectedValue]);
          }
          else {
            $(":input[name='style_options[views_tabbedrow_cycle][advanced_options_entry]']").val('');
          }
        });

        $('#edit-style-options-views-tabbedrow-cycle-advanced-options-update-link').click(function() {
          var option = $(":input[name='style_options[views_tabbedrow_cycle][advanced_options_choices]']").val();
          if (option) {
            var value = $(":input[name='style_options[views_tabbedrow_cycle][advanced_options_entry]']").val();

            if (typeof advancedOptions[option] == 'undefined') {
              viewstabbedrowCycleAdvancedOptionsAddRow(option);
              viewstabbedrowCycleAdvancedOptionsRemoveEvent()
            }
            advancedOptions[option] = value;
            viewstabbedrowCycleAdvancedOptionsSave();
          }

          return false;
        });
      }

      function viewstabbedrowCycleAdvancedOptionsAddRow(option) {
        $("#edit-style-options-views-tabbedrow-cycle-advanced-options-table").append(
          '<tr id="views-tabbedrow-cycle-advanced-options-table-row-' + option + '">' +
            '<td>' + option + '</td>' +
            '<td style="width: 20px;">' +
              '<a style="margin-top: 6px" title="Remove ' + option + '" alt="Remove ' + option + '" class="views-hidden views-button-remove views-tabbedrow-cycle-advanced-options-table-remove" id="views-tabbedrow-cycle-advanced-options-table-remove-' + option + '" href="#"><span>Remove</span></a>' +
            '</td>' +
          '</tr>'
        );
      }

      function viewstabbedrowCycleAdvancedOptionsRemoveEvent() {
        $('.views-tabbedrow-cycle-advanced-options-table-remove').unbind().click(function() {
          var itemID = $(this).attr('id');
          var uniqueID = itemID.replace('views-tabbedrow-cycle-advanced-options-table-remove-', '');
          delete advancedOptions[uniqueID];
          $('#views-tabbedrow-cycle-advanced-options-table-row-' + uniqueID).remove();
          viewstabbedrowCycleAdvancedOptionsSave();
          return false;
        });
      }

      function viewstabbedrowCycleAdvancedOptionsSave() {
        var advancedOptionsString = JSON.stringify(advancedOptions);
        $(":input[name='style_options[views_tabbedrow_cycle][advanced_options]']").val(advancedOptionsString);
      }
    }
  }
})(jQuery);
