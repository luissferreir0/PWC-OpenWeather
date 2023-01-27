'use strict';
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
        $("tr:has(td)").remove();//remove a primeira linha
        $.each(res.list, function (index, result){
            let datahora=result.dt_txt;
             // if(result.dt_txt=2023-01-28 03:00:00)
            let hora = datahora.split(" ");

            var liCidade=cloneCidade.clone();
            console.log(hora[1]);

            if(hora[1] == "03:00:00" )
            {
           
            let iconUrl = "http://openweathermap.org/img/wn/" + result.weather[0].icon + "@2x.png";

            $('.weatherCidade').text(res.city.name); 
            $('.weatherTemperatura',liCidade).text(hora[0]);
            $('.weatherTempMax',liCidade).text(result.main.temp_max + " ºC");
            $('.weatherTempMin',liCidade).text(result.main.temp_min + " ºC");
            $('.weatherDescricao',liCidade).text(result.weather[0].description);
            $('.weatherIcon #icon',liCidade).attr('src',iconUrl);
            $('.cidade-list').append(liCidade);
           
            
            }

            
    })
})
});



