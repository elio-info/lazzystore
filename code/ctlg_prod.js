let url_prod='code/ctlg_prod.php';
let tabla_prod='producto';


let productForm_onPage = document.getElementById('productFrm');//all forms

productForm_onPage.addEventListener( 'submit' , async (e) =>{
   e.preventDefault();
    // areaForm_onPage['tipo_operacion']='guardar';

    let esta2= await submitForm( new FormData (productForm_onPage) ,url_prod,' producto ');
    //ppp.status
    if (esta2['status']) {
        productForm_onPage.reset();//clean form
        // CloseInfo();
        // mostrarMensaje('mensajesDiv','success','Se hizo'); 
         
    } else {
    //    mostrarMensaje('mensajesDiv','error','No se pudo'); 
    }
})
