async function countingSortForRadix(ele, exp) {
    const n = ele.length;
    let output = new Array(n).fill(0);
    let count = new Array(10).fill(0);

    for (let i = 0; i < n; i++) {
        if (stopRequested) return false;
        let value = parseInt(ele[i].style.height) / 2;
        incAccess(1);
        incComparison(1);
        let digit = Math.floor(value / exp) % 10;
        count[digit]++;
        await waitforme(delay);
    }

    for (let i = 1; i < 10; i++) {
        if (stopRequested) return false;
        count[i] += count[i - 1];
        incComparison(1);
        incAccess(1);
    }

    for (let i = n - 1; i >= 0; i--) {
        if (stopRequested) return false;
        let value = parseInt(ele[i].style.height) / 2;
        incAccess(1);
        let digit = Math.floor(value / exp) % 10;
        output[count[digit] - 1] = value;
        count[digit]--;
        incAccess(1);
        await waitforme(delay);
    }

    for (let i = 0; i < n; i++) {
        if (stopRequested) return false;
        ele[i].style.height = `${output[i] * 2}px`;
        // labels removed: values are shown via bar height only
        ele[i].style.background = 'rgb(93 229 159)';
        incAccess(1);
        await waitforme(delay);
    }

    return true;
}

async function radixSort() {
    console.log('In radixSort()');
    const ele = document.querySelectorAll('.bar');
    let max = 0;

    for (let i = 0; i < ele.length; i++) {
        if (stopRequested) return;
        let value = parseInt(ele[i].style.height) / 2;
        incAccess(1);
        if (value > max) max = value;
    }

    for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
        if (stopRequested) return;
        if (!await countingSortForRadix(ele, exp)) return;
    }

    for (let i = 0; i < ele.length; i++) {
        if (stopRequested) return;
        ele[i].style.background = 'rgb(239 179 0)';
    }
}

const radixSortbtn = document.querySelector('.radixSort');
if (radixSortbtn) {
    radixSortbtn.addEventListener('click', async function() {
        startAlgorithm('Radix Sort');
        disableSortingBtn();
        disableSizeSlider();
        disableNewArrayBtn();
        await radixSort();
        if (stopBtn) stopBtn.disabled = true;
        enableSortingBtn();
        enableSizeSlider();
        enableNewArrayBtn();
    });
}
