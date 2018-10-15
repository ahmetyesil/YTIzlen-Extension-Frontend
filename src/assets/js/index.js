var loading_service = new LoadingService();
var alert_service = new AlertService();
var routing_service = new RoutingService();
var http_status_service = new HttpStatusService();
var storage_service = new StorageService();
var session = new Session();
// Login API START
function login() {
    loading_service.open('.yt-loading');
    const session_id = storage_service.get('session_id');
    if(session_id){
        getSession(session_id,function success(response) {
                routing_service.pageRedirectByUrl(SiteInfoConstant.PAGE_INDEX);
                loading_service.close('.yt-loading');
                session = response.data;
                loginManagement();
            },
            function error(err) {
                loading_service.close('.yt-loading');
                http_status_service.errorHandler(err);
                logoutManagement();
            }
        );
    }else{
        getSessionUrl(function success(response) {
                loading_service.close('.yt-loading');
                routing_service.locationHref(response.data);
            },
            function error(err) {
                loading_service.close('.yt-loading');
                http_status_service.errorHandler(err);
            }
        );
    }
}


function loginManagement(){
    $('.yt-header-toplinks').addClass('show');
    $('#link-username').text(session.name);
}
function logoutManagement(){
    $('.yt-header-toplinks').removeClass('show');
}

$('#button-login').click(function () {
    login();

});

$('#link-logout').click(function () {
    routing_service.pageRedirectByUrl(SiteInfoConstant.PAGE_LOGIN);
    storage_service.removeSessionID();
    storage_service.removeUserData();
    logoutManagement();
});


$('#link-videos').click(function () {
    routing_service.locationHref(SiteInfoConstant.VIDEOS);
});

$('#link-buy').click(function () {
    routing_service.locationHref(SiteInfoConstant.BUY_URL);
});
$('#link-tos').click(function () {
    routing_service.locationHref(SiteInfoConstant.TOS_URL);
});
$('#link-faq').click(function () {
    routing_service.locationHref(SiteInfoConstant.FAQ_URL);
});


$('#button-watch-subs-like').click(function () {
    loading_service.open('.yt-loading');
    getVideoForView(function success(response) {
            loading_service.close('.yt-loading');
            routing_service.locationHref(response.data.url,true);
        },
        function error(err) {
            loading_service.close('.yt-loading');
            http_status_service.errorHandler(err);
        })
});
$('#button-confirm').click(function () {
    alert('confirm event')
});
$('#button-skip').click(function () {
    alert('skip event')
});

(function () {
    login();
})();

