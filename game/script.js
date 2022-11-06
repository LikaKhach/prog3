var socket = io();
function matrixGenerator(matrixSize, grassCount, grassEaterCount, predatorCount, predKillCount, QueenCount) {

     var matrix = []

     for (let i = 0; i < matrixSize; i++) {
          matrix[i] = []
          for (let j = 0; j < matrixSize; j++) {
               matrix[i][j] = 0

          }
     }



     for (let i = 0; i < grassCount; i++) {

          let x = Math.floor(Math.random() * matrixSize)
          let y = Math.floor(Math.random() * matrixSize)

          if (matrix[y][x] == 0) {
               matrix[y][x] = 1
          }
     }


     for (let i = 0; i < grassEaterCount; i++) {

          let x = Math.floor(Math.random() * matrixSize)
          let y = Math.floor(Math.random() * matrixSize)

          if (matrix[y][x] == 0) {
               matrix[y][x] = 2
          }
     }


     for (let i = 0; i < predatorCount; i++) {

          let x = Math.floor(Math.random() * matrixSize)
          let y = Math.floor(Math.random() * matrixSize)

          if (matrix[y][x] == 0) {
               matrix[y][x] = 3
          }
     }
     for (let i = 0; i < predKillCount; i++) {

          let x = Math.floor(Math.random() * matrixSize)
          let y = Math.floor(Math.random() * matrixSize)

          if (matrix[y][x] == 0) {
               matrix[y][x] = 4
          }
     }
     for (let i = 0; i < QueenCount; i++) {

          let x = 7
          let y = 7

          if (matrix[y][x] == 0) {
               matrix[y][x] = 5
          }
     }
     return matrix
}

let matrix = matrixGenerator(15, 25, 10, 6, 8, 1)

var side = 50


var grassArr = []
var grassEaterArr = []
var predatorArr = []
var predKillerArr = []
var queenArr = []

function setup() {
     createCanvas(matrix[0].length * side, matrix.length * side)
     frameRate(10)
     for (var y = 0; y < matrix.length; y++) {
          for (var x = 0; x < matrix[y].length; x++) {
               if (matrix[y][x] == 1) {
                    var gr = new Grass(x, y);
                    grassArr.push(gr);
               }
               else if (matrix[y][x] == 2) {

                    var grEat = new GrassEater(x, y);
                    grassEaterArr.push(grEat);
               } else if (matrix[y][x] == 3) {

                    var pre = new Predator(x, y);
                    predatorArr.push(pre);
               }
               else if (matrix[y][x] == 4) {

                    var predKiller = new PredKiller(x, y);
                    predKillerArr.push(predKiller);
               }
               else if (matrix[y][x] == 5) {

                    var queen = new Queen(x, y);
                    queenArr.push(queen);
               }
          }
     }
}



function draw() {
     for (var y = 0; y < matrix.length; y++) {
          for (var x = 0; x < matrix[y].length; x++) {


               if (matrix[y][x] == 1) {
                    fill("green")
                    rect(x * side, y * side, side, side)
                    textSize(25)
                    text("☘️", x * side + side / 2, y * side + side / 2)
               } else if (matrix[y][x] == 2) {
                    fill("yellow")
                    rect(x * side, y * side, side, side)
                    textSize(25)
                    text("🐛", x * side + side / 2, y * side + side / 2)
               } else if (matrix[y][x] == 3) {
                    fill("red")
                    textSize(25)
                    rect(x * side, y * side, side, side)
                    text("🐉", x * side + side / 2, y * side + side / 2)
               } else if (matrix[y][x] == 4) {
                    fill("blue")
                    rect(x * side, y * side, side, side)
                    textSize(25)
                    text("☠️", x * side + side / 2, y * side + side / 2)
               } else if (matrix[y][x] == 5) {
                    fill("orange")
                    rect(x * side, y * side, side, side)
                    textSize(25)
                    text("👸🏻", x * side + side / 2, y * side + side / 2)
               }
               else {
                    fill("gray")
                    rect(x * side, y * side, side, side)


               }



          }
     }


     for (var i in grassArr) {
          grassArr[i].mul()
     }

     for (let i in grassEaterArr) {
          grassEaterArr[i].mul()
          grassEaterArr[i].eat()
     }

     for (let j in predatorArr) {
          predatorArr[j].mul()
          predatorArr[j].eat()
     }
     for (let a in predKillerArr) {
          predKillerArr[a].mul()
          predKillerArr[a].eat()
     }
     for (let b in queenArr) {
          queenArr[b].eat()
     }

     if (queenArr != 0 && grassArr == 0 && predKillerArr == 0 && predatorArr == 0 && grassEaterArr != 0) {
          for (var i in queenArr) {
               queenArr[i].eat()

          }
     }

     const btn = document.querySelector('button');
     function random(number) {
       return Math.floor(Math.random() * (number+1));
     }
     function changeBackgroundColor() {
       const rndCol = `rgb(${random(255)}, ${random(255)}, ${random(255)})`;
       document.body.style.backgroundColor = rndCol;
     }
     btn.addEventListener('click', changeBackgroundColor);

   

     if (frameCount % 60 == 0) {
          console.log(frameCount);
          let grass = grassArr.length;
          let grassEater = grassEaterArr.length;
          let predator = predatorArr.length;
          let predKiller = predKillerArr.length;
          let queen = queenArr.length;
          let statistic = {
               grass,
               grassEater,
               predator,
               predKiller,
               queen,
          }
          socket.emit("send static", statistic);
          console.log("Խոտ - " + grass + ", " + "Խոտակեր - " + grassEater + ", " + "Գիշատիչ - " + predator + ", " + " Գիշատիչ սպանող - " + predKiller + ", " + "Թագուհի - " + queen);
     }
}