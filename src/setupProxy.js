const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
    app.use(
        "/client/*",
        createProxyMiddleware({
            target: `https://www.riv1.czargaming.com/client`,

            // target: "http://pouch.czargaming.com/api",
            secure: true,
            logLevel: "debug",
            changeOrigin: true,
            pathRewrite: { "^/client": "" },
            // pathRewrite: { "^/api": "" },
        })
    );
    app.use(
        "/api/*",
        createProxyMiddleware({
            target: `https://www.riv1.czargaming.com/api`,
            secure: true,
            logLevel: "debug",
            changeOrigin: true,
            pathRewrite: { "^/api": "" },
        })
    );
};

// {
//     '/client/*':{
//       target: 'https://pouch.czargaming.com/client',
//       "secure": false,
//       "logLevel": "debug",
//       "changeOrigin": true,
//       pathRewrite: {"^/client" : ""}
//     }
// }
