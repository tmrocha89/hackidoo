function PreparationStep(preparationArrayElem){
    this._data = preparationArrayElem;

    this.getStepPosition = function(){
        return self._data.number;
    ;}

    this.getText = function(){
        return self._data.formattedText;
    }
}