class FetchApi {
    constructor(apiURL) {
        this.apiURL = apiURL
    }
    async getGamesList() {
        const response = await fetch(`${this.apiURL}/games`)
        return response.json()
    }
    async deleteGameById(gameID) {
        const response = await fetch(`${this.apiURL}/games/${gameID}`, {
            method: "DELETE"
        })
        return response.text()
    }
    async createNewGame(gameObject) {
        const response = await fetch(`${this.apiURL}/games`, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: gameObject
        })
        return response.json()
    }
    async updateGameRequest(gameID, updateGameObj) {
        const response = await fetch(`${this.apiURL}/games/${gameID}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: updateGameObj
        })
        return response.json()
    }
}


// var urlencoded = new URLSearchParams();
//         urlencoded.append("title", gameTitle.value)
//         urlencoded.append("releaseDate", gameRelease.value)
//         urlencoded.append("gender", gameGender.value)
//         urlencoded.append("publisher", gamePublisher.value)
//         urlencoded.append("imageUrl", gameImageUrl.value)
//         urlencoded.append("description", gameDescription.value)
//         const newGameFromApi = await fetchApi.createNewGame(urlencoded)

// class Game {
//     constructor(id, title, imageUrl, description) {
//         this._id = id;
//         this.title = title;
//         this.imageUrl = imageUrl;
//         this.description = description;
//         this.fetchApi = new FetchApi("https://games-app-siit.herokuapp.com");
//     }