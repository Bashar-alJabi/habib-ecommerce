const shoppingMain = document.querySelector('.shopping-container main');
const cartIcon = document.querySelector('.shopping-container header .icon-cart');

const getProducts = async () => {
    // get products from API
    await fetch('https://fakestoreapi.com/products')
        .then(res => res.json``)
        .then(data =>
            // create Box from every product
            data.map(product => {
            const cardBox = document.createElement('div');
            const imgCard = document.createElement('img');
            const bodyCard = document.createElement('div');
            const titleCard = document.createElement('h5');
            const textCard = document.createElement('p');
            const bottoms = document.createElement('div');
            const btnCard = document.createElement('button');
            const priceCard = document.createElement('p');

            shoppingMain.appendChild(cardBox);
            cardBox.appendChild(imgCard);
            cardBox.appendChild(bodyCard);
            bodyCard.appendChild(titleCard);
            bodyCard.appendChild(textCard);
            bottoms.appendChild(btnCard);
            bottoms.appendChild(priceCard);
            bodyCard.appendChild(bottoms);

            cardBox.className = 'card';
            imgCard.className = 'card-img-top';
            bodyCard.className = 'card-body';
            titleCard.className = 'card-title';
            textCard.className = 'card-text';
            bottoms.className = 'bottoms';
            btnCard.className = 'btn btn-warning buy-button';
            priceCard.className = 'card-price';

            imgCard.src = product.image;
            imgCard.alt = product.title.slice(0, 2);
            titleCard.textContent = product.title;
            textCard.textContent = product.description;
            btnCard.href = '#';
            btnCard.textContent = 'Buy Now';
            priceCard.textContent = `${product.price} $`;

        }))
        .catch(err => console.log(err))

    const cards = document.querySelectorAll(".shopping-container main .card");
    cards.forEach(card => {
        // Handle Buy Button
        const buyButton = card.querySelector(".buy-button");
        buyButton.onclick = () => {
            // add quantity of products to localStorage
            const numProd = localStorage.getItem('numProd');
            localStorage.setItem('numProd', +numProd + 1);
            Swal.fire({
				icon: "success", title: "Your Purchase has been Successfully!", background: "#f7f7f7",
                showConfirmButton: false, showCancelButton: false, timerProgressBar: true, timer: 1000,
			});
            // add total price to localStorage
            const price = card.querySelector('.buy-button ~ .card-price')
            const total = localStorage.getItem('totalPrice');
            localStorage.setItem('totalPrice', +total + +price.textContent.replace(' $', ''));
        }
    })
}
getProducts();

// Scroll To Top
let scrollSpan = document.querySelector(".shopping-container .up");
window.onscroll = function() {
    this.scrollY >= 666 ? scrollSpan.classList.add('show') : scrollSpan.classList.remove('show');
};
scrollSpan.onclick = () => {
    window.scrollTo({top: 0, behavior: 'smooth',});
};