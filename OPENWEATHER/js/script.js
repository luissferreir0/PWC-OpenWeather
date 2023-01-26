'use strict';
// importante por causa das versoes
var apiKey = "03236fc2ccd6906479af5df42e472dea";
var cityIds = "2267095,2735943,2267057,2268339,2742032,2270985"
var cloneCidade=$('.cidade').clone();//clona o codgio das linhas

$( window ).on( "load", function() {  $.ajax({
        type: "GET",
        datatype: 'json',
        url: "https://api.openweathermap.org/data/2.5/group?id=" + cityIds + "&units=metric&appid=" + apiKey,
    })
    .done(function(res){
        $("tr:has(td)").remove();//remove a primeira linha
        console.log(res);
        
        $.each(res.list, function (index, result){
           
               
            var liCidade=cloneCidade.clone();
            const {icon} = result.weather[0];

            $('.weatherCidade',liCidade).text(result.name);
            $('.weatherTemperatura',liCidade).text(result.main.temp + " ºC");
            $('.weatherTempMax',liCidade).text(result.main.temp_max + " ºC");
            $('.weatherTempMin',liCidade).text(result.main.temp_min + " ºC");
            $('.weatherDescricao',liCidade).text(result.weather[0].description);
            //$('#weatherIcon',liCidade).attr('src',"https://openweathermap.org/img/wn/" + icon + ".png");




            $('#fav',liCidade).attr('src','img/adicionar fav.png');
            $("#fav",liCidade).attr("onclick","addFavoritos(this.value)");
            $('#fav',liCidade).val(result.name);
            var value_exist=localStorage.getItem('cidade');// valor que ja existe
            if(value_exist != null)
            {
                value_exist=value_exist.split(',');
                for (let index = 0; index < value_exist.length; index++) {
                    //alert(value_exist+' '+result.name);
                    if(value_exist[index]==result.name)
                    {
                        $('#fav',liCidade).attr('src','img/removerfav.png');
                        $("#fav",liCidade).attr("onclick","removerFavoritos(this.value)");
                    }
                    
                }
            }

            $('.media-list').append(liCidade);//adiciona a linhas na tabela
            
       });
       
     
    })
    

 })
