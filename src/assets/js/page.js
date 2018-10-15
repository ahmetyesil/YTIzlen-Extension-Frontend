if (document.readyState === 'loading') {
    document.addEventListener("DOMContentLoaded", function () {
        completed();
    }, false);

    window.onbeforeunload = function(e) {
        var dialogText = 'Are you sure you want to close the Window?';
        e.returnValue = dialogText;
        return dialogText;
    };

} else {
    completed();
}


function completed() {
    // video-stream html5-main-video
    const videos = document.getElementsByTagName('video');
    // atr_challenge : bu input[type=hidden] elementinde videonun id bilgileri bulunuyor. kullanabiliriz.
    const video = videos[0];
    console.log('video', video);
    if (video) {
        PlayCounter.create(video);
    }
}
