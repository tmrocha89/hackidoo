function Recipe(dataString){
    var self = this;
    this._data = JSON.parse(dataString);

    this.getName = function(){
        return self._data.name;
    };
    
    this.getdifficulty = function(){
        return self._data.difficulty;
    };
};