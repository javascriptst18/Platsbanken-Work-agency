// API url to specify county and number of printouts
searchByCriteria("platsannonser/matchning?lanid=1&antalrader=10");

// async for our main call top 10 stockholm + total job application
async function searchByCriteria(searchCriteria) {
    const baseURL = "http://api.arbetsformedlingen.se/af/v0/";
    const responseObject = await fetch(baseURL + searchCriteria);
    const matches = await responseObject.json();

	console.log(matches);


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
		
		if (annons.sista_ansokningsdag) {
		// Append empty string with HTML elements
			html += `
				
				<div id="${annons.annonsid}" class="annons">
					<a href="${annons.annonsurl}" target="_blank">	
						<p>${annons.annonsrubrik}</p>
						<p>${annons.yrkesbenamning}</p>
						<p>${annons.arbetsplatsnamn}</p>
						<p>${annons.kommunnamn}</p>
						<p>${annons.sista_ansokningsdag.substring(0, 10)}</p>
						<p>${annons.anstallningstyp}</p>
					</a>
				</div>
			`;
		}
		else {
			html += `
				
				<div id="${annons.annonsid}" class="annons">
					<a href="${annons.annonsurl}" target="_blank">	
						<p>${annons.annonsrubrik}</p>
						<p>${annons.yrkesbenamning}</p>
						<p>${annons.arbetsplatsnamn}</p>
						<p>${annons.kommunnamn}</p>
						<p>No last sign up day announced</p>
						<p>${annons.anstallningstyp}</p>
					</a>
				</div>
			`;
		}

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
    let html = `Totalt antal annonser i ${matches.matchningslista.matchningdata[0].lan}: ${annonsData.antal_platsannonser}`;
    antal_platsannonser.innerHTML = html;
}



	
	const formSubmit = document.querySelector("#filteringForm");
	formSubmit.addEventListener("submit", function(event) {
		event.preventDefault();
		let numberOfDisplaysSelect = document.querySelector("#numberOfDisplay").value;
		let lan = document.querySelector("#selectLan").value;
    let url = `platsannonser/matchning?lanid=${lan}&antalrader=${numberOfDisplaysSelect}`?;
   


		}
		searchByCriteria(url);
	});




function numberOfDisplays() {

}

