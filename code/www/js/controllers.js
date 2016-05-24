angular.module('songhop.controllers', ['ionic', 'songhop.services'])


/*
 Controller for the discover page
 */
    .controller('DiscoverCtrl', function ($scope, $timeout, User, Recommendations) {
        $scope.songs = [];
        function getMoreSongs(firstTime){
            Recommendations.getSongs().then(function (result) {
                $scope.songs = $scope.songs.concat(result.data);
                $scope.choices = angular.copy($scope.songs);

                if(firstTime)
                    $scope.currentSong = angular.copy($scope.choices.shift());
            });

        }

        getMoreSongs(true);

        $scope.sendFeedback = function (favorite) {
            $scope.currentSong.rated = favorite;
            $scope.currentSong.hide = true;
            if(favorite)
                User.addSongToFavorites($scope.currentSong);
            $timeout(function () {
                $scope.songs = shuffle($scope.songs);
                $scope.currentSong = angular.copy($scope.choices.shift());
                if($scope.choices.length === 0)
                    getMoreSongs();
            },250);

        };
        
        function shuffle(array) {
            var m = array.length, t, i;
            while (m) {
                i = Math.floor(Math.random() * m--);
                t = array[m];
                array[m] = array[i];
                array[i] = t;
            }
            return array;
        }
    })


    /*
     Controller for the favorites page
     */
    .controller('FavoritesCtrl', function ($scope, User) {
        $scope.favorites = User.favorites;
        
        $scope.removeFromFavorites = function (indexOfSong) {
            User.removeSongFromFavorites(indexOfSong);
        }
    })


    /*
     Controller for our tab bar
     */
    .controller('TabsCtrl', function ($scope) {

    });