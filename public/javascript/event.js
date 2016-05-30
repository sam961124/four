var four = angular.module('four', ['ngRoute']);

//directive
four.directive('fileModel', ['$parse', function($parse){
	return {
		restrict: 'A',
		link: function(scope, element, attrs){
			var model = $parse(attrs.fileModel);
			var modelSetter = model.assign;

			element.bind('change', function(){
				scope.$apply(function(){
					modelSetter(scope, element[0].files[0]);
				})
			})
		}
	}
}])

//service
four.service('multipartForm', ['$http', function($http){
	this.post = function(uploadUrl, data){
		var fd = new FormData();
		for(var key in data)
			fd.append(key, data[key]);
		$http.post(uploadUrl, fd, {
			transformRequest: angular.indentity,
			headers: { 'Content-Type': undefined }
		});
	}
}])

//controller
four.controller("LoginController", function($scope, $window){
    $scope.message = "請登入";
    $scope.fb_login = function(){
        $scope.message = "登入中";
    };
    $scope.gp_login = function(){
            $scope.message = "登入中"
    };
});

four.controller('caseFormController', ['$scope', 'multipartForm', function($scope, multipartForm) {
     $scope.case = {
         name: "我的案子",
         money: 20000,
         endDate: null,
         fromDate: null,
         toDate: null,
         applicant: 0,
         location: "地區",
         detail: null
    };
    $scope.submit = function() {
        // alert($scope.case.location);
        var uploadUrl = '/create_case';
		multipartForm.post(uploadUrl, $scope.case);
    }
}]);

four.controller('SelectHeaderController', function($scope, $element) {
      $scope.cities = ['不限', '基隆市', '台北市', '新北市', '桃園市', '新竹市', '新竹縣', '苗栗縣', '台中市', '彰化縣', '雲林縣', '嘉義市', '嘉義縣', '台南市', '台南縣', '高雄市', '高雄縣', '屏東縣', '宜蘭縣', '花蓮縣', '台東縣', '澎湖縣', '其他'];
      $scope.searchTerm;
      $scope.clearSearchTerm = function() {
        $scope.searchTerm = '';
      };
      // The md-select directive eats keydown events for some quick select
      // logic. Since we have a search input here, we don't need that logic.
      $element.find('input').on('keydown', function(ev) {
          ev.stopPropagation();
      });
});

four.controller('InputDropdownController', [
    '$scope',
    '$q',
    function($scope, $q) {
        var self = this;
        self.selectedDropdownItem = null;
        self.defaultDropdownStrings = ['不限', '基隆市', '台北市', '新北市', '桃園市', '新竹市', '新竹縣', '苗栗縣', '台中市', '彰化縣', '雲林縣', '嘉義市', '嘉義縣', '台南市', '台南縣', '高雄市', '高雄縣', '屏東縣', '宜蘭縣', '花蓮縣', '台東縣', '澎湖縣', '其他'];
        self.filterStringList = function(userInput) {
            var filter = $q.defer();
            var normalisedInput = userInput.toLowerCase();

            var filteredArray =     self.defaultDropdownStrings.filter(function(country) {
            return country.toLowerCase().indexOf(normalisedInput) === 0;
            });

            filter.resolve(filteredArray);
            return filter.promise;
        };
        self.itemStringSelected = function(item) {
            console.log('Handle item string selected in controller:', item);
        };
}]);

four.controller('AppCtrl', function($scope) {
    $scope.endDate = new Date();

    $scope.minDate = new Date(
    $scope.endDate.getFullYear(),
    $scope.endDate.getMonth(),
    $scope.endDate.getDate());

    $scope.maxDate = new Date(
    $scope.endDate.getFullYear(),
    $scope.endDate.getMonth() + 2,
    $scope.endDate.getDate());
});

four.controller('mycaseController', ['$scope', '$http', function($scope, $http) {
    //  $http.get('/cases/self/list').success(function( data ) {
    //      $scope.cases= data; //from your sample;
    //      alert( "Loaded.");
    //  });
     $scope.cases = [
     {name: '那些年我們一起追的女孩', applicant: 20, date: '2016.5.10', location: '台北市', money: 20000, pic_url: '/image/thatyear.jpg', status: 'finding', status_word: '找人中'},
     {name: '等一個人咖啡', applicant: 5, date: '2016.5.20', location: '台中市', money: 50000, pic_url: '/image/waiting.jpg', status: 'found', status_word: '找人成功'},
     {name: '我的少女時代', applicant: 0, date: '2016.5.15', location: '新北市', money: 25000, pic_url: '/image/ourtime.jpg', status: 'finding', status_word: '找人中'},
     {name: '那些年我們一起追的女孩', applicant: 20, date: '2016.5.10', location: '台北市', money: 20000, pic_url: '/image/thatyear.jpg', status: 'found', status_word: '找人成功'},
     {name: '那些年我們一起追的女孩', applicant: 20, date: '2016.5.10', location: '台北市', money: 20000, pic_url: '/image/thatyear.jpg', status: 'found', status_word: '找人成功'},
     {name: '那些年我們一起追的女孩', applicant: 20, date: '2016.5.10', location: '台北市', money: 20000, pic_url: '/image/thatyear.jpg', status: 'finding', status_word: '找人中'},
     {name: '那些年我們一起追的女孩', applicant: 20, date: '2016.5.10', location: '台北市', money: 20000, pic_url: '/image/thatyear.jpg', status: 'finding', status_word: '找人中'},
     {name: '那些年我們一起追的女孩', applicant: 20, date: '2016.5.10', location: '台北市', money: 20000, pic_url: '/image/thatyear.jpg', status: 'finished', status_word: '已完工'},
     {name: '那些年我們一起追的女孩', applicant: 20, date: '2016.5.10', location: '台北市', money: 20000, pic_url: '/image/thatyear.jpg', status: 'finished', status_word: '已完工'},
     {name: '那些年我們一起追的女孩', applicant: 20, date: '2016.5.10', location: '台北市', money: 20000, pic_url: '/image/thatyear.jpg', status: 'finished', status_word: '已完工'}
    ];
}]);
