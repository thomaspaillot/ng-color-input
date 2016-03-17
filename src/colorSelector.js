var colorSelector = {
  bindings: {
    inputColor: '<?',
    visible: '<',
    onUpdate: '&',
    onClose: '&'
  },
  templateUrl: 'scripts/components/inputColor/colorSelector.html',
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
