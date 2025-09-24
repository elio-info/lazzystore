<?php // if (!isset($_SESSION)) session_start();
    require_once "../code/cnx.php";
    $tipo_consulta =$_POST['tipo_operacion']  ;
    $consultaso =new dbconexion();    
   
    switch ($tipo_consulta) {
        case 'guardar':
            $p_nmb = $_POST['productFrm_nombre'];
            
            $qry="INSERT INTO producto (nombre_prod) values('$p_nmb')";
             print_r ($qry);
             $rs=intval($consultaso->addP($qry,false)) ;
             if ($rs>0){
                $p_cnt = $_POST['productFrm_cant'];
                $p_cst = $_POST['productFrm_costo'];
                $p_prc = $_POST['productFrm_precio'];
                $p_dia = $_POST['productFrm_dia'];
                $p_vnc = $_POST['productFrm_vence'] instanceof DateTime ? ',`fechaVence_prod`':'';
                $p_d_vnc = $_POST['productFrm_vence'] instanceof DateTime ? ','. $_POST['productFrm_vence']->format('Y-m-d'):'';
            $qryDtl="INSERT INTO `producto_detalles` (`id_prod`, `fechaCompra_prod`, `cantInicial_prod`, `cantActual_prod`, `costo_prod`, `precioventa_prod`, `pva_prod`, `ca_prod` $p_vnc) VALUES ($rs, '$p_dia', $p_cnt, $p_cnt, $p_cst, $p_prc, $p_prc, $p_cst $p_d_vnc )";

            $rs=$consultaso->addP($qryDtl) ;
             }
            //  php_console_log($rs,'el POST');
             print_r ($_POST);
             print_r ($qryDtl);
             exit;
            break;
        case 'update'://bajo a la bd
            $id = $_POST["en3Form_id"]; 
            $nombre = $_POST['en3Form_nombre'];
            $en3Cll = $_POST['en3Form_cell'];
            # que pasa               
            $qry = "UPDATE entrenadores_table SET nombre_entrenador = '$nombre', cell = '$en3Cll'  where id_entrenador like'%$id%'";
            $rs = $consultaso->addP($qry);             
            
            echo json_encode(
                $rs['status']==1 ?$consultaso->getAll_OrderBy('entrenadores_table','id_entrenador')
                :
                $rs);//
        break;    
        case 'eliminar':
            $id = $_POST['id'];
            $qry = "DELETE FROM entrenadores_table WHERE  id_entrenador like '%$id%' ";
            $rs = $consultaso->addP($qry); 
            
            $qryM=" DELETE from area_entrenador_horarios where  id_entrenador like '%$id%' ";            
            $ejecutar = $consultaso->addP($qryM);
            
            echo json_encode(
                $rs['status']==1 ?$consultaso->getAll_OrderBy('entrenadores_table','id_entrenador')
                :
                $rs);//
            break;    
        case 'listar':
            # code...listar todos
            $qry = "SELECT `id_entrenador` as idd,`id_entrenador`,`nombre_entrenador`,`cell` from entrenadores_table ";           
            // print_r ($qry);
             $rs=$consultaso->findAll_By($qry);
            //  print_r ($rs);
            //  exit;
            echo json_encode(    $rs   );            
            break;
        case 'buscar':        
            # code...listar el buscado
            $id= $_POST['p_id']!==''? "where id_prod =".$_POST['p_id']:"";
            $rcv= $_POST['rcv']!==''? $_POST['rcv']:"";
            $gby= $_POST['groupby']!=='*'? "GROUP BY ".$_POST['groupby']:"";
            
            $qry = "SELECT * $rcv from view_prod $id  $gby";           
            // print_r ($qry);
                $rs=$consultaso->findAll_By($qry);
            //  print_r ($rs);
            //  exit;                          
            break;
    }
    // echo json_encode($ejecutaro);

?>