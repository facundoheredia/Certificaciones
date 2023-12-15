# PROYECTO FINAL

#### [1] - CONSIGNA
Desarrollar un servidor basado en NodeJs y Express. Donde se puedan ver, crear, modificar y borrar productos y carritos. El cual disponga dos rutas principales (una para productos y otra para carritos).

#### [2] - ESTRUCTURA
**[2.1] - CARPETAS**
Dentro de la carpeta principal del proyecto final (**ProyectoFinal**), se podra encontrar la siguiente disposicion:

| Carpeta | Descripcion |
| ------ | ------ |
| _src_ | Es la principal carpeta del proyecto, aqui se encuentra todo el funcionamiento. |
| _src/Clases_ | Contiene archivos js de las clases _Cart_, _CartManager_, _Product_, _ProductManager_,. |
| _src/Controllers_ | Momentaneamente sin contenido. |
| _src/helpers_ | Momentaneamente sin contenido. |
| _src/models_ | Contiene los archivos json utilizados como base de datos. Nombrados en el cuadro debajo. |
| _src/public_ | Momentaneamente sin contenido. Con un index.html y dos subcarpetas _css_ y _img_ |
| _src/routes_ | Contiene los archivos js de las rutas correspondientes a las urls _carts_ y _products_. |
| _src/Server_ | Contiene el archivo js que se utiliza para configuar el servidor. |
| _src/utils_ | Momentaneamente sin contenido. |
| _src/views_ | Momentaneamente sin contenido. Con dos subcarpetas _layouts_ y _partials_|

**[2.2] - ARCHIVOS**
Dentro de las carpetas nombradas anteriormente se encuentran los siguientes archivos:

| Archivo | Descripcion |
| ------ | ------ |
| src/_App.js_ | Archivo principal por donde se ejecuta el programa. y se carga la pagina principal del servidor donde se muestran instrucciones de uso a las distintas urls. |
| src/_FileSystem.js_ | Contiene funciones para la escritura y lectura de archivos json utilizadas en las dinstintas clases. |
| src/_Path.js_ | Contiene el path del archivo "src" del programa para implementar las rutas (utilizadas en las dintintas partes) en cualquier otra computadora. |
| src/_ProductList.js_ | Contiene un array de productos para que sea mas facil agregar con metodos POST en el body a enviar. |
| src/Clases/_Cart.js_ | Contiene la clase **Cart** y sus funciones. |
| src/Clases/_CartManager.js_ | Contiene la clase **CartManager** y sus funciones. |
| src/Clases/_Product.js_ | Contiene la clase **Product** y sus funciones. |
| src/Clases/_ProductManager.js_ | Contiene la clase **ProductManager** y sus funciones. |
| src/models/_Carts.json_ | Sirve de base de datos para los carts generados en el servidor, aqui se guardan cada uno con sus productos. |
| src/models/_IdCart.json_ | Sirve de base de datos para guardar el ultimo ID generado por la clase **Cart** al generar un cart nuevo. |
| src/models/_IdProduct.json_ | Sirve de base de datos para guardar el ultimo ID generado por la clase **Product** al generar un producto nuevo. |
| src/models/_Products.json_ | Sirve de base de datos para los productos generados en el servidor, aqui se guardan cada uno con sus datos. |
| src/public/_index.html_ | Momentaneamente sin uso. |
| src/routes/_carts.routes.js_ | Encargado de tener todas las rutas para los metodos GET, POST referentes a la url _api/carts_ con todo lo referido a ver, crear carritos y subir productos a carritos. |
| src/routes/_products.routes.js_ | Encargado de tener todas las rutas para los metodos GET, POST,PUT, DELETE referentes a la url _api/products_ con todo lo referido a ver, crear, modificar, borrar productos. |
| src/Server/_ServerConfig.js_ | Aqui se encuentra la configuracion base de Express para el servidor y la funcion para mostrar las instrucciones en la pagina principal del servidor. |

**[2.3] - CLASES**

**[2.3.1] - CLASS CART**  
Es utilizada en la generacion de un nuevo carrito en el servidor. 

**Composicion de su constructor**
| Key | Descripcion |
| ------ | ------ |
| this **products** | Array de productos guardados en el carrito. |
| this **id** | Variable donde se guarda el ID del carrito. |

**Metodos de clase**

| Nombre | Descripcion |
| ------ | ------ |
| static **idIncremental()** | Se encarga de generar el ID de cada creacion de carrito, lee el archivo _IdCart.json_ toma el numero guardado, incrementa su valor en 1 (una) unidad, lo guarda en el archivo sobrescribiendo el dato anterior y lo retorna a la key _id_ de la clase Cart. |

**[2.3.2] - CLASS CARTMANAGER**  
Es la clase principal destinada a manegar los carritos del servidor. Por ella pasa la creacion y muestra de los carritos existentes en el servidor, asi como tambien el agregar productos a los carritos.

**Composicion de su constructor**
| Key | Descripcion |
| ------ | ------ |
| this **carts** | Array de carritos con sus productos e id guardados en el archivo _Cart.json_. |
| this **path** | Ruta desde donde se lee el archivo _Cart.json_ donde se agregan los carritos creados y se modifican. |

**Metodos de clase**

| Nombre | Descripcion |
| ------ | ------ |
| async **addCart()** | Se encarga crear los carritos, usando la clase Cart anteriormente mencionada. Obtiene el array de carritos en el CartManager, incorpora el nuevo carrito creado y lo guarda en el archivo (_Carts.json_) indicado en la key _path_ de la clase. |
| async **getCarts()** | Se encarga de obtener todos los carritos guardados en el archivo _Carts.json_ y retornarlos. |
| async **getCartById(cid)** | Se encarga de obtener el carrito segun el ID pasado por el parametro **cid** de la funcion. |
| async **addProductToCart(cid,pid)** | Se encarga agregar un producto indicado al carrito indicado en base a los dos parametros recibidos. El **cid** para el ID del carrito al cual se agrega y el parametro **pid** segun el ID del producto que se quiere agregar que exista en la base de datos. |
| async **getProductsFromCart(cid)** | Se encarga de obtener el array de productos de un carrito segun el ID del carrito pasado por el parametro **cid**. |

**[2.3.3] - CLASS PRODUCT**  
Es utilizada en la generacion de un nuevo producto en el servidor. 

**Composicion de su constructor**
| Key | Descripcion |
| ------ | ------ |
| this **title** | Nombre del producto. |
| this **description** | Brebe descripcion de que producto es. |
| this **price** | Precio de venta del producto. |
| this **thumbnail** | Array donde se guardan las imagenes del producto. |
| this **code** | Codigo unico de para el producto. |
| this **stock** | Cantidad de unidades disponibles de este producto. |
| this **status** | Puede ser _true_ o _false_. |
| this **category** | Categoria a la que el producto pertenece. |
| this **id** | Variable donde se guarda el ID del producto. |

**Metodos de clase**

| Nombre | Descripcion |
| ------ | ------ |
| static **idIncremental()** | Se encarga de generar el ID de cada creacion de producto, lee el archivo _IdProduct.json_ toma el numero guardado, incrementa su valor en 1 (una) unidad, lo guarda en el archivo sobrescribiendo el dato anterior y lo retorna a la key _id_ de la clase Product. |

**[2.3.2] - CLASS PRODUCTMANAGER**  
Es la clase principal destinada a manegar los productos del servidor. Por ella pasa la creacion, modificacion, muestra y eliminacion de los productos existentes en el servidor.

**Composicion de su constructor**
| Key | Descripcion |
| ------ | ------ |
| this **products** | Array de productos guardados en el archivo _Products.json_. |
| this **path** | Ruta desde donde se lee el archivo _Products.json_ donde se agregan los productos creados, se modifican y borran. |

**Metodos de clase**

| Nombre | Descripcion |
| ------ | ------ |
| async **addProduct()** | Se encarga crear los productos, usando la clase Product anteriormente mencionada. Obtiene el array de productos en el ProductManager, incorpora el nuevo producto creado y lo guarda en el archivo (_Products.json_) indicado en la key _path_ de la clase. |
| async **getProducts()** | Se encarga de obtener todos los productos guardados en el archivo _Products.json_ y retornarlos. |
| async **getProductById(id)** | Se encarga de obtener el producto segun el ID pasado por el parametro **id** de la funcion. |
| async **getProductByCode(code)** | Se encarga de obtener el producto segun el CODE pasado por el parametro **code** de la funcion. |
| async **updateProduct(id,product)** | Se encarga de modificar un producto buscado por su ID indicado por el parametro **id** con los datos que llegan del objeto por el parametro **product**. |
| async **deleteProduct(id)** | Se encarga buscar borrar del array de productos el producto segun el ID pasado por el parametro **id**. |

**[2.4] - RUTAS**
Como se menciono con anterioridad, el servidor posee dos rutas (url) principales ademas de la pagina principal que es:
```sh
http://localhost:4000/api
```
**[2.4.1] - RUTA PRODUCTS**  
Ruta principal donde se listaran todos los productos cargados en el servidor. 
```sh
http://localhost:4000/api/products
```
Se podra poner un limite de visualizacion de productos segun el limite marcado con el numero asignado a _limit_. Esto hara que solo se muestren 2 productos o el numero que se asigne. Ejemplo: 
```sh
http://localhost:4000/api/products/?limit=2
```
Se podra buscar por ID de productos indicando la siguiente ruta con el numero de ID del producto a buscar. En el ejemplo debajo se mostrara el producto con ID 3 si existe:
```sh
http://localhost:4000/api/products/3
```
**[2.4.1] - RUTA CARTS** 
Ruta principal donde se listaran todos los carritos cargados en el servidor. 
```sh
http://localhost:4000/api/carts
```
Se podra poner un limite de visualizacion de carritos segun el limite marcado con el numero asignado a _limit_. Esto hara que solo se muestren 2 carritos o el numero que se asigne. Ejemplo: 
```sh
http://localhost:4000/api/carts/?limit=2
```
Se podra buscar por ID de carritos indicando la siguiente ruta con el numero de ID del carrito a buscar. En el ejemplo debajo se mostrara el carrito con ID 4 si existe y con sus productos si tiene alguno:
```sh
http://localhost:4000/api/carts/4
```

#### [3] - FUNCIONAMIENTO DEL SERVIDOR
**[3.1] - INSTALACION**
Primero instalar las dependencias necesarias para su correcto funcionamiento ejecutando el comando.
```sh
npm install
```
**[3.2] - INICIO DEL SERVIDOR**
Ejecutar por consola el comando para iniar el servidor. 
```sh
npm run dev
```

Esto hara que se ejecute el archivo _App.js_ como esta configurado en el _package.json_ en los **sripts** - **dev**.
Esperar unos instantes hasta que **nodemon** comience a funcionar. Cuando finalice aparecera por consola el siguiente mensaje:
```sh
[SERVIDOR EN PUERTO 4000]
[INGRESE A http://localhost:4000/api PARA CONTINUAR]
```
Luego dirigirse al localhost, configurado en el puerto 4000. Como figurara mostrado por la consola.
```sh
http://localhost:4000/api
```
Alli se mostraran mas instrucciones de uso del programa. En el cual podra acceder a cada una de ellas con el instructivo que figura alli.

Para terminar con el programa dirigirse a la consola. Apretar **Ctrl+C**, donde se consultara para terminar el trabajo por lotes. Ingresar **S** para finalizar o **N** para continuar con el funcionamiento.