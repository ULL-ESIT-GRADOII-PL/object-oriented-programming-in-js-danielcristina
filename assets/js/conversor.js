(function(exports) {
  "use strict";

  function Medida(valor,tipo) {
    this.type = tipo;
    this.value = valor;
    /* tipo es opcional. Debería admitir  new Medida("45.2 Km") */
    /* ademas de new Medida(45.2, "Km") */

  }

  function Temperatura(valor,tipo) {
    Medida.call(this, valor, tipo);
    /* tipo es opcional. Debería admitir new Medida("45.2 F") */
  }
  // Hacemos que Temperatura Herede de Medida
  Temperatura.prototype = new Medida();
  Temperatura.prototype.constructor = Temperatura;

  function Celsius(valor) {
    Temperatura.call(this, valor, "c");
    //funcion Celsius to Farenheit
    this.toFarenheit = function(){
      return ((valor * 9/5)+32);
    };
  }
  Celsius.prototype = new Temperatura();
  Celsius.prototype.constructor = Celsius;

  function Farenheit(valor) {
    Temperatura.call(this, valor, "f");
    this.toCelsius = function(){
      (valor - 32)*5/9;
    };
  }
  Farenheit.prototype = new Temperatura();
  Farenheit.prototype.constructor = Farenheit;

  function Kelvin(valor) {
    Temperatura.call(this, valor, "k");
  }
  Kelvin.prototype = new Temperatura();
  Kelvin.prototype.constructor = Kelvin;



  exports.Temperatura = Temperatura;
  exports.Celsius = Celsius;
  exports.Farenheit = Farenheit;

  exports.convertir = function()
    var valor     = document.getElementById('convert').value,
        elemento  = document.getElementById('converted'),
        /* Extienda la RegeExp a la especificación. use una XRegExp */
        regexp    = /^\s*([-+]?\d+(?:\.\d+)?(?:e[+-]?\d+)?)\s*([a-z,A-Z]+)\s*$/i,

    /*    date = XRegExp('(?<year>  [0-9]{4} ) -?  # year  \n' +
               '(?<month> [0-9]{2} ) -?  # month \n' +
               '(?<day>   [0-9]{2} )     # day     ', 'x');
    */
        valor     = valor.match(regexp);

    if (valor) {
      var numero = valor[1],
          tipo   = valor[2].toLowerCase();

      numero = parseFloat(numero);
      console.log("Valor: " + numero + ", Tipo: " + tipo);

      switch (tipo) {
        case 'c':
          var celsius = new Celsius(numero);
          elemento.innerHTML = celsius.toFarenheit().toFixed(2) + " Farenheit.";
          break;
        case 'f':
          var farenheit = new Farenheit(numero);
          elemento.innerHTML = farenheit.toCelsius().toFixed(2) + " Celsius";
          break;
        /*case 'k':
          var kelvin = new Kelvin(numero);
          elemento.innerHTML = kelvin.toCelsius().toFixed(2) + " Celsius";
          break;*/
        default:
          /* rellene este código */
      }
    }
    else
      elemento.innerHTML = "";
  }

})(this);
