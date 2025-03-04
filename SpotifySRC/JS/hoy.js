import { clientId, clientSecret } from "./config.js";

function autorizar() {
  const mensaje = "Informacion robada";
  console.log(mensaje);

  const spotifyURL ="https://accounts.spotify.com/authorize?response_type=code&client_id=f11c0488356d4f529d9f8afed582ddef&scope=user-read-private user-read-email user-top-read&redirect_uri=http://127.0.0.1:5500/emihdz1209.github.io/SpotifySRC/HTML/hoy.html";

  window.location.href = spotifyURL;
}

async function autorizarToken() {
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get("code");

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Basic " + btoa(clientId + ":" + clientSecret),
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code: code,
      redirect_uri: "http://127.0.0.1:5500/emihdz1209.github.io/SpotifySRC/HTML/hoy.html",
    }),
  });

  const TokenAutorizacion = await response.json();
  return TokenAutorizacion.access_token;
}

async function getTrack() {
    
    const token = await autorizarToken();
    const url = "https://api.spotify.com/v1/me/top/tracks?time_range=medium_term&limit=10&offset=0"

    const TopTracks = await fetch(url, {
        method: "GET",
        headers: {
            'authorization': `Bearer ${token}`
        }});

    const TopTracksJSON = await TopTracks.json();

    for (let indx = 0; indx < TopTracksJSON.items.length; indx++){
        let trackDiv = document.createElement("div");
        let track = document.createElement("aside");
        let trackTitle = document.createElement("h3");
        let trackArtists = document.createElement("p");

        trackTitle.innerHTML = `${indx+1} - ${TopTracksJSON.items[indx].name}`;
        trackArtists.innerHTML = `Artista: ${TopTracksJSON.items[indx].artists[0].name}`;

        track.appendChild(trackTitle);
        track.appendChild(trackArtists);
        trackDiv.appendChild(track);

        console.log(`${indx+1} - ${TopTracksJSON.items[indx].name}`)
        document.body.appendChild(trackDiv);
    }
}


const code = document.getElementById("code");
const token = document.getElementById("token");

code.addEventListener("click", autorizar);
token.addEventListener("click", autorizarToken);

getTrack();
