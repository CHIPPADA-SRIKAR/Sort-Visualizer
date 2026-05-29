async function bubble() {
    console.log('In bubbe()');
    const ele = document.querySelectorAll(".bar");
    for(let i = 0; i < ele.length-1; i++){
        console.log('In ith loop');
        for(let j = 0; j < ele.length-i-1; j++){
            console.log('In jth loop');
            ele[j].style.background = 'yellow';
            ele[j+1].style.background = 'yellow';
            if (stopRequested) return;
            incComparison(1);
            incAccess(2);
            if(parseInt(ele[j].style.height) > parseInt(ele[j+1].style.height)){
                console.log('In if condition');
                await waitforme(delay);
                if (stopRequested) return;
                swap(ele[j], ele[j+1]);
            }
            ele[j].style.background = 'rgb(69, 209, 216);';
            ele[j+1].style.background = 'rgb(69, 209, 216);';
        }
        ele[ele.length-1-i].style.background = 'rgb(239 179 0)';
    }
    ele[0].style.background = 'rgb(239 179 0)';
}

const bubSortbtn = document.querySelector(".bubbleSort");
if (bubSortbtn) {
    bubSortbtn.addEventListener('click', async function(){
        if (stopBtn) stopBtn.disabled = false;
        resetStop();
        startAlgorithm('Bubble Sort');
        disableSortingBtn();
        disableSizeSlider();
        disableNewArrayBtn();
        await bubble();
        if (stopBtn) stopBtn.disabled = true;
        enableSortingBtn();
        enableSizeSlider();
        enableNewArrayBtn();
    });
}