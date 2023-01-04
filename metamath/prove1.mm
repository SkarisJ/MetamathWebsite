$c |- wff ( ) -> $.
$v a b c $.

wa $f wff a $.
wb $f wff b $.
wc $f wff c $. 

wi $a wff ( a -> b ) $.

a1 $a |- ( a -> ( b -> a ) ) $.
a2 $a |- ( ( a -> ( b -> c ) ) -> ( ( a -> b ) -> ( a -> c ) ) ) $.

${
maj $e |- ( a -> b ) $.
min $e |- a $.
mp $a |- b $.
$}

th1 $p |- ( a -> a ) $=
wa wa wa wi wi wa wa wi wa wa wa wi wa wi wi
wa wa wa wi wi wa wa wi wi wa wa wa wi wa a2
wa wa wa wi a1 mp wa wa a1 mp $.
