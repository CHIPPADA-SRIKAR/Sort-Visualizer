async function insertion(){
    console.log('In insertion()');
    const ele = document.querySelectorAll(".bar");
    // color
    ele[0].style.background = 'rgb(239 179 0)';
    for(let i = 1; i < ele.length; i++){
        console.log('In ith loop');
        let j = i - 1;
        let key = ele[i].style.height;
        // color
        ele[i].style.background = 'yellow';

        incComparison(1);
        incAccess(1);
        await waitforme(delay);
        if (stopRequested) return;

        while(j >= 0 && (parseInt(ele[j].style.height) > parseInt(key))){
            incComparison(1);
            incAccess(1);
            console.log('In while loop');
            // color
            ele[j].style.background = 'yellow';
            ele[j + 1].style.height = ele[j].style.height;
            j--;

            await waitforme(delay);
            if (stopRequested) return;

            // color
            for(let k = i; k >= 0; k--){
                ele[k].style.background = 'rgb(239 179 0)';
            }
        }
        ele[j + 1].style.height = key;
        // color
        ele[i].style.background = 'rgb(239 179 0)';
    }
}

const inSortbtn = document.querySelector(".insertionSort");
if (inSortbtn) {
    inSortbtn.addEventListener('click', async function(){
        startAlgorithm('Insertion Sort');
        disableSortingBtn();
        disableSizeSlider();
        disableNewArrayBtn();
        await insertion();
        if (stopBtn) stopBtn.disabled = true;
        enableSortingBtn();
        enableSizeSlider();
        enableNewArrayBtn();
    });
}