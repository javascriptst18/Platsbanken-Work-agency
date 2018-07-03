export function bindCardListeners() {
	const cards = document.querySelectorAll(".card");
	for (let card of cards) {

		card.addEventListener("click", function (event) {
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

function appendModal(matches) {
	const modalHeader = document.querySelector("#infoHeader");
	const modalContent = document.querySelector("#modalContent");

	let headerHTML = `
	<h2>${matches.platsannons.annons.annonsrubrik}</h2>
	`;

	modalHeader.innerHTML = headerHTML;

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
