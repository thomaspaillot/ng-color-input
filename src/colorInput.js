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
