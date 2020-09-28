let $upperKeyboard = $("#keyboard-upper-container");
let $lowerKeyboard = $("#keyboard-lower-container");
let $allKeys = $("well well-lg key");
let letterCounter = 0;
let sentences = ['ten ate neite ate nee enet ite ate inet ent eate', 'Too ato too nOt enot one totA not anot tOO aNot', 'oat itain oat tain nate eate tea anne inant nean', 'itant eate anot eat nato inate eat anot tain eat', 'nee ene ate ite tent tiet ent ine ene ete ene ate'];
//let sentences = ["t","t","t","t","t"]
let sentenceCounter = 0;
let currentSentence = sentences[sentenceCounter];
let numberOfWords = currentSentence.length;
let numberOfMistakes = 0;
let check = $('<span class = "glyphicon glyphicon-ok"</span>');
let redX = $('<span class = "glyphicon glyphicon-remove"</span>');
let startTime = 0;
let wpm = 0;
$upperKeyboard.hide();

$('#sentence').append(sentences[sentenceCounter]);
$("#target-letter").append(sentences[sentenceCounter][letterCounter]);

$(document).keydown(function (e) {
    if (sentenceCounter == 0 && letterCounter == 0) {
        startTime = Date.now();
    }

    if (e.key.charCodeAt(0) != 83) {
        $("#" + e.key.charCodeAt(0)).addClass("highlight");
    }
    //"S" still doesnt work, but now it's not highlighted, cheat since S isnt in the sentences

    if (e.key.charCodeAt(0) == 83) {
        $upperKeyboard.show();
        $lowerKeyboard.hide();
    }

    if (e.key == sentences[sentenceCounter][letterCounter]) {
        $('#feedback').append($('<span class = "glyphicon glyphicon-ok"</span>'));
        $("#yellow-block").css("left", "+=17px")
        letterCounter++;
        $("#target-letter").empty();
        $("#target-letter").append(sentences[sentenceCounter][letterCounter]);
    }
    else if (e.key.charCodeAt(0) == 83) {
        $('#feedback').append("");
    }
    else if (e.key !== sentences[sentenceCounter][letterCounter]) {
        $('#feedback').append($('<span class = "glyphicon glyphicon-remove"</span>'));
        numberOfMistakes++;
    }
});

$(document).keyup(function (e) {

    if (e.key.charCodeAt(0) == 83) {
        $lowerKeyboard.show();
        $upperKeyboard.hide();
    }
    $("#" + e.key.charCodeAt(0)).removeClass("highlight")
    if (letterCounter == sentences[sentenceCounter].length) {
        alert("CORRECT");
        sentenceCounter++;
        $("#yellow-block").css("left", "5px")

        if (sentenceCounter == 5) {
            let endDate = new Date();
            let endTime = endDate.getTime();
            let minutes = (endTime - startTime) / 6000;
            wpm = Math.round(54 / minutes - 2 * numberOfMistakes);
            //bad math but content is there
            let finalDiv = $('<div></div>')
            finalDiv.addClass("finalDiv")
            $('body').append(finalDiv)
            $(".finalDiv").append($('<h1 id="WPM">' + "Words per minute = " + (wpm) + '</h1>'))
            $(".finalDiv").append($('<h2 id="mistakes">' + 'Mistakes = ' + (numberOfMistakes) + '</h2>'))
            $(".finalDiv").append($('<p><button id="playAgain"> Play again? </button></p>'))
            $(".finalDiv").append($('<p><button id="done"> DONE </button></p>'))
            sentences = ["", "", "", "", "", ""];
            //to "clear board" after finished
            //can still type and gives errors when you do, but it looks better
            $('#playAgain').click(function () {
                location.reload();
            })
            $('#done').click(function () {
                finalDiv.remove();
                $("#yellow-block").remove();
                $('#sentence').empty();
                $("#target-letter").empty();
            })
        }
        letterCounter = 0;
        $('#sentence').empty();
        $('#sentence').append(sentences[sentenceCounter]);
        $("#target-letter").empty(); 
        //worked with out..why?..because it wasnt acutally empty but rahter "filled" by undefined?
        $("#target-letter").append(sentences[sentenceCounter][letterCounter]);
        $("#feedback").empty();
    }
});