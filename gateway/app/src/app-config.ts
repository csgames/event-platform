export const appConfig = {
    cookieExpiration: new Date(Date.now() + 60 * 10 * 1000), // 10 minutes
    contentSecurityPolicy: "script-src 'self'",
    strictTransportSecurity: "max-age=31536000; includeSubDomains; preload",
    xFrameOptions: "SAMEORIGIN",
    xContentType: "nosniff"
};

