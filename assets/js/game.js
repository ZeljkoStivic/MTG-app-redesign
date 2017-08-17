/*---------------------------------- VARIABLES----------------------------------*/
var players = $.cookie('players');
var colors = $.cookie('colors');
var pickedCommanders = $.cookie('pickedCommanders');
var hp=[];
var commanderHp=[];
var placementArr=[];
var hashLog={};
var step=1;

players = players.split(',');
colors = colors.split(',');
colors.length=players.length;
pickedCommanders = pickedCommanders.split(',');

for(var playerIndex=0; playerIndex<players.length; playerIndex++){
    hp[playerIndex]=30;
}

for(var playerIndex=0; playerIndex<players.length; playerIndex++){
    for(var commanderIndex=0; commanderIndex<pickedCommanders.length; commanderIndex++){
        commanderHp[playerIndex]=[];
    }
}

for(var playerIndex=0; playerIndex<players.length; playerIndex++){
    for(var commanderIndex=0; commanderIndex<pickedCommanders.length; commanderIndex++){
        commanderHp[playerIndex][commanderIndex]=15;
    }
}

//Najbitnija funkcionalnost!
function gg(playerIndex) {
    alert(players[playerIndex]+' je popušio kurčinu!');
}

/*---------------------------------- /VARIABLES----------------------------------*/

/*---------------------------------- TABLE CREATION----------------------------------*/

function tableCreationGridAndPlayerName() {
    $('#tables').append($("<div></div>").addClass('tableDiv'+playerIndex));
    $('.tableDiv'+playerIndex).append($("<table></table>").addClass('bottomBorderClass table'+playerIndex));
    $('.table'+playerIndex).append($("<thead></thead>").addClass('thead'+playerIndex));
    $('.thead'+playerIndex).append($("<tr></tr>").addClass('tableRow'+playerIndex));
    $('.tableRow'+playerIndex).append($("<th></th>"));
    $('.tableRow'+playerIndex).append($("<th></th>").text(players[playerIndex]));
}

function tableCreatingGrindAndCommanderName() {
    pickedCommanders.forEach(function(commander, index) {
        if(playerIndex != index){
            $('.tableRow'+playerIndex).append($("<th></th>").text(players[index] + ' - ' + commander));
        }
    });
}

function tableCreationGridAndPlayerHp(){
    $('.table'+playerIndex).append($("<tbody></tbody>").addClass('tbody'+playerIndex));
    $('.tbody'+playerIndex).append($("<tr></tr>").addClass('tableRowBodyFontFamilyAndSize tableRowBody'+playerIndex));
    $('.tableRowBody'+playerIndex).append($("<th></th>").attr( "scope", "row" ));
    $('.tableRowBody'+playerIndex).append($("<td></td>").text(hp[playerIndex]));
}

function tableCreationGridAndCommanderHp() {
    pickedCommanders.forEach(function(commander, index) {
        if(playerIndex != index){
            $('.tableRowBody' + playerIndex).append($("<td></td>").text(commanderHp[playerIndex][index]));
        }
    });
}

function tableCreationHpButtons() {
    $('.tbody'+playerIndex).append($("<tr></tr>").addClass('tableRowBtn'+playerIndex));
    $('.tableRowBtn'+playerIndex).append($("<th></th>").attr( "scope", "row" ));
    $('.tableRowBtn'+playerIndex).append($("<td></td>").append($("<button></button>").addClass('btn btn-success btn-sm dec1HpPlayer'+playerIndex).text('- 1')).append($("<button></button>").addClass('btn btn-success btn-sm spearator inc1HpPlayer'+playerIndex).text('+ 1')).append($("<div></div>")).append($("<button></button>").addClass('btn btn-success btn-sm dec5HpPlayer'+playerIndex).text('- 5')).append($("<button></button>").addClass('btn btn-success btn-sm spearator inc5HpPlayer'+playerIndex).text('+ 5')));
    pickedCommanders.forEach(function(commander, index) {
        if(playerIndex != index) {
            $('.tableRowBtn' + playerIndex).append($("<td></td>").append($("<button></button>").addClass('btn btn-success btn-sm dec1Player' + playerIndex + 'Com' + index).text('- 1')).append($("<button></button>").addClass('btn btn-success btn-sm spearator inc1Player' + playerIndex + 'Com' + index).text('+ 1')).append($("<div></div>")).append($("<button></button>").addClass('btn btn-success btn-sm dec5Player' + playerIndex + 'Com' + index).text('- 5')).append($("<button></button>").addClass('btn btn-success btn-sm spearator inc5Player' + playerIndex + 'Com' + index).text('+ 5')));
        }
    });
}

for(var playerIndex=0; playerIndex<players.length; playerIndex++){
    tableCreationGridAndPlayerName();
    tableCreatingGrindAndCommanderName();
    tableCreationGridAndPlayerHp();
    tableCreationGridAndCommanderHp();
    tableCreationHpButtons();
}

$('.table'+(players.length-1)).removeClass('bottomBorderClass');


/*---------------------------------- /TABLE CREATION----------------------------------*/

/*---------------------------------- COMMANDER BUTTONS----------------------------------*/

function dec1PlayerIndexComIndex(name, playerIndex, commanderIndex){
    $('.'+name).click(function() {
        event.preventDefault();
        hp[playerIndex] = hp[playerIndex] - 1;
        commanderHp[playerIndex][commanderIndex]= commanderHp[playerIndex][commanderIndex] - 1;
        if(hp[playerIndex] <= 0){
            $('.tableDiv'+playerIndex).css("display", "none");
            placementArr.unshift(players[playerIndex]);
        } else if(commanderHp[playerIndex][commanderIndex] <= 0){
            $('.tableDiv'+playerIndex).css("display", "none");
            placementArr.unshift(players[playerIndex]);
            gg(playerIndex);
        }

        hashLog['playerLog'+step]='Player '+players[playerIndex]+' took 1 HP dmg '+'and has '+hp[playerIndex]+'HP left';
        hashLog['OperatorNumberPlayerCommanderLog'+step]=['-',1,playerIndex,hp[playerIndex], commanderIndex, commanderHp[playerIndex][commanderIndex]];
        hashLog['commanderLog'+step]='Player '+players[playerIndex]+' took 1 commander dmg form '+pickedCommanders[commanderIndex];
        $('#btnUndo').removeClass('disabled').removeAttr("disabled", "disabled");
        step++;

        if(placementArr.length == players.length-1){
            players.forEach(function(player) {
                if(placementArr.indexOf(player)<0){
                    placementArr.unshift(player);
                }
            });
            $('#placement').empty();
            for(placementArrIndex=0; placementArrIndex<placementArr.length; placementArrIndex++){
                $('#placement').append($("<ol></ol>").text((1+placementArrIndex)+'. Place  '+placementArr[placementArrIndex]));
            }
            $('#placementModal').modal('show');
        }
        $('.tableRowBody'+playerIndex).empty();
        $('.tableRowBody'+playerIndex).append($("<th></th>").attr( "scope", "row" ));
        $('.tableRowBody'+playerIndex).append($("<td></td>").text(hp[playerIndex]));
        pickedCommanders.forEach(function(commander, index) {
            if(playerIndex != index){
                $('.tableRowBody' + playerIndex).append($("<td></td>").text(commanderHp[playerIndex][index]));
            }
        });
    });
}

function inc1PlayerIndexComIndex(name, playerIndex, commanderIndex){
    $('.'+name).click(function() {
        event.preventDefault();
        hp[playerIndex] = hp[playerIndex] + 1;
        commanderHp[playerIndex][commanderIndex]= commanderHp[playerIndex][commanderIndex] + 1;

        hashLog['playerLog'+step]='Player '+players[playerIndex]+' gained 1 HP '+'and has '+hp[playerIndex]+'HP left';
        hashLog['OperatorNumberPlayerCommanderLog'+step]=['+',1,playerIndex,hp[playerIndex], commanderIndex, commanderHp[playerIndex][commanderIndex]];
        hashLog['commanderLog'+step]='Player '+players[playerIndex]+' gained 1 commander HP form '+pickedCommanders[commanderIndex];
        $('#btnUndo').removeClass('disabled').removeAttr("disabled", "disabled");
        step++;

        $('.tableRowBody'+playerIndex).empty();
        $('.tableRowBody'+playerIndex).append($("<th></th>").attr( "scope", "row" ));
        $('.tableRowBody'+playerIndex).append($("<td></td>").text(hp[playerIndex]));

        pickedCommanders.forEach(function(commander, index) {
            if(playerIndex != index){
                $('.tableRowBody' + playerIndex).append($("<td></td>").text(commanderHp[playerIndex][index]));
            }
        });
    });
}

function dec5PlayerIndexComIndex(name, playerIndex, commanderIndex){
    $('.'+name).click(function() {
        event.preventDefault();
        hp[playerIndex] = hp[playerIndex] - 5;
        commanderHp[playerIndex][commanderIndex]= commanderHp[playerIndex][commanderIndex] - 5;
        if(hp[playerIndex] <= 0){
            $('.tableDiv'+playerIndex).css("display", "none");
            placementArr.unshift(players[playerIndex]);
        } else if(commanderHp[playerIndex][commanderIndex] <= 0){
            $('.tableDiv'+playerIndex).css("display", "none");
            placementArr.unshift(players[playerIndex]);
            gg(playerIndex);
        }

        if(placementArr.length == players.length-1){
            players.forEach(function(player) {
                if(placementArr.indexOf(player)<0){
                    placementArr.unshift(player);
                }
            });
            $('#placement').empty();
            for(placementArrIndex=0; placementArrIndex<placementArr.length; placementArrIndex++){
                $('#placement').append($("<ol></ol>").text((1+placementArrIndex)+'. Place  '+placementArr[placementArrIndex]));
            }
            $('#placementModal').modal('show');
        }

        hashLog['playerLog'+step]='Player '+players[playerIndex]+' took 5 HP dmg '+'and has '+hp[playerIndex]+'HP left';
        hashLog['OperatorNumberPlayerCommanderLog'+step]=['-',5,playerIndex,hp[playerIndex], commanderIndex, commanderHp[playerIndex][commanderIndex]];
        hashLog['commanderLog'+step]='Player '+players[playerIndex]+' took 5 commander dmg form '+pickedCommanders[commanderIndex];
        $('#btnUndo').removeClass('disabled').removeAttr("disabled", "disabled");
        step++;

        $('.tableRowBody'+playerIndex).empty();
        $('.tableRowBody'+playerIndex).append($("<th></th>").attr( "scope", "row" ));
        $('.tableRowBody'+playerIndex).append($("<td></td>").text(hp[playerIndex]));

        pickedCommanders.forEach(function(commander, index) {
            if(playerIndex != index){
                $('.tableRowBody' + playerIndex).append($("<td></td>").text(commanderHp[playerIndex][index]));
            }
        });
    });
}

function inc5PlayerIndexComIndex(name, playerIndex, commanderIndex){
    $('.'+name).click(function() {
        event.preventDefault();
        hp[playerIndex] = hp[playerIndex] + 5;
        commanderHp[playerIndex][commanderIndex]= commanderHp[playerIndex][commanderIndex] + 5;

        hashLog['playerLog'+step]='Player '+players[playerIndex]+' gained 5 HP '+'and has '+hp[playerIndex]+'HP left';
        hashLog['OperatorNumberPlayerCommanderLog'+step]=['+',5,playerIndex,hp[playerIndex], commanderIndex, commanderHp[playerIndex][commanderIndex]];
        hashLog['commanderLog'+step]='Player '+players[playerIndex]+' gained 5 commander HP form '+pickedCommanders[commanderIndex];
        $('#btnUndo').removeClass('disabled').removeAttr("disabled", "disabled");
        step++;

        $('.tableRowBody'+playerIndex).empty();
        $('.tableRowBody'+playerIndex).append($("<th></th>").attr( "scope", "row" ));
        $('.tableRowBody'+playerIndex).append($("<td></td>").text(hp[playerIndex]));

        pickedCommanders.forEach(function(commander, index) {
            if(playerIndex != index){
                $('.tableRowBody' + playerIndex).append($("<td></td>").text(commanderHp[playerIndex][index]));
            }
        });
    });
}

for(var playerIndex=0; playerIndex<players.length; playerIndex++){
    for(var commanderIndex=0; commanderIndex<players.length; commanderIndex++) {
        dec1PlayerIndexComIndex('dec1Player'+playerIndex+'Com'+commanderIndex, playerIndex, commanderIndex);
        inc1PlayerIndexComIndex('inc1Player'+playerIndex+'Com'+commanderIndex, playerIndex, commanderIndex);
        dec5PlayerIndexComIndex('dec5Player'+playerIndex+'Com'+commanderIndex, playerIndex, commanderIndex);
        inc5PlayerIndexComIndex('inc5Player'+playerIndex+'Com'+commanderIndex, playerIndex, commanderIndex);
    }
}

/*---------------------------------- /COMMANDER BUTTONS----------------------------------*/

/*---------------------------------- HP BUTTONS----------------------------------*/

function dec1HpPlayerIndex(name, playerIndex){
    $('.'+name).click(function() {
        event.preventDefault();
        hp[playerIndex] = hp[playerIndex] - 1;
        if(hp[playerIndex] <= 0){
            $('.tableDiv'+playerIndex).css("display", "none");
            placementArr.unshift(players[playerIndex]);
            gg(playerIndex);
        }
        if(placementArr.length == players.length-1){
            players.forEach(function(player) {
                if(placementArr.indexOf(player)<0){
                    placementArr.unshift(player);
                }
            });
            $('#placement').empty();
            for(placementArrIndex=0; placementArrIndex<placementArr.length; placementArrIndex++){
                $('#placement').append($("<ol></ol>").text((1+placementArrIndex)+'. Place  '+placementArr[placementArrIndex]));
            }
            $('#placementModal').modal('show');
        }

        hashLog['playerLog'+step]='Player '+players[playerIndex]+' took 1 HP dmg '+'and has '+hp[playerIndex]+'HP left';
        hashLog['OperatorNumberPlayerCommanderLog'+step]=['-',1,playerIndex,hp[playerIndex]];
        hashLog['commanderLog'+step]='Player '+players[playerIndex]+' was not attacked by a commander this turn';
        $('#btnUndo').removeClass('disabled').removeAttr("disabled", "disabled");
        step++;

        $('.tableRowBody'+playerIndex).empty();
        $('.tableRowBody'+playerIndex).append($("<th></th>").attr( "scope", "row" ));
        $('.tableRowBody'+playerIndex).append($("<td></td>").text(hp[playerIndex]));
        pickedCommanders.forEach(function(commander, index) {
            if(playerIndex != index){
                $('.tableRowBody' + playerIndex).append($("<td></td>").text(commanderHp[playerIndex][index]));
            }
        });
    });
}

function inc1HpPlayerIndex(name, playerIndex){
    $('.'+name).click(function() {
        event.preventDefault();
        hp[playerIndex] = hp[playerIndex] + 1;

        hashLog['playerLog'+step]='Player '+players[playerIndex]+' gained 1 HP '+'and has '+hp[playerIndex]+'HP left';
        hashLog['OperatorNumberPlayerCommanderLog'+step]=['+',1,playerIndex,hp[playerIndex]];
        hashLog['commanderLog'+step]='Player '+players[playerIndex]+' was not attacked by a commander this turn';
        $('#btnUndo').removeClass('disabled').removeAttr("disabled", "disabled");
        step++;

        $('.tableRowBody'+playerIndex).empty();
        $('.tableRowBody'+playerIndex).append($("<th></th>").attr( "scope", "row" ));
        $('.tableRowBody'+playerIndex).append($("<td></td>").text(hp[playerIndex]));
        pickedCommanders.forEach(function(commander, index) {
            if(playerIndex != index){
                $('.tableRowBody' + playerIndex).append($("<td></td>").text(commanderHp[playerIndex][index]));
            }
        });
    });
}

function dec5HpPlayerIndex(name, playerIndex){
    $('.'+name).click(function() {
        event.preventDefault();
        hp[playerIndex] = hp[playerIndex] - 5;
        if(hp[playerIndex] <= 0){
            $('.tableDiv'+playerIndex).css("display", "none");
            placementArr.unshift(players[playerIndex]);
            gg(playerIndex);
        }
        if(placementArr.length == players.length-1){
            players.forEach(function(player) {
                if(placementArr.indexOf(player)<0){
                    placementArr.unshift(player);
                }
            });
            $('#placement').empty();
            for(placementArrIndex=0; placementArrIndex<placementArr.length; placementArrIndex++){
                $('#placement').append($("<ol></ol>").text((1+placementArrIndex)+'. Place  '+placementArr[placementArrIndex]));
            }
            $('#placementModal').modal('show');
        }

        hashLog['playerLog'+step]='Player '+players[playerIndex]+' took 5 HP dmg '+'and has '+hp[playerIndex]+'HP left';
        hashLog['OperatorNumberPlayerCommanderLog'+step]=['-',5,playerIndex,hp[playerIndex]];
        hashLog['commanderLog'+step]='Player '+players[playerIndex]+' was not attacked by a commander this turn';
        $('#btnUndo').removeClass('disabled').removeAttr("disabled", "disabled");
        step++;

        $('.tableRowBody'+playerIndex).empty();
        $('.tableRowBody'+playerIndex).append($("<th></th>").attr( "scope", "row" ));
        $('.tableRowBody'+playerIndex).append($("<td></td>").text(hp[playerIndex]));
        pickedCommanders.forEach(function(commander, index) {
            if(playerIndex != index){
                $('.tableRowBody' + playerIndex).append($("<td></td>").text(commanderHp[playerIndex][index]));
            }
        });
    });
}

function inc5HpPlayerIndex(name, playerIndex){
    $('.'+name).click(function() {
        event.preventDefault();
        hp[playerIndex] = hp[playerIndex] + 5;

        hashLog['playerLog'+step]='Player '+players[playerIndex]+' gained 5 HP '+'and has '+hp[playerIndex]+'HP left';
        hashLog['OperatorNumberPlayerCommanderLog'+step]=['+',5,playerIndex,hp[playerIndex]];
        hashLog['commanderLog'+step]='Player '+players[playerIndex]+' was not attacked by a commander this turn';
        $('#btnUndo').removeClass('disabled').removeAttr("disabled", "disabled");
        step++;

        $('.tableRowBody'+playerIndex).empty();
        $('.tableRowBody'+playerIndex).append($("<th></th>").attr( "scope", "row" ));
        $('.tableRowBody'+playerIndex).append($("<td></td>").text(hp[playerIndex]));
        pickedCommanders.forEach(function(commander, index) {
            if(playerIndex != index){
                $('.tableRowBody' + playerIndex).append($("<td></td>").text(commanderHp[playerIndex][index]));
            }
        });

    });
}
for(var playerIndex=0; playerIndex<players.length; playerIndex++){
    dec1HpPlayerIndex('dec1HpPlayer'+playerIndex, playerIndex);
    inc1HpPlayerIndex('inc1HpPlayer'+playerIndex, playerIndex);
    dec5HpPlayerIndex('dec5HpPlayer'+playerIndex, playerIndex);
    inc5HpPlayerIndex('inc5HpPlayer'+playerIndex, playerIndex);
}

/*---------------------------------- /HP BUTTONS----------------------------------*/

/*---------------------------------- COMBAT LOG BUTTON----------------------------------*/
function combatLogWrite(){
    for(log=1; log<=step; log++){
        $('#divCombatLog').append($("<p></p>").text(hashLog['playerLog'+log]));
        $('#divCombatLog').append($("<p></p>").text(hashLog['commanderLog'+log]));
        $('#divCombatLog').append($("</br>"));
    }
}

$('#btnCombatLog').click(function() {
    $('#divCombatLog').empty();
    combatLogWrite();
});

/*---------------------------------- UNDO BUTTON----------------------------------*/

$('#btnUndo').addClass('disabled').attr("disabled", "disabled");
$('#btnUndo').click(function() {
    event.preventDefault();
    function hashOperatorPlayerPlus(number) {
        if(placementArr.length == players.length) {
            placementArr.shift();
        }
        if(hp[hashLog['OperatorNumberPlayerCommanderLog' + logStep][2]] <= 0){
            $('.tableDiv'+hashLog['OperatorNumberPlayerCommanderLog' + logStep][2]).show();
            placementArr.shift();
        }
        hp[hashLog['OperatorNumberPlayerCommanderLog' + logStep][2]] += number;
        $('.tableRowBody'+hashLog['OperatorNumberPlayerCommanderLog' + logStep][2]).empty();
        $('.tableRowBody'+hashLog['OperatorNumberPlayerCommanderLog' + logStep][2]).append($("<th></th>").attr( "scope", "row" ));
        $('.tableRowBody'+hashLog['OperatorNumberPlayerCommanderLog' + logStep][2]).append($("<td></td>").text(hp[hashLog['OperatorNumberPlayerCommanderLog' + logStep][2]]));
        pickedCommanders.forEach(function(commander, index) {
            if(hashLog['OperatorNumberPlayerCommanderLog' + logStep][2] != index){
                $('.tableRowBody' + hashLog['OperatorNumberPlayerCommanderLog' + logStep][2]).append($("<td></td>").text(commanderHp[hashLog['OperatorNumberPlayerCommanderLog' + logStep][2]][index]));
            }
        });
        delete hashLog["OperatorNumberPlayerCommanderLog" + logStep];
        delete hashLog["playerLog" + logStep];
        delete hashLog["commanderLog" + logStep];
    }

    function hashOperatorPlayerMinus(number) {
        if(placementArr.length == players.length) {
            placementArr.shift();
        }
        if(hp[hashLog['OperatorNumberPlayerCommanderLog' + logStep][2]] <= 0){
            $('.tableDiv'+hashLog['OperatorNumberPlayerCommanderLog' + logStep][2]).show();
            placementArr.shift();
        }
        hp[hashLog['OperatorNumberPlayerCommanderLog' + logStep][2]] -= number;
        $('.tableRowBody'+hashLog['OperatorNumberPlayerCommanderLog' + logStep][2]).empty();
        $('.tableRowBody'+hashLog['OperatorNumberPlayerCommanderLog' + logStep][2]).append($("<th></th>").attr( "scope", "row" ));
        $('.tableRowBody'+hashLog['OperatorNumberPlayerCommanderLog' + logStep][2]).append($("<td></td>").text(hp[hashLog['OperatorNumberPlayerCommanderLog' + logStep][2]]));
        pickedCommanders.forEach(function(commander, index) {
            if(hashLog['OperatorNumberPlayerCommanderLog' + logStep][2] != index){
                $('.tableRowBody' + hashLog['OperatorNumberPlayerCommanderLog' + logStep][2]).append($("<td></td>").text(commanderHp[hashLog['OperatorNumberPlayerCommanderLog' + logStep][2]][index]));
            }
        });
        delete hashLog["OperatorNumberPlayerCommanderLog" + logStep];
        delete hashLog["playerLog" + logStep];
        delete hashLog["commanderLog" + logStep];
    }

    function hashOperatorPlayerCommanderPlus(number) {
        if(placementArr.length == players.length) {
            placementArr.shift();
        }
        if(hp[hashLog['OperatorNumberPlayerCommanderLog' + logStep][2]] <= 0){
            $('.tableDiv'+hashLog['OperatorNumberPlayerCommanderLog' + logStep][2]).show();
            placementArr.shift();
        }
        if(commanderHp[hashLog['OperatorNumberPlayerCommanderLog' + logStep][2]][hashLog['OperatorNumberPlayerCommanderLog' + logStep][4]] <= 0){
            $('.tableDiv'+hashLog['OperatorNumberPlayerCommanderLog' + logStep][2]).show();
            placementArr.shift();
        }
        hp[hashLog['OperatorNumberPlayerCommanderLog' + logStep][2]] += number;
        commanderHp[hashLog['OperatorNumberPlayerCommanderLog' + logStep][2]][hashLog['OperatorNumberPlayerCommanderLog' + logStep][4]] += number;
        $('.tableRowBody'+hashLog['OperatorNumberPlayerCommanderLog' + logStep][2]).empty();
        $('.tableRowBody'+hashLog['OperatorNumberPlayerCommanderLog' + logStep][2]).append($("<th></th>").attr( "scope", "row" ));
        $('.tableRowBody'+hashLog['OperatorNumberPlayerCommanderLog' + logStep][2]).append($("<td></td>").text(hp[hashLog['OperatorNumberPlayerCommanderLog' + logStep][2]]));
        pickedCommanders.forEach(function(commander, index) {
            if(hashLog['OperatorNumberPlayerCommanderLog' + logStep][2] != index){
                $('.tableRowBody' + hashLog['OperatorNumberPlayerCommanderLog' + logStep][2]).append($("<td></td>").text(commanderHp[hashLog['OperatorNumberPlayerCommanderLog' + logStep][2]][index]));
            }
        });
        delete hashLog["OperatorNumberPlayerCommanderLog" + logStep];
        delete hashLog["playerLog" + logStep];
        delete hashLog["commanderLog" + logStep];
    }

    function hashOperatorPlayerCommanderMinus(number) {
        if(placementArr.length == players.length) {
            placementArr.shift();
        }
        if(hp[hashLog['OperatorNumberPlayerCommanderLog' + logStep][2]] <= 0){
            $('.tableDiv'+hashLog['OperatorNumberPlayerCommanderLog' + logStep][2]).show();
            placementArr.shift();
        }
        if(commanderHp[hashLog['OperatorNumberPlayerCommanderLog' + logStep][2]][hashLog['OperatorNumberPlayerCommanderLog' + logStep][4]] <= 0){
            $('.tableDiv'+hashLog['OperatorNumberPlayerCommanderLog' + logStep][2]).show();
            placementArr.shift();
        }
        hp[hashLog['OperatorNumberPlayerCommanderLog' + logStep][2]] -= number;
        commanderHp[hashLog['OperatorNumberPlayerCommanderLog' + logStep][2]][hashLog['OperatorNumberPlayerCommanderLog' + logStep][4]] -= number;
        $('.tableRowBody'+hashLog['OperatorNumberPlayerCommanderLog' + logStep][2]).empty();
        $('.tableRowBody'+hashLog['OperatorNumberPlayerCommanderLog' + logStep][2]).append($("<th></th>").attr( "scope", "row" ));
        $('.tableRowBody'+hashLog['OperatorNumberPlayerCommanderLog' + logStep][2]).append($("<td></td>").text(hp[hashLog['OperatorNumberPlayerCommanderLog' + logStep][2]]));
        pickedCommanders.forEach(function(commander, index) {
            if(hashLog['OperatorNumberPlayerCommanderLog' + logStep][2] != index){
                $('.tableRowBody' + hashLog['OperatorNumberPlayerCommanderLog' + logStep][2]).append($("<td></td>").text(commanderHp[hashLog['OperatorNumberPlayerCommanderLog' + logStep][2]][index]));
            }
        });
        delete hashLog["OperatorNumberPlayerCommanderLog" + logStep];
        delete hashLog["playerLog" + logStep];
        delete hashLog["commanderLog" + logStep];
    }

    var logStep=Object.keys(hashLog).length/3;
    if(Object.keys(hashLog['OperatorNumberPlayerCommanderLog'+logStep]).length == 4){
        if(hashLog['OperatorNumberPlayerCommanderLog'+logStep][0] == '-') {
            if(hashLog['OperatorNumberPlayerCommanderLog'+logStep][1] == 1){
                hashOperatorPlayerPlus(1);
            } else if (hashLog['OperatorNumberPlayerCommanderLog'+logStep][1] == 5){
                hashOperatorPlayerPlus(5);
            }
        } else if(hashLog['OperatorNumberPlayerCommanderLog'+logStep][0] == '+') {
            if(hashLog['OperatorNumberPlayerCommanderLog'+logStep][1] == 1){
                hashOperatorPlayerMinus(1);
            } else if (hashLog['OperatorNumberPlayerCommanderLog'+logStep][1] == 5){
                hashOperatorPlayerMinus(5);
            }
        }
    } else if (Object.keys(hashLog['OperatorNumberPlayerCommanderLog'+logStep]).length == 6){
        if(hashLog['OperatorNumberPlayerCommanderLog'+logStep][0] == '-') {
            if(hashLog['OperatorNumberPlayerCommanderLog'+logStep][1] == 1){
                hashOperatorPlayerCommanderPlus(1);
            } else if (hashLog['OperatorNumberPlayerCommanderLog'+logStep][1] == 5){
                hashOperatorPlayerCommanderPlus(5);
            }
        } else if(hashLog['OperatorNumberPlayerCommanderLog'+logStep][0] == '+') {
            if(hashLog['OperatorNumberPlayerCommanderLog'+logStep][1] == 1){
                hashOperatorPlayerCommanderMinus(1);
            } else if (hashLog['OperatorNumberPlayerCommanderLog'+logStep][1] == 5){
                hashOperatorPlayerCommanderMinus(5);
            }
        }
    }
    logStep--;
    step--;
    if(Object.keys(hashLog).length == 0){
        $('#btnUndo').addClass('disabled').attr("disabled", "disabled");
    } else {
        $('#btnUndo').removeClass('disabled').removeAttr("disabled", "disabled");
    }
});