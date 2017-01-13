function PreparationStep(preparationArrayElem){
    var self = this;
    this._number = 0;
    this._text = "";

    var setupPreparationStep = function(step){
        self._setNumber(step.number);
        self._setText(step.formattedText);
    };

    this._setNumber = function(num){
        self._number = num;
    };

    this._setText = function(text){
        self._text = text;
    };

    this.getStepPosition = function(){
        return self._number;
    ;}

    this.getText = function(){
        return self._text;
    };

    this.toString = function(){
        return self.getStepPosition() + ")  " + self.getText();
    };

    setupPreparationStep(preparationArrayElem);
}