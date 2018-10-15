class StorageService {
    constructor() {
    }
    /**
     * @param {Session} user The date
     */
    setUserModel(user) {
        localStorage.setItem('user_model', JSON.stringify(user));
        this.setSessionID(user.session_id);
    }

    getUserModel() {
        return localStorage.getItem('user_model');
    }
    /**
     * @param {string} session_id The date
     */
    setSessionID(session_id) {
        localStorage.setItem('session_id',session_id);
    }

    removeSessionID() {
        localStorage.removeItem('session_id');
    }

    removeUserData(){
        localStorage.removeItem('user_model');
    }

    getSessionID() {
        return localStorage.getItem('session_id');
    }


    get(key) {
        console.log('localStorage.getItem(key)',localStorage.getItem(key));
        if(localStorage.getItem(key))
        return localStorage.getItem(key).replace(/"/g,'');
    }

    set(key,value) {
        localStorage.setItem(key,value);
    }



}


