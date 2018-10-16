class LoadingService {
    constructor() {
        LoadingService.instance = this;
    }
    open(elm) {
        $(elm).fadeIn();
    }
    close(elm) {
        $(elm).fadeOut();
    }
}



