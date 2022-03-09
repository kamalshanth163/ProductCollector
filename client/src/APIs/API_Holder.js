import Config from "../config";
var baseUrl = Config.api_url;

class API_Holder {
    async postHolder(holder){
        var result =
            fetch(`${baseUrl}holders`,
            {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(holder)           
            })
            .then((response) => response.json())
            .then((a) => {
                return a;
            });
        return result;
    }

    async updateHolder(holder){
        var result =
            fetch(`${baseUrl}holders`,
            {
                method: "PUT",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(holder)           
            })
            .then((response) => response.json())
            .then((a) => {
                return a;
            });
        return result;
    }

    async getAllHolders(){
        var result =
            fetch(`${baseUrl}holders`)
            .then((response) => response.json())
            .then((a) => {
                return a;
            });
        return result;
    }

    async deleteHolder(holderId){
        var result =
            fetch(`${baseUrl}holders/${holderId}`, {
                method: 'DELETE',
            })
            .then((response) => response.json())
            .then((a) => {
                return a;
            });
        return result;
    }

    async loginHolder(holder){
        var result =
            fetch(`${baseUrl}holders/login`,
            {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(holder)           
            })
            .then((response) => response.json())
            .then((a) => {
                return a;
            });
        return result;
    }
}

export default API_Holder;