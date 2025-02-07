"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/auth/[...nextauth]/route";
exports.ids = ["app/api/auth/[...nextauth]/route"];
exports.modules = {

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("mongoose");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "./action-async-storage.external?8652":
/*!**********************************************************************************!*\
  !*** external "next/dist\\client\\components\\action-async-storage.external.js" ***!
  \**********************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist\\client\\components\\action-async-storage.external.js");

/***/ }),

/***/ "./request-async-storage.external?0211":
/*!***********************************************************************************!*\
  !*** external "next/dist\\client\\components\\request-async-storage.external.js" ***!
  \***********************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist\\client\\components\\request-async-storage.external.js");

/***/ }),

/***/ "./static-generation-async-storage.external?137c":
/*!*********************************************************************************************!*\
  !*** external "next/dist\\client\\components\\static-generation-async-storage.external.js" ***!
  \*********************************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist\\client\\components\\static-generation-async-storage.external.js");

/***/ }),

/***/ "assert":
/*!*************************!*\
  !*** external "assert" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("assert");

/***/ }),

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("buffer");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("events");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("http");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/***/ ((module) => {

module.exports = require("https");

/***/ }),

/***/ "querystring":
/*!******************************!*\
  !*** external "querystring" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("querystring");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

module.exports = require("url");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("util");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("zlib");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=D%3A%5Cwallet_clone%5Cwallet%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=D%3A%5Cwallet_clone%5Cwallet&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=D%3A%5Cwallet_clone%5Cwallet%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=D%3A%5Cwallet_clone%5Cwallet&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   headerHooks: () => (/* binding */ headerHooks),\n/* harmony export */   originalPathname: () => (/* binding */ originalPathname),\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   requestAsyncStorage: () => (/* binding */ requestAsyncStorage),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage),\n/* harmony export */   staticGenerationBailout: () => (/* binding */ staticGenerationBailout)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/future/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/future/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-kind */ \"(rsc)/./node_modules/next/dist/server/future/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var D_wallet_clone_wallet_src_app_api_auth_nextauth_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./src/app/api/auth/[...nextauth]/route.ts */ \"(rsc)/./src/app/api/auth/[...nextauth]/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/auth/[...nextauth]/route\",\n        pathname: \"/api/auth/[...nextauth]\",\n        filename: \"route\",\n        bundlePath: \"app/api/auth/[...nextauth]/route\"\n    },\n    resolvedPagePath: \"D:\\\\wallet_clone\\\\wallet\\\\src\\\\app\\\\api\\\\auth\\\\[...nextauth]\\\\route.ts\",\n    nextConfigOutput,\n    userland: D_wallet_clone_wallet_src_app_api_auth_nextauth_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { requestAsyncStorage, staticGenerationAsyncStorage, serverHooks, headerHooks, staticGenerationBailout } = routeModule;\nconst originalPathname = \"/api/auth/[...nextauth]/route\";\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        serverHooks,\n        staticGenerationAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIuanM/bmFtZT1hcHAlMkZhcGklMkZhdXRoJTJGJTVCLi4ubmV4dGF1dGglNUQlMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRmF1dGglMkYlNUIuLi5uZXh0YXV0aCU1RCUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRmF1dGglMkYlNUIuLi5uZXh0YXV0aCU1RCUyRnJvdXRlLnRzJmFwcERpcj1EJTNBJTVDd2FsbGV0X2Nsb25lJTVDd2FsbGV0JTVDc3JjJTVDYXBwJnBhZ2VFeHRlbnNpb25zPXRzeCZwYWdlRXh0ZW5zaW9ucz10cyZwYWdlRXh0ZW5zaW9ucz1qc3gmcGFnZUV4dGVuc2lvbnM9anMmcm9vdERpcj1EJTNBJTVDd2FsbGV0X2Nsb25lJTVDd2FsbGV0JmlzRGV2PXRydWUmdHNjb25maWdQYXRoPXRzY29uZmlnLmpzb24mYmFzZVBhdGg9JmFzc2V0UHJlZml4PSZuZXh0Q29uZmlnT3V0cHV0PSZwcmVmZXJyZWRSZWdpb249Jm1pZGRsZXdhcmVDb25maWc9ZTMwJTNEISIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFzRztBQUN2QztBQUNjO0FBQ3NCO0FBQ25HO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixnSEFBbUI7QUFDM0M7QUFDQSxjQUFjLHlFQUFTO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxZQUFZO0FBQ1osQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLFFBQVEsdUdBQXVHO0FBQy9HO0FBQ0E7QUFDQSxXQUFXLDRFQUFXO0FBQ3RCO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDNko7O0FBRTdKIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vd2FsbGV0Lz83ZjExIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFwcFJvdXRlUm91dGVNb2R1bGUgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9mdXR1cmUvcm91dGUtbW9kdWxlcy9hcHAtcm91dGUvbW9kdWxlLmNvbXBpbGVkXCI7XG5pbXBvcnQgeyBSb3V0ZUtpbmQgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9mdXR1cmUvcm91dGUta2luZFwiO1xuaW1wb3J0IHsgcGF0Y2hGZXRjaCBhcyBfcGF0Y2hGZXRjaCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2xpYi9wYXRjaC1mZXRjaFwiO1xuaW1wb3J0ICogYXMgdXNlcmxhbmQgZnJvbSBcIkQ6XFxcXHdhbGxldF9jbG9uZVxcXFx3YWxsZXRcXFxcc3JjXFxcXGFwcFxcXFxhcGlcXFxcYXV0aFxcXFxbLi4ubmV4dGF1dGhdXFxcXHJvdXRlLnRzXCI7XG4vLyBXZSBpbmplY3QgdGhlIG5leHRDb25maWdPdXRwdXQgaGVyZSBzbyB0aGF0IHdlIGNhbiB1c2UgdGhlbSBpbiB0aGUgcm91dGVcbi8vIG1vZHVsZS5cbmNvbnN0IG5leHRDb25maWdPdXRwdXQgPSBcIlwiXG5jb25zdCByb3V0ZU1vZHVsZSA9IG5ldyBBcHBSb3V0ZVJvdXRlTW9kdWxlKHtcbiAgICBkZWZpbml0aW9uOiB7XG4gICAgICAgIGtpbmQ6IFJvdXRlS2luZC5BUFBfUk9VVEUsXG4gICAgICAgIHBhZ2U6IFwiL2FwaS9hdXRoL1suLi5uZXh0YXV0aF0vcm91dGVcIixcbiAgICAgICAgcGF0aG5hbWU6IFwiL2FwaS9hdXRoL1suLi5uZXh0YXV0aF1cIixcbiAgICAgICAgZmlsZW5hbWU6IFwicm91dGVcIixcbiAgICAgICAgYnVuZGxlUGF0aDogXCJhcHAvYXBpL2F1dGgvWy4uLm5leHRhdXRoXS9yb3V0ZVwiXG4gICAgfSxcbiAgICByZXNvbHZlZFBhZ2VQYXRoOiBcIkQ6XFxcXHdhbGxldF9jbG9uZVxcXFx3YWxsZXRcXFxcc3JjXFxcXGFwcFxcXFxhcGlcXFxcYXV0aFxcXFxbLi4ubmV4dGF1dGhdXFxcXHJvdXRlLnRzXCIsXG4gICAgbmV4dENvbmZpZ091dHB1dCxcbiAgICB1c2VybGFuZFxufSk7XG4vLyBQdWxsIG91dCB0aGUgZXhwb3J0cyB0aGF0IHdlIG5lZWQgdG8gZXhwb3NlIGZyb20gdGhlIG1vZHVsZS4gVGhpcyBzaG91bGRcbi8vIGJlIGVsaW1pbmF0ZWQgd2hlbiB3ZSd2ZSBtb3ZlZCB0aGUgb3RoZXIgcm91dGVzIHRvIHRoZSBuZXcgZm9ybWF0LiBUaGVzZVxuLy8gYXJlIHVzZWQgdG8gaG9vayBpbnRvIHRoZSByb3V0ZS5cbmNvbnN0IHsgcmVxdWVzdEFzeW5jU3RvcmFnZSwgc3RhdGljR2VuZXJhdGlvbkFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MsIGhlYWRlckhvb2tzLCBzdGF0aWNHZW5lcmF0aW9uQmFpbG91dCB9ID0gcm91dGVNb2R1bGU7XG5jb25zdCBvcmlnaW5hbFBhdGhuYW1lID0gXCIvYXBpL2F1dGgvWy4uLm5leHRhdXRoXS9yb3V0ZVwiO1xuZnVuY3Rpb24gcGF0Y2hGZXRjaCgpIHtcbiAgICByZXR1cm4gX3BhdGNoRmV0Y2goe1xuICAgICAgICBzZXJ2ZXJIb29rcyxcbiAgICAgICAgc3RhdGljR2VuZXJhdGlvbkFzeW5jU3RvcmFnZVxuICAgIH0pO1xufVxuZXhwb3J0IHsgcm91dGVNb2R1bGUsIHJlcXVlc3RBc3luY1N0b3JhZ2UsIHN0YXRpY0dlbmVyYXRpb25Bc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzLCBoZWFkZXJIb29rcywgc3RhdGljR2VuZXJhdGlvbkJhaWxvdXQsIG9yaWdpbmFsUGF0aG5hbWUsIHBhdGNoRmV0Y2gsICB9O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAtcm91dGUuanMubWFwIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=D%3A%5Cwallet_clone%5Cwallet%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=D%3A%5Cwallet_clone%5Cwallet&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./src/app/api/auth/[...nextauth]/route.ts":
/*!*************************************************!*\
  !*** ./src/app/api/auth/[...nextauth]/route.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ handler),\n/* harmony export */   POST: () => (/* binding */ handler),\n/* harmony export */   authOptions: () => (/* binding */ authOptions)\n/* harmony export */ });\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-auth */ \"(rsc)/./node_modules/next-auth/index.js\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_auth__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-auth/providers/credentials */ \"(rsc)/./node_modules/next-auth/providers/credentials.js\");\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! bcryptjs */ \"(rsc)/./node_modules/bcryptjs/index.js\");\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(bcryptjs__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _models_User__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/models/User */ \"(rsc)/./src/models/User.ts\");\n/* harmony import */ var _lib_db__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/lib/db */ \"(rsc)/./src/lib/db.ts\");\n\n\n\n\n\nif (!process.env.NEXTAUTH_SECRET) {\n    throw new Error(\"NEXTAUTH_SECRET is not set\");\n}\nconst authOptions = {\n    providers: [\n        (0,next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_1__[\"default\"])({\n            name: \"Credentials\",\n            credentials: {\n                email: {\n                    label: \"Email\",\n                    type: \"text\"\n                },\n                password: {\n                    label: \"Password\",\n                    type: \"password\"\n                }\n            },\n            async authorize (credentials) {\n                console.log(\"Authorize called with credentials:\", credentials?.email);\n                if (!credentials?.email || !credentials?.password) {\n                    console.error(\"Missing email or password\");\n                    throw new Error(\"Please enter an email and password\");\n                }\n                try {\n                    console.log(\"Attempting to connect to database\");\n                    await (0,_lib_db__WEBPACK_IMPORTED_MODULE_4__.connectToDatabase)();\n                    console.log(\"Database connection successful\");\n                    const user = await _models_User__WEBPACK_IMPORTED_MODULE_3__[\"default\"].findOne({\n                        email: credentials.email.toLowerCase()\n                    }).select(\"+password\");\n                    console.log(\"User found:\", !!user);\n                    if (!user) {\n                        console.error(\"User not found\");\n                        throw new Error(\"Invalid email or password\");\n                    }\n                    const isPasswordValid = await bcryptjs__WEBPACK_IMPORTED_MODULE_2___default().compare(credentials.password, user.password);\n                    console.log(\"Password validation:\", isPasswordValid);\n                    if (!isPasswordValid) {\n                        console.error(\"Invalid password\");\n                        throw new Error(\"Invalid email or password\");\n                    }\n                    return {\n                        id: user._id.toString(),\n                        email: user.email,\n                        name: user.name || user.email.split(\"@\")[0]\n                    };\n                } catch (error) {\n                    console.error(\"Full authentication error:\", error);\n                    throw error; // Pass the error through for better debugging\n                }\n            }\n        })\n    ],\n    pages: {\n        signIn: \"/home\",\n        error: \"/home\",\n        newUser: \"/home\" // Redirect new users to home\n    },\n    callbacks: {\n        async jwt ({ token, user }) {\n            if (user) {\n                // Add additional user information to the token\n                token.id = user.id;\n                token.email = user.email;\n                token.name = user.name || user.email.split(\"@\")[0];\n                token.profileImage = user.profileImage || user.image;\n            }\n            return token;\n        },\n        async session ({ session, token }) {\n            if (session.user) {\n                session.user.id = token.id;\n                session.user.email = token.email;\n                session.user.name = token.name;\n                // Add profile image to session\n                if (token.profileImage) {\n                    session.user.profileImage = token.profileImage;\n                    session.user.image = token.profileImage;\n                }\n            }\n            return session;\n        }\n    },\n    secret: process.env.NEXTAUTH_SECRET,\n    session: {\n        strategy: \"jwt\",\n        maxAge: 24 * 60 * 60\n    },\n    debug: \"development\" === \"development\"\n};\nconst handler = next_auth__WEBPACK_IMPORTED_MODULE_0___default()(authOptions);\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvYXBwL2FwaS9hdXRoL1suLi5uZXh0YXV0aF0vcm91dGUudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFzRDtBQUNZO0FBQ3BDO0FBQ0c7QUFDWTtBQUU3QyxJQUFJLENBQUNLLFFBQVFDLEdBQUcsQ0FBQ0MsZUFBZSxFQUFFO0lBQ2hDLE1BQU0sSUFBSUMsTUFBTTtBQUNsQjtBQUVBLE1BQU1DLGNBQStCO0lBQ25DQyxXQUFXO1FBQ1RULDJFQUFtQkEsQ0FBQztZQUNsQlUsTUFBTTtZQUNOQyxhQUFhO2dCQUNYQyxPQUFPO29CQUFFQyxPQUFPO29CQUFTQyxNQUFNO2dCQUFPO2dCQUN0Q0MsVUFBVTtvQkFBRUYsT0FBTztvQkFBWUMsTUFBTTtnQkFBVztZQUNsRDtZQUNBLE1BQU1FLFdBQVVMLFdBQVc7Z0JBQ3pCTSxRQUFRQyxHQUFHLENBQUMsc0NBQXNDUCxhQUFhQztnQkFFL0QsSUFBSSxDQUFDRCxhQUFhQyxTQUFTLENBQUNELGFBQWFJLFVBQVU7b0JBQ2pERSxRQUFRRSxLQUFLLENBQUM7b0JBQ2QsTUFBTSxJQUFJWixNQUFNO2dCQUNsQjtnQkFFQSxJQUFJO29CQUNGVSxRQUFRQyxHQUFHLENBQUM7b0JBQ1osTUFBTWYsMERBQWlCQTtvQkFDdkJjLFFBQVFDLEdBQUcsQ0FBQztvQkFFWixNQUFNRSxPQUFPLE1BQU1sQixvREFBSUEsQ0FBQ21CLE9BQU8sQ0FBQzt3QkFBRVQsT0FBT0QsWUFBWUMsS0FBSyxDQUFDVSxXQUFXO29CQUFHLEdBQUdDLE1BQU0sQ0FBQztvQkFDbkZOLFFBQVFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQ0U7b0JBRTdCLElBQUksQ0FBQ0EsTUFBTTt3QkFDVEgsUUFBUUUsS0FBSyxDQUFDO3dCQUNkLE1BQU0sSUFBSVosTUFBTTtvQkFDbEI7b0JBRUEsTUFBTWlCLGtCQUFrQixNQUFNdkIsdURBQWMsQ0FBQ1UsWUFBWUksUUFBUSxFQUFFSyxLQUFLTCxRQUFRO29CQUNoRkUsUUFBUUMsR0FBRyxDQUFDLHdCQUF3Qk07b0JBRXBDLElBQUksQ0FBQ0EsaUJBQWlCO3dCQUNwQlAsUUFBUUUsS0FBSyxDQUFDO3dCQUNkLE1BQU0sSUFBSVosTUFBTTtvQkFDbEI7b0JBRUEsT0FBTzt3QkFDTG1CLElBQUlOLEtBQUtPLEdBQUcsQ0FBQ0MsUUFBUTt3QkFDckJoQixPQUFPUSxLQUFLUixLQUFLO3dCQUNqQkYsTUFBTVUsS0FBS1YsSUFBSSxJQUFJVSxLQUFLUixLQUFLLENBQUNpQixLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUU7b0JBQzdDO2dCQUNGLEVBQUUsT0FBT1YsT0FBTztvQkFDZEYsUUFBUUUsS0FBSyxDQUFDLDhCQUE4QkE7b0JBQzVDLE1BQU1BLE9BQU8sOENBQThDO2dCQUM3RDtZQUNGO1FBQ0Y7S0FDRDtJQUNEVyxPQUFPO1FBQ0xDLFFBQVE7UUFDUlosT0FBTztRQUNQYSxTQUFTLFFBQVMsNkJBQTZCO0lBQ2pEO0lBQ0FDLFdBQVc7UUFDVCxNQUFNQyxLQUFJLEVBQUVDLEtBQUssRUFBRWYsSUFBSSxFQUFFO1lBQ3ZCLElBQUlBLE1BQU07Z0JBQ1IsK0NBQStDO2dCQUMvQ2UsTUFBTVQsRUFBRSxHQUFHTixLQUFLTSxFQUFFO2dCQUNsQlMsTUFBTXZCLEtBQUssR0FBR1EsS0FBS1IsS0FBSztnQkFDeEJ1QixNQUFNekIsSUFBSSxHQUFHVSxLQUFLVixJQUFJLElBQUlVLEtBQUtSLEtBQUssQ0FBQ2lCLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDbERNLE1BQU1DLFlBQVksR0FBR2hCLEtBQUtnQixZQUFZLElBQUloQixLQUFLaUIsS0FBSztZQUN0RDtZQUNBLE9BQU9GO1FBQ1Q7UUFDQSxNQUFNRyxTQUFRLEVBQUVBLE9BQU8sRUFBRUgsS0FBSyxFQUFFO1lBQzlCLElBQUlHLFFBQVFsQixJQUFJLEVBQUU7Z0JBQ2hCa0IsUUFBUWxCLElBQUksQ0FBQ00sRUFBRSxHQUFHUyxNQUFNVCxFQUFFO2dCQUMxQlksUUFBUWxCLElBQUksQ0FBQ1IsS0FBSyxHQUFHdUIsTUFBTXZCLEtBQUs7Z0JBQ2hDMEIsUUFBUWxCLElBQUksQ0FBQ1YsSUFBSSxHQUFHeUIsTUFBTXpCLElBQUk7Z0JBRTlCLCtCQUErQjtnQkFDL0IsSUFBSXlCLE1BQU1DLFlBQVksRUFBRTtvQkFDdEJFLFFBQVFsQixJQUFJLENBQUNnQixZQUFZLEdBQUdELE1BQU1DLFlBQVk7b0JBQzlDRSxRQUFRbEIsSUFBSSxDQUFDaUIsS0FBSyxHQUFHRixNQUFNQyxZQUFZO2dCQUN6QztZQUNGO1lBQ0EsT0FBT0U7UUFDVDtJQUNGO0lBQ0FDLFFBQVFuQyxRQUFRQyxHQUFHLENBQUNDLGVBQWU7SUFDbkNnQyxTQUFTO1FBQ1BFLFVBQVU7UUFDVkMsUUFBUSxLQUFLLEtBQUs7SUFDcEI7SUFDQUMsT0FBT3RDLGtCQUF5QjtBQUNsQztBQUVBLE1BQU11QyxVQUFVNUMsZ0RBQVFBLENBQUNTO0FBRStCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vd2FsbGV0Ly4vc3JjL2FwcC9hcGkvYXV0aC9bLi4ubmV4dGF1dGhdL3JvdXRlLnRzPzAwOTgiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IE5leHRBdXRoLCB7IE5leHRBdXRoT3B0aW9ucyB9IGZyb20gXCJuZXh0LWF1dGhcIjtcbmltcG9ydCBDcmVkZW50aWFsc1Byb3ZpZGVyIGZyb20gXCJuZXh0LWF1dGgvcHJvdmlkZXJzL2NyZWRlbnRpYWxzXCI7XG5pbXBvcnQgYmNyeXB0IGZyb20gXCJiY3J5cHRqc1wiO1xuaW1wb3J0IFVzZXIgZnJvbSBcIkAvbW9kZWxzL1VzZXJcIjtcbmltcG9ydCB7IGNvbm5lY3RUb0RhdGFiYXNlIH0gZnJvbSBcIkAvbGliL2RiXCI7XG5cbmlmICghcHJvY2Vzcy5lbnYuTkVYVEFVVEhfU0VDUkVUKSB7XG4gIHRocm93IG5ldyBFcnJvcignTkVYVEFVVEhfU0VDUkVUIGlzIG5vdCBzZXQnKTtcbn1cblxuY29uc3QgYXV0aE9wdGlvbnM6IE5leHRBdXRoT3B0aW9ucyA9IHtcbiAgcHJvdmlkZXJzOiBbXG4gICAgQ3JlZGVudGlhbHNQcm92aWRlcih7XG4gICAgICBuYW1lOiBcIkNyZWRlbnRpYWxzXCIsXG4gICAgICBjcmVkZW50aWFsczoge1xuICAgICAgICBlbWFpbDogeyBsYWJlbDogXCJFbWFpbFwiLCB0eXBlOiBcInRleHRcIiB9LFxuICAgICAgICBwYXNzd29yZDogeyBsYWJlbDogXCJQYXNzd29yZFwiLCB0eXBlOiBcInBhc3N3b3JkXCIgfVxuICAgICAgfSxcbiAgICAgIGFzeW5jIGF1dGhvcml6ZShjcmVkZW50aWFscykge1xuICAgICAgICBjb25zb2xlLmxvZygnQXV0aG9yaXplIGNhbGxlZCB3aXRoIGNyZWRlbnRpYWxzOicsIGNyZWRlbnRpYWxzPy5lbWFpbCk7XG4gICAgICAgIFxuICAgICAgICBpZiAoIWNyZWRlbnRpYWxzPy5lbWFpbCB8fCAhY3JlZGVudGlhbHM/LnBhc3N3b3JkKSB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcignTWlzc2luZyBlbWFpbCBvciBwYXNzd29yZCcpO1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignUGxlYXNlIGVudGVyIGFuIGVtYWlsIGFuZCBwYXNzd29yZCcpO1xuICAgICAgICB9XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnQXR0ZW1wdGluZyB0byBjb25uZWN0IHRvIGRhdGFiYXNlJyk7XG4gICAgICAgICAgYXdhaXQgY29ubmVjdFRvRGF0YWJhc2UoKTtcbiAgICAgICAgICBjb25zb2xlLmxvZygnRGF0YWJhc2UgY29ubmVjdGlvbiBzdWNjZXNzZnVsJyk7XG4gICAgICAgICAgXG4gICAgICAgICAgY29uc3QgdXNlciA9IGF3YWl0IFVzZXIuZmluZE9uZSh7IGVtYWlsOiBjcmVkZW50aWFscy5lbWFpbC50b0xvd2VyQ2FzZSgpIH0pLnNlbGVjdCgnK3Bhc3N3b3JkJyk7XG4gICAgICAgICAgY29uc29sZS5sb2coJ1VzZXIgZm91bmQ6JywgISF1c2VyKTtcbiAgICAgICAgICBcbiAgICAgICAgICBpZiAoIXVzZXIpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ1VzZXIgbm90IGZvdW5kJyk7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgZW1haWwgb3IgcGFzc3dvcmQnKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb25zdCBpc1Bhc3N3b3JkVmFsaWQgPSBhd2FpdCBiY3J5cHQuY29tcGFyZShjcmVkZW50aWFscy5wYXNzd29yZCwgdXNlci5wYXNzd29yZCk7XG4gICAgICAgICAgY29uc29sZS5sb2coJ1Bhc3N3b3JkIHZhbGlkYXRpb246JywgaXNQYXNzd29yZFZhbGlkKTtcbiAgICAgICAgICBcbiAgICAgICAgICBpZiAoIWlzUGFzc3dvcmRWYWxpZCkge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcignSW52YWxpZCBwYXNzd29yZCcpO1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGVtYWlsIG9yIHBhc3N3b3JkJyk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGlkOiB1c2VyLl9pZC50b1N0cmluZygpLFxuICAgICAgICAgICAgZW1haWw6IHVzZXIuZW1haWwsXG4gICAgICAgICAgICBuYW1lOiB1c2VyLm5hbWUgfHwgdXNlci5lbWFpbC5zcGxpdCgnQCcpWzBdLFxuICAgICAgICAgIH07XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcignRnVsbCBhdXRoZW50aWNhdGlvbiBlcnJvcjonLCBlcnJvcik7XG4gICAgICAgICAgdGhyb3cgZXJyb3I7IC8vIFBhc3MgdGhlIGVycm9yIHRocm91Z2ggZm9yIGJldHRlciBkZWJ1Z2dpbmdcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pXG4gIF0sXG4gIHBhZ2VzOiB7XG4gICAgc2lnbkluOiBcIi9ob21lXCIsICAvLyBSZWRpcmVjdCB0byBob21lIGZvciB1bmF1dGhlbnRpY2F0ZWQgdXNlcnNcbiAgICBlcnJvcjogXCIvaG9tZVwiLCAgIC8vIFJlZGlyZWN0IGVycm9ycyB0byBob21lXG4gICAgbmV3VXNlcjogXCIvaG9tZVwiICAvLyBSZWRpcmVjdCBuZXcgdXNlcnMgdG8gaG9tZVxuICB9LFxuICBjYWxsYmFja3M6IHtcbiAgICBhc3luYyBqd3QoeyB0b2tlbiwgdXNlciB9KSB7XG4gICAgICBpZiAodXNlcikge1xuICAgICAgICAvLyBBZGQgYWRkaXRpb25hbCB1c2VyIGluZm9ybWF0aW9uIHRvIHRoZSB0b2tlblxuICAgICAgICB0b2tlbi5pZCA9IHVzZXIuaWQ7XG4gICAgICAgIHRva2VuLmVtYWlsID0gdXNlci5lbWFpbDtcbiAgICAgICAgdG9rZW4ubmFtZSA9IHVzZXIubmFtZSB8fCB1c2VyLmVtYWlsLnNwbGl0KCdAJylbMF07XG4gICAgICAgIHRva2VuLnByb2ZpbGVJbWFnZSA9IHVzZXIucHJvZmlsZUltYWdlIHx8IHVzZXIuaW1hZ2U7XG4gICAgICB9XG4gICAgICByZXR1cm4gdG9rZW47XG4gICAgfSxcbiAgICBhc3luYyBzZXNzaW9uKHsgc2Vzc2lvbiwgdG9rZW4gfSkge1xuICAgICAgaWYgKHNlc3Npb24udXNlcikge1xuICAgICAgICBzZXNzaW9uLnVzZXIuaWQgPSB0b2tlbi5pZCBhcyBzdHJpbmc7XG4gICAgICAgIHNlc3Npb24udXNlci5lbWFpbCA9IHRva2VuLmVtYWlsIGFzIHN0cmluZztcbiAgICAgICAgc2Vzc2lvbi51c2VyLm5hbWUgPSB0b2tlbi5uYW1lIGFzIHN0cmluZztcbiAgICAgICAgXG4gICAgICAgIC8vIEFkZCBwcm9maWxlIGltYWdlIHRvIHNlc3Npb25cbiAgICAgICAgaWYgKHRva2VuLnByb2ZpbGVJbWFnZSkge1xuICAgICAgICAgIHNlc3Npb24udXNlci5wcm9maWxlSW1hZ2UgPSB0b2tlbi5wcm9maWxlSW1hZ2UgYXMgc3RyaW5nO1xuICAgICAgICAgIHNlc3Npb24udXNlci5pbWFnZSA9IHRva2VuLnByb2ZpbGVJbWFnZSBhcyBzdHJpbmc7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBzZXNzaW9uO1xuICAgIH1cbiAgfSxcbiAgc2VjcmV0OiBwcm9jZXNzLmVudi5ORVhUQVVUSF9TRUNSRVQsXG4gIHNlc3Npb246IHtcbiAgICBzdHJhdGVneTogXCJqd3RcIixcbiAgICBtYXhBZ2U6IDI0ICogNjAgKiA2MCwgLy8gMjQgaG91cnNcbiAgfSxcbiAgZGVidWc6IHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAnZGV2ZWxvcG1lbnQnLCAvLyBFbmFibGUgZGVidWcgbG9nZ2luZyBvbmx5IGluIGRldmVsb3BtZW50IGVudmlyb25tZW50XG59O1xuXG5jb25zdCBoYW5kbGVyID0gTmV4dEF1dGgoYXV0aE9wdGlvbnMpO1xuXG5leHBvcnQgeyBoYW5kbGVyIGFzIEdFVCwgaGFuZGxlciBhcyBQT1NULCBhdXRoT3B0aW9ucyB9O1xuIl0sIm5hbWVzIjpbIk5leHRBdXRoIiwiQ3JlZGVudGlhbHNQcm92aWRlciIsImJjcnlwdCIsIlVzZXIiLCJjb25uZWN0VG9EYXRhYmFzZSIsInByb2Nlc3MiLCJlbnYiLCJORVhUQVVUSF9TRUNSRVQiLCJFcnJvciIsImF1dGhPcHRpb25zIiwicHJvdmlkZXJzIiwibmFtZSIsImNyZWRlbnRpYWxzIiwiZW1haWwiLCJsYWJlbCIsInR5cGUiLCJwYXNzd29yZCIsImF1dGhvcml6ZSIsImNvbnNvbGUiLCJsb2ciLCJlcnJvciIsInVzZXIiLCJmaW5kT25lIiwidG9Mb3dlckNhc2UiLCJzZWxlY3QiLCJpc1Bhc3N3b3JkVmFsaWQiLCJjb21wYXJlIiwiaWQiLCJfaWQiLCJ0b1N0cmluZyIsInNwbGl0IiwicGFnZXMiLCJzaWduSW4iLCJuZXdVc2VyIiwiY2FsbGJhY2tzIiwiand0IiwidG9rZW4iLCJwcm9maWxlSW1hZ2UiLCJpbWFnZSIsInNlc3Npb24iLCJzZWNyZXQiLCJzdHJhdGVneSIsIm1heEFnZSIsImRlYnVnIiwiaGFuZGxlciIsIkdFVCIsIlBPU1QiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./src/app/api/auth/[...nextauth]/route.ts\n");

/***/ }),

/***/ "(rsc)/./src/lib/db.ts":
/*!***********************!*\
  !*** ./src/lib/db.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   connectToDatabase: () => (/* binding */ connectToDatabase)\n/* harmony export */ });\n/* harmony import */ var private_next_rsc_action_proxy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! private-next-rsc-action-proxy */ \"(rsc)/./node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-proxy.js\");\n/* harmony import */ var private_next_rsc_action_encryption__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! private-next-rsc-action-encryption */ \"(rsc)/./node_modules/next/dist/server/app-render/action-encryption.js\");\n/* harmony import */ var private_next_rsc_action_encryption__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(private_next_rsc_action_encryption__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var private_next_rsc_action_validate__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! private-next-rsc-action-validate */ \"(rsc)/./node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js\");\n/* __next_internal_action_entry_do_not_use__ {\"1a53e201e3455f4ca79a1dfdac63c2487e61720d\":\"connectToDatabase\"} */ \n\n\nconst MONGODB_URI = process.env.MONGODB_URI;\nif (!MONGODB_URI) {\n    throw new Error(\"Please define the MONGODB_URI environment variable inside .env.local\");\n}\nlet cached = global.mongoose;\nif (!cached) {\n    cached = global.mongoose = {\n        conn: null,\n        promise: null\n    };\n}\nasync function connectToDatabase() {\n    if (cached.conn) {\n        return cached.conn;\n    }\n    if (!cached.promise) {\n        const opts = {\n            useNewUrlParser: true,\n            useUnifiedTopology: true\n        };\n        try {\n            console.log(\"Attempting to connect to MongoDB:\", MONGODB_URI?.substring(0, 30) + \"...\");\n            cached.promise = mongoose__WEBPACK_IMPORTED_MODULE_2___default().connect(MONGODB_URI, opts);\n            console.log(\"MongoDB connection promise created\");\n        } catch (e) {\n            console.error(\"MongoDB connection error:\", e);\n            throw e;\n        }\n    }\n    try {\n        cached.conn = await cached.promise;\n        console.log(\"MongoDB connection established successfully\");\n        return cached.conn;\n    } catch (e) {\n        console.error(\"Error establishing MongoDB connection:\", e);\n        cached.promise = null;\n        throw e;\n    }\n}\n\n(0,private_next_rsc_action_validate__WEBPACK_IMPORTED_MODULE_3__.ensureServerEntryExports)([\n    connectToDatabase\n]);\n(0,private_next_rsc_action_proxy__WEBPACK_IMPORTED_MODULE_0__.createActionProxy)(\"1a53e201e3455f4ca79a1dfdac63c2487e61720d\", connectToDatabase);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvbGliL2RiLnRzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUVnQztBQUVoQyxNQUFNQyxjQUFjQyxRQUFRQyxHQUFHLENBQUNGLFdBQVc7QUFFM0MsSUFBSSxDQUFDQSxhQUFhO0lBQ2hCLE1BQU0sSUFBSUcsTUFBTTtBQUNsQjtBQVVBLElBQUlDLFNBQVNDLE9BQU9OLFFBQVE7QUFFNUIsSUFBSSxDQUFDSyxRQUFRO0lBQ1hBLFNBQVNDLE9BQU9OLFFBQVEsR0FBRztRQUFFTyxNQUFNO1FBQU1DLFNBQVM7SUFBSztBQUN6RDtBQUVPLGVBQWVDO0lBQ3BCLElBQUlKLE9BQU9FLElBQUksRUFBRTtRQUNmLE9BQU9GLE9BQU9FLElBQUk7SUFDcEI7SUFFQSxJQUFJLENBQUNGLE9BQU9HLE9BQU8sRUFBRTtRQUNuQixNQUFNRSxPQUFPO1lBQ1hDLGlCQUFpQjtZQUNqQkMsb0JBQW9CO1FBQ3RCO1FBRUEsSUFBSTtZQUNGQyxRQUFRQyxHQUFHLENBQUMscUNBQXFDYixhQUFhYyxVQUFVLEdBQUcsTUFBTTtZQUNqRlYsT0FBT0csT0FBTyxHQUFHUix1REFBZ0IsQ0FBQ0MsYUFBY1M7WUFDaERHLFFBQVFDLEdBQUcsQ0FBQztRQUNkLEVBQUUsT0FBT0csR0FBRztZQUNWSixRQUFRSyxLQUFLLENBQUMsNkJBQTZCRDtZQUMzQyxNQUFNQTtRQUNSO0lBQ0Y7SUFFQSxJQUFJO1FBQ0ZaLE9BQU9FLElBQUksR0FBRyxNQUFNRixPQUFPRyxPQUFPO1FBQ2xDSyxRQUFRQyxHQUFHLENBQUM7UUFDWixPQUFPVCxPQUFPRSxJQUFJO0lBQ3BCLEVBQUUsT0FBT1UsR0FBRztRQUNWSixRQUFRSyxLQUFLLENBQUMsMENBQTBDRDtRQUN4RFosT0FBT0csT0FBTyxHQUFHO1FBQ2pCLE1BQU1TO0lBQ1I7QUFDRiIsInNvdXJjZXMiOlsid2VicGFjazovL3dhbGxldC8uL3NyYy9saWIvZGIudHM/OWU0ZiJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHNlcnZlcic7XG5cbmltcG9ydCBtb25nb29zZSBmcm9tICdtb25nb29zZSc7XG5cbmNvbnN0IE1PTkdPREJfVVJJID0gcHJvY2Vzcy5lbnYuTU9OR09EQl9VUkk7XG5cbmlmICghTU9OR09EQl9VUkkpIHtcbiAgdGhyb3cgbmV3IEVycm9yKCdQbGVhc2UgZGVmaW5lIHRoZSBNT05HT0RCX1VSSSBlbnZpcm9ubWVudCB2YXJpYWJsZSBpbnNpZGUgLmVudi5sb2NhbCcpO1xufVxuXG4vLyBFeHRlbmQgdGhlIGdsb2JhbCB0eXBlIHRvIGluY2x1ZGUgbW9uZ29vc2UgcHJvcGVydHlcbmRlY2xhcmUgZ2xvYmFsIHtcbiAgdmFyIG1vbmdvb3NlOiB7XG4gICAgY29ubjogbW9uZ29vc2UuQ29ubmVjdGlvbiB8IG51bGw7XG4gICAgcHJvbWlzZTogUHJvbWlzZTxtb25nb29zZS5Db25uZWN0aW9uPiB8IG51bGw7XG4gIH07XG59XG5cbmxldCBjYWNoZWQgPSBnbG9iYWwubW9uZ29vc2U7XG5cbmlmICghY2FjaGVkKSB7XG4gIGNhY2hlZCA9IGdsb2JhbC5tb25nb29zZSA9IHsgY29ubjogbnVsbCwgcHJvbWlzZTogbnVsbCB9O1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gY29ubmVjdFRvRGF0YWJhc2UoKSB7XG4gIGlmIChjYWNoZWQuY29ubikge1xuICAgIHJldHVybiBjYWNoZWQuY29ubjtcbiAgfVxuXG4gIGlmICghY2FjaGVkLnByb21pc2UpIHtcbiAgICBjb25zdCBvcHRzID0ge1xuICAgICAgdXNlTmV3VXJsUGFyc2VyOiB0cnVlLFxuICAgICAgdXNlVW5pZmllZFRvcG9sb2d5OiB0cnVlLFxuICAgIH07XG5cbiAgICB0cnkge1xuICAgICAgY29uc29sZS5sb2coJ0F0dGVtcHRpbmcgdG8gY29ubmVjdCB0byBNb25nb0RCOicsIE1PTkdPREJfVVJJPy5zdWJzdHJpbmcoMCwgMzApICsgJy4uLicpO1xuICAgICAgY2FjaGVkLnByb21pc2UgPSBtb25nb29zZS5jb25uZWN0KE1PTkdPREJfVVJJISwgb3B0cyk7XG4gICAgICBjb25zb2xlLmxvZygnTW9uZ29EQiBjb25uZWN0aW9uIHByb21pc2UgY3JlYXRlZCcpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ01vbmdvREIgY29ubmVjdGlvbiBlcnJvcjonLCBlKTtcbiAgICAgIHRocm93IGU7XG4gICAgfVxuICB9XG5cbiAgdHJ5IHtcbiAgICBjYWNoZWQuY29ubiA9IGF3YWl0IGNhY2hlZC5wcm9taXNlO1xuICAgIGNvbnNvbGUubG9nKCdNb25nb0RCIGNvbm5lY3Rpb24gZXN0YWJsaXNoZWQgc3VjY2Vzc2Z1bGx5Jyk7XG4gICAgcmV0dXJuIGNhY2hlZC5jb25uO1xuICB9IGNhdGNoIChlKSB7XG4gICAgY29uc29sZS5lcnJvcignRXJyb3IgZXN0YWJsaXNoaW5nIE1vbmdvREIgY29ubmVjdGlvbjonLCBlKTtcbiAgICBjYWNoZWQucHJvbWlzZSA9IG51bGw7XG4gICAgdGhyb3cgZTtcbiAgfVxufVxuIl0sIm5hbWVzIjpbIm1vbmdvb3NlIiwiTU9OR09EQl9VUkkiLCJwcm9jZXNzIiwiZW52IiwiRXJyb3IiLCJjYWNoZWQiLCJnbG9iYWwiLCJjb25uIiwicHJvbWlzZSIsImNvbm5lY3RUb0RhdGFiYXNlIiwib3B0cyIsInVzZU5ld1VybFBhcnNlciIsInVzZVVuaWZpZWRUb3BvbG9neSIsImNvbnNvbGUiLCJsb2ciLCJzdWJzdHJpbmciLCJjb25uZWN0IiwiZSIsImVycm9yIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./src/lib/db.ts\n");

/***/ }),

/***/ "(rsc)/./src/models/User.ts":
/*!****************************!*\
  !*** ./src/models/User.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! bcryptjs */ \"(rsc)/./node_modules/bcryptjs/index.js\");\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(bcryptjs__WEBPACK_IMPORTED_MODULE_1__);\n\n\nconst UserSchema = new (mongoose__WEBPACK_IMPORTED_MODULE_0___default().Schema)({\n    name: {\n        type: String,\n        required: false,\n        trim: true\n    },\n    email: {\n        type: String,\n        required: true,\n        unique: true,\n        lowercase: true,\n        trim: true\n    },\n    password: {\n        type: String,\n        required: true,\n        select: false // This prevents password from being returned in queries\n    },\n    createdAt: {\n        type: Date,\n        default: Date.now\n    }\n}, {\n    timestamps: true\n});\n// Hash password before saving\nUserSchema.pre(\"save\", async function(next) {\n    if (!this.isModified(\"password\")) return next();\n    try {\n        const salt = await bcryptjs__WEBPACK_IMPORTED_MODULE_1___default().genSalt(10);\n        this.password = await bcryptjs__WEBPACK_IMPORTED_MODULE_1___default().hash(this.password, salt);\n        return next();\n    } catch (err) {\n        return next(err);\n    }\n});\n// Method to compare password\nUserSchema.methods.comparePassword = async function(candidatePassword) {\n    return bcryptjs__WEBPACK_IMPORTED_MODULE_1___default().compare(candidatePassword, this.password);\n};\n// Check if the model already exists to prevent recompiling\nconst User = (mongoose__WEBPACK_IMPORTED_MODULE_0___default().models).User || mongoose__WEBPACK_IMPORTED_MODULE_0___default().model(\"User\", UserSchema);\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (User);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvbW9kZWxzL1VzZXIudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBZ0M7QUFDRjtBQUU5QixNQUFNRSxhQUFhLElBQUlGLHdEQUFlLENBQUM7SUFDckNJLE1BQU07UUFDSkMsTUFBTUM7UUFDTkMsVUFBVTtRQUNWQyxNQUFNO0lBQ1I7SUFDQUMsT0FBTztRQUNMSixNQUFNQztRQUNOQyxVQUFVO1FBQ1ZHLFFBQVE7UUFDUkMsV0FBVztRQUNYSCxNQUFNO0lBQ1I7SUFDQUksVUFBVTtRQUNSUCxNQUFNQztRQUNOQyxVQUFVO1FBQ1ZNLFFBQVEsTUFBTyx3REFBd0Q7SUFDekU7SUFDQUMsV0FBVztRQUNUVCxNQUFNVTtRQUNOQyxTQUFTRCxLQUFLRSxHQUFHO0lBQ25CO0FBQ0YsR0FBRztJQUNEQyxZQUFZO0FBQ2Q7QUFFQSw4QkFBOEI7QUFDOUJoQixXQUFXaUIsR0FBRyxDQUFDLFFBQVEsZUFBZUMsSUFBSTtJQUN4QyxJQUFJLENBQUMsSUFBSSxDQUFDQyxVQUFVLENBQUMsYUFBYSxPQUFPRDtJQUV6QyxJQUFJO1FBQ0YsTUFBTUUsT0FBTyxNQUFNckIsdURBQWMsQ0FBQztRQUNsQyxJQUFJLENBQUNXLFFBQVEsR0FBRyxNQUFNWCxvREFBVyxDQUFDLElBQUksQ0FBQ1csUUFBUSxFQUFFVTtRQUNqRCxPQUFPRjtJQUNULEVBQUUsT0FBT0ssS0FBVTtRQUNqQixPQUFPTCxLQUFLSztJQUNkO0FBQ0Y7QUFFQSw2QkFBNkI7QUFDN0J2QixXQUFXd0IsT0FBTyxDQUFDQyxlQUFlLEdBQUcsZUFBZUMsaUJBQXlCO0lBQzNFLE9BQU8zQix1REFBYyxDQUFDMkIsbUJBQW1CLElBQUksQ0FBQ2hCLFFBQVE7QUFDeEQ7QUFFQSwyREFBMkQ7QUFDM0QsTUFBTWtCLE9BQU85Qix3REFBZSxDQUFDOEIsSUFBSSxJQUFJOUIscURBQWMsQ0FBQyxRQUFRRTtBQUU1RCxpRUFBZTRCLElBQUlBLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93YWxsZXQvLi9zcmMvbW9kZWxzL1VzZXIudHM/MDk2ZCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgbW9uZ29vc2UgZnJvbSAnbW9uZ29vc2UnO1xuaW1wb3J0IGJjcnlwdCBmcm9tICdiY3J5cHRqcyc7XG5cbmNvbnN0IFVzZXJTY2hlbWEgPSBuZXcgbW9uZ29vc2UuU2NoZW1hKHtcbiAgbmFtZToge1xuICAgIHR5cGU6IFN0cmluZyxcbiAgICByZXF1aXJlZDogZmFsc2UsXG4gICAgdHJpbTogdHJ1ZVxuICB9LFxuICBlbWFpbDoge1xuICAgIHR5cGU6IFN0cmluZyxcbiAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICB1bmlxdWU6IHRydWUsXG4gICAgbG93ZXJjYXNlOiB0cnVlLFxuICAgIHRyaW06IHRydWVcbiAgfSxcbiAgcGFzc3dvcmQ6IHtcbiAgICB0eXBlOiBTdHJpbmcsXG4gICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgc2VsZWN0OiBmYWxzZSAgLy8gVGhpcyBwcmV2ZW50cyBwYXNzd29yZCBmcm9tIGJlaW5nIHJldHVybmVkIGluIHF1ZXJpZXNcbiAgfSxcbiAgY3JlYXRlZEF0OiB7XG4gICAgdHlwZTogRGF0ZSxcbiAgICBkZWZhdWx0OiBEYXRlLm5vd1xuICB9XG59LCB7XG4gIHRpbWVzdGFtcHM6IHRydWVcbn0pO1xuXG4vLyBIYXNoIHBhc3N3b3JkIGJlZm9yZSBzYXZpbmdcblVzZXJTY2hlbWEucHJlKCdzYXZlJywgYXN5bmMgZnVuY3Rpb24obmV4dCkge1xuICBpZiAoIXRoaXMuaXNNb2RpZmllZCgncGFzc3dvcmQnKSkgcmV0dXJuIG5leHQoKTtcbiAgXG4gIHRyeSB7XG4gICAgY29uc3Qgc2FsdCA9IGF3YWl0IGJjcnlwdC5nZW5TYWx0KDEwKTtcbiAgICB0aGlzLnBhc3N3b3JkID0gYXdhaXQgYmNyeXB0Lmhhc2godGhpcy5wYXNzd29yZCwgc2FsdCk7XG4gICAgcmV0dXJuIG5leHQoKTtcbiAgfSBjYXRjaCAoZXJyOiBhbnkpIHtcbiAgICByZXR1cm4gbmV4dChlcnIpO1xuICB9XG59KTtcblxuLy8gTWV0aG9kIHRvIGNvbXBhcmUgcGFzc3dvcmRcblVzZXJTY2hlbWEubWV0aG9kcy5jb21wYXJlUGFzc3dvcmQgPSBhc3luYyBmdW5jdGlvbihjYW5kaWRhdGVQYXNzd29yZDogc3RyaW5nKTogUHJvbWlzZTxib29sZWFuPiB7XG4gIHJldHVybiBiY3J5cHQuY29tcGFyZShjYW5kaWRhdGVQYXNzd29yZCwgdGhpcy5wYXNzd29yZCk7XG59O1xuXG4vLyBDaGVjayBpZiB0aGUgbW9kZWwgYWxyZWFkeSBleGlzdHMgdG8gcHJldmVudCByZWNvbXBpbGluZ1xuY29uc3QgVXNlciA9IG1vbmdvb3NlLm1vZGVscy5Vc2VyIHx8IG1vbmdvb3NlLm1vZGVsKCdVc2VyJywgVXNlclNjaGVtYSk7XG5cbmV4cG9ydCBkZWZhdWx0IFVzZXI7XG4iXSwibmFtZXMiOlsibW9uZ29vc2UiLCJiY3J5cHQiLCJVc2VyU2NoZW1hIiwiU2NoZW1hIiwibmFtZSIsInR5cGUiLCJTdHJpbmciLCJyZXF1aXJlZCIsInRyaW0iLCJlbWFpbCIsInVuaXF1ZSIsImxvd2VyY2FzZSIsInBhc3N3b3JkIiwic2VsZWN0IiwiY3JlYXRlZEF0IiwiRGF0ZSIsImRlZmF1bHQiLCJub3ciLCJ0aW1lc3RhbXBzIiwicHJlIiwibmV4dCIsImlzTW9kaWZpZWQiLCJzYWx0IiwiZ2VuU2FsdCIsImhhc2giLCJlcnIiLCJtZXRob2RzIiwiY29tcGFyZVBhc3N3b3JkIiwiY2FuZGlkYXRlUGFzc3dvcmQiLCJjb21wYXJlIiwiVXNlciIsIm1vZGVscyIsIm1vZGVsIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./src/models/User.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/next-auth","vendor-chunks/@babel","vendor-chunks/jose","vendor-chunks/openid-client","vendor-chunks/oauth","vendor-chunks/@panva","vendor-chunks/preact-render-to-string","vendor-chunks/oidc-token-hash","vendor-chunks/bcryptjs","vendor-chunks/preact","vendor-chunks/cookie"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=D%3A%5Cwallet_clone%5Cwallet%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=D%3A%5Cwallet_clone%5Cwallet&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();