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







