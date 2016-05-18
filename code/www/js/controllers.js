angular.module('songhop.controllers', ['ionic', 'songhop.services'])


/*
 Controller for the discover page
 */
    .controller('DiscoverCtrl', function ($scope, $timeout, User) {
        $scope.songs = [
            {
                "title": "Stealing Cinderella",
                "artist": "Chuck Wicks",
                "image_small": "https://i.scdn.co/image/d1f58701179fe768cff26a77a46c56f291343d68",
                "image_large": "https://i.scdn.co/image/9ce5ea93acd3048312978d1eb5f6d297ff93375d"
            },
            {
                "title": "Venom - Original Mix",
                "artist": "Ziggy",
                "image_small": "https://i.scdn.co/image/1a4ba26961c4606c316e10d5d3d20b736e3e7d27",
                "image_large": "https://i.scdn.co/image/91a396948e8fc2cf170c781c93dd08b866812f3a"
            },
            {
                "title": "Do It",
                "artist": "Rootkit",
                "image_small": "https://i.scdn.co/image/398df9a33a6019c0e95e3be05fbaf19be0e91138",
                "image_large": "https://i.scdn.co/image/4e47ee3f6214fabbbed2092a21e62ee2a830058a"
            },
            {
                "title": "Here Come",
                "artist": "Dat Boi",
                "image_small": "http://www.flat-e.com/flate5/wp-content/uploads/cover-960x857.jpg",
                "image_large": "http://www.flat-e.com/flate5/wp-content/uploads/cover-960x857.jpg"
            },
            {
                "title": "Oh Shit",
                "artist": "Whaddup",
                "image_small": "https://www.wired.com/images_blogs/underwire/2010/07/reader_albums_13a.jpg",
                "image_large": "https://www.wired.com/images_blogs/underwire/2010/07/reader_albums_13a.jpg"
            }
        ];
        $scope.choices = angular.copy($scope.songs);

        $scope.currentSong = $scope.choices.shift();

        $scope.sendFeedback = function (favorite) {
            $scope.currentSong.rated = favorite;
            $scope.currentSong.hide = true;
            if(favorite)
                User.addSongToFavorites($scope.currentSong);
            $timeout(function () {
                $scope.songs = shuffle($scope.songs);
                $scope.currentSong = $scope.choices.shift();
                if($scope.choices.length === 0)
                    $scope.choices = angular.copy($scope.songs);
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
    })


    /*
     Controller for our tab bar
     */
    .controller('TabsCtrl', function ($scope) {

    });