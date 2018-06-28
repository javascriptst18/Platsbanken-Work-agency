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

	bindCardListeners();

}

// async for our main call top 10 stockholm + total job application
async function applicationInfo(searchCriteria) {
	const baseURL = "http://api.arbetsformedlingen.se/af/v0/";
	const responseObject = await fetch(baseURL + searchCriteria);
	const matches = await responseObject.json();
	console.log(matches);

	appendModal(matches);
	// console.log(matches);

	// createMoreInfo(matches);

}

// <a href="${annons.annonsurl}" target="_blank"></a>

// int argument is object gained from searchByCritera
function createCards(matches) {

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

// Static function that takes object gained from searchByCriteria as input
function totannonser(matches) {

	// Select <h3> in header
	const antal_platsannonser = document.querySelector("#antal_platsannonser");
	let annonsData = matches.matchningslista;
	// Printout total number of job applications
	let html = `Totalt antal annonser i ${matches.matchningslista.matchningdata[0].lan}: ${annonsData.antal_platsannonser}`;
	antal_platsannonser.innerHTML = html;
}

function createModal(matches) {
	const modal = document.getElementById('myModal');

	const btn = document.getElementById("myBtn");

	const span = document.querySelector(".close");

	btn.onclick = function () {
		modal.style.display = "block";
	}
	span.onclick = function () {
		modal.style.display = "none";
	}

	window.onclick = function (event) {
		if (event.target == modal) {
			modal.style.display = "none";
		}
	}
}

function appendModal(matches) {
	const modalHeader = document.querySelector("#infoHeader");
	const modalContent = document.querySelector("#modalContent");
	console.log(matches);

	let headerHTML = `
	<h2>${matches.platsannons.annons.annonsrubrik}</h2>
	`;

	modalHeader.innerHTML = headerHTML;

	// modalHeader.insertAdjacentHTML("afterend", `<h2>${matches.platsannons.annons.annonsrubrik}</h2>`)


	let html = "";

	html = `
		<p><b>Arbetsplats: </b>${matches.platsannons.arbetsplats.arbetsplatsnamn}</p>
		<p><b>Arbetstid: </b>${matches.platsannons.villkor.arbetstid}</p>
		<p><b>Varaktighet: </b>${matches.platsannons.villkor.varaktighet}</p>
		<p>${matches.platsannons.annons.annonstext.substring(0, 500)}...
			<a href="${matches.platsannons.annons.platsannonsUrl}" target="_blank">gå till annons</a></p>



	`;

	modalContent.innerHTML = html;
}

/*function createMoreInfo(matches) {

	const cardContainer = document.getElementById(`${matches.platsannons.annons.annonsid}`);
	cardContainer.querySelector(".test");
	
	console.log(matches)
	const moreInfo = `
		<p>${matches.platsannons.annons.annonstext}</p>
		<p><b>Arbetstid: </b>${matches.platsannons.villkor.arbetstid}</p>
		<p><b>Arbetstakt: </b>${matches.platsannons.villkor.arbetstidvaraktighet}</p>
		<p><b>Löneform: </b>${matches.platsannons.villkor.loneform}</p>
		<p><b>Varaktighet: </b>${matches.platsannons.villkor.varaktighet}</p>
		<a href="${matches.platsannons.annons.platsannonsUrl}">Se fullständig annons</a>
	` 

	cardContainer.insertAdjacentHTML("beforeend", moreInfo);

}
*/
// Select form in nav
const formSubmit = document.querySelector("#filteringForm");
// When the event submit occur store the values and us them to filter the URL
formSubmit.addEventListener("submit", function (event) {
	event.preventDefault();
	let numberOfDisplaysSelect = document.querySelector("#numberOfDisplay").value;
	let lan = document.querySelector("#selectLan").value;
	let searchWord = document.querySelector("#keyword").value;
	let kategori = document.querySelector("#selectKategori").value;
	if (kategori == "99") {
		kategori = "";
	}
	let url = `platsannonser/matchning?yrkesomradeid=${kategori}&nyckelord=${searchWord}&lanid=${lan}&antalrader=${numberOfDisplaysSelect}`;
	searchByCriteria(url);
})




function bindCardListeners() {
	const cards = document.querySelectorAll(".card");
	for (let card of cards) {

		card.addEventListener("click", function (event) {
			/*	console.log(event.target)
				console.log(this.target);
				console.log(this.id);*/

			let url = `platsannonser/${this.id}`
			applicationInfo(url);

			const modal = document.getElementById('myModal');
			const span = document.querySelector(".close");
			modal.style.display = "block";
			span.onclick = function () {
				modal.style.display = "none";
			}

			window.onclick = function (event) {
				if (event.target == modal) {
					modal.style.display = "none";
				}
			}

		})
	}
}
