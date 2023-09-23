const BaseURL = "https://rickandmortyapi.com/api/character";
const loader = document.querySelector(".container-loader");
const main = document.querySelector('main');

const mountElement = (elem) => {
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

const renderElement = (elements) => {
    elements.results.map(elem => {
        mountElement(elem);
    });
}

const loadCards = async (url, page = 1) => {

    const endpoint = page <= 1 ? url : `${url}/?page=${page}`
    loader.classList.toggle('hide');

    try {
        const response = await fetch(endpoint);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        return data

    } catch (error) {
        console.log('Error: ', error);
    } finally {
        setTimeout(() => {
            loader.classList.toggle('hide');
        }, 1000);
    };

};

const observeLastCard = (observer) => {
    const lastCard = main.lastChild
    observer.observe(lastCard)
}

const handleNextCards = () => {
    let page = 2
    const cardsObserver = new IntersectionObserver(async ([lastCard], observer) => {
        if (!lastCard.isIntersecting) {
            return
        }
        observer.unobserve(lastCard.target);

        cards = await loadCards(BaseURL, page);
        
        if (!cards) {
            return
        }
        
        renderElement(cards)
        observeLastCard(cardsObserver);
        page += 1

    }, {rootMargin: '300px'})

    observeLastCard(cardsObserver);
}

(async () => {

    cards = await loadCards(BaseURL);
    renderElement(cards);

    await handleNextCards();

})();

