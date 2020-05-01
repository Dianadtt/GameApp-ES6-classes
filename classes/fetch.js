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
    async createNewGame(title, releaseDate, gender, publisher, imageUrl, description) {
        const urlencoded = new URLSearchParams();
        urlencoded.append("title", title);
        urlencoded.append("releaseDate", releaseDate);
        urlencoded.append("gender", gender);
        urlencoded.append("publisher", publisher);
        urlencoded.append("imageUrl", imageUrl);
        urlencoded.append("description", description);
        const response = await fetch(`${this.apiURL}/games`, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: urlencoded
        })
        return response.json()
    }
    async updateGameRequest(gameID, title, description, imageUrl) {
        const urlencoded = new URLSearchParams();
        urlencoded.append("title", title);
        urlencoded.append("description", description);
        urlencoded.append("imageUrl", imageUrl);
        const response = await fetch(`${this.apiURL}/games/${gameID}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: urlencoded
        })
        return response.json()
    }
}