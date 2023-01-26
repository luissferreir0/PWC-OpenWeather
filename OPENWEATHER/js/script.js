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

            $('.weatherCidade',liCidade).text(result.name);
            $('.weatherTemperatura',liCidade).text(result.main.temp + " ºC");
            $('.weatherTempMax',liCidade).text(result.main.temp_max + " ºC");
            $('.weatherTempMin',liCidade).text(result.main.temp_min + " ºC");
            $('.weatherDescricao',liCidade).text(result.weather[0].description);
            //$('#weatherIcon',liCidade).attr('src',"https://openweathermap.org/img/wn/" + icon + ".png");

            $('#fav',liCidade).attr('src','img/adicionar fav.png');
            $("#fav",liCidade).attr("onclick","addFavoritos(this.value)");
            $('#fav',liCidade).val(result.name);
            var value_exist=localStorage.getItem('tempo');
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
