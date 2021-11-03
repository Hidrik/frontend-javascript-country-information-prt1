import axios from 'axios'

//Asynchrone functie data ophalen en sorteren
async function getData() {

    //Proberen, als het ophalen van de data niet lukt, moet het niet zo zijn dat de site/script vastloopt.
    try {
        //Data ophalen en in juiste format zetten
        const response = await axios.get('https://restcountries.com/v2/all')
        const data = response.data

        //Data sorteren op populatie
        data.sort(function(a,b) {
            return a['population'] - b['population']
        })
        return data

    //Als er een error is, deze afvangen en loggen in de console.
    } catch (e) {
        console.error(e)
    }
}

//Functie voor het aanmaken van de elementen in een landContainer
function makeElement(data) {
    //Aanmaken landContainer en geef 'container' als class
    const landContainer = document.createElement('div')
    landContainer.setAttribute('class', 'container')

    createFlagElement(data, landContainer)
    createNameElement(data, landContainer)
    createPopulationElement(data, landContainer)

    //Toevoegen van de landContainer aan de container
    const mainContainer = document.getElementById('lands')
    mainContainer.appendChild(landContainer)
}


function createFlagElement(data, container) {
    //Nieuw IMG element aanmaken
    const flag = document.createElement('img')
    //Element de class 'flag' geven
    flag.setAttribute('class', 'flag')
    //Element de link naar de vlag toewijzen
    flag.setAttribute("src", data.flag);
    //Element aan container voor het land toevoegen
    container.appendChild(flag)
}

function createNameElement(data, container) {
    //Nieuw p element maken
    const name = document.createElement('p')
    //Naam van het land als tekst van het element
    name.innerHTML = data.name
    //De class 'name' toewijzen aan het element
    name.setAttribute('class', 'name')
    //Aan de hand van de functie: setRegionColor bepalen welke kleur, deze vervolgens toewijzen aan het element
    name.setAttribute('style','color: ' + setRegionColor(data.region))
    //Element aan container voor het land toevoegen
    container.appendChild(name)
}

function createPopulationElement(data, container) {
    //Nieuw p element maken
    const population = document.createElement('p')
    //Tekst aan het element toevoegen. Hierbij data['population'] als variabele waarde
    population.innerHTML = 'Has a population of ' + data['population'] + ' people'
    //Vervolgens class : 'population' toewijzen
    population.setAttribute('class', 'population')
    //Element aan container voor het land toevoegen
    container.appendChild(population)

}

//Bepaald de kleur aan de hand van de regio
function setRegionColor(data) {
    switch (data) {
        case 'Asia':
            return 'red'
        case 'Europe':
            return 'yellow'
        case 'Africa':
            return 'blue'
        case 'Americas':
            return 'green'
        case 'Oceania':
            return 'purple'
        //Als er ooit een verkeerde regio tussenzit of de naam niet helemaal goed is, dan wordt deze oranje
        default:
            return 'orange'
    }
}

//Data opvragen, als dit klaar is; elementen aanmaken met daarin de gegevens
getData().then(data =>  {
    for (let i = 0; i < data.length; i++) {
        makeElement(data[i])
    }
})
