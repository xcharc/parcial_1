function obtenerListaPendientes() {
    return fetch('http://jsonplaceholder.typicode.com/todos')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al obtener los datos');
            }
            return response.json();
        });
}

function mostrarListaPendientes(data, opcion) {
    switch (opcion) {
        case 1:
            data.forEach(pendiente => console.log("ID: " + pendiente.id));
            break;
        case 2:
            data.forEach(pendiente => console.log("ID: " + pendiente.id + " Title: " + pendiente.title));
            break;
        case 3:
            data.filter(pendiente => !pendiente.completed)
                .forEach(pendiente => console.log("ID: " + pendiente.id + " Title: " + pendiente.title));
            break;
        case 4:
            data.filter(pendiente => pendiente.completed)
                .forEach(pendiente => console.log("ID: " + pendiente.id + " Title: " + pendiente.title));
            break;
        case 5:
            data.forEach(pendiente => console.log("ID: " + pendiente.id + " UserID: " + pendiente.userId));
            break;
        case 6:
            data.filter(pendiente => pendiente.completed)
                .forEach(pendiente => console.log("ID: " + pendiente.id + " UserID: " + pendiente.userId));
            break;
        case 7:
            data.filter(pendiente => !pendiente.completed)
                .forEach(pendiente => console.log("ID: " + pendiente.id + " UserID: " + pendiente.userId));
            break;
        default:
            console.log("Opción inválida");
    }
}

function mostrarMenu() {
    console.log("Menú:-)");
    console.log("1- Lista de todos los pendientes (Solo IDs)");
    console.log("2- Lista de todos los pendientes (IDs y Titles)");
    console.log("3- Lista de todos los pendientes sin resolver (ID y Title)");
    console.log("4- Lista de todos los pendientes resueltos (ID y Title)");
    console.log("5- Lista de todos los pendientes (IDs y userID)");
    console.log("6- Lista de todos los pendientes resueltos (ID y userID)");
    console.log("7- Lista de todos los pendientes sin resolver (ID y userID)");
    console.log("0- Salir");
}

function iniciar() {
    obtenerListaPendientes()
        .then(data => {
            mostrarMenu();
            const readline = require('readline').createInterface({
                input: process.stdin,
                output: process.stdout
            });

            readline.question("seleccione una opción: ", opcion => {
                if (opcion >= 1 && opcion <= 7) {
                    mostrarListaPendientes(data, parseInt(opcion));
                } else if (opcion === '0') {
                    console.log("Saliendo...");
                    process.exit();
                } else {
                    console.log("Opción inválida seleccione un número del 1 al 7.");
                }
                readline.close();
            });
        })
        .catch(error => {
            console.log("Error al obtener datos:", error);
        });
}

iniciar();
