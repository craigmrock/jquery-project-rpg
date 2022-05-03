
let classId;
let item;
let characterHealth;
let experiencePoints = 0;
let expPointsTextbox = $("#experiencePoints");
let playerLevel = 1;
let playerLevelTextbox = $("#playerLevel");

$("#characterClass").on("change", characterClassDropdownCallback);

function characterClassDropdownCallback (e) {
    let characterClassList = $("#characterClass");
    classId = characterClassList.val();
    item = getItemById(classId);
    $("#health").val(item.health);
    
    let message = item.commonItems;
     showMessage("#commonItems", message, false);
     console.log(item);
}

function showMessage(id, message, append) {
    if(append){
        $(id)[0].textContent += message + "\n";
    } else {
        $(id)[0].textContent = message;
    }
}

function getItemById(classId) {
    for(let i=0; i < characterArray.length; i++){
        if(characterArray[i].id == classId){
            return characterArray[i];
        }
    }
}

function validateFunction(e) {
    let valid = true;
    
    let cName = $("#cName").val();
    if (!cName) {
        valid = false;
        alert("Please enter a charater name");
        //if it has a value it's true
    }
    else {
        console.log("cName: " + cName);
    }

    let pName = $("#pName").val();
    if (!pName) {
        valid = false;
        alert("Please enter a player name");
        //if it has a value it's true
    }
    else {
        console.log("pName: " + pName);
    }

    let characterClassSelection = $("#characterClass").val();
    let selectedClass = "none";
    if (characterClassSelection && characterClassSelection.length > 0 && characterClassSelection[0] !== "none"){
        selectedClass = characterClassSelection[0].value;
    }
    return valid;
    
}

function populateTypeList() {
    let typeSelectList = $("#characterTypes");
    let uniqueTypes = [];
    for (const type of characterArray) {
      if (!uniqueTypes.includes(type.type)) {
          uniqueTypes.push(type.type);
      }
    } 

    for (const characterType of uniqueTypes){
        var el = $("<option>");
        el.text(characterType);
        el.val(characterType);
        typeSelectList.append(el);
    }
    typeSelectList.on("change", function(e) {
        selectedType = $(e.target).val();
        console.log("Type: ", selectedType);
        populateUnorderedList(selectedType);
        $("#characterTypes");
    });
}

function populateUnorderedList(characterType){
    let characterClassList = $("#characterClass");
    characterClassList.empty();

    for (const item of characterArray){
        if (characterType === item.type){
            var el = $("<option>");
            el.text(item.item);
            el.val(item.id);
            characterClassList.append(el);

        }
    }
}

function resetHealth() {
    let oppHealth = $("#oppHealth").val(10);
    let playerHealth = $("#health").val(10);
    return oppHealth, playerHealth;

}

$("#rules").click(function(){
    $("#gameRules").show();
});

$("#gotIt").click(function(){
    $("#gameRules").hide();
});
//This shows the combat area of the game when you click the play now button
$("#playBtn").click(function(){
    $("#generateCombat").show();
    resetHealth();
});

//This generates the values for attack and defense rolls
function getRandomInt() {
    min = Math.ceil(1);
    max = Math.floor(6);
    return Math.floor(Math.random() * (6)+1)
}

//This resets the player and opponent health if the player wins a battle
//It also shows an alert message that the player won or if they died
function gameReset(winner) {
    if (winner) {
        alert("You have destroyed your foe! \n Press Attack to Play Again!");
        resetHealth();
    }
    else {
        alert("You have perished! \n Refresh your browser to play again!");
    }

}

function levelCalculator() {
    calculateLevel = parseInt(playerLevel) % parseInt(experiencePoints);
    $("#playerLevel").val(calculateLevel);
    if (experiencePoints > 2500) {
        let newLevel = experiencePoints / 2500;
        $("#playerLevel").val(newLevel);
    }

}

function pageLoad() {
    console.log("Page loaded");
    let form = $("#characterSheet");
    $("#gameRules").hide();
    $("#generateCombat").hide();
    $("#attackRoll").on("click", function(e) {
        let attack = getRandomInt();
        let defense = getRandomInt();
        $("#playerAttack").val(attack);
        $("#oppDefense").val(defense);
        if (attack > defense) {
            let oppHealth = $("#oppHealth").val();
            let damage = attack - defense;
            let newOppHealth = oppHealth - damage;
            $("#oppHealth").val(newOppHealth);
            if (newOppHealth <= 0) {
                gameReset(true);
                experiencePoints += 2500;
                $("#experiencePoints").val(experiencePoints);
                levelCalculator();
                console.log("dead", newOppHealth);
            }
        }
        console.log(attack);
        console.log(defense);
    });
    $("#defendRoll").on("click", function(e) {
        let attack = getRandomInt();
        let defense = getRandomInt();
        $("#oppAttack").val(attack);
        $("#playerDefense").val(defense);
        if (attack > defense) {
            let playerHealth = $("#health").val();
            let damage = attack - defense;
            let newPlayerHealth = playerHealth - damage;
            $("#health").val(newPlayerHealth);
            if (newPlayerHealth <= 0) {
                gameReset(false);
                console.log("dead", newPlayerHealth);
            }
            console.log(newPlayerHealth);
        }
        console.log(attack);
        console.log(defense);
    });

    form.on("submit", function(event) {
        event.preventDefault();
        console.log("Form submitted");
        if (validateFunction()) {
            console.log("Form Valid");
            //$('#characterSheet')[0].submit(); //convert jQery object to Javascript
        }
        else {
            console.log("Form Invalid");
        }
    }) 

let button = $("button");
button.on("click", () => {
    console.log("button clicked.");
});
populateTypeList();

}

$(pageLoad);