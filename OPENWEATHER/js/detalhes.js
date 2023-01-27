'use strict';
let numero;
var verificacao = true;
var apiKey = "03236fc2ccd6906479af5df42e472dea"; //Variavel KEY API
var cityIds = "2267095,2735943,3372783,2268339,2742032,2988507"// Variavel ID's Cidades
var cloneCidade = $('.cidade').clone();//clona o codgio das linhas
var lang ='&lang=pt'; //colocar linguagem em Portugues
function value() {
    let value;
    var urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has("name")) {
        value = urlParams.get("name");
    }

    return value;
}
$(window).on("load", function () {
    $.ajax({
        type: "GET",
        datatype: 'json',
        url: "https://api.openweathermap.org/data/2.5/weather?q=" + value() + lang + "&units=metric&appid=" + apiKey,
    })
    .done(function (res) {
        console.log(res);

        let iconUrl = "http://openweathermap.org/img/wn/" + res.weather[0].icon + "@2x.png";
            console.log(res.name);
            let valor = value();
            if (res.name == valor) {
                $('.weatherCidade').text(res.name);//Cidade
                $('.weatherVento').text(res.wind.speed + "m/s");//Vento
                $('.weatherGraus').text(res.wind.deg + "º");//Vento Graus
                $('.weatherNuvens').text(res.clouds.all + "%");//Nuvens
                $('.weatherPressao').text(res.main.pressure + "hPa");//Pressao Atmosferica
                $('.weatherHumidade').text(res.main.humidity + "%");//Humidade
                $('.weatherLongitude').text(res.coord.lon);//Longitude
                $('.weatherLatitude').text(res.coord.lat);//Latitude
                $('.iconImagem').attr('src',iconUrl);//ICON IMAGEM
                $('.weatherDescricao').text(res.weather[0].description);//Estado do tempo

                $('.fav').attr('src', 'img/adicionar fav.png');// mete todas as imagnes com os corações para adicionar
                $(".fav").attr("onclick", "addFavoritos(this.value)");
                $('.fav').val(res.name);
                var values = localStorage.getItem("tempo");

                /*
                if (values != null) {
                    values = values.split(',');
                    for (let index = 0; index < values.length; index++) {
                        if (values[index] == res.name) {
                            $('#fav').attr('src', 'img/removerfav.png');
                            $("#fav").attr("onclick", "removerFavoritos(this.value)");
                        }
                    }
                }
                */
               
            }

    

    })
})