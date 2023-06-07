const lens = document.querySelector('.magnifier-lens');
const productImage = document.querySelector('.carousel-item img');
const magnifiedImage = document.querySelector('.magnified-image');

function magnify(productImage, magnifiedImage) {
    lens.addEventListener('mousemove', moveLens);
    productImage.addEventListener('mousemove', moveLens);

    //MouseOut event
    lens.addEventListener('mouseout', hideLens);
}

function moveLens(e) {
    console.log("X:" + e.pageX + " Y:" + e.pageX);
    let x, y, cx, cy;

    // Position Of the Cursor
    const productImageRect = productImage.getBoundingClientRect();
    x = e.pageX - productImageRect.left - lens.offsetWidth / 2;
    y = e.pageY - productImageRect.top - lens.offsetHeight / 2;

    let maxXpos = productImageRect.width - lens.offsetWidth;
    let maxYpos = productImageRect.height - lens.offsetHeight;

    if (x > maxXpos) x = maxXpos;
    if (x < 0) x = 0;

    if (y > maxYpos) y = maxYpos;
    if (y < 0) y = 0;

    lens.style.cssText = `top: ${y}px; left: ${x}px;`;

    // Calculate the MagnifiedImage & Lens's Aspect Ratio
    cx = magnifiedImage.offsetWidth / lens.offsetWidth;
    cy = magnifiedImage.offsetHeight / lens.offsetHeight;

    magnifiedImage.style.cssText = `
        background: url('${productImage.src}')
        -${x * cx}px -${y * cy}px /
        ${productImageRect.width * cx }px ${productImageRect.height * cy}px
        no-repeat
    `;

    lens.classList.add('active');
    magnifiedImage.classList.add('active');
}

function hideLens() {
    lens.classList.remove('active');
    magnifiedImage.classList.remove('active');
}

magnify(productImage, magnifiedImage);