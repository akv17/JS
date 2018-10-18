const {a,
       b
      } = {a: 1, b: 2} 


let mx = require('./Matrix');
let M1 = mx.fromArray([[1, 2, 3]]);
let M2 = mx.fromArray([[1, 2], [3, 4], [5, 6]]);
console.log(M1.dot(M2));

function foo(a=null, b=null) {
    console.log(a, b);
}

foo([1, 2]);