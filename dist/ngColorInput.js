;(function() {
"use strict";

angular.module('ngColorInput', []);

angular.module('ngColorInput').run(function($templateCache) {$templateCache.put('colorSelector.html', '<div class=\"color-selector-popover bottom\" ng-class=\"{\'is-open\': $ctrl.visible}\" ng-show=\"$ctrl.visible\">\n  <div class=\"arrow\"></div>\n  <div class=\"color-selector-popover-inner\">\n    <div class=\"color-selector-popover-content color-selector\">\n      <div class=\"color-selector-previews\">\n        <div class=\"color-selector-preview\" style=\"background-color:#{{$ctrl.inputColor}}\" ng-if=\"$ctrl.inputColor\"></div><!--\n      --><div class=\"color-selector-preview\" ng-style=\"$ctrl.getPreviewStyle()\" ng-if=\"!$ctrl.inputColor\"></div><!--\n      --><div class=\"color-selector-preview\" ng-style=\"$ctrl.getPreviewStyle()\"></div>\n      </div>\n      <div class=\"color-selector-sliders\">\n        <label for=\"colorHue\">Teinte</label>\n        <input name=\"colorHue\" class=\"color-selector-slider color-selector-slider--hue\" ng-change=\"$ctrl.updateColor($ctrl.currentColor)\" ng-model=\"$ctrl.currentColor.h\" type=\"range\" min=\"0\" max=\"3.6\" step=\"0.01\">\n        <label for=\"colorHue\">Saturation</label>\n        <input name=\"colorSaturation\" class=\"color-selector-slider color-selector-slider--saturation\" ng-change=\"$ctrl.updateColor($ctrl.currentColor)\" ng-model=\"$ctrl.currentColor.s\" type=\"range\" min=\"0\" max=\"1\" step=\"0.01\">\n        <label for=\"colorLuminosity\">Luminosité</label>\n        <input name=\"colorLuminosity\" class=\"color-selector-slider color-selector-slider--luminosity\" ng-change=\"$ctrl.updateColor($ctrl.currentColor)\" ng-model=\"$ctrl.currentColor.l\" type=\"range\" min=\"0\" max=\"1\" step=\"0.01\">\n      </div>\n      <button type=\"button\" class=\"color-selector-button\" ng-click=\"$ctrl.onClose()\">Fermer</button>\n    </div>\n  </div>\n</div>\n');});
var colorInput = {
  bindings: {
    inputColor: '<?',
    onUpdate: '&'
  },
  template: [
    '<div class="color-input">',
    '<input type="text" class="color-input-field" name="color" ng-focus="$ctrl.openSelector()" ng-model="$ctrl.inputColor">',
    '<div class="color-input-feedback" style="background-color:#{{$ctrl.inputColor}}"></div>',
    '<color-selector input-color="$ctrl.inputColor" visible="$ctrl.selectorVisible" on-update="$ctrl.onUpdate({color: color})" on-close="$ctrl.closeSelector()"></color-selector>',
    '</div>'
  ].join(''),
  controller: ColorInputCtrl
};

function ColorInputCtrl() {
  var vm = this;
  vm.selectorVisible = false;
  vm.closeSelector = closeSelector;
  vm.openSelector = openSelector;

  ////////////////////

  function closeSelector() {
    vm.selectorVisible = false;
  }

  function openSelector() {
    vm.selectorVisible = true;
  }
}

angular
  .module('ngColorInput')
  .component('colorInput', colorInput);

var colorSelector = {
  bindings: {
    inputColor: '<?',
    visible: '<',
    onUpdate: '&',
    onClose: '&'
  },
  templateUrl: 'colorSelector.html',
  controller: ColorSelectorCtrl
};

function ColorSelectorCtrl(tinycolor) {
  var vm = this;
  vm.getPreviewStyle = getPreviewStyle;
  vm.updateColor = updateColor;

  vm.$onInit = function () {
    var color = tinycolor('#' + vm.inputColor).toHsl();
    vm.currentColor = {
      h: (vm.inputColor) ? color.h / 100 : 1.6,
      s: (vm.inputColor) ? color.s / 100 : 1,
      l: (vm.inputColor) ? color.l / 100 : 0.5
    };
  };

  //////////////////////////////

  function updateColor(color) {
    var c = {h: color.h * 100, s: color.s * 100, l: color.l * 100};
    vm.onUpdate({color: tinycolor(c).toHex()});
  }

  function getPreviewStyle() {
    return {
      'background-color': 'hsl(' + vm.currentColor.h * 100 + ', ' + vm.currentColor.s * 100 + '%, ' + vm.currentColor.l * 100 + '%)'
    };
  }
}

angular
  .module('ngColorInput')
  .component('colorSelector', colorSelector);
}());
