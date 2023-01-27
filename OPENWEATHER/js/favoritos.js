'use strict';
var verificacao = true; //Variavel de Verificação
var apiKey = "03236fc2ccd6906479af5df42e472dea"; //Variavel KEY API
var cityIds = "2267095,2735943,3372783,2268339,2742032,2988507"// Variavel ID's Cidades
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
            let iconUrl = "http://openweathermap.org/img/wn/" + result.weather[0].icon + "@2x.png"; //link da imagem
            var liCidade=cloneCidade.clone();
            var value_exist=localStorage.getItem('tempo');
            if(value_exist != null)
            {
                value_exist=value_exist.split(',');
                for (let pos = 0; pos < value_exist.length; pos++) {

                    if(value_exist[pos]==result.name)
                    {
                    $('.pos',liCidade).text(index+1);
                    $('.weatherCidade',liCidade).text(result.name); //Cidade
                    $('.link',liCidade).attr('href', "detalhes.html?name="+result.name); //Link para os detalhes da cidade
                    $('.weatherTemperatura',liCidade).text(result.main.temp + " ºC");//Temperatura atual
                    $('.weatherTempMax',liCidade).text(result.main.temp_max + " ºC");//Temperatura MAX
                    $('.weatherTempMin',liCidade).text(result.main.temp_min + " ºC");//Temperatura MIN
                    $('.weatherDescricao',liCidade).text(result.weather[0].description);//Descricao
                    $('.weatherIcon #icon',liCidade).attr('src',iconUrl);//ICON

                    //Permite remover dos favoritos
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


 function removerFavoritos(nome_cidade) { //Permite remover a partir dos favoritos, algo que esteja adicionado
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
            localStorage.setItem('tempo' ,fav);//Guarda na localStorage e vai buscar o valor
        }
        
    }
    else
    {
        localStorage.removeItem('tempo');
    }
    alert("Cidade removida com sucesso");
    window.location.reload();


}



 
