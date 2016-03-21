'use strict';

describe('Component: colorInput', function () {
  beforeEach(module('ngColorInput'));

  var controller;
  var scope;

  beforeEach(inject(function ($rootScope, $componentController) {
    scope = $rootScope.$new();
    var bindings = {
      color: 'ff00ff',
      onUpdate: angular.noop
    };
    controller = $componentController('colorInput', {$scope: scope}, bindings);
  }));

  it('should be attached to the scope', function () {
    expect(scope.$ctrl).toBe(controller);
  });

  it('should expose selectorVisible', function () {
    expect(controller.selectorVisible).toBeDefined();
    expect(controller.selectorVisible).toBe(false);
  });

  it('should expose openSelector method', function () {
    expect(controller.openSelector).toBeDefined();
  });

  it('should expose set selectorVisible to true when openSelector is called', function () {
    controller.openSelector();
    expect(controller.selectorVisible).toBe(true);
  });

  it('should have onUpdate bound', function () {
    expect(controller.onUpdate).toBeDefined();
  });

  it('should expose color', function () {
    expect(controller.color).toBeDefined();
    expect(controller.color).toBe('ff00ff');
  });

  it('should update color binding when updateColor is called', function () {
    controller.updateColor('ff00ff');
    expect(controller.color).toBe('ff00ff');
  });
});
