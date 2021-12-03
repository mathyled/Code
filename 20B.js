// ----- Recursión -----

// EJERCICIO 1
// Implementar la función objContains: debe buscar dentro de un objeto anidado un par {clave: valor}
// especifico. Tanto el objeto como el nombre de la propiedad y su valor serán recibidos por parámetro.
// En el caso de que encuentre el valor indicado en cualquier nivel del objeto debe devolver true,
// de lo contrario, devolver false.
// Aclaraciones:
//   - Un objeto anidado es un objeto que dentro tiene uno o más objetos.
//     Ej:
//        const user = {
//            id: 6,
//            email: 'homero@maxpower.com',
//            infoPersonal: {
//                nombre: 'Homero Simpson',
//                direccion: {
//                    calle: 'Avenida Siempreviva',
//                    numero: 742,
//                    barrio: 'Springfield',
//                    estado: 'Massachusetts'
//                }
//            }
//        }
//   - Caso que devuelve true  --> objContains(user, "barrio", "Springfield");
//   - Caso que devuelve false --> objContains(user, "empleo", "Empleado en planta nuclear");
// Pista: utilizar typeof para determinar si el valor de una propiedad es un objeto para aplicar
// allí la recursión



var objContains = function (obj, prop, value) {
    if (obj[prop] === value) {
      return true;
    }
    for (var i in obj) {
      if (typeof obj[i] === 'object') {
        return objContains(obj[i], prop, value);
      }
    }
    return false;
  }

  // EJERCICIO 2
// Secuencia inventada: f(n) = (f(n-1) + f(n-2) + f(n-3)) x 2
// Donde las primeras tres posiciones son dadas por el array recibido por parametro y a partir de
// la siguiente se calcula como la suma de los 3 números anteriores multiplicados por dos.
// array es un arreglo de 3 posiciones que puede contener números o strings, aquellas posiciones que
// sean números debemos dejarlas tal cual están pero las que tengan strings debemos calcular su cantidad
// de caracteres para usarlos en la secuencia.

// Por ejemplo si recibimjos: ["Franco", 1, "Henry"] deberíamos tener los siguientes 3 valores iniciales
// de la secuencia f(0) = 6, f(1) = 1 y f(2) = 5 (Ya que "Franco" tiene 6 caracteres y "Henry", 5)
// A partir de ahí la cuarta posición sería  (6 + 1 + 5) * 2 = 24 y así sucesivamente
// La función secuenciaHenry debe devolver el enésimo numero de la serie, por ejemplo para el array
// antes mencionado:
// secuencia: (6, 1, 5), 24, 60, 178, 524
//                  n
// f(n) = (f(n-1) + f(n-2) + f(n-3)) x 2

// secuenciaHenry(0) // 6  ya que el elemento de la posición 0 es cero
// secuenciaHenry(1) // 1 ya que el elemento de la posición 1 es 1
// secuenciaHenry(6) // 524 ya que el elemento de la posición 6 es 524
// Para números negativos de n debe devolver false
//f(n) = (f(n-1) + f(n-2) + f(n-3)) x 2 
//
// ["Franco", 1, "Henry"]

function secuenciaHenry(array, n) {
    if (n < 0) return false;
  
  
    if (n >= 0 && n < 3) return typeof array[n] === 'string' ? array[n].length : array[n];
  
    return ((secuenciaHenry(array, n - 1) + secuenciaHenry(array, n - 2) + secuenciaHenry(array, n - 3)) * 2);
  }

  // ----- LinkedList -----

// EJERCICIO 3
// Implementar el método size dentro del prototype de LinkedList que deberá retornar el tamaño actual de
// la LinkedList. En el caso de que la lista se encuentre vacía deberá retornar cero.
// Ejemplo:
//    var lista = new LinkedList();
//    lista.size(); --> 0
//    lista.add(1);
//    lista.size(); --> 1
//    lista.add(2);
//    lista.add(3);
//    lista.size(); --> 3

LinkedList.prototype.size = function () {
    /* Tu codigo aqui */
    var current = this.head;
    var i = 0;
    if (this.head === null) return 0;
    while (current) {
      current = current.next;
      i++;
    }
    return i;
  }
  
  // EJERCICIO 4
  // Implementar el método addInPos dentro del prototype de LinkedList que deberá agregar un elemento en
  // la posición indicada. Ambos datos serán brindados como parámetro (pos, value). Donde "pos" será la
  // posición en la cual se deberá agregar el valor "value". En el caso de que la posición en la que se
  // quiera hacer la inserción no sea válida (Supere el tamaño de la lista actual) debe devolver false.
  
  // Si el nodo fue agregado correctamente devolver true.
  // Aclaración: la posición cero corresponde al head de la LinkedList
  // Ejemplo 1:
  //    Suponiendo que la lista actual es: Head --> [1] --> [2] -->[4]
  //    lista.addInPos(2, 3);
  //    Ahora la lista quedaría: Head --> [1] --> [2] --> [3] --> [4]
  // Ejemplo 2:
  //    Suponiendo que la lista está vacía: Head --> null
  //    lista.addInPos(2, 3); --> Debería devolver false ya que no es posible agregar en la posición 2
  //    sin antes tener cargada la posición 0 y 1.
  // {head:node}
  LinkedList.prototype.addInPos = function (pos, value) {
    //Caso donde la lista esté vacia o la pos > al largo de la lista
    if (pos > this.size() && this.head === null) return false;
    //Caso donde solo tenga un nodo 
    var node = new Node(value);
    var current = this.head;
    if (pos === 0) {
      let aux = this.head;
      this.head = node;
      this.head.next = aux;
      return true;
    }              // { head:nodo}
    if (this.head.next !== null && pos === 1) { //   head  []→  []  → []→ []→
      node.next = current.next; //               //   0
      current.next = node;
    }
    //si tiene mas de un nodo
    while (current && pos > 1) { //  2 > 1
      current = current.next;
      pos--;//  1 > 1
    }
    node.next = current.next; // 
    current.next = node;
    return true;
  }
// EJERCICIO 5
// Implementar el método removeFromPos dentro del prototype de LinkedList que deberá remover un elemento de
// la posición indicada ("pos" será la posición del elemento a remover).
// En el caso de que la posición en la que se quiera hacer el remove no sea válida (Supere el tamaño de
// la lista actual o sea un número negativo) debe devolver false.

// Si el nodo fue removido correctamente devolver el valor del nodo.
// Aclaración: la posición cero corresponde al head de la LinkedList
// Ejemplo 1:
//    Suponiendo que la lista actual es: Head --> [1] --> [2] --> [3] --> [4]
//    lista.removeFromPos(2);
//    Ahora la lista quedaría: Head --> [1] --> [2] --> [4] y la función debería haber devuelto el valor 3
// Ejemplo 2:
//    Suponiendo que se pide una posición inválida: removeFromPos(8) --> false


// LinkedList.prototype.removeFromPos = function (index) {
//   // Tu código aca:
// let cont = 0;
// let previous;
// let aux
// if(index < 0 || index > this.size()) return false;  
// let current = this.head; 
// if(index === 0){ 
//   aux = this.head.value
//   this.head = this.head.next;
//   return aux; }

// while(index > cont){
//   previous = current;
//   current = current.next;
//   cont++;
// }
// aux = current;
// previous.next = current.next;

// return aux.value;

// };



LinkedList.prototype.removeFromPos = function (pos) {
    //Supere el tamaño de la lista actual || numero negativo
    if (pos > this.size() || pos < 0) return false;
    var current = this.head;
    //Caso en que saco desde el comienzo de la lista
  
  
  
    if (this.head && pos === 0) {
      let aux = this.head;
      this.head = current.next;
      return aux.value;
      // lo comentado está mal porque no se guarda la ref inicial y la pierde
      //   this.head=current.next;
      //  return current.value;
    }
    //Caso en que saco en otra pos
    // 2  > 1
    while (current && pos > 1) {
      current = current.next;
      pos--;  // 1  > 1
    }
    var remove = current.next;
    current.next = current.next.next;
    return remove.value;
  }

  // ----- QUEUE -----

// EJERCICIO 6
// Implementar la función controlAcces: a partir de una Queue que va a recibir como paráemtro que tiene
// en cada posición un objeto que va a representar a una persona y tiene la siguiente forma: queue [ {},{},{}]
// {
//   fullname: "Franco Etcheverri",
//   age: 26,
//   ticket: {
//     number: 1,
//     event: "Tomorrowland"
//   }
// }
// La idea es ir verificando uno a uno si la primer persona de la cola tiene los requisitos necesarios para
// ingresar al evento correspondiente (también recibido por parámetro). Los requisitos que debe cumplir son:
// - Ser mayor de 18 años (18 inclusive es válido)
// - Tener un ticket que corresponda con el evento (prop event de ticket)
// - Que no haya ingresado ya otra persona al evento con ese mismo número de ticket
// Finalmente la función debe devolver un arreglo con todos los nombres de las personas que pudieron ingresar
// Importante!: Aquellas personas que no cumplan con los requisitos para ingresar deben ser removidos de la cola 



// var controlAcces = function (queue, event) {
//   // Tu código aca:
//   var array = [];
//   var i =0;
//   while (queue.array.length) {
//     var person = queue.dequeue();
//     if (person.ticket.number > i && person.age >= 18 && person.ticket.event === event) {
//           i++;//
//           array.push(person.fullname);
//          }
//       }
//   return array; // queue =  ← [{};{},{}]← FIFO
var controlAcces = function (queue, event) {
    // Tu código aca:
    var array = [];
    var i = 0;
    while (queue.size()) {
      var person = queue.dequeue();
      //el numero de ticket debe ser diferente al que ya pasó;
      if (person.ticket.number !== i && person.age >= 18 && person.ticket.event === event) {
        if (person.ticket.number === 1) {//si el numero de ticket es 1 
          i = person.ticket.number// lo guardo
        }
        array.push(person.fullname);
      }
    }
    return array;
  }

  
// ----- BST -----

// EJERCICIO 7
// Implementar la función generateBST para que a partir de un array recibido como parametro
// genere un BinarySearchTree. Devolver dicho arbol generado.
// Ejemplo:
//    - array(16,6,23,2,17,31,14,5);
//    - arbol generado:
//             16
//          /      \
//        6         23
//      /  \       /   \
//     2    14    17    31
//      \
//       5


//array(16,6,23,2,17,31,14,5);

var generateBST = function (array) {
    /* Tu codigo aqui */
    var miarbol = new BinarySearchTree(array[0]);
    for (let i = 1; i < array.length; i++) {
      miarbol.insert(array[i])
    }
    return miarbol;
  }
  
  
  // ---------------
  
  
  // Ejercicio 8
  // Dado un arreglo ordenado, encontrar el índice de un elemento específico pasado como parámetro
  // utilizando el método conocido como búsqueda binaria. En el caso de que el número buscado no se encuentre
  // en el array devolver -1.
  // Para mayor información sobre dicho método:
  // https://www.khanacademy.org/computing/computer-science/algorithmsbinary-search/a/binary-search
  //    - https://en.wikipedia.org/wiki/Binary_search_algorithm
  // Ejemplo:
  //    array = [1,2,3,4,5,6,7,8,9,10];
  //    binarySearch(array, 2) --> Devolvería 1 ya que array[1] = 2
  //    [Donde 2 sería el número sobre el cuál queremos saber su posición en el array]
  
  
  
  var binarySearch = function (array, elemento) {
  
    var inicio=0;
    var final=array.length-1;
  
    while (inicio <= final) {
      //      Si pongo inicio + Math.floor(array.length/2);
      // como el array no se modifica ... voy a tener Bucle Infinito
      var mitad = inicio + Math.floor((final - inicio)/2);
      // mitad =    0    +             (3     -  0 )  /2
      if(elemento === array[mitad]){
           return mitad;
      }
      if(elemento < array[mitad]){
         final= mitad - 1;
      }else {
        inicio=mitad + 1;
      }
    }
   return -1;
  }
  
  // console.log(binarySearch([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 2))  // 1
  
  // De esta forma no estaria empleando Binary Search a pesar de pasar los test
  // var binarySearch = function (array, elemento) {
  //   /* Tu codigo aqui */
  //   // var mitad =  Math.floor(array.length/2);
    
  //   for (let i = 0; i < array.length; i++) {
  //          if(elemento===array[i]){
  //            return i;
  //          }
  //   }return -1;
  
  // }
  
  
  
  // EJERCICIO 9
  // Ordená un arreglo de números usando un bubble sort pero con algunas particularidades.
  // El nuevo arreglo debe ser devuelto.
  // El algortimo va a recibir un arreglo de objetos de la siguiente forma:
  // {
  //   name: "Notebook",
  //   price: 1200,
  //   review: 8
  // }
  // Esos objetos deben ser ordenados en función de lo que indique los siguientes parámetros
  
  // "firstOrd", "secondOrd" los cuales van a tener alguna de las propiedades del objeto anterior
  
  // para saber cual va a ser la que debemos tomar para el ordenamiento. La "secondOrd" se usa en los
  // casos en los cuales para la "firstOrd" tengan el mismo valor.
  
  // var array = [
  //   {name: "Notebook", price: 1200, review: 8},
  //   {name: "Smartphone", price: 300, review: 9},
  //   {name: "TV", price: 800, review: 1},
  //   {name: "PS5", price: 1200, review: 7}
  // ]
  // Ejemplo 1:
  // specialSort(array, "price") --> Debería quedar:
  // [
  //   {name: "Smartphone", price: 300, review: 9},
  //   {name: "TV", price: 800, review: 1},
  //   {name: "Notebook", price: 1200, review: 8}
  //   {name: "PS5", price: 1200, review: 7}
  // ]
  // Ejemplo 2:
  // specialSort(array, "price", "review") --> Debería quedar:
  // [
  //   {name: "Smartphone", price: 300, review: 9},
  //   {name: "TV", price: 800, review: 1},
  //   {name: "PS5", price: 1200, review: 7},
  //   {name: "Notebook", price: 1200, review: 8}
  // ]
  // (Siempre el ordenamiento es de menor a mayor sea cual fuera la propiedad indicada para el orden)
  //review
  // array= [{}, {}, {}, .. ]        //price    //review
  var specialSort = function (array, firstOrd, secondOrd) {
    // Tu código aca:
    var cambio = true;
    while (cambio) {
      cambio = false;
      for (var i = 0; i < array.length - 1; i++) {
  
        // if (array[i][firstOrd] > array[i + 1][firstOrd]) {
        //   var temp = array[i];
        //   array[i] = array[i + 1];
        //   array[i + 1] = temp;
        //   cambio = true;
        // }
  
        if (array[i][firstOrd] > array[i + 1][firstOrd]) {
          //si el price tienen el mismo valor
          if (array[i][firstOrd] === array[i + 1][firstOrd]) {
            var temp = array[i];
            array[i] = array[i + 1];
            array[i + 1] = temp;
            cambio = true;
          } else {
            var temp = array[i];
            array[i] = array[i + 1];
            array[i + 1] = temp;
            cambio = true;
          }
  
        }
      }
    }
    return array;
  }
  
  // console.log(specialSort([
  //   { name: "Notebook", price: 1200, review: 8 },
  //   { name: "Smartphone", price: 300, review: 9 },
  //   { name: "TV", price: 800, review: 1 },
  //   { name: "PS5", price: 1200, review: 7 },
  // ], "price", "review")) 
  
  // var arraySS = [
  //   { name: "Notebook", price: 1200, review: 8 },
  //   { name: "Smartphone", price: 300, review: 9 },
  //   { name: "TV", price: 800, review: 1 },
  //   { name: "PS5", price: 1200, review: 7 },
  // ];
  
  // if (array[i] > array[i + 1]) {
  //   var temp = array[i];
  //   array[i] = array[i + 1];// [5, 5, 4, 2, 8]
  //   array[i + 1] = temp       // [1, 5, 4, 2, 8]
  //   cambio = true;
  // }
  
  // ----- Closures -----
  
  // EJERCICIO 10
  // Implementar la función closureSum que recibe un parámetro (numFijo) y que debe retornar otra función
  // que también debe recibir un parámetro y debe devolver la suma de este últimom parámetro con numFijo.
  // Ejemplo 1:
  //    var sumaCinco = closureSum(5);
  //    sumaCinco(2);  --> Devolverá 7 (Ya que 2 + 5 = 7)
  //    sumaCinco(11); --> Devolverá 16 (Ya que 11 + 5 = 16)
  // Ejemplo 2:
  //    var sumaDiez = closureSum(10);
  //    sumaDiez(2);  --> Devolverá 12 (Ya que 2 + 10 = 12)
  //    sumaDiez(11); --> Devolverá 21 (Ya que 11 + 10 = 21)
  
  function closureSum(numFijo) {
    /* Tu codigo aqui */
    return function (param) {
      return param + numFijo;
    }
  }