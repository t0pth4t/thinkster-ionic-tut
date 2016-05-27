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
    })
    .factory('Recommendations', function ($http,$q, SERVER) {
        var that = this;
        that.queue = [];

        that.init = function () {
          if(that.queue.length === 0){
              return that.getSongs();
          }
            return that.playCurrentSong();
        };

        that.getSongs = function () {
          return $http({
              method: 'GET',
              url: SERVER.url + '/recommendations'
          }).success(function (data) {
              that.queue = that.queue.concat(data);
          });
        };

        that.nextSong = function(){
            that.queue.shift();
            that.haltAudio();
            if(that.queue.length < 4)
                that.getSongs();
        };

        that.playCurrentSong = function () {
            var defer = $q.defer();
            that.media = new Audio(that.queue[0].preview_url);
            that.media.addEventListener('loadeddata',function () {
                defer.resolve();
            });

            that.media.play();

            return defer.promise;
        };

        that.haltAudio = function () {
            if(that.media){
                that.media.pause();
            }
        };

        return that;
    });
