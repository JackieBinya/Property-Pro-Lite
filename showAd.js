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

const imgDiv = document.querySelector('.myImg');
const adTitle = document.querySelector('.ad-title');

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

window.onload = () => {
    const id = getUrlParameter('id');
    const property = properties.find(property => property.id == id);

    adTitle.textContent = property.title;

    let myImage = new Image();
    myImage.src = property.img;
    myImage.classList.add('ad-image')
    imgDiv.appendChild(myImage);     

    const props = Object.keys(property);
    props.forEach(key => {
      const elem = document.querySelectorAll(`[data-${key}-value]`);
      if (elem.length) return elem[0].textContent = property[key];
    });
} 