
export function totannonser(matches) {

    // Select <h3> in header
    const antal_platsannonser = document.querySelector("#antal_platsannonser");
    let annonsData = matches.matchningslista;
    // Printout total number of job applications
    let html = `Totalt antal annonser i ${matches.matchningslista.matchningdata[0].lan}: ${annonsData.antal_platsannonser}`;
    antal_platsannonser.innerHTML = html;
}