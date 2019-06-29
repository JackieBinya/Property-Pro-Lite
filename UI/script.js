const properties = [
    {
    title: 'Serious buyer wanted!!!',
    city: 'Bulawayo',
    location: 'Gwabalanda',
    address:'23466 Mvagazi, Gwabalanda',
    img: './assets/pplImages/img6.jpg', 
    desc: 'Reoloribus quam, ipsam molestiae necessitatibus nemo iusto, unde consequuntur sunt ipsum...',
    price:'$5.999999million',
    type: 'mini-flat',
    contact: 'mz@bar.com',
    status: 'available',
    id: 1,
},

{
    title: '$150 rent pm room available',
    city: 'Harare',
    location: 'Borrowdale Brooks',
    address:'1 Bellville Road, Borrowdale Brooks',
    img: './assets/pplImages/img1.jpg', 
    desc: 'Oorem ipsum dolor sit amet consectetur adipisicing elit. Quam id qui molestias enim soluta aut corrupti ea? Natus veritatis molestiae optio beatae possimus, distinctio quos non illo sed numquam nobis.',
    price:'$150',
    type: '1 bedroom',
    contact: 'steve@bar.com',
    status: 'available',
    id:2,
},

{
    title: 'Wendy house available suitable for a small family',
    city: 'Bulawayo',
    location: 'Morningside',
    address:'1005 Ellis Drive, Morningside',
    img: './assets/pplImages/img2.jpg', 
    desc: ' Lorem ipsum dolor sit, amet consectetur adipisicing elit. Velit tempore quia alias beatae.Architecto qui nesciunt corporis assumenda... ',
    price:'$300',
    type: '2 bedroom',
    contact: 'mandy@bar.com',
    status: 'available',
    id: 3,
},

{
    title: 'Florida 3BedRooms',
    city: 'Gweru',
    location: 'Florida',
    address: '328 D.Kllark Road, Florida',
    img: './assets/pplImages/img5.jpg', 
    desc: 'Suscipit fugiat similique neque possimus cum repellat doloribus quam, ipsam molestiae necessitatibus nemo iusto, unde consequuntur sunt ipsum!..',
    price:'$800',
    type: '3 bedroom',
    contact: 'joey@gmail.com',
    status: 'sold',
    id: 4,
},

{
    title: 'Posh house for sale',
    city: 'Bulawayo',
    location: 'Khumalo',
    address: '7 Crescent Road Khumalo',
    img: './assets/pplImages/img8.jpg', 
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia  quae nihil deleniti,eoloribus quam, ipsam molestiae necessitatibus nemo iusto, unde consequuntur sunt ipsum...',
    price:'$1..5million',
    price:'$300',
    type: '3 bedroom',
    contact: 'foo@bar.com',
    status: 'available',
    id: 5,
},

] ; 

let list = document.querySelector('.list');

 const showList = (properities) => {
     for(let i=0; i<properities.length; i++) {
     let text =  `<li data-key=${properties[i].id} data-type="${properities[i].type}" data-status="${properities[i].status}"class='list-item'>
                       <div class="card">
                            <img src=${properities[i].img}
                            >
                            <p class="card-title">${properities[i].title}</p>
                            <p class="card-desc">${properities[i].desc}</p>
                            <p class="card-price">${properities[i].price}<p/>
                        </div> 
                    <li/>`;
    const position = 'afterbegin'
     list.insertAdjacentHTML(position, text);
     }
 }

 showList(properties)
 // '[data-status="sold"]'

 const soldProperties = document.querySelectorAll('[data-status="sold"]');
 console.log (soldProperties);

 for(let i=0; i<soldProperties.length; i++) {
     soldProperties[i].firstElementChild.style.opacity = '0.4'
 }


// Add on-click event listener from list items on home page
const listItems = document.querySelectorAll('.list-item');

for(listItem of listItems){
    listItem.addEventListener('click', e => {
       // console.log(e.currentTarget.dataset.key)
       window.location.href=`./showAd.html?id=${e.currentTarget.dataset.key}`;
    });
}

// Add onchange event to search box
let search = '';
document.querySelector('#search-property').addEventListener('change', e =>{
    search = e.currentTarget.value;
});

/* const getSearchProp = () => {
    
    for(listItem of listItems) {
        const arr =Object.values(listItem.dataset)
        if (arr.includes(search)){
            listItem.style.display = 'block';
        } else   listItem.style.display = 'none';
        // console.log(arr)
        // if (listItem.dataset.type !== search) listItem.style.display = 'none'
    }
}
 */
document.querySelector('.searchForm').addEventListener('submit', e => {
    e.preventDefault();
    window.location.href=`./searchResults.html?value=${search}`;
    /* 
    getSearchProp() */
} );
