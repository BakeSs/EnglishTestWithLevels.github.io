$(document).ready(function(){
    let attemptLabel = document.getElementById("attempt");
    let inputText = document.getElementById("inText");
    let buttonText = document.getElementById("buttonText");
    let goodPoints = document.getElementById("good");
    let badPoints = document.getElementById("bad");
    let gameMode;
    let attempNumber = 0, goodAns = 0, badAns = 0, tempPoint;

    
    let engMap = new Map();
    let ukrMap = new Map();
    
    let engMapEasy = new Map([
        [0, "always"], [1, "never"], [2, "night"],
        [3, "dog"], [4, "joy"], [5, "table"],
        [6, "apple"], [7, "cockroach"], [8, "pillow", ],
        [9, "bed"], [10, "helmet"], [11, "sky"],
        [12, "light"], [13, "laptop"], [14, "tooth"]
    ]);

    let ukrMapEasy = new Map([
        [0, "завжди"], [1, "ніколи"], [2, "ніч"],
        [3, "пес"], [4, "інграшка"], [5, "стіл"],
        [6, "яблуко"], [7, "тарган"], [8, "подушка"],
        [9, "ліжко"], [10, "шолом"], [11, "небо"],
        [12, "світло"], [13, "ноутбук"], [14, "зуб"]
    ]);

    let engMapMedium = new Map([
        [0, "gold"], [1, "possible"], [2, "plane"],
        [3, "age"], [4, "dry"], [5, "wonder"],
        [6, "how"], [7, "about"], [8, "then", ],
        [9, "which"], [10, "after"]
    ]);

    let ukrMapMedium = new Map([
        [0, "золото"], [1, "можливість"], [2, "літак"],
        [3, "вік"], [4, "сухий"], [5, "дивуватися"],
        [6, "як"], [7, "про"], [8, "тоді"],
        [9, "котрий"], [10, "після"]
    ]);

    let engMapHard = new Map([
        [0, "literally"], [1, "whom"], [2, "disinterested"],
        [3, "unabashed"], [4, "rural"], [5, "phenomenon"],
        [6, "abstruse"], [7, "expunge"], [8, "foil"],
        [9, "panacea"], [10, "paradigm"]
    ]);

    let ukrMapHard = new Map([
        [0, "буквально"], [1, "кому"], [2, "безкорисливий"],
        [3, "непокорений"], [4, "сільський"], [5, "феномен"],
        [6, "незрозумілий"], [7, "викреслити"], [8, "фольга"],
        [9, "панацея"], [10, "парадигма"]
    ]);


    
    let wordsCheckedSet = new Set();

    buttonText.innerHTML = "Generate";

    $("button").click(function(){
        if(attempNumber == 0){
            inputText.value = " ";
			goodPoints.innerHTML = "0";
			badPoints.innerHTML = "0";
			attemptLabel.innerHTML = "0/10";
        }

        if(inputText.value == ""){
            alert("Введіть слово правильно!");
        } else 
            if($('input[name="mode"]:checked').val() == undefined){
                alert("Виберіть режим гри!");
            }
            else
            {
                $('input[name=mode]').attr("disabled",true);
                if($('#easyMode').is(':checked')) { engMap = engMapEasy; ukrMap = ukrMapEasy; }
                if($('#mediumMode').is(':checked')) { engMap = engMapMedium; ukrMap = ukrMapMedium; }
                if($('#hardMode').is(':checked')) { engMap = engMapHard; ukrMap = ukrMapHard; }
                
                if(attempNumber!=0){
                    wordsCheckedSet.add(randWordNumber);
                    if(ukrMap.get(randWordNumber) == (inputText.value).toLowerCase()){
                        tempPoint = parseInt(goodPoints.innerHTML);
                        goodPoints.innerHTML = ++tempPoint;
                    } else{
                        tempPoint = parseInt(badPoints.innerHTML);
                        badPoints.innerHTML = ++tempPoint;
                    }
                    attemptLabel.innerHTML = attempNumber++ + "/10";
                }

                
                inputText.value = "";
        
                randWordNumber = Math.floor(Math.random() * (engMap.size));

                while(wordsCheckedSet.has(randWordNumber)){
                    randWordNumber = Math.floor(Math.random() * (engMap.size));
                }
        
                buttonText.innerHTML = engMap.get(randWordNumber);
                if(attempNumber == 0){
                    attempNumber++;
                }
                if(attempNumber == 11){
                let level;
                if(goodAns < 5) { level = "potato" }
                else if (goodAns > 4 && goodAns < 8){ level = "school boy"}
                else if (goodAns > 7) { level = "CHMNU user"};
                alert("GAME OVER! You are " + level);
                attempNumber = 0;
				$('input[name=mode]').attr("disabled",false);
				buttonText.innerHTML = "Generate";
            }
      }
    });
  });