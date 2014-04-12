var auction;!function(){"use strict";angular.module("auctionApp",["ngRoute","restangular"]).config(["$routeProvider",function(a){a.when("/home",{templateUrl:"views/home.html",controller:"HomeController",controllerAs:"ctrl",title:"Auction"}).when("/search",{templateUrl:"views/search.html",controller:"SearchController",controllerAs:"ctrl",title:"Search Products"}).when("/product/:productId",{templateUrl:"views/product.html",controller:"ProductController",controllerAs:"ctrl",title:"Product Details"}).otherwise({redirectTo:"/home"})}]).config(["RestangularProvider",function(a){a.setBaseUrl("/rest/v1")}]).run(["$rootScope",function(a){a.$on("$routeChangeStart",function(b,c){a.title=c.title})}])}(auction||(auction={})),angular.module("auctionApp").directive("auctionNavbar",function(){return{scope:!1,restrict:"E",templateUrl:"views/partial/navbar.html"}}),angular.module("auctionApp").directive("auctionFooter",function(){return{scope:!1,restrict:"E",templateUrl:"views/partial/footer.html"}}),angular.module("auctionApp").directive("auctionPriceRange",["$timeout",function(){return{scope:{minPrice:"@",maxPrice:"@",lowPrice:"=",highPrice:"="},restrict:"E",templateUrl:"views/partial/priceRange.html",link:function(a,b){var c=angular.element(b).find("#product-price-slider"),d=parseInt(a.minPrice||0),e=parseInt(a.maxPrice||500),f=parseInt(a.lowPrice||d),g=parseInt(a.highPrice||e);c.slider({min:d,max:e,value:[f,g]}),c.on("slideStop",function(b){a.$apply(function(){a.lowPrice!=b.value[0]&&(a.lowPrice=b.value[0]),a.highPrice!=b.value[1]&&(a.highPrice=b.value[1])})});var h=function(){return c.slider("getValue")},i=function(a,b){return c.slider("setValue",[a,b])};a.$watch("lowPrice",function(a){return i(a,h()[1])}),a.$watch("highPrice",function(a){return i(h()[0],a)})}}}]),angular.module("auctionApp").directive("searchForm",function(){return{scope:!0,restrict:"E",templateUrl:"views/partial/searchForm.html"}}),angular.module("auctionApp").directive("futureDate",function(){return{require:"ngModel",link:function(a,b,c,d){d.$parsers.unshift(function(a){var b,c;return a?(b=Date.parse(a),isNaN(b)||0>b?(d.$setValidity("futureDate",!1),a):(c=new Date,c>b?(d.$setValidity("futureDate",!1),a):(d.$setValidity("futureDate",!0),a))):void d.$setValidity("futureDate",!0)})}}});var auction;!function(a){!function(a){"use strict";var b=function(){function a(){}return a}();a.ProductModel=b}(a.model||(a.model={}));a.model}(auction||(auction={}));var auction;!function(a){!function(){"use strict";var a=function(){function a(a,b){this.$http=a,this.$q=b}return a.prototype.getFeaturedProductItems=function(){var a=this.$q.defer();return this.$http.get("data/featured.json").success(function(b){return a.resolve(b.items)}).error(function(){return console.log("failed to get featured products")}),a.promise},a.prototype.searchProductItems=function(){var a=this.$q.defer();return this.$http.get("data/search.json").success(function(b){return a.resolve(b.items)}).error(function(){return console.log("failed to search products")}),a.promise},a.prototype.getProductById=function(a){return this.searchProductItems().then(function(b){return _.find(b,function(b){return b.id==a})})},a.$inject=["$http","$q"],a}();angular.module("auctionApp").service("productService",a)}(a.service||(a.service={}));a.service}(auction||(auction={}));var auction;!function(a){!function(){"use strict";var a=function(){function a(a){var b=this;this.productService=a,this.productService.getFeaturedProductItems().then(function(a){return b.featuredProductItems=a})}return a.$inject=["productService"],a}();angular.module("auctionApp").controller("HomeController",a)}(a.controller||(a.controller={}));a.controller}(auction||(auction={}));var auction;!function(a){!function(){"use strict";var a=function(){function a(a){var b=this;this.productService=a,this.productService.searchProductItems().then(function(a){return b.searchProductItems=a})}return a.$inject=["productService"],a}();angular.module("auctionApp").controller("SearchController",a)}(a.controller||(a.controller={}));a.controller}(auction||(auction={}));var auction;!function(a){!function(){"use strict";var a=function(){function a(a,b){var c=this;this.$routeParams=a,this.productService=b,this.showSearchForm=!1;var d=this.$routeParams.productId;this.productService.getProductById(d).then(function(a){return c.productItem=a})}return a.$inject=["$routeParams","productService"],a}();angular.module("auctionApp").controller("ProductController",a)}(a.controller||(a.controller={}));a.controller}(auction||(auction={}));var auction;!function(a){!function(){"use strict";var a=function(){function a(){this.minPrice=100,this.maxPrice=1500}return a}(),b=function(){function b(b,c){this.$location=b,this.restangular=c,this.searchParams=angular.extend(new a,b.search())}return b.prototype.search=function(){this.$location.search(this.searchParams);var a=this.restangular.all("products");a.getList(this.searchParams)},b.$inject=["$location","Restangular"],b}();angular.module("auctionApp").controller("SearchFormController",b)}(a.controller||(a.controller={}));a.controller}(auction||(auction={}));