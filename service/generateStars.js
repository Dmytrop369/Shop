function generateStarsHTML(stars) {
    const totalStars = 5;
    let starsHTML = "";

    for (let i = 1; i <= totalStars; i++) {
        if (i <= Math.floor(stars)){
            // Цілі зірки (жовті)
            starsHTML += `<img src="../imgs/SVG/y-star.svg" alt="c">`;
        } else if (i - stars <= 0.5 && stars % 1 !== 0) {
    			// Половинчаста зірка (жовта половина)
			starsHTML += `<img src="../imgs/SVG/h-star.svg" alt="c">`;
		} else {
			// Порожні зірки (сірі)
			starsHTML += `<img src="../imgs/SVG/g-star.svg" alt="c">`;
		}
    }

    return starsHTML;

}

export { generateStarsHTML }