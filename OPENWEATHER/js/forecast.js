'use strict';
var verificacao = true;
var apiKey = "03236fc2ccd6906479af5df42e472dea"; //Variavel KEY API
var cityIds = "2267095,2735943,2267057,2268339,2742032,2270985,3372783"// Variavel ID's Cidades
var cloneCidade = $('.cidade').clone();//clona o codgio das linhas
var lang ='&lang=pt'; //colocar linguagem em Portugues



$("#procurar").click( function () {
    var cidade = $("#search").val();
    $.ajax({
        type: "GET",
        datatype: 'json',
        url: "http://api.openweathermap.org/data/2.5/forecast?q=" + cidade + lang + "&units=metric&appid=" + apiKey,
    })
    .done(function (res) {
        console.log(res);

        

     //  let iconUrl = "http://openweathermap.org/img/wn/" + res.weather[1].icon + "@2x.png";
           
                $('.weatherCidade').text(res.city.name);//Cidade
             //   $('.iconImagem').attr('src',iconUrl);//ICON IMAGEM
               // $('.weatherVento').text(res.wind.speed + "m/s");//Vento
               // $('.weatherGraus').text(res.wind.deg + "º");//Vento Graus
               // $('.weatherNuvens').text(res.clouds.all + "%");//Nuvens
               // $('.weatherPressao').text(res.main.pressure + "hPa");//Pressao Atmosferica
               // $('.weatherHumidade').text(res.main.humidity + "%");//Humidade
              //  $('.weatherLongitude').text(res.coord.lon);//Longitude
             //   $('.weatherLatitude').text(res.coord.lat);//Latitude
              
              //  $('.weatherDescricao').text(res.weather[0].description);//Estado do tempo

                $('.fav').attr('src', 'img/adicionar fav.png');// mete todas as imagnes com os corações para adicionar
                $(".fav").attr("onclick", "addFavoritos(this.value)");
                $('.fav').val(res.name);
                var values = localStorage.getItem("tempo");



    })
});



