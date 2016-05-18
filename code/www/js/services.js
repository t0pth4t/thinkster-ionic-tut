angular.module('songhop.services', [])
    .factory('User', function () {
        return {
            favorites: [],
            addSongToFavorites: function (song) {
                if(!song)return false;

                this.favorites.unshift(song);
            },
            removeSongFromFavorites: function (indexOfSong) {
                this.favorites.splice(indexOfSong, 1);
            }
        };
    });
