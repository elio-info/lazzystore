<?php
// setting time zone
date_default_timezone_set("America/Santiago");

class dbconexion{

    private $conn;
    private $servername = "localhost";
    private $myDB = "lazzy_store";
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
    
    function AnswerData($actionStatus,$OperationResult,$querySended,$print_answer) {

        $answer=['status'=>$actionStatus,'info'=>$OperationResult,'qr'=>$querySended];
        if($print_answer)
            echo json_encode( $answer ) ;          
    }

    public function addP($query_statement,$print_answer=true)
    {      
        $er=null;
        $ok=true;
          
        try {       
       // eConnected successfully";
           $er= $this->conn->exec($query_statement);   
            
         } catch(PDOException $e) {
            $er='Error en datos ya existentes.['.$e->getMessage(); 
            $ok=false; 
        }
        $this->AnswerData ($ok,$er,$query_statement,$print_answer);   
        return $this->conn->lastInsertId();
        // php_console_log( $_POST,$comment);      
    }
    
    public function findAll_By($query_statement)
    {       
        $er=null;
        $ok=true;

        try {        
            $er=$this->conn->query($query_statement)->fetchAll();//
            
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
        $er=null;
        $ok=true;

        try {        
            $er=$this->conn->query($query_statement)->fetch();//
            
        } catch(PDOException $e) {
            $ok=false;//die($conn->getMessage());
            $er=$e->getMessage();
        }
        $this->AnswerData ($ok,$er,$query_statement);
    }

    public function getAll_OrderBy($table_name,$table_sort_key)
    {       
        $er=null;
        $ok=true;

        try {
            $query_statement=" SELECT * from $table_name order by $table_sort_key ASC";
        // echo $qry;
            $er=$this->conn->query($query_statement)->fetchAll();//
            
        } catch(PDOException $e) {
            $ok=false;//die($conn->getMessage());
            $er=$e->getMessage();
        }
        $this->AnswerData ($ok,$er,$query_statement);
    }
}
/**
 * Ayuda simple para depurar en la consola
 * 
 * @param  Array, Object, String $data
 * @return String
 */    
    function php_console_log( $data, $comment = NULL ) {    
        $output=''; 
                
        $comment= (is_null($comment))? 'sin comentarios': $comment;
        
        $output .= "<script>console.log( '$comment' );</script>";
        
        $output .= "<script>console.log( $data );";
        
        // $output .="</script>";
                    
        echo $output;
    }
    