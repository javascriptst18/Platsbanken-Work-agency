// int argument is object gained from searchByCritera
export function createCards(matches) {

    // Select main with id annons and printout objects from annons
    const annonsContainer = document.querySelector("#annons");
    let annonsData = matches.matchningslista.matchningdata;
    let html = ""; // Empty string
    for (let annons of annonsData) {

        html += `
				
				<div id="${annons.annonsid}" class="annons card">	
						<h2 class="annonsrubrik">${annons.annonsrubrik}</h2>
						<p class="arbetsplatsnamn">${annons.arbetsplatsnamn}</p>
						<p class="kommunnamn">${annons.kommunnamn}</p>
						<p id="sista_ansokningsdag"></p>
						<p>Intresserad? Tryck för att läsa mer!</p>
						
				</div>
			`;

        // Printout HTML string with HTML elements
        annonsContainer.innerHTML = html;
        // If last date exist insert the HTML at the paragraph "sista_ansokningsdag" 
        if (annons.sista_ansokningsdag) {
            let sistaAnsokan = document.querySelector("#sista_ansokningsdag");
            sistaAnsokan.insertAdjacentHTML("beforeend", `Ansök senast: ${annons.sista_ansokningsdag.substring(0, 10)}`)
        }
    }
}