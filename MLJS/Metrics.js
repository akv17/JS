function mse(yTrue, yPred) {
    scores = [];
    
    for (let i=0; i<yTrue.length; i++) {
        scores.push((yTrue[i] - yPred[i])**2);    
    }
    return scores.reduce((x, y) => x + y) / yTrue.length;
}

module.exports = {mse};