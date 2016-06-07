/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/// <reference path="mithril.d.ts" />
	"use strict";
	var m = __webpack_require__(2);
	(function () {
	    'use strict';
	    var controller = function () {
	        var messages = m.prop([]);
	        var text = m.prop("");
	        var pushMessage = function (msg) {
	            messages().push(msg); // 破壊的変更死ね
	            m.redraw.strategy("all");
	        };
	        var conn = new WebSocket('ws://localhost:9080/room/any?name=someone');
	        conn.onopen = function (e) {
	            console.log("socket open!");
	        };
	        conn.onerror = function (e) {
	            console.log(e);
	            // 何か再接続の処理とか取れば良いのかな
	        };
	        conn.onmessage = function (e) {
	            console.log("receive message: " + e.data);
	            pushMessage(e.data);
	        };
	        return {
	            messages: messages,
	            text: text,
	            sendMessage: function () {
	                var t = text();
	                text("");
	                console.log("message " + t + " is sent!");
	                conn.send(t);
	                pushMessage(t);
	            }
	        };
	    };
	    var view = function (ctrl) {
	        return m("div", [
	            m("div", [
	                m("input[type=text]", { oninput: m.withAttr("value", ctrl.text) }),
	                m("button", { onclick: ctrl.sendMessage }, "送信")
	            ]),
	            m("div", [
	                m("ul", ctrl.messages().map(function (msg) {
	                    return m("li", msg);
	                }))
	            ])
	        ]);
	    };
	    m.mount(document.getElementById("content"), { controller: controller, view: view });
	})();


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(module) {;(function (global, factory) { // eslint-disable-line
		"use strict"
		/* eslint-disable no-undef */
		var m = factory(global)
		if (typeof module === "object" && module != null && module.exports) {
			module.exports = m
		} else if (true) {
			!(__WEBPACK_AMD_DEFINE_RESULT__ = function () { return m }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))
		} else {
			global.m = m
		}
		/* eslint-enable no-undef */
	})(typeof window !== "undefined" ? window : this, function (global, undefined) { // eslint-disable-line
		"use strict"
	
		m.version = function () {
			return "v0.2.5"
		}
	
		var hasOwn = {}.hasOwnProperty
		var type = {}.toString
	
		function isFunction(object) {
			return typeof object === "function"
		}
	
		function isObject(object) {
			return type.call(object) === "[object Object]"
		}
	
		function isString(object) {
			return type.call(object) === "[object String]"
		}
	
		var isArray = Array.isArray || function (object) {
			return type.call(object) === "[object Array]"
		}
	
		function noop() {}
	
		var voidElements = {
			AREA: 1,
			BASE: 1,
			BR: 1,
			COL: 1,
			COMMAND: 1,
			EMBED: 1,
			HR: 1,
			IMG: 1,
			INPUT: 1,
			KEYGEN: 1,
			LINK: 1,
			META: 1,
			PARAM: 1,
			SOURCE: 1,
			TRACK: 1,
			WBR: 1
		}
	
		// caching commonly used variables
		var $document, $location, $requestAnimationFrame, $cancelAnimationFrame
	
		// self invoking function needed because of the way mocks work
		function initialize(mock) {
			$document = mock.document
			$location = mock.location
			$cancelAnimationFrame = mock.cancelAnimationFrame || mock.clearTimeout
			$requestAnimationFrame = mock.requestAnimationFrame || mock.setTimeout
		}
	
		// testing API
		m.deps = function (mock) {
			initialize(global = mock || window)
			return global
		}
	
		m.deps(global)
	
		/**
		 * @typedef {String} Tag
		 * A string that looks like -> div.classname#id[param=one][param2=two]
		 * Which describes a DOM node
		 */
	
		function parseTagAttrs(cell, tag) {
			var classes = []
			var parser = /(?:(^|#|\.)([^#\.\[\]]+))|(\[.+?\])/g
			var match
	
			while ((match = parser.exec(tag))) {
				if (match[1] === "" && match[2]) {
					cell.tag = match[2]
				} else if (match[1] === "#") {
					cell.attrs.id = match[2]
				} else if (match[1] === ".") {
					classes.push(match[2])
				} else if (match[3][0] === "[") {
					var pair = /\[(.+?)(?:=("|'|)(.*?)\2)?\]/.exec(match[3])
					cell.attrs[pair[1]] = pair[3] || ""
				}
			}
	
			return classes
		}
	
		function getVirtualChildren(args, hasAttrs) {
			var children = hasAttrs ? args.slice(1) : args
	
			if (children.length === 1 && isArray(children[0])) {
				return children[0]
			} else {
				return children
			}
		}
	
		function assignAttrs(target, attrs, classes) {
			var classAttr = "class" in attrs ? "class" : "className"
	
			for (var attrName in attrs) {
				if (hasOwn.call(attrs, attrName)) {
					if (attrName === classAttr &&
							attrs[attrName] != null &&
							attrs[attrName] !== "") {
						classes.push(attrs[attrName])
						// create key in correct iteration order
						target[attrName] = ""
					} else {
						target[attrName] = attrs[attrName]
					}
				}
			}
	
			if (classes.length) target[classAttr] = classes.join(" ")
		}
	
		/**
		 *
		 * @param {Tag} The DOM node tag
		 * @param {Object=[]} optional key-value pairs to be mapped to DOM attrs
		 * @param {...mNode=[]} Zero or more Mithril child nodes. Can be an array,
		 *                      or splat (optional)
		 */
		function m(tag, pairs) {
			var args = []
	
			for (var i = 1, length = arguments.length; i < length; i++) {
				args[i - 1] = arguments[i]
			}
	
			if (isObject(tag)) return parameterize(tag, args)
	
			if (!isString(tag)) {
				throw new Error("selector in m(selector, attrs, children) should " +
					"be a string")
			}
	
			var hasAttrs = pairs != null && isObject(pairs) &&
				!("tag" in pairs || "view" in pairs || "subtree" in pairs)
	
			var attrs = hasAttrs ? pairs : {}
			var cell = {
				tag: "div",
				attrs: {},
				children: getVirtualChildren(args, hasAttrs)
			}
	
			assignAttrs(cell.attrs, attrs, parseTagAttrs(cell, tag))
			return cell
		}
	
		function forEach(list, f) {
			for (var i = 0; i < list.length && !f(list[i], i++);) {
				// function called in condition
			}
		}
	
		function forKeys(list, f) {
			forEach(list, function (attrs, i) {
				return (attrs = attrs && attrs.attrs) &&
					attrs.key != null &&
					f(attrs, i)
			})
		}
		// This function was causing deopts in Chrome.
		function dataToString(data) {
			// data.toString() might throw or return null if data is the return
			// value of Console.log in some versions of Firefox (behavior depends on
			// version)
			try {
				if (data != null && data.toString() != null) return data
			} catch (e) {
				// silently ignore errors
			}
			return ""
		}
	
		// This function was causing deopts in Chrome.
		function injectTextNode(parentElement, first, index, data) {
			try {
				insertNode(parentElement, first, index)
				first.nodeValue = data
			} catch (e) {
				// IE erroneously throws error when appending an empty text node
				// after a null
			}
		}
	
		function flatten(list) {
			// recursively flatten array
			for (var i = 0; i < list.length; i++) {
				if (isArray(list[i])) {
					list = list.concat.apply([], list)
					// check current index again and flatten until there are no more
					// nested arrays at that index
					i--
				}
			}
			return list
		}
	
		function insertNode(parentElement, node, index) {
			parentElement.insertBefore(node,
				parentElement.childNodes[index] || null)
		}
	
		var DELETION = 1
		var INSERTION = 2
		var MOVE = 3
	
		function handleKeysDiffer(data, existing, cached, parentElement) {
			forKeys(data, function (key, i) {
				existing[key = key.key] = existing[key] ? {
					action: MOVE,
					index: i,
					from: existing[key].index,
					element: cached.nodes[existing[key].index] ||
						$document.createElement("div")
				} : {action: INSERTION, index: i}
			})
	
			var actions = []
			for (var prop in existing) {
				if (hasOwn.call(existing, prop)) {
					actions.push(existing[prop])
				}
			}
	
			var changes = actions.sort(sortChanges)
			var newCached = new Array(cached.length)
	
			newCached.nodes = cached.nodes.slice()
	
			forEach(changes, function (change) {
				var index = change.index
				if (change.action === DELETION) {
					clear(cached[index].nodes, cached[index])
					newCached.splice(index, 1)
				}
				if (change.action === INSERTION) {
					var dummy = $document.createElement("div")
					dummy.key = data[index].attrs.key
					insertNode(parentElement, dummy, index)
					newCached.splice(index, 0, {
						attrs: {key: data[index].attrs.key},
						nodes: [dummy]
					})
					newCached.nodes[index] = dummy
				}
	
				if (change.action === MOVE) {
					var changeElement = change.element
					var maybeChanged = parentElement.childNodes[index]
					if (maybeChanged !== changeElement && changeElement !== null) {
						parentElement.insertBefore(changeElement,
							maybeChanged || null)
					}
					newCached[index] = cached[change.from]
					newCached.nodes[index] = changeElement
				}
			})
	
			return newCached
		}
	
		function diffKeys(data, cached, existing, parentElement) {
			var keysDiffer = data.length !== cached.length
	
			if (!keysDiffer) {
				forKeys(data, function (attrs, i) {
					var cachedCell = cached[i]
					return keysDiffer = cachedCell &&
						cachedCell.attrs &&
						cachedCell.attrs.key !== attrs.key
				})
			}
	
			if (keysDiffer) {
				return handleKeysDiffer(data, existing, cached, parentElement)
			} else {
				return cached
			}
		}
	
		function diffArray(data, cached, nodes) {
			// diff the array itself
	
			// update the list of DOM nodes by collecting the nodes from each item
			forEach(data, function (_, i) {
				if (cached[i] != null) nodes.push.apply(nodes, cached[i].nodes)
			})
			// remove items from the end of the array if the new array is shorter
			// than the old one. if errors ever happen here, the issue is most
			// likely a bug in the construction of the `cached` data structure
			// somewhere earlier in the program
			forEach(cached.nodes, function (node, i) {
				if (node.parentNode != null && nodes.indexOf(node) < 0) {
					clear([node], [cached[i]])
				}
			})
	
			if (data.length < cached.length) cached.length = data.length
			cached.nodes = nodes
		}
	
		function buildArrayKeys(data) {
			var guid = 0
			forKeys(data, function () {
				forEach(data, function (attrs) {
					if ((attrs = attrs && attrs.attrs) && attrs.key == null) {
						attrs.key = "__mithril__" + guid++
					}
				})
				return 1
			})
		}
	
		function isDifferentEnough(data, cached, dataAttrKeys) {
			if (data.tag !== cached.tag) return true
	
			if (dataAttrKeys.sort().join() !==
					Object.keys(cached.attrs).sort().join()) {
				return true
			}
	
			if (data.attrs.id !== cached.attrs.id) {
				return true
			}
	
			if (data.attrs.key !== cached.attrs.key) {
				return true
			}
	
			if (m.redraw.strategy() === "all") {
				return !cached.configContext || cached.configContext.retain !== true
			}
	
			if (m.redraw.strategy() === "diff") {
				return cached.configContext && cached.configContext.retain === false
			}
	
			return false
		}
	
		function maybeRecreateObject(data, cached, dataAttrKeys) {
			// if an element is different enough from the one in cache, recreate it
			if (isDifferentEnough(data, cached, dataAttrKeys)) {
				if (cached.nodes.length) clear(cached.nodes)
	
				if (cached.configContext &&
						isFunction(cached.configContext.onunload)) {
					cached.configContext.onunload()
				}
	
				if (cached.controllers) {
					forEach(cached.controllers, function (controller) {
						if (controller.onunload) {
							controller.onunload({preventDefault: noop})
						}
					})
				}
			}
		}
	
		function getObjectNamespace(data, namespace) {
			if (data.attrs.xmlns) return data.attrs.xmlns
			if (data.tag === "svg") return "http://www.w3.org/2000/svg"
			if (data.tag === "math") return "http://www.w3.org/1998/Math/MathML"
			return namespace
		}
	
		var pendingRequests = 0
		m.startComputation = function () { pendingRequests++ }
		m.endComputation = function () {
			if (pendingRequests > 1) {
				pendingRequests--
			} else {
				pendingRequests = 0
				m.redraw()
			}
		}
	
		function unloadCachedControllers(cached, views, controllers) {
			if (controllers.length) {
				cached.views = views
				cached.controllers = controllers
				forEach(controllers, function (controller) {
					if (controller.onunload && controller.onunload.$old) {
						controller.onunload = controller.onunload.$old
					}
	
					if (pendingRequests && controller.onunload) {
						var onunload = controller.onunload
						controller.onunload = noop
						controller.onunload.$old = onunload
					}
				})
			}
		}
	
		function scheduleConfigsToBeCalled(configs, data, node, isNew, cached) {
			// schedule configs to be called. They are called after `build` finishes
			// running
			if (isFunction(data.attrs.config)) {
				var context = cached.configContext = cached.configContext || {}
	
				// bind
				configs.push(function () {
					return data.attrs.config.call(data, node, !isNew, context,
						cached)
				})
			}
		}
	
		function buildUpdatedNode(
			cached,
			data,
			editable,
			hasKeys,
			namespace,
			views,
			configs,
			controllers
		) {
			var node = cached.nodes[0]
	
			if (hasKeys) {
				setAttributes(node, data.tag, data.attrs, cached.attrs, namespace)
			}
	
			cached.children = build(
				node,
				data.tag,
				undefined,
				undefined,
				data.children,
				cached.children,
				false,
				0,
				data.attrs.contenteditable ? node : editable,
				namespace,
				configs
			)
	
			cached.nodes.intact = true
	
			if (controllers.length) {
				cached.views = views
				cached.controllers = controllers
			}
	
			return node
		}
	
		function handleNonexistentNodes(data, parentElement, index) {
			var nodes
			if (data.$trusted) {
				nodes = injectHTML(parentElement, index, data)
			} else {
				nodes = [$document.createTextNode(data)]
				if (!(parentElement.nodeName in voidElements)) {
					insertNode(parentElement, nodes[0], index)
				}
			}
	
			var cached
	
			if (typeof data === "string" ||
					typeof data === "number" ||
					typeof data === "boolean") {
				cached = new data.constructor(data)
			} else {
				cached = data
			}
	
			cached.nodes = nodes
			return cached
		}
	
		function reattachNodes(
			data,
			cached,
			parentElement,
			editable,
			index,
			parentTag
		) {
			var nodes = cached.nodes
			if (!editable || editable !== $document.activeElement) {
				if (data.$trusted) {
					clear(nodes, cached)
					nodes = injectHTML(parentElement, index, data)
				} else if (parentTag === "textarea") {
					// <textarea> uses `value` instead of `nodeValue`.
					parentElement.value = data
				} else if (editable) {
					// contenteditable nodes use `innerHTML` instead of `nodeValue`.
					editable.innerHTML = data
				} else {
					// was a trusted string
					if (nodes[0].nodeType === 1 || nodes.length > 1 ||
							(nodes[0].nodeValue.trim &&
								!nodes[0].nodeValue.trim())) {
						clear(cached.nodes, cached)
						nodes = [$document.createTextNode(data)]
					}
	
					injectTextNode(parentElement, nodes[0], index, data)
				}
			}
			cached = new data.constructor(data)
			cached.nodes = nodes
			return cached
		}
	
		function handleTextNode(
			cached,
			data,
			index,
			parentElement,
			shouldReattach,
			editable,
			parentTag
		) {
			if (!cached.nodes.length) {
				return handleNonexistentNodes(data, parentElement, index)
			} else if (cached.valueOf() !== data.valueOf() || shouldReattach) {
				return reattachNodes(data, cached, parentElement, editable, index,
					parentTag)
			} else {
				return (cached.nodes.intact = true, cached)
			}
		}
	
		function getSubArrayCount(item) {
			if (item.$trusted) {
				// fix offset of next element if item was a trusted string w/ more
				// than one html element
				// the first clause in the regexp matches elements
				// the second clause (after the pipe) matches text nodes
				var match = item.match(/<[^\/]|\>\s*[^<]/g)
				if (match != null) return match.length
			} else if (isArray(item)) {
				return item.length
			}
			return 1
		}
	
		function buildArray(
			data,
			cached,
			parentElement,
			index,
			parentTag,
			shouldReattach,
			editable,
			namespace,
			configs
		) {
			data = flatten(data)
			var nodes = []
			var intact = cached.length === data.length
			var subArrayCount = 0
	
			// keys algorithm: sort elements without recreating them if keys are
			// present
			//
			// 1) create a map of all existing keys, and mark all for deletion
			// 2) add new keys to map and mark them for addition
			// 3) if key exists in new list, change action from deletion to a move
			// 4) for each key, handle its corresponding action as marked in
			//    previous steps
	
			var existing = {}
			var shouldMaintainIdentities = false
	
			forKeys(cached, function (attrs, i) {
				shouldMaintainIdentities = true
				existing[cached[i].attrs.key] = {action: DELETION, index: i}
			})
	
			buildArrayKeys(data)
			if (shouldMaintainIdentities) {
				cached = diffKeys(data, cached, existing, parentElement)
			}
			// end key algorithm
	
			var cacheCount = 0
			// faster explicitly written
			for (var i = 0, len = data.length; i < len; i++) {
				// diff each item in the array
				var item = build(
					parentElement,
					parentTag,
					cached,
					index,
					data[i],
					cached[cacheCount],
					shouldReattach,
					index + subArrayCount || subArrayCount,
					editable,
					namespace,
					configs)
	
				if (item !== undefined) {
					intact = intact && item.nodes.intact
					subArrayCount += getSubArrayCount(item)
					cached[cacheCount++] = item
				}
			}
	
			if (!intact) diffArray(data, cached, nodes)
			return cached
		}
	
		function makeCache(data, cached, index, parentIndex, parentCache) {
			if (cached != null) {
				if (type.call(cached) === type.call(data)) return cached
	
				if (parentCache && parentCache.nodes) {
					var offset = index - parentIndex
					var end = offset + (isArray(data) ? data : cached.nodes).length
					clear(
						parentCache.nodes.slice(offset, end),
						parentCache.slice(offset, end))
				} else if (cached.nodes) {
					clear(cached.nodes, cached)
				}
			}
	
			cached = new data.constructor()
			// if constructor creates a virtual dom element, use a blank object as
			// the base cached node instead of copying the virtual el (#277)
			if (cached.tag) cached = {}
			cached.nodes = []
			return cached
		}
	
		function constructNode(data, namespace) {
			if (data.attrs.is) {
				if (namespace == null) {
					return $document.createElement(data.tag, data.attrs.is)
				} else {
					return $document.createElementNS(namespace, data.tag,
						data.attrs.is)
				}
			} else if (namespace == null) {
				return $document.createElement(data.tag)
			} else {
				return $document.createElementNS(namespace, data.tag)
			}
		}
	
		function constructAttrs(data, node, namespace, hasKeys) {
			if (hasKeys) {
				return setAttributes(node, data.tag, data.attrs, {}, namespace)
			} else {
				return data.attrs
			}
		}
	
		function constructChildren(
			data,
			node,
			cached,
			editable,
			namespace,
			configs
		) {
			if (data.children != null && data.children.length > 0) {
				return build(
					node,
					data.tag,
					undefined,
					undefined,
					data.children,
					cached.children,
					true,
					0,
					data.attrs.contenteditable ? node : editable,
					namespace,
					configs)
			} else {
				return data.children
			}
		}
	
		function reconstructCached(
			data,
			attrs,
			children,
			node,
			namespace,
			views,
			controllers
		) {
			var cached = {
				tag: data.tag,
				attrs: attrs,
				children: children,
				nodes: [node]
			}
	
			unloadCachedControllers(cached, views, controllers)
	
			if (cached.children && !cached.children.nodes) {
				cached.children.nodes = []
			}
	
			// edge case: setting value on <select> doesn't work before children
			// exist, so set it again after children have been created
			if (data.tag === "select" && "value" in data.attrs) {
				setAttributes(node, data.tag, {value: data.attrs.value}, {},
					namespace)
			}
	
			return cached
		}
	
		function getController(views, view, cachedControllers, controller) {
			var controllerIndex
	
			if (m.redraw.strategy() === "diff" && views) {
				controllerIndex = views.indexOf(view)
			} else {
				controllerIndex = -1
			}
	
			if (controllerIndex > -1) {
				return cachedControllers[controllerIndex]
			} else if (isFunction(controller)) {
				return new controller()
			} else {
				return {}
			}
		}
	
		var unloaders = []
	
		function updateLists(views, controllers, view, controller) {
			if (controller.onunload != null &&
					unloaders.map(function (u) { return u.handler })
						.indexOf(controller.onunload) < 0) {
				unloaders.push({
					controller: controller,
					handler: controller.onunload
				})
			}
	
			views.push(view)
			controllers.push(controller)
		}
	
		var forcing = false
		function checkView(
			data,
			view,
			cached,
			cachedControllers,
			controllers,
			views
		) {
			var controller = getController(
				cached.views,
				view,
				cachedControllers,
				data.controller)
	
			var key = data && data.attrs && data.attrs.key
	
			if (pendingRequests === 0 ||
					forcing ||
					cachedControllers &&
						cachedControllers.indexOf(controller) > -1) {
				data = data.view(controller)
			} else {
				data = {tag: "placeholder"}
			}
	
			if (data.subtree === "retain") return data
			data.attrs = data.attrs || {}
			data.attrs.key = key
			updateLists(views, controllers, view, controller)
			return data
		}
	
		function markViews(data, cached, views, controllers) {
			var cachedControllers = cached && cached.controllers
	
			while (data.view != null) {
				data = checkView(
					data,
					data.view.$original || data.view,
					cached,
					cachedControllers,
					controllers,
					views)
			}
	
			return data
		}
	
		function buildObject( // eslint-disable-line max-statements
			data,
			cached,
			editable,
			parentElement,
			index,
			shouldReattach,
			namespace,
			configs
		) {
			var views = []
			var controllers = []
	
			data = markViews(data, cached, views, controllers)
	
			if (data.subtree === "retain") return cached
	
			if (!data.tag && controllers.length) {
				throw new Error("Component template must return a virtual " +
					"element, not an array, string, etc.")
			}
	
			data.attrs = data.attrs || {}
			cached.attrs = cached.attrs || {}
	
			var dataAttrKeys = Object.keys(data.attrs)
			var hasKeys = dataAttrKeys.length > ("key" in data.attrs ? 1 : 0)
	
			maybeRecreateObject(data, cached, dataAttrKeys)
	
			if (!isString(data.tag)) return
	
			var isNew = cached.nodes.length === 0
	
			namespace = getObjectNamespace(data, namespace)
	
			var node
			if (isNew) {
				node = constructNode(data, namespace)
				// set attributes first, then create children
				var attrs = constructAttrs(data, node, namespace, hasKeys)
	
				// add the node to its parent before attaching children to it
				insertNode(parentElement, node, index)
	
				var children = constructChildren(data, node, cached, editable,
					namespace, configs)
	
				cached = reconstructCached(
					data,
					attrs,
					children,
					node,
					namespace,
					views,
					controllers)
			} else {
				node = buildUpdatedNode(
					cached,
					data,
					editable,
					hasKeys,
					namespace,
					views,
					configs,
					controllers)
			}
	
			if (!isNew && shouldReattach === true && node != null) {
				insertNode(parentElement, node, index)
			}
	
			// The configs are called after `build` finishes running
			scheduleConfigsToBeCalled(configs, data, node, isNew, cached)
	
			return cached
		}
	
		function build(
			parentElement,
			parentTag,
			parentCache,
			parentIndex,
			data,
			cached,
			shouldReattach,
			index,
			editable,
			namespace,
			configs
		) {
			/*
			 * `build` is a recursive function that manages creation/diffing/removal
			 * of DOM elements based on comparison between `data` and `cached` the
			 * diff algorithm can be summarized as this:
			 *
			 * 1 - compare `data` and `cached`
			 * 2 - if they are different, copy `data` to `cached` and update the DOM
			 *     based on what the difference is
			 * 3 - recursively apply this algorithm for every array and for the
			 *     children of every virtual element
			 *
			 * The `cached` data structure is essentially the same as the previous
			 * redraw's `data` data structure, with a few additions:
			 * - `cached` always has a property called `nodes`, which is a list of
			 *    DOM elements that correspond to the data represented by the
			 *    respective virtual element
			 * - in order to support attaching `nodes` as a property of `cached`,
			 *    `cached` is *always* a non-primitive object, i.e. if the data was
			 *    a string, then cached is a String instance. If data was `null` or
			 *    `undefined`, cached is `new String("")`
			 * - `cached also has a `configContext` property, which is the state
			 *    storage object exposed by config(element, isInitialized, context)
			 * - when `cached` is an Object, it represents a virtual element; when
			 *    it's an Array, it represents a list of elements; when it's a
			 *    String, Number or Boolean, it represents a text node
			 *
			 * `parentElement` is a DOM element used for W3C DOM API calls
			 * `parentTag` is only used for handling a corner case for textarea
			 * values
			 * `parentCache` is used to remove nodes in some multi-node cases
			 * `parentIndex` and `index` are used to figure out the offset of nodes.
			 * They're artifacts from before arrays started being flattened and are
			 * likely refactorable
			 * `data` and `cached` are, respectively, the new and old nodes being
			 * diffed
			 * `shouldReattach` is a flag indicating whether a parent node was
			 * recreated (if so, and if this node is reused, then this node must
			 * reattach itself to the new parent)
			 * `editable` is a flag that indicates whether an ancestor is
			 * contenteditable
			 * `namespace` indicates the closest HTML namespace as it cascades down
			 * from an ancestor
			 * `configs` is a list of config functions to run after the topmost
			 * `build` call finishes running
			 *
			 * there's logic that relies on the assumption that null and undefined
			 * data are equivalent to empty strings
			 * - this prevents lifecycle surprises from procedural helpers that mix
			 *   implicit and explicit return statements (e.g.
			 *   function foo() {if (cond) return m("div")}
			 * - it simplifies diffing code
			 */
			data = dataToString(data)
			if (data.subtree === "retain") return cached
			cached = makeCache(data, cached, index, parentIndex, parentCache)
	
			if (isArray(data)) {
				return buildArray(
					data,
					cached,
					parentElement,
					index,
					parentTag,
					shouldReattach,
					editable,
					namespace,
					configs)
			} else if (data != null && isObject(data)) {
				return buildObject(
					data,
					cached,
					editable,
					parentElement,
					index,
					shouldReattach,
					namespace,
					configs)
			} else if (!isFunction(data)) {
				return handleTextNode(
					cached,
					data,
					index,
					parentElement,
					shouldReattach,
					editable,
					parentTag)
			} else {
				return cached
			}
		}
	
		function sortChanges(a, b) {
			return a.action - b.action || a.index - b.index
		}
	
		function copyStyleAttrs(node, dataAttr, cachedAttr) {
			for (var rule in dataAttr) {
				if (hasOwn.call(dataAttr, rule)) {
					if (cachedAttr == null || cachedAttr[rule] !== dataAttr[rule]) {
						node.style[rule] = dataAttr[rule]
					}
				}
			}
	
			for (rule in cachedAttr) {
				if (hasOwn.call(cachedAttr, rule)) {
					if (!hasOwn.call(dataAttr, rule)) node.style[rule] = ""
				}
			}
		}
	
		var shouldUseSetAttribute = {
			list: 1,
			style: 1,
			form: 1,
			type: 1,
			width: 1,
			height: 1
		}
	
		function setSingleAttr(
			node,
			attrName,
			dataAttr,
			cachedAttr,
			tag,
			namespace
		) {
			if (attrName === "config" || attrName === "key") {
				// `config` isn't a real attribute, so ignore it
				return true
			} else if (isFunction(dataAttr) && attrName.slice(0, 2) === "on") {
				// hook event handlers to the auto-redrawing system
				node[attrName] = autoredraw(dataAttr, node)
			} else if (attrName === "style" && dataAttr != null &&
					isObject(dataAttr)) {
				// handle `style: {...}`
				copyStyleAttrs(node, dataAttr, cachedAttr)
			} else if (namespace != null) {
				// handle SVG
				if (attrName === "href") {
					node.setAttributeNS("http://www.w3.org/1999/xlink",
						"href", dataAttr)
				} else {
					node.setAttribute(
						attrName === "className" ? "class" : attrName,
						dataAttr)
				}
			} else if (attrName in node && !shouldUseSetAttribute[attrName]) {
				// handle cases that are properties (but ignore cases where we
				// should use setAttribute instead)
				//
				// - list and form are typically used as strings, but are DOM
				//   element references in js
				//
				// - when using CSS selectors (e.g. `m("[style='']")`), style is
				//   used as a string, but it's an object in js
				//
				// #348 don't set the value if not needed - otherwise, cursor
				// placement breaks in Chrome
				try {
					if (tag !== "input" || node[attrName] !== dataAttr) {
						node[attrName] = dataAttr
					}
				} catch (e) {
					node.setAttribute(attrName, dataAttr)
				}
			}
			else node.setAttribute(attrName, dataAttr)
		}
	
		function trySetAttr(
			node,
			attrName,
			dataAttr,
			cachedAttr,
			cachedAttrs,
			tag,
			namespace
		) {
			if (!(attrName in cachedAttrs) || (cachedAttr !== dataAttr) || ($document.activeElement === node)) {
				cachedAttrs[attrName] = dataAttr
				try {
					return setSingleAttr(
						node,
						attrName,
						dataAttr,
						cachedAttr,
						tag,
						namespace)
				} catch (e) {
					// swallow IE's invalid argument errors to mimic HTML's
					// fallback-to-doing-nothing-on-invalid-attributes behavior
					if (e.message.indexOf("Invalid argument") < 0) throw e
				}
			} else if (attrName === "value" && tag === "input" &&
					node.value !== dataAttr) {
				// #348 dataAttr may not be a string, so use loose comparison
				node.value = dataAttr
			}
		}
	
		function setAttributes(node, tag, dataAttrs, cachedAttrs, namespace) {
			for (var attrName in dataAttrs) {
				if (hasOwn.call(dataAttrs, attrName)) {
					if (trySetAttr(
							node,
							attrName,
							dataAttrs[attrName],
							cachedAttrs[attrName],
							cachedAttrs,
							tag,
							namespace)) {
						continue
					}
				}
			}
			return cachedAttrs
		}
	
		function clear(nodes, cached) {
			for (var i = nodes.length - 1; i > -1; i--) {
				if (nodes[i] && nodes[i].parentNode) {
					try {
						nodes[i].parentNode.removeChild(nodes[i])
					} catch (e) {
						/* eslint-disable max-len */
						// ignore if this fails due to order of events (see
						// http://stackoverflow.com/questions/21926083/failed-to-execute-removechild-on-node)
						/* eslint-enable max-len */
					}
					cached = [].concat(cached)
					if (cached[i]) unload(cached[i])
				}
			}
			// release memory if nodes is an array. This check should fail if nodes
			// is a NodeList (see loop above)
			if (nodes.length) {
				nodes.length = 0
			}
		}
	
		function unload(cached) {
			if (cached.configContext && isFunction(cached.configContext.onunload)) {
				cached.configContext.onunload()
				cached.configContext.onunload = null
			}
			if (cached.controllers) {
				forEach(cached.controllers, function (controller) {
					if (isFunction(controller.onunload)) {
						controller.onunload({preventDefault: noop})
					}
				})
			}
			if (cached.children) {
				if (isArray(cached.children)) forEach(cached.children, unload)
				else if (cached.children.tag) unload(cached.children)
			}
		}
	
		function appendTextFragment(parentElement, data) {
			try {
				parentElement.appendChild(
					$document.createRange().createContextualFragment(data))
			} catch (e) {
				parentElement.insertAdjacentHTML("beforeend", data)
				replaceScriptNodes(parentElement)
			}
		}
	
		// Replace script tags inside given DOM element with executable ones.
		// Will also check children recursively and replace any found script
		// tags in same manner.
		function replaceScriptNodes(node) {
			if (node.tagName === "SCRIPT") {
				node.parentNode.replaceChild(buildExecutableNode(node), node)
			} else {
				var children = node.childNodes
				if (children && children.length) {
					for (var i = 0; i < children.length; i++) {
						replaceScriptNodes(children[i])
					}
				}
			}
	
			return node
		}
	
		// Replace script element with one whose contents are executable.
		function buildExecutableNode(node){
			var scriptEl = document.createElement("script")
			var attrs = node.attributes
	
			for (var i = 0; i < attrs.length; i++) {
				scriptEl.setAttribute(attrs[i].name, attrs[i].value)
			}
	
			scriptEl.text = node.innerHTML
			return scriptEl
		}
	
		function injectHTML(parentElement, index, data) {
			var nextSibling = parentElement.childNodes[index]
			if (nextSibling) {
				var isElement = nextSibling.nodeType !== 1
				var placeholder = $document.createElement("span")
				if (isElement) {
					parentElement.insertBefore(placeholder, nextSibling || null)
					placeholder.insertAdjacentHTML("beforebegin", data)
					parentElement.removeChild(placeholder)
				} else {
					nextSibling.insertAdjacentHTML("beforebegin", data)
				}
			} else {
				appendTextFragment(parentElement, data)
			}
	
			var nodes = []
	
			while (parentElement.childNodes[index] !== nextSibling) {
				nodes.push(parentElement.childNodes[index])
				index++
			}
	
			return nodes
		}
	
		function autoredraw(callback, object) {
			return function (e) {
				e = e || event
				m.redraw.strategy("diff")
				m.startComputation()
				try {
					return callback.call(object, e)
				} finally {
					endFirstComputation()
				}
			}
		}
	
		var html
		var documentNode = {
			appendChild: function (node) {
				if (html === undefined) html = $document.createElement("html")
				if ($document.documentElement &&
						$document.documentElement !== node) {
					$document.replaceChild(node, $document.documentElement)
				} else {
					$document.appendChild(node)
				}
	
				this.childNodes = $document.childNodes
			},
	
			insertBefore: function (node) {
				this.appendChild(node)
			},
	
			childNodes: []
		}
	
		var nodeCache = []
		var cellCache = {}
	
		m.render = function (root, cell, forceRecreation) {
			if (!root) {
				throw new Error("Ensure the DOM element being passed to " +
					"m.route/m.mount/m.render is not undefined.")
			}
			var configs = []
			var id = getCellCacheKey(root)
			var isDocumentRoot = root === $document
			var node
	
			if (isDocumentRoot || root === $document.documentElement) {
				node = documentNode
			} else {
				node = root
			}
	
			if (isDocumentRoot && cell.tag !== "html") {
				cell = {tag: "html", attrs: {}, children: cell}
			}
	
			if (cellCache[id] === undefined) clear(node.childNodes)
			if (forceRecreation === true) reset(root)
	
			cellCache[id] = build(
				node,
				null,
				undefined,
				undefined,
				cell,
				cellCache[id],
				false,
				0,
				null,
				undefined,
				configs)
	
			forEach(configs, function (config) { config() })
		}
	
		function getCellCacheKey(element) {
			var index = nodeCache.indexOf(element)
			return index < 0 ? nodeCache.push(element) - 1 : index
		}
	
		m.trust = function (value) {
			value = new String(value) // eslint-disable-line no-new-wrappers
			value.$trusted = true
			return value
		}
	
		function gettersetter(store) {
			function prop() {
				if (arguments.length) store = arguments[0]
				return store
			}
	
			prop.toJSON = function () {
				return store
			}
	
			return prop
		}
	
		m.prop = function (store) {
			if ((store != null && (isObject(store) || isFunction(store)) || ((typeof Promise !== "undefined") && (store instanceof Promise))) &&
					isFunction(store.then)) {
				return propify(store)
			}
	
			return gettersetter(store)
		}
	
		var roots = []
		var components = []
		var controllers = []
		var lastRedrawId = null
		var lastRedrawCallTime = 0
		var computePreRedrawHook = null
		var computePostRedrawHook = null
		var topComponent
		var FRAME_BUDGET = 16 // 60 frames per second = 1 call per 16 ms
	
		function parameterize(component, args) {
			function controller() {
				/* eslint-disable no-invalid-this */
				return (component.controller || noop).apply(this, args) || this
				/* eslint-enable no-invalid-this */
			}
	
			if (component.controller) {
				controller.prototype = component.controller.prototype
			}
	
			function view(ctrl) {
				var currentArgs = [ctrl].concat(args)
				for (var i = 1; i < arguments.length; i++) {
					currentArgs.push(arguments[i])
				}
	
				return component.view.apply(component, currentArgs)
			}
	
			view.$original = component.view
			var output = {controller: controller, view: view}
			if (args[0] && args[0].key != null) output.attrs = {key: args[0].key}
			return output
		}
	
		m.component = function (component) {
			var args = new Array(arguments.length - 1)
	
			for (var i = 1; i < arguments.length; i++) {
				args[i - 1] = arguments[i]
			}
	
			return parameterize(component, args)
		}
	
		function checkPrevented(component, root, index, isPrevented) {
			if (!isPrevented) {
				m.redraw.strategy("all")
				m.startComputation()
				roots[index] = root
				var currentComponent
	
				if (component) {
					currentComponent = topComponent = component
				} else {
					currentComponent = topComponent = component = {controller: noop}
				}
	
				var controller = new (component.controller || noop)()
	
				// controllers may call m.mount recursively (via m.route redirects,
				// for example)
				// this conditional ensures only the last recursive m.mount call is
				// applied
				if (currentComponent === topComponent) {
					controllers[index] = controller
					components[index] = component
				}
				endFirstComputation()
				if (component === null) {
					removeRootElement(root, index)
				}
				return controllers[index]
			} else if (component == null) {
				removeRootElement(root, index)
			}
		}
	
		m.mount = m.module = function (root, component) {
			if (!root) {
				throw new Error("Please ensure the DOM element exists before " +
					"rendering a template into it.")
			}
	
			var index = roots.indexOf(root)
			if (index < 0) index = roots.length
	
			var isPrevented = false
			var event = {
				preventDefault: function () {
					isPrevented = true
					computePreRedrawHook = computePostRedrawHook = null
				}
			}
	
			forEach(unloaders, function (unloader) {
				unloader.handler.call(unloader.controller, event)
				unloader.controller.onunload = null
			})
	
			if (isPrevented) {
				forEach(unloaders, function (unloader) {
					unloader.controller.onunload = unloader.handler
				})
			} else {
				unloaders = []
			}
	
			if (controllers[index] && isFunction(controllers[index].onunload)) {
				controllers[index].onunload(event)
			}
	
			return checkPrevented(component, root, index, isPrevented)
		}
	
		function removeRootElement(root, index) {
			roots.splice(index, 1)
			controllers.splice(index, 1)
			components.splice(index, 1)
			reset(root)
			nodeCache.splice(getCellCacheKey(root), 1)
		}
	
		var redrawing = false
		m.redraw = function (force) {
			if (redrawing) return
			redrawing = true
			if (force) forcing = true
	
			try {
				// lastRedrawId is a positive number if a second redraw is requested
				// before the next animation frame
				// lastRedrawId is null if it's the first redraw and not an event
				// handler
				if (lastRedrawId && !force) {
					// when setTimeout: only reschedule redraw if time between now
					// and previous redraw is bigger than a frame, otherwise keep
					// currently scheduled timeout
					// when rAF: always reschedule redraw
					if ($requestAnimationFrame === global.requestAnimationFrame ||
							new Date() - lastRedrawCallTime > FRAME_BUDGET) {
						if (lastRedrawId > 0) $cancelAnimationFrame(lastRedrawId)
						lastRedrawId = $requestAnimationFrame(redraw, FRAME_BUDGET)
					}
				} else {
					redraw()
					lastRedrawId = $requestAnimationFrame(function () {
						lastRedrawId = null
					}, FRAME_BUDGET)
				}
			} finally {
				redrawing = forcing = false
			}
		}
	
		m.redraw.strategy = m.prop()
		function redraw() {
			if (computePreRedrawHook) {
				computePreRedrawHook()
				computePreRedrawHook = null
			}
			forEach(roots, function (root, i) {
				var component = components[i]
				if (controllers[i]) {
					var args = [controllers[i]]
					m.render(root,
						component.view ? component.view(controllers[i], args) : "")
				}
			})
			// after rendering within a routed context, we need to scroll back to
			// the top, and fetch the document title for history.pushState
			if (computePostRedrawHook) {
				computePostRedrawHook()
				computePostRedrawHook = null
			}
			lastRedrawId = null
			lastRedrawCallTime = new Date()
			m.redraw.strategy("diff")
		}
	
		function endFirstComputation() {
			if (m.redraw.strategy() === "none") {
				pendingRequests--
				m.redraw.strategy("diff")
			} else {
				m.endComputation()
			}
		}
	
		m.withAttr = function (prop, withAttrCallback, callbackThis) {
			return function (e) {
				e = e || window.event
				/* eslint-disable no-invalid-this */
				var currentTarget = e.currentTarget || this
				var _this = callbackThis || this
				/* eslint-enable no-invalid-this */
				var target = prop in currentTarget ?
					currentTarget[prop] :
					currentTarget.getAttribute(prop)
				withAttrCallback.call(_this, target)
			}
		}
	
		// routing
		var modes = {pathname: "", hash: "#", search: "?"}
		var redirect = noop
		var isDefaultRoute = false
		var routeParams, currentRoute
	
		m.route = function (root, arg1, arg2, vdom) { // eslint-disable-line
			// m.route()
			if (arguments.length === 0) return currentRoute
			// m.route(el, defaultRoute, routes)
			if (arguments.length === 3 && isString(arg1)) {
				redirect = function (source) {
					var path = currentRoute = normalizeRoute(source)
					if (!routeByValue(root, arg2, path)) {
						if (isDefaultRoute) {
							throw new Error("Ensure the default route matches " +
								"one of the routes defined in m.route")
						}
	
						isDefaultRoute = true
						m.route(arg1, true)
						isDefaultRoute = false
					}
				}
	
				var listener = m.route.mode === "hash" ?
					"onhashchange" :
					"onpopstate"
	
				global[listener] = function () {
					var path = $location[m.route.mode]
					if (m.route.mode === "pathname") path += $location.search
					if (currentRoute !== normalizeRoute(path)) redirect(path)
				}
	
				computePreRedrawHook = setScroll
				global[listener]()
	
				return
			}
	
			// config: m.route
			if (root.addEventListener || root.attachEvent) {
				var base = m.route.mode !== "pathname" ? $location.pathname : ""
				root.href = base + modes[m.route.mode] + vdom.attrs.href
				if (root.addEventListener) {
					root.removeEventListener("click", routeUnobtrusive)
					root.addEventListener("click", routeUnobtrusive)
				} else {
					root.detachEvent("onclick", routeUnobtrusive)
					root.attachEvent("onclick", routeUnobtrusive)
				}
	
				return
			}
			// m.route(route, params, shouldReplaceHistoryEntry)
			if (isString(root)) {
				var oldRoute = currentRoute
				currentRoute = root
	
				var args = arg1 || {}
				var queryIndex = currentRoute.indexOf("?")
				var params
	
				if (queryIndex > -1) {
					params = parseQueryString(currentRoute.slice(queryIndex + 1))
				} else {
					params = {}
				}
	
				for (var i in args) {
					if (hasOwn.call(args, i)) {
						params[i] = args[i]
					}
				}
	
				var querystring = buildQueryString(params)
				var currentPath
	
				if (queryIndex > -1) {
					currentPath = currentRoute.slice(0, queryIndex)
				} else {
					currentPath = currentRoute
				}
	
				if (querystring) {
					currentRoute = currentPath +
						(currentPath.indexOf("?") === -1 ? "?" : "&") +
						querystring
				}
	
				var replaceHistory =
					(arguments.length === 3 ? arg2 : arg1) === true ||
					oldRoute === root
	
				if (global.history.pushState) {
					var method = replaceHistory ? "replaceState" : "pushState"
					computePreRedrawHook = setScroll
					computePostRedrawHook = function () {
						try {
							global.history[method](null, $document.title,
								modes[m.route.mode] + currentRoute)
						} catch (err) {
							// In the event of a pushState or replaceState failure,
							// fallback to a standard redirect. This is specifically
							// to address a Safari security error when attempting to
							// call pushState more than 100 times.
							$location[m.route.mode] = currentRoute
						}
					}
					redirect(modes[m.route.mode] + currentRoute)
				} else {
					$location[m.route.mode] = currentRoute
					redirect(modes[m.route.mode] + currentRoute)
				}
			}
		}
	
		m.route.param = function (key) {
			if (!routeParams) {
				throw new Error("You must call m.route(element, defaultRoute, " +
					"routes) before calling m.route.param()")
			}
	
			if (!key) {
				return routeParams
			}
	
			return routeParams[key]
		}
	
		m.route.mode = "search"
	
		function normalizeRoute(route) {
			return route.slice(modes[m.route.mode].length)
		}
	
		function routeByValue(root, router, path) {
			routeParams = {}
	
			var queryStart = path.indexOf("?")
			if (queryStart !== -1) {
				routeParams = parseQueryString(
					path.substr(queryStart + 1, path.length))
				path = path.substr(0, queryStart)
			}
	
			// Get all routes and check if there's
			// an exact match for the current path
			var keys = Object.keys(router)
			var index = keys.indexOf(path)
	
			if (index !== -1){
				m.mount(root, router[keys [index]])
				return true
			}
	
			for (var route in router) {
				if (hasOwn.call(router, route)) {
					if (route === path) {
						m.mount(root, router[route])
						return true
					}
	
					var matcher = new RegExp("^" + route
						.replace(/:[^\/]+?\.{3}/g, "(.*?)")
						.replace(/:[^\/]+/g, "([^\\/]+)") + "\/?$")
	
					if (matcher.test(path)) {
						/* eslint-disable no-loop-func */
						path.replace(matcher, function () {
							var keys = route.match(/:[^\/]+/g) || []
							var values = [].slice.call(arguments, 1, -2)
							forEach(keys, function (key, i) {
								routeParams[key.replace(/:|\./g, "")] =
									decodeURIComponent(values[i])
							})
							m.mount(root, router[route])
						})
						/* eslint-enable no-loop-func */
						return true
					}
				}
			}
		}
	
		function routeUnobtrusive(e) {
			e = e || event
			if (e.ctrlKey || e.metaKey || e.shiftKey || e.which === 2) return
	
			if (e.preventDefault) {
				e.preventDefault()
			} else {
				e.returnValue = false
			}
	
			var currentTarget = e.currentTarget || e.srcElement
			var args
	
			if (m.route.mode === "pathname" && currentTarget.search) {
				args = parseQueryString(currentTarget.search.slice(1))
			} else {
				args = {}
			}
	
			while (currentTarget && !/a/i.test(currentTarget.nodeName)) {
				currentTarget = currentTarget.parentNode
			}
	
			// clear pendingRequests because we want an immediate route change
			pendingRequests = 0
			m.route(currentTarget[m.route.mode]
				.slice(modes[m.route.mode].length), args)
		}
	
		function setScroll() {
			if (m.route.mode !== "hash" && $location.hash) {
				$location.hash = $location.hash
			} else {
				global.scrollTo(0, 0)
			}
		}
	
		function buildQueryString(object, prefix) {
			var duplicates = {}
			var str = []
	
			for (var prop in object) {
				if (hasOwn.call(object, prop)) {
					var key = prefix ? prefix + "[" + prop + "]" : prop
					var value = object[prop]
	
					if (value === null) {
						str.push(encodeURIComponent(key))
					} else if (isObject(value)) {
						str.push(buildQueryString(value, key))
					} else if (isArray(value)) {
						var keys = []
						duplicates[key] = duplicates[key] || {}
						/* eslint-disable no-loop-func */
						forEach(value, function (item) {
							/* eslint-enable no-loop-func */
							if (!duplicates[key][item]) {
								duplicates[key][item] = true
								keys.push(encodeURIComponent(key) + "=" +
									encodeURIComponent(item))
							}
						})
						str.push(keys.join("&"))
					} else if (value !== undefined) {
						str.push(encodeURIComponent(key) + "=" +
							encodeURIComponent(value))
					}
				}
			}
	
			return str.join("&")
		}
	
		function parseQueryString(str) {
			if (str === "" || str == null) return {}
			if (str.charAt(0) === "?") str = str.slice(1)
	
			var pairs = str.split("&")
			var params = {}
	
			forEach(pairs, function (string) {
				var pair = string.split("=")
				var key = decodeURIComponent(pair[0])
				var value = pair.length === 2 ? decodeURIComponent(pair[1]) : null
				if (params[key] != null) {
					if (!isArray(params[key])) params[key] = [params[key]]
					params[key].push(value)
				}
				else params[key] = value
			})
	
			return params
		}
	
		m.route.buildQueryString = buildQueryString
		m.route.parseQueryString = parseQueryString
	
		function reset(root) {
			var cacheKey = getCellCacheKey(root)
			clear(root.childNodes, cellCache[cacheKey])
			cellCache[cacheKey] = undefined
		}
	
		m.deferred = function () {
			var deferred = new Deferred()
			deferred.promise = propify(deferred.promise)
			return deferred
		}
	
		function propify(promise, initialValue) {
			var prop = m.prop(initialValue)
			promise.then(prop)
			prop.then = function (resolve, reject) {
				return propify(promise.then(resolve, reject), initialValue)
			}
	
			prop.catch = prop.then.bind(null, null)
			return prop
		}
		// Promiz.mithril.js | Zolmeister | MIT
		// a modified version of Promiz.js, which does not conform to Promises/A+
		// for two reasons:
		//
		// 1) `then` callbacks are called synchronously (because setTimeout is too
		//    slow, and the setImmediate polyfill is too big
		//
		// 2) throwing subclasses of Error cause the error to be bubbled up instead
		//    of triggering rejection (because the spec does not account for the
		//    important use case of default browser error handling, i.e. message w/
		//    line number)
	
		var RESOLVING = 1
		var REJECTING = 2
		var RESOLVED = 3
		var REJECTED = 4
	
		function Deferred(onSuccess, onFailure) {
			var self = this
			var state = 0
			var promiseValue = 0
			var next = []
	
			self.promise = {}
	
			self.resolve = function (value) {
				if (!state) {
					promiseValue = value
					state = RESOLVING
	
					fire()
				}
	
				return self
			}
	
			self.reject = function (value) {
				if (!state) {
					promiseValue = value
					state = REJECTING
	
					fire()
				}
	
				return self
			}
	
			self.promise.then = function (onSuccess, onFailure) {
				var deferred = new Deferred(onSuccess, onFailure)
	
				if (state === RESOLVED) {
					deferred.resolve(promiseValue)
				} else if (state === REJECTED) {
					deferred.reject(promiseValue)
				} else {
					next.push(deferred)
				}
	
				return deferred.promise
			}
	
			function finish(type) {
				state = type || REJECTED
				next.map(function (deferred) {
					if (state === RESOLVED) {
						deferred.resolve(promiseValue)
					} else {
						deferred.reject(promiseValue)
					}
				})
			}
	
			function thennable(then, success, failure, notThennable) {
				if (((promiseValue != null && isObject(promiseValue)) ||
						isFunction(promiseValue)) && isFunction(then)) {
					try {
						// count protects against abuse calls from spec checker
						var count = 0
						then.call(promiseValue, function (value) {
							if (count++) return
							promiseValue = value
							success()
						}, function (value) {
							if (count++) return
							promiseValue = value
							failure()
						})
					} catch (e) {
						m.deferred.onerror(e)
						promiseValue = e
						failure()
					}
				} else {
					notThennable()
				}
			}
	
			function fire() {
				// check if it's a thenable
				var then
				try {
					then = promiseValue && promiseValue.then
				} catch (e) {
					m.deferred.onerror(e)
					promiseValue = e
					state = REJECTING
					return fire()
				}
	
				if (state === REJECTING) {
					m.deferred.onerror(promiseValue)
				}
	
				thennable(then, function () {
					state = RESOLVING
					fire()
				}, function () {
					state = REJECTING
					fire()
				}, function () {
					try {
						if (state === RESOLVING && isFunction(onSuccess)) {
							promiseValue = onSuccess(promiseValue)
						} else if (state === REJECTING && isFunction(onFailure)) {
							promiseValue = onFailure(promiseValue)
							state = RESOLVING
						}
					} catch (e) {
						m.deferred.onerror(e)
						promiseValue = e
						return finish()
					}
	
					if (promiseValue === self) {
						promiseValue = TypeError()
						finish()
					} else {
						thennable(then, function () {
							finish(RESOLVED)
						}, finish, function () {
							finish(state === RESOLVING && RESOLVED)
						})
					}
				})
			}
		}
	
		m.deferred.onerror = function (e) {
			if (type.call(e) === "[object Error]" &&
					!/ Error/.test(e.constructor.toString())) {
				pendingRequests = 0
				throw e
			}
		}
	
		m.sync = function (args) {
			var deferred = m.deferred()
			var outstanding = args.length
			var results = []
			var method = "resolve"
	
			function synchronizer(pos, resolved) {
				return function (value) {
					results[pos] = value
					if (!resolved) method = "reject"
					if (--outstanding === 0) {
						deferred.promise(results)
						deferred[method](results)
					}
					return value
				}
			}
	
			if (args.length > 0) {
				forEach(args, function (arg, i) {
					arg.then(synchronizer(i, true), synchronizer(i, false))
				})
			} else {
				deferred.resolve([])
			}
	
			return deferred.promise
		}
	
		function identity(value) { return value }
	
		function handleJsonp(options) {
			var callbackKey = options.callbackName || "mithril_callback_" +
				new Date().getTime() + "_" +
				(Math.round(Math.random() * 1e16)).toString(36)
	
			var script = $document.createElement("script")
	
			global[callbackKey] = function (resp) {
				script.parentNode.removeChild(script)
				options.onload({
					type: "load",
					target: {
						responseText: resp
					}
				})
				global[callbackKey] = undefined
			}
	
			script.onerror = function () {
				script.parentNode.removeChild(script)
	
				options.onerror({
					type: "error",
					target: {
						status: 500,
						responseText: JSON.stringify({
							error: "Error making jsonp request"
						})
					}
				})
				global[callbackKey] = undefined
	
				return false
			}
	
			script.onload = function () {
				return false
			}
	
			script.src = options.url +
				(options.url.indexOf("?") > 0 ? "&" : "?") +
				(options.callbackKey ? options.callbackKey : "callback") +
				"=" + callbackKey +
				"&" + buildQueryString(options.data || {})
	
			$document.body.appendChild(script)
		}
	
		function createXhr(options) {
			var xhr = new global.XMLHttpRequest()
			xhr.open(options.method, options.url, true, options.user,
				options.password)
	
			xhr.onreadystatechange = function () {
				if (xhr.readyState === 4) {
					if (xhr.status >= 200 && xhr.status < 300) {
						options.onload({type: "load", target: xhr})
					} else {
						options.onerror({type: "error", target: xhr})
					}
				}
			}
	
			if (options.serialize === JSON.stringify &&
					options.data &&
					options.method !== "GET") {
				xhr.setRequestHeader("Content-Type",
					"application/json; charset=utf-8")
			}
	
			if (options.deserialize === JSON.parse) {
				xhr.setRequestHeader("Accept", "application/json, text/*")
			}
	
			if (isFunction(options.config)) {
				var maybeXhr = options.config(xhr, options)
				if (maybeXhr != null) xhr = maybeXhr
			}
	
			var data = options.method === "GET" || !options.data ? "" : options.data
	
			if (data && !isString(data) && data.constructor !== global.FormData) {
				throw new Error("Request data should be either be a string or " +
					"FormData. Check the `serialize` option in `m.request`")
			}
	
			xhr.send(data)
			return xhr
		}
	
		function ajax(options) {
			if (options.dataType && options.dataType.toLowerCase() === "jsonp") {
				return handleJsonp(options)
			} else {
				return createXhr(options)
			}
		}
	
		function bindData(options, data, serialize) {
			if (options.method === "GET" && options.dataType !== "jsonp") {
				var prefix = options.url.indexOf("?") < 0 ? "?" : "&"
				var querystring = buildQueryString(data)
				options.url += (querystring ? prefix + querystring : "")
			} else {
				options.data = serialize(data)
			}
		}
	
		function parameterizeUrl(url, data) {
			if (data) {
				url = url.replace(/:[a-z]\w+/gi, function (token){
					var key = token.slice(1)
					var value = data[key] || token
					delete data[key]
					return value
				})
			}
			return url
		}
	
		m.request = function (options) {
			if (options.background !== true) m.startComputation()
			var deferred = new Deferred()
			var isJSONP = options.dataType &&
				options.dataType.toLowerCase() === "jsonp"
	
			var serialize, deserialize, extract
	
			if (isJSONP) {
				serialize = options.serialize =
				deserialize = options.deserialize = identity
	
				extract = function (jsonp) { return jsonp.responseText }
			} else {
				serialize = options.serialize = options.serialize || JSON.stringify
	
				deserialize = options.deserialize =
					options.deserialize || JSON.parse
				extract = options.extract || function (xhr) {
					if (xhr.responseText.length || deserialize !== JSON.parse) {
						return xhr.responseText
					} else {
						return null
					}
				}
			}
	
			options.method = (options.method || "GET").toUpperCase()
			options.url = parameterizeUrl(options.url, options.data)
			bindData(options, options.data, serialize)
			options.onload = options.onerror = function (ev) {
				try {
					ev = ev || event
					var response = deserialize(extract(ev.target, options))
					if (ev.type === "load") {
						if (options.unwrapSuccess) {
							response = options.unwrapSuccess(response, ev.target)
						}
	
						if (isArray(response) && options.type) {
							forEach(response, function (res, i) {
								response[i] = new options.type(res)
							})
						} else if (options.type) {
							response = new options.type(response)
						}
	
						deferred.resolve(response)
					} else {
						if (options.unwrapError) {
							response = options.unwrapError(response, ev.target)
						}
	
						deferred.reject(response)
					}
				} catch (e) {
					deferred.reject(e)
					m.deferred.onerror(e)
				} finally {
					if (options.background !== true) m.endComputation()
				}
			}
	
			ajax(options)
			deferred.promise = propify(deferred.promise, options.initialValue)
			return deferred.promise
		}
	
		return m
	}); // eslint-disable-line
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)(module)))

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNzQ3OTYxNzM5OGU4MmU0ZTc1N2YiLCJ3ZWJwYWNrOi8vLy4vYXBwLnRzIiwid2VicGFjazovLy8uL34vbWl0aHJpbC9taXRocmlsLmpzIiwid2VicGFjazovLy8od2VicGFjaykvYnVpbGRpbi9tb2R1bGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FDdENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFpQztBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0NBQXVDLDBDQUEwQztBQUNqRiw4QkFBNkIsNEJBQTRCO0FBQ3pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBLGtEQUFpRCxxQ0FBcUM7QUFDdEYsRUFBQzs7Ozs7OzttQ0NsREQsK0NBQUMsNkJBQTZCO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFO0FBQ0Ysa0RBQXNCLFdBQVc7QUFDakMsR0FBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBLEVBQUMsK0VBQStFO0FBQ2hGOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxpQkFBZ0I7QUFDaEIsZUFBYzs7QUFFZDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLGVBQWMsT0FBTztBQUNyQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSTtBQUNKO0FBQ0EsS0FBSTtBQUNKO0FBQ0EsS0FBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsYUFBWSxJQUFJO0FBQ2hCLGFBQVksVUFBVTtBQUN0QixhQUFZLFlBQVk7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsNkNBQTRDLFlBQVk7QUFDeEQ7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGFBQVk7QUFDWjtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGtCQUFpQixxQ0FBcUM7QUFDdEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxrQkFBaUIsaUJBQWlCO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUksSUFBSTtBQUNSLElBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWEsMkJBQTJCO0FBQ3hDO0FBQ0EsTUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHOztBQUVIO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFJO0FBQ0o7O0FBRUE7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7O0FBRUg7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSTtBQUNKO0FBQ0EsSUFBRztBQUNIOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsNEJBQTJCLHFCQUFxQjtBQUNoRDtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0Esb0NBQW1DO0FBQ25DO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFJO0FBQ0o7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSTtBQUNKO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSTtBQUNKO0FBQ0E7QUFDQSxLQUFJO0FBQ0o7QUFDQTtBQUNBLEtBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EscUNBQW9DO0FBQ3BDLElBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EscUNBQW9DLFNBQVM7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1REFBc0Q7QUFDdEQsSUFBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQWtDLHdCQUF3QixJQUFJO0FBQzlEO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsaUNBQWdDLG1CQUFtQjtBQUNuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUk7QUFDSjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNILFlBQVc7QUFDWDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0VBQW1FO0FBQ25FLHlEQUF3RDtBQUN4RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF1QjtBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBLHVCQUFzQixJQUFJO0FBQzFCO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGlDQUFnQyxRQUFRO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEwQixxQkFBcUI7QUFDL0M7QUFDQSxLQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0Esb0JBQW1CLHFCQUFxQjtBQUN4QztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGtCQUFpQixrQkFBa0I7QUFDbkM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSTtBQUNKO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSTtBQUNKO0FBQ0E7O0FBRUE7QUFDQSxJQUFHOztBQUVIO0FBQ0E7QUFDQSxJQUFHOztBQUVIO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0EsWUFBVyxzQkFBc0I7QUFDakM7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsdUNBQXNDLFdBQVc7QUFDakQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsbUJBQWtCLHNCQUFzQjtBQUN4QztBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxpQkFBZ0I7QUFDaEIsdURBQXNEO0FBQ3REO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxrQkFBaUIsc0JBQXNCO0FBQ3ZDO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUk7QUFDSixvREFBbUQ7QUFDbkQ7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxJQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBLEtBQUk7QUFDSixJQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGVBQWM7QUFDZDtBQUNBO0FBQ0E7O0FBRUEsK0NBQThDO0FBQzlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFJO0FBQ0o7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUk7QUFDSjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSTtBQUNKO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDJCQUEwQixFQUFFO0FBQzVCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQSxPQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU07QUFDTjtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRzs7QUFFSDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFJO0FBQ0o7QUFDQSxLQUFJO0FBQ0o7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUk7QUFDSjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQSxPQUFNO0FBQ04sTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUk7QUFDSjtBQUNBO0FBQ0EsS0FBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBLE9BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQSxPQUFNO0FBQ047QUFDQSxPQUFNO0FBQ047QUFDQSxLQUFJO0FBQ0o7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSTtBQUNKLElBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsNEJBQTJCOztBQUUzQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUk7QUFDSjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTTtBQUNOO0FBQ0EsS0FBSTtBQUNKOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkNBQTRDOztBQUU1QztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHNCQUFxQiwwQkFBMEI7QUFDL0MsTUFBSztBQUNMLHVCQUFzQiwyQkFBMkI7QUFDakQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXNCO0FBQ3RCOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUk7QUFDSjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsZ0NBQStCO0FBQy9CLElBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQLE9BQU07QUFDTjtBQUNBOztBQUVBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSTtBQUNKO0FBQ0E7QUFDQSxLQUFJO0FBQ0o7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsRUFBQyxFQUFFOzs7Ozs7OztBQ3hyRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCA3NDc5NjE3Mzk4ZTgyZTRlNzU3ZlxuICoqLyIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJtaXRocmlsLmQudHNcIiAvPlxuXCJ1c2Ugc3RyaWN0XCI7XG52YXIgbSA9IHJlcXVpcmUoXCJtaXRocmlsXCIpO1xuKGZ1bmN0aW9uICgpIHtcbiAgICAndXNlIHN0cmljdCc7XG4gICAgdmFyIGNvbnRyb2xsZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBtZXNzYWdlcyA9IG0ucHJvcChbXSk7XG4gICAgICAgIHZhciB0ZXh0ID0gbS5wcm9wKFwiXCIpO1xuICAgICAgICB2YXIgcHVzaE1lc3NhZ2UgPSBmdW5jdGlvbiAobXNnKSB7XG4gICAgICAgICAgICBtZXNzYWdlcygpLnB1c2gobXNnKTsgLy8g56C05aOK55qE5aSJ5pu05q2744GtXG4gICAgICAgICAgICBtLnJlZHJhdy5zdHJhdGVneShcImFsbFwiKTtcbiAgICAgICAgfTtcbiAgICAgICAgdmFyIGNvbm4gPSBuZXcgV2ViU29ja2V0KCd3czovL2xvY2FsaG9zdDo5MDgwL3Jvb20vYW55P25hbWU9c29tZW9uZScpO1xuICAgICAgICBjb25uLm9ub3BlbiA9IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInNvY2tldCBvcGVuIVwiKTtcbiAgICAgICAgfTtcbiAgICAgICAgY29ubi5vbmVycm9yID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGUpO1xuICAgICAgICAgICAgLy8g5L2V44GL5YaN5o6l57aa44Gu5Yem55CG44Go44GL5Y+W44KM44Gw6Imv44GE44Gu44GL44GqXG4gICAgICAgIH07XG4gICAgICAgIGNvbm4ub25tZXNzYWdlID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicmVjZWl2ZSBtZXNzYWdlOiBcIiArIGUuZGF0YSk7XG4gICAgICAgICAgICBwdXNoTWVzc2FnZShlLmRhdGEpO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbWVzc2FnZXM6IG1lc3NhZ2VzLFxuICAgICAgICAgICAgdGV4dDogdGV4dCxcbiAgICAgICAgICAgIHNlbmRNZXNzYWdlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyIHQgPSB0ZXh0KCk7XG4gICAgICAgICAgICAgICAgdGV4dChcIlwiKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIm1lc3NhZ2UgXCIgKyB0ICsgXCIgaXMgc2VudCFcIik7XG4gICAgICAgICAgICAgICAgY29ubi5zZW5kKHQpO1xuICAgICAgICAgICAgICAgIHB1c2hNZXNzYWdlKHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH07XG4gICAgdmFyIHZpZXcgPSBmdW5jdGlvbiAoY3RybCkge1xuICAgICAgICByZXR1cm4gbShcImRpdlwiLCBbXG4gICAgICAgICAgICBtKFwiZGl2XCIsIFtcbiAgICAgICAgICAgICAgICBtKFwiaW5wdXRbdHlwZT10ZXh0XVwiLCB7IG9uaW5wdXQ6IG0ud2l0aEF0dHIoXCJ2YWx1ZVwiLCBjdHJsLnRleHQpIH0pLFxuICAgICAgICAgICAgICAgIG0oXCJidXR0b25cIiwgeyBvbmNsaWNrOiBjdHJsLnNlbmRNZXNzYWdlIH0sIFwi6YCB5L+hXCIpXG4gICAgICAgICAgICBdKSxcbiAgICAgICAgICAgIG0oXCJkaXZcIiwgW1xuICAgICAgICAgICAgICAgIG0oXCJ1bFwiLCBjdHJsLm1lc3NhZ2VzKCkubWFwKGZ1bmN0aW9uIChtc2cpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG0oXCJsaVwiLCBtc2cpO1xuICAgICAgICAgICAgICAgIH0pKVxuICAgICAgICAgICAgXSlcbiAgICAgICAgXSk7XG4gICAgfTtcbiAgICBtLm1vdW50KGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29udGVudFwiKSwgeyBjb250cm9sbGVyOiBjb250cm9sbGVyLCB2aWV3OiB2aWV3IH0pO1xufSkoKTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9hcHAudHNcbiAqKiBtb2R1bGUgaWQgPSAxXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCI7KGZ1bmN0aW9uIChnbG9iYWwsIGZhY3RvcnkpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxyXG5cdFwidXNlIHN0cmljdFwiXHJcblx0LyogZXNsaW50LWRpc2FibGUgbm8tdW5kZWYgKi9cclxuXHR2YXIgbSA9IGZhY3RvcnkoZ2xvYmFsKVxyXG5cdGlmICh0eXBlb2YgbW9kdWxlID09PSBcIm9iamVjdFwiICYmIG1vZHVsZSAhPSBudWxsICYmIG1vZHVsZS5leHBvcnRzKSB7XHJcblx0XHRtb2R1bGUuZXhwb3J0cyA9IG1cclxuXHR9IGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09IFwiZnVuY3Rpb25cIiAmJiBkZWZpbmUuYW1kKSB7XHJcblx0XHRkZWZpbmUoZnVuY3Rpb24gKCkgeyByZXR1cm4gbSB9KVxyXG5cdH0gZWxzZSB7XHJcblx0XHRnbG9iYWwubSA9IG1cclxuXHR9XHJcblx0LyogZXNsaW50LWVuYWJsZSBuby11bmRlZiAqL1xyXG59KSh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDogdGhpcywgZnVuY3Rpb24gKGdsb2JhbCwgdW5kZWZpbmVkKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcclxuXHRcInVzZSBzdHJpY3RcIlxyXG5cclxuXHRtLnZlcnNpb24gPSBmdW5jdGlvbiAoKSB7XHJcblx0XHRyZXR1cm4gXCJ2MC4yLjVcIlxyXG5cdH1cclxuXHJcblx0dmFyIGhhc093biA9IHt9Lmhhc093blByb3BlcnR5XHJcblx0dmFyIHR5cGUgPSB7fS50b1N0cmluZ1xyXG5cclxuXHRmdW5jdGlvbiBpc0Z1bmN0aW9uKG9iamVjdCkge1xyXG5cdFx0cmV0dXJuIHR5cGVvZiBvYmplY3QgPT09IFwiZnVuY3Rpb25cIlxyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gaXNPYmplY3Qob2JqZWN0KSB7XHJcblx0XHRyZXR1cm4gdHlwZS5jYWxsKG9iamVjdCkgPT09IFwiW29iamVjdCBPYmplY3RdXCJcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIGlzU3RyaW5nKG9iamVjdCkge1xyXG5cdFx0cmV0dXJuIHR5cGUuY2FsbChvYmplY3QpID09PSBcIltvYmplY3QgU3RyaW5nXVwiXHJcblx0fVxyXG5cclxuXHR2YXIgaXNBcnJheSA9IEFycmF5LmlzQXJyYXkgfHwgZnVuY3Rpb24gKG9iamVjdCkge1xyXG5cdFx0cmV0dXJuIHR5cGUuY2FsbChvYmplY3QpID09PSBcIltvYmplY3QgQXJyYXldXCJcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIG5vb3AoKSB7fVxyXG5cclxuXHR2YXIgdm9pZEVsZW1lbnRzID0ge1xyXG5cdFx0QVJFQTogMSxcclxuXHRcdEJBU0U6IDEsXHJcblx0XHRCUjogMSxcclxuXHRcdENPTDogMSxcclxuXHRcdENPTU1BTkQ6IDEsXHJcblx0XHRFTUJFRDogMSxcclxuXHRcdEhSOiAxLFxyXG5cdFx0SU1HOiAxLFxyXG5cdFx0SU5QVVQ6IDEsXHJcblx0XHRLRVlHRU46IDEsXHJcblx0XHRMSU5LOiAxLFxyXG5cdFx0TUVUQTogMSxcclxuXHRcdFBBUkFNOiAxLFxyXG5cdFx0U09VUkNFOiAxLFxyXG5cdFx0VFJBQ0s6IDEsXHJcblx0XHRXQlI6IDFcclxuXHR9XHJcblxyXG5cdC8vIGNhY2hpbmcgY29tbW9ubHkgdXNlZCB2YXJpYWJsZXNcclxuXHR2YXIgJGRvY3VtZW50LCAkbG9jYXRpb24sICRyZXF1ZXN0QW5pbWF0aW9uRnJhbWUsICRjYW5jZWxBbmltYXRpb25GcmFtZVxyXG5cclxuXHQvLyBzZWxmIGludm9raW5nIGZ1bmN0aW9uIG5lZWRlZCBiZWNhdXNlIG9mIHRoZSB3YXkgbW9ja3Mgd29ya1xyXG5cdGZ1bmN0aW9uIGluaXRpYWxpemUobW9jaykge1xyXG5cdFx0JGRvY3VtZW50ID0gbW9jay5kb2N1bWVudFxyXG5cdFx0JGxvY2F0aW9uID0gbW9jay5sb2NhdGlvblxyXG5cdFx0JGNhbmNlbEFuaW1hdGlvbkZyYW1lID0gbW9jay5jYW5jZWxBbmltYXRpb25GcmFtZSB8fCBtb2NrLmNsZWFyVGltZW91dFxyXG5cdFx0JHJlcXVlc3RBbmltYXRpb25GcmFtZSA9IG1vY2sucmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8IG1vY2suc2V0VGltZW91dFxyXG5cdH1cclxuXHJcblx0Ly8gdGVzdGluZyBBUElcclxuXHRtLmRlcHMgPSBmdW5jdGlvbiAobW9jaykge1xyXG5cdFx0aW5pdGlhbGl6ZShnbG9iYWwgPSBtb2NrIHx8IHdpbmRvdylcclxuXHRcdHJldHVybiBnbG9iYWxcclxuXHR9XHJcblxyXG5cdG0uZGVwcyhnbG9iYWwpXHJcblxyXG5cdC8qKlxyXG5cdCAqIEB0eXBlZGVmIHtTdHJpbmd9IFRhZ1xyXG5cdCAqIEEgc3RyaW5nIHRoYXQgbG9va3MgbGlrZSAtPiBkaXYuY2xhc3NuYW1lI2lkW3BhcmFtPW9uZV1bcGFyYW0yPXR3b11cclxuXHQgKiBXaGljaCBkZXNjcmliZXMgYSBET00gbm9kZVxyXG5cdCAqL1xyXG5cclxuXHRmdW5jdGlvbiBwYXJzZVRhZ0F0dHJzKGNlbGwsIHRhZykge1xyXG5cdFx0dmFyIGNsYXNzZXMgPSBbXVxyXG5cdFx0dmFyIHBhcnNlciA9IC8oPzooXnwjfFxcLikoW14jXFwuXFxbXFxdXSspKXwoXFxbLis/XFxdKS9nXHJcblx0XHR2YXIgbWF0Y2hcclxuXHJcblx0XHR3aGlsZSAoKG1hdGNoID0gcGFyc2VyLmV4ZWModGFnKSkpIHtcclxuXHRcdFx0aWYgKG1hdGNoWzFdID09PSBcIlwiICYmIG1hdGNoWzJdKSB7XHJcblx0XHRcdFx0Y2VsbC50YWcgPSBtYXRjaFsyXVxyXG5cdFx0XHR9IGVsc2UgaWYgKG1hdGNoWzFdID09PSBcIiNcIikge1xyXG5cdFx0XHRcdGNlbGwuYXR0cnMuaWQgPSBtYXRjaFsyXVxyXG5cdFx0XHR9IGVsc2UgaWYgKG1hdGNoWzFdID09PSBcIi5cIikge1xyXG5cdFx0XHRcdGNsYXNzZXMucHVzaChtYXRjaFsyXSlcclxuXHRcdFx0fSBlbHNlIGlmIChtYXRjaFszXVswXSA9PT0gXCJbXCIpIHtcclxuXHRcdFx0XHR2YXIgcGFpciA9IC9cXFsoLis/KSg/Oj0oXCJ8J3wpKC4qPylcXDIpP1xcXS8uZXhlYyhtYXRjaFszXSlcclxuXHRcdFx0XHRjZWxsLmF0dHJzW3BhaXJbMV1dID0gcGFpclszXSB8fCBcIlwiXHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gY2xhc3Nlc1xyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gZ2V0VmlydHVhbENoaWxkcmVuKGFyZ3MsIGhhc0F0dHJzKSB7XHJcblx0XHR2YXIgY2hpbGRyZW4gPSBoYXNBdHRycyA/IGFyZ3Muc2xpY2UoMSkgOiBhcmdzXHJcblxyXG5cdFx0aWYgKGNoaWxkcmVuLmxlbmd0aCA9PT0gMSAmJiBpc0FycmF5KGNoaWxkcmVuWzBdKSkge1xyXG5cdFx0XHRyZXR1cm4gY2hpbGRyZW5bMF1cclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHJldHVybiBjaGlsZHJlblxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gYXNzaWduQXR0cnModGFyZ2V0LCBhdHRycywgY2xhc3Nlcykge1xyXG5cdFx0dmFyIGNsYXNzQXR0ciA9IFwiY2xhc3NcIiBpbiBhdHRycyA/IFwiY2xhc3NcIiA6IFwiY2xhc3NOYW1lXCJcclxuXHJcblx0XHRmb3IgKHZhciBhdHRyTmFtZSBpbiBhdHRycykge1xyXG5cdFx0XHRpZiAoaGFzT3duLmNhbGwoYXR0cnMsIGF0dHJOYW1lKSkge1xyXG5cdFx0XHRcdGlmIChhdHRyTmFtZSA9PT0gY2xhc3NBdHRyICYmXHJcblx0XHRcdFx0XHRcdGF0dHJzW2F0dHJOYW1lXSAhPSBudWxsICYmXHJcblx0XHRcdFx0XHRcdGF0dHJzW2F0dHJOYW1lXSAhPT0gXCJcIikge1xyXG5cdFx0XHRcdFx0Y2xhc3Nlcy5wdXNoKGF0dHJzW2F0dHJOYW1lXSlcclxuXHRcdFx0XHRcdC8vIGNyZWF0ZSBrZXkgaW4gY29ycmVjdCBpdGVyYXRpb24gb3JkZXJcclxuXHRcdFx0XHRcdHRhcmdldFthdHRyTmFtZV0gPSBcIlwiXHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdHRhcmdldFthdHRyTmFtZV0gPSBhdHRyc1thdHRyTmFtZV1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRpZiAoY2xhc3Nlcy5sZW5ndGgpIHRhcmdldFtjbGFzc0F0dHJdID0gY2xhc3Nlcy5qb2luKFwiIFwiKVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge1RhZ30gVGhlIERPTSBub2RlIHRhZ1xyXG5cdCAqIEBwYXJhbSB7T2JqZWN0PVtdfSBvcHRpb25hbCBrZXktdmFsdWUgcGFpcnMgdG8gYmUgbWFwcGVkIHRvIERPTSBhdHRyc1xyXG5cdCAqIEBwYXJhbSB7Li4ubU5vZGU9W119IFplcm8gb3IgbW9yZSBNaXRocmlsIGNoaWxkIG5vZGVzLiBDYW4gYmUgYW4gYXJyYXksXHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgb3Igc3BsYXQgKG9wdGlvbmFsKVxyXG5cdCAqL1xyXG5cdGZ1bmN0aW9uIG0odGFnLCBwYWlycykge1xyXG5cdFx0dmFyIGFyZ3MgPSBbXVxyXG5cclxuXHRcdGZvciAodmFyIGkgPSAxLCBsZW5ndGggPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0YXJnc1tpIC0gMV0gPSBhcmd1bWVudHNbaV1cclxuXHRcdH1cclxuXHJcblx0XHRpZiAoaXNPYmplY3QodGFnKSkgcmV0dXJuIHBhcmFtZXRlcml6ZSh0YWcsIGFyZ3MpXHJcblxyXG5cdFx0aWYgKCFpc1N0cmluZyh0YWcpKSB7XHJcblx0XHRcdHRocm93IG5ldyBFcnJvcihcInNlbGVjdG9yIGluIG0oc2VsZWN0b3IsIGF0dHJzLCBjaGlsZHJlbikgc2hvdWxkIFwiICtcclxuXHRcdFx0XHRcImJlIGEgc3RyaW5nXCIpXHJcblx0XHR9XHJcblxyXG5cdFx0dmFyIGhhc0F0dHJzID0gcGFpcnMgIT0gbnVsbCAmJiBpc09iamVjdChwYWlycykgJiZcclxuXHRcdFx0IShcInRhZ1wiIGluIHBhaXJzIHx8IFwidmlld1wiIGluIHBhaXJzIHx8IFwic3VidHJlZVwiIGluIHBhaXJzKVxyXG5cclxuXHRcdHZhciBhdHRycyA9IGhhc0F0dHJzID8gcGFpcnMgOiB7fVxyXG5cdFx0dmFyIGNlbGwgPSB7XHJcblx0XHRcdHRhZzogXCJkaXZcIixcclxuXHRcdFx0YXR0cnM6IHt9LFxyXG5cdFx0XHRjaGlsZHJlbjogZ2V0VmlydHVhbENoaWxkcmVuKGFyZ3MsIGhhc0F0dHJzKVxyXG5cdFx0fVxyXG5cclxuXHRcdGFzc2lnbkF0dHJzKGNlbGwuYXR0cnMsIGF0dHJzLCBwYXJzZVRhZ0F0dHJzKGNlbGwsIHRhZykpXHJcblx0XHRyZXR1cm4gY2VsbFxyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gZm9yRWFjaChsaXN0LCBmKSB7XHJcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoICYmICFmKGxpc3RbaV0sIGkrKyk7KSB7XHJcblx0XHRcdC8vIGZ1bmN0aW9uIGNhbGxlZCBpbiBjb25kaXRpb25cclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIGZvcktleXMobGlzdCwgZikge1xyXG5cdFx0Zm9yRWFjaChsaXN0LCBmdW5jdGlvbiAoYXR0cnMsIGkpIHtcclxuXHRcdFx0cmV0dXJuIChhdHRycyA9IGF0dHJzICYmIGF0dHJzLmF0dHJzKSAmJlxyXG5cdFx0XHRcdGF0dHJzLmtleSAhPSBudWxsICYmXHJcblx0XHRcdFx0ZihhdHRycywgaSlcclxuXHRcdH0pXHJcblx0fVxyXG5cdC8vIFRoaXMgZnVuY3Rpb24gd2FzIGNhdXNpbmcgZGVvcHRzIGluIENocm9tZS5cclxuXHRmdW5jdGlvbiBkYXRhVG9TdHJpbmcoZGF0YSkge1xyXG5cdFx0Ly8gZGF0YS50b1N0cmluZygpIG1pZ2h0IHRocm93IG9yIHJldHVybiBudWxsIGlmIGRhdGEgaXMgdGhlIHJldHVyblxyXG5cdFx0Ly8gdmFsdWUgb2YgQ29uc29sZS5sb2cgaW4gc29tZSB2ZXJzaW9ucyBvZiBGaXJlZm94IChiZWhhdmlvciBkZXBlbmRzIG9uXHJcblx0XHQvLyB2ZXJzaW9uKVxyXG5cdFx0dHJ5IHtcclxuXHRcdFx0aWYgKGRhdGEgIT0gbnVsbCAmJiBkYXRhLnRvU3RyaW5nKCkgIT0gbnVsbCkgcmV0dXJuIGRhdGFcclxuXHRcdH0gY2F0Y2ggKGUpIHtcclxuXHRcdFx0Ly8gc2lsZW50bHkgaWdub3JlIGVycm9yc1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIFwiXCJcclxuXHR9XHJcblxyXG5cdC8vIFRoaXMgZnVuY3Rpb24gd2FzIGNhdXNpbmcgZGVvcHRzIGluIENocm9tZS5cclxuXHRmdW5jdGlvbiBpbmplY3RUZXh0Tm9kZShwYXJlbnRFbGVtZW50LCBmaXJzdCwgaW5kZXgsIGRhdGEpIHtcclxuXHRcdHRyeSB7XHJcblx0XHRcdGluc2VydE5vZGUocGFyZW50RWxlbWVudCwgZmlyc3QsIGluZGV4KVxyXG5cdFx0XHRmaXJzdC5ub2RlVmFsdWUgPSBkYXRhXHJcblx0XHR9IGNhdGNoIChlKSB7XHJcblx0XHRcdC8vIElFIGVycm9uZW91c2x5IHRocm93cyBlcnJvciB3aGVuIGFwcGVuZGluZyBhbiBlbXB0eSB0ZXh0IG5vZGVcclxuXHRcdFx0Ly8gYWZ0ZXIgYSBudWxsXHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBmbGF0dGVuKGxpc3QpIHtcclxuXHRcdC8vIHJlY3Vyc2l2ZWx5IGZsYXR0ZW4gYXJyYXlcclxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRpZiAoaXNBcnJheShsaXN0W2ldKSkge1xyXG5cdFx0XHRcdGxpc3QgPSBsaXN0LmNvbmNhdC5hcHBseShbXSwgbGlzdClcclxuXHRcdFx0XHQvLyBjaGVjayBjdXJyZW50IGluZGV4IGFnYWluIGFuZCBmbGF0dGVuIHVudGlsIHRoZXJlIGFyZSBubyBtb3JlXHJcblx0XHRcdFx0Ly8gbmVzdGVkIGFycmF5cyBhdCB0aGF0IGluZGV4XHJcblx0XHRcdFx0aS0tXHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdHJldHVybiBsaXN0XHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBpbnNlcnROb2RlKHBhcmVudEVsZW1lbnQsIG5vZGUsIGluZGV4KSB7XHJcblx0XHRwYXJlbnRFbGVtZW50Lmluc2VydEJlZm9yZShub2RlLFxyXG5cdFx0XHRwYXJlbnRFbGVtZW50LmNoaWxkTm9kZXNbaW5kZXhdIHx8IG51bGwpXHJcblx0fVxyXG5cclxuXHR2YXIgREVMRVRJT04gPSAxXHJcblx0dmFyIElOU0VSVElPTiA9IDJcclxuXHR2YXIgTU9WRSA9IDNcclxuXHJcblx0ZnVuY3Rpb24gaGFuZGxlS2V5c0RpZmZlcihkYXRhLCBleGlzdGluZywgY2FjaGVkLCBwYXJlbnRFbGVtZW50KSB7XHJcblx0XHRmb3JLZXlzKGRhdGEsIGZ1bmN0aW9uIChrZXksIGkpIHtcclxuXHRcdFx0ZXhpc3Rpbmdba2V5ID0ga2V5LmtleV0gPSBleGlzdGluZ1trZXldID8ge1xyXG5cdFx0XHRcdGFjdGlvbjogTU9WRSxcclxuXHRcdFx0XHRpbmRleDogaSxcclxuXHRcdFx0XHRmcm9tOiBleGlzdGluZ1trZXldLmluZGV4LFxyXG5cdFx0XHRcdGVsZW1lbnQ6IGNhY2hlZC5ub2Rlc1tleGlzdGluZ1trZXldLmluZGV4XSB8fFxyXG5cdFx0XHRcdFx0JGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIilcclxuXHRcdFx0fSA6IHthY3Rpb246IElOU0VSVElPTiwgaW5kZXg6IGl9XHJcblx0XHR9KVxyXG5cclxuXHRcdHZhciBhY3Rpb25zID0gW11cclxuXHRcdGZvciAodmFyIHByb3AgaW4gZXhpc3RpbmcpIHtcclxuXHRcdFx0aWYgKGhhc093bi5jYWxsKGV4aXN0aW5nLCBwcm9wKSkge1xyXG5cdFx0XHRcdGFjdGlvbnMucHVzaChleGlzdGluZ1twcm9wXSlcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdHZhciBjaGFuZ2VzID0gYWN0aW9ucy5zb3J0KHNvcnRDaGFuZ2VzKVxyXG5cdFx0dmFyIG5ld0NhY2hlZCA9IG5ldyBBcnJheShjYWNoZWQubGVuZ3RoKVxyXG5cclxuXHRcdG5ld0NhY2hlZC5ub2RlcyA9IGNhY2hlZC5ub2Rlcy5zbGljZSgpXHJcblxyXG5cdFx0Zm9yRWFjaChjaGFuZ2VzLCBmdW5jdGlvbiAoY2hhbmdlKSB7XHJcblx0XHRcdHZhciBpbmRleCA9IGNoYW5nZS5pbmRleFxyXG5cdFx0XHRpZiAoY2hhbmdlLmFjdGlvbiA9PT0gREVMRVRJT04pIHtcclxuXHRcdFx0XHRjbGVhcihjYWNoZWRbaW5kZXhdLm5vZGVzLCBjYWNoZWRbaW5kZXhdKVxyXG5cdFx0XHRcdG5ld0NhY2hlZC5zcGxpY2UoaW5kZXgsIDEpXHJcblx0XHRcdH1cclxuXHRcdFx0aWYgKGNoYW5nZS5hY3Rpb24gPT09IElOU0VSVElPTikge1xyXG5cdFx0XHRcdHZhciBkdW1teSA9ICRkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpXHJcblx0XHRcdFx0ZHVtbXkua2V5ID0gZGF0YVtpbmRleF0uYXR0cnMua2V5XHJcblx0XHRcdFx0aW5zZXJ0Tm9kZShwYXJlbnRFbGVtZW50LCBkdW1teSwgaW5kZXgpXHJcblx0XHRcdFx0bmV3Q2FjaGVkLnNwbGljZShpbmRleCwgMCwge1xyXG5cdFx0XHRcdFx0YXR0cnM6IHtrZXk6IGRhdGFbaW5kZXhdLmF0dHJzLmtleX0sXHJcblx0XHRcdFx0XHRub2RlczogW2R1bW15XVxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdFx0bmV3Q2FjaGVkLm5vZGVzW2luZGV4XSA9IGR1bW15XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmIChjaGFuZ2UuYWN0aW9uID09PSBNT1ZFKSB7XHJcblx0XHRcdFx0dmFyIGNoYW5nZUVsZW1lbnQgPSBjaGFuZ2UuZWxlbWVudFxyXG5cdFx0XHRcdHZhciBtYXliZUNoYW5nZWQgPSBwYXJlbnRFbGVtZW50LmNoaWxkTm9kZXNbaW5kZXhdXHJcblx0XHRcdFx0aWYgKG1heWJlQ2hhbmdlZCAhPT0gY2hhbmdlRWxlbWVudCAmJiBjaGFuZ2VFbGVtZW50ICE9PSBudWxsKSB7XHJcblx0XHRcdFx0XHRwYXJlbnRFbGVtZW50Lmluc2VydEJlZm9yZShjaGFuZ2VFbGVtZW50LFxyXG5cdFx0XHRcdFx0XHRtYXliZUNoYW5nZWQgfHwgbnVsbClcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0bmV3Q2FjaGVkW2luZGV4XSA9IGNhY2hlZFtjaGFuZ2UuZnJvbV1cclxuXHRcdFx0XHRuZXdDYWNoZWQubm9kZXNbaW5kZXhdID0gY2hhbmdlRWxlbWVudFxyXG5cdFx0XHR9XHJcblx0XHR9KVxyXG5cclxuXHRcdHJldHVybiBuZXdDYWNoZWRcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIGRpZmZLZXlzKGRhdGEsIGNhY2hlZCwgZXhpc3RpbmcsIHBhcmVudEVsZW1lbnQpIHtcclxuXHRcdHZhciBrZXlzRGlmZmVyID0gZGF0YS5sZW5ndGggIT09IGNhY2hlZC5sZW5ndGhcclxuXHJcblx0XHRpZiAoIWtleXNEaWZmZXIpIHtcclxuXHRcdFx0Zm9yS2V5cyhkYXRhLCBmdW5jdGlvbiAoYXR0cnMsIGkpIHtcclxuXHRcdFx0XHR2YXIgY2FjaGVkQ2VsbCA9IGNhY2hlZFtpXVxyXG5cdFx0XHRcdHJldHVybiBrZXlzRGlmZmVyID0gY2FjaGVkQ2VsbCAmJlxyXG5cdFx0XHRcdFx0Y2FjaGVkQ2VsbC5hdHRycyAmJlxyXG5cdFx0XHRcdFx0Y2FjaGVkQ2VsbC5hdHRycy5rZXkgIT09IGF0dHJzLmtleVxyXG5cdFx0XHR9KVxyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChrZXlzRGlmZmVyKSB7XHJcblx0XHRcdHJldHVybiBoYW5kbGVLZXlzRGlmZmVyKGRhdGEsIGV4aXN0aW5nLCBjYWNoZWQsIHBhcmVudEVsZW1lbnQpXHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRyZXR1cm4gY2FjaGVkXHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBkaWZmQXJyYXkoZGF0YSwgY2FjaGVkLCBub2Rlcykge1xyXG5cdFx0Ly8gZGlmZiB0aGUgYXJyYXkgaXRzZWxmXHJcblxyXG5cdFx0Ly8gdXBkYXRlIHRoZSBsaXN0IG9mIERPTSBub2RlcyBieSBjb2xsZWN0aW5nIHRoZSBub2RlcyBmcm9tIGVhY2ggaXRlbVxyXG5cdFx0Zm9yRWFjaChkYXRhLCBmdW5jdGlvbiAoXywgaSkge1xyXG5cdFx0XHRpZiAoY2FjaGVkW2ldICE9IG51bGwpIG5vZGVzLnB1c2guYXBwbHkobm9kZXMsIGNhY2hlZFtpXS5ub2RlcylcclxuXHRcdH0pXHJcblx0XHQvLyByZW1vdmUgaXRlbXMgZnJvbSB0aGUgZW5kIG9mIHRoZSBhcnJheSBpZiB0aGUgbmV3IGFycmF5IGlzIHNob3J0ZXJcclxuXHRcdC8vIHRoYW4gdGhlIG9sZCBvbmUuIGlmIGVycm9ycyBldmVyIGhhcHBlbiBoZXJlLCB0aGUgaXNzdWUgaXMgbW9zdFxyXG5cdFx0Ly8gbGlrZWx5IGEgYnVnIGluIHRoZSBjb25zdHJ1Y3Rpb24gb2YgdGhlIGBjYWNoZWRgIGRhdGEgc3RydWN0dXJlXHJcblx0XHQvLyBzb21ld2hlcmUgZWFybGllciBpbiB0aGUgcHJvZ3JhbVxyXG5cdFx0Zm9yRWFjaChjYWNoZWQubm9kZXMsIGZ1bmN0aW9uIChub2RlLCBpKSB7XHJcblx0XHRcdGlmIChub2RlLnBhcmVudE5vZGUgIT0gbnVsbCAmJiBub2Rlcy5pbmRleE9mKG5vZGUpIDwgMCkge1xyXG5cdFx0XHRcdGNsZWFyKFtub2RlXSwgW2NhY2hlZFtpXV0pXHJcblx0XHRcdH1cclxuXHRcdH0pXHJcblxyXG5cdFx0aWYgKGRhdGEubGVuZ3RoIDwgY2FjaGVkLmxlbmd0aCkgY2FjaGVkLmxlbmd0aCA9IGRhdGEubGVuZ3RoXHJcblx0XHRjYWNoZWQubm9kZXMgPSBub2Rlc1xyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gYnVpbGRBcnJheUtleXMoZGF0YSkge1xyXG5cdFx0dmFyIGd1aWQgPSAwXHJcblx0XHRmb3JLZXlzKGRhdGEsIGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0Zm9yRWFjaChkYXRhLCBmdW5jdGlvbiAoYXR0cnMpIHtcclxuXHRcdFx0XHRpZiAoKGF0dHJzID0gYXR0cnMgJiYgYXR0cnMuYXR0cnMpICYmIGF0dHJzLmtleSA9PSBudWxsKSB7XHJcblx0XHRcdFx0XHRhdHRycy5rZXkgPSBcIl9fbWl0aHJpbF9fXCIgKyBndWlkKytcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pXHJcblx0XHRcdHJldHVybiAxXHJcblx0XHR9KVxyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gaXNEaWZmZXJlbnRFbm91Z2goZGF0YSwgY2FjaGVkLCBkYXRhQXR0cktleXMpIHtcclxuXHRcdGlmIChkYXRhLnRhZyAhPT0gY2FjaGVkLnRhZykgcmV0dXJuIHRydWVcclxuXHJcblx0XHRpZiAoZGF0YUF0dHJLZXlzLnNvcnQoKS5qb2luKCkgIT09XHJcblx0XHRcdFx0T2JqZWN0LmtleXMoY2FjaGVkLmF0dHJzKS5zb3J0KCkuam9pbigpKSB7XHJcblx0XHRcdHJldHVybiB0cnVlXHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKGRhdGEuYXR0cnMuaWQgIT09IGNhY2hlZC5hdHRycy5pZCkge1xyXG5cdFx0XHRyZXR1cm4gdHJ1ZVxyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChkYXRhLmF0dHJzLmtleSAhPT0gY2FjaGVkLmF0dHJzLmtleSkge1xyXG5cdFx0XHRyZXR1cm4gdHJ1ZVxyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChtLnJlZHJhdy5zdHJhdGVneSgpID09PSBcImFsbFwiKSB7XHJcblx0XHRcdHJldHVybiAhY2FjaGVkLmNvbmZpZ0NvbnRleHQgfHwgY2FjaGVkLmNvbmZpZ0NvbnRleHQucmV0YWluICE9PSB0cnVlXHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKG0ucmVkcmF3LnN0cmF0ZWd5KCkgPT09IFwiZGlmZlwiKSB7XHJcblx0XHRcdHJldHVybiBjYWNoZWQuY29uZmlnQ29udGV4dCAmJiBjYWNoZWQuY29uZmlnQ29udGV4dC5yZXRhaW4gPT09IGZhbHNlXHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIGZhbHNlXHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBtYXliZVJlY3JlYXRlT2JqZWN0KGRhdGEsIGNhY2hlZCwgZGF0YUF0dHJLZXlzKSB7XHJcblx0XHQvLyBpZiBhbiBlbGVtZW50IGlzIGRpZmZlcmVudCBlbm91Z2ggZnJvbSB0aGUgb25lIGluIGNhY2hlLCByZWNyZWF0ZSBpdFxyXG5cdFx0aWYgKGlzRGlmZmVyZW50RW5vdWdoKGRhdGEsIGNhY2hlZCwgZGF0YUF0dHJLZXlzKSkge1xyXG5cdFx0XHRpZiAoY2FjaGVkLm5vZGVzLmxlbmd0aCkgY2xlYXIoY2FjaGVkLm5vZGVzKVxyXG5cclxuXHRcdFx0aWYgKGNhY2hlZC5jb25maWdDb250ZXh0ICYmXHJcblx0XHRcdFx0XHRpc0Z1bmN0aW9uKGNhY2hlZC5jb25maWdDb250ZXh0Lm9udW5sb2FkKSkge1xyXG5cdFx0XHRcdGNhY2hlZC5jb25maWdDb250ZXh0Lm9udW5sb2FkKClcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKGNhY2hlZC5jb250cm9sbGVycykge1xyXG5cdFx0XHRcdGZvckVhY2goY2FjaGVkLmNvbnRyb2xsZXJzLCBmdW5jdGlvbiAoY29udHJvbGxlcikge1xyXG5cdFx0XHRcdFx0aWYgKGNvbnRyb2xsZXIub251bmxvYWQpIHtcclxuXHRcdFx0XHRcdFx0Y29udHJvbGxlci5vbnVubG9hZCh7cHJldmVudERlZmF1bHQ6IG5vb3B9KVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIGdldE9iamVjdE5hbWVzcGFjZShkYXRhLCBuYW1lc3BhY2UpIHtcclxuXHRcdGlmIChkYXRhLmF0dHJzLnhtbG5zKSByZXR1cm4gZGF0YS5hdHRycy54bWxuc1xyXG5cdFx0aWYgKGRhdGEudGFnID09PSBcInN2Z1wiKSByZXR1cm4gXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiXHJcblx0XHRpZiAoZGF0YS50YWcgPT09IFwibWF0aFwiKSByZXR1cm4gXCJodHRwOi8vd3d3LnczLm9yZy8xOTk4L01hdGgvTWF0aE1MXCJcclxuXHRcdHJldHVybiBuYW1lc3BhY2VcclxuXHR9XHJcblxyXG5cdHZhciBwZW5kaW5nUmVxdWVzdHMgPSAwXHJcblx0bS5zdGFydENvbXB1dGF0aW9uID0gZnVuY3Rpb24gKCkgeyBwZW5kaW5nUmVxdWVzdHMrKyB9XHJcblx0bS5lbmRDb21wdXRhdGlvbiA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdGlmIChwZW5kaW5nUmVxdWVzdHMgPiAxKSB7XHJcblx0XHRcdHBlbmRpbmdSZXF1ZXN0cy0tXHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRwZW5kaW5nUmVxdWVzdHMgPSAwXHJcblx0XHRcdG0ucmVkcmF3KClcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIHVubG9hZENhY2hlZENvbnRyb2xsZXJzKGNhY2hlZCwgdmlld3MsIGNvbnRyb2xsZXJzKSB7XHJcblx0XHRpZiAoY29udHJvbGxlcnMubGVuZ3RoKSB7XHJcblx0XHRcdGNhY2hlZC52aWV3cyA9IHZpZXdzXHJcblx0XHRcdGNhY2hlZC5jb250cm9sbGVycyA9IGNvbnRyb2xsZXJzXHJcblx0XHRcdGZvckVhY2goY29udHJvbGxlcnMsIGZ1bmN0aW9uIChjb250cm9sbGVyKSB7XHJcblx0XHRcdFx0aWYgKGNvbnRyb2xsZXIub251bmxvYWQgJiYgY29udHJvbGxlci5vbnVubG9hZC4kb2xkKSB7XHJcblx0XHRcdFx0XHRjb250cm9sbGVyLm9udW5sb2FkID0gY29udHJvbGxlci5vbnVubG9hZC4kb2xkXHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRpZiAocGVuZGluZ1JlcXVlc3RzICYmIGNvbnRyb2xsZXIub251bmxvYWQpIHtcclxuXHRcdFx0XHRcdHZhciBvbnVubG9hZCA9IGNvbnRyb2xsZXIub251bmxvYWRcclxuXHRcdFx0XHRcdGNvbnRyb2xsZXIub251bmxvYWQgPSBub29wXHJcblx0XHRcdFx0XHRjb250cm9sbGVyLm9udW5sb2FkLiRvbGQgPSBvbnVubG9hZFxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSlcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIHNjaGVkdWxlQ29uZmlnc1RvQmVDYWxsZWQoY29uZmlncywgZGF0YSwgbm9kZSwgaXNOZXcsIGNhY2hlZCkge1xyXG5cdFx0Ly8gc2NoZWR1bGUgY29uZmlncyB0byBiZSBjYWxsZWQuIFRoZXkgYXJlIGNhbGxlZCBhZnRlciBgYnVpbGRgIGZpbmlzaGVzXHJcblx0XHQvLyBydW5uaW5nXHJcblx0XHRpZiAoaXNGdW5jdGlvbihkYXRhLmF0dHJzLmNvbmZpZykpIHtcclxuXHRcdFx0dmFyIGNvbnRleHQgPSBjYWNoZWQuY29uZmlnQ29udGV4dCA9IGNhY2hlZC5jb25maWdDb250ZXh0IHx8IHt9XHJcblxyXG5cdFx0XHQvLyBiaW5kXHJcblx0XHRcdGNvbmZpZ3MucHVzaChmdW5jdGlvbiAoKSB7XHJcblx0XHRcdFx0cmV0dXJuIGRhdGEuYXR0cnMuY29uZmlnLmNhbGwoZGF0YSwgbm9kZSwgIWlzTmV3LCBjb250ZXh0LFxyXG5cdFx0XHRcdFx0Y2FjaGVkKVxyXG5cdFx0XHR9KVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gYnVpbGRVcGRhdGVkTm9kZShcclxuXHRcdGNhY2hlZCxcclxuXHRcdGRhdGEsXHJcblx0XHRlZGl0YWJsZSxcclxuXHRcdGhhc0tleXMsXHJcblx0XHRuYW1lc3BhY2UsXHJcblx0XHR2aWV3cyxcclxuXHRcdGNvbmZpZ3MsXHJcblx0XHRjb250cm9sbGVyc1xyXG5cdCkge1xyXG5cdFx0dmFyIG5vZGUgPSBjYWNoZWQubm9kZXNbMF1cclxuXHJcblx0XHRpZiAoaGFzS2V5cykge1xyXG5cdFx0XHRzZXRBdHRyaWJ1dGVzKG5vZGUsIGRhdGEudGFnLCBkYXRhLmF0dHJzLCBjYWNoZWQuYXR0cnMsIG5hbWVzcGFjZSlcclxuXHRcdH1cclxuXHJcblx0XHRjYWNoZWQuY2hpbGRyZW4gPSBidWlsZChcclxuXHRcdFx0bm9kZSxcclxuXHRcdFx0ZGF0YS50YWcsXHJcblx0XHRcdHVuZGVmaW5lZCxcclxuXHRcdFx0dW5kZWZpbmVkLFxyXG5cdFx0XHRkYXRhLmNoaWxkcmVuLFxyXG5cdFx0XHRjYWNoZWQuY2hpbGRyZW4sXHJcblx0XHRcdGZhbHNlLFxyXG5cdFx0XHQwLFxyXG5cdFx0XHRkYXRhLmF0dHJzLmNvbnRlbnRlZGl0YWJsZSA/IG5vZGUgOiBlZGl0YWJsZSxcclxuXHRcdFx0bmFtZXNwYWNlLFxyXG5cdFx0XHRjb25maWdzXHJcblx0XHQpXHJcblxyXG5cdFx0Y2FjaGVkLm5vZGVzLmludGFjdCA9IHRydWVcclxuXHJcblx0XHRpZiAoY29udHJvbGxlcnMubGVuZ3RoKSB7XHJcblx0XHRcdGNhY2hlZC52aWV3cyA9IHZpZXdzXHJcblx0XHRcdGNhY2hlZC5jb250cm9sbGVycyA9IGNvbnRyb2xsZXJzXHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIG5vZGVcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIGhhbmRsZU5vbmV4aXN0ZW50Tm9kZXMoZGF0YSwgcGFyZW50RWxlbWVudCwgaW5kZXgpIHtcclxuXHRcdHZhciBub2Rlc1xyXG5cdFx0aWYgKGRhdGEuJHRydXN0ZWQpIHtcclxuXHRcdFx0bm9kZXMgPSBpbmplY3RIVE1MKHBhcmVudEVsZW1lbnQsIGluZGV4LCBkYXRhKVxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0bm9kZXMgPSBbJGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGRhdGEpXVxyXG5cdFx0XHRpZiAoIShwYXJlbnRFbGVtZW50Lm5vZGVOYW1lIGluIHZvaWRFbGVtZW50cykpIHtcclxuXHRcdFx0XHRpbnNlcnROb2RlKHBhcmVudEVsZW1lbnQsIG5vZGVzWzBdLCBpbmRleClcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdHZhciBjYWNoZWRcclxuXHJcblx0XHRpZiAodHlwZW9mIGRhdGEgPT09IFwic3RyaW5nXCIgfHxcclxuXHRcdFx0XHR0eXBlb2YgZGF0YSA9PT0gXCJudW1iZXJcIiB8fFxyXG5cdFx0XHRcdHR5cGVvZiBkYXRhID09PSBcImJvb2xlYW5cIikge1xyXG5cdFx0XHRjYWNoZWQgPSBuZXcgZGF0YS5jb25zdHJ1Y3RvcihkYXRhKVxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0Y2FjaGVkID0gZGF0YVxyXG5cdFx0fVxyXG5cclxuXHRcdGNhY2hlZC5ub2RlcyA9IG5vZGVzXHJcblx0XHRyZXR1cm4gY2FjaGVkXHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiByZWF0dGFjaE5vZGVzKFxyXG5cdFx0ZGF0YSxcclxuXHRcdGNhY2hlZCxcclxuXHRcdHBhcmVudEVsZW1lbnQsXHJcblx0XHRlZGl0YWJsZSxcclxuXHRcdGluZGV4LFxyXG5cdFx0cGFyZW50VGFnXHJcblx0KSB7XHJcblx0XHR2YXIgbm9kZXMgPSBjYWNoZWQubm9kZXNcclxuXHRcdGlmICghZWRpdGFibGUgfHwgZWRpdGFibGUgIT09ICRkb2N1bWVudC5hY3RpdmVFbGVtZW50KSB7XHJcblx0XHRcdGlmIChkYXRhLiR0cnVzdGVkKSB7XHJcblx0XHRcdFx0Y2xlYXIobm9kZXMsIGNhY2hlZClcclxuXHRcdFx0XHRub2RlcyA9IGluamVjdEhUTUwocGFyZW50RWxlbWVudCwgaW5kZXgsIGRhdGEpXHJcblx0XHRcdH0gZWxzZSBpZiAocGFyZW50VGFnID09PSBcInRleHRhcmVhXCIpIHtcclxuXHRcdFx0XHQvLyA8dGV4dGFyZWE+IHVzZXMgYHZhbHVlYCBpbnN0ZWFkIG9mIGBub2RlVmFsdWVgLlxyXG5cdFx0XHRcdHBhcmVudEVsZW1lbnQudmFsdWUgPSBkYXRhXHJcblx0XHRcdH0gZWxzZSBpZiAoZWRpdGFibGUpIHtcclxuXHRcdFx0XHQvLyBjb250ZW50ZWRpdGFibGUgbm9kZXMgdXNlIGBpbm5lckhUTUxgIGluc3RlYWQgb2YgYG5vZGVWYWx1ZWAuXHJcblx0XHRcdFx0ZWRpdGFibGUuaW5uZXJIVE1MID0gZGF0YVxyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdC8vIHdhcyBhIHRydXN0ZWQgc3RyaW5nXHJcblx0XHRcdFx0aWYgKG5vZGVzWzBdLm5vZGVUeXBlID09PSAxIHx8IG5vZGVzLmxlbmd0aCA+IDEgfHxcclxuXHRcdFx0XHRcdFx0KG5vZGVzWzBdLm5vZGVWYWx1ZS50cmltICYmXHJcblx0XHRcdFx0XHRcdFx0IW5vZGVzWzBdLm5vZGVWYWx1ZS50cmltKCkpKSB7XHJcblx0XHRcdFx0XHRjbGVhcihjYWNoZWQubm9kZXMsIGNhY2hlZClcclxuXHRcdFx0XHRcdG5vZGVzID0gWyRkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShkYXRhKV1cclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdGluamVjdFRleHROb2RlKHBhcmVudEVsZW1lbnQsIG5vZGVzWzBdLCBpbmRleCwgZGF0YSlcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0Y2FjaGVkID0gbmV3IGRhdGEuY29uc3RydWN0b3IoZGF0YSlcclxuXHRcdGNhY2hlZC5ub2RlcyA9IG5vZGVzXHJcblx0XHRyZXR1cm4gY2FjaGVkXHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBoYW5kbGVUZXh0Tm9kZShcclxuXHRcdGNhY2hlZCxcclxuXHRcdGRhdGEsXHJcblx0XHRpbmRleCxcclxuXHRcdHBhcmVudEVsZW1lbnQsXHJcblx0XHRzaG91bGRSZWF0dGFjaCxcclxuXHRcdGVkaXRhYmxlLFxyXG5cdFx0cGFyZW50VGFnXHJcblx0KSB7XHJcblx0XHRpZiAoIWNhY2hlZC5ub2Rlcy5sZW5ndGgpIHtcclxuXHRcdFx0cmV0dXJuIGhhbmRsZU5vbmV4aXN0ZW50Tm9kZXMoZGF0YSwgcGFyZW50RWxlbWVudCwgaW5kZXgpXHJcblx0XHR9IGVsc2UgaWYgKGNhY2hlZC52YWx1ZU9mKCkgIT09IGRhdGEudmFsdWVPZigpIHx8IHNob3VsZFJlYXR0YWNoKSB7XHJcblx0XHRcdHJldHVybiByZWF0dGFjaE5vZGVzKGRhdGEsIGNhY2hlZCwgcGFyZW50RWxlbWVudCwgZWRpdGFibGUsIGluZGV4LFxyXG5cdFx0XHRcdHBhcmVudFRhZylcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHJldHVybiAoY2FjaGVkLm5vZGVzLmludGFjdCA9IHRydWUsIGNhY2hlZClcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIGdldFN1YkFycmF5Q291bnQoaXRlbSkge1xyXG5cdFx0aWYgKGl0ZW0uJHRydXN0ZWQpIHtcclxuXHRcdFx0Ly8gZml4IG9mZnNldCBvZiBuZXh0IGVsZW1lbnQgaWYgaXRlbSB3YXMgYSB0cnVzdGVkIHN0cmluZyB3LyBtb3JlXHJcblx0XHRcdC8vIHRoYW4gb25lIGh0bWwgZWxlbWVudFxyXG5cdFx0XHQvLyB0aGUgZmlyc3QgY2xhdXNlIGluIHRoZSByZWdleHAgbWF0Y2hlcyBlbGVtZW50c1xyXG5cdFx0XHQvLyB0aGUgc2Vjb25kIGNsYXVzZSAoYWZ0ZXIgdGhlIHBpcGUpIG1hdGNoZXMgdGV4dCBub2Rlc1xyXG5cdFx0XHR2YXIgbWF0Y2ggPSBpdGVtLm1hdGNoKC88W15cXC9dfFxcPlxccypbXjxdL2cpXHJcblx0XHRcdGlmIChtYXRjaCAhPSBudWxsKSByZXR1cm4gbWF0Y2gubGVuZ3RoXHJcblx0XHR9IGVsc2UgaWYgKGlzQXJyYXkoaXRlbSkpIHtcclxuXHRcdFx0cmV0dXJuIGl0ZW0ubGVuZ3RoXHJcblx0XHR9XHJcblx0XHRyZXR1cm4gMVxyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gYnVpbGRBcnJheShcclxuXHRcdGRhdGEsXHJcblx0XHRjYWNoZWQsXHJcblx0XHRwYXJlbnRFbGVtZW50LFxyXG5cdFx0aW5kZXgsXHJcblx0XHRwYXJlbnRUYWcsXHJcblx0XHRzaG91bGRSZWF0dGFjaCxcclxuXHRcdGVkaXRhYmxlLFxyXG5cdFx0bmFtZXNwYWNlLFxyXG5cdFx0Y29uZmlnc1xyXG5cdCkge1xyXG5cdFx0ZGF0YSA9IGZsYXR0ZW4oZGF0YSlcclxuXHRcdHZhciBub2RlcyA9IFtdXHJcblx0XHR2YXIgaW50YWN0ID0gY2FjaGVkLmxlbmd0aCA9PT0gZGF0YS5sZW5ndGhcclxuXHRcdHZhciBzdWJBcnJheUNvdW50ID0gMFxyXG5cclxuXHRcdC8vIGtleXMgYWxnb3JpdGhtOiBzb3J0IGVsZW1lbnRzIHdpdGhvdXQgcmVjcmVhdGluZyB0aGVtIGlmIGtleXMgYXJlXHJcblx0XHQvLyBwcmVzZW50XHJcblx0XHQvL1xyXG5cdFx0Ly8gMSkgY3JlYXRlIGEgbWFwIG9mIGFsbCBleGlzdGluZyBrZXlzLCBhbmQgbWFyayBhbGwgZm9yIGRlbGV0aW9uXHJcblx0XHQvLyAyKSBhZGQgbmV3IGtleXMgdG8gbWFwIGFuZCBtYXJrIHRoZW0gZm9yIGFkZGl0aW9uXHJcblx0XHQvLyAzKSBpZiBrZXkgZXhpc3RzIGluIG5ldyBsaXN0LCBjaGFuZ2UgYWN0aW9uIGZyb20gZGVsZXRpb24gdG8gYSBtb3ZlXHJcblx0XHQvLyA0KSBmb3IgZWFjaCBrZXksIGhhbmRsZSBpdHMgY29ycmVzcG9uZGluZyBhY3Rpb24gYXMgbWFya2VkIGluXHJcblx0XHQvLyAgICBwcmV2aW91cyBzdGVwc1xyXG5cclxuXHRcdHZhciBleGlzdGluZyA9IHt9XHJcblx0XHR2YXIgc2hvdWxkTWFpbnRhaW5JZGVudGl0aWVzID0gZmFsc2VcclxuXHJcblx0XHRmb3JLZXlzKGNhY2hlZCwgZnVuY3Rpb24gKGF0dHJzLCBpKSB7XHJcblx0XHRcdHNob3VsZE1haW50YWluSWRlbnRpdGllcyA9IHRydWVcclxuXHRcdFx0ZXhpc3RpbmdbY2FjaGVkW2ldLmF0dHJzLmtleV0gPSB7YWN0aW9uOiBERUxFVElPTiwgaW5kZXg6IGl9XHJcblx0XHR9KVxyXG5cclxuXHRcdGJ1aWxkQXJyYXlLZXlzKGRhdGEpXHJcblx0XHRpZiAoc2hvdWxkTWFpbnRhaW5JZGVudGl0aWVzKSB7XHJcblx0XHRcdGNhY2hlZCA9IGRpZmZLZXlzKGRhdGEsIGNhY2hlZCwgZXhpc3RpbmcsIHBhcmVudEVsZW1lbnQpXHJcblx0XHR9XHJcblx0XHQvLyBlbmQga2V5IGFsZ29yaXRobVxyXG5cclxuXHRcdHZhciBjYWNoZUNvdW50ID0gMFxyXG5cdFx0Ly8gZmFzdGVyIGV4cGxpY2l0bHkgd3JpdHRlblxyXG5cdFx0Zm9yICh2YXIgaSA9IDAsIGxlbiA9IGRhdGEubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcclxuXHRcdFx0Ly8gZGlmZiBlYWNoIGl0ZW0gaW4gdGhlIGFycmF5XHJcblx0XHRcdHZhciBpdGVtID0gYnVpbGQoXHJcblx0XHRcdFx0cGFyZW50RWxlbWVudCxcclxuXHRcdFx0XHRwYXJlbnRUYWcsXHJcblx0XHRcdFx0Y2FjaGVkLFxyXG5cdFx0XHRcdGluZGV4LFxyXG5cdFx0XHRcdGRhdGFbaV0sXHJcblx0XHRcdFx0Y2FjaGVkW2NhY2hlQ291bnRdLFxyXG5cdFx0XHRcdHNob3VsZFJlYXR0YWNoLFxyXG5cdFx0XHRcdGluZGV4ICsgc3ViQXJyYXlDb3VudCB8fCBzdWJBcnJheUNvdW50LFxyXG5cdFx0XHRcdGVkaXRhYmxlLFxyXG5cdFx0XHRcdG5hbWVzcGFjZSxcclxuXHRcdFx0XHRjb25maWdzKVxyXG5cclxuXHRcdFx0aWYgKGl0ZW0gIT09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHRcdGludGFjdCA9IGludGFjdCAmJiBpdGVtLm5vZGVzLmludGFjdFxyXG5cdFx0XHRcdHN1YkFycmF5Q291bnQgKz0gZ2V0U3ViQXJyYXlDb3VudChpdGVtKVxyXG5cdFx0XHRcdGNhY2hlZFtjYWNoZUNvdW50KytdID0gaXRlbVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKCFpbnRhY3QpIGRpZmZBcnJheShkYXRhLCBjYWNoZWQsIG5vZGVzKVxyXG5cdFx0cmV0dXJuIGNhY2hlZFxyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gbWFrZUNhY2hlKGRhdGEsIGNhY2hlZCwgaW5kZXgsIHBhcmVudEluZGV4LCBwYXJlbnRDYWNoZSkge1xyXG5cdFx0aWYgKGNhY2hlZCAhPSBudWxsKSB7XHJcblx0XHRcdGlmICh0eXBlLmNhbGwoY2FjaGVkKSA9PT0gdHlwZS5jYWxsKGRhdGEpKSByZXR1cm4gY2FjaGVkXHJcblxyXG5cdFx0XHRpZiAocGFyZW50Q2FjaGUgJiYgcGFyZW50Q2FjaGUubm9kZXMpIHtcclxuXHRcdFx0XHR2YXIgb2Zmc2V0ID0gaW5kZXggLSBwYXJlbnRJbmRleFxyXG5cdFx0XHRcdHZhciBlbmQgPSBvZmZzZXQgKyAoaXNBcnJheShkYXRhKSA/IGRhdGEgOiBjYWNoZWQubm9kZXMpLmxlbmd0aFxyXG5cdFx0XHRcdGNsZWFyKFxyXG5cdFx0XHRcdFx0cGFyZW50Q2FjaGUubm9kZXMuc2xpY2Uob2Zmc2V0LCBlbmQpLFxyXG5cdFx0XHRcdFx0cGFyZW50Q2FjaGUuc2xpY2Uob2Zmc2V0LCBlbmQpKVxyXG5cdFx0XHR9IGVsc2UgaWYgKGNhY2hlZC5ub2Rlcykge1xyXG5cdFx0XHRcdGNsZWFyKGNhY2hlZC5ub2RlcywgY2FjaGVkKVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0Y2FjaGVkID0gbmV3IGRhdGEuY29uc3RydWN0b3IoKVxyXG5cdFx0Ly8gaWYgY29uc3RydWN0b3IgY3JlYXRlcyBhIHZpcnR1YWwgZG9tIGVsZW1lbnQsIHVzZSBhIGJsYW5rIG9iamVjdCBhc1xyXG5cdFx0Ly8gdGhlIGJhc2UgY2FjaGVkIG5vZGUgaW5zdGVhZCBvZiBjb3B5aW5nIHRoZSB2aXJ0dWFsIGVsICgjMjc3KVxyXG5cdFx0aWYgKGNhY2hlZC50YWcpIGNhY2hlZCA9IHt9XHJcblx0XHRjYWNoZWQubm9kZXMgPSBbXVxyXG5cdFx0cmV0dXJuIGNhY2hlZFxyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gY29uc3RydWN0Tm9kZShkYXRhLCBuYW1lc3BhY2UpIHtcclxuXHRcdGlmIChkYXRhLmF0dHJzLmlzKSB7XHJcblx0XHRcdGlmIChuYW1lc3BhY2UgPT0gbnVsbCkge1xyXG5cdFx0XHRcdHJldHVybiAkZG9jdW1lbnQuY3JlYXRlRWxlbWVudChkYXRhLnRhZywgZGF0YS5hdHRycy5pcylcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRyZXR1cm4gJGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhuYW1lc3BhY2UsIGRhdGEudGFnLFxyXG5cdFx0XHRcdFx0ZGF0YS5hdHRycy5pcylcclxuXHRcdFx0fVxyXG5cdFx0fSBlbHNlIGlmIChuYW1lc3BhY2UgPT0gbnVsbCkge1xyXG5cdFx0XHRyZXR1cm4gJGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoZGF0YS50YWcpXHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRyZXR1cm4gJGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhuYW1lc3BhY2UsIGRhdGEudGFnKVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gY29uc3RydWN0QXR0cnMoZGF0YSwgbm9kZSwgbmFtZXNwYWNlLCBoYXNLZXlzKSB7XHJcblx0XHRpZiAoaGFzS2V5cykge1xyXG5cdFx0XHRyZXR1cm4gc2V0QXR0cmlidXRlcyhub2RlLCBkYXRhLnRhZywgZGF0YS5hdHRycywge30sIG5hbWVzcGFjZSlcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHJldHVybiBkYXRhLmF0dHJzXHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBjb25zdHJ1Y3RDaGlsZHJlbihcclxuXHRcdGRhdGEsXHJcblx0XHRub2RlLFxyXG5cdFx0Y2FjaGVkLFxyXG5cdFx0ZWRpdGFibGUsXHJcblx0XHRuYW1lc3BhY2UsXHJcblx0XHRjb25maWdzXHJcblx0KSB7XHJcblx0XHRpZiAoZGF0YS5jaGlsZHJlbiAhPSBudWxsICYmIGRhdGEuY2hpbGRyZW4ubGVuZ3RoID4gMCkge1xyXG5cdFx0XHRyZXR1cm4gYnVpbGQoXHJcblx0XHRcdFx0bm9kZSxcclxuXHRcdFx0XHRkYXRhLnRhZyxcclxuXHRcdFx0XHR1bmRlZmluZWQsXHJcblx0XHRcdFx0dW5kZWZpbmVkLFxyXG5cdFx0XHRcdGRhdGEuY2hpbGRyZW4sXHJcblx0XHRcdFx0Y2FjaGVkLmNoaWxkcmVuLFxyXG5cdFx0XHRcdHRydWUsXHJcblx0XHRcdFx0MCxcclxuXHRcdFx0XHRkYXRhLmF0dHJzLmNvbnRlbnRlZGl0YWJsZSA/IG5vZGUgOiBlZGl0YWJsZSxcclxuXHRcdFx0XHRuYW1lc3BhY2UsXHJcblx0XHRcdFx0Y29uZmlncylcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHJldHVybiBkYXRhLmNoaWxkcmVuXHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiByZWNvbnN0cnVjdENhY2hlZChcclxuXHRcdGRhdGEsXHJcblx0XHRhdHRycyxcclxuXHRcdGNoaWxkcmVuLFxyXG5cdFx0bm9kZSxcclxuXHRcdG5hbWVzcGFjZSxcclxuXHRcdHZpZXdzLFxyXG5cdFx0Y29udHJvbGxlcnNcclxuXHQpIHtcclxuXHRcdHZhciBjYWNoZWQgPSB7XHJcblx0XHRcdHRhZzogZGF0YS50YWcsXHJcblx0XHRcdGF0dHJzOiBhdHRycyxcclxuXHRcdFx0Y2hpbGRyZW46IGNoaWxkcmVuLFxyXG5cdFx0XHRub2RlczogW25vZGVdXHJcblx0XHR9XHJcblxyXG5cdFx0dW5sb2FkQ2FjaGVkQ29udHJvbGxlcnMoY2FjaGVkLCB2aWV3cywgY29udHJvbGxlcnMpXHJcblxyXG5cdFx0aWYgKGNhY2hlZC5jaGlsZHJlbiAmJiAhY2FjaGVkLmNoaWxkcmVuLm5vZGVzKSB7XHJcblx0XHRcdGNhY2hlZC5jaGlsZHJlbi5ub2RlcyA9IFtdXHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gZWRnZSBjYXNlOiBzZXR0aW5nIHZhbHVlIG9uIDxzZWxlY3Q+IGRvZXNuJ3Qgd29yayBiZWZvcmUgY2hpbGRyZW5cclxuXHRcdC8vIGV4aXN0LCBzbyBzZXQgaXQgYWdhaW4gYWZ0ZXIgY2hpbGRyZW4gaGF2ZSBiZWVuIGNyZWF0ZWRcclxuXHRcdGlmIChkYXRhLnRhZyA9PT0gXCJzZWxlY3RcIiAmJiBcInZhbHVlXCIgaW4gZGF0YS5hdHRycykge1xyXG5cdFx0XHRzZXRBdHRyaWJ1dGVzKG5vZGUsIGRhdGEudGFnLCB7dmFsdWU6IGRhdGEuYXR0cnMudmFsdWV9LCB7fSxcclxuXHRcdFx0XHRuYW1lc3BhY2UpXHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIGNhY2hlZFxyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gZ2V0Q29udHJvbGxlcih2aWV3cywgdmlldywgY2FjaGVkQ29udHJvbGxlcnMsIGNvbnRyb2xsZXIpIHtcclxuXHRcdHZhciBjb250cm9sbGVySW5kZXhcclxuXHJcblx0XHRpZiAobS5yZWRyYXcuc3RyYXRlZ3koKSA9PT0gXCJkaWZmXCIgJiYgdmlld3MpIHtcclxuXHRcdFx0Y29udHJvbGxlckluZGV4ID0gdmlld3MuaW5kZXhPZih2aWV3KVxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0Y29udHJvbGxlckluZGV4ID0gLTFcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoY29udHJvbGxlckluZGV4ID4gLTEpIHtcclxuXHRcdFx0cmV0dXJuIGNhY2hlZENvbnRyb2xsZXJzW2NvbnRyb2xsZXJJbmRleF1cclxuXHRcdH0gZWxzZSBpZiAoaXNGdW5jdGlvbihjb250cm9sbGVyKSkge1xyXG5cdFx0XHRyZXR1cm4gbmV3IGNvbnRyb2xsZXIoKVxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0cmV0dXJuIHt9XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHR2YXIgdW5sb2FkZXJzID0gW11cclxuXHJcblx0ZnVuY3Rpb24gdXBkYXRlTGlzdHModmlld3MsIGNvbnRyb2xsZXJzLCB2aWV3LCBjb250cm9sbGVyKSB7XHJcblx0XHRpZiAoY29udHJvbGxlci5vbnVubG9hZCAhPSBudWxsICYmXHJcblx0XHRcdFx0dW5sb2FkZXJzLm1hcChmdW5jdGlvbiAodSkgeyByZXR1cm4gdS5oYW5kbGVyIH0pXHJcblx0XHRcdFx0XHQuaW5kZXhPZihjb250cm9sbGVyLm9udW5sb2FkKSA8IDApIHtcclxuXHRcdFx0dW5sb2FkZXJzLnB1c2goe1xyXG5cdFx0XHRcdGNvbnRyb2xsZXI6IGNvbnRyb2xsZXIsXHJcblx0XHRcdFx0aGFuZGxlcjogY29udHJvbGxlci5vbnVubG9hZFxyXG5cdFx0XHR9KVxyXG5cdFx0fVxyXG5cclxuXHRcdHZpZXdzLnB1c2godmlldylcclxuXHRcdGNvbnRyb2xsZXJzLnB1c2goY29udHJvbGxlcilcclxuXHR9XHJcblxyXG5cdHZhciBmb3JjaW5nID0gZmFsc2VcclxuXHRmdW5jdGlvbiBjaGVja1ZpZXcoXHJcblx0XHRkYXRhLFxyXG5cdFx0dmlldyxcclxuXHRcdGNhY2hlZCxcclxuXHRcdGNhY2hlZENvbnRyb2xsZXJzLFxyXG5cdFx0Y29udHJvbGxlcnMsXHJcblx0XHR2aWV3c1xyXG5cdCkge1xyXG5cdFx0dmFyIGNvbnRyb2xsZXIgPSBnZXRDb250cm9sbGVyKFxyXG5cdFx0XHRjYWNoZWQudmlld3MsXHJcblx0XHRcdHZpZXcsXHJcblx0XHRcdGNhY2hlZENvbnRyb2xsZXJzLFxyXG5cdFx0XHRkYXRhLmNvbnRyb2xsZXIpXHJcblxyXG5cdFx0dmFyIGtleSA9IGRhdGEgJiYgZGF0YS5hdHRycyAmJiBkYXRhLmF0dHJzLmtleVxyXG5cclxuXHRcdGlmIChwZW5kaW5nUmVxdWVzdHMgPT09IDAgfHxcclxuXHRcdFx0XHRmb3JjaW5nIHx8XHJcblx0XHRcdFx0Y2FjaGVkQ29udHJvbGxlcnMgJiZcclxuXHRcdFx0XHRcdGNhY2hlZENvbnRyb2xsZXJzLmluZGV4T2YoY29udHJvbGxlcikgPiAtMSkge1xyXG5cdFx0XHRkYXRhID0gZGF0YS52aWV3KGNvbnRyb2xsZXIpXHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRkYXRhID0ge3RhZzogXCJwbGFjZWhvbGRlclwifVxyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChkYXRhLnN1YnRyZWUgPT09IFwicmV0YWluXCIpIHJldHVybiBkYXRhXHJcblx0XHRkYXRhLmF0dHJzID0gZGF0YS5hdHRycyB8fCB7fVxyXG5cdFx0ZGF0YS5hdHRycy5rZXkgPSBrZXlcclxuXHRcdHVwZGF0ZUxpc3RzKHZpZXdzLCBjb250cm9sbGVycywgdmlldywgY29udHJvbGxlcilcclxuXHRcdHJldHVybiBkYXRhXHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBtYXJrVmlld3MoZGF0YSwgY2FjaGVkLCB2aWV3cywgY29udHJvbGxlcnMpIHtcclxuXHRcdHZhciBjYWNoZWRDb250cm9sbGVycyA9IGNhY2hlZCAmJiBjYWNoZWQuY29udHJvbGxlcnNcclxuXHJcblx0XHR3aGlsZSAoZGF0YS52aWV3ICE9IG51bGwpIHtcclxuXHRcdFx0ZGF0YSA9IGNoZWNrVmlldyhcclxuXHRcdFx0XHRkYXRhLFxyXG5cdFx0XHRcdGRhdGEudmlldy4kb3JpZ2luYWwgfHwgZGF0YS52aWV3LFxyXG5cdFx0XHRcdGNhY2hlZCxcclxuXHRcdFx0XHRjYWNoZWRDb250cm9sbGVycyxcclxuXHRcdFx0XHRjb250cm9sbGVycyxcclxuXHRcdFx0XHR2aWV3cylcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gZGF0YVxyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gYnVpbGRPYmplY3QoIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbWF4LXN0YXRlbWVudHNcclxuXHRcdGRhdGEsXHJcblx0XHRjYWNoZWQsXHJcblx0XHRlZGl0YWJsZSxcclxuXHRcdHBhcmVudEVsZW1lbnQsXHJcblx0XHRpbmRleCxcclxuXHRcdHNob3VsZFJlYXR0YWNoLFxyXG5cdFx0bmFtZXNwYWNlLFxyXG5cdFx0Y29uZmlnc1xyXG5cdCkge1xyXG5cdFx0dmFyIHZpZXdzID0gW11cclxuXHRcdHZhciBjb250cm9sbGVycyA9IFtdXHJcblxyXG5cdFx0ZGF0YSA9IG1hcmtWaWV3cyhkYXRhLCBjYWNoZWQsIHZpZXdzLCBjb250cm9sbGVycylcclxuXHJcblx0XHRpZiAoZGF0YS5zdWJ0cmVlID09PSBcInJldGFpblwiKSByZXR1cm4gY2FjaGVkXHJcblxyXG5cdFx0aWYgKCFkYXRhLnRhZyAmJiBjb250cm9sbGVycy5sZW5ndGgpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiQ29tcG9uZW50IHRlbXBsYXRlIG11c3QgcmV0dXJuIGEgdmlydHVhbCBcIiArXHJcblx0XHRcdFx0XCJlbGVtZW50LCBub3QgYW4gYXJyYXksIHN0cmluZywgZXRjLlwiKVxyXG5cdFx0fVxyXG5cclxuXHRcdGRhdGEuYXR0cnMgPSBkYXRhLmF0dHJzIHx8IHt9XHJcblx0XHRjYWNoZWQuYXR0cnMgPSBjYWNoZWQuYXR0cnMgfHwge31cclxuXHJcblx0XHR2YXIgZGF0YUF0dHJLZXlzID0gT2JqZWN0LmtleXMoZGF0YS5hdHRycylcclxuXHRcdHZhciBoYXNLZXlzID0gZGF0YUF0dHJLZXlzLmxlbmd0aCA+IChcImtleVwiIGluIGRhdGEuYXR0cnMgPyAxIDogMClcclxuXHJcblx0XHRtYXliZVJlY3JlYXRlT2JqZWN0KGRhdGEsIGNhY2hlZCwgZGF0YUF0dHJLZXlzKVxyXG5cclxuXHRcdGlmICghaXNTdHJpbmcoZGF0YS50YWcpKSByZXR1cm5cclxuXHJcblx0XHR2YXIgaXNOZXcgPSBjYWNoZWQubm9kZXMubGVuZ3RoID09PSAwXHJcblxyXG5cdFx0bmFtZXNwYWNlID0gZ2V0T2JqZWN0TmFtZXNwYWNlKGRhdGEsIG5hbWVzcGFjZSlcclxuXHJcblx0XHR2YXIgbm9kZVxyXG5cdFx0aWYgKGlzTmV3KSB7XHJcblx0XHRcdG5vZGUgPSBjb25zdHJ1Y3ROb2RlKGRhdGEsIG5hbWVzcGFjZSlcclxuXHRcdFx0Ly8gc2V0IGF0dHJpYnV0ZXMgZmlyc3QsIHRoZW4gY3JlYXRlIGNoaWxkcmVuXHJcblx0XHRcdHZhciBhdHRycyA9IGNvbnN0cnVjdEF0dHJzKGRhdGEsIG5vZGUsIG5hbWVzcGFjZSwgaGFzS2V5cylcclxuXHJcblx0XHRcdC8vIGFkZCB0aGUgbm9kZSB0byBpdHMgcGFyZW50IGJlZm9yZSBhdHRhY2hpbmcgY2hpbGRyZW4gdG8gaXRcclxuXHRcdFx0aW5zZXJ0Tm9kZShwYXJlbnRFbGVtZW50LCBub2RlLCBpbmRleClcclxuXHJcblx0XHRcdHZhciBjaGlsZHJlbiA9IGNvbnN0cnVjdENoaWxkcmVuKGRhdGEsIG5vZGUsIGNhY2hlZCwgZWRpdGFibGUsXHJcblx0XHRcdFx0bmFtZXNwYWNlLCBjb25maWdzKVxyXG5cclxuXHRcdFx0Y2FjaGVkID0gcmVjb25zdHJ1Y3RDYWNoZWQoXHJcblx0XHRcdFx0ZGF0YSxcclxuXHRcdFx0XHRhdHRycyxcclxuXHRcdFx0XHRjaGlsZHJlbixcclxuXHRcdFx0XHRub2RlLFxyXG5cdFx0XHRcdG5hbWVzcGFjZSxcclxuXHRcdFx0XHR2aWV3cyxcclxuXHRcdFx0XHRjb250cm9sbGVycylcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdG5vZGUgPSBidWlsZFVwZGF0ZWROb2RlKFxyXG5cdFx0XHRcdGNhY2hlZCxcclxuXHRcdFx0XHRkYXRhLFxyXG5cdFx0XHRcdGVkaXRhYmxlLFxyXG5cdFx0XHRcdGhhc0tleXMsXHJcblx0XHRcdFx0bmFtZXNwYWNlLFxyXG5cdFx0XHRcdHZpZXdzLFxyXG5cdFx0XHRcdGNvbmZpZ3MsXHJcblx0XHRcdFx0Y29udHJvbGxlcnMpXHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKCFpc05ldyAmJiBzaG91bGRSZWF0dGFjaCA9PT0gdHJ1ZSAmJiBub2RlICE9IG51bGwpIHtcclxuXHRcdFx0aW5zZXJ0Tm9kZShwYXJlbnRFbGVtZW50LCBub2RlLCBpbmRleClcclxuXHRcdH1cclxuXHJcblx0XHQvLyBUaGUgY29uZmlncyBhcmUgY2FsbGVkIGFmdGVyIGBidWlsZGAgZmluaXNoZXMgcnVubmluZ1xyXG5cdFx0c2NoZWR1bGVDb25maWdzVG9CZUNhbGxlZChjb25maWdzLCBkYXRhLCBub2RlLCBpc05ldywgY2FjaGVkKVxyXG5cclxuXHRcdHJldHVybiBjYWNoZWRcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIGJ1aWxkKFxyXG5cdFx0cGFyZW50RWxlbWVudCxcclxuXHRcdHBhcmVudFRhZyxcclxuXHRcdHBhcmVudENhY2hlLFxyXG5cdFx0cGFyZW50SW5kZXgsXHJcblx0XHRkYXRhLFxyXG5cdFx0Y2FjaGVkLFxyXG5cdFx0c2hvdWxkUmVhdHRhY2gsXHJcblx0XHRpbmRleCxcclxuXHRcdGVkaXRhYmxlLFxyXG5cdFx0bmFtZXNwYWNlLFxyXG5cdFx0Y29uZmlnc1xyXG5cdCkge1xyXG5cdFx0LypcclxuXHRcdCAqIGBidWlsZGAgaXMgYSByZWN1cnNpdmUgZnVuY3Rpb24gdGhhdCBtYW5hZ2VzIGNyZWF0aW9uL2RpZmZpbmcvcmVtb3ZhbFxyXG5cdFx0ICogb2YgRE9NIGVsZW1lbnRzIGJhc2VkIG9uIGNvbXBhcmlzb24gYmV0d2VlbiBgZGF0YWAgYW5kIGBjYWNoZWRgIHRoZVxyXG5cdFx0ICogZGlmZiBhbGdvcml0aG0gY2FuIGJlIHN1bW1hcml6ZWQgYXMgdGhpczpcclxuXHRcdCAqXHJcblx0XHQgKiAxIC0gY29tcGFyZSBgZGF0YWAgYW5kIGBjYWNoZWRgXHJcblx0XHQgKiAyIC0gaWYgdGhleSBhcmUgZGlmZmVyZW50LCBjb3B5IGBkYXRhYCB0byBgY2FjaGVkYCBhbmQgdXBkYXRlIHRoZSBET01cclxuXHRcdCAqICAgICBiYXNlZCBvbiB3aGF0IHRoZSBkaWZmZXJlbmNlIGlzXHJcblx0XHQgKiAzIC0gcmVjdXJzaXZlbHkgYXBwbHkgdGhpcyBhbGdvcml0aG0gZm9yIGV2ZXJ5IGFycmF5IGFuZCBmb3IgdGhlXHJcblx0XHQgKiAgICAgY2hpbGRyZW4gb2YgZXZlcnkgdmlydHVhbCBlbGVtZW50XHJcblx0XHQgKlxyXG5cdFx0ICogVGhlIGBjYWNoZWRgIGRhdGEgc3RydWN0dXJlIGlzIGVzc2VudGlhbGx5IHRoZSBzYW1lIGFzIHRoZSBwcmV2aW91c1xyXG5cdFx0ICogcmVkcmF3J3MgYGRhdGFgIGRhdGEgc3RydWN0dXJlLCB3aXRoIGEgZmV3IGFkZGl0aW9uczpcclxuXHRcdCAqIC0gYGNhY2hlZGAgYWx3YXlzIGhhcyBhIHByb3BlcnR5IGNhbGxlZCBgbm9kZXNgLCB3aGljaCBpcyBhIGxpc3Qgb2ZcclxuXHRcdCAqICAgIERPTSBlbGVtZW50cyB0aGF0IGNvcnJlc3BvbmQgdG8gdGhlIGRhdGEgcmVwcmVzZW50ZWQgYnkgdGhlXHJcblx0XHQgKiAgICByZXNwZWN0aXZlIHZpcnR1YWwgZWxlbWVudFxyXG5cdFx0ICogLSBpbiBvcmRlciB0byBzdXBwb3J0IGF0dGFjaGluZyBgbm9kZXNgIGFzIGEgcHJvcGVydHkgb2YgYGNhY2hlZGAsXHJcblx0XHQgKiAgICBgY2FjaGVkYCBpcyAqYWx3YXlzKiBhIG5vbi1wcmltaXRpdmUgb2JqZWN0LCBpLmUuIGlmIHRoZSBkYXRhIHdhc1xyXG5cdFx0ICogICAgYSBzdHJpbmcsIHRoZW4gY2FjaGVkIGlzIGEgU3RyaW5nIGluc3RhbmNlLiBJZiBkYXRhIHdhcyBgbnVsbGAgb3JcclxuXHRcdCAqICAgIGB1bmRlZmluZWRgLCBjYWNoZWQgaXMgYG5ldyBTdHJpbmcoXCJcIilgXHJcblx0XHQgKiAtIGBjYWNoZWQgYWxzbyBoYXMgYSBgY29uZmlnQ29udGV4dGAgcHJvcGVydHksIHdoaWNoIGlzIHRoZSBzdGF0ZVxyXG5cdFx0ICogICAgc3RvcmFnZSBvYmplY3QgZXhwb3NlZCBieSBjb25maWcoZWxlbWVudCwgaXNJbml0aWFsaXplZCwgY29udGV4dClcclxuXHRcdCAqIC0gd2hlbiBgY2FjaGVkYCBpcyBhbiBPYmplY3QsIGl0IHJlcHJlc2VudHMgYSB2aXJ0dWFsIGVsZW1lbnQ7IHdoZW5cclxuXHRcdCAqICAgIGl0J3MgYW4gQXJyYXksIGl0IHJlcHJlc2VudHMgYSBsaXN0IG9mIGVsZW1lbnRzOyB3aGVuIGl0J3MgYVxyXG5cdFx0ICogICAgU3RyaW5nLCBOdW1iZXIgb3IgQm9vbGVhbiwgaXQgcmVwcmVzZW50cyBhIHRleHQgbm9kZVxyXG5cdFx0ICpcclxuXHRcdCAqIGBwYXJlbnRFbGVtZW50YCBpcyBhIERPTSBlbGVtZW50IHVzZWQgZm9yIFczQyBET00gQVBJIGNhbGxzXHJcblx0XHQgKiBgcGFyZW50VGFnYCBpcyBvbmx5IHVzZWQgZm9yIGhhbmRsaW5nIGEgY29ybmVyIGNhc2UgZm9yIHRleHRhcmVhXHJcblx0XHQgKiB2YWx1ZXNcclxuXHRcdCAqIGBwYXJlbnRDYWNoZWAgaXMgdXNlZCB0byByZW1vdmUgbm9kZXMgaW4gc29tZSBtdWx0aS1ub2RlIGNhc2VzXHJcblx0XHQgKiBgcGFyZW50SW5kZXhgIGFuZCBgaW5kZXhgIGFyZSB1c2VkIHRvIGZpZ3VyZSBvdXQgdGhlIG9mZnNldCBvZiBub2Rlcy5cclxuXHRcdCAqIFRoZXkncmUgYXJ0aWZhY3RzIGZyb20gYmVmb3JlIGFycmF5cyBzdGFydGVkIGJlaW5nIGZsYXR0ZW5lZCBhbmQgYXJlXHJcblx0XHQgKiBsaWtlbHkgcmVmYWN0b3JhYmxlXHJcblx0XHQgKiBgZGF0YWAgYW5kIGBjYWNoZWRgIGFyZSwgcmVzcGVjdGl2ZWx5LCB0aGUgbmV3IGFuZCBvbGQgbm9kZXMgYmVpbmdcclxuXHRcdCAqIGRpZmZlZFxyXG5cdFx0ICogYHNob3VsZFJlYXR0YWNoYCBpcyBhIGZsYWcgaW5kaWNhdGluZyB3aGV0aGVyIGEgcGFyZW50IG5vZGUgd2FzXHJcblx0XHQgKiByZWNyZWF0ZWQgKGlmIHNvLCBhbmQgaWYgdGhpcyBub2RlIGlzIHJldXNlZCwgdGhlbiB0aGlzIG5vZGUgbXVzdFxyXG5cdFx0ICogcmVhdHRhY2ggaXRzZWxmIHRvIHRoZSBuZXcgcGFyZW50KVxyXG5cdFx0ICogYGVkaXRhYmxlYCBpcyBhIGZsYWcgdGhhdCBpbmRpY2F0ZXMgd2hldGhlciBhbiBhbmNlc3RvciBpc1xyXG5cdFx0ICogY29udGVudGVkaXRhYmxlXHJcblx0XHQgKiBgbmFtZXNwYWNlYCBpbmRpY2F0ZXMgdGhlIGNsb3Nlc3QgSFRNTCBuYW1lc3BhY2UgYXMgaXQgY2FzY2FkZXMgZG93blxyXG5cdFx0ICogZnJvbSBhbiBhbmNlc3RvclxyXG5cdFx0ICogYGNvbmZpZ3NgIGlzIGEgbGlzdCBvZiBjb25maWcgZnVuY3Rpb25zIHRvIHJ1biBhZnRlciB0aGUgdG9wbW9zdFxyXG5cdFx0ICogYGJ1aWxkYCBjYWxsIGZpbmlzaGVzIHJ1bm5pbmdcclxuXHRcdCAqXHJcblx0XHQgKiB0aGVyZSdzIGxvZ2ljIHRoYXQgcmVsaWVzIG9uIHRoZSBhc3N1bXB0aW9uIHRoYXQgbnVsbCBhbmQgdW5kZWZpbmVkXHJcblx0XHQgKiBkYXRhIGFyZSBlcXVpdmFsZW50IHRvIGVtcHR5IHN0cmluZ3NcclxuXHRcdCAqIC0gdGhpcyBwcmV2ZW50cyBsaWZlY3ljbGUgc3VycHJpc2VzIGZyb20gcHJvY2VkdXJhbCBoZWxwZXJzIHRoYXQgbWl4XHJcblx0XHQgKiAgIGltcGxpY2l0IGFuZCBleHBsaWNpdCByZXR1cm4gc3RhdGVtZW50cyAoZS5nLlxyXG5cdFx0ICogICBmdW5jdGlvbiBmb28oKSB7aWYgKGNvbmQpIHJldHVybiBtKFwiZGl2XCIpfVxyXG5cdFx0ICogLSBpdCBzaW1wbGlmaWVzIGRpZmZpbmcgY29kZVxyXG5cdFx0ICovXHJcblx0XHRkYXRhID0gZGF0YVRvU3RyaW5nKGRhdGEpXHJcblx0XHRpZiAoZGF0YS5zdWJ0cmVlID09PSBcInJldGFpblwiKSByZXR1cm4gY2FjaGVkXHJcblx0XHRjYWNoZWQgPSBtYWtlQ2FjaGUoZGF0YSwgY2FjaGVkLCBpbmRleCwgcGFyZW50SW5kZXgsIHBhcmVudENhY2hlKVxyXG5cclxuXHRcdGlmIChpc0FycmF5KGRhdGEpKSB7XHJcblx0XHRcdHJldHVybiBidWlsZEFycmF5KFxyXG5cdFx0XHRcdGRhdGEsXHJcblx0XHRcdFx0Y2FjaGVkLFxyXG5cdFx0XHRcdHBhcmVudEVsZW1lbnQsXHJcblx0XHRcdFx0aW5kZXgsXHJcblx0XHRcdFx0cGFyZW50VGFnLFxyXG5cdFx0XHRcdHNob3VsZFJlYXR0YWNoLFxyXG5cdFx0XHRcdGVkaXRhYmxlLFxyXG5cdFx0XHRcdG5hbWVzcGFjZSxcclxuXHRcdFx0XHRjb25maWdzKVxyXG5cdFx0fSBlbHNlIGlmIChkYXRhICE9IG51bGwgJiYgaXNPYmplY3QoZGF0YSkpIHtcclxuXHRcdFx0cmV0dXJuIGJ1aWxkT2JqZWN0KFxyXG5cdFx0XHRcdGRhdGEsXHJcblx0XHRcdFx0Y2FjaGVkLFxyXG5cdFx0XHRcdGVkaXRhYmxlLFxyXG5cdFx0XHRcdHBhcmVudEVsZW1lbnQsXHJcblx0XHRcdFx0aW5kZXgsXHJcblx0XHRcdFx0c2hvdWxkUmVhdHRhY2gsXHJcblx0XHRcdFx0bmFtZXNwYWNlLFxyXG5cdFx0XHRcdGNvbmZpZ3MpXHJcblx0XHR9IGVsc2UgaWYgKCFpc0Z1bmN0aW9uKGRhdGEpKSB7XHJcblx0XHRcdHJldHVybiBoYW5kbGVUZXh0Tm9kZShcclxuXHRcdFx0XHRjYWNoZWQsXHJcblx0XHRcdFx0ZGF0YSxcclxuXHRcdFx0XHRpbmRleCxcclxuXHRcdFx0XHRwYXJlbnRFbGVtZW50LFxyXG5cdFx0XHRcdHNob3VsZFJlYXR0YWNoLFxyXG5cdFx0XHRcdGVkaXRhYmxlLFxyXG5cdFx0XHRcdHBhcmVudFRhZylcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHJldHVybiBjYWNoZWRcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIHNvcnRDaGFuZ2VzKGEsIGIpIHtcclxuXHRcdHJldHVybiBhLmFjdGlvbiAtIGIuYWN0aW9uIHx8IGEuaW5kZXggLSBiLmluZGV4XHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBjb3B5U3R5bGVBdHRycyhub2RlLCBkYXRhQXR0ciwgY2FjaGVkQXR0cikge1xyXG5cdFx0Zm9yICh2YXIgcnVsZSBpbiBkYXRhQXR0cikge1xyXG5cdFx0XHRpZiAoaGFzT3duLmNhbGwoZGF0YUF0dHIsIHJ1bGUpKSB7XHJcblx0XHRcdFx0aWYgKGNhY2hlZEF0dHIgPT0gbnVsbCB8fCBjYWNoZWRBdHRyW3J1bGVdICE9PSBkYXRhQXR0cltydWxlXSkge1xyXG5cdFx0XHRcdFx0bm9kZS5zdHlsZVtydWxlXSA9IGRhdGFBdHRyW3J1bGVdXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0Zm9yIChydWxlIGluIGNhY2hlZEF0dHIpIHtcclxuXHRcdFx0aWYgKGhhc093bi5jYWxsKGNhY2hlZEF0dHIsIHJ1bGUpKSB7XHJcblx0XHRcdFx0aWYgKCFoYXNPd24uY2FsbChkYXRhQXR0ciwgcnVsZSkpIG5vZGUuc3R5bGVbcnVsZV0gPSBcIlwiXHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHZhciBzaG91bGRVc2VTZXRBdHRyaWJ1dGUgPSB7XHJcblx0XHRsaXN0OiAxLFxyXG5cdFx0c3R5bGU6IDEsXHJcblx0XHRmb3JtOiAxLFxyXG5cdFx0dHlwZTogMSxcclxuXHRcdHdpZHRoOiAxLFxyXG5cdFx0aGVpZ2h0OiAxXHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBzZXRTaW5nbGVBdHRyKFxyXG5cdFx0bm9kZSxcclxuXHRcdGF0dHJOYW1lLFxyXG5cdFx0ZGF0YUF0dHIsXHJcblx0XHRjYWNoZWRBdHRyLFxyXG5cdFx0dGFnLFxyXG5cdFx0bmFtZXNwYWNlXHJcblx0KSB7XHJcblx0XHRpZiAoYXR0ck5hbWUgPT09IFwiY29uZmlnXCIgfHwgYXR0ck5hbWUgPT09IFwia2V5XCIpIHtcclxuXHRcdFx0Ly8gYGNvbmZpZ2AgaXNuJ3QgYSByZWFsIGF0dHJpYnV0ZSwgc28gaWdub3JlIGl0XHJcblx0XHRcdHJldHVybiB0cnVlXHJcblx0XHR9IGVsc2UgaWYgKGlzRnVuY3Rpb24oZGF0YUF0dHIpICYmIGF0dHJOYW1lLnNsaWNlKDAsIDIpID09PSBcIm9uXCIpIHtcclxuXHRcdFx0Ly8gaG9vayBldmVudCBoYW5kbGVycyB0byB0aGUgYXV0by1yZWRyYXdpbmcgc3lzdGVtXHJcblx0XHRcdG5vZGVbYXR0ck5hbWVdID0gYXV0b3JlZHJhdyhkYXRhQXR0ciwgbm9kZSlcclxuXHRcdH0gZWxzZSBpZiAoYXR0ck5hbWUgPT09IFwic3R5bGVcIiAmJiBkYXRhQXR0ciAhPSBudWxsICYmXHJcblx0XHRcdFx0aXNPYmplY3QoZGF0YUF0dHIpKSB7XHJcblx0XHRcdC8vIGhhbmRsZSBgc3R5bGU6IHsuLi59YFxyXG5cdFx0XHRjb3B5U3R5bGVBdHRycyhub2RlLCBkYXRhQXR0ciwgY2FjaGVkQXR0cilcclxuXHRcdH0gZWxzZSBpZiAobmFtZXNwYWNlICE9IG51bGwpIHtcclxuXHRcdFx0Ly8gaGFuZGxlIFNWR1xyXG5cdFx0XHRpZiAoYXR0ck5hbWUgPT09IFwiaHJlZlwiKSB7XHJcblx0XHRcdFx0bm9kZS5zZXRBdHRyaWJ1dGVOUyhcImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmtcIixcclxuXHRcdFx0XHRcdFwiaHJlZlwiLCBkYXRhQXR0cilcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRub2RlLnNldEF0dHJpYnV0ZShcclxuXHRcdFx0XHRcdGF0dHJOYW1lID09PSBcImNsYXNzTmFtZVwiID8gXCJjbGFzc1wiIDogYXR0ck5hbWUsXHJcblx0XHRcdFx0XHRkYXRhQXR0cilcclxuXHRcdFx0fVxyXG5cdFx0fSBlbHNlIGlmIChhdHRyTmFtZSBpbiBub2RlICYmICFzaG91bGRVc2VTZXRBdHRyaWJ1dGVbYXR0ck5hbWVdKSB7XHJcblx0XHRcdC8vIGhhbmRsZSBjYXNlcyB0aGF0IGFyZSBwcm9wZXJ0aWVzIChidXQgaWdub3JlIGNhc2VzIHdoZXJlIHdlXHJcblx0XHRcdC8vIHNob3VsZCB1c2Ugc2V0QXR0cmlidXRlIGluc3RlYWQpXHJcblx0XHRcdC8vXHJcblx0XHRcdC8vIC0gbGlzdCBhbmQgZm9ybSBhcmUgdHlwaWNhbGx5IHVzZWQgYXMgc3RyaW5ncywgYnV0IGFyZSBET01cclxuXHRcdFx0Ly8gICBlbGVtZW50IHJlZmVyZW5jZXMgaW4ganNcclxuXHRcdFx0Ly9cclxuXHRcdFx0Ly8gLSB3aGVuIHVzaW5nIENTUyBzZWxlY3RvcnMgKGUuZy4gYG0oXCJbc3R5bGU9JyddXCIpYCksIHN0eWxlIGlzXHJcblx0XHRcdC8vICAgdXNlZCBhcyBhIHN0cmluZywgYnV0IGl0J3MgYW4gb2JqZWN0IGluIGpzXHJcblx0XHRcdC8vXHJcblx0XHRcdC8vICMzNDggZG9uJ3Qgc2V0IHRoZSB2YWx1ZSBpZiBub3QgbmVlZGVkIC0gb3RoZXJ3aXNlLCBjdXJzb3JcclxuXHRcdFx0Ly8gcGxhY2VtZW50IGJyZWFrcyBpbiBDaHJvbWVcclxuXHRcdFx0dHJ5IHtcclxuXHRcdFx0XHRpZiAodGFnICE9PSBcImlucHV0XCIgfHwgbm9kZVthdHRyTmFtZV0gIT09IGRhdGFBdHRyKSB7XHJcblx0XHRcdFx0XHRub2RlW2F0dHJOYW1lXSA9IGRhdGFBdHRyXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9IGNhdGNoIChlKSB7XHJcblx0XHRcdFx0bm9kZS5zZXRBdHRyaWJ1dGUoYXR0ck5hbWUsIGRhdGFBdHRyKVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRlbHNlIG5vZGUuc2V0QXR0cmlidXRlKGF0dHJOYW1lLCBkYXRhQXR0cilcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIHRyeVNldEF0dHIoXHJcblx0XHRub2RlLFxyXG5cdFx0YXR0ck5hbWUsXHJcblx0XHRkYXRhQXR0cixcclxuXHRcdGNhY2hlZEF0dHIsXHJcblx0XHRjYWNoZWRBdHRycyxcclxuXHRcdHRhZyxcclxuXHRcdG5hbWVzcGFjZVxyXG5cdCkge1xyXG5cdFx0aWYgKCEoYXR0ck5hbWUgaW4gY2FjaGVkQXR0cnMpIHx8IChjYWNoZWRBdHRyICE9PSBkYXRhQXR0cikgfHwgKCRkb2N1bWVudC5hY3RpdmVFbGVtZW50ID09PSBub2RlKSkge1xyXG5cdFx0XHRjYWNoZWRBdHRyc1thdHRyTmFtZV0gPSBkYXRhQXR0clxyXG5cdFx0XHR0cnkge1xyXG5cdFx0XHRcdHJldHVybiBzZXRTaW5nbGVBdHRyKFxyXG5cdFx0XHRcdFx0bm9kZSxcclxuXHRcdFx0XHRcdGF0dHJOYW1lLFxyXG5cdFx0XHRcdFx0ZGF0YUF0dHIsXHJcblx0XHRcdFx0XHRjYWNoZWRBdHRyLFxyXG5cdFx0XHRcdFx0dGFnLFxyXG5cdFx0XHRcdFx0bmFtZXNwYWNlKVxyXG5cdFx0XHR9IGNhdGNoIChlKSB7XHJcblx0XHRcdFx0Ly8gc3dhbGxvdyBJRSdzIGludmFsaWQgYXJndW1lbnQgZXJyb3JzIHRvIG1pbWljIEhUTUwnc1xyXG5cdFx0XHRcdC8vIGZhbGxiYWNrLXRvLWRvaW5nLW5vdGhpbmctb24taW52YWxpZC1hdHRyaWJ1dGVzIGJlaGF2aW9yXHJcblx0XHRcdFx0aWYgKGUubWVzc2FnZS5pbmRleE9mKFwiSW52YWxpZCBhcmd1bWVudFwiKSA8IDApIHRocm93IGVcclxuXHRcdFx0fVxyXG5cdFx0fSBlbHNlIGlmIChhdHRyTmFtZSA9PT0gXCJ2YWx1ZVwiICYmIHRhZyA9PT0gXCJpbnB1dFwiICYmXHJcblx0XHRcdFx0bm9kZS52YWx1ZSAhPT0gZGF0YUF0dHIpIHtcclxuXHRcdFx0Ly8gIzM0OCBkYXRhQXR0ciBtYXkgbm90IGJlIGEgc3RyaW5nLCBzbyB1c2UgbG9vc2UgY29tcGFyaXNvblxyXG5cdFx0XHRub2RlLnZhbHVlID0gZGF0YUF0dHJcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIHNldEF0dHJpYnV0ZXMobm9kZSwgdGFnLCBkYXRhQXR0cnMsIGNhY2hlZEF0dHJzLCBuYW1lc3BhY2UpIHtcclxuXHRcdGZvciAodmFyIGF0dHJOYW1lIGluIGRhdGFBdHRycykge1xyXG5cdFx0XHRpZiAoaGFzT3duLmNhbGwoZGF0YUF0dHJzLCBhdHRyTmFtZSkpIHtcclxuXHRcdFx0XHRpZiAodHJ5U2V0QXR0cihcclxuXHRcdFx0XHRcdFx0bm9kZSxcclxuXHRcdFx0XHRcdFx0YXR0ck5hbWUsXHJcblx0XHRcdFx0XHRcdGRhdGFBdHRyc1thdHRyTmFtZV0sXHJcblx0XHRcdFx0XHRcdGNhY2hlZEF0dHJzW2F0dHJOYW1lXSxcclxuXHRcdFx0XHRcdFx0Y2FjaGVkQXR0cnMsXHJcblx0XHRcdFx0XHRcdHRhZyxcclxuXHRcdFx0XHRcdFx0bmFtZXNwYWNlKSkge1xyXG5cdFx0XHRcdFx0Y29udGludWVcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdHJldHVybiBjYWNoZWRBdHRyc1xyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gY2xlYXIobm9kZXMsIGNhY2hlZCkge1xyXG5cdFx0Zm9yICh2YXIgaSA9IG5vZGVzLmxlbmd0aCAtIDE7IGkgPiAtMTsgaS0tKSB7XHJcblx0XHRcdGlmIChub2Rlc1tpXSAmJiBub2Rlc1tpXS5wYXJlbnROb2RlKSB7XHJcblx0XHRcdFx0dHJ5IHtcclxuXHRcdFx0XHRcdG5vZGVzW2ldLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQobm9kZXNbaV0pXHJcblx0XHRcdFx0fSBjYXRjaCAoZSkge1xyXG5cdFx0XHRcdFx0LyogZXNsaW50LWRpc2FibGUgbWF4LWxlbiAqL1xyXG5cdFx0XHRcdFx0Ly8gaWdub3JlIGlmIHRoaXMgZmFpbHMgZHVlIHRvIG9yZGVyIG9mIGV2ZW50cyAoc2VlXHJcblx0XHRcdFx0XHQvLyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzIxOTI2MDgzL2ZhaWxlZC10by1leGVjdXRlLXJlbW92ZWNoaWxkLW9uLW5vZGUpXHJcblx0XHRcdFx0XHQvKiBlc2xpbnQtZW5hYmxlIG1heC1sZW4gKi9cclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0Y2FjaGVkID0gW10uY29uY2F0KGNhY2hlZClcclxuXHRcdFx0XHRpZiAoY2FjaGVkW2ldKSB1bmxvYWQoY2FjaGVkW2ldKVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHQvLyByZWxlYXNlIG1lbW9yeSBpZiBub2RlcyBpcyBhbiBhcnJheS4gVGhpcyBjaGVjayBzaG91bGQgZmFpbCBpZiBub2Rlc1xyXG5cdFx0Ly8gaXMgYSBOb2RlTGlzdCAoc2VlIGxvb3AgYWJvdmUpXHJcblx0XHRpZiAobm9kZXMubGVuZ3RoKSB7XHJcblx0XHRcdG5vZGVzLmxlbmd0aCA9IDBcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIHVubG9hZChjYWNoZWQpIHtcclxuXHRcdGlmIChjYWNoZWQuY29uZmlnQ29udGV4dCAmJiBpc0Z1bmN0aW9uKGNhY2hlZC5jb25maWdDb250ZXh0Lm9udW5sb2FkKSkge1xyXG5cdFx0XHRjYWNoZWQuY29uZmlnQ29udGV4dC5vbnVubG9hZCgpXHJcblx0XHRcdGNhY2hlZC5jb25maWdDb250ZXh0Lm9udW5sb2FkID0gbnVsbFxyXG5cdFx0fVxyXG5cdFx0aWYgKGNhY2hlZC5jb250cm9sbGVycykge1xyXG5cdFx0XHRmb3JFYWNoKGNhY2hlZC5jb250cm9sbGVycywgZnVuY3Rpb24gKGNvbnRyb2xsZXIpIHtcclxuXHRcdFx0XHRpZiAoaXNGdW5jdGlvbihjb250cm9sbGVyLm9udW5sb2FkKSkge1xyXG5cdFx0XHRcdFx0Y29udHJvbGxlci5vbnVubG9hZCh7cHJldmVudERlZmF1bHQ6IG5vb3B9KVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSlcclxuXHRcdH1cclxuXHRcdGlmIChjYWNoZWQuY2hpbGRyZW4pIHtcclxuXHRcdFx0aWYgKGlzQXJyYXkoY2FjaGVkLmNoaWxkcmVuKSkgZm9yRWFjaChjYWNoZWQuY2hpbGRyZW4sIHVubG9hZClcclxuXHRcdFx0ZWxzZSBpZiAoY2FjaGVkLmNoaWxkcmVuLnRhZykgdW5sb2FkKGNhY2hlZC5jaGlsZHJlbilcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIGFwcGVuZFRleHRGcmFnbWVudChwYXJlbnRFbGVtZW50LCBkYXRhKSB7XHJcblx0XHR0cnkge1xyXG5cdFx0XHRwYXJlbnRFbGVtZW50LmFwcGVuZENoaWxkKFxyXG5cdFx0XHRcdCRkb2N1bWVudC5jcmVhdGVSYW5nZSgpLmNyZWF0ZUNvbnRleHR1YWxGcmFnbWVudChkYXRhKSlcclxuXHRcdH0gY2F0Y2ggKGUpIHtcclxuXHRcdFx0cGFyZW50RWxlbWVudC5pbnNlcnRBZGphY2VudEhUTUwoXCJiZWZvcmVlbmRcIiwgZGF0YSlcclxuXHRcdFx0cmVwbGFjZVNjcmlwdE5vZGVzKHBhcmVudEVsZW1lbnQpXHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvLyBSZXBsYWNlIHNjcmlwdCB0YWdzIGluc2lkZSBnaXZlbiBET00gZWxlbWVudCB3aXRoIGV4ZWN1dGFibGUgb25lcy5cclxuXHQvLyBXaWxsIGFsc28gY2hlY2sgY2hpbGRyZW4gcmVjdXJzaXZlbHkgYW5kIHJlcGxhY2UgYW55IGZvdW5kIHNjcmlwdFxyXG5cdC8vIHRhZ3MgaW4gc2FtZSBtYW5uZXIuXHJcblx0ZnVuY3Rpb24gcmVwbGFjZVNjcmlwdE5vZGVzKG5vZGUpIHtcclxuXHRcdGlmIChub2RlLnRhZ05hbWUgPT09IFwiU0NSSVBUXCIpIHtcclxuXHRcdFx0bm9kZS5wYXJlbnROb2RlLnJlcGxhY2VDaGlsZChidWlsZEV4ZWN1dGFibGVOb2RlKG5vZGUpLCBub2RlKVxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dmFyIGNoaWxkcmVuID0gbm9kZS5jaGlsZE5vZGVzXHJcblx0XHRcdGlmIChjaGlsZHJlbiAmJiBjaGlsZHJlbi5sZW5ndGgpIHtcclxuXHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdFx0XHRyZXBsYWNlU2NyaXB0Tm9kZXMoY2hpbGRyZW5baV0pXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIG5vZGVcclxuXHR9XHJcblxyXG5cdC8vIFJlcGxhY2Ugc2NyaXB0IGVsZW1lbnQgd2l0aCBvbmUgd2hvc2UgY29udGVudHMgYXJlIGV4ZWN1dGFibGUuXHJcblx0ZnVuY3Rpb24gYnVpbGRFeGVjdXRhYmxlTm9kZShub2RlKXtcclxuXHRcdHZhciBzY3JpcHRFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzY3JpcHRcIilcclxuXHRcdHZhciBhdHRycyA9IG5vZGUuYXR0cmlidXRlc1xyXG5cclxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgYXR0cnMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0c2NyaXB0RWwuc2V0QXR0cmlidXRlKGF0dHJzW2ldLm5hbWUsIGF0dHJzW2ldLnZhbHVlKVxyXG5cdFx0fVxyXG5cclxuXHRcdHNjcmlwdEVsLnRleHQgPSBub2RlLmlubmVySFRNTFxyXG5cdFx0cmV0dXJuIHNjcmlwdEVsXHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBpbmplY3RIVE1MKHBhcmVudEVsZW1lbnQsIGluZGV4LCBkYXRhKSB7XHJcblx0XHR2YXIgbmV4dFNpYmxpbmcgPSBwYXJlbnRFbGVtZW50LmNoaWxkTm9kZXNbaW5kZXhdXHJcblx0XHRpZiAobmV4dFNpYmxpbmcpIHtcclxuXHRcdFx0dmFyIGlzRWxlbWVudCA9IG5leHRTaWJsaW5nLm5vZGVUeXBlICE9PSAxXHJcblx0XHRcdHZhciBwbGFjZWhvbGRlciA9ICRkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKVxyXG5cdFx0XHRpZiAoaXNFbGVtZW50KSB7XHJcblx0XHRcdFx0cGFyZW50RWxlbWVudC5pbnNlcnRCZWZvcmUocGxhY2Vob2xkZXIsIG5leHRTaWJsaW5nIHx8IG51bGwpXHJcblx0XHRcdFx0cGxhY2Vob2xkZXIuaW5zZXJ0QWRqYWNlbnRIVE1MKFwiYmVmb3JlYmVnaW5cIiwgZGF0YSlcclxuXHRcdFx0XHRwYXJlbnRFbGVtZW50LnJlbW92ZUNoaWxkKHBsYWNlaG9sZGVyKVxyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdG5leHRTaWJsaW5nLmluc2VydEFkamFjZW50SFRNTChcImJlZm9yZWJlZ2luXCIsIGRhdGEpXHJcblx0XHRcdH1cclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGFwcGVuZFRleHRGcmFnbWVudChwYXJlbnRFbGVtZW50LCBkYXRhKVxyXG5cdFx0fVxyXG5cclxuXHRcdHZhciBub2RlcyA9IFtdXHJcblxyXG5cdFx0d2hpbGUgKHBhcmVudEVsZW1lbnQuY2hpbGROb2Rlc1tpbmRleF0gIT09IG5leHRTaWJsaW5nKSB7XHJcblx0XHRcdG5vZGVzLnB1c2gocGFyZW50RWxlbWVudC5jaGlsZE5vZGVzW2luZGV4XSlcclxuXHRcdFx0aW5kZXgrK1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBub2Rlc1xyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gYXV0b3JlZHJhdyhjYWxsYmFjaywgb2JqZWN0KSB7XHJcblx0XHRyZXR1cm4gZnVuY3Rpb24gKGUpIHtcclxuXHRcdFx0ZSA9IGUgfHwgZXZlbnRcclxuXHRcdFx0bS5yZWRyYXcuc3RyYXRlZ3koXCJkaWZmXCIpXHJcblx0XHRcdG0uc3RhcnRDb21wdXRhdGlvbigpXHJcblx0XHRcdHRyeSB7XHJcblx0XHRcdFx0cmV0dXJuIGNhbGxiYWNrLmNhbGwob2JqZWN0LCBlKVxyXG5cdFx0XHR9IGZpbmFsbHkge1xyXG5cdFx0XHRcdGVuZEZpcnN0Q29tcHV0YXRpb24oKVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHR2YXIgaHRtbFxyXG5cdHZhciBkb2N1bWVudE5vZGUgPSB7XHJcblx0XHRhcHBlbmRDaGlsZDogZnVuY3Rpb24gKG5vZGUpIHtcclxuXHRcdFx0aWYgKGh0bWwgPT09IHVuZGVmaW5lZCkgaHRtbCA9ICRkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaHRtbFwiKVxyXG5cdFx0XHRpZiAoJGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCAmJlxyXG5cdFx0XHRcdFx0JGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCAhPT0gbm9kZSkge1xyXG5cdFx0XHRcdCRkb2N1bWVudC5yZXBsYWNlQ2hpbGQobm9kZSwgJGRvY3VtZW50LmRvY3VtZW50RWxlbWVudClcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHQkZG9jdW1lbnQuYXBwZW5kQ2hpbGQobm9kZSlcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dGhpcy5jaGlsZE5vZGVzID0gJGRvY3VtZW50LmNoaWxkTm9kZXNcclxuXHRcdH0sXHJcblxyXG5cdFx0aW5zZXJ0QmVmb3JlOiBmdW5jdGlvbiAobm9kZSkge1xyXG5cdFx0XHR0aGlzLmFwcGVuZENoaWxkKG5vZGUpXHJcblx0XHR9LFxyXG5cclxuXHRcdGNoaWxkTm9kZXM6IFtdXHJcblx0fVxyXG5cclxuXHR2YXIgbm9kZUNhY2hlID0gW11cclxuXHR2YXIgY2VsbENhY2hlID0ge31cclxuXHJcblx0bS5yZW5kZXIgPSBmdW5jdGlvbiAocm9vdCwgY2VsbCwgZm9yY2VSZWNyZWF0aW9uKSB7XHJcblx0XHRpZiAoIXJvb3QpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiRW5zdXJlIHRoZSBET00gZWxlbWVudCBiZWluZyBwYXNzZWQgdG8gXCIgK1xyXG5cdFx0XHRcdFwibS5yb3V0ZS9tLm1vdW50L20ucmVuZGVyIGlzIG5vdCB1bmRlZmluZWQuXCIpXHJcblx0XHR9XHJcblx0XHR2YXIgY29uZmlncyA9IFtdXHJcblx0XHR2YXIgaWQgPSBnZXRDZWxsQ2FjaGVLZXkocm9vdClcclxuXHRcdHZhciBpc0RvY3VtZW50Um9vdCA9IHJvb3QgPT09ICRkb2N1bWVudFxyXG5cdFx0dmFyIG5vZGVcclxuXHJcblx0XHRpZiAoaXNEb2N1bWVudFJvb3QgfHwgcm9vdCA9PT0gJGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCkge1xyXG5cdFx0XHRub2RlID0gZG9jdW1lbnROb2RlXHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRub2RlID0gcm9vdFxyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChpc0RvY3VtZW50Um9vdCAmJiBjZWxsLnRhZyAhPT0gXCJodG1sXCIpIHtcclxuXHRcdFx0Y2VsbCA9IHt0YWc6IFwiaHRtbFwiLCBhdHRyczoge30sIGNoaWxkcmVuOiBjZWxsfVxyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChjZWxsQ2FjaGVbaWRdID09PSB1bmRlZmluZWQpIGNsZWFyKG5vZGUuY2hpbGROb2RlcylcclxuXHRcdGlmIChmb3JjZVJlY3JlYXRpb24gPT09IHRydWUpIHJlc2V0KHJvb3QpXHJcblxyXG5cdFx0Y2VsbENhY2hlW2lkXSA9IGJ1aWxkKFxyXG5cdFx0XHRub2RlLFxyXG5cdFx0XHRudWxsLFxyXG5cdFx0XHR1bmRlZmluZWQsXHJcblx0XHRcdHVuZGVmaW5lZCxcclxuXHRcdFx0Y2VsbCxcclxuXHRcdFx0Y2VsbENhY2hlW2lkXSxcclxuXHRcdFx0ZmFsc2UsXHJcblx0XHRcdDAsXHJcblx0XHRcdG51bGwsXHJcblx0XHRcdHVuZGVmaW5lZCxcclxuXHRcdFx0Y29uZmlncylcclxuXHJcblx0XHRmb3JFYWNoKGNvbmZpZ3MsIGZ1bmN0aW9uIChjb25maWcpIHsgY29uZmlnKCkgfSlcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIGdldENlbGxDYWNoZUtleShlbGVtZW50KSB7XHJcblx0XHR2YXIgaW5kZXggPSBub2RlQ2FjaGUuaW5kZXhPZihlbGVtZW50KVxyXG5cdFx0cmV0dXJuIGluZGV4IDwgMCA/IG5vZGVDYWNoZS5wdXNoKGVsZW1lbnQpIC0gMSA6IGluZGV4XHJcblx0fVxyXG5cclxuXHRtLnRydXN0ID0gZnVuY3Rpb24gKHZhbHVlKSB7XHJcblx0XHR2YWx1ZSA9IG5ldyBTdHJpbmcodmFsdWUpIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tbmV3LXdyYXBwZXJzXHJcblx0XHR2YWx1ZS4kdHJ1c3RlZCA9IHRydWVcclxuXHRcdHJldHVybiB2YWx1ZVxyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gZ2V0dGVyc2V0dGVyKHN0b3JlKSB7XHJcblx0XHRmdW5jdGlvbiBwcm9wKCkge1xyXG5cdFx0XHRpZiAoYXJndW1lbnRzLmxlbmd0aCkgc3RvcmUgPSBhcmd1bWVudHNbMF1cclxuXHRcdFx0cmV0dXJuIHN0b3JlXHJcblx0XHR9XHJcblxyXG5cdFx0cHJvcC50b0pTT04gPSBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdHJldHVybiBzdG9yZVxyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBwcm9wXHJcblx0fVxyXG5cclxuXHRtLnByb3AgPSBmdW5jdGlvbiAoc3RvcmUpIHtcclxuXHRcdGlmICgoc3RvcmUgIT0gbnVsbCAmJiAoaXNPYmplY3Qoc3RvcmUpIHx8IGlzRnVuY3Rpb24oc3RvcmUpKSB8fCAoKHR5cGVvZiBQcm9taXNlICE9PSBcInVuZGVmaW5lZFwiKSAmJiAoc3RvcmUgaW5zdGFuY2VvZiBQcm9taXNlKSkpICYmXHJcblx0XHRcdFx0aXNGdW5jdGlvbihzdG9yZS50aGVuKSkge1xyXG5cdFx0XHRyZXR1cm4gcHJvcGlmeShzdG9yZSlcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gZ2V0dGVyc2V0dGVyKHN0b3JlKVxyXG5cdH1cclxuXHJcblx0dmFyIHJvb3RzID0gW11cclxuXHR2YXIgY29tcG9uZW50cyA9IFtdXHJcblx0dmFyIGNvbnRyb2xsZXJzID0gW11cclxuXHR2YXIgbGFzdFJlZHJhd0lkID0gbnVsbFxyXG5cdHZhciBsYXN0UmVkcmF3Q2FsbFRpbWUgPSAwXHJcblx0dmFyIGNvbXB1dGVQcmVSZWRyYXdIb29rID0gbnVsbFxyXG5cdHZhciBjb21wdXRlUG9zdFJlZHJhd0hvb2sgPSBudWxsXHJcblx0dmFyIHRvcENvbXBvbmVudFxyXG5cdHZhciBGUkFNRV9CVURHRVQgPSAxNiAvLyA2MCBmcmFtZXMgcGVyIHNlY29uZCA9IDEgY2FsbCBwZXIgMTYgbXNcclxuXHJcblx0ZnVuY3Rpb24gcGFyYW1ldGVyaXplKGNvbXBvbmVudCwgYXJncykge1xyXG5cdFx0ZnVuY3Rpb24gY29udHJvbGxlcigpIHtcclxuXHRcdFx0LyogZXNsaW50LWRpc2FibGUgbm8taW52YWxpZC10aGlzICovXHJcblx0XHRcdHJldHVybiAoY29tcG9uZW50LmNvbnRyb2xsZXIgfHwgbm9vcCkuYXBwbHkodGhpcywgYXJncykgfHwgdGhpc1xyXG5cdFx0XHQvKiBlc2xpbnQtZW5hYmxlIG5vLWludmFsaWQtdGhpcyAqL1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChjb21wb25lbnQuY29udHJvbGxlcikge1xyXG5cdFx0XHRjb250cm9sbGVyLnByb3RvdHlwZSA9IGNvbXBvbmVudC5jb250cm9sbGVyLnByb3RvdHlwZVxyXG5cdFx0fVxyXG5cclxuXHRcdGZ1bmN0aW9uIHZpZXcoY3RybCkge1xyXG5cdFx0XHR2YXIgY3VycmVudEFyZ3MgPSBbY3RybF0uY29uY2F0KGFyZ3MpXHJcblx0XHRcdGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdFx0Y3VycmVudEFyZ3MucHVzaChhcmd1bWVudHNbaV0pXHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiBjb21wb25lbnQudmlldy5hcHBseShjb21wb25lbnQsIGN1cnJlbnRBcmdzKVxyXG5cdFx0fVxyXG5cclxuXHRcdHZpZXcuJG9yaWdpbmFsID0gY29tcG9uZW50LnZpZXdcclxuXHRcdHZhciBvdXRwdXQgPSB7Y29udHJvbGxlcjogY29udHJvbGxlciwgdmlldzogdmlld31cclxuXHRcdGlmIChhcmdzWzBdICYmIGFyZ3NbMF0ua2V5ICE9IG51bGwpIG91dHB1dC5hdHRycyA9IHtrZXk6IGFyZ3NbMF0ua2V5fVxyXG5cdFx0cmV0dXJuIG91dHB1dFxyXG5cdH1cclxuXHJcblx0bS5jb21wb25lbnQgPSBmdW5jdGlvbiAoY29tcG9uZW50KSB7XHJcblx0XHR2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoIC0gMSlcclxuXHJcblx0XHRmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXVxyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBwYXJhbWV0ZXJpemUoY29tcG9uZW50LCBhcmdzKVxyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gY2hlY2tQcmV2ZW50ZWQoY29tcG9uZW50LCByb290LCBpbmRleCwgaXNQcmV2ZW50ZWQpIHtcclxuXHRcdGlmICghaXNQcmV2ZW50ZWQpIHtcclxuXHRcdFx0bS5yZWRyYXcuc3RyYXRlZ3koXCJhbGxcIilcclxuXHRcdFx0bS5zdGFydENvbXB1dGF0aW9uKClcclxuXHRcdFx0cm9vdHNbaW5kZXhdID0gcm9vdFxyXG5cdFx0XHR2YXIgY3VycmVudENvbXBvbmVudFxyXG5cclxuXHRcdFx0aWYgKGNvbXBvbmVudCkge1xyXG5cdFx0XHRcdGN1cnJlbnRDb21wb25lbnQgPSB0b3BDb21wb25lbnQgPSBjb21wb25lbnRcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRjdXJyZW50Q29tcG9uZW50ID0gdG9wQ29tcG9uZW50ID0gY29tcG9uZW50ID0ge2NvbnRyb2xsZXI6IG5vb3B9XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHZhciBjb250cm9sbGVyID0gbmV3IChjb21wb25lbnQuY29udHJvbGxlciB8fCBub29wKSgpXHJcblxyXG5cdFx0XHQvLyBjb250cm9sbGVycyBtYXkgY2FsbCBtLm1vdW50IHJlY3Vyc2l2ZWx5ICh2aWEgbS5yb3V0ZSByZWRpcmVjdHMsXHJcblx0XHRcdC8vIGZvciBleGFtcGxlKVxyXG5cdFx0XHQvLyB0aGlzIGNvbmRpdGlvbmFsIGVuc3VyZXMgb25seSB0aGUgbGFzdCByZWN1cnNpdmUgbS5tb3VudCBjYWxsIGlzXHJcblx0XHRcdC8vIGFwcGxpZWRcclxuXHRcdFx0aWYgKGN1cnJlbnRDb21wb25lbnQgPT09IHRvcENvbXBvbmVudCkge1xyXG5cdFx0XHRcdGNvbnRyb2xsZXJzW2luZGV4XSA9IGNvbnRyb2xsZXJcclxuXHRcdFx0XHRjb21wb25lbnRzW2luZGV4XSA9IGNvbXBvbmVudFxyXG5cdFx0XHR9XHJcblx0XHRcdGVuZEZpcnN0Q29tcHV0YXRpb24oKVxyXG5cdFx0XHRpZiAoY29tcG9uZW50ID09PSBudWxsKSB7XHJcblx0XHRcdFx0cmVtb3ZlUm9vdEVsZW1lbnQocm9vdCwgaW5kZXgpXHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIGNvbnRyb2xsZXJzW2luZGV4XVxyXG5cdFx0fSBlbHNlIGlmIChjb21wb25lbnQgPT0gbnVsbCkge1xyXG5cdFx0XHRyZW1vdmVSb290RWxlbWVudChyb290LCBpbmRleClcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdG0ubW91bnQgPSBtLm1vZHVsZSA9IGZ1bmN0aW9uIChyb290LCBjb21wb25lbnQpIHtcclxuXHRcdGlmICghcm9vdCkge1xyXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJQbGVhc2UgZW5zdXJlIHRoZSBET00gZWxlbWVudCBleGlzdHMgYmVmb3JlIFwiICtcclxuXHRcdFx0XHRcInJlbmRlcmluZyBhIHRlbXBsYXRlIGludG8gaXQuXCIpXHJcblx0XHR9XHJcblxyXG5cdFx0dmFyIGluZGV4ID0gcm9vdHMuaW5kZXhPZihyb290KVxyXG5cdFx0aWYgKGluZGV4IDwgMCkgaW5kZXggPSByb290cy5sZW5ndGhcclxuXHJcblx0XHR2YXIgaXNQcmV2ZW50ZWQgPSBmYWxzZVxyXG5cdFx0dmFyIGV2ZW50ID0ge1xyXG5cdFx0XHRwcmV2ZW50RGVmYXVsdDogZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdGlzUHJldmVudGVkID0gdHJ1ZVxyXG5cdFx0XHRcdGNvbXB1dGVQcmVSZWRyYXdIb29rID0gY29tcHV0ZVBvc3RSZWRyYXdIb29rID0gbnVsbFxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0Zm9yRWFjaCh1bmxvYWRlcnMsIGZ1bmN0aW9uICh1bmxvYWRlcikge1xyXG5cdFx0XHR1bmxvYWRlci5oYW5kbGVyLmNhbGwodW5sb2FkZXIuY29udHJvbGxlciwgZXZlbnQpXHJcblx0XHRcdHVubG9hZGVyLmNvbnRyb2xsZXIub251bmxvYWQgPSBudWxsXHJcblx0XHR9KVxyXG5cclxuXHRcdGlmIChpc1ByZXZlbnRlZCkge1xyXG5cdFx0XHRmb3JFYWNoKHVubG9hZGVycywgZnVuY3Rpb24gKHVubG9hZGVyKSB7XHJcblx0XHRcdFx0dW5sb2FkZXIuY29udHJvbGxlci5vbnVubG9hZCA9IHVubG9hZGVyLmhhbmRsZXJcclxuXHRcdFx0fSlcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHVubG9hZGVycyA9IFtdXHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKGNvbnRyb2xsZXJzW2luZGV4XSAmJiBpc0Z1bmN0aW9uKGNvbnRyb2xsZXJzW2luZGV4XS5vbnVubG9hZCkpIHtcclxuXHRcdFx0Y29udHJvbGxlcnNbaW5kZXhdLm9udW5sb2FkKGV2ZW50KVxyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBjaGVja1ByZXZlbnRlZChjb21wb25lbnQsIHJvb3QsIGluZGV4LCBpc1ByZXZlbnRlZClcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIHJlbW92ZVJvb3RFbGVtZW50KHJvb3QsIGluZGV4KSB7XHJcblx0XHRyb290cy5zcGxpY2UoaW5kZXgsIDEpXHJcblx0XHRjb250cm9sbGVycy5zcGxpY2UoaW5kZXgsIDEpXHJcblx0XHRjb21wb25lbnRzLnNwbGljZShpbmRleCwgMSlcclxuXHRcdHJlc2V0KHJvb3QpXHJcblx0XHRub2RlQ2FjaGUuc3BsaWNlKGdldENlbGxDYWNoZUtleShyb290KSwgMSlcclxuXHR9XHJcblxyXG5cdHZhciByZWRyYXdpbmcgPSBmYWxzZVxyXG5cdG0ucmVkcmF3ID0gZnVuY3Rpb24gKGZvcmNlKSB7XHJcblx0XHRpZiAocmVkcmF3aW5nKSByZXR1cm5cclxuXHRcdHJlZHJhd2luZyA9IHRydWVcclxuXHRcdGlmIChmb3JjZSkgZm9yY2luZyA9IHRydWVcclxuXHJcblx0XHR0cnkge1xyXG5cdFx0XHQvLyBsYXN0UmVkcmF3SWQgaXMgYSBwb3NpdGl2ZSBudW1iZXIgaWYgYSBzZWNvbmQgcmVkcmF3IGlzIHJlcXVlc3RlZFxyXG5cdFx0XHQvLyBiZWZvcmUgdGhlIG5leHQgYW5pbWF0aW9uIGZyYW1lXHJcblx0XHRcdC8vIGxhc3RSZWRyYXdJZCBpcyBudWxsIGlmIGl0J3MgdGhlIGZpcnN0IHJlZHJhdyBhbmQgbm90IGFuIGV2ZW50XHJcblx0XHRcdC8vIGhhbmRsZXJcclxuXHRcdFx0aWYgKGxhc3RSZWRyYXdJZCAmJiAhZm9yY2UpIHtcclxuXHRcdFx0XHQvLyB3aGVuIHNldFRpbWVvdXQ6IG9ubHkgcmVzY2hlZHVsZSByZWRyYXcgaWYgdGltZSBiZXR3ZWVuIG5vd1xyXG5cdFx0XHRcdC8vIGFuZCBwcmV2aW91cyByZWRyYXcgaXMgYmlnZ2VyIHRoYW4gYSBmcmFtZSwgb3RoZXJ3aXNlIGtlZXBcclxuXHRcdFx0XHQvLyBjdXJyZW50bHkgc2NoZWR1bGVkIHRpbWVvdXRcclxuXHRcdFx0XHQvLyB3aGVuIHJBRjogYWx3YXlzIHJlc2NoZWR1bGUgcmVkcmF3XHJcblx0XHRcdFx0aWYgKCRyZXF1ZXN0QW5pbWF0aW9uRnJhbWUgPT09IGdsb2JhbC5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHxcclxuXHRcdFx0XHRcdFx0bmV3IERhdGUoKSAtIGxhc3RSZWRyYXdDYWxsVGltZSA+IEZSQU1FX0JVREdFVCkge1xyXG5cdFx0XHRcdFx0aWYgKGxhc3RSZWRyYXdJZCA+IDApICRjYW5jZWxBbmltYXRpb25GcmFtZShsYXN0UmVkcmF3SWQpXHJcblx0XHRcdFx0XHRsYXN0UmVkcmF3SWQgPSAkcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHJlZHJhdywgRlJBTUVfQlVER0VUKVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRyZWRyYXcoKVxyXG5cdFx0XHRcdGxhc3RSZWRyYXdJZCA9ICRyZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdFx0bGFzdFJlZHJhd0lkID0gbnVsbFxyXG5cdFx0XHRcdH0sIEZSQU1FX0JVREdFVClcclxuXHRcdFx0fVxyXG5cdFx0fSBmaW5hbGx5IHtcclxuXHRcdFx0cmVkcmF3aW5nID0gZm9yY2luZyA9IGZhbHNlXHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRtLnJlZHJhdy5zdHJhdGVneSA9IG0ucHJvcCgpXHJcblx0ZnVuY3Rpb24gcmVkcmF3KCkge1xyXG5cdFx0aWYgKGNvbXB1dGVQcmVSZWRyYXdIb29rKSB7XHJcblx0XHRcdGNvbXB1dGVQcmVSZWRyYXdIb29rKClcclxuXHRcdFx0Y29tcHV0ZVByZVJlZHJhd0hvb2sgPSBudWxsXHJcblx0XHR9XHJcblx0XHRmb3JFYWNoKHJvb3RzLCBmdW5jdGlvbiAocm9vdCwgaSkge1xyXG5cdFx0XHR2YXIgY29tcG9uZW50ID0gY29tcG9uZW50c1tpXVxyXG5cdFx0XHRpZiAoY29udHJvbGxlcnNbaV0pIHtcclxuXHRcdFx0XHR2YXIgYXJncyA9IFtjb250cm9sbGVyc1tpXV1cclxuXHRcdFx0XHRtLnJlbmRlcihyb290LFxyXG5cdFx0XHRcdFx0Y29tcG9uZW50LnZpZXcgPyBjb21wb25lbnQudmlldyhjb250cm9sbGVyc1tpXSwgYXJncykgOiBcIlwiKVxyXG5cdFx0XHR9XHJcblx0XHR9KVxyXG5cdFx0Ly8gYWZ0ZXIgcmVuZGVyaW5nIHdpdGhpbiBhIHJvdXRlZCBjb250ZXh0LCB3ZSBuZWVkIHRvIHNjcm9sbCBiYWNrIHRvXHJcblx0XHQvLyB0aGUgdG9wLCBhbmQgZmV0Y2ggdGhlIGRvY3VtZW50IHRpdGxlIGZvciBoaXN0b3J5LnB1c2hTdGF0ZVxyXG5cdFx0aWYgKGNvbXB1dGVQb3N0UmVkcmF3SG9vaykge1xyXG5cdFx0XHRjb21wdXRlUG9zdFJlZHJhd0hvb2soKVxyXG5cdFx0XHRjb21wdXRlUG9zdFJlZHJhd0hvb2sgPSBudWxsXHJcblx0XHR9XHJcblx0XHRsYXN0UmVkcmF3SWQgPSBudWxsXHJcblx0XHRsYXN0UmVkcmF3Q2FsbFRpbWUgPSBuZXcgRGF0ZSgpXHJcblx0XHRtLnJlZHJhdy5zdHJhdGVneShcImRpZmZcIilcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIGVuZEZpcnN0Q29tcHV0YXRpb24oKSB7XHJcblx0XHRpZiAobS5yZWRyYXcuc3RyYXRlZ3koKSA9PT0gXCJub25lXCIpIHtcclxuXHRcdFx0cGVuZGluZ1JlcXVlc3RzLS1cclxuXHRcdFx0bS5yZWRyYXcuc3RyYXRlZ3koXCJkaWZmXCIpXHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRtLmVuZENvbXB1dGF0aW9uKClcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdG0ud2l0aEF0dHIgPSBmdW5jdGlvbiAocHJvcCwgd2l0aEF0dHJDYWxsYmFjaywgY2FsbGJhY2tUaGlzKSB7XHJcblx0XHRyZXR1cm4gZnVuY3Rpb24gKGUpIHtcclxuXHRcdFx0ZSA9IGUgfHwgd2luZG93LmV2ZW50XHJcblx0XHRcdC8qIGVzbGludC1kaXNhYmxlIG5vLWludmFsaWQtdGhpcyAqL1xyXG5cdFx0XHR2YXIgY3VycmVudFRhcmdldCA9IGUuY3VycmVudFRhcmdldCB8fCB0aGlzXHJcblx0XHRcdHZhciBfdGhpcyA9IGNhbGxiYWNrVGhpcyB8fCB0aGlzXHJcblx0XHRcdC8qIGVzbGludC1lbmFibGUgbm8taW52YWxpZC10aGlzICovXHJcblx0XHRcdHZhciB0YXJnZXQgPSBwcm9wIGluIGN1cnJlbnRUYXJnZXQgP1xyXG5cdFx0XHRcdGN1cnJlbnRUYXJnZXRbcHJvcF0gOlxyXG5cdFx0XHRcdGN1cnJlbnRUYXJnZXQuZ2V0QXR0cmlidXRlKHByb3ApXHJcblx0XHRcdHdpdGhBdHRyQ2FsbGJhY2suY2FsbChfdGhpcywgdGFyZ2V0KVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0Ly8gcm91dGluZ1xyXG5cdHZhciBtb2RlcyA9IHtwYXRobmFtZTogXCJcIiwgaGFzaDogXCIjXCIsIHNlYXJjaDogXCI/XCJ9XHJcblx0dmFyIHJlZGlyZWN0ID0gbm9vcFxyXG5cdHZhciBpc0RlZmF1bHRSb3V0ZSA9IGZhbHNlXHJcblx0dmFyIHJvdXRlUGFyYW1zLCBjdXJyZW50Um91dGVcclxuXHJcblx0bS5yb3V0ZSA9IGZ1bmN0aW9uIChyb290LCBhcmcxLCBhcmcyLCB2ZG9tKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcclxuXHRcdC8vIG0ucm91dGUoKVxyXG5cdFx0aWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApIHJldHVybiBjdXJyZW50Um91dGVcclxuXHRcdC8vIG0ucm91dGUoZWwsIGRlZmF1bHRSb3V0ZSwgcm91dGVzKVxyXG5cdFx0aWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDMgJiYgaXNTdHJpbmcoYXJnMSkpIHtcclxuXHRcdFx0cmVkaXJlY3QgPSBmdW5jdGlvbiAoc291cmNlKSB7XHJcblx0XHRcdFx0dmFyIHBhdGggPSBjdXJyZW50Um91dGUgPSBub3JtYWxpemVSb3V0ZShzb3VyY2UpXHJcblx0XHRcdFx0aWYgKCFyb3V0ZUJ5VmFsdWUocm9vdCwgYXJnMiwgcGF0aCkpIHtcclxuXHRcdFx0XHRcdGlmIChpc0RlZmF1bHRSb3V0ZSkge1xyXG5cdFx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJFbnN1cmUgdGhlIGRlZmF1bHQgcm91dGUgbWF0Y2hlcyBcIiArXHJcblx0XHRcdFx0XHRcdFx0XCJvbmUgb2YgdGhlIHJvdXRlcyBkZWZpbmVkIGluIG0ucm91dGVcIilcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRpc0RlZmF1bHRSb3V0ZSA9IHRydWVcclxuXHRcdFx0XHRcdG0ucm91dGUoYXJnMSwgdHJ1ZSlcclxuXHRcdFx0XHRcdGlzRGVmYXVsdFJvdXRlID0gZmFsc2VcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHZhciBsaXN0ZW5lciA9IG0ucm91dGUubW9kZSA9PT0gXCJoYXNoXCIgP1xyXG5cdFx0XHRcdFwib25oYXNoY2hhbmdlXCIgOlxyXG5cdFx0XHRcdFwib25wb3BzdGF0ZVwiXHJcblxyXG5cdFx0XHRnbG9iYWxbbGlzdGVuZXJdID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdHZhciBwYXRoID0gJGxvY2F0aW9uW20ucm91dGUubW9kZV1cclxuXHRcdFx0XHRpZiAobS5yb3V0ZS5tb2RlID09PSBcInBhdGhuYW1lXCIpIHBhdGggKz0gJGxvY2F0aW9uLnNlYXJjaFxyXG5cdFx0XHRcdGlmIChjdXJyZW50Um91dGUgIT09IG5vcm1hbGl6ZVJvdXRlKHBhdGgpKSByZWRpcmVjdChwYXRoKVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRjb21wdXRlUHJlUmVkcmF3SG9vayA9IHNldFNjcm9sbFxyXG5cdFx0XHRnbG9iYWxbbGlzdGVuZXJdKClcclxuXHJcblx0XHRcdHJldHVyblxyXG5cdFx0fVxyXG5cclxuXHRcdC8vIGNvbmZpZzogbS5yb3V0ZVxyXG5cdFx0aWYgKHJvb3QuYWRkRXZlbnRMaXN0ZW5lciB8fCByb290LmF0dGFjaEV2ZW50KSB7XHJcblx0XHRcdHZhciBiYXNlID0gbS5yb3V0ZS5tb2RlICE9PSBcInBhdGhuYW1lXCIgPyAkbG9jYXRpb24ucGF0aG5hbWUgOiBcIlwiXHJcblx0XHRcdHJvb3QuaHJlZiA9IGJhc2UgKyBtb2Rlc1ttLnJvdXRlLm1vZGVdICsgdmRvbS5hdHRycy5ocmVmXHJcblx0XHRcdGlmIChyb290LmFkZEV2ZW50TGlzdGVuZXIpIHtcclxuXHRcdFx0XHRyb290LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCByb3V0ZVVub2J0cnVzaXZlKVxyXG5cdFx0XHRcdHJvb3QuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHJvdXRlVW5vYnRydXNpdmUpXHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0cm9vdC5kZXRhY2hFdmVudChcIm9uY2xpY2tcIiwgcm91dGVVbm9idHJ1c2l2ZSlcclxuXHRcdFx0XHRyb290LmF0dGFjaEV2ZW50KFwib25jbGlja1wiLCByb3V0ZVVub2J0cnVzaXZlKVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyZXR1cm5cclxuXHRcdH1cclxuXHRcdC8vIG0ucm91dGUocm91dGUsIHBhcmFtcywgc2hvdWxkUmVwbGFjZUhpc3RvcnlFbnRyeSlcclxuXHRcdGlmIChpc1N0cmluZyhyb290KSkge1xyXG5cdFx0XHR2YXIgb2xkUm91dGUgPSBjdXJyZW50Um91dGVcclxuXHRcdFx0Y3VycmVudFJvdXRlID0gcm9vdFxyXG5cclxuXHRcdFx0dmFyIGFyZ3MgPSBhcmcxIHx8IHt9XHJcblx0XHRcdHZhciBxdWVyeUluZGV4ID0gY3VycmVudFJvdXRlLmluZGV4T2YoXCI/XCIpXHJcblx0XHRcdHZhciBwYXJhbXNcclxuXHJcblx0XHRcdGlmIChxdWVyeUluZGV4ID4gLTEpIHtcclxuXHRcdFx0XHRwYXJhbXMgPSBwYXJzZVF1ZXJ5U3RyaW5nKGN1cnJlbnRSb3V0ZS5zbGljZShxdWVyeUluZGV4ICsgMSkpXHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0cGFyYW1zID0ge31cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Zm9yICh2YXIgaSBpbiBhcmdzKSB7XHJcblx0XHRcdFx0aWYgKGhhc093bi5jYWxsKGFyZ3MsIGkpKSB7XHJcblx0XHRcdFx0XHRwYXJhbXNbaV0gPSBhcmdzW2ldXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR2YXIgcXVlcnlzdHJpbmcgPSBidWlsZFF1ZXJ5U3RyaW5nKHBhcmFtcylcclxuXHRcdFx0dmFyIGN1cnJlbnRQYXRoXHJcblxyXG5cdFx0XHRpZiAocXVlcnlJbmRleCA+IC0xKSB7XHJcblx0XHRcdFx0Y3VycmVudFBhdGggPSBjdXJyZW50Um91dGUuc2xpY2UoMCwgcXVlcnlJbmRleClcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRjdXJyZW50UGF0aCA9IGN1cnJlbnRSb3V0ZVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAocXVlcnlzdHJpbmcpIHtcclxuXHRcdFx0XHRjdXJyZW50Um91dGUgPSBjdXJyZW50UGF0aCArXHJcblx0XHRcdFx0XHQoY3VycmVudFBhdGguaW5kZXhPZihcIj9cIikgPT09IC0xID8gXCI/XCIgOiBcIiZcIikgK1xyXG5cdFx0XHRcdFx0cXVlcnlzdHJpbmdcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dmFyIHJlcGxhY2VIaXN0b3J5ID1cclxuXHRcdFx0XHQoYXJndW1lbnRzLmxlbmd0aCA9PT0gMyA/IGFyZzIgOiBhcmcxKSA9PT0gdHJ1ZSB8fFxyXG5cdFx0XHRcdG9sZFJvdXRlID09PSByb290XHJcblxyXG5cdFx0XHRpZiAoZ2xvYmFsLmhpc3RvcnkucHVzaFN0YXRlKSB7XHJcblx0XHRcdFx0dmFyIG1ldGhvZCA9IHJlcGxhY2VIaXN0b3J5ID8gXCJyZXBsYWNlU3RhdGVcIiA6IFwicHVzaFN0YXRlXCJcclxuXHRcdFx0XHRjb21wdXRlUHJlUmVkcmF3SG9vayA9IHNldFNjcm9sbFxyXG5cdFx0XHRcdGNvbXB1dGVQb3N0UmVkcmF3SG9vayA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHRcdHRyeSB7XHJcblx0XHRcdFx0XHRcdGdsb2JhbC5oaXN0b3J5W21ldGhvZF0obnVsbCwgJGRvY3VtZW50LnRpdGxlLFxyXG5cdFx0XHRcdFx0XHRcdG1vZGVzW20ucm91dGUubW9kZV0gKyBjdXJyZW50Um91dGUpXHJcblx0XHRcdFx0XHR9IGNhdGNoIChlcnIpIHtcclxuXHRcdFx0XHRcdFx0Ly8gSW4gdGhlIGV2ZW50IG9mIGEgcHVzaFN0YXRlIG9yIHJlcGxhY2VTdGF0ZSBmYWlsdXJlLFxyXG5cdFx0XHRcdFx0XHQvLyBmYWxsYmFjayB0byBhIHN0YW5kYXJkIHJlZGlyZWN0LiBUaGlzIGlzIHNwZWNpZmljYWxseVxyXG5cdFx0XHRcdFx0XHQvLyB0byBhZGRyZXNzIGEgU2FmYXJpIHNlY3VyaXR5IGVycm9yIHdoZW4gYXR0ZW1wdGluZyB0b1xyXG5cdFx0XHRcdFx0XHQvLyBjYWxsIHB1c2hTdGF0ZSBtb3JlIHRoYW4gMTAwIHRpbWVzLlxyXG5cdFx0XHRcdFx0XHQkbG9jYXRpb25bbS5yb3V0ZS5tb2RlXSA9IGN1cnJlbnRSb3V0ZVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRyZWRpcmVjdChtb2Rlc1ttLnJvdXRlLm1vZGVdICsgY3VycmVudFJvdXRlKVxyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdCRsb2NhdGlvblttLnJvdXRlLm1vZGVdID0gY3VycmVudFJvdXRlXHJcblx0XHRcdFx0cmVkaXJlY3QobW9kZXNbbS5yb3V0ZS5tb2RlXSArIGN1cnJlbnRSb3V0ZSlcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0bS5yb3V0ZS5wYXJhbSA9IGZ1bmN0aW9uIChrZXkpIHtcclxuXHRcdGlmICghcm91dGVQYXJhbXMpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiWW91IG11c3QgY2FsbCBtLnJvdXRlKGVsZW1lbnQsIGRlZmF1bHRSb3V0ZSwgXCIgK1xyXG5cdFx0XHRcdFwicm91dGVzKSBiZWZvcmUgY2FsbGluZyBtLnJvdXRlLnBhcmFtKClcIilcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoIWtleSkge1xyXG5cdFx0XHRyZXR1cm4gcm91dGVQYXJhbXNcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gcm91dGVQYXJhbXNba2V5XVxyXG5cdH1cclxuXHJcblx0bS5yb3V0ZS5tb2RlID0gXCJzZWFyY2hcIlxyXG5cclxuXHRmdW5jdGlvbiBub3JtYWxpemVSb3V0ZShyb3V0ZSkge1xyXG5cdFx0cmV0dXJuIHJvdXRlLnNsaWNlKG1vZGVzW20ucm91dGUubW9kZV0ubGVuZ3RoKVxyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gcm91dGVCeVZhbHVlKHJvb3QsIHJvdXRlciwgcGF0aCkge1xyXG5cdFx0cm91dGVQYXJhbXMgPSB7fVxyXG5cclxuXHRcdHZhciBxdWVyeVN0YXJ0ID0gcGF0aC5pbmRleE9mKFwiP1wiKVxyXG5cdFx0aWYgKHF1ZXJ5U3RhcnQgIT09IC0xKSB7XHJcblx0XHRcdHJvdXRlUGFyYW1zID0gcGFyc2VRdWVyeVN0cmluZyhcclxuXHRcdFx0XHRwYXRoLnN1YnN0cihxdWVyeVN0YXJ0ICsgMSwgcGF0aC5sZW5ndGgpKVxyXG5cdFx0XHRwYXRoID0gcGF0aC5zdWJzdHIoMCwgcXVlcnlTdGFydClcclxuXHRcdH1cclxuXHJcblx0XHQvLyBHZXQgYWxsIHJvdXRlcyBhbmQgY2hlY2sgaWYgdGhlcmUnc1xyXG5cdFx0Ly8gYW4gZXhhY3QgbWF0Y2ggZm9yIHRoZSBjdXJyZW50IHBhdGhcclxuXHRcdHZhciBrZXlzID0gT2JqZWN0LmtleXMocm91dGVyKVxyXG5cdFx0dmFyIGluZGV4ID0ga2V5cy5pbmRleE9mKHBhdGgpXHJcblxyXG5cdFx0aWYgKGluZGV4ICE9PSAtMSl7XHJcblx0XHRcdG0ubW91bnQocm9vdCwgcm91dGVyW2tleXMgW2luZGV4XV0pXHJcblx0XHRcdHJldHVybiB0cnVlXHJcblx0XHR9XHJcblxyXG5cdFx0Zm9yICh2YXIgcm91dGUgaW4gcm91dGVyKSB7XHJcblx0XHRcdGlmIChoYXNPd24uY2FsbChyb3V0ZXIsIHJvdXRlKSkge1xyXG5cdFx0XHRcdGlmIChyb3V0ZSA9PT0gcGF0aCkge1xyXG5cdFx0XHRcdFx0bS5tb3VudChyb290LCByb3V0ZXJbcm91dGVdKVxyXG5cdFx0XHRcdFx0cmV0dXJuIHRydWVcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdHZhciBtYXRjaGVyID0gbmV3IFJlZ0V4cChcIl5cIiArIHJvdXRlXHJcblx0XHRcdFx0XHQucmVwbGFjZSgvOlteXFwvXSs/XFwuezN9L2csIFwiKC4qPylcIilcclxuXHRcdFx0XHRcdC5yZXBsYWNlKC86W15cXC9dKy9nLCBcIihbXlxcXFwvXSspXCIpICsgXCJcXC8/JFwiKVxyXG5cclxuXHRcdFx0XHRpZiAobWF0Y2hlci50ZXN0KHBhdGgpKSB7XHJcblx0XHRcdFx0XHQvKiBlc2xpbnQtZGlzYWJsZSBuby1sb29wLWZ1bmMgKi9cclxuXHRcdFx0XHRcdHBhdGgucmVwbGFjZShtYXRjaGVyLCBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdFx0XHRcdHZhciBrZXlzID0gcm91dGUubWF0Y2goLzpbXlxcL10rL2cpIHx8IFtdXHJcblx0XHRcdFx0XHRcdHZhciB2YWx1ZXMgPSBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSwgLTIpXHJcblx0XHRcdFx0XHRcdGZvckVhY2goa2V5cywgZnVuY3Rpb24gKGtleSwgaSkge1xyXG5cdFx0XHRcdFx0XHRcdHJvdXRlUGFyYW1zW2tleS5yZXBsYWNlKC86fFxcLi9nLCBcIlwiKV0gPVxyXG5cdFx0XHRcdFx0XHRcdFx0ZGVjb2RlVVJJQ29tcG9uZW50KHZhbHVlc1tpXSlcclxuXHRcdFx0XHRcdFx0fSlcclxuXHRcdFx0XHRcdFx0bS5tb3VudChyb290LCByb3V0ZXJbcm91dGVdKVxyXG5cdFx0XHRcdFx0fSlcclxuXHRcdFx0XHRcdC8qIGVzbGludC1lbmFibGUgbm8tbG9vcC1mdW5jICovXHJcblx0XHRcdFx0XHRyZXR1cm4gdHJ1ZVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gcm91dGVVbm9idHJ1c2l2ZShlKSB7XHJcblx0XHRlID0gZSB8fCBldmVudFxyXG5cdFx0aWYgKGUuY3RybEtleSB8fCBlLm1ldGFLZXkgfHwgZS5zaGlmdEtleSB8fCBlLndoaWNoID09PSAyKSByZXR1cm5cclxuXHJcblx0XHRpZiAoZS5wcmV2ZW50RGVmYXVsdCkge1xyXG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KClcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGUucmV0dXJuVmFsdWUgPSBmYWxzZVxyXG5cdFx0fVxyXG5cclxuXHRcdHZhciBjdXJyZW50VGFyZ2V0ID0gZS5jdXJyZW50VGFyZ2V0IHx8IGUuc3JjRWxlbWVudFxyXG5cdFx0dmFyIGFyZ3NcclxuXHJcblx0XHRpZiAobS5yb3V0ZS5tb2RlID09PSBcInBhdGhuYW1lXCIgJiYgY3VycmVudFRhcmdldC5zZWFyY2gpIHtcclxuXHRcdFx0YXJncyA9IHBhcnNlUXVlcnlTdHJpbmcoY3VycmVudFRhcmdldC5zZWFyY2guc2xpY2UoMSkpXHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRhcmdzID0ge31cclxuXHRcdH1cclxuXHJcblx0XHR3aGlsZSAoY3VycmVudFRhcmdldCAmJiAhL2EvaS50ZXN0KGN1cnJlbnRUYXJnZXQubm9kZU5hbWUpKSB7XHJcblx0XHRcdGN1cnJlbnRUYXJnZXQgPSBjdXJyZW50VGFyZ2V0LnBhcmVudE5vZGVcclxuXHRcdH1cclxuXHJcblx0XHQvLyBjbGVhciBwZW5kaW5nUmVxdWVzdHMgYmVjYXVzZSB3ZSB3YW50IGFuIGltbWVkaWF0ZSByb3V0ZSBjaGFuZ2VcclxuXHRcdHBlbmRpbmdSZXF1ZXN0cyA9IDBcclxuXHRcdG0ucm91dGUoY3VycmVudFRhcmdldFttLnJvdXRlLm1vZGVdXHJcblx0XHRcdC5zbGljZShtb2Rlc1ttLnJvdXRlLm1vZGVdLmxlbmd0aCksIGFyZ3MpXHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBzZXRTY3JvbGwoKSB7XHJcblx0XHRpZiAobS5yb3V0ZS5tb2RlICE9PSBcImhhc2hcIiAmJiAkbG9jYXRpb24uaGFzaCkge1xyXG5cdFx0XHQkbG9jYXRpb24uaGFzaCA9ICRsb2NhdGlvbi5oYXNoXHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRnbG9iYWwuc2Nyb2xsVG8oMCwgMClcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIGJ1aWxkUXVlcnlTdHJpbmcob2JqZWN0LCBwcmVmaXgpIHtcclxuXHRcdHZhciBkdXBsaWNhdGVzID0ge31cclxuXHRcdHZhciBzdHIgPSBbXVxyXG5cclxuXHRcdGZvciAodmFyIHByb3AgaW4gb2JqZWN0KSB7XHJcblx0XHRcdGlmIChoYXNPd24uY2FsbChvYmplY3QsIHByb3ApKSB7XHJcblx0XHRcdFx0dmFyIGtleSA9IHByZWZpeCA/IHByZWZpeCArIFwiW1wiICsgcHJvcCArIFwiXVwiIDogcHJvcFxyXG5cdFx0XHRcdHZhciB2YWx1ZSA9IG9iamVjdFtwcm9wXVxyXG5cclxuXHRcdFx0XHRpZiAodmFsdWUgPT09IG51bGwpIHtcclxuXHRcdFx0XHRcdHN0ci5wdXNoKGVuY29kZVVSSUNvbXBvbmVudChrZXkpKVxyXG5cdFx0XHRcdH0gZWxzZSBpZiAoaXNPYmplY3QodmFsdWUpKSB7XHJcblx0XHRcdFx0XHRzdHIucHVzaChidWlsZFF1ZXJ5U3RyaW5nKHZhbHVlLCBrZXkpKVxyXG5cdFx0XHRcdH0gZWxzZSBpZiAoaXNBcnJheSh2YWx1ZSkpIHtcclxuXHRcdFx0XHRcdHZhciBrZXlzID0gW11cclxuXHRcdFx0XHRcdGR1cGxpY2F0ZXNba2V5XSA9IGR1cGxpY2F0ZXNba2V5XSB8fCB7fVxyXG5cdFx0XHRcdFx0LyogZXNsaW50LWRpc2FibGUgbm8tbG9vcC1mdW5jICovXHJcblx0XHRcdFx0XHRmb3JFYWNoKHZhbHVlLCBmdW5jdGlvbiAoaXRlbSkge1xyXG5cdFx0XHRcdFx0XHQvKiBlc2xpbnQtZW5hYmxlIG5vLWxvb3AtZnVuYyAqL1xyXG5cdFx0XHRcdFx0XHRpZiAoIWR1cGxpY2F0ZXNba2V5XVtpdGVtXSkge1xyXG5cdFx0XHRcdFx0XHRcdGR1cGxpY2F0ZXNba2V5XVtpdGVtXSA9IHRydWVcclxuXHRcdFx0XHRcdFx0XHRrZXlzLnB1c2goZW5jb2RlVVJJQ29tcG9uZW50KGtleSkgKyBcIj1cIiArXHJcblx0XHRcdFx0XHRcdFx0XHRlbmNvZGVVUklDb21wb25lbnQoaXRlbSkpXHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH0pXHJcblx0XHRcdFx0XHRzdHIucHVzaChrZXlzLmpvaW4oXCImXCIpKVxyXG5cdFx0XHRcdH0gZWxzZSBpZiAodmFsdWUgIT09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHRcdFx0c3RyLnB1c2goZW5jb2RlVVJJQ29tcG9uZW50KGtleSkgKyBcIj1cIiArXHJcblx0XHRcdFx0XHRcdGVuY29kZVVSSUNvbXBvbmVudCh2YWx1ZSkpXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHN0ci5qb2luKFwiJlwiKVxyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gcGFyc2VRdWVyeVN0cmluZyhzdHIpIHtcclxuXHRcdGlmIChzdHIgPT09IFwiXCIgfHwgc3RyID09IG51bGwpIHJldHVybiB7fVxyXG5cdFx0aWYgKHN0ci5jaGFyQXQoMCkgPT09IFwiP1wiKSBzdHIgPSBzdHIuc2xpY2UoMSlcclxuXHJcblx0XHR2YXIgcGFpcnMgPSBzdHIuc3BsaXQoXCImXCIpXHJcblx0XHR2YXIgcGFyYW1zID0ge31cclxuXHJcblx0XHRmb3JFYWNoKHBhaXJzLCBmdW5jdGlvbiAoc3RyaW5nKSB7XHJcblx0XHRcdHZhciBwYWlyID0gc3RyaW5nLnNwbGl0KFwiPVwiKVxyXG5cdFx0XHR2YXIga2V5ID0gZGVjb2RlVVJJQ29tcG9uZW50KHBhaXJbMF0pXHJcblx0XHRcdHZhciB2YWx1ZSA9IHBhaXIubGVuZ3RoID09PSAyID8gZGVjb2RlVVJJQ29tcG9uZW50KHBhaXJbMV0pIDogbnVsbFxyXG5cdFx0XHRpZiAocGFyYW1zW2tleV0gIT0gbnVsbCkge1xyXG5cdFx0XHRcdGlmICghaXNBcnJheShwYXJhbXNba2V5XSkpIHBhcmFtc1trZXldID0gW3BhcmFtc1trZXldXVxyXG5cdFx0XHRcdHBhcmFtc1trZXldLnB1c2godmFsdWUpXHJcblx0XHRcdH1cclxuXHRcdFx0ZWxzZSBwYXJhbXNba2V5XSA9IHZhbHVlXHJcblx0XHR9KVxyXG5cclxuXHRcdHJldHVybiBwYXJhbXNcclxuXHR9XHJcblxyXG5cdG0ucm91dGUuYnVpbGRRdWVyeVN0cmluZyA9IGJ1aWxkUXVlcnlTdHJpbmdcclxuXHRtLnJvdXRlLnBhcnNlUXVlcnlTdHJpbmcgPSBwYXJzZVF1ZXJ5U3RyaW5nXHJcblxyXG5cdGZ1bmN0aW9uIHJlc2V0KHJvb3QpIHtcclxuXHRcdHZhciBjYWNoZUtleSA9IGdldENlbGxDYWNoZUtleShyb290KVxyXG5cdFx0Y2xlYXIocm9vdC5jaGlsZE5vZGVzLCBjZWxsQ2FjaGVbY2FjaGVLZXldKVxyXG5cdFx0Y2VsbENhY2hlW2NhY2hlS2V5XSA9IHVuZGVmaW5lZFxyXG5cdH1cclxuXHJcblx0bS5kZWZlcnJlZCA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdHZhciBkZWZlcnJlZCA9IG5ldyBEZWZlcnJlZCgpXHJcblx0XHRkZWZlcnJlZC5wcm9taXNlID0gcHJvcGlmeShkZWZlcnJlZC5wcm9taXNlKVxyXG5cdFx0cmV0dXJuIGRlZmVycmVkXHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBwcm9waWZ5KHByb21pc2UsIGluaXRpYWxWYWx1ZSkge1xyXG5cdFx0dmFyIHByb3AgPSBtLnByb3AoaW5pdGlhbFZhbHVlKVxyXG5cdFx0cHJvbWlzZS50aGVuKHByb3ApXHJcblx0XHRwcm9wLnRoZW4gPSBmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcblx0XHRcdHJldHVybiBwcm9waWZ5KHByb21pc2UudGhlbihyZXNvbHZlLCByZWplY3QpLCBpbml0aWFsVmFsdWUpXHJcblx0XHR9XHJcblxyXG5cdFx0cHJvcC5jYXRjaCA9IHByb3AudGhlbi5iaW5kKG51bGwsIG51bGwpXHJcblx0XHRyZXR1cm4gcHJvcFxyXG5cdH1cclxuXHQvLyBQcm9taXoubWl0aHJpbC5qcyB8IFpvbG1laXN0ZXIgfCBNSVRcclxuXHQvLyBhIG1vZGlmaWVkIHZlcnNpb24gb2YgUHJvbWl6LmpzLCB3aGljaCBkb2VzIG5vdCBjb25mb3JtIHRvIFByb21pc2VzL0ErXHJcblx0Ly8gZm9yIHR3byByZWFzb25zOlxyXG5cdC8vXHJcblx0Ly8gMSkgYHRoZW5gIGNhbGxiYWNrcyBhcmUgY2FsbGVkIHN5bmNocm9ub3VzbHkgKGJlY2F1c2Ugc2V0VGltZW91dCBpcyB0b29cclxuXHQvLyAgICBzbG93LCBhbmQgdGhlIHNldEltbWVkaWF0ZSBwb2x5ZmlsbCBpcyB0b28gYmlnXHJcblx0Ly9cclxuXHQvLyAyKSB0aHJvd2luZyBzdWJjbGFzc2VzIG9mIEVycm9yIGNhdXNlIHRoZSBlcnJvciB0byBiZSBidWJibGVkIHVwIGluc3RlYWRcclxuXHQvLyAgICBvZiB0cmlnZ2VyaW5nIHJlamVjdGlvbiAoYmVjYXVzZSB0aGUgc3BlYyBkb2VzIG5vdCBhY2NvdW50IGZvciB0aGVcclxuXHQvLyAgICBpbXBvcnRhbnQgdXNlIGNhc2Ugb2YgZGVmYXVsdCBicm93c2VyIGVycm9yIGhhbmRsaW5nLCBpLmUuIG1lc3NhZ2Ugdy9cclxuXHQvLyAgICBsaW5lIG51bWJlcilcclxuXHJcblx0dmFyIFJFU09MVklORyA9IDFcclxuXHR2YXIgUkVKRUNUSU5HID0gMlxyXG5cdHZhciBSRVNPTFZFRCA9IDNcclxuXHR2YXIgUkVKRUNURUQgPSA0XHJcblxyXG5cdGZ1bmN0aW9uIERlZmVycmVkKG9uU3VjY2Vzcywgb25GYWlsdXJlKSB7XHJcblx0XHR2YXIgc2VsZiA9IHRoaXNcclxuXHRcdHZhciBzdGF0ZSA9IDBcclxuXHRcdHZhciBwcm9taXNlVmFsdWUgPSAwXHJcblx0XHR2YXIgbmV4dCA9IFtdXHJcblxyXG5cdFx0c2VsZi5wcm9taXNlID0ge31cclxuXHJcblx0XHRzZWxmLnJlc29sdmUgPSBmdW5jdGlvbiAodmFsdWUpIHtcclxuXHRcdFx0aWYgKCFzdGF0ZSkge1xyXG5cdFx0XHRcdHByb21pc2VWYWx1ZSA9IHZhbHVlXHJcblx0XHRcdFx0c3RhdGUgPSBSRVNPTFZJTkdcclxuXHJcblx0XHRcdFx0ZmlyZSgpXHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiBzZWxmXHJcblx0XHR9XHJcblxyXG5cdFx0c2VsZi5yZWplY3QgPSBmdW5jdGlvbiAodmFsdWUpIHtcclxuXHRcdFx0aWYgKCFzdGF0ZSkge1xyXG5cdFx0XHRcdHByb21pc2VWYWx1ZSA9IHZhbHVlXHJcblx0XHRcdFx0c3RhdGUgPSBSRUpFQ1RJTkdcclxuXHJcblx0XHRcdFx0ZmlyZSgpXHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiBzZWxmXHJcblx0XHR9XHJcblxyXG5cdFx0c2VsZi5wcm9taXNlLnRoZW4gPSBmdW5jdGlvbiAob25TdWNjZXNzLCBvbkZhaWx1cmUpIHtcclxuXHRcdFx0dmFyIGRlZmVycmVkID0gbmV3IERlZmVycmVkKG9uU3VjY2Vzcywgb25GYWlsdXJlKVxyXG5cclxuXHRcdFx0aWYgKHN0YXRlID09PSBSRVNPTFZFRCkge1xyXG5cdFx0XHRcdGRlZmVycmVkLnJlc29sdmUocHJvbWlzZVZhbHVlKVxyXG5cdFx0XHR9IGVsc2UgaWYgKHN0YXRlID09PSBSRUpFQ1RFRCkge1xyXG5cdFx0XHRcdGRlZmVycmVkLnJlamVjdChwcm9taXNlVmFsdWUpXHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0bmV4dC5wdXNoKGRlZmVycmVkKVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyZXR1cm4gZGVmZXJyZWQucHJvbWlzZVxyXG5cdFx0fVxyXG5cclxuXHRcdGZ1bmN0aW9uIGZpbmlzaCh0eXBlKSB7XHJcblx0XHRcdHN0YXRlID0gdHlwZSB8fCBSRUpFQ1RFRFxyXG5cdFx0XHRuZXh0Lm1hcChmdW5jdGlvbiAoZGVmZXJyZWQpIHtcclxuXHRcdFx0XHRpZiAoc3RhdGUgPT09IFJFU09MVkVEKSB7XHJcblx0XHRcdFx0XHRkZWZlcnJlZC5yZXNvbHZlKHByb21pc2VWYWx1ZSlcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0ZGVmZXJyZWQucmVqZWN0KHByb21pc2VWYWx1ZSlcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pXHJcblx0XHR9XHJcblxyXG5cdFx0ZnVuY3Rpb24gdGhlbm5hYmxlKHRoZW4sIHN1Y2Nlc3MsIGZhaWx1cmUsIG5vdFRoZW5uYWJsZSkge1xyXG5cdFx0XHRpZiAoKChwcm9taXNlVmFsdWUgIT0gbnVsbCAmJiBpc09iamVjdChwcm9taXNlVmFsdWUpKSB8fFxyXG5cdFx0XHRcdFx0aXNGdW5jdGlvbihwcm9taXNlVmFsdWUpKSAmJiBpc0Z1bmN0aW9uKHRoZW4pKSB7XHJcblx0XHRcdFx0dHJ5IHtcclxuXHRcdFx0XHRcdC8vIGNvdW50IHByb3RlY3RzIGFnYWluc3QgYWJ1c2UgY2FsbHMgZnJvbSBzcGVjIGNoZWNrZXJcclxuXHRcdFx0XHRcdHZhciBjb3VudCA9IDBcclxuXHRcdFx0XHRcdHRoZW4uY2FsbChwcm9taXNlVmFsdWUsIGZ1bmN0aW9uICh2YWx1ZSkge1xyXG5cdFx0XHRcdFx0XHRpZiAoY291bnQrKykgcmV0dXJuXHJcblx0XHRcdFx0XHRcdHByb21pc2VWYWx1ZSA9IHZhbHVlXHJcblx0XHRcdFx0XHRcdHN1Y2Nlc3MoKVxyXG5cdFx0XHRcdFx0fSwgZnVuY3Rpb24gKHZhbHVlKSB7XHJcblx0XHRcdFx0XHRcdGlmIChjb3VudCsrKSByZXR1cm5cclxuXHRcdFx0XHRcdFx0cHJvbWlzZVZhbHVlID0gdmFsdWVcclxuXHRcdFx0XHRcdFx0ZmFpbHVyZSgpXHJcblx0XHRcdFx0XHR9KVxyXG5cdFx0XHRcdH0gY2F0Y2ggKGUpIHtcclxuXHRcdFx0XHRcdG0uZGVmZXJyZWQub25lcnJvcihlKVxyXG5cdFx0XHRcdFx0cHJvbWlzZVZhbHVlID0gZVxyXG5cdFx0XHRcdFx0ZmFpbHVyZSgpXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdG5vdFRoZW5uYWJsZSgpXHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRmdW5jdGlvbiBmaXJlKCkge1xyXG5cdFx0XHQvLyBjaGVjayBpZiBpdCdzIGEgdGhlbmFibGVcclxuXHRcdFx0dmFyIHRoZW5cclxuXHRcdFx0dHJ5IHtcclxuXHRcdFx0XHR0aGVuID0gcHJvbWlzZVZhbHVlICYmIHByb21pc2VWYWx1ZS50aGVuXHJcblx0XHRcdH0gY2F0Y2ggKGUpIHtcclxuXHRcdFx0XHRtLmRlZmVycmVkLm9uZXJyb3IoZSlcclxuXHRcdFx0XHRwcm9taXNlVmFsdWUgPSBlXHJcblx0XHRcdFx0c3RhdGUgPSBSRUpFQ1RJTkdcclxuXHRcdFx0XHRyZXR1cm4gZmlyZSgpXHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmIChzdGF0ZSA9PT0gUkVKRUNUSU5HKSB7XHJcblx0XHRcdFx0bS5kZWZlcnJlZC5vbmVycm9yKHByb21pc2VWYWx1ZSlcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dGhlbm5hYmxlKHRoZW4sIGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHRzdGF0ZSA9IFJFU09MVklOR1xyXG5cdFx0XHRcdGZpcmUoKVxyXG5cdFx0XHR9LCBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdFx0c3RhdGUgPSBSRUpFQ1RJTkdcclxuXHRcdFx0XHRmaXJlKClcclxuXHRcdFx0fSwgZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdHRyeSB7XHJcblx0XHRcdFx0XHRpZiAoc3RhdGUgPT09IFJFU09MVklORyAmJiBpc0Z1bmN0aW9uKG9uU3VjY2VzcykpIHtcclxuXHRcdFx0XHRcdFx0cHJvbWlzZVZhbHVlID0gb25TdWNjZXNzKHByb21pc2VWYWx1ZSlcclxuXHRcdFx0XHRcdH0gZWxzZSBpZiAoc3RhdGUgPT09IFJFSkVDVElORyAmJiBpc0Z1bmN0aW9uKG9uRmFpbHVyZSkpIHtcclxuXHRcdFx0XHRcdFx0cHJvbWlzZVZhbHVlID0gb25GYWlsdXJlKHByb21pc2VWYWx1ZSlcclxuXHRcdFx0XHRcdFx0c3RhdGUgPSBSRVNPTFZJTkdcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9IGNhdGNoIChlKSB7XHJcblx0XHRcdFx0XHRtLmRlZmVycmVkLm9uZXJyb3IoZSlcclxuXHRcdFx0XHRcdHByb21pc2VWYWx1ZSA9IGVcclxuXHRcdFx0XHRcdHJldHVybiBmaW5pc2goKVxyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0aWYgKHByb21pc2VWYWx1ZSA9PT0gc2VsZikge1xyXG5cdFx0XHRcdFx0cHJvbWlzZVZhbHVlID0gVHlwZUVycm9yKClcclxuXHRcdFx0XHRcdGZpbmlzaCgpXHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdHRoZW5uYWJsZSh0aGVuLCBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdFx0XHRcdGZpbmlzaChSRVNPTFZFRClcclxuXHRcdFx0XHRcdH0sIGZpbmlzaCwgZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdFx0XHRmaW5pc2goc3RhdGUgPT09IFJFU09MVklORyAmJiBSRVNPTFZFRClcclxuXHRcdFx0XHRcdH0pXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0bS5kZWZlcnJlZC5vbmVycm9yID0gZnVuY3Rpb24gKGUpIHtcclxuXHRcdGlmICh0eXBlLmNhbGwoZSkgPT09IFwiW29iamVjdCBFcnJvcl1cIiAmJlxyXG5cdFx0XHRcdCEvIEVycm9yLy50ZXN0KGUuY29uc3RydWN0b3IudG9TdHJpbmcoKSkpIHtcclxuXHRcdFx0cGVuZGluZ1JlcXVlc3RzID0gMFxyXG5cdFx0XHR0aHJvdyBlXHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRtLnN5bmMgPSBmdW5jdGlvbiAoYXJncykge1xyXG5cdFx0dmFyIGRlZmVycmVkID0gbS5kZWZlcnJlZCgpXHJcblx0XHR2YXIgb3V0c3RhbmRpbmcgPSBhcmdzLmxlbmd0aFxyXG5cdFx0dmFyIHJlc3VsdHMgPSBbXVxyXG5cdFx0dmFyIG1ldGhvZCA9IFwicmVzb2x2ZVwiXHJcblxyXG5cdFx0ZnVuY3Rpb24gc3luY2hyb25pemVyKHBvcywgcmVzb2x2ZWQpIHtcclxuXHRcdFx0cmV0dXJuIGZ1bmN0aW9uICh2YWx1ZSkge1xyXG5cdFx0XHRcdHJlc3VsdHNbcG9zXSA9IHZhbHVlXHJcblx0XHRcdFx0aWYgKCFyZXNvbHZlZCkgbWV0aG9kID0gXCJyZWplY3RcIlxyXG5cdFx0XHRcdGlmICgtLW91dHN0YW5kaW5nID09PSAwKSB7XHJcblx0XHRcdFx0XHRkZWZlcnJlZC5wcm9taXNlKHJlc3VsdHMpXHJcblx0XHRcdFx0XHRkZWZlcnJlZFttZXRob2RdKHJlc3VsdHMpXHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdHJldHVybiB2YWx1ZVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKGFyZ3MubGVuZ3RoID4gMCkge1xyXG5cdFx0XHRmb3JFYWNoKGFyZ3MsIGZ1bmN0aW9uIChhcmcsIGkpIHtcclxuXHRcdFx0XHRhcmcudGhlbihzeW5jaHJvbml6ZXIoaSwgdHJ1ZSksIHN5bmNocm9uaXplcihpLCBmYWxzZSkpXHJcblx0XHRcdH0pXHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRkZWZlcnJlZC5yZXNvbHZlKFtdKVxyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBkZWZlcnJlZC5wcm9taXNlXHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBpZGVudGl0eSh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgfVxyXG5cclxuXHRmdW5jdGlvbiBoYW5kbGVKc29ucChvcHRpb25zKSB7XHJcblx0XHR2YXIgY2FsbGJhY2tLZXkgPSBvcHRpb25zLmNhbGxiYWNrTmFtZSB8fCBcIm1pdGhyaWxfY2FsbGJhY2tfXCIgK1xyXG5cdFx0XHRuZXcgRGF0ZSgpLmdldFRpbWUoKSArIFwiX1wiICtcclxuXHRcdFx0KE1hdGgucm91bmQoTWF0aC5yYW5kb20oKSAqIDFlMTYpKS50b1N0cmluZygzNilcclxuXHJcblx0XHR2YXIgc2NyaXB0ID0gJGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzY3JpcHRcIilcclxuXHJcblx0XHRnbG9iYWxbY2FsbGJhY2tLZXldID0gZnVuY3Rpb24gKHJlc3ApIHtcclxuXHRcdFx0c2NyaXB0LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc2NyaXB0KVxyXG5cdFx0XHRvcHRpb25zLm9ubG9hZCh7XHJcblx0XHRcdFx0dHlwZTogXCJsb2FkXCIsXHJcblx0XHRcdFx0dGFyZ2V0OiB7XHJcblx0XHRcdFx0XHRyZXNwb25zZVRleHQ6IHJlc3BcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pXHJcblx0XHRcdGdsb2JhbFtjYWxsYmFja0tleV0gPSB1bmRlZmluZWRcclxuXHRcdH1cclxuXHJcblx0XHRzY3JpcHQub25lcnJvciA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0c2NyaXB0LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc2NyaXB0KVxyXG5cclxuXHRcdFx0b3B0aW9ucy5vbmVycm9yKHtcclxuXHRcdFx0XHR0eXBlOiBcImVycm9yXCIsXHJcblx0XHRcdFx0dGFyZ2V0OiB7XHJcblx0XHRcdFx0XHRzdGF0dXM6IDUwMCxcclxuXHRcdFx0XHRcdHJlc3BvbnNlVGV4dDogSlNPTi5zdHJpbmdpZnkoe1xyXG5cdFx0XHRcdFx0XHRlcnJvcjogXCJFcnJvciBtYWtpbmcganNvbnAgcmVxdWVzdFwiXHJcblx0XHRcdFx0XHR9KVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSlcclxuXHRcdFx0Z2xvYmFsW2NhbGxiYWNrS2V5XSA9IHVuZGVmaW5lZFxyXG5cclxuXHRcdFx0cmV0dXJuIGZhbHNlXHJcblx0XHR9XHJcblxyXG5cdFx0c2NyaXB0Lm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0cmV0dXJuIGZhbHNlXHJcblx0XHR9XHJcblxyXG5cdFx0c2NyaXB0LnNyYyA9IG9wdGlvbnMudXJsICtcclxuXHRcdFx0KG9wdGlvbnMudXJsLmluZGV4T2YoXCI/XCIpID4gMCA/IFwiJlwiIDogXCI/XCIpICtcclxuXHRcdFx0KG9wdGlvbnMuY2FsbGJhY2tLZXkgPyBvcHRpb25zLmNhbGxiYWNrS2V5IDogXCJjYWxsYmFja1wiKSArXHJcblx0XHRcdFwiPVwiICsgY2FsbGJhY2tLZXkgK1xyXG5cdFx0XHRcIiZcIiArIGJ1aWxkUXVlcnlTdHJpbmcob3B0aW9ucy5kYXRhIHx8IHt9KVxyXG5cclxuXHRcdCRkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHNjcmlwdClcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIGNyZWF0ZVhocihvcHRpb25zKSB7XHJcblx0XHR2YXIgeGhyID0gbmV3IGdsb2JhbC5YTUxIdHRwUmVxdWVzdCgpXHJcblx0XHR4aHIub3BlbihvcHRpb25zLm1ldGhvZCwgb3B0aW9ucy51cmwsIHRydWUsIG9wdGlvbnMudXNlcixcclxuXHRcdFx0b3B0aW9ucy5wYXNzd29yZClcclxuXHJcblx0XHR4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRpZiAoeGhyLnJlYWR5U3RhdGUgPT09IDQpIHtcclxuXHRcdFx0XHRpZiAoeGhyLnN0YXR1cyA+PSAyMDAgJiYgeGhyLnN0YXR1cyA8IDMwMCkge1xyXG5cdFx0XHRcdFx0b3B0aW9ucy5vbmxvYWQoe3R5cGU6IFwibG9hZFwiLCB0YXJnZXQ6IHhocn0pXHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdG9wdGlvbnMub25lcnJvcih7dHlwZTogXCJlcnJvclwiLCB0YXJnZXQ6IHhocn0pXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKG9wdGlvbnMuc2VyaWFsaXplID09PSBKU09OLnN0cmluZ2lmeSAmJlxyXG5cdFx0XHRcdG9wdGlvbnMuZGF0YSAmJlxyXG5cdFx0XHRcdG9wdGlvbnMubWV0aG9kICE9PSBcIkdFVFwiKSB7XHJcblx0XHRcdHhoci5zZXRSZXF1ZXN0SGVhZGVyKFwiQ29udGVudC1UeXBlXCIsXHJcblx0XHRcdFx0XCJhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04XCIpXHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKG9wdGlvbnMuZGVzZXJpYWxpemUgPT09IEpTT04ucGFyc2UpIHtcclxuXHRcdFx0eGhyLnNldFJlcXVlc3RIZWFkZXIoXCJBY2NlcHRcIiwgXCJhcHBsaWNhdGlvbi9qc29uLCB0ZXh0LypcIilcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoaXNGdW5jdGlvbihvcHRpb25zLmNvbmZpZykpIHtcclxuXHRcdFx0dmFyIG1heWJlWGhyID0gb3B0aW9ucy5jb25maWcoeGhyLCBvcHRpb25zKVxyXG5cdFx0XHRpZiAobWF5YmVYaHIgIT0gbnVsbCkgeGhyID0gbWF5YmVYaHJcclxuXHRcdH1cclxuXHJcblx0XHR2YXIgZGF0YSA9IG9wdGlvbnMubWV0aG9kID09PSBcIkdFVFwiIHx8ICFvcHRpb25zLmRhdGEgPyBcIlwiIDogb3B0aW9ucy5kYXRhXHJcblxyXG5cdFx0aWYgKGRhdGEgJiYgIWlzU3RyaW5nKGRhdGEpICYmIGRhdGEuY29uc3RydWN0b3IgIT09IGdsb2JhbC5Gb3JtRGF0YSkge1xyXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJSZXF1ZXN0IGRhdGEgc2hvdWxkIGJlIGVpdGhlciBiZSBhIHN0cmluZyBvciBcIiArXHJcblx0XHRcdFx0XCJGb3JtRGF0YS4gQ2hlY2sgdGhlIGBzZXJpYWxpemVgIG9wdGlvbiBpbiBgbS5yZXF1ZXN0YFwiKVxyXG5cdFx0fVxyXG5cclxuXHRcdHhoci5zZW5kKGRhdGEpXHJcblx0XHRyZXR1cm4geGhyXHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBhamF4KG9wdGlvbnMpIHtcclxuXHRcdGlmIChvcHRpb25zLmRhdGFUeXBlICYmIG9wdGlvbnMuZGF0YVR5cGUudG9Mb3dlckNhc2UoKSA9PT0gXCJqc29ucFwiKSB7XHJcblx0XHRcdHJldHVybiBoYW5kbGVKc29ucChvcHRpb25zKVxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0cmV0dXJuIGNyZWF0ZVhocihvcHRpb25zKVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gYmluZERhdGEob3B0aW9ucywgZGF0YSwgc2VyaWFsaXplKSB7XHJcblx0XHRpZiAob3B0aW9ucy5tZXRob2QgPT09IFwiR0VUXCIgJiYgb3B0aW9ucy5kYXRhVHlwZSAhPT0gXCJqc29ucFwiKSB7XHJcblx0XHRcdHZhciBwcmVmaXggPSBvcHRpb25zLnVybC5pbmRleE9mKFwiP1wiKSA8IDAgPyBcIj9cIiA6IFwiJlwiXHJcblx0XHRcdHZhciBxdWVyeXN0cmluZyA9IGJ1aWxkUXVlcnlTdHJpbmcoZGF0YSlcclxuXHRcdFx0b3B0aW9ucy51cmwgKz0gKHF1ZXJ5c3RyaW5nID8gcHJlZml4ICsgcXVlcnlzdHJpbmcgOiBcIlwiKVxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0b3B0aW9ucy5kYXRhID0gc2VyaWFsaXplKGRhdGEpXHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBwYXJhbWV0ZXJpemVVcmwodXJsLCBkYXRhKSB7XHJcblx0XHRpZiAoZGF0YSkge1xyXG5cdFx0XHR1cmwgPSB1cmwucmVwbGFjZSgvOlthLXpdXFx3Ky9naSwgZnVuY3Rpb24gKHRva2VuKXtcclxuXHRcdFx0XHR2YXIga2V5ID0gdG9rZW4uc2xpY2UoMSlcclxuXHRcdFx0XHR2YXIgdmFsdWUgPSBkYXRhW2tleV0gfHwgdG9rZW5cclxuXHRcdFx0XHRkZWxldGUgZGF0YVtrZXldXHJcblx0XHRcdFx0cmV0dXJuIHZhbHVlXHJcblx0XHRcdH0pXHJcblx0XHR9XHJcblx0XHRyZXR1cm4gdXJsXHJcblx0fVxyXG5cclxuXHRtLnJlcXVlc3QgPSBmdW5jdGlvbiAob3B0aW9ucykge1xyXG5cdFx0aWYgKG9wdGlvbnMuYmFja2dyb3VuZCAhPT0gdHJ1ZSkgbS5zdGFydENvbXB1dGF0aW9uKClcclxuXHRcdHZhciBkZWZlcnJlZCA9IG5ldyBEZWZlcnJlZCgpXHJcblx0XHR2YXIgaXNKU09OUCA9IG9wdGlvbnMuZGF0YVR5cGUgJiZcclxuXHRcdFx0b3B0aW9ucy5kYXRhVHlwZS50b0xvd2VyQ2FzZSgpID09PSBcImpzb25wXCJcclxuXHJcblx0XHR2YXIgc2VyaWFsaXplLCBkZXNlcmlhbGl6ZSwgZXh0cmFjdFxyXG5cclxuXHRcdGlmIChpc0pTT05QKSB7XHJcblx0XHRcdHNlcmlhbGl6ZSA9IG9wdGlvbnMuc2VyaWFsaXplID1cclxuXHRcdFx0ZGVzZXJpYWxpemUgPSBvcHRpb25zLmRlc2VyaWFsaXplID0gaWRlbnRpdHlcclxuXHJcblx0XHRcdGV4dHJhY3QgPSBmdW5jdGlvbiAoanNvbnApIHsgcmV0dXJuIGpzb25wLnJlc3BvbnNlVGV4dCB9XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRzZXJpYWxpemUgPSBvcHRpb25zLnNlcmlhbGl6ZSA9IG9wdGlvbnMuc2VyaWFsaXplIHx8IEpTT04uc3RyaW5naWZ5XHJcblxyXG5cdFx0XHRkZXNlcmlhbGl6ZSA9IG9wdGlvbnMuZGVzZXJpYWxpemUgPVxyXG5cdFx0XHRcdG9wdGlvbnMuZGVzZXJpYWxpemUgfHwgSlNPTi5wYXJzZVxyXG5cdFx0XHRleHRyYWN0ID0gb3B0aW9ucy5leHRyYWN0IHx8IGZ1bmN0aW9uICh4aHIpIHtcclxuXHRcdFx0XHRpZiAoeGhyLnJlc3BvbnNlVGV4dC5sZW5ndGggfHwgZGVzZXJpYWxpemUgIT09IEpTT04ucGFyc2UpIHtcclxuXHRcdFx0XHRcdHJldHVybiB4aHIucmVzcG9uc2VUZXh0XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdHJldHVybiBudWxsXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0b3B0aW9ucy5tZXRob2QgPSAob3B0aW9ucy5tZXRob2QgfHwgXCJHRVRcIikudG9VcHBlckNhc2UoKVxyXG5cdFx0b3B0aW9ucy51cmwgPSBwYXJhbWV0ZXJpemVVcmwob3B0aW9ucy51cmwsIG9wdGlvbnMuZGF0YSlcclxuXHRcdGJpbmREYXRhKG9wdGlvbnMsIG9wdGlvbnMuZGF0YSwgc2VyaWFsaXplKVxyXG5cdFx0b3B0aW9ucy5vbmxvYWQgPSBvcHRpb25zLm9uZXJyb3IgPSBmdW5jdGlvbiAoZXYpIHtcclxuXHRcdFx0dHJ5IHtcclxuXHRcdFx0XHRldiA9IGV2IHx8IGV2ZW50XHJcblx0XHRcdFx0dmFyIHJlc3BvbnNlID0gZGVzZXJpYWxpemUoZXh0cmFjdChldi50YXJnZXQsIG9wdGlvbnMpKVxyXG5cdFx0XHRcdGlmIChldi50eXBlID09PSBcImxvYWRcIikge1xyXG5cdFx0XHRcdFx0aWYgKG9wdGlvbnMudW53cmFwU3VjY2Vzcykge1xyXG5cdFx0XHRcdFx0XHRyZXNwb25zZSA9IG9wdGlvbnMudW53cmFwU3VjY2VzcyhyZXNwb25zZSwgZXYudGFyZ2V0KVxyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdGlmIChpc0FycmF5KHJlc3BvbnNlKSAmJiBvcHRpb25zLnR5cGUpIHtcclxuXHRcdFx0XHRcdFx0Zm9yRWFjaChyZXNwb25zZSwgZnVuY3Rpb24gKHJlcywgaSkge1xyXG5cdFx0XHRcdFx0XHRcdHJlc3BvbnNlW2ldID0gbmV3IG9wdGlvbnMudHlwZShyZXMpXHJcblx0XHRcdFx0XHRcdH0pXHJcblx0XHRcdFx0XHR9IGVsc2UgaWYgKG9wdGlvbnMudHlwZSkge1xyXG5cdFx0XHRcdFx0XHRyZXNwb25zZSA9IG5ldyBvcHRpb25zLnR5cGUocmVzcG9uc2UpXHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0ZGVmZXJyZWQucmVzb2x2ZShyZXNwb25zZSlcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0aWYgKG9wdGlvbnMudW53cmFwRXJyb3IpIHtcclxuXHRcdFx0XHRcdFx0cmVzcG9uc2UgPSBvcHRpb25zLnVud3JhcEVycm9yKHJlc3BvbnNlLCBldi50YXJnZXQpXHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0ZGVmZXJyZWQucmVqZWN0KHJlc3BvbnNlKVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSBjYXRjaCAoZSkge1xyXG5cdFx0XHRcdGRlZmVycmVkLnJlamVjdChlKVxyXG5cdFx0XHRcdG0uZGVmZXJyZWQub25lcnJvcihlKVxyXG5cdFx0XHR9IGZpbmFsbHkge1xyXG5cdFx0XHRcdGlmIChvcHRpb25zLmJhY2tncm91bmQgIT09IHRydWUpIG0uZW5kQ29tcHV0YXRpb24oKVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0YWpheChvcHRpb25zKVxyXG5cdFx0ZGVmZXJyZWQucHJvbWlzZSA9IHByb3BpZnkoZGVmZXJyZWQucHJvbWlzZSwgb3B0aW9ucy5pbml0aWFsVmFsdWUpXHJcblx0XHRyZXR1cm4gZGVmZXJyZWQucHJvbWlzZVxyXG5cdH1cclxuXHJcblx0cmV0dXJuIG1cclxufSk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcclxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vbWl0aHJpbC9taXRocmlsLmpzXG4gKiogbW9kdWxlIGlkID0gMlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihtb2R1bGUpIHtcclxuXHRpZighbW9kdWxlLndlYnBhY2tQb2x5ZmlsbCkge1xyXG5cdFx0bW9kdWxlLmRlcHJlY2F0ZSA9IGZ1bmN0aW9uKCkge307XHJcblx0XHRtb2R1bGUucGF0aHMgPSBbXTtcclxuXHRcdC8vIG1vZHVsZS5wYXJlbnQgPSB1bmRlZmluZWQgYnkgZGVmYXVsdFxyXG5cdFx0bW9kdWxlLmNoaWxkcmVuID0gW107XHJcblx0XHRtb2R1bGUud2VicGFja1BvbHlmaWxsID0gMTtcclxuXHR9XHJcblx0cmV0dXJuIG1vZHVsZTtcclxufVxyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqICh3ZWJwYWNrKS9idWlsZGluL21vZHVsZS5qc1xuICoqIG1vZHVsZSBpZCA9IDNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=