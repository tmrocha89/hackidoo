function PreparationStep(preparationArrayElem){
    var self = this;
    this._data = preparationArrayElem;

    this.getStepPosition = function(){
        return self._data.number;
    ;}

    this.getText = function(){
        return self._data.formattedText;
    };

    this.toString = function(){
        return self.getStepPosition() + ")  " + self.getText();
    };
}