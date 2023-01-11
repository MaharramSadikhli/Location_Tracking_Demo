import mqtt from 'mqtt'
var client = mqtt.connect("mqtt://127.0.0.1:1883")

//client.subscribe('location')

let lat = Math.random()*100; // enlem
let lng = Math.random()*100; // boylam 
let speed = Math.ceil(Math.random())*300; // hiz
let altitude = Math.ceil(Math.random()*1000); // irtifa
let course = Math.ceil(Math.random()*360); // rota
client.on('connect', ()=>{
    console.log("Baglanildi")

    client.subscribe('location',()=>{
        client.publish('location',`${lat},${lng},${speed},${altitude},${course}`,{
            retain: true,
        })
    })
    

})

client.on('message', (topic, message)=>{
    console.log(`${topic} : ${message.toString()}`)
})
