 const delBtns = document.querySelectorAll('.delAd-btn');
 const editBtns = document.querySelectorAll('.editAd-btn');
 const mrkSoldBtns = document.querySelectorAll('.mrkSold-btn');

for(let del of delBtns) {
    // Add onclick event listener to delete ad button
     del.addEventListener('click', e =>{
         // Get list item id
         const id = event.target.parentNode.parentNode.parentNode.dataset.key;
         console.log(id);
         // pass to server then delete value
     })
 }

 for(let ed of editBtns) {
    ed.addEventListener('click', e =>{
        // Get list item id
        const id = event.target.parentNode.parentNode.parentNode.dataset.key;
        console.log(id);
        // redirect to edit.html n pass id as url parameter
        window.location.href=`./editAdForm.html?id=${id}`;
    })
}

for(let mk of mrkSoldBtns) {
    mk.addEventListener('click', e =>{
        // Get list item id
        const id = event.target.parentNode.parentNode.parentNode.dataset.key;
        console.log(id);
        // pass to server then delete value sold stuff is opacity = 0.4 change styling
    })
}