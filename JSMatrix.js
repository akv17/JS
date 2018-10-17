class Matrix{
    constructor(array=null, shape=null){
        if (array !== null){
            this.matrix = this.buildFromArray(array);
            this.nRows = this.matrix.length;
            this.nCols = this.matrix[0].length;
        }

        else if (shape !== null){
            this.matrix = this.buildZeroMatrix(shape);
            this.nRows = shape[0];
            this.nCols = shape[1];
        }

        else {
            this.matrix = [];
            this.nRows = 0;
            this.nCols = 0;
        }
    }

    static fromArray(array){
        return new Matrix(array, null);
    }

    static fromShape(shape){
        return new Matrix(null, shape);
    }

    toString(){
        let str = "";
        for (let i=0; i<this.nRows; i++){
            str += this.matrix[i].join(" ") + "::";
        }
        return str;
    }

    get shape(){
        return [this.nRows, this.nCols];
    }

    checkArray(array){
        if (!array instanceof Array){
            throw "must build from <Array> only";
        }

        if (array.length === 0){
            throw "cannot build from empty array";
        }

        if (!array[0] instanceof Array){
            throw "invalid array structure";
        }

        let len = array[0].length

        for (let x of array.slice(1)){
            if (!(x instanceof Array && x.length === len)){
                throw "invalid array structure"
            }    
        }    
    }

    checkVector(vector){
        if (!vector instanceof Array){
            throw "invalid input";
        }

        if (this.nRows !== vector.length){
            throw "shape mismatch: ${this.shape} x ${vector.length}";
        }

        if (vector.some(x => typeof x !== 'number')){
            throw "invalid input";
        }
    }

    checkShape(shape){
        if (!shape instanceof Array){
            throw "Invalid shape";
        }

        if (shape.some(x => !Number.isInteger(x))){
            throw "Invalid shape";
        }
    }

    checkOtherType(other){
        if (!other instanceof Matrix){
            throw "not <Matrix> passed";
        }
    }

    checkEqualShapes(other){
        if (this.shape.toString() !== other.shape.toString()){
            throw `shape mismatch: ${this.shape} x ${other.shape}`;
        }
    }

    checkDotShapes(other){
        if (this.nCols !== other.nRows){
            throw `shape mismatch: ${this.shape} x ${other.shape}`;
        }
    }

    buildFromArray(array){
        this.checkArray(array);
        return array;
    }

    buildZeroMatrix(shape){
        this.checkShape(shape);

        let matrix = [];
        let nRows = shape[0];
        let nCols = shape[1];


        for (let i=0; i<nRows; i++){
            let row = [];
            for (let j=0; j<nCols; j++){
                row.push(0);
            }
            matrix.push(row);
        }
        return matrix;
    }

    plus(other){
        this.checkOtherType(other);
        this.checkEqualShapes(other);

        let resMatrix = Matrix.fromShape(this.shape);

        for (let i=0; i<this.nRows; i++){
            for (let j=0; j<this.nCols; j++){
                resMatrix.matrix[i][j] = this.matrix[i][j] + other.matrix[i][j];
            }
        }
        return resMatrix;
    }

    dot(other){
        this.checkOtherType(other);
        this.checkDotShapes(other);

        let resMatrix = Matrix.fromShape([this.nRows, other.nCols]);

        for (let i=0; i<this.nRows; i++){
            for (let j=0; j<other.nCols; j++){
                let resIJ = 0;
                for (let k=0; k<other.nRows; k++){
                    resIJ += this.matrix[i][k] * other.matrix[k][j]; 
                }
                resMatrix.matrix[i][j] = resIJ;
            }
        }
        return resMatrix;
    }

    dotVec(vector){
        this.checkVector(vector);

        let resVector = [];

        for (let i=0; i<this.nRows; i++){
            let resI = 0;
            for (let j=0; j<this.nCols; j++){
                resI += this.matrix[i][j] * vector[j];
            }
            resVector.push(resI);
        }
        return resVector;
    }
}
