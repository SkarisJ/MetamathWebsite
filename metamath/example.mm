$( Declare the constant symbols we will use $)
$c 0 + = -> ( ) termas geraiSukonstruotaFormule |- $.
$( Declare the metavariables we will use $)
$v t r s P Q $.
$( Specify properties of the metavariables $)
termasT $f termas t $.
termasR $f termas r $.
termasS $f termas s $.
geraiSukonstruotaP $f geraiSukonstruotaFormule P $.
geraiSukonstruotaQ $f geraiSukonstruotaFormule Q $.

$( Define "termas" and "geraiSukonstermasRuotaFormule" $)
termas0 $a termas 0 $.
termasTPlusR $a termas ( t + r ) $.
geraiSukonstruotaTEqualR $a geraiSukonstruotaFormule t = r $.
geraiSukonstruotaPImplQ $a geraiSukonstruotaFormule ( P -> Q ) $.
$( State the axioms $)
aksioma1 $a |- ( t = r -> ( t = s -> r = s ) ) $.
aksioma2 $a |- ( t + 0 ) = t $.
$( Define the modus ponens inference rule $)
${
min $e |- P $.
maj $e |- ( P -> Q ) $.
modusPonens $a |- Q $.
$}
$( Prove a theorem $)
th1 $p |- t = t $=
$( Here is its proof: $)
termasT termas0 termasTPlusR termasT geraiSukonstruotaTEqualR termasT termasT geraiSukonstruotaTEqualR 
termasT aksioma2 termasT termas0 termasTPlusR
termasT geraiSukonstruotaTEqualR termasT termas0 termasTPlusR termasT 
geraiSukonstruotaTEqualR termasT termasT geraiSukonstruotaTEqualR geraiSukonstruotaPImplQ termasT aksioma2
termasT termas0 termasTPlusR termasT termasT aksioma1 modusPonens modusPonens
$.
