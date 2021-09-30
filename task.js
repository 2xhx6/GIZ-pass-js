// ES6
// import { readFileSync, writeFileSync } from 'fs';

let fs = require('fs');

class SortType{
    // Using static keyword so we can use the class without initiating an object
    static ASC = 'ASC';
    static DESC = 'DESC';
}

class ArraySorter{
    
    numbers = []

    constructor(numbers){
        this.numbers = numbers;
        // freeze the object so numbers be immutable
        Object.freeze(this);
    }

    /**
     * Bubble Sort The array
     * - param:: <sortType> Either SortType.ASC or SortType.DESC
     * - return:: The Sorted array
     */
    bubbleSortList = (sortType) => {
        let numbersToSort = this.numbers;
        for (let i = 0; i < numbersToSort.length; i++) {
            for (let j = 0; j < numbersToSort.length - 1; j++) {
                if (sortType == SortType.ASC && numbersToSort[j] > numbersToSort[j + 1]) {
                    numbersToSort = this._switchItems(j, numbersToSort)
                }
                else if(sortType == SortType.DESC && numbersToSort[j] < numbersToSort[j + 1]) {
                    numbersToSort = this._switchItems(j, numbersToSort)
                }
            }
        }
        return numbersToSort
    }

    /**
     * Switch array items
     * - param:: <index> Either SortType.ASC or SortType.DESC
     * - param:: <numbersToSort> Either SortType.ASC or SortType.DESC
     * - return:: The numbers array to contine sorting it
     */
    _switchItems = (index, numbersToSort) => {
        let temp = numbersToSort[index];
        numbersToSort[index] = numbersToSort[index + 1]
        numbersToSort[index + 1] = temp;
        return numbersToSort;
    }
}


const Numbers = [5, 8, 0, 1, 9, 11, 15, 16];
console.log("Original numbers list: ", Numbers)

const sorter = new ArraySorter(Numbers);
console.log("Numbers list After ASC sorting: ", sorter.bubbleSortList(SortType.ASC))
console.log("Numbers list After DESC sorting: ", sorter.bubbleSortList(SortType.DESC))

// Reading from data.txt file
let fileName = "data.txt"
let data = fs.readFileSync(fileName, 'utf8');

// Convert the string that has been read from the file to an array
let fileNumbers = JSON.parse("[" + data + "]");
// Another way to convert the string to an array
// let x = data.split(",").map(Number);

console.log("Original numbers list from " + fileName + " file: ", fileNumbers)

const sorter2 = new ArraySorter(fileNumbers);
let fileNumbersSortedASC = sorter2.bubbleSortList(SortType.ASC)
console.log("Numbers list from " + fileName + " file After ASC sorting: ", fileNumbersSortedASC)
// Write the sorted array to output.txt file
fs.writeFileSync("output.txt", `${fileNumbersSortedASC}`)