const mx = require('./Matrix.js');
const OPTIMIZERS = require('./Optimizers.js');
const {
    vecPlus,
    vecMinus,
    vecMult,
    vecScalarMult,
    vecScalarPlus,
    vecScalarMinus,
    vecApply
} = require('./VecOps.js');


class LinearRegression {
    
    constructor(optimizer='gd', fit_bias=false, optimizerParams=null) {
        this.optimizer = optimizer;
        this.fit_bias = fit_bias;
        
        this.W;
        this.b;
        this._fitted = false;
        
        this._optimizer = new OPTIMIZERS[this.optimizer]();
        this._optimizer.setParams(optimizerParams);
    }
    
    _check_input_shapes(X, y) {
        if (X.length !== y.length) {
            throw `number of samples mismatch: X=${X.length}, y=${y.length}`;
        }
    }
    
    _check_fitted() {
        if (!this._fitted) {
            throw 'not fitted'
        }
    }
    
    _loss(X, y, W, b) {
        return vecApply(x => x**2, vecMinus(y, vecScalarPlus(b, X.dotVec(W)))).reduce((x, y) => x + y) / X.shape[0];
    }
    
    _gradW(X, y, W, b) {
        return vecScalarMult(1/X.shape[0], mx.fromArray([vecScalarMult(-2, vecMinus(y, vecScalarPlus(b, X.dotVec(W))))]).dot(X).M[0]);
    }
    
    fit(X, y, params=null) {
        this._check_input_shapes(X, y);
        
        let _X = mx.fromArray([...X]);
        
        this.W = Array(_X.shape[1]).fill(0);
        this.b = 0;
        
        let res = this._optimizer.minimize(this._loss, _X, y, this.W, this._gradW, this.b, null, params=params);
        
        // FIX THIS LAME 
        this.W = res.W;
        this.b = res.b;
        this._fitted = true;
    }
    
    predict(X) {
        this._check_fitted();
        
        return vecScalarPlus(this.b, mx.fromArray([...X]).dotVec(this.W));
    }   
}

module.exports = {LinearRegression};