var colorInput = {
  bindings: {
    color: '=?'
  },
  template: [
    '<div class="color-input">',
    '<input type="text" class="color-input-field" name="color" ng-focus="$ctrl.openSelector()" ng-model="$ctrl.color">',
    '<div class="color-input-feedback" style="background-color:#{{$ctrl.color}}"></div>',
    '<color-selector input-color="$ctrl.color" visible="$ctrl.selectorVisible" on-update="$ctrl.updateColor(color)"></color-selector>',
    '</div>'
  ].join(''),
  controller: ColorInputCtrl
};

/*
 * @ngInject
 */
function ColorInputCtrl($document) {
  var vm = this;
  vm.selectorVisible = false;
  vm.openSelector = openSelector;
  vm.updateColor = updateColor;

  ////////////////////

  function closeSelector() {
    vm.selectorVisible = false;
    $document.off('click', closeSelector);
  }

  function openSelector() {
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
