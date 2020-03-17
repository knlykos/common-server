## Abstraction.

Comida.
identificador, codigo de barras, codigo interno, imagen principal, nombre, descripcion, lista de ingredientes, precio, tiempo de preparacion, calificacion, comentarios, costo, lista de materiales.

ingredientes
identificador, codigo de barras, codigo interno, imagen principal, nombre, descripcion, precio, comentarios, costo, proveedor, tiempo de surtido, existencia, uam, cantidad.

productos
-id, -barcode, -code, -productImage, -name, -description, -details, -price, -costPrice, -comments, -qtyOnHand, -qtyAvailable, -uam, -supplier, -moneda, priceList[], supplyTime;

usuario.
identificador, email, username, name, lastname, password, isActive, profileImage, activationToken,

Cliente.
usuario.
identificador, email, username, name, lastname, password, isActive, profileImage, activationToken, mesa, comentarios, cupones[], tarjeta de beneficios,

Mesas.
identificador,
Numero de Mesa,
Area,

Tipo de Cambio

Comentarios de Productos
id, productoId,

Monedas - Currency.
identificador, active, name, position, rate, rounding, decimalPlaces, displayName, currencyUnit, currencyUnitLabel, symbol

Lista de Precios.
identificador, 
