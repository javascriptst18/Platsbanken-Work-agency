async function searchByCriteria(searchCriteria) {
  const baseURL = 'http://api.arbetsformedlingen.se/af/v0/';
  const responseObject = await fetch(baseURL + searchCriteria);
  const matches = await responseObject.json();

  console.log(matches);
  
  	match(matches);

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

searchByCriteria('platsannonser/matchning?lanid=1&yrkesomradeid=3&antalrader=10');

