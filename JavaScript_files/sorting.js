// swap function util for sorting algorithms takes input of 2 DOM elements with .style.height feature
function swap(el1, el2) {
    console.log('In swap()');
    
    let temp = el1.style.height;
    el1.style.height = el2.style.height;
    el2.style.height = temp;
    incAccess(4);
    
}

// Disables sorting buttons used in conjunction with enable, so that we can disable during sorting and enable buttons after it
function disableSortingBtn(){
    document.querySelectorAll('.sort-btn').forEach(btn => {
        if (btn) btn.disabled = true;
    });
}

// Enables sorting buttons used in conjunction with disable
function enableSortingBtn(){
    document.querySelectorAll('.sort-btn').forEach(btn => {
        if (btn) btn.disabled = false;
    });
}

// Disables size slider used in conjunction with enable, so that we can disable during sorting and enable buttons after it
function disableSizeSlider(){
    document.querySelector('#arr_sz').disabled = true;
}

// Enables size slider used in conjunction with disable
function enableSizeSlider(){
    document.querySelector('#arr_sz').disabled = false;
}

// Disables newArray buttons used in conjunction with enable, so that we can disable during sorting and enable buttons after it
function disableNewArrayBtn(){
    const btn = document.querySelector('.newArray');
    if (btn) btn.disabled = true;
}

// Enables newArray buttons used in conjunction with disable
function enableNewArrayBtn(){
    const btn = document.querySelector('.newArray');
    if (btn) btn.disabled = false;
}

// Used in async function so that we can so animations of sorting, takes input time in ms (1000 = 1s)
let stopRequested = false;
let waitTimer = null;
let comparisons = 0;
let accesses = 0;

const comparisonOutput = document.querySelector('#comparison-count');
const accessOutput = document.querySelector('#access-count');
const currentAlgoOutput = document.querySelector('#current-algo');

function requestStop() {
    stopRequested = true;
    if (waitTimer) {
        clearTimeout(waitTimer);
        waitTimer = null;
    }
}

function resetStop() {
    stopRequested = false;
}

function updateStats() {
    if (comparisonOutput) comparisonOutput.textContent = comparisons;
    if (accessOutput) accessOutput.textContent = accesses;
}

function setCurrentAlgorithm(name) {
    if (currentAlgoOutput) currentAlgoOutput.textContent = name;
}

function resetStats() {
    comparisons = 0;
    accesses = 0;
    updateStats();
}

function incComparison(count = 1) {
    comparisons += count;
    updateStats();
}

function incAccess(count = 1) {
    accesses += count;
    updateStats();
}

function startAlgorithm(name) {
    resetStats();
    resetStop();
    setCurrentAlgorithm(name);
    if (stopBtn) stopBtn.disabled = false;
}

function waitforme(milisec) {
    return new Promise(resolve => {
        if (stopRequested) {
            resolve('');
            return;
        }
        waitTimer = setTimeout(() => {
            waitTimer = null;
            resolve('');
        }, milisec);
    });
}

// Selecting size slider from DOM
let arraySize = document.querySelector('#arr_sz');

// Event listener to update the bars on the UI
arraySize.addEventListener('input', function(){
    if (sizeValueText) sizeValueText.textContent = this.value;
    console.log(this.value, typeof(this.value));
    createNewArray(parseInt(this.value));
});

// Display values next to sliders
const sizeValueText = document.querySelector('#size-value');
const speedValueText = document.querySelector('#speed-value');

// Selecting speed slider from DOM
let delayElement = document.querySelector('#speed_input');
// Default input for waitforme function based on initial slider value
let delay = delayElement ? 320 - parseInt(delayElement.value) : 120;

// show initial slider values
if (sizeValueText) sizeValueText.textContent = arraySize.value;
if (speedValueText) speedValueText.textContent = delayElement.value;

// Event listener to update delay time 
delayElement.addEventListener('input', function(){
    if (speedValueText) speedValueText.textContent = this.value;
    console.log(this.value, typeof(this.value));
    delay = 320 - parseInt(this.value);
});

// Creating array to store randomly generated numbers
let array = [];

// Call to display bars right when you visit the site
createNewArray(parseInt(arraySize.value));
resetStop();
resetStats();
setCurrentAlgorithm('None');

// To create new array input size of array
function createNewArray(noOfBars = 30) {
    // calling helper function to delete old bars from dom
    deleteChild();

    // creating an array of random numbers 
    array = [];
    for (let i = 0; i < noOfBars; i++) {
        array.push(Math.floor(Math.random() * 250) + 1);
    }
    console.log(array);

    // select the div #bars element
    const bars = document.querySelector("#bars");

    // create multiple element div using loop and adding class 'bar col'
    for (let i = 0; i < noOfBars; i++) {
        const bar = document.createElement("div");
        bar.style.height = `${array[i]*2}px`;
        bar.classList.add('bar');
        bar.classList.add('flex-item');
        bar.classList.add(`barNo${i}`);

        bars.appendChild(bar);
    }
}

// Helper function to delete all the previous bars so that new can be added
function deleteChild() {
    const bar = document.querySelector("#bars");
    bar.innerHTML = '';
}

const stopBtn = document.querySelector('#stop-btn');
const resetBtn = document.querySelector('#reset-btn');
const generateBtn = document.querySelector('#generate-btn');
const startBtn = document.querySelector('#start-btn');
const algoSelect = document.querySelector('#algo-select');

if (generateBtn) {
    generateBtn.addEventListener('click', function() {
        requestStop();
        stopBtn.disabled = true;
        resetStop();
        resetStats();
        setCurrentAlgorithm('None');
        enableSortingBtn();
        enableSizeSlider();
        createNewArray(parseInt(arraySize.value));
    });
}

if (startBtn) {
    startBtn.addEventListener('click', async function() {
        if (!algoSelect) return;
        const selectedAlgo = algoSelect.value;
        if (!selectedAlgo) return;
        setComplexity(selectedAlgo);
        await runSelectedAlgorithm(selectedAlgo);
    });
}

if (stopBtn) {
    stopBtn.addEventListener('click', function() {
        requestStop();
        stopBtn.disabled = true;
        enableSortingBtn();
        enableSizeSlider();
        enableNewArrayBtn();
        if (startBtn) startBtn.disabled = false;
        if (generateBtn) generateBtn.disabled = false;
    });
    stopBtn.disabled = true;
}

if (resetBtn) {
    resetBtn.addEventListener('click', function() {
        requestStop();
        createNewArray(parseInt(arraySize.value));
        resetStop();
        resetStats();
        setCurrentAlgorithm('None');
        stopBtn.disabled = true;
        enableSortingBtn();
        enableSizeSlider();
        enableNewArrayBtn();
        if (startBtn) startBtn.disabled = false;
        if (generateBtn) generateBtn.disabled = false;
    });
}

async function runSelectedAlgorithm(selectedAlgo) {
    if (!startBtn) return;
    startBtn.disabled = true;
    if (generateBtn) generateBtn.disabled = true;
    disableSizeSlider();
    disableSortingBtn();
    if (stopBtn) stopBtn.disabled = false;
    startAlgorithm(selectedAlgo);

    switch (selectedAlgo) {
        case 'Bubble Sort':
            await bubble();
            break;
        case 'Selection Sort':
            await selection();
            break;
        case 'Insertion Sort':
            await insertion();
            break;
        case 'Merge Sort': {
            const ele = document.querySelectorAll('.bar');
            await mergeSort(ele, 0, ele.length - 1);
            break;
        }
        case 'Quick Sort': {
            const ele = document.querySelectorAll('.bar');
            await quickSort(ele, 0, ele.length - 1);
            break;
        }
        case 'Radix Sort':
            await radixSort();
            break;
        case 'Heap Sort':
            await heapSort();
            break;
        default:
            break;
    }

    if (stopBtn) stopBtn.disabled = true;
    if (startBtn) startBtn.disabled = false;
    if (generateBtn) generateBtn.disabled = false;
    enableSizeSlider();
    enableSortingBtn();
    enableNewArrayBtn();
}

function setComplexity(selectedAlgo) {
    const timeComplexity = document.querySelector('#time-complexity');
    if (!timeComplexity) return;
    let timeText = 'O(n)';
    switch (selectedAlgo) {
        case 'Bubble Sort':
        case 'Selection Sort':
        case 'Insertion Sort':
            timeText = 'O(n²)';
            break;
        case 'Merge Sort':
        case 'Quick Sort':
        case 'Heap Sort':
            timeText = 'O(n log n)';
            break;
        case 'Radix Sort':
            timeText = 'O(nk)';
            break;
        default:
            timeText = 'O(n)';
    }
    timeComplexity.textContent = timeText;
}
