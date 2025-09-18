<?php
// setting time zone
date_default_timezone_set("America/Santiago");

class dbconexion{

    private $conn;
    private $servername = "localhost";
    private $myDB = "lsvgsg2025";
    private $username = "root";
    private $password = "";//root
    
    
    public function __construct()
    {        
        $dsn = "mysql:host=$this->servername; dbname=$this->myDB";
    
        $this->conn = new PDO($dsn, $this->username, $this->password);
        // set the PDO error mode to exception
        $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        // $conn->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);        
    }
    
    function AnswerData($actionStatus,$OperationResult,$querySended) {

        $answer=['status'=>$actionStatus,'info'=>$OperationResult,'qr'=>$querySended];
        echo json_encode( $answer ) ;
        php_console_log( $answer);    
    }

    public function addP($query_statement)
    {      
        $er=null;
        $ok=true;
          
        try {       
       // eConnected successfully";
            $this->conn->exec($query_statement);        
         } catch(PDOException $e) {
            $er='Error en datos ya existentes.['.$e->getMessage(); 
            $ok=false; 
        }
        $this->AnswerData ($ok,$er,$query_statement);     
    }
    
    public function findAll_By($query_statement)
    {       
        $er=null;
        $ok=true;

        try {        
            $er=$this->conn->query($query_statement)->fetchAll();//
        // php_console_log($err,'llego aqui?');!=null?'vacio' :$err
            
        } catch(PDOException $e) {
            $ok=false;//die($conn->getMessage());
            $er=$e->getMessage();
        }
        $this->AnswerData ($ok,$er,$query_statement);
    }

    /**
     * Find without All att
     */
    public function find_By($query_statement)
    {       
        // $servername = "localhost";
        // $myDB = "lsvgsg2025";
        // $username = "root";
        // $password = "";
        $er=null;
        $ok=true;
        //new PDO("mysql:host=localhost;dbname=lsvgsg2025","root","root");  
        try {
        $conn = new PDO("mysql:host=$this->servername;dbname=$this->myDB", $this->username, $this->password);
        // set the PDO error mode to exception
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        // $conn->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
        // echo "Connected successfully";
        // echo $qry;
        $er=$conn->query($query_statement)->fetch();//
        // php_console_log($err,'llego aqui?');!=null?'vacio' :$err
            
        } catch(PDOException $e) {
            $ok=false;//die($conn->getMessage());
            $er=$e->getMessage();
        }
        $conn=null;
        return  ['status'=>$ok,'info'=>$er,'qr'=>$query_statement];
    }

    public function getAll_OrderBy($table_name,$table_sort_key)
    {       
        // $servername = "localhost";
        // $myDB = "lsvgsg2025";
        // $username = "root";
        // $password = "";
        $er=null;
        $ok=true;
        //new PDO("mysql:host=localhost;dbname=lsvgsg2025","root","root");  
        try {
        $conn = new PDO("mysql:host=$this->servername;dbname=$this->myDB", $this->username, $this->password);
        // set the PDO error mode to exception
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        // $conn->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
        // echo "Connected successfully";
        $qry=" SELECT * from $table_name order by $table_sort_key ASC";
        // echo $qry;
        $er=$conn->query($qry)->fetchAll();//
        // php_console_log($err,'llego aqui?');!=null?'vacio' :$err
            
        } catch(PDOException $e) {
            $ok=false;//die($conn->getMessage());
            $er=$e->getMessage();
        }
        $conn=null;
        return  ['status'=>$ok,'info'=>$er,'qr'=>$qry];
    }
}
/**
 * Ayuda simple para depurar en la consola
 * 
 * @param  Array, Object, String $data
 * @return String
 */
    function php_console_log_data( $data, $comment = NULL ) {    
        $output='';    
        if(is_string($comment))
            $output .= "<script>console.log( '$comment' );";
        elseif($comment!=NULL)
            $comment==NULL;//Si se pasa algo que no sea un string se pone a NULL para que no de problemas
        if ( is_array( $data ) ) {
            if($comment==NULL)
                $output .= "<script>console.warn( 'Array PHP:' );";
            $output .= "console.log( '[" . implode( ',', $data) . "]' );</script>";
        } else if ( is_object( $data ) ) {
            $data    = var_export( $data, TRUE );
            $data    = explode( "\n", $data );
            if($comment==NULL)
                $output .= "<script>console.warn( 'Objeto PHP:' );";
            foreach( $data as $line ) {
                if ( trim( $line ) ) {
                    $line    = addslashes( $line );
                    $output .= "console.log( '{$line}' );";
                }
            }
            $output.="</script>";
        } else {
            if($comment==NULL)
                $output .= "<script>console.warn( 'Valor de variable PHP:' );";
            $output .= "console.log( '$data' );</script>";
        }
            
        echo $output;
    }

    function php_console_log( $data, $comment = NULL ) {    
        $output=''; 
        $data_out = json_encode($data);
        
        $comment= (is_null($comment))? 'sin comentarios': $comment;
        
        $output .= "<script>console.warn( '$comment' );";
        
        $output .= "console.log( '$data_out' );";
        
        $output .="</script>";
                    
        echo $output;
    }

    $gg=new dbconexion();
    $qry = "SELECT * from catalogo_area_table ";  //where id_area=$areaId         

    $gg->findAll_By($qry);