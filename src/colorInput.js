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
