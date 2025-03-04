async function getPeople() {
  const people = await fetch("https://swapi.dev/api/people");
  const peopleJSON = await people.json();

  console.log(peopleJSON);
  console.log("TESTING");

  const container = document.querySelector(".container");

  peopleJSON.results.forEach((person) => {
    const card = document.createElement("div");
    card.classList.add("card");

    const h2 = document.createElement("h2");
    h2.textContent = person.name.toLowerCase();

    const p = document.createElement("p");
    p.textContent = `Height: ${person.height}, Mass: ${person.mass}, Hair Color: ${person.hair_color}`;

    card.appendChild(h2);
    card.appendChild(p);

    container.appendChild(card);
  });
}

getPeople();
