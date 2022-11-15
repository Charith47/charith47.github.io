const videos = {
    top: Popcorn('#player-main'),
    bottom: Popcorn('#player-glow'),
};

let loadCount = 0,
    events = 'play pause timeupdate seeking'.split(/\s+/g);

Popcorn.forEach(videos, function (media, type) {
    media
        .on('canplayall', function () {
            this.emit('sync');
        })
        .on('sync', function () {
            if (++loadCount == 2) {
                events.forEach(function (event) {
                    videos.top.on(event, function () {
                        if (event === 'timeupdate') {
                            if (!this.media.paused) {
                                return;
                            }

                            videos.bottom.emit('timeupdate');
                            return;
                        }

                        if (event === 'seeking') {
                            videos.bottom.currentTime(this.currentTime());
                        }

                        if (event === 'play' || event === 'pause') {
                            videos.bottom[event]();
                        }
                    });
                });
            }
        });
});

function sync() {
    if (videos.bottom.media.readyState === 4) {
        videos.bottom.currentTime(videos.top.currentTime());
    }
    requestAnimationFrame(sync);
}

sync();
