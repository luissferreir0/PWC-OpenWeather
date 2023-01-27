'use strict';
var apiKey = "03236fc2ccd6906479af5df42e472dea"; //Variavel KEY API
var cloneCidade = $('.cidade').clone();//clona o codgio das linhas
var lang = '&lang=pt'; //Colocar linguagem em Portugues
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
            $("tr:has(td)").remove();//remove a primeira linha da tabela
            $.each(res.list, function (index, result) {
                let datahora = result.dt_txt;

                let hora = datahora.split(" ");
                var liCidade = cloneCidade.clone();
                console.log(hora[1]);
                console.log(index);

                let iconUrl = "http://openweathermap.org/img/wn/" + result.weather[0].icon + "@2x.png";

                $('.weatherCidade').text(res.city.name);//Cidade
                $('.weatherData', liCidade).text(result.dt_txt);//Data e Hora
                $('.weatherTemperatura', liCidade).text(result.main.temp + " ºC");//Temperatura Atual
                $('.weatherDescricao', liCidade).text(result.weather[0].description);//Descricao
                $('.weatherIcon #icon', liCidade).attr('src', iconUrl);//ICON

                $('.cidade-list').append(liCidade);

            });

        })
        $('#voltarswitch').attr("onclick","mostrarForecast()");
        $('#voltarswitch').attr("value","mostrarForecast");

}

function mostrarForecast() { //Permite ao clicar no botao switch, mostrar o forecast por dia, em vez de 3 em 3h ate completar 5 dias
    var cidade = $("#search").val();
    $.ajax({
        type: "GET",
        datatype: 'json',
        url: "http://api.openweathermap.org/data/2.5/forecast?q=" + cidade + lang + "&units=metric&appid=" + apiKey,
    })
        .done(function (res) {
            console.log(res);
            $("tr:has(td)").remove();//remove a primeira linha da tabela
            $.each(res.list, function (index, result) {
                let datahora = result.dt_txt;
                let hora = datahora.split(" ");
                 var liCidade = cloneCidade.clone();

                if (hora[1].localeCompare("03:00:00") == 0) {
                    
                    //console.log(hora[1]);
                    //console.log(index);

                    let iconUrl = "http://openweathermap.org/img/wn/" + result.weather[0].icon + "@2x.png";

                    $('.weatherCidade').text(res.city.name);//Cidade
                    $('.weatherData', liCidade).text(result.dt_txt);//Data e Hora
                    $('.weatherTemperatura', liCidade).text(result.main.temp + " ºC");//Temperatura Atual
                    $('.weatherDescricao', liCidade).text(result.weather[0].description);//Descricao
                    $('.weatherIcon #icon', liCidade).attr('src', iconUrl);//ICON

                    $('.cidade-list').append(liCidade);


                }

            })

        });
        
            $('#voltarswitch').attr("onclick","forcast()");
            $('#voltarswitch').attr("value","forcast()");
                 
        
}
