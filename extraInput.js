let batch = [];
let randomBatch = [[0, 4, 5], [6, 7 ,10]]
console.log(randomBatch.length)
let x;
for (x=0; x < randomBatch.length; x++) {
batch.push(randomBatch[x]);
}
console.log(batch);
console.log("This is the batch " + batch);