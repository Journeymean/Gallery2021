/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Gallery"] = factory();
	else
		root["Gallery"] = factory();
})(self, function() {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/ImageLoader.js":
/*!***************************!*\
  !*** ./js/ImageLoader.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ ImageLoader)\n/* harmony export */ });\nclass ImageLoader {\r\n  constructor(gallery) {\r\n    this.gallery = gallery;\r\n  }\r\n  init() {\r\n    this.images = new Map();\r\n  }\r\n\r\n  loadRemote(path) {\r\n    let request = new XMLHttpRequest();\r\n    request.open(\"GET\", path, true);\r\n    try {\r\n      request.send();\r\n    } catch (e) {\r\n      this.gallery.ui.displayError(\"Неправильный адрес URL\");\r\n    }\r\n\r\n    request.onreadystatechange = () => {\r\n      if (request.readyState == 4 && request.status == 200) {\r\n        this.parseResponse(request.responseURL, request.responseText);\r\n      }\r\n    };\r\n  }\r\n\r\n  loadFromFile() {\r\n    let reader = new FileReader();\r\n    let url, text;\r\n\r\n    reader.readAsText(this.gallery.nodes.uploadFile.files[0]);\r\n    reader.onload = (event) => {\r\n      text = event.target.result;\r\n      if (text && url) {\r\n        this.parseResponse(url, text);\r\n      }\r\n    };\r\n\r\n    let reader2 = new FileReader();\r\n    reader2.readAsDataURL(this.gallery.nodes.uploadFile.files[0]);\r\n    reader2.onload = (event) => {\r\n      url = event.target.result;\r\n      if (text && url) {\r\n        this.parseResponse(url, text);\r\n      }\r\n    };\r\n  }\r\n\r\n  parseResponse(responseURL, responseText) {\r\n    let img = document.createElement(\"img\");\r\n    img.src = responseURL;\r\n\r\n    img.onload = () => {\r\n      this.loadFromUrl(responseURL, false);\r\n    };\r\n\r\n    img.onerror = () => {\r\n      this.loadFromJson(responseText);\r\n    };\r\n  }\r\n\r\n  loadFromUrl(url, err = true) {\r\n    var img = new Image();\r\n    img.src = url;\r\n    this.gallery.ui.addImageToLoadList(img);\r\n    img.onload = () => {\r\n      this.gallery.representation.addImage(url);\r\n      this.gallery.ui.removeImageFromLoadList(img);\r\n    };\r\n    if (err) {\r\n      img.onerror = () => {\r\n        this.gallery.ui.displayError(\"Неверный формат файла\");\r\n      };\r\n    }\r\n  }\r\n\r\n  loadFromJson(text) {\r\n    let images;\r\n    try {\r\n      images = JSON.parse(text);\r\n      images.galleryImages.forEach((image) => {\r\n        this.loadFromUrl(image.url);\r\n      });\r\n    } catch (e) {\r\n      this.gallery.ui.displayError(\"Неверный формат файла\");\r\n    }\r\n  }\r\n}\r\n\n\n//# sourceURL=webpack://Gallery/./js/ImageLoader.js?");

/***/ }),

/***/ "./js/Representation.js":
/*!******************************!*\
  !*** ./js/Representation.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Representation)\n/* harmony export */ });\nclass Representation {\r\n  constructor(gallery) {\r\n    this.gallery = gallery;\r\n  }\r\n  init() {\r\n    this.createRow();\r\n  }\r\n\r\n  addImage(path) {\r\n    let img = document.createElement(\"img\");\r\n    img.classList.add(\"gallery__img\");\r\n    img.src = path;\r\n    img.style.marginLeft = this.gallery.imageOffset / 2 + \"px\";\r\n    img.style.marginRight = this.gallery.imageOffset / 2 + \"px\";\r\n    img.style.height = `calc(100% - ${this.gallery.imageOffset}px)`;\r\n    if (!this.currentRow.parentNode) {\r\n      this.createRow();\r\n    }\r\n    this.currentRow.appendChild(img);\r\n    this.resizeRow(this.currentRow);\r\n\r\n    this.checkRows();\r\n  }\r\n\r\n  resizeRow(row) {\r\n    if (!row) {\r\n      return document.documentElement.clientHeight / 3 + \"px\";\r\n    }\r\n    let height = this.calculateRowHeight(row);\r\n    row.style.height = height + \"px\";\r\n    return height;\r\n  }\r\n\r\n  createRow() {\r\n    let row = document.createElement(\"div\");\r\n    row.classList.add(\"gallery__row\");\r\n    this.rowImages = 0;\r\n    this.gallery.nodes.imagesArea.appendChild(row);\r\n    this.currentRow = row;\r\n    row.style.height = document.documentElement.clientHeight / 3 + \"px\";\r\n    return row;\r\n  }\r\n\r\n  calculateRowHeight(row) {\r\n    if (!row) {\r\n      return;\r\n    }\r\n    let clientWidth = this.gallery.nodes.imagesArea.clientWidth;\r\n\r\n    let maxHeight = 0;\r\n    row.childNodes.forEach((img) => {\r\n      if (img.naturalHeight > maxHeight) {\r\n        maxHeight = img.naturalHeight;\r\n      }\r\n    });\r\n\r\n    let summaryWidth = 0;\r\n    let offsetWidth = 0;\r\n    row.childNodes.forEach((img) => {\r\n      summaryWidth += (maxHeight / img.naturalHeight) * img.naturalWidth;\r\n      offsetWidth += this.gallery.imageOffset;\r\n    });\r\n\r\n    let resultHeight = ((clientWidth - offsetWidth) / summaryWidth) * maxHeight + this.gallery.imageOffset;\r\n    return resultHeight;\r\n  }\r\n\r\n  resizeRows() {\r\n    this.gallery.nodes.imagesArea.childNodes.forEach((row) => {\r\n      this.resizeRow(row);\r\n    });\r\n\r\n    this.checkRows();\r\n  }\r\n\r\n  checkRows() {\r\n    let row = this.gallery.nodes.imagesArea.childNodes[0];\r\n    let shifts = 0;\r\n    while (row) {\r\n      while (this.manageShift(row)) {\r\n        shifts++;\r\n        this.manageShift(row);\r\n      }\r\n      row = row.nextElementSibling;\r\n    }\r\n\r\n    if (shifts > 0) {\r\n      this.checkRows();\r\n    }\r\n  }\r\n\r\n  checkPrettyImg(img, height) {\r\n    let frameWidth = document.documentElement.clientWidth;\r\n    if (frameWidth > parseInt(window.getComputedStyle(this.gallery.nodes.imagesArea).maxWidth)) {\r\n      frameWidth = parseInt(window.getComputedStyle(this.gallery.nodes.imagesArea).maxWidth);\r\n    }\r\n\r\n    if (frameWidth < parseInt(window.getComputedStyle(this.gallery.nodes.imagesArea).minWidth)) {\r\n      frameWidth = parseInt(window.getComputedStyle(this.gallery.nodes.imagesArea).minWidth);\r\n    }\r\n\r\n    let space = document.documentElement.clientHeight * frameWidth;\r\n\r\n    const part = 1 / 12;\r\n    let alpha = (height * height * img.naturalWidth) / img.naturalHeight / space / part;\r\n\r\n    const epsilon = 0.2;\r\n    let flag;\r\n    if ((alpha >= 1 - epsilon) & (alpha <= 1 + epsilon)) {\r\n      flag = true;\r\n    } else {\r\n      flag = false;\r\n    }\r\n\r\n    let value = 0;\r\n    if (flag == false && alpha < 1) {\r\n      value = -1;\r\n    }\r\n\r\n    if (flag == false && alpha > 1) {\r\n      value = 1;\r\n    }\r\n\r\n    return value;\r\n  }\r\n\r\n  checkPrettyRow(row) {\r\n    if (!row) {\r\n      return 0;\r\n    }\r\n    let height = parseFloat(row.style.height);\r\n    let sum = 0;\r\n    row.childNodes.forEach((img) => {\r\n      sum += this.checkPrettyImg(img, height);\r\n    });\r\n    return sum;\r\n  }\r\n\r\n  manageShift(row) {\r\n    if (!row || row.childNodes.length == 0) {\r\n      return;\r\n    }\r\n    this.resizeRow(row);\r\n    let mainIndex = this.checkPrettyRow(row);\r\n\r\n    if (!row.nextElementSibling && row.childNodes > 1) {\r\n      createdRow = this.createRow();\r\n    }\r\n    let shifted = false;\r\n    if (mainIndex >= 3 && row.nextElementSibling !== null && row.nextElementSibling.childNodes.length > 1) {\r\n      this.shiftImgDown(row);\r\n      this.resizeRow(row);\r\n      shifted = true;\r\n    }\r\n\r\n    if (mainIndex >= 1 && mainIndex <= 3 && row.nextElementSibling && row.nextElementSibling.nextElementSibling !== null && row.nextElementSibling.nextElementSibling.childNodes.length > 1) {\r\n      let little = false;\r\n      row.childNodes.forEach((img) => {\r\n        if (img.little == this.gallery.nodes.imagesArea.clientWidth) {\r\n          little = true;\r\n        }\r\n      });\r\n      if (little != true) {\r\n        this.shiftImgDown(row);\r\n        this.resizeRow(row);\r\n        shifted = true;\r\n      }\r\n    }\r\n\r\n    if (mainIndex <= -3) {\r\n      row.childNodes.forEach((img) => {\r\n        img.little = this.gallery.nodes.imagesArea.clientWidth;\r\n      });\r\n      this.shiftImgDown(row);\r\n      this.resizeRow(row);\r\n      shifted = true;\r\n    }\r\n\r\n    if (row.childNodes.length == 0 && row.parentNode) {\r\n      row.parentNode.removeChild(row);\r\n    }\r\n\r\n    return shifted;\r\n  }\r\n\r\n  shiftImgDown(row) {\r\n    let img = row.lastChild;\r\n    row.removeChild(img);\r\n\r\n    if (!row.nextElementSibling) {\r\n      this.createRow();\r\n    }\r\n\r\n    if (row.nextElementSibling.firstChild) {\r\n      row.nextElementSibling.insertBefore(img, row.nextElementSibling.firstChild);\r\n    } else {\r\n      row.nextElementSibling.appendChild(img);\r\n    }\r\n\r\n    row.nextElementSibling.childNodes.forEach((img) => {\r\n      img.little = false;\r\n    });\r\n\r\n    if (row.childNodes.length == 0) {\r\n      row.parentNode.removeChild(row);\r\n    }\r\n  }\r\n\r\n  deleteSelected() {\r\n    this.gallery.nodes.imagesArea.querySelectorAll(\"img\").forEach((img) => {\r\n      if (img.classList.contains(\"gallery__img_delete\")) {\r\n        if (img.parentNode.childNodes.length == 1) {\r\n          img.parentNode.parentNode.removeChild(img.parentNode);\r\n        } else {\r\n          img.parentNode.childNodes.forEach((img) => {\r\n            img.little = false;\r\n          });\r\n          img.parentNode.removeChild(img);\r\n        }\r\n      }\r\n    });\r\n\r\n    this.checkRows();\r\n  }\r\n}\r\n\n\n//# sourceURL=webpack://Gallery/./js/Representation.js?");

/***/ }),

/***/ "./js/UI.js":
/*!******************!*\
  !*** ./js/UI.js ***!
  \******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ UI)\n/* harmony export */ });\nclass UI {\r\n  constructor(gallery) {\r\n    this.gallery = gallery;\r\n  }\r\n  init() {\r\n    this.deleteMode = false;\r\n\r\n    this.gallery.nodes.fileInput.addEventListener(\"change\", () => {\r\n      this.gallery.imageLoader.loadRemote(this.gallery.nodes.fileInput.value);\r\n    });\r\n\r\n    this.resizeObserve();\r\n\r\n    this.gallery.nodes.uploadFile.addEventListener(\"change\", () => {\r\n      this.gallery.imageLoader.loadFromFile();\r\n    });\r\n\r\n    this.gallery.nodes.deleteButton.addEventListener(\"click\", () => {\r\n      this.enableDeleteMode();\r\n    });\r\n    this.gallery.nodes.deleteCancel.addEventListener(\"click\", () => {\r\n      this.disableDeleteMode();\r\n    });\r\n\r\n    this.gallery.nodes.deleteSelected.addEventListener(\"click\", () => {\r\n      this.gallery.representation.deleteSelected();\r\n      this.disableDeleteMode();\r\n    });\r\n\r\n    this.initDrag();\r\n\r\n    this.loadList = {};\r\n    this.loadList.wait = [];\r\n    this.loadList.total = [];\r\n  }\r\n\r\n  resizeObserve() {\r\n    window.addEventListener(\"resize\", () => {\r\n      this.gallery.representation.resizeRows();\r\n    });\r\n  }\r\n\r\n  enableDeleteMode() {\r\n    this.gallery.nodes.imagesArea.querySelectorAll(\"img\").forEach((img) => {\r\n      img.addEventListener(\"click\", this.markImgToDelete);\r\n    });\r\n\r\n    this.gallery.nodes.deletePanel.classList.remove(\"hide\");\r\n  }\r\n\r\n  disableDeleteMode() {\r\n    this.gallery.nodes.imagesArea.querySelectorAll(\"img\").forEach((img) => {\r\n      img.classList.remove(\"gallery__img_delete\");\r\n      img.removeEventListener(\"click\", this.markImgToDelete);\r\n    });\r\n\r\n    this.gallery.nodes.deletePanel.classList.add(\"hide\");\r\n  }\r\n\r\n  markImgToDelete(event) {\r\n    event.target.classList.add(\"gallery__img_delete\");\r\n  }\r\n\r\n  initDrag() {\r\n    let dropArea = this.gallery.nodes.imagesArea;\r\n    let dropInitial = this.gallery.nodes.drop;\r\n    let dragOver = (event) => {\r\n      event.dataTransfer.dropEffect = \"move\";\r\n      event.returnValue = false;\r\n      return;\r\n    };\r\n\r\n    let dropImage = (e) => {\r\n      e.preventDefault();\r\n      e.stopPropagation();\r\n      let files = e.dataTransfer.files;\r\n\r\n      for (var i = 0; i < files.length; i++) {\r\n        let file = files[i];\r\n        if (file.type.indexOf(\"image\") == 0) {\r\n          let reader = new FileReader();\r\n          reader.onload = (e) => {\r\n            let url = e.target.result;\r\n            this.gallery.imageLoader.loadFromUrl(url);\r\n          };\r\n          reader.readAsDataURL(file);\r\n        }\r\n      }\r\n    };\r\n\r\n    dropArea.addEventListener(\"drop\", dropImage, false);\r\n    dropArea.addEventListener(\"dragover\", dragOver, false);\r\n\r\n    dropInitial.addEventListener(\"drop\", (event) => {\r\n      dropImage(event);\r\n      dropInitial.classList.remove(\"drop\");\r\n    });\r\n    dropInitial.addEventListener(\"dragover\", dragOver, false);\r\n    dropInitial.addEventListener(\"dragenter\", () => {\r\n      dropInitial.classList.add(\"drop\");\r\n    });\r\n\r\n    dropInitial.addEventListener(\"dragleave\", () => {\r\n      dropInitial.classList.remove(\"drop\");\r\n    });\r\n  }\r\n\r\n  addImageToLoadList(img) {\r\n    this.loadList.wait.push(img);\r\n    this.loadList.total.push(img);\r\n    this.printStatus(\"load\");\r\n  }\r\n\r\n  removeImageFromLoadList(img) {\r\n    this.loadList.wait.splice(this.loadList.wait.indexOf(img), 1);\r\n    this.printStatus(\"load\");\r\n  }\r\n\r\n  printStatus(status) {\r\n    if (status == \"load\") {\r\n      let total = this.loadList.total.length;\r\n      let current = total - this.loadList.wait.length;\r\n      if (total !== current) {\r\n        this.gallery.nodes.statusBar.classList.remove(\"hide\");\r\n      } else {\r\n        this.gallery.nodes.statusBar.classList.add(\"hide\");\r\n      }\r\n      let loader = '<svg class=\"gallery__loader\" viewBox=\"0 0 38 38\" stroke=\"#fff\"><g fill=\"none\" fill-rule=\"evenodd\"><g transform=\"translate(1 1)\" stroke-width=\"2\"><circle stroke-opacity=\".5\" cx=\"18\" cy=\"18\" r=\"18\"/><path d=\"M36 18c0-9.94-8.06-18-18-18\"><animateTransform attributeName=\"transform\" type=\"rotate\" from=\"0 18 18\" to=\"360 18 18\" dur=\"1s\" repeatCount=\"indefinite\"/></path></g></g></svg>';\r\n      this.gallery.nodes.statusBar.innerHTML = `<div class=\"gallery__status-text\">Загрузка изображений...</div><div class=\"gallery__status-count\">${current}  /  ${total} </div> ${loader}`;\r\n    }\r\n  }\r\n\r\n  displayError(err) {\r\n    let errorNode = this.gallery.nodes.errorPanel;\r\n    errorNode.classList.remove(\"hide\");\r\n    errorNode.innerText = err;\r\n    setTimeout(() => {\r\n      errorNode.classList.add(\"hide\");\r\n    }, 5000);\r\n  }\r\n}\r\n\n\n//# sourceURL=webpack://Gallery/./js/UI.js?");

/***/ }),

/***/ "./js/gallery.js":
/*!***********************!*\
  !*** ./js/gallery.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Gallery)\n/* harmony export */ });\n/* harmony import */ var _UI__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./UI */ \"./js/UI.js\");\n/* harmony import */ var _ImageLoader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ImageLoader */ \"./js/ImageLoader.js\");\n/* harmony import */ var _Representation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Representation */ \"./js/Representation.js\");\n/* harmony import */ var _less_gallery_less__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../less/gallery.less */ \"./less/gallery.less\");\n\r\n\r\n\r\n\r\n\r\nclass Gallery {\r\n  constructor() {\r\n    this.ui = new _UI__WEBPACK_IMPORTED_MODULE_0__.default(this);\r\n    this.imageLoader = new _ImageLoader__WEBPACK_IMPORTED_MODULE_1__.default(this);\r\n    this.representation = new _Representation__WEBPACK_IMPORTED_MODULE_2__.default(this);\r\n    window.onload = () => {\r\n      this.init();\r\n    };\r\n\r\n    this.imageOffset = 5;\r\n  }\r\n\r\n  init() {\r\n    this.nodes = new Object();\r\n    this.nodes.gallery = document.querySelector(\".gallery\");\r\n    this.nodes.panel = this.nodes.gallery.querySelector(\".gallery__panel\");\r\n    this.nodes.fileInput = this.nodes.panel.querySelector(\".gallery__file-input\");\r\n    this.nodes.uploadFile = this.nodes.panel.querySelector(\".gallery__upload-file\");\r\n    this.nodes.deleteButton = this.nodes.panel.querySelector(\".gallery__delete-button\");\r\n    this.nodes.drop = this.nodes.gallery.querySelector(\".gallery__drop\");\r\n    this.nodes.imagesArea = this.nodes.gallery.querySelector(\".gallery__images-area\");\r\n    this.nodes.statusBar = this.nodes.gallery.querySelector(\".gallery__status-bar\");\r\n    this.nodes.errorPanel = this.nodes.gallery.querySelector(\".gallery__error-panel\");\r\n    this.nodes.deletePanel = this.nodes.gallery.querySelector(\".gallery__delete-panel\");\r\n    this.nodes.deleteSelected = this.nodes.gallery.querySelector(\".gallery__delete-selected\");\r\n    this.nodes.deleteCancel = this.nodes.gallery.querySelector(\".gallery__delete-cancel\");\r\n\r\n    this.ui.init();\r\n    this.imageLoader.init();\r\n    this.representation.init();\r\n  }\r\n}\r\n\n\n//# sourceURL=webpack://Gallery/./js/gallery.js?");

/***/ }),

/***/ "./less/gallery.less":
/*!***************************!*\
  !*** ./less/gallery.less ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://Gallery/./less/gallery.less?");

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
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./js/gallery.js");
/******/ 	__webpack_exports__ = __webpack_exports__.default;
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});