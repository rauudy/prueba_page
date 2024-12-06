inicio 
= reglas;

reglas 
= regla+;

regla 
= identificador w "=" w expresion (w "/" w expresion)* (w ";")?  w_newline?;

expresion 
= secuencia (w "/" w secuencia)*;

secuencia 
= prefijo (_ prefijo)*;

prefijo 
= ("&" / "!" / "^")? _ sufijo;

sufijo 
= primario (w operador_repeticion)?;

operador_repeticion 
= "*" / "+" / "?";

primario 
= identificador
    / literal
    / clase_caracteres
    / "(" w expresion w ")"
    / "[" w agrupacion+ w "]"
    ;

agrupacion 
= [0-9] / [a-zA-Z];

literal 
= '"' [^"]* '"' / "'" [^']* "'";

clase_caracteres 
= "[" [^\]]+ "]";

identificador 
= [_a-z][_a-z0-9]*;

w_newline 
= (w_blank / newline)*;

newline 
= [\n\r]+;

_ 
= [ \t]*;

w 
= [ \t\n\r]*;

w_blank 
= [ \t]+;
//     _ "onlyspace"
//     = [ \t]*; // Manejo flexible de espacios en blanco y saltos de línea
//     w "whitespace"
//     = [ \t\n\r]*; // Manejo flexible de espacios en blanco y saltos de línea
