//Set up an associative array 
//Key represents the activity level of the user
//Value is the multiplier of the BMR needed to meet TDEE
var activity_level = new Array();
activity_level["Sedentary"]=1.2;
activity_level["Moderate"]=1.35;
activity_level["Highly"]=1.65;


//Set up an associative array 
//Key represents the desired weight loss speed
//Value is the multiplier of TDEE needed to meet goal 
var loss_speed = new Array();
loss_speed["Maintain"]=0.98;
loss_speed["Slow"]=0.85;
loss_speed["Medium"]=0.78;
loss_speed["Fast"]=0.7;


// getWeight() stores weight of user into array for calculation
// Here, we take the users input from the weight form field
function getWeight() {
    var userWeight = document.getElementById('weight').value;
        weight = userWeight;
}



// getBodyfat() stores weight of user into array for calculation
// We take the provided bodyfat and obtain integer needed for LBM calculation
function getBodyfat() {
    var inputBodyfat = document.getElementById('bodyfat').value;
    var userBodyfat = inputBodyfat / 100;
        LBMfatCalc = 100 - inputBodyfat ;
        LBMfat = LBMfatCalc / 100;
        bodyfat = userBodyfat;
}


// getActivityLevel() determines additional caloric intake multiplier needed based on user activity level
// We need to take user's the selection from radio button selection for activity level
function getActivityLevel() {
    console.log('get active level called');
    var activeRadio = document.getElementsByClassName('activelevel');
        for (i=0; i < activeRadio.length; i++) {
            // console.log('get active level called');
            if (activeRadio[i].checked){
                activity_input = activeRadio[i].value;
            }
        }
        return activity_level[activity_input];
} 



// getLossSpeed() determines percentage reduction in caloric intake multiplier needed to achieve results speed
// We need to take user's the selection from radio button selection for speed desired
function getLossSpeed() {
    var speedRadio = document.getElementsByName('lossrate');
        for (i=0; i < speedRadio.length; i++) {
            if (speedRadio[i].checked){
                speed_input = speedRadio[i].value;
                // console.log(speedRadio[i].value + 'speedRadio value is');
                // speedCarb = speedRadio[i].value;
            }
        }
        return loss_speed[speed_input];
}


//calculateAll() uses other calculation fuctions to determine macro nutrient needs based on user data input and formulas
//The output of the data is used to dynamically display totals after calculation is performed
function calculateAll() {
	
    getWeight();
    getBodyfat();
    getActivityLevel();
    var leanMass =  Math.round(weight * LBMfat);
    var BMR = Math.round((leanMass * 9.8) + 370);
    var TDEE = Math.round(BMR * getActivityLevel());
    var deficit = Math.round(TDEE * getLossSpeed());
    // console.log(loss_speed + 'loss speed is');
    var proteinCalc = Math.round(leanMass * 0.95);
    var fatCalc = Math.round( (deficit - 100 - (4 * proteinCalc)) / 9);
    document.getElementById('LBMdisplay').innerHTML = "Lean Body Mass: " + leanMass + ' lbs';
    document.getElementById('TDEEdisplay').innerHTML = "Daily Calories Burned: " + TDEE + ' cals';       
    document.getElementById('DEFdisplay').innerHTML = "Calories To Eat: " + deficit + ' cals';
    document.getElementById('PMacdisplay').innerHTML = "Protein Goal: " + proteinCalc + ' grams';
    document.getElementById('FMacdisplay').innerHTML = "Fat Allowance: " + fatCalc + ' grams' ;
    document.getElementById('CMacdisplay').innerHTML = "Net Carb Limit: " + 25 + ' grams' ;

}
