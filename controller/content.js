console.log("I'm Running");


function getToken(cb){

    var token = localStorage.getItem("accessToken");
    console.log("Getting a token"+ token);
    cb(token);
/*
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://cookidoo.pt/vorwerkWebapp/app#/collection/8796125921281", true);
    xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
        //console.log(xhr.responseText);
        // WARNING! Might be evaluating an evil script!
        //var resp = eval("(" + xhr.responseText + ")");

        var xhr2 = new XMLHttpRequest();
        xhr2.open("GET", "https://cookidoo.pt/vorwerkApiV2/apiv2/recipeCollectionTreasure/8796125921281/recipes?sort=8841345794147", true);
        xhr2.onreadystatechange = function() {
            if (xhr2.readyState == 4) {
                //console.log(xhr2.responseText);
            }
        };
        xhr2.setRequestHeader("Authorization", "Bearer "+token);
        xhr2.send();

    }
    }
    xhr.send();
    */
};

getToken(function(token){
    chrome.runtime.sendMessage({action: "getCollections", token: token}, function(response) {
    });
});