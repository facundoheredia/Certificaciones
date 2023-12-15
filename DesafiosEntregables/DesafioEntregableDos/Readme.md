# DESAFIO ENTREGABLE N° 2

#### CONSIGNA
Continuando con el desafio anterior. Se ampliaron las funciones del Product Manager con funciones modificadas y nuevas.

**METODOS MODIFICADOS**
- El metodo **addProduct** ahora genera y lee un archivo JSON en el cual guardara los productos que se agreguen al array de productos del "ProductManager".
- El metodo **getProducts** ahora lee el archivo JSON generado por el **addProduct** y los devuelve .
- El metodo **getProductById** ahora lee el archivo JSON haciendo uso de **getProducts**, en caso contrario devolvera _"Not Found"_ por consola.

**METODOS NUEVOS**
- El metodo **updateProduct** se encarga de modificar el valor de la key buscada en el producto segun la ID. Este metodo hace uso de **getProducts** y **getProductById**.
- El metodo **deleteProduct** se encarga de borrar el producto indicado por ID. Este metodo hace uso de **getProducts**.

#### LECTURA DE ARCHIVOS
Se generaron dos funciones nuevas:

- La funcion **escribirEnArchivo** se encargara de generar un archivo al path indicado con los productos agregados. Y de leer el archivo si exte existe en el path indicado.
- La funcion **leerDeArchivo** se encargara de leer el archivo en el path indicado.

#### FUNCIONAMIENTO
Idem al desafio anterior.

Se agregaron nuevos archivos y son la siguiente:

| Nombre | Descripcion |
| ------ | ------ |
| _FileSystem.js_ | Contiene funciones de lectura de archivos |
| _Main.js_ | Se encuentran todos los test de las funciones a ejecutar |