function UserRepository(token){
    var self = this;
    var req = new Request();
    var user = null;
    var token = token;

    this.getUser = function(cb){
        var USER_URL = "https://cookidoo.pt/vorwerkApiV2/apiv2/user";
        req.get(USER_URL, true, {"Authorization": "Bearer "+token}, function(response){
            var result = JSON.parse(response);
            if(result){
                    var content = result.content;
                    if(content){
                        self.user = content[0];
                    }
                }
            cb(self.user);
        });        
    }

    this.getCollectionsUrl = function(cb){
        var key = "user.User.collections";

        var extractUrl = function(user){
            if(!user){
                cb(null);
            }
            for(var i=0; i < user.links.length; i++){
                var urlObj = user.links[i];
                if(urlObj.rel == key){
                    return cb(urlObj.href);
                }
            }
        };
        if(user){
            return extractUrl(user);
        } else {
            this.getUser(function(user){
                return extractUrl(user);
            })
        }
    }
}