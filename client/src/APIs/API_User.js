import Config from "../config";
var baseUrl = Config.api_url;

class API_User {
    async postUser(user){
        var result =
            fetch(`${baseUrl}users`,
            {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(user)           
            })
            .then((response) => response.json())
            .then((a) => {
                return a;
            });
        return result;
    }

    async updateUser(user){
        var result =
            fetch(`${baseUrl}users`,
            {
                method: "PUT",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(user)           
            })
            .then((response) => response.json())
            .then((a) => {
                return a;
            });
        return result;
    }

    async getAllUsers(){
        var result =
            fetch(`${baseUrl}users`)
            .then((response) => response.json())
            .then((a) => {
                return a;
            });
        return result;
    }

    async deleteUser(userId){
        var result =
            fetch(`${baseUrl}users/${userId}`, {
                method: 'DELETE',
            })
            .then((response) => response.json())
            .then((a) => {
                return a;
            });
        return result;
    }

    async loginUser(user){
        var result =
            fetch(`${baseUrl}users/login`,
            {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(user)           
            })
            .then((response) => response.json())
            .then((a) => {
                return a;
            });
        return result;
    }

    async getAllVehicles(){
        var result =
            fetch(`${baseUrl}vehicles`)
            .then((response) => response.json())
            .then((a) => {
                return a;
            });
        return result;
    }

    async postBooking(booking){
        var result =
            fetch(`${baseUrl}bookings`,
            {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(booking)           
            })
            .then((response) => response.json())
            .then((a) => {
                return a;
            });
        return result;
    }

    async getAllBookings(){
        var result =
            fetch(`${baseUrl}bookings`)
            .then((response) => response.json())
            .then((a) => {
                return a;
            });
        return result;
    }

}

export default API_User;