class RoutingService {
    constructor() {
        RoutingService.instance = this;
    }

    pageRedirectByUrl(id) {
        if (id.indexOf('http') === -1) {
            $('.yt-pages').css('display', 'none');
            $(id).fadeIn();
        }
    }

    locationHref(url,new_tab) {
        if(new_tab){
            window.open(url);
        }else{
            location.href = url;
        }

    }

    pageRouting() {
        let current_page = '#yt-login';
        let $this = this;
        $(current_page).fadeIn();
        $('a[href]').click(function () {
            let t = $(this);
            let s = t.attr('href');
            $this.pageRedirectByUrl(s);
        });
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