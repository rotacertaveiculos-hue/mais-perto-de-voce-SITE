let mapa;

document.getElementById("btnLocalizacao").onclick = () => {
  document.getElementById("modal").style.display = "block";
};

document.getElementById("cancelar").onclick = () => {
  document.getElementById("modal").style.display = "none";
};

document.getElementById("confirmar").onclick = () => {
  document.getElementById("modal").style.display = "none";
  iniciarLocalizacao();
};

function iniciarLocalizacao() {
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      const lat = pos.coords.latitude;
      const lng = pos.coords.longitude;

      mapa = new google.maps.Map(document.getElementById("mapa"), {
        center: { lat, lng },
        zoom: 14
      });

      new google.maps.Marker({
        position: { lat, lng },
        map: mapa,
        title: "Você está aqui"
      });

      buscarEstudios(lat, lng);
    },
    () => alert("Permissão negada")
  );
}

function buscarEstudios(lat, lng) {
  const service = new google.maps.places.PlacesService(mapa);

  service.nearbySearch(
    {
      location: { lat, lng },
      radius: 5000,
      keyword: "yoga"
    },
    (results) => {
      results.forEach(place => {
        new google.maps.Marker({
          map: mapa,
          position: place.geometry.location,
          title: place.name
        });
      });
    }
  );
}
