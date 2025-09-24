
/**
 * show form to insert or update [ general ]
 * @param {*} params 
 */
function AddInfo(params='') {
    $('#tipo_operacion')[0].value= params!==''?params: 'guardar';
    $('#FormDiv').show();

}
/**
 * close form of insert or update [ general ]
 * @param {*} params 
 */
function CloseInfo(params) {
    window.location.reload()
}


function datosFechaEstadoPago(paramDateBegin='',paramDateEnd='') {  
               
        let frstDay=  paramDateBegin!==''? new Date(paramDateBegin): new Date();// ().toLocaleDateString('en-US','America/Havana')
        let endDay=  paramDateEnd!==''? new Date(paramsDateBegin): new Date();// ().toLocaleDateString('en-US','America/Havana')
        let diferenciaTiempoDias= Math.floor ((frstDay - endDay)  / (1000 * 60 * 60 * 24)); 
        return diferenciaTiempoDias
}


function setDayByCantMonth(placeId_DateEnd,paramsDateBegin='',paramsMnth=1) {
    let start = ( paramsDateBegin!==''? new Date(paramsDateBegin): new Date()).toLocaleDateString('en-US','America/Havana');
    let end = new Date(start);
    // $('#'+placeId_DateEnd)[0].setAttribute('value',start.toString());
    // $('#diamatricula').set('defaultDate','today');
    // .value=start;
    end.setMonth(end.getMonth() + paramsMnth);
    end.setDate(end.getDate() + 1);
    document.getElementById(placeId_DateEnd).value=end.toISOString().substring(0,10);
    return end;    
}
function setDayOn(place,paramsDay='') {
    var todayDate=( paramsDay!==''? new Date(paramsDay): new Date() ).toLocaleDateString('es-ES')
    console.log(todayDate)
    document.getElementById(place).innerHTML=todayDate
}

/**
 * Para poner el menu en la pagina se forma con opcion de quien esta y donde, se habilitara la opcion en active el link
 * @param {*} paramLevels se determina ['admn','gerent''rcpcn',]
 * @param {*} paramOption se pondra la opcion que debe de activar, un numero
 */
function setMenu(paramLevels,paramOption,cargo=2,nombreUsuario='') {

    setTopTitulo(paramLevels,paramOption,nombreUsuario)
    setDayOn('fechaTitulo')
    function setActive(lvl,opt) {
       return paramLevels==lvl & paramOption==opt? 'text-bg-danger active':''; 
    }
    var menuLeft = ' <div class="container-fluid d-flex flex-column p-0"><a class="navbar-brand d-flex justify-content-center align-items-center sidebar-brand m-0" href="#">'+
                // '<div class="sidebar-brand-icon rotate-n-15"><i class="fas fa-laugh-wink"></i></div>'+
                '<img src="../assets/img/gymLVlogo.jpg" alt=""/>'+
                '<div class="sidebar-brand-text mx-3"><span>'+cargoUsuario[cargo]+'</span></div></a>'+
                
                '<hr class="sidebar-divider my-0">'+
                '<ul class="navbar-nav text-light" id="accordionSidebarRecep">'+
                    '<samp> Recepcionista </samp>'
                    // close first part of NAV
    // first nav [ RECEPCIONISTA] son 4 opc [ 1 - 4 ]
    var location_to = paramLevels=='recep'?'':'../recep/'
            
                  menuLeft +=
                    '<li class="nav-item"><a class="nav-link '+ setActive('recep' , 1)+'" href="'+location_to+'clientes_Estado2.php"><i class="fas fa-tachometer-alt"></i><span>Atrasados</span></a></li>'+
                    '<li class="nav-item"><a class="nav-link '+setActive('recep' ,2)+'" href="'+location_to+'persn_matriculamiembro.php"><i class="fas fa-user"></i><span>Matricular</span></a></li>'+
                    '<li class="nav-item"><a class="nav-link '+setActive('recep' ,3)+'" href="'+location_to+'clientes_Estado.php"><i class="fas fa-table"></i><span>Cobrar</span></a></li>'+
                    '<li class="nav-item"><a class="nav-link '+setActive('recep' ,4)+'" href="'+location_to+'persn_cobrarservicio.php"><i class="far fa-money-bill-alt"></i><span>Servicio del día</span></a></li>'+
                    '<li class="nav-item"><a class="nav-link '+setActive('recep' ,5)+'" href="'+location_to+'recep_cuadrediario.php"><i class="far fa-user-circle"></i><span>Cuadre diario</span></a></li>'+
                    '</ul>'+
                    '<hr class="sidebar-divider my-0">'
                    // close first nav [ RECEPCIONISTA]
    // second nav [ GERENTE] son 5 opc [ 1 - 5 ]
    if ( cargo < 2 ){
        menuLeft +='<ul class="navbar-nav text-light" id="accordionSidebarGerente">'+
					'<samp> Gerencia </samp>'
        location_to= paramLevels=='gerent'?'':'../gerent/'
        menuLeft +=  
                    '<li class="nav-item"><a class="nav-link  '+setActive('gerent' ,1)+'" href="'+location_to+'gerente_EntrenadoresLista.php"><i class="fas fa-tachometer-alt"></i><span>Entrenadores</span></a></li>'+
                    '<li class="nav-item"><a class="nav-link '+setActive('gerent' ,2)+'" href="'+location_to+'gerente_PagoServDiario.php"><i class="fas fa-user"></i><span>Pagado Servicio diario</span></a></li>'+
                    '<li class="nav-item"><a class="nav-link '+setActive('gerent' ,3)+'" href="'+location_to+'gerente_PagoMembrDiario.php"><i class="fas fa-table"></i><span>Cobrado Miembros HOY</span></a></li>'+
                    '<li class="nav-item"><a class="nav-link '+setActive('gerent' ,4)+'" href="'+location_to+'gerente_clientes_Estados.php"><i class="far fa-money-bill-alt"></i><span>Listado Miembros</span></a></li>'+
                   '<li  class="nav-item"><a class="nav-link '+setActive('gerent' ,5)+'" href="'+location_to+'gerente_CuadrePagoDiario.php"><i class="far fa-user-circle"></i><span>Cuadre diario</span></a></li>'+
                    '</ul>'

        // second nav [ Catalgos] son 5 opc [ 6 - ... ]
        menuLeft +='<ul class="navbar-nav text-light" id="accordionSidebarGerenteCatalogos">'+
					'<samp> Catalogo Gerencia </samp>'
        ctgl=5;
        location_to= paramLevels=='gerent'?'':'../gerent/'
                 menuLeft +=
                    '<li class="nav-item"><a class="nav-link '+setActive('gerent' ,ctgl+1)+'" href="'+location_to+'gerente_catalogo_horario.php"><i class="fas fa-tachometer-alt"></i><span>Clasif. Horarios</span></a></li>'+
                    '<li class="nav-item"><a class="nav-link '+setActive('gerent' ,ctgl+2)+'" href="'+location_to+'gerente_catalogo_tipopago.php"><i class="fas fa-user"></i><span>Clasif. Tipos de Pago</span></a></li>'+
                    '<li class="nav-item"><a class="nav-link '+setActive('gerent' ,ctgl+3)+'" href="'+location_to+'gerente_catalogo_area.php"><i class="fas fa-table"></i><span>Clasif. de &Aacute;reas</span></a></li>'+
                    '<li class="nav-item"><a class="nav-link '+setActive('gerent' ,ctgl+4)+'" href="'+location_to+'gerente_catalogo_member.php"><i class="far fa-money-bill-alt"></i><span>Catalogo de Membres&iacute;a</span></a></li>'+
                    '<li class="nav-item"><a class="nav-link '+setActive('gerent' ,ctgl+5)+'" href="'+location_to+'gerente_catalogo_areaservicio.php"><i class="far fa-money-bill-alt"></i><span>Catalogo de Servicio</span></a></li>'+
                    '<li class="nav-item"><a class="nav-link '+setActive('gerent' ,ctgl+6)+'" href="'+location_to+'gerente_catalogo_clientesesta2.php"><i class="far fa-heart"></i><span>Catalogo Estado de Clientes de Membres&iacute;a</span></a></li>'+
                   '<li  class="nav-item"><a class="nav-link '+setActive('gerent' ,ctgl+7)+'" href="'+location_to+'gerente_entrenadores.php"><i class="far fa-grin-beam-sweat"></i><span>Control de Entrenadores</span></a></li>'+
                   '<li class="nav-item"><a class="nav-link '+setActive('gerent' ,ctgl+8)+'" href="'+location_to+'gerente_catalogo_area_en3_horario.php"><i class="fas fa-battery-full"></i><span> Paqt - Ent.- Horarios</span></a></li>'+
                '</ul>'
    } //gerencia solo
    document.getElementById('leftMenu').innerHTML=menuLeft
    
}

function setTopTitulo(paramCharge,paramTitle,nombreUsuario='') {
    var menutitulo=`    
                <nav class="navbar navbar-expand bg-white shadow mb-4 topbar">
                        <div class="container-fluid">
                            <div id="" class="d-none d-sm-inline">  
                            <h1>          
                              `
                // Titulo a poner
                            +
                            titulosSite[paramCharge][paramTitle-1].titulo                             
                            +
                // Fin Titulo a poner
                            `</h1>
                            </div>
        
                        <ul class="navbar-nav flex-nowrap ms-auto">           
                        <li class="nav-item mx-2">
                                `+
                // Fecha a poner
                            `<div class="nav-item dropdown no-arrow bg-danger">               
                                <a class=" nav-link" aria-expanded="false">                       
                                    <h3  id="fechaTitulo" ></h3>
                                </a>                    
                                </div>
                                `+
                // Fin Fecha a poner
                            `<div class="shadow dropdown-list dropdown-menu dropdown-menu-end" aria-labelledby="alertsDropdown"></div>
                            </li>
                            <div class=" d-sm-block topbar-divider"></div>
                            <li class="nav-item dropdown no-arrow">
                                <div class="nav-item dropdown no-arrow bg-dark">
                                <a class="dropdown-toggle nav-link" aria-expanded="false" data-bs-toggle="dropdown" href="#">
                                    <h5 class="d-lg-inline me-2  ">
                                    ${nombreUsuario} 
                                    </h5>
                                    <i class="far fa-user-circle"></i>
                                    </a>
                                    <div class="dropdown-menu shadow bg-dark dropdown-menu-end animated--grow-in">
                                    <a class="dropdown-item" href="#">
                                    <i class="fas fa-user fa-sm fa-fw me-2 text-gray-400"></i> Perfil</a>                                    
                                    <div class="dropdown-divider"></div><a class="dropdown-item" href="../"><i class="fas fa-sign-out-alt fa-sm fa-fw me-2 text-gray-400"></i> Salir</a>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </nav>`
					

    document.getElementById('menuTop').innerHTML=menutitulo
}

// devolver gral todos de algun sitio
/**
 * The function `findAllonTable` sends a POST request to a specified URL, retrieves data, and returns
 * the data along with any errors encountered.
 * @param url_toLoad - The `url_toLoad` parameter is the URL from which data will be loaded using a
 * POST request to retrieve information from a table.
 * @returns The `findAllonTable` function is returning an object with two properties: `datos` and
 * `error`. The `datos` property contains the data retrieved from the API call, while the `error`
 * property contains any error message encountered during the process.
 */
 async function findAllonTable(url_toLoad) {   
    
    const datoso = new FormData();
     datoso.append("tipo_operacion",'listar') ;
     // console.log('entre aqui', datoso);         
    return await submitForm(datoso,url_ar,'cat_area',true)
}

async function findAllonTableByQuery(url_toLoad,frmTmplt) {   
    
    let datosT=[],
        dataerr='',
        dataq=[];
    //const datoso = new FormData(frmTmplt);   
    
    // console.log('entre aqui', datoso);         
   await fetch(
        url_toLoad,{
            method:'post',
            body:frmTmplt//datoso
        })
        .then (data => data.json())
        .then (data => {
            console.log('success', data);                
            if (data['info']) {                    
                console.log('Bien',"Datos correctos.",url_toLoad );
                dataq=data;
                datosT = data['info']; 
            } else {
               // mostrarMensaje('error',"Datos no correctos." )
               dataerr="Datos no correctos."
                console.log(data.error)
            }                                             
        })
        .catch(function(error){
            console.log('error',error);
            dataerr=error
            //mostrarMensaje('error',"Datos no correctos." )
        });
       // window.location.href = '../../../';
       return { data:datosT,error:dataerr,info:dataq}
}

//ok
/**
 * The function "mostrarMensaje" displays a message in a specified location on a webpage with different
 * styles based on the type of message (error or success).
 * @param lugar - The `lugar` parameter in the `mostrarMensaje` function represents the location where
 * the message will be displayed on the webpage. It is typically the ID of the HTML element where you
 * want to show the message.
 * @param {[error,exito]} tipo_mensaje - The `tipo_mensaje` parameter is a string that indicates the type of message
 * being displayed. It can have two values: "error" or "success".
 * @param mensaje - The `mensaje` parameter in the `mostrarMensaje` function represents the message
 * that you want to display in the specified `lugar` (location) on the webpage. This message can be an
 * informative message, an error message, or any other type of message that you want to communicate to
 * the
 */
async function mostrarMensaje(lugar,tipo_mensaje, mensaje) {
    let mensajesDiv= $('#'+lugar);
    mensajesDiv[0].innerHTML = `
    <div class="row">
        <div class="col-md-5 offset-md-3">
            <div class="alert alert-${tipo_mensaje == 'error' ? "danger" : "success"} role="alert">
                <h4 class="alert-heading">¡${tipo_mensaje == 'error' ? "Error" : "Bien"}!</h4>
                <P> *${mensaje}</P>
            </div>
        </div>
    </div>
    `;
    // Esperamos 1 segundo (o el tiempo que quieras)    
    mensajesDiv.fadeIn("fast");
    mensajesDiv.fadeOut(4000);
    /*
    setTimeout(()=> {
         mensajesDiv.innerHTML = "";
         mensajesDiv.style.display='none';
     },2000);
     */
}
/**Just submit a form in orderto recieve a data for a submit
 * 
 * @param {FormData} [datosFrm] form to submit
 * @param {URL} [url_sub] link to submit
 * @param {string} [letrero=''] Tabla name
 * @param {boolean} [returnAnswer=false] True is data'll return with info
 * @returns [OK,INFO,ERROR]
 */
async function submitForm(datosFrm,url_sub,letrero='',returnAnswer=false) {
    let datosT=[];
    console.log('submitForm ->'+letrero);
    /* */
    datosFrm.forEach((vl,ky)=> { 
        console.log(' key ky: ' +ky+',value vl:'+ vl ); 
    }  ) ;
   
    let ok=true;
    let err=null;
    await fetch(
        url_sub,{
        method:'post',
        body:datosFrm
        })
        .then (data => data.json())
        .then (data => {
            console.log('success entrar '+letrero, data);
            if (returnAnswer) {
                if (data['info']) {                    
                console.log('Bien',"Datos correctos.",letrero );
                datosT=data['info']//!='vacio'?data['result']:data['info']
                } else {
                //    mostrarMensaje('mensajesDiv','error',"Datos no correctos." );
                    console.log(letrero, data.error);
                    ok=false;
                    err={'tipo':'data','msg': data.error}
                }  
            } else {
                console.log('Add',"Datos correctos.",letrero );
                datosT=data
            }                
                                                       
        })
        .catch(function(error){
            console.log('error',error);
            // mostrarMensaje('mensajesDiv','error',"Datos no correctos." );
            ok=false;
            err={ 'tipo':'cnx','msg':error};
        });
    return {'status':ok,'data':datosT,'err':err}
}
async function submit_Form(datosFrm,url_sub,letrero='') {
    let formSubmit=document.createElement('form');
    console.log('submit_Form ->',letrero);
    datosFrm.forEach((vl,ky)=> { 
        let inputSubmit=document.createElement('input');
        inputSubmit.id=ky;
        inputSubmit.name=ky;
        inputSubmit.value=vl;
        console.log(vl,ky);
        
        formSubmit.appendChild(inputSubmit);
    }  ) ;
    formSubmit.id='ll';formSubmit.name='ll';
    formSubmit.method='post';
    formSubmit.action=url_sub;
    document.body.appendChild(formSubmit);
    formSubmit.submit();
}


function searchOnTable(tableToSearch,inputSearcher) {
    var filter, table, tr, td, i, txtValue;
    var auxArray=[];
    // input = document.getElementById(inputSearcher);
    filter = inputSearcher.value.toUpperCase();
    table = document.getElementById(tableToSearch);
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[0];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        //   fill data  
        auxArray.push(tr[i]['id']);
        } else {
          tr[i].style.display = "none";
        }
      }       
    }
    //to public search
    dataFromSearch = auxArray ;
  }

function printInfo() {    
    //    create bodyPrint    
    window.print();  
}

/**
 * Adapt the data from database to a jqueryTable
 * @param {Array} data array of values to use
 * @param {int} cantElts number of elements to take from the array
 * @param {string} prefixOfTable prefix of the table that'll be used 'Ar' from Area
 * @returns 
 */
function adaptDataSet(data,cantElts,prefixOfTable) {
    var salida=[];
    data.forEach(element => {
        var salidos=[];
        for (let index = 1; index <= cantElts; index++) {
            salidos.push (element[index]);            
        }
        var botones=`
         <button class="btn btn-dark" onclick="preEditar${prefixOfTable}(${element[0]})">Editar</button>
         <button class="btn btn-danger " data-toggle="modal" data-target="#mensajesModalConfirm" onclick="preEliminar${prefixOfTable}(${element[0]})">Eliminar</button>`              
         salidos.push (botones);      
        salida.push(salidos);
    });
    return salida;
}

/** Ok
 * para pintar tablas
 * @param {String}[title] Nombre de la tabla
 * @param {Object} tab_datos objeto <div>
 * @param {Object} mydata arreglos d datos ausar que vien de la consulta
 * @param {Array} dataSelcIndexs arreglo con el nombre de las llaves a usar dentro de mydata
 */
const fillResumeRow = (title,tab_datos,mydata,dataSelcIndexs) =>{
    
    let doc_tab_datos= document.getElementById(tab_datos)
    // si lleno, lo vacio
    
    let innerHTML =
     `<div class="card shadow">
         <div class="card-header py-3">
            <p class="text-primary m-0 fw-bold">${title}</p>
        </div>
        <div class="row">                       
    `;
    // set the first
    if (mydata.length>0) {
       //# code... -lg-3
            for(let item of mydata){
                let poner=`
                <div class="col mb-4 text-white shadow bg-dark">                    
                            <p class="m-0">${item[dataSelcIndexs[0]]}</p>
                            <p class="text-white-50 small m-0">${item[dataSelcIndexs[1]]}</p>                                         
                </div>
                `;
           innerHTML+= poner ;
       }    
    }
    innerHTML+=`
        </div>
    </div>
    `;
    doc_tab_datos.innerHTML=innerHTML; 
}

/** Ok
 * para pintar tablas Cabeza Roja, Cuerpo Negro
 * @param {Object} tab_datos objeto <div>
 * @param {Object} mydata arreglos d datos ausar que vien de la consulta
 * @param {Array} dataSelcIndexs arreglo con el nombre de las llaves a usar dentro de mydata
 */
const fillResumeRowRedHead = (tab_datos,mydata,dataSelcIndexs) =>{
    
    let doc_tab_th_datos= document.getElementById(tab_datos+'_th'),
        doc_tab_td_datos= document.getElementById(tab_datos+'_td');
    // si lleno, lo vacio
    doc_tab_th_datos.innerHTML = '';
    doc_tab_td_datos.innerHTML = '';
    // set the first
    if (mydata.length>0) {
       //# code... 
            for(let item of mydata){
                let poner_th=`                
                    <th class="text-white m-0 bg-danger">
                        <p class="m-0">${item[dataSelcIndexs[0]]}</p>                            
                    </th>
                    `
                let poner_td=`                
                    <td class="text-white m-0 bg-dark">    
                        <p >${item[dataSelcIndexs[1]]}</p>
                    </td>
                `;
           doc_tab_th_datos.innerHTML+= poner_th ;
           doc_tab_td_datos.innerHTML+= poner_td ;
       }    
   }
}

/**
 * 
 * @param {*} doc_tab_datos 
 * @param {*} optvalue 
 * @param {*} opttext 
 * @param {*} optselected 
 * @returns 
 */
function fillSelectItem(doc_tab_datos,optvalue,opttext,optselected=false) {
    // set the first
    let opt_datos = document.createElement('option');     
        opt_datos.value=optvalue;
        opt_datos.text=opttext;                        
        opt_datos.selected = optselected;
        
    return   doc_tab_datos.appendChild(opt_datos)     
}

/**
 * Return the FETCH of a table from  database
 * @param {URL} urlLink 
 * @param {string} dataName 
 * @param {FormData} formValues 
 * @returns [ok,info,error]
 */
async function fetch_POST_4GeneralPorpuse(urlLink,dataName,formValues) {
    var datosT=[]   ;
       
    await fetch(
        urlLink,{
        method:'post',
        body:formValues
        })
        .then (data => data.json())
        .then (data => {
            console.log('success entrar '+dataName, data);                
            if (data['info']) {                    
                console.log('Bien',"Datos correctos." )
                datosT=data['info']//!='vacio'?data['result']:data['info']   
                // console.log(data);
                             
            } else {
               // mostrarMensaje('error',"Datos no correctos." )
                console.log(`no success data ${ dataName}` ,data)
            }                                             
        })
        .catch(function(error){
            console.log('error on '+dataName ,error);
            //mostrarMensaje('error',"Datos no correctos." )
        });
       // window.location.href = '../../../';
       return datosT ;
}
/**
 * 
 * @param {String} [ayer,hoy,pagoSemanal,any] paramsDay 
 * @param {Date} referencDay 
 * @returns 
 */
function timeConvertLaboralDay_0To5(paramsDay,referencDay=new Date()) {    
    //cojo el dia de hoy completo
    
    let result=new Date(referencDay)//.toLocaleDateString("en-US",{year:"numeric", month: "2-digit", day:"2-digit"});
    //que dia de la semana es 0 a 6,el resto me dice el dia
    let hoy=result.getDay()% 6;//domingo es 0
    
    switch (paramsDay) {
        case 'ayer':
            if ( hoy>=2 & hoy<=5 ) {//[martes-viernes]
                result.setDate(result.getDate() - 1);//retroceder 1 dia ()                
                return {'dia':new Date(result).toISOString().split('T')[0],'semana':'actual-ayer'};
            } else {//[sabado-domingo]
                result.setDate(result.getDate() - (hoy+2));//retroceder hasta el domingo y quitar 2 dias ()                            
                return {'dia':new Date(result) .toISOString().split('T')[0],'semana':'pasada(viernes)'};
            }
        break;
        case 'hoy':return {'dia': new Date().toISOString(),'semana':'actual-hoy'};
        break;
        case 'pagoSemanal':
        	//pago de entrenadores va viernes de la semana anterior - jueves semana actual
        	let viernesInicioDePago=new Date(referencDay);
        	let juevesFinDePago=new Date(referencDay);
        	let inicio=0,fin=0;        	//-2 dias si hoy == 0,viernes
        	if(hoy>=0 & hoy <=4){
        	 inicio= 2 + hoy ;
        	 fin= 4 - hoy;
        	 }
        	 else{
        	 inicio= hoy - 3;
        	 fin= 4+hoy;
        	 }
        	viernesInicioDePago.setDate(viernesInicioDePago.getDate()-inicio);
        	juevesFinDePago.setDate(juevesFinDePago.getDate()+fin);        	
        	return {'diaInicio': viernesInicioDePago.toISOString(),'diaFin':juevesFinDePago.toISOString()};
        break;
        default:
            return {'dia': paramsDay,'semana':''};
        break;    
    }
}

