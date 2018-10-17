class Matrix{
    constructor(array=null, shape=null){
        if (array !== null){
            this.checkArray(array);
            this.M = array.slice();
            this.nRows = this.M.length;
            this.nCols = this.M[0].length;
        }

        else if (shape !== null){
            this.M = this.buildZeroMatrix(shape);
            this.nRows = shape[0];
            this.nCols = shape[1];
        }

        else {
            this.M = [];
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
            str += this.M[i].join(" ") + "\n";
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

        if (this.nCols !== vector.length){
            throw `shape mismatch: ${this.shape} x ${vector.length}`;
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

    buildZeroMatrix(shape){
        this.checkShape(shape);

        let M = [];
        let nRows = shape[0];
        let nCols = shape[1];


        for (let i=0; i<nRows; i++){
            let row = [];

            for (let j=0; j<nCols; j++){
                row.push(0);
            }

            M.push(row);
        }

        return M;
    }

    plus(other){
        this.checkOtherType(other);
        this.checkEqualShapes(other);

        let res = Matrix.fromShape(this.shape);

        for (let i=0; i<this.nRows; i++){
            for (let j=0; j<this.nCols; j++){
                res.M[i][j] = this.M[i][j] + other.M[i][j];
            }
        }
        return res;
    }

    dot(other){
        this.checkOtherType(other);
        this.checkDotShapes(other);

        let res = Matrix.fromShape([this.nRows, other.nCols]);

        for (let i=0; i<this.nRows; i++){

            for (let j=0; j<other.nCols; j++){
                let resIJ = 0;

                for (let k=0; k<other.nRows; k++){
                    resIJ += this.M[i][k] * other.M[k][j];
                }

                res.M[i][j] = resIJ;
            }
        }
        return res;
    }

    dotVec(vector){
        this.checkVector(vector);

        let res = [];

        for (let i=0; i<this.nRows; i++){
            let resI = 0;

            for (let j=0; j<this.nCols; j++){
                resI += this.M[i][j] * vector[j];
            }

            res.push(resI);
        }
        return res;
    }
}

module.exports = Matrix;
