class Grass {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.multiply = 0
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    chooseCell(char) {

        let found = []

        for (var i in this.directions) {
            var x = this.directions[i][0]
            var y = this.directions[i][1]

            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {

                if (matrix[y][x] == char) {
                    found.push(this.directions[i])
                }
            }
        }

        return found;
    }


    mul() {

        this.multiply++
        var emptyCells = this.chooseCell(0)
        var newCell = random(emptyCells)
        // console.log(newCell);
        if (newCell && this.multiply >= 8) {

            var newX = newCell[0]
            var newY = newCell[1]

            var gr = new Grass(newX, newY)
            grassArr.push(gr)

            matrix[newY][newX] = 1

            this.multiply = 0
        }


    }
}


class GrassEater {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.multiply = 0
        this.energy = 8
        this.directions = []
    }

    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }


    chooseCell(char) {
        this.getNewCoordinates()
        let found = []

        for (var i in this.directions) {
            var x = this.directions[i][0]
            var y = this.directions[i][1]

            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {

                if (matrix[y][x] == char) {
                    found.push(this.directions[i])
                }
            }
        }

        return found;
    }


    mul() {
        this.multiply++
        var emptyCells = this.chooseCell(0)
        var newCell = random(emptyCells)

        if (newCell && this.multiply >= 12) {

            var newX = newCell[0]
            var newY = newCell[1]

            matrix[newY][newX] = 2
            var grEat = new GrassEater(newX, newY)
            grassEaterArr.push(grEat)


            this.multiply = 0
        }


    }


    move() {
        this.energy--
        var emptyCells = this.chooseCell(0)
        var newCell = random(emptyCells)

        if (newCell && this.energy >= 0) {

            var newX = newCell[0]
            var newY = newCell[1]

            matrix[newY][newX] = matrix[this.y][this.x]

            matrix[this.y][this.x] = 0


            this.x = newX
            this.y = newY
        } else {
            if (this.energy < 0) {
                this.die()
            }
        }
    }


    eat() {
        var emptyCells = this.chooseCell(1)
        var newCell = random(emptyCells)

        if (newCell) {
            this.energy++

            var newX = newCell[0]
            var newY = newCell[1]

            matrix[newY][newX] = matrix[this.y][this.x]

            matrix[this.y][this.x] = 0


            this.x = newX
            this.y = newY

            for (var i in grassArr) {
                console.log(grassArr);
                if (newX == grassArr[i].x && newY == grassArr[i].y) {
                    grassArr.splice(i, 1)
                    break
                }
            }


        } else {
            this.move()
        }
    }

    die() {
        matrix[this.y][this.x] = 0

        for (var i in grassEaterArr) {
            if (this.x == grassEaterArr[i].x && this.y == grassEaterArr[i].y) {

                grassEaterArr.splice(i, 1)
                break
            }
        }
    }


}



//գրում եմ գիշատիչի class-ը

class Predator {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.multiply = 0
        this.energy = 10
        this.directions = []
    }

    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    //զարգացնում ենք chooseCell-ը տալով արդեն 2 արգումենտ որպեսզի փնտրի 2 կերպար
    chooseCell(char, char1) {
        this.getNewCoordinates()
        let found = []

        for (var i in this.directions) {
            var x = this.directions[i][0]
            var y = this.directions[i][1]

            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {

                if (matrix[y][x] == char) {
                    found.push(this.directions[i])
                }
            }
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {

                if (matrix[y][x] == char1) {
                    found.push(this.directions[i])
                }
            }
        }

        return found;
    }


    mul() {
        this.multiply++
        var emptyCells = this.chooseCell(0)
        var newCell = random(emptyCells)

        if (newCell && this.multiply >= 15) {

            var newX = newCell[0]
            var newY = newCell[1]

            matrix[newY][newX] = 3
            var pre = new Predator(newX, newY)
            predatorArr.push(pre)


            this.multiply = 0
        }


    }

    move() {
        this.energy--
        var emptyCells = this.chooseCell(0)
        var newCell = random(emptyCells)

        if (newCell && this.energy >= 0) {

            var newX = newCell[0]
            var newY = newCell[1]

            matrix[newY][newX] = matrix[this.y][this.x]

            matrix[this.y][this.x] = 0


            this.x = newX
            this.y = newY
        } else {
            if (this.energy < 0) {
                this.die()
            }
        }
    }



    eat() {
        var emptyCells = this.chooseCell(1, 2)// արդեն մեր chooseCell-Ը կարող է փնտրել 2 կերպար
        var newCell = random(emptyCells)

        if (newCell) {
            this.energy++

            var newX = newCell[0]
            var newY = newCell[1]

            matrix[newY][newX] = matrix[this.y][this.x]

            matrix[this.y][this.x] = 0


            this.x = newX
            this.y = newY

            for (var i in grassArr) {
                console.log(grassArr);
                if (newX == grassArr[i].x && newY == grassArr[i].y) {
                    grassArr.splice(i, 1)
                    break
                }
            }

            for (var i in grassEaterArr) {
                if (newX == grassEaterArr[i].x && newY == grassEaterArr[i].y) {
                    grassEaterArr.splice(i, 1)
                    break
                }
            }

        } else {
            this.move()
        }
    }

    die() {
        matrix[this.y][this.x] = 0

        for (var i in predatorArr) {
            if (this.x == predatorArr[i].x && this.y == predatorArr[i].y) {

                predatorArr.splice(i, 1)
                break
            }
        }
    }

}
class PredKiller {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.multiply = 0
        this.energy = 12
        this.directions = []
    }

getNewCoordinates(){
    this.directions = [
        [this.x - 1, this.y - 1],
        [this.x, this.y - 1],
        [this.x + 1, this.y - 1],
        [this.x - 1, this.y],
        [this.x + 1, this.y],
        [this.x - 1, this.y + 1],
        [this.x, this.y + 1],
        [this.x + 1, this.y + 1]
                     ];
}
chooseCell(char) {
    this.getNewCoordinates()
    let found = []

    for (var i in this.directions) {
        var x = this.directions[i][0]
        var y = this.directions[i][1]

        if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {

            if (matrix[y][x] == char) {
                found.push(this.directions[i])
            }
        }

    }

    return found;
}
mul() {
    this.multiply++
    var emptyCells = this.chooseCell(0)
    var newCell = random(emptyCells)

    if (newCell && this.multiply >= 16) {

        var newX = newCell[0]
        var newY = newCell[1]

        matrix[newY][newX] = 4
        var predKiller = new PredKiller(newX, newY)
        predKillerArr.push(predKiller)


        this.multiply = 0
    }


}
move() {
    this.energy--
    var emptyCells = this.chooseCell(0)
    var newCell = random(emptyCells)

    if (newCell && this.energy >= 0) {

        var newX = newCell[0]
        var newY = newCell[1]

        matrix[newY][newX] = matrix[this.y][this.x]

        matrix[this.y][this.x] = 0


        this.x = newX
        this.y = newY
    } else {
        if (this.energy < 0) {
            this.die()
        }
    }
}

eat() {
    var emptyCells = this.chooseCell(3)
    var newCell = random(emptyCells)

    if (newCell) {
        this.energy++

        var newX = newCell[0]
        var newY = newCell[1]

        matrix[newY][newX] = matrix[this.y][this.x]

        matrix[this.y][this.x] = 0


        this.x = newX
        this.y = newY

        for (var i in predatorArr) {
            if (newX == predatorArr[i].x && newY == predatorArr[i].y) {
                predatorArr.splice(i, 1)
                break
            }
        }


    } else {
        this.move()
    }
}
die() {
    matrix[this.y][this.x] = 0

    for (var i in predKillerArr) {
        if (this.x == predKillerArr[i].x && this.y == predKillerArr[i].y) {

            predKillerArr.splice(i, 1)
            break
        }
    }

}

}




class  Queen{
    constructor(x,y){
        this.x=x
        this.y=y
        this.energy=30
        this.directions=[]
        
    }

    getNewCoordinates(){
        let i = Math.floor(Math.random() * 20)
        this.directions = [
            [this.x - i, this.y - i],
            [this.x, this.y - i],
            [this.x + i, this.y - i],
            [this.x - i, this.y],
            [this.x + i, this.y],
            [this.x - i, this.y + i],
            [this.x, this.y + i],
            [this.x + i, this.y + i]
        ];

    }

 chooseCell(char,char1,char2,char3) {
    this.getNewCoordinates()
    let found = []

    for (var i in this.directions) {
        var x = this.directions[i][0]
        var y = this.directions[i][1]

        if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {

            if (matrix[y][x] == char) {
                found.push(this.directions[i])
            }
        }
        if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {

            if (matrix[y][x] == char1) {
                found.push(this.directions[i])
            }
        }
        if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {

            if (matrix[y][x] == char2) {
                found.push(this.directions[i])
            }
        }
        if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {

            if (matrix[y][x] == char3) {
                found.push(this.directions[i])
            }
        }
    }

    return found;
}



move() {
    var emptyCells = this.chooseCell(0)
    var newCell = random(emptyCells)

    if (newCell && this.energy >= 0) {

        var newX = newCell[0]
        var newY = newCell[1]

        matrix[newY][newX] = matrix[this.y][this.x]

        matrix[this.y][this.x] = 0


        this.x = newX
        this.y = newY
    } else {
        if (this.energy < 0) {
            this.die()
        }
    }
}


eat() {
    var emptyCells = this.chooseCell(1,2,3,4)
    var newCell = random(emptyCells)

    if (newCell) {
        this.energy++

        var newX = newCell[0]
        var newY = newCell[1]
        
        matrix[newY][newX] = matrix[this.y][this.x]

        matrix[this.y][this.x] = 0


        this.x = newX
        this.y = newY

        for (let i = 0; i < grassArr.length; i++) {
            if (grassArr[i].x == newX && grassArr[i].y == newY) {
                grassArr.splice(i, 1)
            }
            
        }
        for (let i = 0; i < grassEaterArr.length; i++) {
            if (grassEaterArr[i].x == newX && grassEaterArr[i].y == newY) {
                grassEaterArr.splice(i, 1)
            }
            
        }
        for (let i = 0; i < predatorArr.length; i++) {
            if (predatorArr[i].x ==  newX && predatorArr[i].y == newY) {
                predatorArr.splice(i, 1)
            }
            
        }
        for (let i = 0; i < predKillerArr.length; i++) {
            if ( predKillerArr[i].x == newX &&  predKillerArr[i].y == newY) {
                predKillerArr.splice(i, 1)
            }
            
        }


    }else{
        this.move()
    }
}

die(){
    matrix[this.y][this.x]  =  0

       for(var i in queenArr){
                if(this.x ==  queenArr[i].x &&  this.y == queenArr[i].y){

                    queenArr.splice(i,1)
                         break
                }
       }
}
}








































