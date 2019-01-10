// format de la configuration: https://github.com/chimurai/http-proxy-middleware#options option.router
// Les paths dans la traduction du router sont concatenes alors si tu as "/event" et que tu rediriges vers "localhost:1234/api",
// ca va rediriger vers "localhost:1234/api/event". Les paths du router sont apped au path initial, donc si path vaut "/api" et qu'un 
// path du router est "/event", le path de l'URL dans le browser, pour trigger le proxy, doit etre "/api/event"
export type LogLevel = 'debug' | 'info' | 'warn' | 'error' | 'silent';
export interface ProxyConfig {
    path: string;
    target: string;
    router: { [route: string]: string };
    logLevel: LogLevel;
};

export const proxyConfig: ProxyConfig = require('../proxy-config.json');
