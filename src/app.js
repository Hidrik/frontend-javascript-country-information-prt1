import axios from 'axios'

//Asynchrone functie data ophalen en sorteren en vanuit deze functie de elementen opbouwen
async function buildPage() {

    //Proberen, als het ophalen van de data niet lukt, moet het niet zo zijn dat de site/script vastloopt.
    try {
        //Data ophalen en in juiste format zetten
        const response = await axios.get('https://restcountries.com/v2/all')
        const data = response.data

        //Data sorteren op populatie
        const sortedData = data.sort(function(a,b) {
            return a['population'] - b['population']
        })

        //Voor elk land een element aanmaken met daarin de gegevens
        for (let i = 0; i < data.length; i++) {
            makeElement(sortedData[i])
        }
    //Als er een error is, deze afvangen en loggen in de console.
    } catch (e) {
        console.error(e)
    }
}

//Functie voor het aanmaken van de elementen
function makeElement(data) {
    //Aanmaken landContainer en geef regionaam hieraan mee als class
    const landContainer = document.createElement('div')
    landContainer.setAttribute('class', 'container')


    //Aanmaken element voor de vlag en de vlag invoegen en flag class maken
    createFlagElement(data, landContainer)

    //Aanmaken element voor de naam van het land en deze tekst geven en deze invoegen in de container en regio als class
    //Vervolgens met een andere functie de kleur van de tekst bepalen
    createNameElement(data, landContainer)

    //Aanmaken element voor de populatie tekst en invoeren. Class = population
    createPopulationElement(data, landContainer)

    //Toevoegen van de landContainer aan de container
    const container = document.getElementById('lands')
    container.appendChild(landContainer)
}


function createFlagElement(data, container) {
    //Nieuw IMG element aanmaken
    const flag = document.createElement('img')
    //Element de classe 'flag' geven
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

//Hoofdfunctie oproepen
buildPage()