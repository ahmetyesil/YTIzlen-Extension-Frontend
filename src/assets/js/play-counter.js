class PlayCounter {
    constructor() {
        this.video = null;
        this.is_counting = false;
        this.second_control = 0;
        this.interval = null;
        PlayCounter.instance = this;
    }

    static create(video) {
        const instance = new PlayCounter();
        instance.initialize(video);
    }


    initialize(video) {
        this.video = video;
        this.video.onplay = () => {
            this.onVideoPlay();
        };

        this.video.onended = () => {
            this.onVideoEnded();
        };

        this.video.onpause = () => {
            this.onPause();
        };

        this.video.onseeking = () => {
            this.onSeeking();
        };

        this.video.onseeked = () => {
            this.onSeeked();
        };
        this.video.ontimeupdate = () => {
            this.onTimeUpdate();
        };
    }

    onVideoPlay() {

    }

    onVideoEnded() {
        this.finish();
    }

    onTimeUpdate() {
        var seconds = Math.floor(this.video.currentTime);
        if ((seconds % 10 === 0)) {
            if(this.second_control < seconds){
                console.log('this.video.currentTime', seconds);
                console.log('this.video.duration', this.video.duration);
                // var video_view_create_model = {
                //     video_id :this.parseQuery(location.href)['v'],
                //     duration_seconds:seconds
                // };
                // videoViewCreate(video_view_create_model,function success(response) {
                //
                // },function error(err) {
                //
                // });
            }
            this.second_control = seconds;

        }
    }

    onPause() {

    }

    onSeeking() {

    }

    onSeeked() {
        this.finish();
    }



    finish() {
        this.reset();
    }

    reset() {
        this.video.onplay = null;
        this.video.onended = null;
        this.video.onpause = null;
        this.video.onseeking = null;
        this.video.onseeked = null;
        this.video.ontimeupdate = null;
    }


    toSecond(val) {
        return Math.floor(val % 60)
    }

    formatTime(seconds) {

        var minutes = Math.floor(seconds / 60);
        var secs = Math.floor(seconds % 60);
        if (minutes < 10) {
            minutes = '0' + minutes;
        }
        if (secs < 10) {
            secs = '0' + secs;
        }
        return minutes + ':' + secs;
    }


    parseQuery(str)
    {
        if(typeof str != "string" || str.length == 0) return {};
        var s = str.split("&");
        var s_length = s.length;
        var bit, query = {}, first, second;
        for(var i = 0; i < s_length; i++)
        {
            bit = s[i].split("=");
            first = decodeURIComponent(bit[0]);
            if(first.length == 0) continue;
            second = decodeURIComponent(bit[1]);
            if(typeof query[first] == "undefined") query[first] = second;
            else if(query[first] instanceof Array) query[first].push(second);
            else query[first] = [query[first], second];
        }
        return query;
    }

}


