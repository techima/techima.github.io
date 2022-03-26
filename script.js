(function() {
    "use strict";
    
    //clock

    document.addEventListener("DOMContentLoaded", function() {
        
        let c = document.getElementById("clock");
       
        setInterval(updateClock, 1000);
        
        function updateClock() {
            
            let date = new Date();
            let h = date.getHours();
            let m = date.getMinutes();
            let s = date.getSeconds();
            let liide = "PL"

            if (h < 13) {
                liide = "EL";
            }

            if (h >= 13) {
                h = h - 12;
            }

            if (m < 10) {
                m = "0" + m;
            }

            if (s < 10) {
                s = "0" + s;
            }

            c.innerHTML = h + ":" + m + ":" + s + " " + liide;
            
        };
        
    });
    
    // forms
    
    document.getElementById("form").addEventListener("submit", estimateDelivery);
    
    let e = document.getElementById("delivery");
    e.innerHTML = "0 &euro;";
    
    function estimateDelivery(event) {
        event.preventDefault();

        if (nameIsEmptyOrContainsNumbers() == true) {
            alert("Nimelahtrid ei tohi olla tühjad ega sisaldada numbreid");
            return;
        }

        if (isAnyChecked() == false) {
            alert("Palun valige tarneviis");
            return;
        }

        let linn = document.getElementById("linn");
        if (linn.value === "") {
            alert("Palun valige linn nimekirjast");
            linn.focus();
            return;
        }

        let tavalineKuller = document.getElementById("tavaline").checked;
        let ekspressKuller = document.getElementById("ekspress").checked;
        let ultraEkspressKuller = document.getElementById("ultraekspress").checked;

        let value = 0;
        let present = document.getElementById("v1").checked;
        let contactless = document.getElementById("v2").checked;

        if (present) {
            value += 5;
        }
        if (contactless) {
            value += 1;
        }

        if (tavalineKuller) {
            value += 0.5;
        } else if (ekspressKuller) {
            value += 4.5;
        } else {
            value += 8.5;
        }

        if (linn.value == "trt" || linn.value == "nrv") {
            value += 2.5;
        } else if (linn.value == "prn") {
            value += 3;
        }
        
        e.innerHTML = value + " &euro;";
        console.log("Tarne hind on arvutatud"); 
              
    }

    function isAnyChecked() {
        let tavalineKuller = document.getElementById("tavaline");
        let ekspressKuller = document.getElementById("ekspress");
        let ultraEkspressKuller = document.getElementById("ultraekspress");
        return tavalineKuller.checked || ekspressKuller.checked || ultraEkspressKuller.checked;
    }

    function nameIsEmptyOrContainsNumbers() {
        let firstName = document.getElementById("fname").value;
        let lastName = document.getElementById("lname").value;
        return firstName == "" || lastName == "" || /\d/.test(firstName) || /\d/.test(lastName)
    }
    
})();

// map

let mapAPIKey = "AsRRX7K_3cEZIAFVBeamXoZ8juaePJSx525nIAPL8Pi7RHD_nbo0rdub_PqsbT5_";

let map;
let infobox;

function GetMap() {
    
    "use strict";

    let ülikool = new Microsoft.Maps.Location(
        58.38104, 26.71992
    );

    let loomapark = new Microsoft.Maps.Location(
        58.69547, 25.75523
    )

    let centerPoint = new Microsoft.Maps.Location(
        58.5762367, 26.2895107
    )

    map = new Microsoft.Maps.Map("#map", {
        credentials: mapAPIKey,
        center: centerPoint,
        zoom: 9,
        mapTypeId: Microsoft.Maps.MapTypeId.road,
        disablePanning: true
    });
    
    infobox = new Microsoft.Maps.Infobox(map.getCenter(), {
        visible: false
    });

    infobox.setMap(map);

    let ülikoolPinPoint = new Microsoft.Maps.Pushpin(ülikool, {
        title: 'Tartu Ülikool',
        description: "Eesti vanim ülikool."
    });

    ülikoolPinPoint.metadata = {
        title: 'Tartu Ülikool',
        description: "Eesti vanim ülikool."
    }
    
    let loomaparkPinpoint = new Microsoft.Maps.Pushpin(loomapark, {
        title: 'Elistvere loomapark',
        description: "Üks legendaarsemaid loomaparke Eestis."
    });

    loomaparkPinpoint.metadata = {
        title: 'Elistvere loomapark',
        description: "Üks legendaarsemaid loomaparke Eestis."
    }

    Microsoft.Maps.Events.addHandler(ülikoolPinPoint, 'click', pushpinClicked);
    Microsoft.Maps.Events.addHandler(loomaparkPinpoint, 'click', pushpinClicked);

    map.entities.push(ülikoolPinPoint);
    map.entities.push(loomaparkPinpoint);
}

function pushpinClicked(e) {
    if (e.target.metadata) {
        infobox.setOptions({
            location: e.target.getLocation(),
            title: e.target.metadata.title,
            description: e.target.metadata.description,
            visible: true
        });
    }
}

// https://dev.virtualearth.net/REST/v1/Locations?q=1000 Vin Scully Ave, Los Angeles,CA&key=YOUR_KEY_HERE

