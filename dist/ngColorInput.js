/**
 * ngColorInput - ngColorInput is a simple hex color input with a hsb color selector helper
 * @version v0.1.0
 * @link https://github.com/thomaspaillot/ng-color-input.git
 * @license MIT
 * @author Thomas Paillot <paillot.thomas@gmail.com>
 */
;(function(angular, tinycolor) {
"use strict";

angular.module('ngColorInput', [])
  .constant('tinycolor', tinycolor);

angular.module('ngColorInput').run(function($templateCache) {$templateCache.put('colorSelector.html', '<div class=\"color-selector-popover bottom\" ng-click=\"$ctrl.handleClick($event)\" ng-class=\"{\'is-open\': $ctrl.visible}\" ng-show=\"$ctrl.visible\">\n  <div class=\"arrow\"></div>\n  <div class=\"color-selector-popover-inner\">\n    <div class=\"color-selector-popover-content color-selector\">\n      <div class=\"color-selector-previews\">\n        <div class=\"color-selector-preview\" style=\"background-color:#{{$ctrl.inputColor}}\" ng-if=\"$ctrl.inputColor\"></div><!--\n      --><div class=\"color-selector-preview\" ng-style=\"$ctrl.getPreviewStyle()\" ng-if=\"!$ctrl.inputColor\"></div><!--\n      --><div class=\"color-selector-preview\" ng-style=\"$ctrl.getPreviewStyle()\"></div>\n      </div>\n      <div class=\"color-selector-sliders\">\n        <label for=\"colorHue\" class=\"color-selector-label\">Teinte</label>\n        <input name=\"colorHue\" class=\"color-selector-slider color-selector-slider--hue\" ng-change=\"$ctrl.updateColor($ctrl.currentColor)\" ng-model=\"$ctrl.currentColor.h\" type=\"range\" min=\"0\" max=\"360\" step=\"1\">\n        <label for=\"colorSaturation\" class=\"color-selector-label\">Saturation</label>\n        <input name=\"colorSaturation\" class=\"color-selector-slider color-selector-slider--saturation\" ng-change=\"$ctrl.updateColor($ctrl.currentColor)\" ng-model=\"$ctrl.currentColor.s\" type=\"range\" min=\"0\" max=\"1\" step=\"0.01\">\n        <label for=\"colorLuminosity\" class=\"color-selector-label\">Luminosité</label>\n        <input name=\"colorLuminosity\" class=\"color-selector-slider color-selector-slider--luminosity\" ng-change=\"$ctrl.updateColor($ctrl.currentColor)\" ng-model=\"$ctrl.currentColor.l\" type=\"range\" min=\"0\" max=\"1\" step=\"0.01\">\n      </div>\n    </div>\n  </div>\n</div>\n');});
var colorInput = {
  bindings: {
    color: '=?'
  },
  template: [
    '<div class="color-input">',
    '<div class="color-input-prefix">#</div>',
    '<input type="text" class="color-input-field" name="color" ng-click="$ctrl.openSelector($event)" ng-model="$ctrl.color">',
    '<div class="color-input-feedback" ng-class="{\'has-color\': $ctrl.color}" style="background-color:#{{$ctrl.color}}"></div>',
    '<color-selector input-color="$ctrl.color" visible="$ctrl.selectorVisible" on-update="$ctrl.updateColor(color)"></color-selector>',
    '</div>'
  ].join(''),
  controller: ColorInputCtrl
};

/*
 * @ngInject
 */
function ColorInputCtrl($scope, $document) {
  var vm = this;
  vm.selectorVisible = false;
  vm.openSelector = openSelector;
  vm.updateColor = updateColor;

  ////////////////////

  function closeSelector() {
    $scope.$apply(function () {
      vm.selectorVisible = false;
    });
    $document.off('click', closeSelector);
  }

  function openSelector(evt) {
    evt.stopPropagation();
    vm.selectorVisible = true;
    $document.on('click', closeSelector);
  }

  function updateColor(color) {
    vm.color = color;
  }
}

angular
  .module('ngColorInput')
  .component('colorInput', colorInput);

var colorSelector = {
  bindings: {
    inputColor: '<?',
    visible: '<',
    onUpdate: '&'
  },
  templateUrl: 'colorSelector.html',
  controller: ColorSelectorCtrl
};

/*
 * @ngInject
 */
function ColorSelectorCtrl(tinycolor) {
  var vm = this;
  vm.currentColor = {h: 160, s: 1, l: 0.5, a: 1};
  vm.getPreviewStyle = getPreviewStyle;
  vm.updateColor = updateColor;
  vm.handleClick = handleClick;

  if (vm.inputColor) {
    vm.currentColor = tinycolor(angular.copy(vm.inputColor)).toHsl();
  }

  //////////////////////////////

  function updateColor(color) {
    vm.onUpdate({color: tinycolor(angular.copy(color)).toHex()});
  }

  function handleClick(evt) {
    evt.stopPropagation();
  }

  function getPreviewStyle() {
    var hslColor = vm.currentColor.h + ', ' + vm.currentColor.s * 100 + '%, ' + vm.currentColor.l * 100 + '%';
    return {
      'background-color': 'hsl(' + hslColor + ')'
    };
  }
}

angular
  .module('ngColorInput')
  .component('colorSelector', colorSelector);
}(window.angular, window.tinycolor));
