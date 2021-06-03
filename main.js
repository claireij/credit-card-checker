var express = require("express"); 
var app = express(); 
var path = require("path"); 
app.get('/',function(req,res){ 
  res.sendFile(path.join(__dirname+'/index.html')); 
  //__dirname : It will resolve to your project folder. 
}); 
app.listen(3000);
console.log("Server running at Port 3000"); 

//For testing valid number: 4539677908016808

//Get elements from HTML-Doc
const creditNumbers = [document.getElementById('creditCardNumber1'), document.getElementById('creditCardNumber2'), document.getElementById('creditCardNumber3'), document.getElementById('creditCardNumber4'), document.getElementById('creditCardNumber5')];

// const arrayCredit1 = credit1.split('');
// An array of all the arrays above
let batch = [];

//
const fas = document.getElementsByClassName("fas");
let amountVisibleInput = 1;


function addInput (input) {
input.style.display = "flex";
amountVisibleInput = amountVisibleInput + 1;

// Auch hier muss es noch schöner werden
if (input.id === "extraInput1") {
    fas[1].style.display = "none";
    fas[2].style.display = "block";
    fas[3].style.display = "block";
} else if (input.id === "extraInput2") {
    fas[2].style.display = "none";
    fas[3].style.display = "none";
    fas[4].style.display = "block";
    fas[5].style.display = "block";
} else if (input.id === "extraInput3") {
    fas[4].style.display = "none"; 
    fas[5].style.display = "none"; 
    fas[6].style.display = "block";
    fas[7].style.display = "block";
}
    else if (input.id === "extraInput4") {
        fas[6].style.display = "none";
        fas[7].style.display = "none";
        }
    console.log(`The amount of visible input is: ${amountVisibleInput}`);
}


function removeInput (input) {
    input.style.display = "none";
    amountVisibleInput = amountVisibleInput - 1;

//Hier sind noch viel zu viele Wiederholungen, der geht noch viel cleaner

    if (input.id === "extraInput1") {
        fas[1].style.display = "flex";
        if (creditNumbers[1].value !== "")
        {
            creditNumbers[1].value = "";
            batch.pop();
        }
    
    } else if (input.id === "extraInput2") {
        fas[2].style.display = "block";
        fas[3].style.display = "block";
        if (creditNumbers[2].value !== "")
        {
            creditNumbers[2].value = "";
            batch.pop();
        }
        
    } else if (input.id === "extraInput3") {
        fas[4].style.display = "block"; 
        fas[5].style.display = "block";
        if (creditNumbers[3].value !== "")
        {
            creditNumbers[3].value = "";
            batch.pop();
        }

        
    }
        else if (input.id === "extraInput4") {
            fas[6].style.display = "block";
            fas[7].style.display = "block";
            if (creditNumbers[4].value !== "")
        {
            creditNumbers[4].value = "";
            batch.pop();
        }
    }
    console.log(`The amount of visible input is: ${amountVisibleInput}`);
}

//Generate random credit card numbers

function randomCreds () {
    //This ensures, that the batch is empty
    batch = [];

    let j;
    for (j=0; j < amountVisibleInput; j++) {
    const creditCard = [];
    let i;
    let y = Math.floor(Math.random() * 3 + 14);
    for (i = 0; i < y; i++) {
       creditCard.push(Math.floor(Math.random()*10));
    } 
    batch.push(creditCard);
    creditNumbers[j].value = batch[j].join("");
    console.log("This is the just created random batch")
    console.log(batch);
    
}
}

// Get the inserted credit card numbers
function getInput () {
    // This ensures that the batch is empty
    batch = []; 
    let i;
    for(i=0; i < creditNumbers.length; i++) {
        let creditNumberStringArray = creditNumbers[i].value.split("");
        let creditNumberIntArray = creditNumberStringArray.map(el => Number(el));
        
        //Deletes empty nested arrays
        if (creditNumberIntArray[i] !==  undefined) {
            batch.push(creditNumberIntArray);
        }
        }
    
    console.log(batch);
    return batch;
    
}



// Validate one credit card number
function validateCred (array) {
    
    	let functionArray = array.map(x => x);
        let i;

for (i=functionArray.length-1; i>=0; i--) {
    if(functionArray.length % 2 == 0) {
        if (i % 2 == 0) {
            functionArray[i] = functionArray[i] * 2;
            }
    } else {
        if (i % 2 !== 0) {
            functionArray[i] = functionArray[i] * 2;
    }
}   
        if(functionArray[i] > 9){
            functionArray[i] = functionArray[i] - 9;    
        }    
};

const sum = functionArray.reduce(function(a, b){
    return a + b;
}, 0);

if(sum % 10 == 0) {
    return true
} else {
    return false
}

};

function findInvalidCards() {
    let array = getInput();
    console.log("That's the array in findInvalidCards()");
    console.log(array)
    console.log
    let i;
    let invalidCardsArray = [];
    let answerDiv = document.getElementById("answer");
    answerDiv.innerHTML = "";
    for (i=0; i<array.length; i++){
        let company = findCardCompanies(array[i]);
        if(!validateCred(array[i])) {
            answerDiv.innerHTML += `The credit card number ${array[i].join("")} from ${company} is invalid.<br>`; 
        invalidCardsArray.push(array[i])
        } else {
            answerDiv.innerHTML += `The credit card number ${array[i].join("")} from ${company} is valid.<br>`;
        }
    } 
    return invalidCardsArray;

}

function findCardCompanies(array) {
    const firstNumber = array.slice(0,1);
    const firstTwoNumbers = array.slice(0,2);
    const firstFourNumbers = array.slice(0,4);
    if (firstTwoNumbers == 34 | firstTwoNumbers == 37) {
        return 'American Express';
    } else if ( firstFourNumbers >= 2221 && firstFourNumbers <= 2720 | firstTwoNumbers >= 51 && firstTwoNumbers <= 55) {
        return 'Mastercard'
    } else if (firstNumber == 1) {
        return 'UATP';
    } else if (firstNumber == 4) {
        return 'Visa';
    }  else if (firstNumber == 3) {
        return 'Amex'
    } else if (firstFourNumbers == 5018 | firstFourNumbers == 5020 | firstFourNumbers == 5038 | firstFourNumbers == 5893 | firstFourNumbers == 6304 | firstFourNumbers == 6759 | firstFourNumbers == 6761 | firstFourNumbers == 6762 | firstFourNumbers == 6763) {
        return 'Maestro'
    } else if (firstFourNumbers == 6304 | firstFourNumbers == 6706 | firstFourNumbers == 6771 | firstFourNumbers ==6709) {
        return 'Laser'
    } else if (firstNumber == 6) {
        return 'Discover'
    } else {
        return 'unknown company'
    }





}
