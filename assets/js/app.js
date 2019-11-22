const currPoke = {
    name: "",
    url: ""
}

let pokeCount = 0;

let currentPokemon = currPoke;

pokeAPI.get(baseURL)
    .then(values => {
        let c = 0;
        let regionArr = [];
        values.results.map( x => {
            regionArr.push(`<option value="${x.url}">${x.name}</option>`)
        });
        $('#region').html(regionArr);
        $('#region').val($("#region option:first").val());
    });

const rand = e => {return Math.floor(Math.random() * e)};

const getLoc = (url, fir=false) => {
    pokeAPI.get(url)
    .then(values => {  
        let locArr = [];
        values.locations.map( x => {
            locArr.push(`<option value="${x.url}">${x.name}</option>`);
        });
        $('#location').html(locArr);

        if(fir) {
            $('#location').val($("#location option:first").val());
        }

    });
}

const getArea = (url, fir=false) => {
    pokeAPI.get(url)
    .then(values => {  
        let arArr = [];
        let wow = typeEffect;
        if(values.areas.length < 1 || values.areas == undefined){
            wow(`Nothing to explore here!`,'#report',15,10);
            $('#area').html(`<option value="0">Empty!</option>`);
        } else {
            values.areas.map( x => {
                    arArr.push(`<option value="${x.url}">${x.name}</option>`);
            });
            $('#report').html(`Click "explore" to start searching for a Pokemon...`);
            $('#area').html(arArr);
        }
        if(fir) {
            $('#area').val($("#area option:first").val());
        }
    });
}

const clearAll = () => {
    $('.inner-stat').html("");
    $('#pokemon').html("");
    $('.img-bod').html("");
    $('.capt-btn').html("");
}

const getPokemon = (url) => {
    pokeAPI.get(url)
    .then(x => { 
        console.log(x);
        let pic = x.sprites.front_default;
        currentPokemon.url = pic;
        $('.img-bod').html(`<img src="${pic}" alt="${x.name}">`);
        return x.stats;
    })
    .then(y => {
        let statArr = [];
        y.map(x => {
            statArr.push(`<li>${x.stat.name}: ${x.base_stat}</li>`);
        });
        $('.inner-stat').html(statArr);
    });
}

const getRandPoke = (url) => {
    pokeAPI.get(url)
    .then(x => {
        let add = x.pokemon_encounters;
        let e = rand(add.length);
        let pokeURL = add[e].pokemon.url;
        let pokeNAME = add[e].pokemon.name;
        let wow = typeEffect;
        $('.capt-btn').html(`<button id="capture-btn" onclick="addPoke();">Capture</button>`);
        wow(`You found a ${pokeNAME}...`,'#pokemon');
        currentPokemon.name = pokeNAME;
        return pokeURL;
    })
    .then(pokeURL => {
        getPokemon(pokeURL);
    });
}

const addPoke = () => {
    if(pokeCount < 6 ) {
        $('.captured-body').prepend(`
        <div class="capt-inner-body">
            <img src="${currentPokemon.url}" alt="happy">
            <p>${currentPokemon.name}</p>
        </div>
        `);
        typeEffect(`You have captured ${currentPokemon.name}.`,'#report');
        typeEffect(`Captured ${pokeCount+1} out of 6`,'#demo');
        console.log(pokeCount);
        clearAll();
    } else {
        typeEffect('The pokebag is full!','#report');
    }
    pokeCount++;
    //console.log(currentPokemon.name);
    //console.log(currentPokemon.url);
}

getArea('https://pokeapi.co/api/v2/location/67/',true);

getLoc('https://pokeapi.co/api/v2/region/1/',true);


pokeAPI.get('https://pokeapi.co/api/v2/location-area/213')
    .then(x => {
        //console.log(x);
    });
pokeAPI.get('https://pokeapi.co/api/v2/pokemon/118/')
    .then(x => {
        //console.log(x);
    });

$(document).ready(() => {
    $('#region').change(() => {
        let reg = $('#region').val();
        getLoc(reg,true);
        setTimeout(() => {
            $('#location').trigger("change");
        },100);
    });

    $('#location').change(() => {
        clearAll();
        let loc = $('#location').val();
        getArea(loc,true);
    });

    $('.explore-btn').click(() => {
        let arVal = $('#area').val();
        event.preventDefault();
        if(arVal != 0) {
            typeEffect(`Searching area!`,'#report');
            console.log(arVal);
            getRandPoke(arVal);
            
        } else {
            console.log('error');
            typeEffect(`Come on man it's an empty area!`,'#report');
        }
    });
});
