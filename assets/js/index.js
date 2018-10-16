
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



