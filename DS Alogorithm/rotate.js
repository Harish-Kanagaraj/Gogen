function rotateArray(nums, k) {
    k = k % nums.length;
    reverse(nums, 0, nums.length - 1);
    reverse(nums, 0, k - 1);
    reverse(nums, k, nums.length - 1);
    
    return nums;
}
function reverse(nums, start, end) {
    while (start < end) {
        let temp = nums[start];
        nums[start] = nums[end];
        nums[end] = temp;
        start++;
        end--;
    }
}



const testArray = [3, 8, 9, 2, 5];
const k2 = 2;
console.log("Rotated Array:", rotateArray(testArray, k2)); // Output: Rotated Array: 
