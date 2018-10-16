if (document.readyState === 'loading') {
    document.addEventListener("DOMContentLoaded", function () {
        completed();
    }, false);
} else {
    completed();
}

function completed() {
    // video-stream html5-main-video
    const videos = document.getElementsByTagName('video');
    // atr_challenge : bu input[type=hidden] elementinde videonun id bilgileri bulunuyor. kullanabiliriz.
    const video = videos[0];
    if (video) {
        PlayCounter.create(video);
    }
}
