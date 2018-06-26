// API url to specify county and number of printouts
searchByCriteria("platsannonser/matchning?lanid=1&antalrader=10");

// async for our main call top 10 stockholm + total job application
async function searchByCriteria(searchCriteria) {
    const baseURL = "http://api.arbetsformedlingen.se/af/v0/";
    const responseObject = await fetch(baseURL + searchCriteria);
    const matches = await responseObject.json();

    // console.log(matches);

    // Call to function that creates job application cards
    createCards(matches);

    // Call to function that prints out total job applications
    totannonser(matches);

}

// int argument is object gained from searchByCritera
function createCards(matches) {
    // Select main with id annons and printout objects from annons
    const annonsContainer = document.querySelector("#annons");
    let annonsData = matches.matchningslista.matchningdata;
    let html = ""; // Empty string
    for (let annons of annonsData) {

        // Append empty string with HTML elements
        html += `
			
			<div id="${annons.annonsid}" class="annons">
				<a href="${annons.annonsurl}" target="_blank">	
					<p class="annonsrubrik">${annons.annonsrubrik}</p>
					<p class="arbetsplatsnamn">Företag: ${annons.arbetsplatsnamn}</p>
					<p class="kommunnamn">Kommun: ${annons.kommunnamn}</p>
					<p class="yrkesbenamning">Yrke: ${annons.yrkesbenamning}</p>		
					<p class="anstallningstyp">Anställningsform: ${annons.anstallningstyp}</p>
				</a>
			</div>
		`;

        // Printout HTML string with HTML elements
        annonsContainer.innerHTML = html;
    }

}

// Static function that takes object gained from searchByCriteria as input
function totannonser(matches) {

    // Select <h3> in header
    const antal_platsannonser = document.querySelector("#antal_platsannonser");
    let annonsData = matches.matchningslista;
    // Printout total number of job applications
    let html = `Totalt antal annonser i Stockholms län: ${annonsData.antal_platsannonser}`;
    antal_platsannonser.innerHTML = html;
}

//Adds an eventListener to the select-element
document.getElementById("selectLan").onchange=chooseRegion;

//chooseRegion
function chooseRegion(event) {searchByCriteria(`platsannonser/matchning?lanid=${event.target.value}`)}
