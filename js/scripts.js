const mountElement = (elem) => {
    const main = document.querySelector('main');

    // Create elements
    const card = document.createElement("div");
    const cardContent = document.createElement("div");
    const cardFooter = document.createElement("div");
    const cardImage = document.createElement("img");
    const cardTitle = document.createElement("h3");

    // Add css classes
    card.classList.add('card');
    cardContent.classList.add('card-content');
    cardFooter.classList.add('card-footer');

    // Mount element
    cardContent.appendChild(cardImage);
    cardFooter.appendChild(cardTitle);
    card.appendChild(cardContent);
    card.appendChild(cardFooter);

    // Add new element
    cardImage.src = elem.image;
    cardTitle.textContent = elem.name;
    main.appendChild(card);
}

const getResponse = async (url, page = 1) => {

    const endpoint = page <= 1 ? url : `${url}/?page=${page}`

    const loader = document.querySelector(".container-loader");
    loader.classList.toggle('hide');

    try {
        const response = await fetch(endpoint);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        data.results.map(elem => {
            mountElement(elem);
        });

    } catch (error) {
        console.log('Error: ', error);
    } finally {
        setTimeout(() => {
            loader.classList.toggle('hide');
        }, 1000);
    };

};

(() => {
    const BaseURL = "https://rickandmortyapi.com/api/character";
    getResponse(BaseURL);

})();

