Delilah resto

Delilah restó es una REST API para un sistema de pedidos online para restaurante. Esta API permite crear, eliminar, obtener y modificar información a partir de una base de datos. 

A continuación los pasos para utilizar la API: 

Paso 1: Crear una base de datos en MySQL, o la base de datos que utilice. El nombre utilizado de ejemplo fue delilah_resto pero puede poner el nombre que concidere mejor. 
Paso2: crear un archivo .env con: 
-DB_USER= (nombre de usuario de la base de datos)
-DB_PASSWORD= (Contraseña de acceso a su base de datos)
-DB_HOST= (Host de la API, por ejemplo localhost)
-DB_NAME= (Nombre de la base de datos)
-PORT= (Puerto donde saldrá, ejemplo puerto 3000)
Paso3: Ejecutar la base de datos con el comando: 
node db/createTables.js
Para crear las bases de datos. Estas bases vienen con datos de prueba, para probar los usuarios esta es la información: 
Mail: user@mail.com
Nombre usuario: user
Constraseña: 1234

Mail: admin@mail.com
Nombre administrador: admin
Constraseña: acamica

Paso4: Instalar las librerías que se usan en el proyecto con: 
npm i

Paso5: Iniciar la api con: 
npm start

Cuando se estén haciendo las pruebas de los endpoints, es importante tomar en cuenta que si al enviar una prueba pide el token toca: 
1. entrar a "Authorization" 
2. seleccionar Bearer Token 
3. Copiar y pegar el token que sale cuando el usuario ingresa

Endpoints: 
localhost:3000
POST: /authUsers/login: body parameters {usuario:"", contrasena:""}
POST: /authUsers/sign-up: body parameters {usuario:"", contrasena:"", mail: ""}
GET: /products
GET: /products/id
DEL: /products/id
PUT: /products/id: body parameters {name:"", price:""}
GET: /users