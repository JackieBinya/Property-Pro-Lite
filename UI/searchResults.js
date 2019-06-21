const properties = [
   /*  {
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
 */
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
    status: 'available',
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

 const showList = (arr) => {
     for(let i=0; i<arr.length; i++) {
     let text =  `<li data-key=${arr[i].id} data-type="${arr[i].type}" data-status="${arr[i].status}"  class="list-item">
                       <div class="card">
                            <img src=${arr[i].img}
                            >
                            <p class="card-title" >${arr[i].title}</p>
                            <p class="card-desc">${arr[i].desc}</p>
                            <p class="card-price">${arr[i].price}<p/>
                        </div> 
                    <li/>`;
    const position = 'afterbegin'
     list.insertAdjacentHTML(position, text);
     }
 }

const getUrlParameter = (sParam) => {
    const sPageURL = window.location.search.substring(1);
    const sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) 
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) 
        {
            return sParameterName[1];
        }
    }
}
let result = ''
   const value  = getUrlParameter('value');
   result = decodeURI(value);


const filteredProperties = properties.filter(prop => prop.type === result);

if (!filteredProperties.length) {
    const displayError = document.querySelector('.display-msg');
    displayError.style.display = 'flex';
    document.querySelector('.del-msg').addEventListener('click', e => {
    displayError.style.display = 'none';
});
}

if (filteredProperties.length) showList(filteredProperties);



const listItems = document.querySelectorAll('.list-item');
console.log(listItems)

 for(listItem of listItems){
    listItem.addEventListener('click', e => {
       // console.log(e.currentTarget.dataset.key)
       window.location.href=`./showAd.html?id=${e.currentTarget.dataset.key}`;
    });
} 
