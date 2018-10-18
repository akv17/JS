const {
    vecPlus,
    vecMinus,
    vecMult,
    vecScalarMult,
    vecScalarPlus,
    vecScalarMinus,
    vecApply
} = require('./VecOps.js');


class GDOptimizer {
    
    constructor() {
        this.learningRate = 0.01;
        this.l2 = 0;
        this.epochs = 1;
        this.eps = 10**-5
        this.verbose = 0;
    }
    
    setParams(params) {
        if (!params) {return}
        
        for (let key of Object.keys(params)) {
            try {
                this[key] = params[key];
            } catch(e) {}
        }
    }
    
    minimize(loss, X, y, W, gradW, b=0, gradB=null, params=null) {
        this.setParams(params);
        
        for (let epoch=1; epoch<this.epochs+1; epoch++) {
            for (let i=1; i<X.shape[0]+1; i++) {
                W = vecMinus(W, vecPlus(vecScalarMult(this.learningRate, gradW(X, y, W, b)), vecScalarMult(this.l2 * 2, W)));

                //if (gradB) {
                //    b -= scalarMult(this.learningRate, gradB());
                //}

                if (i % this.verbose === 0) {
                    console.log(`epoch: ${epoch}\titer: ${i}\tloss: ${loss(X, y, W, b)}`);
                }
            }
        }
        return {W, b};
    }
}

module.exports = {gd: GDOptimizer};