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

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _CanvasBuffer = __webpack_require__(1);
	
	var _CanvasBuffer2 = _interopRequireDefault(_CanvasBuffer);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var App = function () {
	    function App() {
	        _classCallCheck(this, App);
	
	        this.target = document.getElementById('target');
	        this.targetCtx = this.target.getContext('2d');
	
	        this.canvasInput = document.getElementById('drawCanvas');
	        this.cc = this.canvasInput.getContext('2d');
	
	        this.cc.fillStyle = "rgba(0, 0, 0, 1.0)";
	        this.cc.fillRect(0, 0, 400, 300);
	
	        this.canvasBuffer = new _CanvasBuffer2.default(this.canvasInput);
	        this.canvasBuffer.init();
	        this.canvasBuffer.shuffle();
	
	        window.addEventListener('mousedown', this.onMouseDown.bind(this));
	        this.update();
	    }
	
	    _createClass(App, [{
	        key: 'drawPixel',
	        value: function drawPixel() {
	            var pixels = this.canvasBuffer.pixels;
	            for (var i = 0; i < pixels.length; i++) {
	                var randColor = Math.floor(Math.random() * 255);
	                this.targetCtx.fillStyle = "rgba(" + randColor + "," + randColor + "," + randColor + "," + 1.0 + ")";
	                this.targetCtx.fillRect(pixels[i].x, pixels[i].y, 1, 1);
	            }
	        }
	    }, {
	        key: 'update',
	        value: function update() {
	            requestAnimationFrame(this.update.bind(this));
	            var pixel = this.canvasBuffer.getNextPixel();
	            var randColor = Math.floor(Math.random() * 255);
	            this.targetCtx.fillStyle = "rgba(" + 0 + "," + 0 + "," + 0 + "," + 0.4 + ")";
	            this.targetCtx.fillRect(pixel.x, pixel.y, 1, 3);
	        }
	    }, {
	        key: 'onMouseUp',
	        value: function onMouseUp(e) {
	            e.preventDefault();
	            window.removeEventListener('mousemove', this.onMouseMove);
	            window.removeEventListener('mouseup', this.onMouseUp);
	        }
	    }, {
	        key: 'onMouseDown',
	        value: function onMouseDown(e) {
	
	            e.preventDefault();
	        }
	    }, {
	        key: 'onMouseMove',
	        value: function onMouseMove(e) {}
	    }, {
	        key: 'onResize',
	        value: function onResize() {}
	    }]);
	
	    return App;
	}();
	
	new App();

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var CanvasBuffer = function () {
	    function CanvasBuffer(canvas) {
	        _classCallCheck(this, CanvasBuffer);
	
	        this.canvas = canvas;
	        this.ctx = canvas.getContext('2d');
	        this.pixels = undefined;
	        this.currentPixelIndex = 0;
	    }
	
	    _createClass(CanvasBuffer, [{
	        key: 'init',
	        value: function init() {
	            var imgData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
	
	            this.pixels = [];
	
	            for (var x = 0; x < imgData.width; x++) {
	                for (var y = 0; y < imgData.height; y++) {
	                    var pixel = getPixelXY(imgData, x, y);
	                    if (pixel[3] > 0) {
	                        this.pixels.push({ x: x, y: y });
	                    }
	                }
	            };
	
	            function getPixel(imgData, index) {
	                var i = index * 4,
	                    d = imgData.data;
	                return [d[i], d[i + 1], d[i + 2], d[i + 3]]; // returns array [R,G,B,A]
	            }
	            function getPixelXY(imgData, x, y) {
	                return getPixel(imgData, y * imgData.width + x);
	            }
	        }
	    }, {
	        key: 'shuffle',
	        value: function shuffle() {
	            var array = this.pixels;
	            var n = array.length,
	                t,
	                i;
	            while (n) {
	                i = Math.floor(Math.random() * n--);
	                t = array[n];
	                array[n] = array[i];
	                array[i] = t;
	            }
	
	            return array;
	        }
	    }, {
	        key: 'getNextPixel',
	        value: function getNextPixel() {
	            var pixel = this.pixels[this.currentPixelIndex];
	            this.currentPixelIndex++;
	            if (this.currentPixelIndex >= this.pixels.length) {
	                this.currentPixelIndex = 0;
	            }
	            return pixel;
	        }
	    }]);
	
	    return CanvasBuffer;
	}();
	
	exports.default = CanvasBuffer;
	module.exports = exports['default'];

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMDg0MTMzOTUxYjhmYWZkYWY2NjMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvQ2FudmFzQnVmZmVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7OztBQ3JDQTs7Ozs7Ozs7S0FFTSxHO0FBQ0Ysb0JBQWM7QUFBQTs7QUFDVixjQUFLLE1BQUwsR0FBYyxTQUFTLGNBQVQsQ0FBd0IsUUFBeEIsQ0FBZDtBQUNBLGNBQUssU0FBTCxHQUFpQixLQUFLLE1BQUwsQ0FBWSxVQUFaLENBQXVCLElBQXZCLENBQWpCOztBQUVBLGNBQUssV0FBTCxHQUFtQixTQUFTLGNBQVQsQ0FBd0IsWUFBeEIsQ0FBbkI7QUFDQSxjQUFLLEVBQUwsR0FBVSxLQUFLLFdBQUwsQ0FBaUIsVUFBakIsQ0FBNEIsSUFBNUIsQ0FBVjs7QUFFQSxjQUFLLEVBQUwsQ0FBUSxTQUFSLEdBQW9CLG9CQUFwQjtBQUNBLGNBQUssRUFBTCxDQUFRLFFBQVIsQ0FBaUIsQ0FBakIsRUFBbUIsQ0FBbkIsRUFBcUIsR0FBckIsRUFBeUIsR0FBekI7O0FBR0EsY0FBSyxZQUFMLEdBQW9CLDJCQUFpQixLQUFLLFdBQXRCLENBQXBCO0FBQ0EsY0FBSyxZQUFMLENBQWtCLElBQWxCO0FBQ0EsY0FBSyxZQUFMLENBQWtCLE9BQWxCOztBQUVBLGdCQUFPLGdCQUFQLENBQXdCLFdBQXhCLEVBQW9DLEtBQUssV0FBTCxDQUFpQixJQUFqQixDQUFzQixJQUF0QixDQUFwQztBQUNBLGNBQUssTUFBTDtBQUVIOzs7O3FDQUVVO0FB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QUFFLElBQUUsQ0FBSixDQUFiLEVBQW9CLEVBQUUsSUFBRSxDQUFKLENBQXBCLENBQVAsQztBQUNEO0FBQ0Qsc0JBQVMsVUFBVCxDQUFvQixPQUFwQixFQUE2QixDQUE3QixFQUFnQyxDQUFoQyxFQUFtQztBQUNqQyx3QkFBTyxTQUFTLE9BQVQsRUFBa0IsSUFBRSxRQUFRLEtBQVYsR0FBZ0IsQ0FBbEMsQ0FBUDtBQUNEO0FBQ0o7OzttQ0FFUTtBQUNMLGlCQUFJLFFBQVEsS0FBSyxNQUFqQjtBQUNBLGlCQUFJLElBQUksTUFBTSxNQUFkO0FBQUEsaUJBQXNCLENBQXRCO0FBQUEsaUJBQXlCLENBQXpCO0FBQ0Esb0JBQU8sQ0FBUCxFQUFVO0FBQ04scUJBQUksS0FBSyxLQUFMLENBQVcsS0FBSyxNQUFMLEtBQWdCLEdBQTNCLENBQUo7QUFDQSxxQkFBSSxNQUFNLENBQU4sQ0FBSjtBQUNBLHVCQUFNLENBQU4sSUFBVyxNQUFNLENBQU4sQ0FBWDtBQUNBLHVCQUFNLENBQU4sSUFBVyxDQUFYO0FBQ0g7O0FBRUQsb0JBQU8sS0FBUDtBQUNIOzs7d0NBRWE7QUFDVixpQkFBSSxRQUFRLEtBQUssTUFBTCxDQUFZLEtBQUssaUJBQWpCLENBQVo7QUFDQSxrQkFBSyxpQkFBTDtBQUNBLGlCQUFHLEtBQUssaUJBQUwsSUFBMEIsS0FBSyxNQUFMLENBQVksTUFBekMsRUFBZ0Q7QUFDNUMsc0JBQUssaUJBQUwsR0FBeUIsQ0FBekI7QUFDSDtBQUNELG9CQUFPLEtBQVA7QUFFSDs7Ozs7O21CQXJEZ0IsWSIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgMDg0MTMzOTUxYjhmYWZkYWY2NjNcbiAqKi8iLCJcbmltcG9ydCBDYW52YXNCdWZmZXIgZnJvbSBcIi4vQ2FudmFzQnVmZmVyXCJcblxuY2xhc3MgQXBwIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy50YXJnZXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGFyZ2V0Jyk7XG4gICAgICAgIHRoaXMudGFyZ2V0Q3R4ID0gdGhpcy50YXJnZXQuZ2V0Q29udGV4dCgnMmQnKTtcblxuICAgICAgICB0aGlzLmNhbnZhc0lucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2RyYXdDYW52YXMnKTtcbiAgICAgICAgdGhpcy5jYyA9IHRoaXMuY2FudmFzSW5wdXQuZ2V0Q29udGV4dCgnMmQnKTtcblxuICAgICAgICB0aGlzLmNjLmZpbGxTdHlsZSA9IFwicmdiYSgwLCAwLCAwLCAxLjApXCJcbiAgICAgICAgdGhpcy5jYy5maWxsUmVjdCgwLDAsNDAwLDMwMCk7XG4gICAgICAgIFxuXG4gICAgICAgIHRoaXMuY2FudmFzQnVmZmVyID0gbmV3IENhbnZhc0J1ZmZlcih0aGlzLmNhbnZhc0lucHV0KTtcbiAgICAgICAgdGhpcy5jYW52YXNCdWZmZXIuaW5pdCgpO1xuICAgICAgICB0aGlzLmNhbnZhc0J1ZmZlci5zaHVmZmxlKCk7XG4gICAgICAgIFxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJyx0aGlzLm9uTW91c2VEb3duLmJpbmQodGhpcykpO1xuICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgICAgICBcbiAgICB9XG5cbiAgICBkcmF3UGl4ZWwoKXtcbiAgICAgICAgdmFyIHBpeGVscyA9IHRoaXMuY2FudmFzQnVmZmVyLnBpeGVscztcbiAgICAgICAgZm9yKHZhciBpID0gMDtpIDwgcGl4ZWxzLmxlbmd0aDsgaSsrKXtcbiAgICAgICAgICAgIHZhciByYW5kQ29sb3IgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqMjU1KTtcbiAgICAgICAgICAgIHRoaXMudGFyZ2V0Q3R4LmZpbGxTdHlsZSA9IFwicmdiYShcIityYW5kQ29sb3IrXCIsXCIrcmFuZENvbG9yK1wiLFwiK3JhbmRDb2xvcitcIixcIisxLjArXCIpXCJcbiAgICAgICAgICAgIHRoaXMudGFyZ2V0Q3R4LmZpbGxSZWN0KHBpeGVsc1tpXS54LHBpeGVsc1tpXS55LDEsMSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG5cbiAgICB1cGRhdGUoKXtcbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMudXBkYXRlLmJpbmQodGhpcykpO1xuICAgICAgICB2YXIgcGl4ZWwgPSB0aGlzLmNhbnZhc0J1ZmZlci5nZXROZXh0UGl4ZWwoKTtcbiAgICAgICAgdmFyIHJhbmRDb2xvciA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSoyNTUpO1xuICAgICAgICB0aGlzLnRhcmdldEN0eC5maWxsU3R5bGUgPSBcInJnYmEoXCIrMCtcIixcIiswK1wiLFwiKzArXCIsXCIrMC40K1wiKVwiXG4gICAgICAgIHRoaXMudGFyZ2V0Q3R4LmZpbGxSZWN0KHBpeGVsLngscGl4ZWwueSwxLDMpO1xuICAgIH1cblxuICAgIG9uTW91c2VVcChlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXMub25Nb3VzZU1vdmUpO1xuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMub25Nb3VzZVVwKTtcbiAgICB9XG5cbiAgICBvbk1vdXNlRG93bihlKSB7XG5cbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgfVxuICAgIG9uTW91c2VNb3ZlKGUpIHtcblxuICAgIH1cbiAgICBvblJlc2l6ZSgpIHtcblxuICAgIH1cbn1cblxubmV3IEFwcCgpO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvYXBwLmpzXG4gKiovIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2FudmFzQnVmZmVye1xuICAgIFxuICAgIGNvbnN0cnVjdG9yKGNhbnZhcyl7XG4gICAgICAgIHRoaXMuY2FudmFzID0gY2FudmFzO1xuICAgICAgICB0aGlzLmN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuICAgICAgICB0aGlzLnBpeGVscyA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5jdXJyZW50UGl4ZWxJbmRleCA9IDA7XG4gICAgfVxuICAgIFxuICAgIGluaXQoKXtcbiAgICAgICAgY29uc3QgaW1nRGF0YSA9IHRoaXMuY3R4LmdldEltYWdlRGF0YSgwLDAsdGhpcy5jYW52YXMud2lkdGgsdGhpcy5jYW52YXMuaGVpZ2h0KTtcblxuICAgICAgICB0aGlzLnBpeGVscyA9IFtdO1xuXG4gICAgICAgIGZvciAodmFyIHggPSAwOyB4IDwgaW1nRGF0YS53aWR0aDsgeCsrKSB7XG4gICAgICAgICAgICBmb3IodmFyIHkgPSAwOyB5IDwgaW1nRGF0YS5oZWlnaHQ7IHkrKyl7XG4gICAgICAgICAgICAgICAgbGV0IHBpeGVsID0gZ2V0UGl4ZWxYWShpbWdEYXRhLHgseSk7XG4gICAgICAgICAgICAgICAgaWYocGl4ZWxbM10gPiAwKXtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5waXhlbHMucHVzaCh7eDp4LHk6eX0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBmdW5jdGlvbiBnZXRQaXhlbChpbWdEYXRhLCBpbmRleCkge1xuICAgICAgICAgIHZhciBpID0gaW5kZXgqNCwgZCA9IGltZ0RhdGEuZGF0YTtcbiAgICAgICAgICByZXR1cm4gW2RbaV0sZFtpKzFdLGRbaSsyXSxkW2krM11dIC8vIHJldHVybnMgYXJyYXkgW1IsRyxCLEFdXG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gZ2V0UGl4ZWxYWShpbWdEYXRhLCB4LCB5KSB7XG4gICAgICAgICAgcmV0dXJuIGdldFBpeGVsKGltZ0RhdGEsIHkqaW1nRGF0YS53aWR0aCt4KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNodWZmbGUoKXtcbiAgICAgICAgdmFyIGFycmF5ID0gdGhpcy5waXhlbHM7XG4gICAgICAgIHZhciBuID0gYXJyYXkubGVuZ3RoLCB0LCBpO1xuICAgICAgICB3aGlsZSAobikge1xuICAgICAgICAgICAgaSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIG4tLSk7XG4gICAgICAgICAgICB0ID0gYXJyYXlbbl07XG4gICAgICAgICAgICBhcnJheVtuXSA9IGFycmF5W2ldO1xuICAgICAgICAgICAgYXJyYXlbaV0gPSB0O1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGFycmF5O1xuICAgIH1cblxuICAgIGdldE5leHRQaXhlbCgpe1xuICAgICAgICB2YXIgcGl4ZWwgPSB0aGlzLnBpeGVsc1t0aGlzLmN1cnJlbnRQaXhlbEluZGV4XTtcbiAgICAgICAgdGhpcy5jdXJyZW50UGl4ZWxJbmRleCsrO1xuICAgICAgICBpZih0aGlzLmN1cnJlbnRQaXhlbEluZGV4ID49IHRoaXMucGl4ZWxzLmxlbmd0aCl7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRQaXhlbEluZGV4ID0gMDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcGl4ZWw7XG4gICAgXG4gICAgfVxuICAgIFxufSAgIFxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL0NhbnZhc0J1ZmZlci5qc1xuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=