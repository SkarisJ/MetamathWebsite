$( ~~~title Proving that t=t $)
$( ~~~description This is an example how using Modus Ponens rule you can prove that t=t $)
$( ~~~contributor metamath.pdf authors $)

$( ~~~section {"name":"Syntax needed for the proof"} $)
$( ~~~comment {"ref":["0","+","=","->","(",")","term","wff","|-"]} Declare the constant symbols we will use $)
$c 0 + = -> ( ) term wff |- $.
$( ~~~comment {"ref":["v","t","s","P","Q"]} Declare the metavariables we will use $)
$v t r s P Q $.
$( ~~~comment {"ref":["tt","tr","ts","wp","wq"]} Specify properties of the metavariables $)
tt $f term t $.
tr $f term r $.
ts $f term s $.
wp $f wff P $.
wq $f wff Q $.
$( ~~~comment {"ref":["tze","tpl","weq","wim"]} Define "term" and "wff" variables that are going to be used in the proof $)
tze $a term 0 $.
tpl $a term ( t + r ) $.
weq $a wff t = r $.
wim $a wff ( P -> Q ) $.
$( ~~~comment {"ref":["a1","a2"]} State the axioms $)
a1 $a |- ( t = r -> ( t = s -> r = s ) ) $.
a2 $a |- ( t + 0 ) = t $.
$( ~~~comment {"ref":["min","maj","mp"]} Define the modus ponens inference rule $)
${
min $e |- P $.
maj $e |- ( P -> Q ) $.
mp $a |- Q $.
$}
$( section~~~ $)
$( ~~~section {"name":"The Proof"} $)
$( ~~~comment {"ref":["th1"]} Prove a theorem $)
th1 $p |- t = t $=
$( Here is its proof: $)
tt tze tpl tt weq tt tt weq tt a2 tt tze tpl
tt weq tt tze tpl tt weq tt tt weq wim tt a2
tt tze tpl tt tt a1 mp mp
$.
$( section~~~ $)
$( ~~~section {"name":"The 2nd Proof"} $)
th2 $p |- ( ( t + r ) + 0 ) = ( t + r ) $=
tt tr tpl a2
$.
$( section~~~ $)
$( ~~~section {"name":"The 3rd Proof"} $)
th3 $p |- ( ( t + 0 ) + 0 ) = ( t + 0 ) $=
tt tze th2
$.
$( section~~~ $)