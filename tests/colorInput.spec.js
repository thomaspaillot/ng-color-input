'use strict';

describe('Component: colorInput', function () {

  beforeEach(module('ngColorInput'));

  describe('with $compile', function () {

    var element;
    var scope;
    beforeEach(inject(function($rootScope, $compile){
      scope = $rootScope.$new();
      element = angular.element('<color-input input-color="color" on-update="updateColor(color)"></color-input>');
      element = $compile(element)(scope);
      scope.color = 'ff00ff';
      scope.updateColor = function(color) {};
      scope.$apply();
    }));

    it('should render the text', function() {
      var h1 = element.find('h1');
      expect(h1.text()).toBe('Unit Testing AngularJS 1.5');
    });

    it('should update the rendered text when the parent scope changes', function() {
      scope.outside = '2.0';
      scope.$apply();
      var h1 = element.find('h1');
      expect(h1.text()).toBe('Unit Testing AngularJS 2.0');
    });

    describe('Controller: myComponent', function () {

      var controller;
      beforeEach(function() {
        controller = element.controller('myComponent');
      });

      it('should expose my title', function() {
        expect(controller.myTitle).toBeDefined();
        expect(controller.myTitle).toBe('Unit Testing AngularJS');
      });

      it('should have my binding bound', function() {
        expect(controller.myBinding).toBeDefined();
        expect(controller.myBinding).toBe('1.5');
      });

    });

  });

  describe('with $componentController', function () {

    var controller;
    var scope;
    beforeEach(inject(function($rootScope, $componentController){
      scope = $rootScope.$new();
      controller = $componentController('myComponent', {$scope: scope}, {myBinding: '1.5'});
    }));

    it('should be attached to the scope', function() {
      expect(scope.$ctrl).toBe(controller);
    });

    it('should expose my title', function() {
      expect(controller.myTitle).toBeDefined();
      expect(controller.myTitle).toBe('Unit Testing AngularJS');
    });

    it('should have my binding bound', function() {
      expect(controller.myBinding).toBeDefined();
      expect(controller.myBinding).toBe('1.5');
    });

  });

});
