const pokeAPI = (() => {
    const baseURL = "https://pokeapi.co/api/v2";

    const handleErrors = res => {
        if (!res.ok) {
            throw Error(res.statusText);
        } else {
            return res;
        }
    }

    const get = path => {
        return fetch(`${baseURL}/${path}`)
            .then(handleErrors)
            .then(res => res.json());
    }

    return {
        get,
    };
})();

let arrRegion = [];
let count = 1;
pokeAPI.get('region')
    .then(values => {
        for(let x of values.results) {
            $('#region').prepend(`<option value="${count}">${x.name}</option>`);
            count++;
        }
        console.log(values);
    });

$(document).ready(() => {
    $('#region').change(() => {
        console.log($('#region').val());
    });
});
