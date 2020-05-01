class Game {
    constructor(id, title, imageUrl, description) {
        this._id = id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.fetchApi = new FetchApi("https://games-app-siit.herokuapp.com");
    }
    render() {
        const gameElement = document.createElement("div");
        gameElement.setAttribute('id', this._id);
        this._updateDomElementForGame(gameElement);
        return gameElement;
    }
    _updateDomElementForGame(element) {
        element.innerHTML = `
    <h1>${this.title}</h1> 
    <img src="${this.imageUrl}" />
    <p>${this.description}</p> 
    <button class="delete-btn" game-id="${this._id}">Delete Game</button>
    <button class="update-btn" game-id="${this._id}">Edit Game</button>`;

        element.getElementsByClassName('delete-btn')[0].addEventListener("click", async(event) => {
            event.preventDefault();
            await fetchApi.deleteGameById(event.target.getAttribute("game-id"));
            event.target.parentElement.remove();

        });
        element.getElementsByClassName('update-btn')[0].addEventListener("click", (event) => {
            event.preventDefault();
            this._showUpdateFormInDOM(event.target.parentElement);
        });
    }
    _showUpdateFormInDOM(domElement) {
        const form = document.getElementById("updateForm");
        const gameTitleElement = form.querySelector('input[name=gameTitle]');
        const gameDescriptionElement = form.querySelector('textarea[name=gameDescription]');
        const gameImageUrlElement = form.querySelector('input[name=gameImageUrl]');
        gameTitleElement.value = this.title;
        gameDescriptionElement.value = this.description;
        gameImageUrlElement.value = this.imageUrl;
        domElement.appendChild(form);

        form.querySelector('button[id=saveGameBtn]').addEventListener('click', async(e) => {
            e.preventDefault();
            const updatedGameFromApi = await fetchApi.updateGameRequest(this._id, gameTitleElement.value, gameDescriptionElement.value, gameImageUrlElement.value);
            if (updatedGameFromApi !== undefined) {
                this.title = updatedGameFromApi.title;
                this.imageUrl = updatedGameFromApi.imageUrl;
                this.description = updatedGameFromApi.description;
                const gameElement = document.getElementById(this._id);
                this._updateDomElementForGame(gameElement);
            }
            document.getElementById('formContainer').appendChild(form);
        });
        form.querySelector('button[id=cancelUpdateGameBtn]').addEventListener('click', (e) => {
            e.preventDefault();
            document.getElementById('formContainer').appendChild(form);
        });
    }
}