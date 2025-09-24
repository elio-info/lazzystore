const cargos=['vend','super'];

const titulosSite=[   
    {
        'cargo':'vend',
        'ruta':'',
        'lnk':[
        { 'titulo':'Vender',hd:'Vender',lnk:'shopping_cart.php'  },//vender
        { 'titulo':'Consolidar_dia',hd:'Consolidar dia',lnk:'sales_today.php'  },//cierre del dia    
        ],
    },
    {
        'cargo':'super',
        'ruta':'',
        'lnk':[  
            { 'titulo':'Controlar_Productos',hd:'Controlar Productos',lnk:[
                    { 'titulo':'Adicionar_Productos',hd:'Adicionar Productos',lnk:'ctl_list_prod.php'  },//todos
                    { 'titulo':'Existencias_Productos',hd:'Adicionar Existencias',lnk:'ctl_list_prod.php'  },//todos
                ]
              },
            { 'titulo':'Reportes_Productos',hd:'Reportes Productos',lnk:[
                    { 'titulo':'Productos_Costos',hd:' Productos costos',lnk:'ctlg_invprodcsts.php'  },//todos
                    { 'titulo':'Producto_Existencias',hd:'Producto - Existencias',lnk:'ctlg_invprodexst.php'  },//todos
                ]
              },
        ]
}]

function menu_li_navLnk(data) {
    let li_lnk=`
        <li class="nav-item">
            <a class="nav-link" href="${data.lnk}">${data.hd}</a>
        </li>
    `;
    return li_lnk;
}
function menu_a_drpDwn_itmLnk(data) {
    let a_lnk=`
        <a class="dropdown-item" href="${data.lnk}">${data.hd}</a>       
    `;
    return a_lnk;
}
function menu_li_drpDwn_itmLnk(data) {
    let li_dd_lnk=`
        <li class="nav-item dropdown">
            <a class="dropdown-toggle nav-link" aria-expanded="false" data-bs-toggle="dropdown" id="${data.titulo}" href="#">${data.hd}</a> 
            <div class="dropdown-menu">      
    `;
    data.lnk.map((val)=> {
        li_dd_lnk +=menu_a_drpDwn_itmLnk(val);
        ;})
    li_dd_lnk +=`</div>
                    </li> `
    return li_dd_lnk;
}

function setMenu_Lzz(place_menu,crg,slcc) {
    let lnk=`
    <div class="container">
        <a class="navbar-brand logo" href="shopping_cart.html">Lazzy Store</a><button data-bs-toggle="collapse"
            class="navbar-toggler" data-bs-target="#navcol-1">
            <span class="visually-hidden">Cambio de navegacion</span><span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navcol-1">
                <ul class="navbar-nav mx-auto">    
            `;
    // hacer menu inicio
    titulosSite[0].lnk.map((val)=> {
            if ( Array.isArray(val.lnk) ) {
                lnk +=menu_li_drpDwn_itmLnk(val)
            } else                
                lnk +=menu_li_navLnk(val);
            ;})
    // recorrer menu
    if (crg>0) {
        titulosSite[crg].lnk.map((val)=> {
            if ( Array.isArray(val.lnk) ) {
                    lnk +=menu_li_drpDwn_itmLnk(val)
                } else                
                    lnk +=menu_li_navLnk(val);
                ;})
       }      
        
    lnk +=`         <li class="nav-item">
                        <a class="nav-link" href="login.html">salir</a>
                    </li>
                </ul>
            </div>
        </div>
    `;

    $('#'+place_menu).html(lnk);
}