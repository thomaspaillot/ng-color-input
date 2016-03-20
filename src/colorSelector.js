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
  vm.currentColor = {h: 160, s: 1, l: 0.5, a: 1};
  vm.getPreviewStyle = getPreviewStyle;
  vm.updateColor = updateColor;

  if (vm.inputColor) {
    vm.currentColor = tinycolor(angular.copy(vm.inputColor)).toHsl();
  }

  //////////////////////////////

  function updateColor(color) {
    vm.onUpdate({color: tinycolor(color).toHex()});
  }

  function getPreviewStyle() {
    return {
      'background-color': tinycolor(vm.currentColor).toHslString()
    };
  }
}

angular
  .module('ngColorInput')
  .component('colorSelector', colorSelector);
