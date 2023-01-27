'use strict';
var verificacao = true;
var apiKey = "03236fc2ccd6906479af5df42e472dea";
var cityIds = "2267095,2735943,2267057,2268339,2742032,2270985,3351879"
var cloneCidade=$('.cidade').clone();//clona o codgio das linhas
var lang ='&lang=pt'; //colocar linguagem em Portugues
$( window ).on( "load", function() {  $.ajax({
        type: "GET",
        datatype: 'json',
        url: "https://api.openweathermap.org/data/2.5/group?id=" + cityIds + lang+ "&units=metric&appid=" + apiKey,
    })
    .done(function(res){
        $("tr:has(td)").remove();
        
        
        $.each(res.list, function (index, result){
            let iconUrl = "http://openweathermap.org/img/wn/" + result.weather[0].icon + "@2x.png";
            var liCidade=cloneCidade.clone();
            var value_exist=localStorage.getItem('tempo');
            if(value_exist != null)
            {
                value_exist=value_exist.split(',');
                for (let pos = 0; pos < value_exist.length; pos++) {

                    if(value_exist[pos]==result.name)
                    {
                    $('.pos',liCidade).text(index+1);
                    $('.weatherCidade',liCidade).text(result.name);
                    $('.link',liCidade).attr('href', "detalhes.html?name="+result.name);
                    $('.weatherTemperatura',liCidade).text(result.main.temp + " ºC");
                    $('.weatherTempMax',liCidade).text(result.main.temp_max + " ºC");
                    $('.weatherTempMin',liCidade).text(result.main.temp_min + " ºC");
                    $('.weatherDescricao',liCidade).text(result.weather[0].description);
                    $('.weatherIcon #icon',liCidade).attr('src',iconUrl);

                    $('#fav',liCidade).attr('src','img/adicionar fav.png');
                    $("#fav",liCidade).attr("onclick","addFavoritos(this.value)");
                    $('#fav',liCidade).val(result.name);
                    $('#fav',liCidade).attr('src','img/removerfav.png');
                    $("#fav",liCidade).attr("onclick","removerFavoritos(this.value)");

                    $('.cidade-list').append(liCidade);
                    
                    verificacao=false; 
                    }
                    
                }
            }  
        });
        
        if (verificacao == true) {
            alert("UPS!! Não existem cidades adicionados aos favoritos! Adicione uma cidade, e tente novamente!");
            window.location = "home.html";
        }
    })
 })


 function removerFavoritos(nome_cidade) {
    var value_exist=localStorage.getItem('tempo');
    value_exist=value_exist.split(',');
    var fav="";
    
    if(value_exist.length>1)
    {
        for (let index = 0; index < value_exist.length; index++) {
           
            if(nome_cidade !=value_exist[index])
            {   
               if(index==0)
               {
                fav=value_exist[index];
               }
               else
               {
                fav=fav+','+value_exist[index];
               }
                
            }
            localStorage.setItem('tempo' ,fav);//guarda na storage e vai buscar o val ao form
        }
        
    }
    else
    {
        localStorage.removeItem('tempo');
    }
    alert("Cidade removida com sucesso");
    window.location.reload();


}



 
