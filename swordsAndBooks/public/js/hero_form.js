

$(document).ready(function () {
	var setSkillPointsInteface = new (function (){
		var self = this;
		var skillPointsFields = $('.skillPoints');
		var unusedPointsLabel = $('#unusedPoints');
		var currentUnusedPoints = unusedPoints;

		this.setMaxs = function(){
			skillPointsFields.each(function(){
				$(this).attr('max',currentUnusedPoints + parseInt($(this).val()));
			});
		}

		this.changeUnusedPointsLabel = function(newPointsValue){
			unusedPointsLabel.text(newPointsValue);
		}

		this.balanceSkillPointFields = function(){
			skillPointsFields.each(function(){

				var currentSkillPointsValue = parseInt($(this).val());

				$(this).change(function(){
					var newValue = parseInt($(this).val()),
						max = parseInt($(this).attr('max')),
						min = parseInt($(this).attr('min'));	

					if(newValue > max){
						$(this).val(max);
						newValue = max;
					}
					if(newValue < min){
						$(this).val(min);
						newValue = min;
					}

					var pointUsed = newValue - currentSkillPointsValue;
					
					currentUnusedPoints -= pointUsed;
					self.changeUnusedPointsLabel(currentUnusedPoints);
					currentSkillPointsValue = parseInt($(this).val());
					self.setMaxs();
				});
			});
		}
	})();

	setSkillPointsInteface.setMaxs();
	setSkillPointsInteface.balanceSkillPointFields();
	
});