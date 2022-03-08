import Config from "../config";
var baseUrl = Config.api_url;

class API_Admin {
    async loginAdmin(admin){
        var result =
            fetch(`${baseUrl}admins/login`,
            {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(admin)           
            })
            .then((response) => response.json())
            .then((a) => {
                return a;
            });
        return result;
    }
}

export default API_Admin;