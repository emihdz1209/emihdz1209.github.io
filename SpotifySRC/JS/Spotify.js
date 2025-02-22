function saveInput() {
    let searchBox = document.getElementById("search-Box");
    let inputValue = searchBox.value;

    if (inputValue == "") {
        alert("Please enter a valid artist name");
        return;
    }
    searchBox.value = "";
    ArtistData(inputValue);
}

async function spotifyToken() {
    const clientId = 'f11c0488356d4f529d9f8afed582ddef';
    const clientSecret = '5ee433f7c878428d950094a83e0a6c0e';
    const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret)
        },
        body: 'grant_type=client_credentials'
    });

    const data = await response.json();
    console.log(data);

    console.log(data.access_token);
    return data.access_token;
}

async function getTopTracks(ArtistURL) {
    const token = await spotifyToken(); 

    const url = `${(ArtistURL)}/top-tracks?market=US`;

    const response = await fetch(url, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` } 
    });

    if (!response.ok) {
        throw new Error(`Error fetching data: ${response.status} - ${response.statusText}`);
    }

    return await response.json(); 
}


async function ArtistData(ARTISTNAME) {
    const Token = await spotifyToken();

    const TRACKSWIDTH = document.getElementById("TRACKS");

    const ArtistImageSpot = document.getElementById("ArtistImage");
    const ArtistNameSpot = document.getElementById("ArtistName");
    const ArtistGenreSpot = document.getElementById("ArtistGenre");
    const ArtistPopularSpot = document.getElementById("ArtistPopularity");
    const TopTracksSpot= document.getElementById("TopTracksTtitle");
    const ArtistLinkSpot = document.getElementById("ArtistLink");

    ArtistImageSpot.src = "";
    ArtistImageSpot.href = "";
    ArtistNameSpot.innerHTML = "";
    ArtistGenreSpot.innerHTML = "";
    ArtistPopularSpot.innerHTML = "";
    

    document.getElementById("TextPart").innerHTML = "Artist Score";


    const ArtistHREFurl = `https://api.spotify.com/v1/search?q=${ARTISTNAME}&type=artist&limit=1`;
    const ArtistIDRequest = await fetch(ArtistHREFurl, {headers: {'Authorization': 'Bearer ' + Token}});
    const ArtistIDDataJSON = await ArtistIDRequest.json();
    console.log(ArtistIDDataJSON);
    const ArtistURL = ArtistIDDataJSON.artists.items[0].href;


    const ArtistRequest = await fetch(ArtistURL, {headers: {'Authorization': 'Bearer ' + Token}});
    const ArtistData = await ArtistRequest.json();

    TRACKSWIDTH.style.width = "auto";

    ArtistImageSpot.src = `${ArtistData.images[0].url}`;

    ArtistLinkSpot.href = `${ArtistData.external_urls.spotify}`;

    ArtistNameSpot.innerHTML += `${ArtistData.name}`;
    if (ArtistData.genres[0] == undefined) {
        ArtistGenreSpot.innerHTML += "No Genre Found";
    }else{
    ArtistGenreSpot.innerHTML += `${ArtistData.genres[0]}`};

    ArtistPopularSpot.innerHTML += `${ArtistData.popularity}`;
     if (ArtistData.popularity > 60) {
        ArtistPopularSpot.setAttribute("style", "color: #1DB954;");
    } else if (ArtistData.popularity > 30) {
        ArtistPopularSpot.setAttribute("style", "color: #FCA65F;");
    } else {
        ArtistPopularSpot.setAttribute("style", "color: #FF1F80;");
    }

    TopTracksSpot.innerHTML = " Top Tracks "; 


    const topTracks = await getTopTracks(ArtistURL);

    const cancionesDiv = document.getElementById('canciones');
    
    cancionesDiv.innerHTML = ''; 

    if (topTracks.tracks) {
        topTracks.tracks.slice(0, 5).forEach(track => {
            const cancionDiv = document.createElement('li');
            cancionDiv.className = 'cancion';
            cancionDiv.textContent = `${track.name} - ${track.artists[0].name}`;
            cancionesDiv.appendChild(cancionDiv);
        });
    } else {
        console.error('No tracks found for the artist.');
    }



}

document.getElementById('search-Box').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        saveInput();
    }
});
