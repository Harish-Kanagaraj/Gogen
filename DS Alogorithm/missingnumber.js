function findMissingNumber(arr) {
    const n = arr.length + 1; 
    const Sum = (n * (n + 1)) / 2;
    const actualSum = arr.reduce((sum, num) => sum + num, 0);
    const missingNumber = Sum - actualSum;
    return missingNumber;
}

const inputArray = [1, 3, 4, 5, 6, 7, 8, 9, 10];
const missingNumber = findMissingNumber(inputArray);
console.log("Missing Number:", missingNumber);
