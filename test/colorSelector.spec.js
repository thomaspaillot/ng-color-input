'use strict';

describe('Component: colorSelector', function () {
  beforeEach(module('ngColorInput'));

  describe('without input color', function () {
    var controller;
    var scope;

    beforeEach(inject(function ($rootScope, $componentController) {
      scope = $rootScope.$new();
      var bindings = {
        visible: 'true',
        onClose: angular.noop,
        onUpdate: angular.noop
      };
      controller = $componentController('colorSelector', {$scope: scope}, bindings);
    }));

    it('should have a default color', function () {
      expect(controller.currentColor).toEqual({h: 160, s: 1, l: 0.5, a: 1});
    });
  });

  describe('with input color', function () {
    var controller;
    var scope;

    beforeEach(inject(function ($rootScope, $componentController) {
      scope = $rootScope.$new();
      var bindings = {
        inputColor: '00ff00',
        visible: 'true',
        onClose: angular.noop,
        onUpdate: angular.noop
      };
      controller = $componentController('colorSelector', {$scope: scope}, bindings);
    }));

    it('should be attached to the scope', function () {
      expect(scope.$ctrl).toBe(controller);
    });

    it('should expose currentColor', function () {
      expect(controller.currentColor).toBeDefined();
      expect(controller.currentColor).toEqual({h: 120, s: 1, l: 0.5, a: 1});
    });

    it('should return the background color', function () {
      var style = controller.getPreviewStyle();
      expect(style).toEqual({'background-color': 'hsl(120, 100%, 50%)'});
    });

    it('should call onUpdate output binding when updateColor is called', function () {
      spyOn(controller, 'onUpdate');
      controller.updateColor({h: 240, s: 1, l: 0.5, a: 1});
      expect(controller.onUpdate).toHaveBeenCalledWith({color: '0000ff'});
    });
  });
});
