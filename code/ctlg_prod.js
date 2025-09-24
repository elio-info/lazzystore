let url_prod='code/ctlg_prod.php';
let tabla_prod='producto';

const  findProducts_ByCI = async (paramsCI='',groupby='*',rcv='') => {    
    var datoSrch= new FormData();
    datoSrch.append('tipo_operacion','buscar');
    datoSrch.append('p_id',paramsCI);
    datoSrch.append('rcv',rcv);
    datoSrch.append('groupby',groupby);
    return await submitForm(datoSrch,url_prod,'vw_prod',true) ;    
}

const fillTable_Prod = async (paramsTableName) =>{
    
    let dataE= (await findProducts_ByCI()).data;
    console.log(dataE);
    
    // var dataSetM = adaptDataSet(data,3,'En3');
    
    // dataFromSearch =  Array.from(dataSetM) ;
    
    if ($('#'+paramsTableName+'_wrapper')[0]) {
         // alert('cojelo');
         $('#'+paramsTableName).DataTable().destroy();
     }

     $('#'+paramsTableName).DataTable({
         columns:[
                         
             { title: 'Nombre Producto', data:'nombre_prod'},
             { title: 'Cant. Actual',data:'cantActual_prod'},
             { title: 'Costo', data:'costo_prod'},            
             { title: 'Acciones', 
                data: 'id_prod', 
                render: function (data) {
                    let vv='<button class= "btn btn-dark" onclick="preEditarEn3('+data+')">Editar</button> &nbsp;'+
                    '<button class="btn btn-danger " data-toggle="modal" data-target="#mensajesModalConfirm" onclick="preEliminarEn3('+data+')">Eliminar</button>'
                  return   vv;                        
                } 
            }
         ], 
         data: dataE //dataSetM
     })
    }

let productForm_onPage = document.getElementById('productFrm');//all forms

productForm_onPage.addEventListener( 'submit' , async (e) =>{
   e.preventDefault();
    // areaForm_onPage['tipo_operacion']='guardar';

    let esta2= await submitForm( new FormData (productForm_onPage) ,url_prod,' producto ');
    //ppp.status
    if (esta2['status']) {
        productForm_onPage.reset();//clean form
        // CloseInfo();
        mostrarMensaje('mensajesDiv','success','Se hizo'); 
        // window.location='ctlg_list_prod.html' ;
    } else {
       mostrarMensaje('mensajesDiv','error','No se pudo');      
    }
})
//#region funciones jquery botones

$('#productFrm_costo').on('change',function () {
    let precio=parseFloat(this.value)* 1.3 ;
    $('#productFrm_precio').val( precio.toFixed(2) );
})

