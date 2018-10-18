function vecPlus(vector1, vector2) {
    res = [];
    
    for (let i=0; i<vector1.length; i++) {
        res.push(vector1[i] + vector2[i])
    }
    return res;  
}

function vecMinus(vector1, vector2) {
    res = [];
    
    for (let i=0; i<vector1.length; i++) {
        res.push(vector1[i] - vector2[i])
    }
    return res;  
}

function vecMult(vector1, vector2) {
    res = [];
    
    for (let i=0; i<vector1.length; i++) {
        res.push(vector1[i] * vector2[i])
    }
    return res;  
}

function vecScalarMult(scalar, vector) {
    return vector.map(x => scalar * x);
}

function vecScalarPlus(scalar, vector) {
    return vector.map(x => scalar + x);
}

function vecScalarMinus(scalar, vector) {
    return vector.map(x => x - scalar);
}

function vecApply(func, vector) {
    return vector.map(x => func(x));
}

module.exports = {vecPlus, vecMinus, vecMult, vecScalarMult, vecScalarPlus, vecScalarMinus, vecApply};