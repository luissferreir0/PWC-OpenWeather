'use strict';
var apiKey = "03236fc2ccd6906479af5df42e472dea"; //Variavel KEY API
var cloneCidade = $('.cidade').clone();//clona o codgio das linhas
var lang = '&lang=pt'; //colocar linguagem em Portugues
var i = 1;

function forcast() {
    var cidade = $("#search").val();
    $.ajax({
        type: "GET",
        datatype: 'json',
        url: "http://api.openweathermap.org/data/2.5/forecast?q=" + cidade + lang + "&units=metric&appid=" + apiKey,
    })
        .done(function (res) {
            console.log(res);
            $("tr:has(td)").remove();//remove a primeira linha
            $.each(res.list, function (index, result) {
                let datahora = result.dt_txt;

                let hora = datahora.split(" ");
                var liCidade = cloneCidade.clone();
                console.log(hora[1]);
                console.log(index);

                let iconUrl = "http://openweathermap.org/img/wn/" + result.weather[0].icon + "@2x.png";

                $('.weatherCidade').text(res.city.name);
                $('.weatherData', liCidade).text(result.dt_txt);
                $('.weatherTemperatura', liCidade).text(result.main.temp + " ºC");
                $('.weatherDescricao', liCidade).text(result.weather[0].description);
                $('.weatherIcon #icon', liCidade).attr('src', iconUrl);

                $('.cidade-list').append(liCidade);

                /*
                if(hora[1].localeCompare("03:00:00") != 0)
                {
                    
                    $('tr:eq('+i+')').css("display","none");
                    
                }
                */

                i++;
            });

        })
        $('#voltarswitch').attr("onclick","mostrarForecast()");
        $('#voltarswitch').attr("value","mostrarForecast");

}

function mostrarForecast() {
    var cidade = $("#search").val();
    $.ajax({
        type: "GET",
        datatype: 'json',
        url: "http://api.openweathermap.org/data/2.5/forecast?q=" + cidade + lang + "&units=metric&appid=" + apiKey,
    })
        .done(function (res) {
            console.log(res);
            $("tr:has(td)").remove();//remove a primeira linha
            $.each(res.list, function (index, result) {
                let datahora = result.dt_txt;
                let hora = datahora.split(" ");
                 var liCidade = cloneCidade.clone();

                if (hora[1].localeCompare("03:00:00") == 0) {
                    
                    console.log(hora[1]);
                    console.log(index);

                    let iconUrl = "http://openweathermap.org/img/wn/" + result.weather[0].icon + "@2x.png";

                    $('.weatherCidade').text(res.city.name);
                    $('.weatherData', liCidade).text(result.dt_txt);
                    $('.weatherTemperatura', liCidade).text(result.main.temp + " ºC");
                    $('.weatherDescricao', liCidade).text(result.weather[0].description);
                    $('.weatherIcon #icon', liCidade).attr('src', iconUrl);

                    $('.cidade-list').append(liCidade);


                }

                i++;
            })

        });
        
        

            $('#voltarswitch').attr("onclick","forcast()");
            $('#voltarswitch').attr("value","forcast()");
       
            
        
}
