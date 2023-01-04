
$c  |- wff ( ) ->  $. 

$v  a b c  $.      

wa  $f  wff a  $.  
wb  $f  wff b  $.
wc  $f  wff c  $.

wi  $a wff ( a -> b ) $.    


a1  $a |- ( a -> ( b -> a ) ) $.
a2  $a |- ( ( a -> ( b -> c ) ) -> ( ( a -> b ) -> ( a -> c ) ) ) $.

${ 
    mp1 $e |- a $.                
    mp2 $e |- ( a -> b ) $.
    mp  $a |- b $.               
$}

th1 $p  |- ( ( a -> a ) -> ( a -> a ) )  $= 
wa wa wa wi wi    
wa wa wi wa wa wi wi  
wa wa a1 wa wa wa a2 mp  $.