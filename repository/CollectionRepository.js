function CollectionRepository(token){
    var self = this;
    var token = token;
    var userRepo = new UserRepository(token);
    var request = new Request();

    this._getCollectionsJson = function(data, cb){
        if(!data){
            data = {};
        }
        if(!data.collections){
            data.collections = [];
        }
        userRepo.getCollectionsUrl(function(url){
            request.get(url, true, {"Authorization": "Bearer "+this.token}, function(textList){
                var response = JSON.parse(textList);
                console.log("Collections List"); console.log(response);
                if(response){
                    
                    if(response.content){
                        var contentList = response.content.map(function(collection){
                            return new Collection(collection);
                        });
                        data.collections = data.collections.concat(contentList[0]);
                    }
                }
                var pageInfo = response.page;
                if(pageInfo.number < pageInfo.totalPages){
                   //request all pages
                }
                console.log(data.collections);
                cb(data.collections);
            });
        });

        //userRepo.getUser(data.token, function(){
//
//        });
        /*var xhr = new XMLHttpRequest();
        xhr.open("GET", "https://cookidoo.pt/vorwerkWebapp/app#/collection/8796125921281", true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
            }
        };*/
    };

    this.getAllCollections = function(cb){
        this._getCollectionsJson(null, cb);
    }
}