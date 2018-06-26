async function searchByCriteria(searchCriteria) {
	const baseURL = "http://api.arbetsformedlingen.se/af/v0/";
	const responseObject = await fetch(baseURL + searchCriteria);
	const matches = await responseObject.json();

	console.log(matches);

	match(matches);
	totannonser(matches);

}

function totannonser(matches) {
	const antal_platsannonser = document.querySelector("#antal_platsannonser");
	let annonsData = matches.matchningslista;
	let html = `Totalt antal annonser i Stockholms län: ${annonsData.antal_platsannonser}`;
	antal_platsannonser.innerHTML = html;
}

function match(matches) {
	const annonsContainer = document.querySelector("#annons");
	let annonsData = matches.matchningslista.matchningdata;
	let html = "";
	for (let annons of annonsData) {
		html += `
			<div class="annons"
				<p>${annons.annonsrubrik}</p>
				<p>${annons.yrkesbenamning}</p>
				<p>${annons.arbetsplatsnamn}</p>

			</div>

		`;
		annonsContainer.innerHTML = html;
	}

}

searchByCriteria("platsannonser/matchning?lanid=1&antalrader=10");

