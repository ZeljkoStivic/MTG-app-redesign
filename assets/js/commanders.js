/*---------------------------------- VARIABLES----------------------------------*/

var players=[];
var colors=['red', 'blue', 'yellow', 'green', 'black', 'violet'];
var commanders=['Jori En Ruin Diver', 'Sidisi Brood Tyrant', 'Yasova Dragonclaw', 'Alesha Who Smiles at Death', 'Derevi Empyrial Tactician', 'Prossh Skyraider of Kher'];
var pickedBorder=['firstPickBorder', 'secondPickBorder', 'thirdPickBorder', 'fourthPickBorder', 'fifthPickBorder', 'sixthPickBorder'];
var pickedCommanders=[];
var gameArr=[];
var playerIndex=0;
var playerBorderIndex=0;

/*---------------------------------- BTN FOR CREATING NEW GAME ON COMMANDER MAIN ----------------------------------*/
$('#btnNewGame').click(function() {
    players=[];
    pickedCommanders=[];
    gameArr=[];
    playerIndex=0;
    playerBorderIndex=0;
    $('#arrowPlayer').fadeIn( 400 );
    $('#btnPlayers').fadeIn( 400 );
    $('#playerGrid').empty();
    $('#playerLobby').empty();
    $('#colorLobby').empty();
    $('#commanderLobby').empty();
    $('.playerPickPlayer').empty();
    $('.reRoll').empty();
    $('#divOrderNumber').empty();
    $('#divOrderPlayer').empty();
    $('#divOrderColor').empty();
    $('#divOrderCommander').empty();
    $('.playerPickColor').removeClass(colors[0]);
    $('#btnPlayers').addClass("newGameColor");
    $('#addPlayerModalPanel').show();
    $('#randomizeCommander').show();
    $('#pickCommander').show();
    $('#arrowPick').hide();
    $('#btnCreateNewGame').hide();
    $('#PlayerModalLobby').hide();
    $('#divPlayOrder').hide();
    $('#btnRandomizeOrder').hide();
    pickedBorder.forEach(function(border, borderIndex) {
        $('#commander'+(borderIndex+1)).removeClass(border);
    });
});

/*---------------------------------- REMOVES GREEN COLOR FROM PLAYERS BUTTON ON COMMANDER MAIN ----------------------------------*/
$('#btnPlayers').click(function() {
    $('#btnPlayers').removeClass("newGameColor");
});


/*---------------------------------- BTN IN MODAL THAT ADDS A PLAYER TO THE POOL BEFORE CREATING A LOBBY ON MODAL ----------------------------------*/
$('#addPlayer').click(function() {
    event.preventDefault();
    if($('#playerName').val() != '') {
        players[playerIndex]=$('#playerName').val();
        $('#playerGrid').append($("<ol></ol>").text(players[playerIndex]));
        playerIndex++;
        $('#playerName').val('');
        $('#playerName').focus();
    }
});

/*---------------------------------- BTN IN MODAL THAT CREATES A LOBBY WITH RANDOM PICK ORDER FROM A PLAYER POOL ----------------------------------*/
$('#createLobby').click(function() {
    event.preventDefault();
    shuffle(players);
    for(var playerIndex=0; playerIndex<players.length; playerIndex++){
        $('#playerLobby').append($("<ol></ol>").text(players[playerIndex]));
        $('#colorLobby').append($("<div></div>").addClass(colors[playerIndex]));
        $('#colorLobby').find('div').eq(playerIndex).attr('id', 'divPlayerColor'+playerIndex);
    }
    $('#addPlayerModalPanel').hide();
    $('#PlayerModalLobby').show();
});


/*---------------------------------- BTN IN MODAL THAT RANDOMIZES COMMANDERS IN LOBBY  ----------------------------------*/
$('#randomizeCommander').click(function() {
    event.preventDefault();
    $('#pickCommander').hide();
    shuffle(commanders);
    for(var commanderIndex=0, pickedCommanderIndex=0; commanderIndex<players.length; commanderIndex++, pickedCommanderIndex++){
        $('#commanderLobby').append($("<ol></ol>").text(commanders[commanderIndex]));
        $('#commanderLobby').find('ol').eq(commanderIndex).attr('id', 'olLobbyCommander'+commanderIndex);
        pickedCommanders[pickedCommanderIndex]=commanders[commanderIndex];
        $('.reRoll').append($("<button></button>").addClass('btn btn-primary btn-sm').text("ReRoll"));
        $('.reRoll').find('button').eq(commanderIndex).attr('id', 'btnReRoll'+commanderIndex);
    }
    $('#randomizeCommander').hide();
    $('#btnRandomizeOrder').show();
    players.forEach(function(player, Index) {
        ReRoll(Index);
    });
});

/*---------------------------------- BTNS IN MODAL THAT LETS PLAYER RANDOMLY REROLL COMMANDER IN LOBBY AFTER RANDOMIZE ----------------------------------*/
function ReRoll(index){
    $('.reRoll').on('click', '#btnReRoll'+index, function(e) {
        e.preventDefault();
        $('#btnReRoll'+index).addClass('disabled').attr("disabled", "disabled");
        $('#olLobbyCommander'+index).empty();
        $('#olLobbyCommander'+index).text(randomReRoll(index));
    });
}

/*---------------------------------- BTN IN MODAL THAT LETS PEOPLE PICK COMMANDERS THEMSELVES ----------------------------------*/
$('#pickCommander').click(function() {
    event.preventDefault();
    $('#arrowPick').fadeIn( 400 );
    $('#players').modal('hide');
    $('.playerPickPlayer').text(players[0]);
    $('.playerPickColor').addClass(colors[0]);
    $('.playerPickMainScreen').fadeIn( 400 );
    $('.playerPickMainScreen').css('display', 'inline-block');
    $('#randomizeCommander').hide();
    $('#pickCommander').hide();
    commanders.forEach(function(commander, Index) {
        pickedCommander(Index+1);
    });
});

/*---------------------------------- BORDER AND PICKED COMMANDER ARRAY ON CLICK ----------------------------------*/
function pickedCommander(index) {
    $('#commander'+index).click(function() {
        event.preventDefault();
        $('#commander'+index).addClass(pickedBorder[playerBorderIndex]);
        pickedCommanders[playerBorderIndex]=commanders[index-1];
        $('#commanderLobby').append($("<ol></ol>").text(pickedCommanders[playerBorderIndex]));
        $('.playerPickPlayer').empty();
        $('.playerPickColor').removeClass(colors[playerBorderIndex]);
        playerBorderIndex++;
        if(playerBorderIndex<players.length){
            $('.playerPickPlayer').text(players[playerBorderIndex]);
            $('.playerPickColor').addClass(colors[playerBorderIndex]);
        } else {
            $('#players').modal('show');
        }
        $('#btnRandomizeOrder').show();
    });
}

/*---------------------------------- BTN IN MODAL THAT RANDOMIZES ORDER  ----------------------------------*/
$('#btnRandomizeOrder').click(function() {
    event.preventDefault();
    $.removeCookie('players', { path: '/' });
    $.removeCookie('colors', { path: '/' });
    $.removeCookie('pickedCommanders', { path: '/' });
    shufflePlayers(players, colors, pickedCommanders);
    players=gameArr[0];
    $.cookie('players', players, { expires: 7, path: '/' });
    colors=gameArr[1];
    $.cookie('colors', colors, { expires: 7, path: '/' });
    pickedCommanders=gameArr[2];
    $.cookie('pickedCommanders', pickedCommanders, { expires: 7, path: '/' });
    for(var playerIndex=0; playerIndex<players.length; playerIndex++){
        $('#divOrderNumber').append($("<ol></ol>").text((playerIndex+1)+'. '));
        $('#divOrderPlayer').append($("<ol></ol>").text(players[playerIndex]));
        $('#divOrderColor').append($("<div></div>").addClass(colors[playerIndex]));
        $('#divOrderCommander').append($("<ol></ol>").text(pickedCommanders[playerIndex]));
    }
    $('#PlayerModalLobby').hide();
    $('#divPlayOrder').show();
    $('#btnCreateNewGame').show();
});

/*---------------------------------- CUTS TEXT IN COMMANDER CARD IF ITS MORE THAN 250CHARS  ----------------------------------*/
$('.card-text').each(function() {
    var maxchars = 250;
    var seperator = '...';

    if ($(this).text().length > (maxchars - seperator.length)) {
        $(this).text($(this).text().substr(0, maxchars-seperator.length) + seperator);
    }
});

/*---------------------------------- BTN IN MODAL THAT STARTS A NEW GAME ON A DIFFERENT PAGE ----------------------------------*/
$('#btnCreateNewGame').click(function() {
    window.location.href='game.html';
    return false;
});

/*---------------------------------- FUNCTIONS ----------------------------------*/

//FUNCTION THAT SHUFFLES ARRAY THAT IS PASSED IN IT AND RETURNS A SHUFFLED ONE
function shuffle(array) {

    var tempVrijednost;
    var randomBroj;

    for (var index = 0; index < array.length; index++) {
        randomBroj = Math.floor(Math.random() * ((array.length - 1) - 0 + 1)) + 0;
        tempVrijednost = array[index];
        array[index] = array[randomBroj];
        array[randomBroj] = tempVrijednost;
    }
    return array;
}

//FUNCTION THAT SHUFFLES ARRAYs THAT IS PASSED IN IT AND RETURNS A 2D ARRAY WITH ALL THE INFO NEEDED
function shufflePlayers(array1, array2, array3) {

    var tempVrijednost1;
    var tempVrijednost2;
    var tempVrijednost3;
    var randomBroj;

    for (var index = 0; index < array1.length; index++) {
        randomBroj = Math.floor(Math.random() * ((array1.length - 1) - 0 + 1)) + 0;
        tempVrijednost1 = array1[index];
        tempVrijednost2 = array2[index];
        tempVrijednost3 = array3[index];
        array1[index] = array1[randomBroj];
        array2[index] = array2[randomBroj];
        array3[index] = array3[randomBroj];
        array1[randomBroj] = tempVrijednost1;
        array2[randomBroj] = tempVrijednost2;
        array3[randomBroj] = tempVrijednost3;
    }
    gameArr=[array1, array2, array3];
    return gameArr;
}

//FUNCTION THAT LETS INDIVIDUAL PLAYERS REROLL A COMMANDER
function randomReRoll(index){
    var reRollIndex = Math.floor(Math.random() * ((commanders.length - 1) - 0 + 1)) + 0;
    if(pickedCommanders.indexOf(commanders[reRollIndex])<0) {
        pickedCommanders[index] = commanders[reRollIndex];
    }
    return pickedCommanders[index];
}


