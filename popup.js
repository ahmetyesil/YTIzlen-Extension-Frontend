// Try if Edge browser object exists, else default to chrome
var browser = self.browser;
if (typeof browser === "undefined") {
    browser = self.chrome;
}
document.addEventListener("DOMContentLoaded", function(event) {

    // TODO Eski kod büyük temizlikte silinecek
    var miniYouTubeActivated = true;
    var onOffSwitch = document.getElementById('myonoffswitch');
    var enabledDescription = document.getElementById('mnyt-enabled');
    var disabledDescription = document.getElementById('mnyt-disabled');
    getActivationStatus(updateSwitchState);
    onOffSwitch.onclick = toggleSwitch;
    function getActivationStatus(callBack) {
        browser.runtime.sendMessage({"get_activation_status": true}, function(response) {
            var activated = true;
            console.log('response',response);
            if ("is_active" in response) {
                activated = response["is_active"];
            }
            callBack(activated);
        });
    }
    function toggleSwitch() {
        miniYouTubeActivated = onOffSwitch.checked;
        // Send a message to background.js to save status and update icon
        browser.runtime.sendMessage({"update_icon": miniYouTubeActivated});
        updateDescription();
    }
    function updateSwitchState(activated) {
        miniYouTubeActivated = activated;
        onOffSwitch.checked = miniYouTubeActivated;
        browser.runtime.sendMessage({"update_icon": miniYouTubeActivated});
        updateDescription();
    }
    function updateDescription() {
        if (miniYouTubeActivated) {
            enabledDescription.style.display = "block";
            disabledDescription.style.display = "none";
        } else {
            enabledDescription.style.display = "none";
            disabledDescription.style.display = "block";
        }
    }
    // TODO Eski kod büyük temizlikte silinecek  ---------------------------------------------------


    var buttonLogin = document.getElementById('button-login');
    buttonLogin.onclick = login;

    function login() {
        browser.runtime.sendMessage({"login": true});
    }

    function logOut() {
        browser.runtime.sendMessage({"login": false});
    }


});