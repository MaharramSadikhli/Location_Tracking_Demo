var map, marker;
function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -34.397, lng: 150.644 },
    //center: { lat, lng },
    zoom: 18,
  });

  var symbol = {
    path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
    fillColor: 'red',
    fillOpacity: 0.9,
    strokeWeight: 6,
    scale: 8,
    rotation: 0,
  }

  marker = new google.maps.Marker({
    icon: symbol,
    map,
  })
}

//MQTT

var client = mqtt.connect("ws://localhost:3000");

client.subscribe("location");
//client.subscribe('TEMP');

client.on("connect", function () {
  console.log("connected!");

  // client.publish('new-user', 'From Browser Client');
});

let coords;
client.on("message", function (topic, message) {
  console.log(topic, " : ", message.toString());

  switch (topic) {
    case "location":

        updateMap(message);

      break;

    default:
      break;
  }
});

function led(value) {
  client.publish("LED", value);
}

function updateMap(message){
    [lat, lng, altitude, speed, course] = message.toString().split(",");

      let positon = {lat: parseFloat(lat), lng: parseFloat(lng)};
      marker.setPosition(positon);
      marker.setIcon({...marker.getIcon(), rotation: parseInt(course)})
      map.setCenter(positon)

      document.getElementById('km').innerHTML = speed;
      document.getElementById('msl').innerHTML = altitude;
}