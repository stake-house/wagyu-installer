/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/electron/index.ts":
/*!*******************************!*\
  !*** ./src/electron/index.ts ***!
  \*******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\n// index.ts\n/**\n * This typescript file contains the Electron app which renders the React app.\n */\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst electron_1 = __webpack_require__(/*! electron */ \"electron\");\nconst path_1 = __importDefault(__webpack_require__(/*! path */ \"path\"));\nconst fs_1 = __webpack_require__(/*! fs */ \"fs\");\nconst doesFileExist = (filename) => {\n    try {\n        (0, fs_1.accessSync)(filename, fs_1.constants.F_OK);\n        return true;\n    }\n    catch (err) {\n        return false;\n    }\n};\nelectron_1.app.on(\"ready\", () => {\n    var iconPath = path_1.default.join(\"static\", \"icon.png\");\n    const bundledIconPath = path_1.default.join(process.resourcesPath, \"..\", \"static\", \"icon.png\");\n    if (doesFileExist(bundledIconPath)) {\n        iconPath = bundledIconPath;\n    }\n    const title = `${electron_1.app.getName()} ${\"0abae18\"}-${\"0abae18\"}`;\n    /**\n     * Create the window in which to render the React app\n     */\n    const window = new electron_1.BrowserWindow({\n        width: 950,\n        height: 750,\n        icon: iconPath,\n        title: title,\n        webPreferences: {\n            nodeIntegration: false,\n            contextIsolation: true,\n            preload: path_1.default.join(__dirname, 'preload.js')\n        }\n    });\n    /**\n     * Hide the default menu bar that comes with the browser window\n     */\n    window.setMenuBarVisibility(false);\n    /**\n     * Set the Permission Request Handler to deny all permissions requests\n     */\n    window.webContents.session.setPermissionRequestHandler((webContents, permission, callback) => {\n        return callback(false);\n    });\n    /**\n     * Allow for refreshing of the React app within Electron without reopening.\n     * This feature is used for development and will be disabled before production deployment.\n     */\n    electron_1.globalShortcut.register('CommandOrControl+R', function () {\n        console.log('CommandOrControl+R was pressed, refreshing the React app within Electron.');\n        window.reload();\n    });\n    /**\n     * This logic closes the application when the window is closed, explicitly.\n     * On MacOS this is not a default feature.\n     */\n    electron_1.ipcMain.on('close', (evt, arg) => {\n        electron_1.app.quit();\n    });\n    /**\n     * Provides the renderer a way to call the dialog.showOpenDialog function using IPC.\n     */\n    electron_1.ipcMain.handle('showOpenDialog', async (event, options) => {\n        return await electron_1.dialog.showOpenDialog(options);\n    });\n    /**\n     * Load the react app\n     */\n    window.loadURL(`file://${__dirname}/../react/index.html`);\n});\nelectron_1.app.on('will-quit', () => {\n    /**\n     * Clear clipboard on quit to avoid access to any mnemonic or password that was copied during\n     * application use.\n     */\n    electron_1.clipboard.clear();\n});\n\n\n//# sourceURL=webpack://wagyuinstaller/./src/electron/index.ts?");

/***/ }),

/***/ "electron":
/*!***************************!*\
  !*** external "electron" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("electron");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

module.exports = require("fs");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("path");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/electron/index.ts");
/******/ 	
/******/ })()
;