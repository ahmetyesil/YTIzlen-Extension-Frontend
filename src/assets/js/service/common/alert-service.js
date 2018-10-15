class AlertService {
    constructor() {
        AlertService.instance = this;
    }
    open(type,text,duration) {
        var alert = $('.yt-alert');
        var alert_text = $('.yt-alert .yt-alert-content div span');
        alert.addClass('yt-alert-'+type);
        alert_text.html(text);
        alert.fadeIn();
        if(duration){
           var timeout = setTimeout(function () {
               alert.fadeOut(function () {
                   alert.removeClass('yt-alert-'+type);
                   clearTimeout(timeout);
               });

           },duration);
        }

    }
    close() {
        $('.yt-alert').fadeOut();
    }
}

$('.yt-alert #yt-close-button').click(function () {
    var alert_service = new AlertService();
    alert_service.close();
})

