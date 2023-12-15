# DESAFIO ENTREGABLE N° 3

#### CONSIGNA
Continuando con el desafio anterior. Ahora se despliega un servidor con Express. Por donde se van a estar usando las distintas funciones anteriormente elavoradas.

**CARPETAS**
Se reestructuro la carpeta de **DesafioEntregableTres**. Esta posee 2 subcarpetas principales con el siguiente contenido:

| Carpeta | Descripcion |
| ------ | ------ |
| _src_ | Contiene otra subcarpeta llamada _Clases_. Y tambien otros archivos JS para el funcionamiento del programa. |
| _Test_ | Contiene archivos para testear el programa. |
| _src/Clases_ | Contiene archivos de las clases _Product_ y _ProductManager_. |

**ARCHIVOS NUEVOS**
Dentro de la carpeta **src** se encuentran los siguientes archivos:

| Archivo | Descripcion |
| ------ | ------ |
| src/_App.js_ | Archivo principal por donde se ejecuta el programa. |
| src/_ListaDeProductosEnServidor.json_ | Contiene el array de productos a utilizar en el servidor. |
| src/_ServerConfig.js_ | Contiene la configuracion base para el servidor en Express. |
| Test/_Test.js_ | Contiene funciones armadas en los desafios anteriores para probarlas. |

#### FUNCIONAMIENTO
Instalar las dependencias necesarias para su correcto funcionamiento ejecutando el comando.
```sh
npm install
```
Ejecutar por consola el comando. 
```sh
npm run dev
```
Hara que se ejecute el archivo _App.js_ como esta configurado en el _package.json_ en los **sripts** - **dev**
Esperar unos instantes hasta que **nodemon** comience a funcionar. Cuando finalice aparecera por consola el siguiente mensaje:
```sh
[SERVIDOR EN PUERTO 4000]
[INGRESE A http://localhost:4000/ PARA CONTINUAR]
```
Luego dirigirse al localhost, configurado en el puerto 4000. Como figurara mostrado por la consola.
```sh
http://localhost:4000/
```
Alli se mostraran mas instrucciones de uso del programa. En el cual podra acceder a cada una de ellas con el instructivo que figura alli.

Para terminar con el programa dirigirse a la consola. Apretar Ctrl+C, donde se consultara para terminar el trabajo por lotes. Ingresar [S] para finalizar o [N] para continuar con el funcionamiento.