'use strict';
var apiKey = "03236fc2ccd6906479af5df42e472dea"; //Variavel KEY API
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

            let hora = datahora.split(" ");

            var liCidade=cloneCidade.clone();
            console.log(hora[1]);

            if(hora[1] == "03:00:00")
            {
        
            let iconUrl = "http://openweathermap.org/img/wn/" + result.weather[0].icon + "@2x.png";

            $('.weatherCidade').text(res.city.name); 
            $('.weatherData',liCidade).text(hora[0]+" 03:00:00");
            $('.weatherTemperatura',liCidade).text(result.main.temp + " ºC");
            $('.weatherDescricao',liCidade).text(result.weather[0].description);
            $('.weatherIcon #icon',liCidade).attr('src',iconUrl);

            $('.cidade-list').append(liCidade);
           
            }
            
                 
    })
})

});



