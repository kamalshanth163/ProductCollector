import Config from "../config";
var baseUrl = Config.api_url;

class API_Collector {
    async postCollector(collector){
        var result =
            fetch(`${baseUrl}collectors`,
            {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(collector)           
            })
            .then((response) => response.json())
            .then((a) => {
                return a;
            });
        return result;
    }

    async updateCollector(collector){
        var result =
            fetch(`${baseUrl}collectors`,
            {
                method: "PUT",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(collector)           
            })
            .then((response) => response.json())
            .then((a) => {
                return a;
            });
        return result;
    }

    async getAllCollectors(){
        var result =
            fetch(`${baseUrl}collectors`)
            .then((response) => response.json())
            .then((a) => {
                return a;
            });
        return result;
    }

    async deleteCollector(collectorId){
        var result =
            fetch(`${baseUrl}collectors/${collectorId}`, {
                method: 'DELETE',
            })
            .then((response) => response.json())
            .then((a) => {
                return a;
            });
        return result;
    }

    async loginCollector(collector){
        var result =
            fetch(`${baseUrl}collectors/login`,
            {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(collector)           
            })
            .then((response) => response.json())
            .then((a) => {
                return a;
            });
        return result;
    }
}

export default API_Collector;