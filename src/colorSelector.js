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
