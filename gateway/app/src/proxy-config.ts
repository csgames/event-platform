// format: https://github.com/chimurai/http-proxy-middleware#options option.router
// Les paths dans la traduction du router sont concatenes alors si tu as "/event" et que tu rediriges vers "localhost:1234/api",
// ca va rediriger vers "localhost:1234/api/event". Les paths du router sont apped au path initial, donc si path vaut "/api" et qu'un 
// path du router est "/event", le path de l'URL dans le browser, pour trigger le proxy, doit etre "/api/event"

export const proxyConfig = {
    path: "/api", 
    target: "http://localhost:8080",
    router: {
        "/oktamer" : "http://localhost/",
        "/event" : "http://localhost:1234",
        "/mail" : "http://localhost:12345",
        "/sts" : "http://localhost:5555"
    },
    logLevel: 'info' // ['debug', 'info', 'warn', 'error', 'silent']
    
}
