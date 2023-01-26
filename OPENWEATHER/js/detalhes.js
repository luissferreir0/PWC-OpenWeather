'use strict';
let numero;
var verificacao = true;
var apiKey = "03236fc2ccd6906479af5df42e472dea"; //Variavel KEY API
var cityIds = "2267095,2735943,2267057,2268339,2742032,2270985,3372783"// Variavel ID's Cidades
var cloneCidade = $('.cidade').clone();//clona o codgio das linhas

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
        url: "https://api.openweathermap.org/data/2.5/group?id=" + cityIds + "&units=metric&appid=" + apiKey,
    })
    .done(function (res) {
        console.log(res);

        $.each(res.list, function (index, result) {

            let valor = value();
            if (result.name == valor) {
                // $('#Raking_Atual').text(index+1);//adiciona a imagem consoante o array
                $('#weatherCidade').text(result.name);//Cidade
                $('#weatherVento').text(result.wind.speed);//Vento
                $('#weatherGraus').text(result.wind.deg);//Vento Graus
                $('#weatherNuvens').text(result.clouds.all);//Nuvens
                $('#weatherPressao').text(result.main.pressure);//Pressao Atmosferica
                $('#weatherHumidade').text(result.main.humidity);//Humidade
                $('#weatherLongitude').text(result.coord.lon);//Longitude
                $('#weatherLatitude').text(result.coord.lat);//Latitude

                $('#fav').attr('src', 'img/adicionar fav.png');// mete todas as imagnes com os corações para adicionar
                $("#fav").attr("onclick", "addFavoritos(this.value)");
                $('#fav').val(result.name);
                var values = localStorage.getItem("tempo");

                if (values != null) {
                    values = values.split(',');
                    for (let index = 0; index < values.length; index++) {
                        if (values[index] == result.name) {
                            $('#fav').attr('src', 'img/removerfav.png');
                            $("#fav").attr("onclick", "removerFavoritos(this.value)");
                        }
                    }
                }
                numero = index;
                verificacao = false;
            }

        });

    })
})