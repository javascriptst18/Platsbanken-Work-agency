import "../scss/style.scss";
import { createCards } from "./card.js";
import { bindCardListeners } from "./modal.js";
import { totannonser } from "./totAnnonser.js"
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