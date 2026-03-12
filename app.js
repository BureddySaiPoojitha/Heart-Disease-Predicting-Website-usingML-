function goHome(){ window.location="home.html"; }
function goDashboard(){ window.location="dashboard.html"; }
function goAnalyze(){ window.location="analyze.html"; }
function logout(){ window.location="login.html"; }

async function analyze(){

let w = +weight.value;
let h = +height.value / 100;
let c = +chol.value;
let g = +glucose.value;
let a = +hba1c.value;
let hr = +heart.value;
let e = exercise.value;

if(!w || !h || !c || !g || !a || e===""){
alert("Fill all fields");
return;
}

/* BMI Calculation */
let bmi = (w/(h*h)).toFixed(1);
document.getElementById("bmi").innerText = bmi;

/* Convert frontend values to ML input format */
let data = {

age: Number(age.value),

currentSmoker:
smoke.value === "Regular" ? 1 : 0,

prevalentStroke:
stroke.value === "Yes" ? 1 : 0,

prevalentHyp:
hyper.value === "Yes" ? 1 : 0,

diabetes:
diabetes.value === "Yes" ? 1 : 0,

totChol: c,

sysBP: 120,          // placeholder if not entered
diaBP: 80,           // placeholder

BMI: parseFloat(bmi),

heartRate: hr,

glucose: g
};

try{

let response = await fetch("fetch("https://heart-disease-predicting-website-usingml.onrender.com/predict",{",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body: JSON.stringify(data)
});

let result = await response.json();

let risk = document.getElementById("risk");

/* Display ML Prediction */

if(result.prediction === 1){
risk.innerText = "High Risk";
risk.style.background = "#e53935";
}else{
risk.innerText = "Low Risk";
risk.style.background = "#4CAF50";
}

/* Optional probability display */

if(result.risk_probability){
risk.innerText += " (" + (result.risk_probability*100).toFixed(1) + "%)";
}

/* Diet suggestions */

if(g >= 126 || a >= 6.5){

morning.innerText="Oats, nuts, green tea";
lunch.innerText="Millets, vegetables, dal";
dinner.innerText="Soup & salad";
avoid.innerText="Sugar, refined carbs";

}else{

morning.innerText="Fruits & protein";
lunch.innerText="Balanced meal";
dinner.innerText="Light dinner";
avoid.innerText="Junk food";

}

result.style.display = "block";

}catch(error){

console.error("Error:", error);
alert("Prediction server not reachable");

}

}