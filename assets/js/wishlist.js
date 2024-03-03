

document.addEventListener('DOMContentLoaded', () => {
    const wishlistLink = document.getElementById('wishlist-link');

    wishlistLink.addEventListener('click', (e) => {
        const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    //    eger bos olacaqsa alertden msj///
        if (wishlist.length === 0) {
            e.preventDefault();
            alert('Your wishlist is empty!!!!');
        } 
    });
});


