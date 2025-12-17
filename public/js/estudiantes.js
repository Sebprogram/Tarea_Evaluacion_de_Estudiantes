var btn_agregar = document.getElementById('btn_agregar');
var ul_lista_notas = document.getElementById('lista_notas');
var ul_notas = [];

btn_agregar.addEventListener('click',function(){
    var nota_estudiante = document.getElementById('txt_nota');

    if(nota_estudiante != ''){
        var nota = parseFloat(nota_estudiante.value)

        if(nota>=0 && nota<=10){
            ul_notas.unshift(nota);
            //console.log(ul_notas);
            mostrarListado();
            console.log(mostrarListado());
            calcularEstadisticas();
            nota_estudiante.value = '';
        }else{
            console.log('Digite un numero entre 0 y 10');
        }
    }else{
        console.log('Digite un numero');
    }
});

function mostrarListado(){
    ul_lista_notas.innerHTML = '';

    ul_notas.map(function(nota, index){
        let li_item = document.createElement('li');
        li_item.classList.add('list-group-item');

        var clasificacion = '';

        if(nota>=7 && nota<=10){
            li_item.classList.add('list-group-item-success');
            clasificacion = 'APROBADO';
        }else if(nota>=5 && nota < 7){
            li_item.classList.add('list-group-item-warning');
            clasificacion = 'SUPLETORIO';
        }else{
            li_item.classList.add('list-group-item-danger');
            clasificacion = 'REPROBADO';
        }

        li_item.textContent = `Estudiante ${ul_notas.length - index}: ${nota} - ${clasificacion}`;
        ul_lista_notas.appendChild(li_item);
        
    });
}

function calcularEstadisticas() {
    var contador_aprobados = 0;
    var contador_supletorio = 0;
    var contador_reprobados = 0;
    var suma_notas = 0;
    
    for (var i = 0; i < ul_notas.length; i++) {
        var nota = ul_notas[i];
        suma_notas = suma_notas + nota;
        
        if (nota >= 7 && nota <= 10) {
            contador_aprobados = contador_aprobados + 1;
        } else if (nota >= 5 && nota < 7) {
            contador_supletorio = contador_supletorio + 1;
        } else if (nota >= 0 && nota < 5) {
            contador_reprobados = contador_reprobados + 1;
        }
    }
    
    var promedio = 0;
    var estado = '-';
    
    if (ul_notas.length > 0) {
        promedio = suma_notas / ul_notas.length;
        
        if (promedio >= 7) {
            estado = 'APROBADO';
        } else {
            estado = 'EN RIESGO';
        }
    }
    
    document.getElementById('txt_total_aprobados').textContent = contador_aprobados;
    document.getElementById('txt_total_supletorio').textContent = contador_supletorio;
    document.getElementById('txt_total_reprobados').textContent = contador_reprobados;
    document.getElementById('txt_promedio_curso').textContent = promedio.toFixed(2);
    document.getElementById('txt_estado_curso').textContent = estado;
}