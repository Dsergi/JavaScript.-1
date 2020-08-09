var gameBoard = {
    cells : [],
    startCoords: {
        x: 0,
        y: 0,
        direction: "Up"
    }
}

var player = {
    coords: {
        x: 0,
        y: 0,
        direction: "Up",
    },
    state: {
        haveKey: false,
        exitFound: false,
    }
}

var BOARD = ["==========",
             "=     *  =",
             "=  K     =",
             "=        =",
             "=  *     =",
             "=     E  =",
             "=        =",
             "=        =",
             "=  ***   =",
             "=========="];
var STARTPOSITION = {
    x: 1,
    y: 8,
    direction: "Right"
}

function initBoard(board, startPosition) {
    gameBoard.cells = [];
    for (var i = 0; i<board.length; i++) {
        gameBoard.cells[i] = [];
        for (var j = 0; j<board[i].length; j++) {
            switch (board[i][j]) {
                case "K" :
                    gameBoard.cells[i][j] = { type: "Key" };
                    break;
                case "E" :
                    gameBoard.cells[i][j] = { type: "Exit" };
                    break;
                case " " :
                    gameBoard.cells[i][j] = { type: "Empty" };
                    break;
                case "*" :
                    gameBoard.cells[i][j] = { type: "Trap" };
                    break;
                default:
                    gameBoard.cells[i][j] = { type: "Wall" };
            }
        }
    }
    gameBoard.startCoords.x = startPosition.x;
    gameBoard.startCoords.y = startPosition.y;
    gameBoard.startCoords.direction = startPosition.direction;
}

function initPlayer(board) {
    player.coords.x = board.startCoords.x;
    player.coords.y = board.startCoords.y;
    player.coords.direction = board.startCoords.direction;
    player.state.haveKey = false;
    player.state.exitFound = false;
    player.state.trap =false;
}

function renderBoard(board) {
    for (var i = 0; i<board.cells.length; i++) {
        var line = "";
        for (var j = 0; j<board.cells[i].length; j++) {
            if (i == player.coords.y &&
                j == player.coords.x) {
                line += "@";
            } else {
                switch (board.cells[i][j].type) {
                    case "Key":
                        line += "K";
                        break;
                    case "Exit":
                        line += "E";
                        break;
                    case "Wall":
                        line += "=";
                        break;
                    case "Empty":
                        line += " ";
                        break;
                    case "Trap":
                        line += "*";
                        break;
                        
                }
            }
        }
        console.log(i + " : " + line);
    }
}

function getNewCoords(player) {
    var result = {
        x: player.coords.x,
        y: player.coords.y,
    }

    switch (player.coords.direction) {
        case "Up": 
            result.y--;
            break;
        case "Down": 
            result.y++;
            break;
        case "Left": 
            result.x--;
            break;
        case "Right": 
            result.x++;
            break;
    }

    return result;
}

function canMove(player, board) {
    var result = true;
    
    switch (player.coords.direction) {
        case "Up" : if (player.coords.y == 0 ||
                    board.cells[player.coords.y-1][player.coords.x].type == "Wall") {
                        result = false;
                    };
                break;
        case "Down" : if (player.coords.y == board.cells.length-1 ||
                     board.cells[player.coords.y+1][player.coords.x].type == "Wall") {
                        result = false;
                    };
                break;
        case "Right" : if (player.coords.x == board.cells[player.coords.y].length-1 ||
                    board.cells[player.coords.y][player.coords.x+1].type == "Wall") {
                       result = false;
                   };
               break;
        case "Left" :  if (player.coords.x == 0 ||
            board.cells[player.coords.y][player.coords.x-1].type == "Wall") {
               result = false;
           };
       break;
    }

    return result;
}

function movePlayer(player, board) {
    if (canMove(player, board)) {
        var newCoords = getNewCoords(player);
        
        switch (board.cells[newCoords.y][newCoords.x].type) {
            case "Key":
                player.state.haveKey = true;
                alert("Вы нашли ключ! Ищите выход!");
                break;
            case "Exit":
                if (player.state.haveKey) {
                    alert("Вы выиграли!");
                    player.state.exitFound = true;
                } else {
                    alert("Вы нашли выход, но у вас нет ключа!");
                };
                break;
            case "Trap":
                    player.state.trap = true;
                    alert("Вы попали в ловушку!");                    
                    break;                    
        }

        player.coords.x = newCoords.x;
        player.coords.y = newCoords.y;
    } else {
        alert("Вы не можете двигаться в данном направлении!");
    }
}

initBoard(BOARD, STARTPOSITION);
initPlayer(gameBoard);

var leftDirection = {
    Up: "Left",
    Down: "Right",
    Left: "Down",
    Right: "Up",
}

var rightDirection = {
    Up: "Right",
    Down: "Left",
    Left: "Up",
    Right: "Down",
}

while (!player.state.exitFound) {
    renderBoard(gameBoard);
    console.log(JSON.stringify(player));
    var command = prompt("Введите команду (Go/Left/Right/Exit):");

    switch (command) {
        case "Go": 
            movePlayer(player, gameBoard);
            break;
        case "Left": 
            player.coords.direction = leftDirection[player.coords.direction]; 
            break;
        case "Right":
            player.coords.direction = rightDirection[player.coords.direction]; 
            break;
        case "Exit":
            player.state.exitFound = true;
            break;
         
        default:
            alert("Неизвестная команда!");
    }
}

alert("Игра окончена");