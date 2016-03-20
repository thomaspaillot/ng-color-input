var colorInput = {
  bindings: {
    color: '=?'
  },
  template: [
    '<div class="color-input">',
    '<input type="text" class="color-input-field" name="color" ng-focus="$ctrl.openSelector()" ng-model="$ctrl.color">',
    '<div class="color-input-feedback" style="background-color:#{{$ctrl.color}}"></div>',
    '<color-selector input-color="$ctrl.color" visible="$ctrl.selectorVisible" on-update="$ctrl.updateColor(color)" on-close="$ctrl.closeSelector()"></color-selector>',
    '</div>'
  ].join(''),
  controller: ColorInputCtrl
};

function ColorInputCtrl() {
  var vm = this;
  vm.selectorVisible = false;
  vm.closeSelector = closeSelector;
  vm.openSelector = openSelector;
  vm.updateColor = updateColor;

  ////////////////////

  function closeSelector() {
    vm.selectorVisible = false;
  }

  function openSelector() {
    vm.selectorVisible = true;
  }

  function updateColor(color) {
    vm.color = color;
  }
}

angular
  .module('ngColorInput')
  .component('colorInput', colorInput);
