let ml = require('./Models.js');
let metrics = require('./Metrics.js');

let X = [[1], [2], [3], [4], [5]];
let y = [1, 2, 3, 4, 5];

let model = new ml.LinearRegression();

model.fit(X, y, params={epochs: 5});
console.log(`MSE=${metrics.mse(y, model.predict(X))}`);