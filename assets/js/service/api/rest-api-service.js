var storage_service = new StorageService();

RestClient = function (goptions) {
    this.goptions = goptions;

    var constants = {
        dataType: 'json',
        contentType: 'application/json',
        processData: true,
        timeout: 120000,
        synchronous: false,
        errorRedirect: false
    };

    var doAjax = function (method, gopts, opts,success,error) {
        var dt = opts.dataType ? opts.dataType : (gopts.dataType ? gopts.dataType : constants.dataType);
        console.log('dt',dt);
        if(opts.headers){
            opts.headers.append(HTTPHeaders.SESSION_ID, this.storage_service.getSessionID());
        }else{
            opts.headers = {'Session-ID':this.storage_service.getSessionID()}
        }

        $.when($.ajax({
            type: method,
            url: gopts.url.lastIndexOf('/') == gopts.url.length - 1 ? gopts.url + opts.path : gopts.url + '/'
                + opts.path,
            headers: opts.headers ? opts.headers : (gopts.headers ? gopts.headers : {}),
            data: opts.model ? /^json/i.test(dt) ? JSON.stringify(opts.model) : opts.model : '',
            dataType: dt,
            contentType: opts.contentType ? opts.contentType : (gopts.contentType ? gopts.contentType
                : constants.contentType),
            processData: opts.processData ? opts.processData : (gopts.processData ? gopts.processData
                : constants.processData),
            timeout: opts.timeout ? opts.timeout : (gopts.timeout ? gopts.timeout : constants.timeout),

            complete: opts.complete ? opts.complete : (gopts.complete ? gopts.complete : function () {
            }),
            success : opts.success ? opts.success : (gopts.success ? gopts.success : function(data) {
                success(data);
            }),
            error:opts.error ? opts.error : (gopts.error ? gopts.error : function(req, status, ex) {
                error(req);
            }),
            async: opts.synchronous ? !opts.synchronous : (gopts.synchronous ? !gopts.synchronous
                : !constants.synchronous)
        }));
    };



    this.post = function (opts,success,error) {
        doAjax('POST', this.goptions, opts,success,error);
    };

    this.put = function (opts,success,error) {
        doAjax('PUT', this.goptions, opts,success,error);
    };

    this.get = function (opts,success,error) {
        doAjax('GET', this.goptions, opts,success,error);
    };

    this.remove = function (opts,success,error) {
        doAjax('DELETE', this.goptions, opts,success,error);
    };
};