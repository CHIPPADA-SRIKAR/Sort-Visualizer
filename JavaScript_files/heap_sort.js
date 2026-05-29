async function heapify(ele, n, i) {
    if (stopRequested) return;
    let largest = i;
    let left = 2 * i + 1;
    let right = 2 * i + 2;

    if (left < n) {
        incComparison(1);
        incAccess(2);
        if (parseInt(ele[left].style.height) > parseInt(ele[largest].style.height)) {
            largest = left;
        }
    }

    if (right < n) {
        incComparison(1);
        incAccess(2);
        if (parseInt(ele[right].style.height) > parseInt(ele[largest].style.height)) {
            largest = right;
        }
    }

    if (largest !== i) {
        if (stopRequested) return;
        await waitforme(delay);
        if (stopRequested) return;
        swap(ele[i], ele[largest]);
        incAccess(2);
        await heapify(ele, n, largest);
    }
}

async function heapSort() {
    console.log('In heapSort()');
    const ele = document.querySelectorAll('.bar');
    const n = ele.length;

    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        if (stopRequested) return;
        await heapify(ele, n, i);
    }

    for (let i = n - 1; i > 0; i--) {
        if (stopRequested) return;
        await waitforme(delay);
        if (stopRequested) return;
        swap(ele[0], ele[i]);
        incAccess(2);
        ele[i].style.background = 'rgb(239 179 0)';
        await heapify(ele, i, 0);
    }

    if (!stopRequested && ele.length > 0) {
        ele[0].style.background = 'rgb(239 179 0)';
    }
}

const heapSortbtn = document.querySelector('.heapSort');
if (heapSortbtn) {
    heapSortbtn.addEventListener('click', async function() {
        startAlgorithm('Heap Sort');
        disableSortingBtn();
        disableSizeSlider();
        disableNewArrayBtn();
        await heapSort();
        if (stopBtn) stopBtn.disabled = true;
        enableSortingBtn();
        enableSizeSlider();
        enableNewArrayBtn();
    });
}
