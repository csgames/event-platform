"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const app_1 = require("../app");
const http = require("http");
const application = app_1.Application.bootstrap();
// Configuration du port d'écoute
const appPort = normalizePort(process.env.PORT || '8080');
application.app.set('port', appPort);
// Création du serveur HTTP.
let server = http.createServer(application.app);
/**
 *  Écoute du traffic sur le port configuré.
 */
server.listen(appPort);
server.on('error', onError);
server.on('listening', onListening);
/**
 * Normalise le port en un nombre, une chaîne de caractères ou la valeur false.
 *
 * @param val Valeur du port d'écoute.
 * @returns Le port normalisé.
 */
function normalizePort(val) {
    let port = (typeof val === 'string') ? parseInt(val, 10) : val;
    if (isNaN(port)) {
        return val;
    }
    else if (port >= 0) {
        return port;
    }
    else {
        return false;
    }
}
/**
 * Se produit lorsque le serveur détecte une erreur.
 *
 * @param error Erreur interceptée par le serveur.
 */
function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }
    let bind = (typeof appPort === 'string') ? 'Pipe ' + appPort : 'Port ' + appPort;
    switch (error.code) {
        case 'EACCES':
            console.error(`${bind} requires elevated privileges`);
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(`${bind} is already in use`);
            process.exit(1);
            break;
        default:
            throw error;
    }
}
/**
 * Se produit lorsque le serveur se met à écouter sur le port.
 */
function onListening() {
    let addr = server.address();
    let bind = (typeof addr === 'string') ? `pipe ${addr}` : `port ${addr.port}`;
    console.log(`Listening on ${bind}`);
}

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9iaW4vd3d3LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBQzNCLGdDQUFxQztBQUNyQyw2QkFBNkI7QUFFN0IsTUFBTSxXQUFXLEdBQWdCLGlCQUFXLENBQUMsU0FBUyxFQUFFLENBQUM7QUFFekQsaUNBQWlDO0FBQ2pDLE1BQU0sT0FBTyxHQUFHLGFBQWEsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSSxNQUFNLENBQUMsQ0FBQztBQUMxRCxXQUFXLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFFckMsNEJBQTRCO0FBQzVCLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBRWhEOztHQUVHO0FBQ0gsTUFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUN2QixNQUFNLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQztBQUM1QixNQUFNLENBQUMsRUFBRSxDQUFDLFdBQVcsRUFBRSxXQUFXLENBQUMsQ0FBQztBQUVwQzs7Ozs7R0FLRztBQUNILFNBQVMsYUFBYSxDQUFDLEdBQW9CO0lBQ3pDLElBQUksSUFBSSxHQUFXLENBQUMsT0FBTyxHQUFHLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQztJQUN2RSxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRTtRQUNmLE9BQU8sR0FBRyxDQUFDO0tBQ1o7U0FBTSxJQUFJLElBQUksSUFBSSxDQUFDLEVBQUU7UUFDcEIsT0FBTyxJQUFJLENBQUM7S0FDYjtTQUFNO1FBQ0wsT0FBTyxLQUFLLENBQUM7S0FDZDtBQUNILENBQUM7QUFFRDs7OztHQUlHO0FBQ0gsU0FBUyxPQUFPLENBQUMsS0FBNEI7SUFDM0MsSUFBSSxLQUFLLENBQUMsT0FBTyxLQUFLLFFBQVEsRUFBRTtRQUM5QixNQUFNLEtBQUssQ0FBQztLQUNiO0lBQ0QsSUFBSSxJQUFJLEdBQUcsQ0FBQyxPQUFPLE9BQU8sS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztJQUNqRixRQUFRLEtBQUssQ0FBQyxJQUFJLEVBQUU7UUFDbEIsS0FBSyxRQUFRO1lBQ1gsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksK0JBQStCLENBQUMsQ0FBQztZQUN0RCxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2hCLE1BQU07UUFDUixLQUFLLFlBQVk7WUFDZixPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsSUFBSSxvQkFBb0IsQ0FBQyxDQUFDO1lBQzNDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDaEIsTUFBTTtRQUNSO1lBQ0UsTUFBTSxLQUFLLENBQUM7S0FDZjtBQUNILENBQUM7QUFFRDs7R0FFRztBQUNILFNBQVMsV0FBVztJQUNsQixJQUFJLElBQUksR0FBRyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDNUIsSUFBSSxJQUFJLEdBQUcsQ0FBQyxPQUFPLElBQUksS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsUUFBUSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDN0UsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsSUFBSSxFQUFFLENBQUMsQ0FBQztBQUN0QyxDQUFDIiwiZmlsZSI6ImJpbi93d3cuanMiLCJzb3VyY2VzQ29udGVudCI6WyJyZXF1aXJlKFwiZG90ZW52XCIpLmNvbmZpZygpO1xyXG5pbXBvcnQgeyBBcHBsaWNhdGlvbiB9IGZyb20gJy4uL2FwcCc7XHJcbmltcG9ydCAqIGFzIGh0dHAgZnJvbSAnaHR0cCc7XHJcblxyXG5jb25zdCBhcHBsaWNhdGlvbjogQXBwbGljYXRpb24gPSBBcHBsaWNhdGlvbi5ib290c3RyYXAoKTtcclxuXHJcbi8vIENvbmZpZ3VyYXRpb24gZHUgcG9ydCBkJ8OpY291dGVcclxuY29uc3QgYXBwUG9ydCA9IG5vcm1hbGl6ZVBvcnQocHJvY2Vzcy5lbnYuUE9SVCB8fCAnODA4MCcpO1xyXG5hcHBsaWNhdGlvbi5hcHAuc2V0KCdwb3J0JywgYXBwUG9ydCk7XHJcblxyXG4vLyBDcsOpYXRpb24gZHUgc2VydmV1ciBIVFRQLlxyXG5sZXQgc2VydmVyID0gaHR0cC5jcmVhdGVTZXJ2ZXIoYXBwbGljYXRpb24uYXBwKTtcclxuXHJcbi8qKlxyXG4gKiAgw4ljb3V0ZSBkdSB0cmFmZmljIHN1ciBsZSBwb3J0IGNvbmZpZ3Vyw6kuXHJcbiAqL1xyXG5zZXJ2ZXIubGlzdGVuKGFwcFBvcnQpO1xyXG5zZXJ2ZXIub24oJ2Vycm9yJywgb25FcnJvcik7XHJcbnNlcnZlci5vbignbGlzdGVuaW5nJywgb25MaXN0ZW5pbmcpO1xyXG5cclxuLyoqXHJcbiAqIE5vcm1hbGlzZSBsZSBwb3J0IGVuIHVuIG5vbWJyZSwgdW5lIGNoYcOubmUgZGUgY2FyYWN0w6hyZXMgb3UgbGEgdmFsZXVyIGZhbHNlLlxyXG4gKlxyXG4gKiBAcGFyYW0gdmFsIFZhbGV1ciBkdSBwb3J0IGQnw6ljb3V0ZS5cclxuICogQHJldHVybnMgTGUgcG9ydCBub3JtYWxpc8OpLlxyXG4gKi9cclxuZnVuY3Rpb24gbm9ybWFsaXplUG9ydCh2YWw6IG51bWJlciB8IHN0cmluZyk6IG51bWJlciB8IHN0cmluZyB8IGJvb2xlYW4ge1xyXG4gIGxldCBwb3J0OiBudW1iZXIgPSAodHlwZW9mIHZhbCA9PT0gJ3N0cmluZycpID8gcGFyc2VJbnQodmFsLCAxMCkgOiB2YWw7XHJcbiAgaWYgKGlzTmFOKHBvcnQpKSB7XHJcbiAgICByZXR1cm4gdmFsO1xyXG4gIH0gZWxzZSBpZiAocG9ydCA+PSAwKSB7XHJcbiAgICByZXR1cm4gcG9ydDtcclxuICB9IGVsc2Uge1xyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIFNlIHByb2R1aXQgbG9yc3F1ZSBsZSBzZXJ2ZXVyIGTDqXRlY3RlIHVuZSBlcnJldXIuXHJcbiAqXHJcbiAqIEBwYXJhbSBlcnJvciBFcnJldXIgaW50ZXJjZXB0w6llIHBhciBsZSBzZXJ2ZXVyLlxyXG4gKi9cclxuZnVuY3Rpb24gb25FcnJvcihlcnJvcjogTm9kZUpTLkVycm5vRXhjZXB0aW9uKTogdm9pZCB7XHJcbiAgaWYgKGVycm9yLnN5c2NhbGwgIT09ICdsaXN0ZW4nKSB7XHJcbiAgICB0aHJvdyBlcnJvcjtcclxuICB9XHJcbiAgbGV0IGJpbmQgPSAodHlwZW9mIGFwcFBvcnQgPT09ICdzdHJpbmcnKSA/ICdQaXBlICcgKyBhcHBQb3J0IDogJ1BvcnQgJyArIGFwcFBvcnQ7XHJcbiAgc3dpdGNoIChlcnJvci5jb2RlKSB7XHJcbiAgICBjYXNlICdFQUNDRVMnOlxyXG4gICAgICBjb25zb2xlLmVycm9yKGAke2JpbmR9IHJlcXVpcmVzIGVsZXZhdGVkIHByaXZpbGVnZXNgKTtcclxuICAgICAgcHJvY2Vzcy5leGl0KDEpO1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgJ0VBRERSSU5VU0UnOlxyXG4gICAgICBjb25zb2xlLmVycm9yKGAke2JpbmR9IGlzIGFscmVhZHkgaW4gdXNlYCk7XHJcbiAgICAgIHByb2Nlc3MuZXhpdCgxKTtcclxuICAgICAgYnJlYWs7XHJcbiAgICBkZWZhdWx0OlxyXG4gICAgICB0aHJvdyBlcnJvcjtcclxuICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBTZSBwcm9kdWl0IGxvcnNxdWUgbGUgc2VydmV1ciBzZSBtZXQgw6Agw6ljb3V0ZXIgc3VyIGxlIHBvcnQuXHJcbiAqL1xyXG5mdW5jdGlvbiBvbkxpc3RlbmluZygpOiB2b2lkIHtcclxuICBsZXQgYWRkciA9IHNlcnZlci5hZGRyZXNzKCk7XHJcbiAgbGV0IGJpbmQgPSAodHlwZW9mIGFkZHIgPT09ICdzdHJpbmcnKSA/IGBwaXBlICR7YWRkcn1gIDogYHBvcnQgJHthZGRyLnBvcnR9YDtcclxuICBjb25zb2xlLmxvZyhgTGlzdGVuaW5nIG9uICR7YmluZH1gKTtcclxufVxyXG4iXX0=
