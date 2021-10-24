function define(name, value) {
    Object.defineProperty(exports, name, {
        value:      value,
        enumerable: true
    });
}

// Misc
define("DEFAULT_PORT", 8080);
define("ADMIN", false);

// HTTP
define("HTTP_NOT_FOUND", 404);
define("HTTP_SERVER_ERROR", 500);
define("HTTP_CREATED", 201);
define("HTTP_NOT_AUTHORIZED", 403);
define("HTTP_BAD_REQUEST", 400);

// Custom Error Codes
define("NOT_AUTH_ERRCODE", -1);
define("ROUTE_NOT_FOUND_ERRCODE", -2);
define("INVALID_ID_ERRCODE", -3);
define("PROD_NOT_FOUND_ERRCODE", -4);
define("CHRT_NOT_FOUND_ERRCODE", -5);