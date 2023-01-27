'use strict';
var apiKey = "03236fc2ccd6906479af5df42e472dea"; //Variavel KEY API
var cityIds = "2267095,2735943,3372783,2268339,2742032,2988507"// Variavel ID's Cidades
var cloneCidade=$('.cidade').clone();//clona o codgio das linhas
var lang ='&lang=pt'; //colocar linguagem em Portugues

$( window ).on( "load", function() {  $.ajax({
        type: "GET",
        datatype: 'json',
        url: "https://api.openweathermap.org/data/2.5/group?id=" + cityIds + lang +"&units=metric&appid=" + apiKey,
    })
    .done(function(res){
        $("tr:has(td)").remove();//remove a primeira linha
        console.log(res);
        
        $.each(res.list, function (index, result){
           
              
            var liCidade=cloneCidade.clone();

           
            let iconUrl = "http://openweathermap.org/img/wn/" + result.weather[0].icon + "@2x.png";

            $('.weatherCidade',liCidade).text(result.name);
            $('.link',liCidade).attr('href', "detalhes.html?name="+result.name);
            $('.weatherTemperatura',liCidade).text(result.main.temp + " ºC");
            $('.weatherTempMax',liCidade).text(result.main.temp_max + " ºC");
            $('.weatherTempMin',liCidade).text(result.main.temp_min + " ºC");
            $('.weatherDescricao',liCidade).text(result.weather[0].description);
            $('.weatherIcon #icon',liCidade).attr('src',iconUrl);

            //Fravoritos
            $('#fav',liCidade).attr('src','img/adicionar fav.png');
            $("#fav",liCidade).attr("onclick","addFavoritos(this.value)");
            $('#fav',liCidade).val(result.name);
            var value_exist=localStorage.getItem('tempo');
            if(value_exist != null)
            {
                value_exist=value_exist.split(',');
                for (let index = 0; index < value_exist.length; index++) {
                    if(value_exist[index]==result.name)
                    {
                        $('#fav',liCidade).attr('src','img/removerfav.png');
                        $("#fav",liCidade).attr("onclick","removerFavoritos(this.value)");
                    }
                    
                }
            }

            $('.cidade-list').append(liCidade);
            
       });
       
     
    })
    
 })

function addFavoritos(nome_cidade){
    var value_exist=localStorage.getItem('tempo');
    
    if(value_exist != null)
    {
            
        var array_cidades=value_exist+','+nome_cidade;
        localStorage.setItem('tempo' ,array_cidades);
       
    }
    else
    {
        localStorage.setItem('tempo' ,nome_cidade);
    }
    alert("Cidade adicionada com sucesso");
    window.location.reload();
   
}

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
            localStorage.setItem('tempo' ,fav);
        }
        
    }
    else
    {
        localStorage.removeItem('tempo');
    }
    alert("Cidade removida com sucesso");
    window.location.reload();
}

$("#procurar").click(function(){
    var cidade = $("#search").val().toUpperCase();

    var encontrou_cidade=false; 
    $.ajax({
        type: "GET",
        datatype: 'json',
        url: "https://api.openweathermap.org/data/2.5/weather?q=" + cidade + "&units=metric&appid=" + apiKey,
    })
    .done(function(res){
    console.log(res);


    if(cidade ==""){

        alert("O campo não pode ser vazio");
        window.location.reload();
    }
    else{

        for(let index=1;index<8;index++){

           var  cidadeList=$('tr:eq('+index+') .weatherCidade').text().toUpperCase();    
        
            if(cidade == cidadeList){

                encontrou_cidade=true;    
                $('tr:eq('+index+')').css("display","");

                continue;
            }
            $('tr:eq('+index+')').css("display","none");
        }
    

             if(res.name ==""){
        alert("Não existem nenhuma cidade com esse nome");
                  window.location = "home.html";
             }
    }

});

});

