

var storage_service = new StorageService();
var routing_service = new RoutingService();
var rest = new RestClient({
    url: EnvironmentConstant.API_URL,
    dataType: 'json',
    contentType: 'application/json',
    processData: true,
    timeout: 120000,
    synchronous: false,
    errorRedirect: false
});

/**
 * @param {Session}  The date
 */
function getSessionUrl(success, error) {
    let data = {
        path: ApiUrlsConstant.SESSION + '/google',
    }
    rest.get(data, success, error);
}



/**
 * @param {string} session_id The date
 */
function getSession(session_id,success, error) {
    let data = {
        path: ApiUrlsConstant.SESSION + '/'+session_id,
    }
    rest.get(data, function (response) {
        console.log('response',response);
        storage_service.setUserModel(response.data);
        success(response);
    }, function (err) {
        console.log('err',err);
        error(err)
    });
}



/**
 * @param {Session}  The date
 */
function getVideoForView(success, error) {
    let data = {
        path: ApiUrlsConstant.VIDEO + '/for-view' ,
    }
    rest.get(data, success, error);
}



