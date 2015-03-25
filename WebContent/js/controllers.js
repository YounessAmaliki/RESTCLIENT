'use strict';

angular.module('ProductApp.controllers', []).

    controller('ProductsController', ['$scope', 'ProductService',
        function($scope, ProductService) {
        	$scope.products = [];
        	
//        	$scope.searchFilter = function(product) {
//        	    var keyword = new RegExp($scope.nameFilter, 'i');
//        	    return keyword.test(product.shortname);
//        	};
        	
            ProductService.getProductsJSON().success(function (response) {
            	$scope.products = response.products;
            });
        }
    ]).
    
    controller('ProductController', ['$scope', '$routeParams', 'ProductService',
        function($scope, $routeParams, ProductService) {
    		$scope.product = null;
	        var shortname = $routeParams.shortname;

	        ProductService.getProductJSON(shortname).success(function (response) {
	        	$scope.product = response;
	        });
    	}
    ]).
    
    controller('NewProductController', ['$scope', 'ProductService',
        function($scope, ProductService) {
    		$scope.addProduct = function() {
    			var productXML = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>';
            	productXML += '<product><brand>' + $scope.newProduct.brand + '</brand>';
            	productXML += '<description>' + $scope.newProduct.description + '</description>';
            	productXML += '<id>' + $scope.newProduct.id + '</id>';
            	productXML += '<price>' + $scope.newProduct.price + '</price>';
            	productXML += '<shortname>' + $scope.newProduct.shortname + '</shortname>';
            	productXML += '<sku>' + $scope.newProduct.sku + '</sku></product>';

    			ProductService.addProduct(productXML);
    		};
    	}
    ]);
