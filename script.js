//chess project - Michel Bartoszewicz

var whereIsUser = ["difficulty", "colorOfPieces", "time", "actualGame"];
var gameDifficulty;
var piecesColor='';
var timeInput=0;
var positionIndex;
var moveTurn=1;
var timeHasBeenAdded=false;
let chessBoardDataSaved;
var blackTurn;
var whiteTurn;
var blackTime;
var whiteTime;
var dotsActive;
var chessboard = ["W","S","G","K","H","G","S","W"
                 ,"P","P","P","P","P","P","P","P"
                 ,".",".",".",".",".",".",".","."
                 ,".",".",".",".",".",".",".","."
                 ,".",".",".",".",".",".",".","."
                 ,".",".",".",".",".",".",".","."
                 ,"p","p","p","p","p","p","p","p"
                 ,"w","s","g","k","h","g","s","w"];
var pawnFirstMove = [false,false,false,false,false,false,false,false];
dotsActive=sessionStorage.getItem('dotsActive');
chessboard= JSON.parse(sessionStorage.getItem('chessboard'));
gameDifficulty = sessionStorage.getItem('gameDifficulty');
timeInput = sessionStorage.getItem('timeInput');
piecesColor = sessionStorage.getItem('piecesColor');
timeHasBeenAdded = sessionStorage.getItem('timeHasBeenAdded');
blackTime=sessionStorage.getItem('blackTime');
whiteTime=sessionStorage.getItem('whiteTime');
moveTurn=sessionStorage.getItem('moveTurn');
blackTurn=sessionStorage.getItem('blackTurn');
whiteTurn=sessionStorage.getItem('whiteTurn');

if(whiteTurn===null)    {
    whiteTurn=1;
    blackTurn=0;
}
if(moveTurn===null)
    moveTurn=1;
if(piecesColor===null)
    piecesColor='black';
if(dotsActive===null)   {
    dotsActive=false;
}
chessBoardDataSaved=sessionStorage.getItem('chessBoardDataSaved');
if(timeHasBeenAdded===null)
    timeHasBeenAdded=false;

if(piecesColor==='black' && chessboard===null){
    chessboard = ["W","S","G","K","H","G","S","W"
                 ,"P","P","P","P","P","P","P","P"
                 ,".",".",".",".",".",".",".","."
                 ,".",".",".",".",".",".",".","."
                 ,".",".",".",".",".",".",".","."
                 ,".",".",".",".",".",".",".","."
                 ,"p","p","p","p","p","p","p","p"
                 ,"w","s","g","k","h","g","s","w"];
}
else if(piecesColor==='white' && chessboard===null)   {
    chessboard = ["w","s","g","k","h","g","s","w"
                 ,"p","p","p","p","p","p","p","p"
                 ,".",".",".",".",".",".",".","."
                 ,".",".",".",".",".",".",".","."
                 ,".",".",".",".",".",".",".","."
                 ,".",".",".",".",".",".",".","."
                 ,"P","P","P","P","P","P","P","P"
                 ,"W","S","G","H","K","G","S","W"];

}

const changingPositionInWebsite = () => {
    let fileName = location.pathname.split("/").slice(-1);
    positionIndex = whatIsUserPosition(fileName[0]);
    switch(fileName[0])    {
        case "whichDifficulty.html":
            document.addEventListener('DOMContentLoaded', () => {
            const Buttons = document.getElementsByClassName('button');
            let isInside = [Buttons.length];
            let index=0;
            for (const button of Buttons) {
                if(button)  {
                    button.addEventListener('mouseenter', () => {
                        isInside[index] = true;
                    });
                    button.addEventListener('mouseleave', () => {
                        isInside[index] = false; 
                    });
                    button.addEventListener('click', ()=> {
                        if(isInside[index]) {
                            sessionStorage.setItem('gameDifficulty', button.getAttribute("id"));
                        }
                    });
                    index++;
                }
            }
        
        });
        case "whichPieces.html":
            document.addEventListener('DOMContentLoaded', () => {
            const Buttons = document.getElementsByClassName('button');
            let isInside = [Buttons.length];
            let index=0;
            for (const button of Buttons) {
                if(button)  {
                    button.addEventListener('mouseenter', () => {
                        isInside[index] = true;
                    });
                    button.addEventListener('mouseleave', () => {
                        isInside[index] = false; 
                    });
                    button.addEventListener('click', ()=> {
                        if(isInside[index]) {
                            sessionStorage.setItem('piecesColor', button.getAttribute("id"));

                        }
                    });
                    index++;
                }
            }
            
        });
        case 'whatTime.html':
            document.addEventListener('DOMContentLoaded', () => {
                timeInput = document.getElementById("timeForBothPlayers");
                    timeInput.addEventListener('input', (input) => {
                        timeInput.addEventListener('keydown', (press) => {
                            if(press.key==='Enter')   {
                                input = timeInput.value;
                                if(isTimeInputCorrect(input)===true && Number(input) < 3600*24)    {
                                    sessionStorage.setItem('timeInput', Number(timeInput.value));
                                        if(timeHasBeenAdded===false)    {
                                            sessionStorage.setItem('timeHasBeenAdded',true);
                                            sessionStorage.setItem('blackTime', Number(timeInput.value));
                                            sessionStorage.setItem('whiteTime', Number(timeInput.value));                                            
                                        }   
                                    positionIndex++;
                                    location.replace('chess.html');
                                }
                            }
                        });
                        
                });
            }
        );
        case 'chess.html':
            document.addEventListener('DOMContentLoaded', () => {
                DrawChessboardAndPieces();
        });
        case 'result.html':
            document.addEventListener('DOMContentLoaded', () => {
                let result = document.getElementById("gameResult");
            });
    }

}

const DrawChessboardAndPieces = () => {
    let userTimer = document.getElementById("timer2");
    let enemyTimer = document.getElementById("timer1");
    console.log(moveTurn, piecesColor, blackTurn, whiteTurn);
        if(moveTurn===0)   {
            console.log("lol lol lol1");
            userTimer.innerHTML=cloakControl(piecesColor, blackTurn);
            enemyTimer.innerHTML=cloakControl('white', whiteTurn);
        }
        else if(moveTurn===1){
            console.log("lol lol lol4");
            userTimer.innerHTML=cloakControl(piecesColor, whiteTurn);
            enemyTimer.innerHTML=cloakControl('black', blackTurn);
        }

    let darkSquare='rgb(120, 120, 120)';
    let lightSquare='rgb(255, 250, 205)';

        if(piecesColor==='black')   {
            userTimer.style.backgroundColor = darkSquare;
            userTimer.style.borderColor = lightSquare;
            userTimer.style.color = lightSquare;
            enemyTimer.style.backgroundColor = lightSquare;
            enemyTimer.style.borderColor = darkSquare;
            enemyTimer.style.color = darkSquare;
        }
        else    {
            userTimer.style.backgroundColor = lightSquare;
            userTimer.style.borderColor = darkSquare;
            userTimer.style.color = darkSquare;
            enemyTimer.style.backgroundColor = darkSquare;
            enemyTimer.style.borderColor = lightSquare;
            enemyTimer.style.color = lightSquare;
        }
            chessBoardDataSaved=sessionStorage.getItem('chessBoardDataSaved');
                if(chessBoardDataSaved===null)
                    chessBoardDataSaved=false;
            let chessboardCells = document.getElementsByClassName('cell');
            let index=0;
            let insideCell=false;
            for(let Cell of chessboardCells) {
                if(index%2===0 && Math.floor(index/8)%2===0 || index%2!==0 && Math.floor(index/8)%2!==0)    {
                    if(piecesColor==='black')   {
                        Cell.style.backgroundColor = lightSquare;
                    }
                    else if(piecesColor==='white')  {
                        Cell.style.backgroundColor = darkSquare;
                    }
                }
                else    {
                    if(piecesColor==='black')   {
                        Cell.style.backgroundColor = darkSquare;
                    }
                    else if(piecesColor==='white')  {
                        Cell.style.backgroundColor = lightSquare;
                    }
                }

                if(chessboard[index]==="k")
                    Cell.innerHTML = '<img src="chessPieces/blackKing.png">';
                else if(chessboard[index]==="p")
                    Cell.innerHTML = '<img src="chessPieces/blackPawn.png">';   
                else if(chessboard[index]==="w")
                    Cell.innerHTML = '<img src="chessPieces/blackRook.png">';
                else if(chessboard[index]==="s")
                    Cell.innerHTML = '<img src="chessPieces/blackKnight.png">';
                else if(chessboard[index]==="g")
                    Cell.innerHTML = '<img src="chessPieces/blackBishop.png">';
                else if(chessboard[index]==="h")
                    Cell.innerHTML = '<img src="chessPieces/blackQueen.png">';
                else if(chessboard[index]==="K")
                    Cell.innerHTML = '<img src="chessPieces/whiteKing.png">';
                else if(chessboard[index]==="P")
                    Cell.innerHTML = '<img src="chessPieces/whitePawn.png">';   
                else if(chessboard[index]==="W")
                    Cell.innerHTML = '<img src="chessPieces/whiteRook.png">';
                else if(chessboard[index]==="S")
                    Cell.innerHTML = '<img src="chessPieces/whiteKnight.png">';
                else if(chessboard[index]==="G")
                    Cell.innerHTML = '<img src="chessPieces/whiteBishop.png">';
                else if(chessboard[index]==="H")
                    Cell.innerHTML = '<img src="chessPieces/whiteQueen.png">';
                else if(chessboard[index]==="C")
                    Cell.innerHTML = '<img src="chessPieces/dot.png">';

                index++;
        
            };

            for(let I=0;I<chessboardCells.length;I++)   {
                chessboardCells[I].addEventListener('mouseenter', () => {
                    insideCell=true;
                });
                chessboardCells[I].addEventListener('mouseleave', () => {
                    insideCell=false;
                });
                chessboardCells[I].addEventListener('click', () => {
                    let clickedFigure=sessionStorage.getItem('clickedFigure');
                    if(chessboard[I]!=="C" && chessboard[I]!==".")
                        sessionStorage.setItem('clickedFigure',I);
                    if(insideCell===true && chessboard[I]!=='.')   {
                        showLegalMoves(I);
                    }
                    if(chessboard[I]==="C") {
                        movePiece(clickedFigure, I);
                        if(clickedFigure!==null)
                            sessionStorage.setItem('clickedFigure',I);
                    }

                });
            }
            
    setTimeout(() => {window.location.reload()},"1000");

}

const movePiece = (figureIndex, squareIndex) => {
    for(let i=0;i<chessboard.length;i++)    {
        if(chessboard[i]==="C")
            chessboard[i]='.';
    }
    chessboard[squareIndex]=chessboard[figureIndex];
    chessboard[figureIndex]='.';
        if(moveTurn===1)    {
            sessionStorage.setItem('moveTurn', 0);
            sessionStorage.setItem('blackTurn', 1);
            sessionStorage.setItem('whiteTurn', 0);
            moveTurn=0;
        }
        else if(moveTurn===0)    {
            sessionStorage.setItem('moveTurn', 1);
            sessionStorage.setItem('blackTurn', 0);
            sessionStorage.setItem('whiteTurn', 1);
            mmoveTurn=1; 
        }
    sessionStorage.setItem('chessboard',JSON.stringify(chessboard));
}

const Reset = () => {
    

}

const cloakControl = (color, timeTurn) =>    {
    let hours;
    let minutes;
    let seconds;
    let time;

    console.log(timeTurn.toString());

    if(color==='black')    {
        time=blackTime;
        hours=Math.floor(time/3600);
        time=time-3600*hours;
        minutes=Math.floor(time/60);
        time=time-60*minutes;
        seconds=time;
            if(timeTurn===1)
                sessionStorage.setItem('blackTime', blackTime-1);

    }
    else if(color==='white')   {
        time=whiteTime;
        hours=Math.floor(time/3600);
        time=time-3600*hours;
        minutes=Math.floor(time/60);
        time=time-60*minutes;
        seconds=time;
            if(timeTurn===1)
                sessionStorage.setItem('whiteTime', whiteTime-1);

    }

    if(hours<10)
        hours="0"+hours.toString();
    if(minutes<10)
        minutes="0"+minutes.toString();
    if(seconds<10)
        seconds="0"+seconds.toString();

       
        return hours+":"+minutes+":"+seconds;

}

const whatIsUserPosition = (htmlFileName) =>    {
    switch(htmlFileName)    {
        case "whichDifficulty.html":
            return 0;
        case "whichPieces.html":
            return 1;
        case 'whatTime.html':
            return 2;
        case 'chess.html':
            return 3;

    }

}

const isTimeInputCorrect = time =>  {
    if(Number(time)===NaN)
        return false;
    else
        return true;

}

const gameResult = (result) =>   {
    switch(result)  {
        case 'lackOftime':
        case 'draw':
        case 'blackWon':
        case 'whiteWon':
    }

}

const showLegalMoves = (index) =>    {
    let x=0;
    let y=0;
    //let blackPieces=["p","w","g","h","s"];

    for(let i=0;i<8;i++)    {
        for(let j=0;j<8;j++)    {
            if(j+i*8===index)   {
                x=j;
                y=i;
            }
        }
    }

    if(piecesColor==='white' && moveTurn===1)   {

        switch(chessboard[index])   {
            case "P":
                if(pawnFirstMove[x]===false)    {
                    chessboard[x+(y-1)*8]='C';
                    chessboard[x+(y-2)*8]='C';
                    dotsActive=true;
                }
                for(let i=0;i<chessboard.length;i++)    {
                    if(i!==x+(y-1)*8 && i!==x+(y-2)*8 && chessboard[i]==='C')
                        chessboard[i]='.';
                }
                sessionStorage.setItem('chessboard',JSON.stringify(chessboard));

        }

        sessionStorage.setItem('dotsActive',true);
        sessionStorage.setItem('chessBoardDataSaved',true);

    }
    else if(piecesColor==='black')  {

    }

}

changingPositionInWebsite();
