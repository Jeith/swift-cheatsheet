(function() {

    // search button takes user input and stores it into session sstorage. it uses this in tandem with our country code
    //array to give the information page the right place to pull info froom on the api
    var searchbutton = $('#searchbutton');
    searchbutton.click( function(e) {
        var $country = $('#cc').textContent;
        sessionStorage.setItem("country", $country);
        // var cc = $('#cc').textContent;
        // let url = 'https://raw.githubusercontent.com/Jeith/worldfactbookapi/master/countries/' + cc + ".json";
    
    $.get(url)
    .done(function(response) {
        
        // console.log(JSON.parse(response));
        // console.log(response);
        let responseObject = JSON.parse(response);
        updateUISuccess(responseObject)
    })

    .fail(function(error){
        console.log(error);

        updateUIError()
    });

    function updateUISuccess(response){
    }
    function updateUIError(){
    }
}); 
})(); 

// this function returns strings uppercased properly
function uppercase(str){
  var array1 = str.split(' ');
  var newarray1 = [];
    
  for(var x = 0; x < array1.length; x++){
      newarray1.push(array1[x].charAt(0).toUpperCase()+array1[x].slice(1));
  }
  return newarray1.join(' ');
}

// this function starts on countryinfo.html
function loadPage(){
    console.log($( "title" )[0].textContent);
    var cc = $("#cc")[0].textContent;
    let url = 'https://raw.githubusercontent.com/Jeith/worldfactbookapi/master/countries/' + cc + ".json";
    console.log(url);
    $.get(url)
    .done(function(response) {
        
        let responseObject = JSON.parse(response);
        updateUISuccess(responseObject)
    })

    .fail(function(error){
        console.log(error);

        updateUIError()
    });
    function updateUIError(){
    }  

    function updateUISuccess(response){
        console.log(url)
        // Google map
        var location = response.Government.Capital["geographic coordinates"].text;
        console.log(location);
        location = location.replace(",", "");
        var location1 = location.split(" ");
        
        var customLocation = [];

        location1.forEach(function(e){ 
            if(e == "S" || e == "W"){ 
                customLocation.push("-");
            } else if(e == "N" || e == "E"){ 
                customLocation.push("");
            } else{ 
                customLocation.push(e); 
            } 
        });
        var latitude = customLocation[2] + customLocation[0] + "." + customLocation[1];
        var longitude = customLocation[5] + customLocation[3] + "." + customLocation[4];
        
        var lat = parseFloat(latitude);
        var long = parseFloat(longitude);

        
        var map;
        //   function initMap() {
            map = new google.maps.Map(document.getElementById('googleMap'), {
                
            //   center: {lat: 45.25, lng: -75.42},
                center: {lat: lat, lng: long},
                zoom: 8
            });

        //  //  LINE INFO  //  //
        //Geography
        //set elements of page
        var $climate = document.getElementById("climate");
        var $terrain = document.getElementById("terrain");
        var $elevation = document.getElementById("elevation");
        var $naturalHazzards = document.getElementById("naturalHazzards");
        var $area = document.getElementById("area");
        var $areaComparison = document.getElementById("areaComparison");
        var $MUA = document.getElementById("MUA");
        //regular expresion to filter bad api inputs and set into page
        let arrMUA = response["People and Society"]["Major urban areas - population"].text.replace(/ *\([^)(]*\) */g, " ").replace(/ *\([^)]*\) */g, "").split(';');
        for(i = 0; i < arrMUA.length; i++){
            let city = document.createElement("li");
            city.textContent = arrMUA[i];
            $MUA.appendChild(city);
        }
        //set elements with correct content
        $climate.textContent = response["Geography"]["Climate"].text;
        $terrain.textContent = response["Geography"]["Terrain"].text;
        $elevation.textContent = response["Geography"]["Elevation"]["elevation extremes"].text;
        $naturalHazzards.textContent = response["Geography"]["Natural hazards"].text;
        $area.textContent = response["Geography"]["Area"]["total"].text;
        $areaComparison.textContent = response["Geography"]["Area - comparative"].text;

        var flag = document.getElementById("flag");
        var pic = "png1000px/" + cc + ".png"
        flag.setAttribute("src", pic)

       //Government 
       //set elements of page
        var $entemology = document.getElementById("entemology");
        var $governmentType = document.getElementById("governmentType");
        var $adminDivision = document.getElementById("adminDivision");
        var $independence = document.getElementById("independence");    
        var $legalSystem = document.getElementById("legalSystem");
        var $nationalAnthem = document.getElementById("nationalAnthem");
        // checks to see if this area is covered in the API to fail gracefully if not. then works with regular expressions to create desired output. 
        if(typeof response["Government"]["Country name"]["etymology"] !== 'undefined' && typeof response["Government"]["Country name"]["etymology"].title !== 'undefined'){
            $entemology.textContent = response["Government"]["Country name"]["etymology"].text;
        }
        $governmentType.textContent = response["Government"]["Government type"].text;
        $adminDivision.textContent = response["Government"]["Administrative divisions"].text;
       // checks to see if this area is covered in the API to fail gracefully if not. then works with regular expressions to create desired output.
        if(typeof response["Government"]["Independence"] !== 'undefined' && typeof response["Government"]["Independence"].title !== 'undefined'){
            $independence.textContent = response["Government"]["Independence"].text.replace(/ *\([^)(]*\) */g, " ").replace(/ *\([^)]*\) */g, "").replace(/[++]/g, '-');
        }
        else{
            $independence.textContent = "Not yet recognized as Independent."
        }
        $legalSystem.textContent = response["Government"]["Legal system"].text;
        $nationalAnthem.textContent = response["Government"]["National anthem"]["name"].text + ": " + response["Government"]["National anthem"]["lyrics/music"].text;

        //Economy
        //set elements of page
        var $exchangeRate = document.getElementById("exchangeRate");
        var $growthrate = document.getElementById("growthrate");
        // works with regular expressions to pull correct info from api
        $exchangeRate.textContent = response["Economy"]["GDP (official exchange rate)"].text.replace(/ *\([^)(]*\) */g, " ").replace(/[++]/g, '-');
        $growthrate.textContent = response["Economy"]["GDP - real growth rate"].text.replace(/ *\([^)(]*\) */g, " ").replace(/[++]/g, '-');
        var $unemployment = document.getElementById("unemployment");
        var $povertyLine = document.getElementById("povertyLine");
        var $gini = document.getElementById("gini");
        var $inflation = document.getElementById("inflation");  
        console.log(response["Economy"]["Unemployment rate"].text);
        $unemployment.textContent = response["Economy"]["Unemployment rate"].text.replace(/ *\([^)(]*\) */g, " ").replace(/ *\([^)]*\) */g, "").replace(/[++]/g, '-');
        $povertyLine.textContent = response["Economy"]["Population below poverty line"].text.replace(/ *\([^)(]*\) */g, " ").replace(/ *\([^)]*\) */g, "").replace(/[++]/g, '-');
        // checks to see if this area is covered in the API to fail gracefully if not. then works with regular expressions to create desired output. 
        if(typeof response["Economy"]["Distribution of family income - Gini index"] !== 'undefined' && typeof response["Economy"]["Distribution of family income - Gini index"].title !== 'undefined'){
            $gini.textContent = response["Economy"]["Distribution of family income - Gini index"].text.replace(/ *\([^)(]*\) */g, " ").replace(/ *\([^)]*\) */g, "").replace(/[++]/g, '-');
        }
        $inflation.textContent = response["Economy"]["Inflation rate (consumer prices)"].text.replace(/ *\([^)(]*\) */g, " ").replace(/ *\([^)]*\) */g, "").replace(/[++]/g, '-');
        

        var $AP = document.getElementById("agProduction");
        // works with regular expressions to pull correct info from api

        let arrAP = response["Economy"]["Agriculture - products"].text.replace(/ *\([^)(]*\) */g, " ").replace(/ *\([^)]*\) */g, "").split(';').join(',').split(',');
        for(i = 0; i < arrAP.length; i++){
            let agricultureP = document.createElement("li");
            agricultureP.textContent = arrAP[i];
            $AP.appendChild(agricultureP);
        }
        
        var $IP = document.getElementById("indProduction");
        // works with regular expressions to pull correct info from api

        let arrIP = response["Economy"]["Industries"].text.replace(/ *\([^)(]*\) */g, " ").replace(/ *\([^)]*\) */g, "").split(';').join(',').split(',');
        for(i = 0; i < arrIP.length; i++){
            let industrialP = document.createElement("li");
            industrialP.textContent = arrIP[i];
            $IP.appendChild(industrialP);
        }

        var $EP = document.getElementById("exports");
        index = response["Economy"]["Exports"].text.indexOf("+");
        if (index > 0){}
        input = response["Economy"]["Exports"].text.substring(0, index);
        $EP.textContent = "Exports: (" + input.replace(/ *\([^)(]*\) */g, " ").replace(/ *\([^)]*\) */g, "").replace(/ *\([^)]*\) */g, "") + ")";
        // works with regular expressions to pull correct info from api

        let arrEP = response["Economy"]["Exports - commodities"].text.replace(/ *\([^)(]*\) */g, " ").replace(/ *\([^)]*\) */g, "").split(';').join(',').split(',');
        for(i = 0; i < arrEP.length; i++){
            let exportsC = document.createElement("li");
            exportsC.textContent = arrEP[i];
            $EP.appendChild(exportsC);
        }

        var $ImP = document.getElementById("imports");
        index = response["Economy"]["Imports"].text.indexOf("+");
        if (index > 0){}
        input = response["Economy"]["Imports"].text.substring(0, index);
        $ImP.textContent = "Imports: (" + input.replace(/ *\([^)(]*\) */g, " ").replace(/ *\([^)]*\) */g, "").replace(/ *\([^)]*\) */g, "") + ")";
        // works with regular expressions to pull correct info from api

        let arrImP = response["Economy"]["Imports - commodities"].text.replace(/ *\([^)(]*\) */g, " ").replace(/ *\([^)]*\) */g, "").split(';').join(',').split(',');
        for(i = 0; i < arrImP.length; i++){
            let importsC = document.createElement("li");
            importsC.textContent = arrImP[i];
            $ImP.appendChild(importsC);
        }

        var countryName = document.getElementsByClassName("countryName");
        var countryDesc = document.getElementById("countryDesc");
        console.log(response['Government']['Capital']['name'].text);
        if (response['Government']['Capital']['name'].text == "Abu Dhabi"){
            var name = response['Government']['Country name']['conventional long form'].text
        } else {
            var name = response['Government']['Country name']['conventional short form'].text
        }
        for ( var i=0; i < countryName.length; ++i ){
            countryName[i].innerHTML = name;
        }
        countryDesc.innerHTML = response["Introduction"]["Background"].text

        /////////////
        //////////
        //charts
        /////
        //

        //create charts elements
        var ctx1 = document.getElementById("chart1");
        var ctx2 = document.getElementById("chart2");
        var ctx3 = document.getElementById("chart3");
        var ctx4 = document.getElementById("chart4");
        var ctx5 = document.getElementById("chart5");
        var ctx6 = document.getElementById("chart6");
        var ctx7 = document.getElementById("chart7");
        var ctx8 = document.getElementById("chart8");
        var ctx9 = document.getElementById("chart9");
        var ctx10 = document.getElementById("chart10");
        //agegroup chart
        function ageGroupG(){
            // data in chart in correct format
            var agegroup1 = response["People and Society"]["Age structure"]["0-14 years"].text.replace(/ *\([^)(]*\) */g, "").replace(/ *\([^)]*\) */g, "").replace(/[%]/g, '');
            var agegroup2 = response["People and Society"]["Age structure"]["15-24 years"].text.replace(/ *\([^)(]*\) */g, "").replace(/ *\([^)]*\) */g, "").replace(/[%]/g, '');
            var agegroup3 = response["People and Society"]["Age structure"]["25-54 years"].text.replace(/ *\([^)(]*\) */g, "").replace(/ *\([^)]*\) */g, "").replace(/[%]/g, '');
            var agegroup4 = response["People and Society"]["Age structure"]["55-64 years"].text.replace(/ *\([^)(]*\) */g, "").replace(/ *\([^)]*\) */g, "").replace(/[%]/g, '');
            var agegroup5 = response["People and Society"]["Age structure"]["65 years and over"].text.replace(/ *\([^)(]*\) */g, "").replace(/ *\([^)]*\) */g, "").replace(/[%]/g, '');
            new Chart(ctx1, {
                type: 'pie',
                data: {
                    labels: ["0-14 years", "15-24 years", "25-54 years", "55-64 years", "65 years and older"],
                    datasets: [
                    {
                        label: "Population (millions)",
                        backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850","#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850","#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
                        data: [agegroup1,agegroup2,agegroup3,agegroup4,agegroup5]
                    }
                    ]
                },
                options: {
                    title: {
                    display: true,
                    text: 'Age Structure'
                    }
                }
            });
        }
        ageGroupG();
        //religion chart
        function religionG(){//get labels and data from api in correct format
            let l = response["People and Society"]["Religions"].text.replace(/ *\([^)(]*\) */g, "").replace(/ *\([^)]*\) */g, "").replace(/[0-9]/g, '').replace(/[.]/g, '').replace(/[%]/g, '').split(',');
            let d = response["People and Society"]["Religions"].text.replace(/ *\([^)(]*\) */g, "").replace(/ *\([^)]*\) */g, "").replace(/[a-z]/g, '').replace(/[A-Z]/g, '').replace(/[%]/g, '').replace(/[']/g, '').replace(/[/]/g, '').split(',');
        
            new Chart(ctx2, {
                type: 'doughnut',
                data: {
                    labels: l,
                    datasets: [
                    {
                        label: "Religions",
                        backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850", "#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850", "#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850","#e8c3b9","#c45850", "#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850", "#3e95cd", "#8e5ea2"],
                        data: d,
                    }
                    ]
                },
                options: {
                    title: {
                    display: true,
                    text: 'Religions'
                    }
                }
            });
        }   
        religionG();
        //gdp consumption chart
        function GDPConsumptionG(){// data from economy section in correct/usable format
            let d = [];
            d.push(response["Economy"]["GDP - composition, by end use"]["household consumption"].text.replace(/[%]/g, '').replace(/ *\([^)(]*\) */g, "").replace(/ *\([^)]*\) */g, ""));
            d.push(response["Economy"]["GDP - composition, by end use"]["government consumption"].text.replace(/[%]/g, '').replace(/ *\([^)(]*\) */g, "").replace(/ *\([^)]*\) */g, ""));
            d.push(response["Economy"]["GDP - composition, by end use"]["investment in fixed capital"].text.replace(/[%]/g, '').replace(/ *\([^)(]*\) */g, "").replace(/ *\([^)]*\) */g, ""));
            d.push(response["Economy"]["GDP - composition, by end use"]["investment in inventories"].text.replace(/[%]/g, '').replace(/ *\([^)(]*\) */g, "").replace(/ *\([^)]*\) */g, ""));
            d.push(response["Economy"]["GDP - composition, by end use"]["exports of goods and services"].text.replace(/[%]/g, '').replace(/ *\([^)(]*\) */g, "").replace(/ *\([^)]*\) */g, ""));
            d.push(response["Economy"]["GDP - composition, by end use"]["imports of goods and services"].text.replace(/[%]/g, '').replace(/ *\([^)(]*\) */g, "").replace(/ *\([^)]*\) */g, ""));

            new Chart(ctx3, {
                type: 'horizontalBar',
                data: {
                labels: ["Household%", "Government%", "Fixed Capital %", "Inventories %", "Exports %", "Imports %"],
                datasets: [
                    {
                    label: "GDP: End-Use",
                    backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850", "#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850", "#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850","#e8c3b9","#c45850", "#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850", "#3e95cd", "#8e5ea2"],
                    data: d,
                    }
                ]
                },
                options: {
                legend: { display: false },
                title: {
                    display: true,
                    text: 'GDP: End-Use'
                }
                }
            });
            }
            GDPConsumptionG();
            //gdp origin chart
            function GDPOriginG(){// data from economy section in correct/usable format
                let d = [];
                d.push(response["Economy"]["GDP - composition, by sector of origin"]["agriculture"].text.replace(/ *\([^)(]*\) */g, "").replace(/[%]/g, '').replace(/ *\([^)]*\) */g, "").replace(/[+]/g, '').replace(/[-]/g, ''));
                d.push(response["Economy"]["GDP - composition, by sector of origin"]["industry"].text.replace(/ *\([^)(]*\) */g, "").replace(/[%]/g, '').replace(/ *\([^)]*\) */g, "").replace(/[+]/g, '').replace(/[-]/g, ''));
                d.push(response["Economy"]["GDP - composition, by sector of origin"]["services"].text.replace(/ *\([^)(]*\) */g, "").replace(/[%]/g, '').replace(/ *\([^)]*\) */g, "").replace(/[+]/g, '').replace(/[-]/g, ''));
                new Chart(ctx4, {
                    type: 'pie',
                    data: {
                        labels: ["agriculture", "industry", "services"],
                        datasets: [
                        {
                            label: "GDP: by Origin",
                            backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850", "#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850", "#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850","#e8c3b9","#c45850", "#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850", "#3e95cd", "#8e5ea2"],
                            data: d,
                        }
                        ]
                    },
                    options: {
                        title: {
                        display: true,
                        text: 'GDP: by Origin'
                        }
                    }
                });
            }
            GDPOriginG();
            //labor force chart
            function laborForceG(){        
                var economy = response["Economy"]["Labor force - by occupation"];

                let d = [];
                for(e in economy){
                    if (e != "note"){
                        d.push(response["Economy"]["Labor force - by occupation"][e].text.replace(/[%]/g, '').replace(/ *\([^)(]*\) */g, "").replace(/ *\([^)]*\) */g, ""));
                    }
                }
                let l = [];
                for(e in economy){
                    if (e != "note"){
                        l.push(e)
                    }
                }
                console.log(d);
                console.log(l);
                new Chart(ctx5, {
                    type: 'polarArea',
                    data: {
                        labels: l,
                        datasets: [
                        {
                            label: "Labor Force",
                            backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850", "#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850", "#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850","#e8c3b9","#c45850", "#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850", "#3e95cd", "#8e5ea2"],
                            data: d,
                        }
                        ]
                    },
                    options: {
                        title: {
                        display: true,
                        text: 'Labor Force'
                        }
                    }
                });
            }
            laborForceG();
            // ethnicity chart
            function ethnicityG(){//get labels and data from api in correct format
                let l = response["People and Society"]["Ethnic groups"].text.replace(/ *\([^)(]*\) */g, "").replace(/ *\([^)]*\) */g, "").replace(/[0-9]/g, '').replace(/[.]/g, '').replace(/[%]/g, '').split(',');
                let d = response["People and Society"]["Ethnic groups"].text.replace(/ *\([^)(]*\) */g, "").replace(/ *\([^)]*\) */g, "").replace(/[a-z]/g, '').replace(/[A-Z]/g, '').replace(/[%]/g, '').replace(/[']/g, '').replace(/[/]/g, '').split(',');
                            if(d[0] == "" || d[0] == " " || d[0] == "  " || d[0] == "   "){
                     l.push("*No information is known on percentages of the population ascribed*");
                     d.push(" ");
                }
                new Chart(ctx6, {
                    type: 'doughnut',
                    data: {
                        labels: l,
                        datasets: [
                        {
                            label: "Ethnicities",
                            backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850", "#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850", "#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850","#e8c3b9","#c45850", "#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850", "#3e95cd", "#8e5ea2"],
                            data: d,
                        }
                        ]
                    },
                    options: {
                        title: {
                        display: true,
                        text: 'Ethnicities'
                        }
                    }
                });
            }   
            ethnicityG();
            // languages chart

            function languagesG(){//get labels and data from api in correct format
                let l = response["People and Society"]["Languages"].text.replace(/ *\([^)(]*\) */g, "").replace(/ *\([^)]*\) */g, "").replace(/[0-9]/g, '').replace(/[.]/g, '').replace(/[%]/g, '').split(',');
                let d = response["People and Society"]["Languages"].text.replace(/ *\([^)(]*\) */g, "").replace(/ *\([^)]*\) */g, "").replace(/[a-z]/g, '').replace(/[A-Z]/g, '').replace(/[%]/g, '').replace(/[']/g, '').replace(/[/]/g, '').split(',');
                if(d[0] == "" || d[0] == " " || d[0] == "  " || d[0] == "   "){
                     l.push("*No information is known on percentages of the population ascribed*");
                     d.push(" ");
                }
                new Chart(ctx7, {
                    type: 'pie',
                    data: {
                        labels: l,
                        datasets: [
                        {
                            label: "Languages",
                            backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850", "#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850", "#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850","#e8c3b9","#c45850", "#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850", "#3e95cd", "#8e5ea2"],
                            data: d,
                        }
                        ]
                    },
                    options: {
                        title: {
                        display: true,
                        text: 'Languages'
                        }
                    }
                });
            }
            languagesG();
            // urbanization chart

            function urbanizationG(){//get labels and data from api in correct format
                let l = ["Urbanization"];
                let d = [];
                d.push(response["People and Society"]["Urbanization"]["urban population"].text.replace(/ *\([^)(]*\) */g, "").replace(/ *\([^)]*\) */g, "").replace(/[a-z]/g, '').replace(/[A-Z]/g, '').replace(/[%]/g, '').replace(/[']/g, '').replace(/[/]/g, ''));
                d.push(100-d[0]);
                new Chart(ctx8, {
                    type: 'pie',
                    data: {
                        labels: l,
                        datasets: [
                        {
                            label: "Urbanization",
                            backgroundColor: ["#3e95cd"],
                            data: d,
                        }
                        ]
                    },
                    options: {
                        title: {
                        display: true,
                        text: 'Urbanization'
                        }
                    }
                });
            }
            //sets contingency for information being undefined
            if(typeof response["People and Society"]["Urbanization"] !== 'undefined' && typeof response["People and Society"]["Urbanization"].title !== 'undefined'){
                urbanizationG();
            }
            else{
                new Chart(ctx8, {
                    type: 'pie',
                    data: {
                        labels: ["No urbanization Data is Known"],
                        datasets: [
                        {
                            label: "Urbanization",
                            backgroundColor: ["#D3D3D3"],
                            data: [100],
                        }
                        ]
                    },
                    options: {
                        title: {
                        display: true,
                        text: 'Urbanization'
                        }
                    }
                });
            }
            // Male and female life chart

            function MFLifeG(){//get labels and data from api in correct format
                let d = [];
                d.push(response["People and Society"]["Life expectancy at birth"]["total population"].text.replace(/ *\([^)(]*\) */g, "").replace(/[%]/g, '').replace(/ *\([^)]*\) */g, "").replace(/[+]/g, '').replace(/[-]/g, '').replace(/[a-z]/g, '').replace(/[A-Z]/g, ''));
                d.push(response["People and Society"]["Life expectancy at birth"]["male"].text.replace(/ *\([^)(]*\) */g, "").replace(/[%]/g, '').replace(/ *\([^)]*\) */g, "").replace(/[+]/g, '').replace(/[-]/g, '').replace(/[a-z]/g, '').replace(/[A-Z]/g, ''));
                d.push(response["People and Society"]["Life expectancy at birth"]["female"].text.replace(/ *\([^)(]*\) */g, "").replace(/[%]/g, '').replace(/ *\([^)]*\) */g, "").replace(/[+]/g, '').replace(/[-]/g, '').replace(/[a-z]/g, '').replace(/[A-Z]/g, ''));
                new Chart(ctx9, {
                    type: 'bar',
                    data: {
                        labels: ["total population", "male", "female"],
                        datasets: [
                        {
                            label: "Life expectancy at birth",
                            backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850", "#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850", "#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850","#e8c3b9","#c45850", "#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850", "#3e95cd", "#8e5ea2"],
                            data: d,
                        }
                        ]
                    },
                    options: {
                        title: {
                        display: true,
                        text: 'Life expectancy at birth'
                        }
                    }
                });
                }
                MFLifeG();

    var $geography = document.getElementById("geography");
    var $PeopleAndSociety = document.getElementById("peopleAndSociety");
    var $Government = document.getElementById("government");
    var $Economy = document.getElementById("economy");
    var $geographyContent = document.getElementById("contentGE");
    var $PeopleAndSocietyContent = document.getElementById("contentPS");
    var $GovernmentContent = document.getElementById("contentGO");
    var $EconomyContent = document.getElementById("contentEC");
    var $content = document.getElementById("contentBG")
    function topFunction() {
       
        $("html, body").animate({ scrollTop: 0 }, "slow");
    } 
    ///////
    ///
    //sidebar buttons
    ///
    //////

    //each button sets certain groupings to be invisible while others are visible and brings rthe view back to the top of the view-height
    // let  = []

    function changePage(e){
        console.log(e.target.id)
    }

    // $geography.onclick = function(){
    //     topFunction();
    //     $geographyContent.setAttribute("style", "visibility: visible");
    //     $PeopleAndSocietyContent.setAttribute("style", "visibility: hidden");
    //     $GovernmentContent.setAttribute("style", "visibility: hidden");
    //     $EconomyContent.setAttribute("style", "visibility: hidden");
    //     $content.setAttribute("style", "visibility: hidden");
    // }
    
    // $PeopleAndSociety.onclick = function(){
    //     topFunction();
    //     $geographyContent.setAttribute("style", "visibility: hidden");
    //     $PeopleAndSocietyContent.setAttribute("style", "visibility: visible");
    //     $GovernmentContent.setAttribute("style", "visibility: hidden");
    //     $EconomyContent.setAttribute("style", "visibility: hidden");
    //     $content.setAttribute("style", "visibility: hidden");  
    // }
    
    // $Government.onclick = function(){
    //     topFunction();
    //     $geographyContent.setAttribute("style", "visibility: hidden");
    //     $PeopleAndSocietyContent.setAttribute("style", "visibility: hidden");
    //     $GovernmentContent.setAttribute("style", "visibility: visible");
    //     $EconomyContent.setAttribute("style", "visibility: hidden");
    //     $content.setAttribute("style", "visibility: hidden");
    // }
    
    // $Economy.onclick = function(){
    //     topFunction();
    //     $geographyContent.setAttribute("style", "visibility: hidden");
    //     $PeopleAndSocietyContent.setAttribute("style", "visibility: hidden");
    //     $GovernmentContent.setAttribute("style", "visibility: hidden");
    //     $EconomyContent.setAttribute("style", "visibility: visible");
    //     $content.setAttribute("style", "visibility: hidden");
    // }

    $geographyContent.setAttribute("style", "visibility: hidden");
    $PeopleAndSocietyContent.setAttribute("style", "visibility: hidden");
    $GovernmentContent.setAttribute("style", "visibility: hidden");
    $EconomyContent.setAttribute("style", "visibility: hidden;");
    $content.setAttribute("style", "visibility: visible");

    function updateUIError(){
    }  
    }}
    function clearit(){
        sessionStorage.clear();
}