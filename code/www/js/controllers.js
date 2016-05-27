angular.module('songhop.controllers', ['ionic', 'songhop.services'])


/*
 Controller for the discover page
 */
    .controller('DiscoverCtrl', function ($scope, $timeout, User, Recommendations) {
        $scope.songs = [];
        Recommendations.init()
            .then(function(){
                $scope.currentSong = Recommendations.queue[0];
                Recommendations.playCurrentSong();
            });
        
        $scope.nextAlbumImage = function () {
            return $scope.songs.length > 1 ?  $scope.songs[1].image_large : '';
        };

        $scope.sendFeedback = function (favorite) {
            if (favorite) {
                User.addSongToFavorites($scope.currentSong);
            }

            $scope.currentSong.hide = true;
            Recommendations.nextSong();

            $timeout(function() {

                $scope.currentSong = Recommendations.queue[0];

            }, 250);

            Recommendations.playCurrentSong();
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
    .controller('TabsCtrl', function ($scope, Recommendations) {
        $scope.enteringFavorites = function () {
            Recommendations.haltAudio();
        };
        $scope.leavingFavorites = function () {
          Recommendations.init();
        }
    });