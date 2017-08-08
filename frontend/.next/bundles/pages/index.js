
          window.__NEXT_REGISTER_PAGE('/', function() {
            var comp = module.exports =
webpackJsonp([5],{

/***/ 540:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var routes = module.exports = __webpack_require__(546)();

routes.add('index', '/').add('about').add('profile', '/profile/:address');

 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } if (typeof module.exports === 'function') { __REACT_HOT_LOADER__.register(module.exports, 'module.exports', "/Users/conner/dev/distense/frontend/routes.js"); return; } for (var key in module.exports) { if (!Object.prototype.hasOwnProperty.call(module.exports, key)) { continue; } var namedExport = void 0; try { namedExport = module.exports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "/Users/conner/dev/distense/frontend/routes.js"); } } })();

/***/ }),

/***/ 541:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__resourceQuery) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(12);

var _react2 = _interopRequireDefault(_react);

var _routes = __webpack_require__(540);

var _layout = __webpack_require__(550);

var _layout2 = _interopRequireDefault(_layout);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = '/Users/conner/dev/distense/frontend/pages/index.js?entry';

exports.default = function () {
  return _react2.default.createElement(_layout2.default, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 5
    }
  }, _react2.default.createElement('div', {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 6
    }
  }, _react2.default.createElement(_routes.Link, { route: 'profile', params: { address: '0x098964520943bbf6731aa02ca9c7b1eb8c34e4f9' }, __source: {
      fileName: _jsxFileName,
      lineNumber: 7
    }
  }, _react2.default.createElement('a', {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 7
    }
  }, 'Sample profile'))));
};

 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } if (typeof module.exports === 'function') { __REACT_HOT_LOADER__.register(module.exports, 'module.exports', "/Users/conner/dev/distense/frontend/pages/index.js"); return; } for (var key in module.exports) { if (!Object.prototype.hasOwnProperty.call(module.exports, key)) { continue; } var namedExport = void 0; try { namedExport = module.exports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "/Users/conner/dev/distense/frontend/pages/index.js"); } } })();
    (function (Component, route) {
      if (false) return
      if (false) return

      var qs = __webpack_require__(85)
      var params = qs.parse(__resourceQuery.slice(1))
      if (params.entry == null) return

      module.hot.accept()
      Component.__route = route

      if (module.hot.status() === 'idle') return

      var components = next.router.components
      for (var r in components) {
        if (!components.hasOwnProperty(r)) continue

        if (components[r].Component.__route === route) {
          next.router.update(r, Component)
        }
      }
    })(module.exports.default || module.exports, "/")
  
/* WEBPACK VAR INJECTION */}.call(exports, "?entry"))

/***/ }),

/***/ 550:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = __webpack_require__(95);

var _extends3 = _interopRequireDefault(_extends2);

var _style = __webpack_require__(551);

var _style2 = _interopRequireDefault(_style);

var _react = __webpack_require__(12);

var _react2 = _interopRequireDefault(_react);

var _head = __webpack_require__(194);

var _head2 = _interopRequireDefault(_head);

var _routes = __webpack_require__(540);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = '/Users/conner/dev/distense/frontend/components/layout.js';


var LogoIcon = function LogoIcon(props) {
  return _react2.default.createElement('svg', (0, _extends3.default)({
    width: '128',
    height: '128',
    viewBox: '0 0 128 128',
    xmlns: 'http://www.w3.org/2000/svg',
    xmlnsXlink: 'http://www.w3.org/1999/xlink'
  }, props), _react2.default.createElement('title', null, 'icon'), _react2.default.createElement('desc', null, 'Created using Figma'), _react2.default.createElement('use', {
    xlinkHref: '#a',
    transform: 'matrix(1 0 0 1 16 88)',
    fill: '#8F1523'
  }), _react2.default.createElement('use', {
    xlinkHref: '#b',
    transform: 'matrix(1 0 0 1 8 72)',
    fill: '#BB2032'
  }), _react2.default.createElement('use', {
    xlinkHref: '#c',
    transform: 'matrix(1 0 0 1 0 56)',
    fill: '#FC354C'
  }), _react2.default.createElement('use', {
    xlinkHref: '#d',
    transform: 'matrix(1 0 0 1 8 40)',
    fill: '#BB2032'
  }), _react2.default.createElement('use', {
    xlinkHref: '#e',
    transform: 'matrix(1 0 0 1 16 24)',
    fill: '#8F1523'
  }), _react2.default.createElement('g', {
    transform: 'translate(-81 -62)'
  }, _react2.default.createElement('use', {
    xlinkHref: '#f',
    transform: 'matrix(1 0 0 1 113 62)',
    fill: '#232A2D'
  })), _react2.default.createElement('defs', null, _react2.default.createElement('path', {
    id: 'a',
    d: 'M0 3.728C0 1.67 1.571 0 3.509 0H41.8c1.938 0 3.509 1.67 3.509 3.728v.544C45.309 6.33 43.738 8 41.8 8H3.509C1.57 8 0 6.33 0 4.272v-.544z'
  }), _react2.default.createElement('path', {
    id: 'b',
    d: 'M0 3.728C0 1.67 1.571 0 3.509 0h56.176c1.938 0 3.509 1.67 3.509 3.728v.544C63.194 6.33 61.623 8 59.685 8H3.51C1.57 8 0 6.33 0 4.272v-.544z'
  }), _react2.default.createElement('path', {
    id: 'c',
    d: 'M0 3.728C0 1.67 1.571 0 3.509 0h56.176c1.938 0 3.509 1.67 3.509 3.728v.544C63.194 6.33 61.623 8 59.685 8H3.51C1.57 8 0 6.33 0 4.272v-.544z'
  }), _react2.default.createElement('path', {
    id: 'd',
    d: 'M0 3.728C0 1.67 1.571 0 3.509 0h56.176c1.938 0 3.509 1.67 3.509 3.728v.544C63.194 6.33 61.623 8 59.685 8H3.51C1.57 8 0 6.33 0 4.272v-.544z'
  }), _react2.default.createElement('path', {
    id: 'e',
    d: 'M0 3.728C0 1.67 1.571 0 3.509 0H41.8c1.938 0 3.509 1.67 3.509 3.728v.544C45.309 6.33 43.738 8 41.8 8H3.509C1.57 8 0 6.33 0 4.272v-.544z'
  }), _react2.default.createElement('path', {
    id: 'f',
    d: 'M37.236 0c13.027 0 23.951 2.743 32.771 8.229 8.956 5.485 15.538 12.8 19.744 21.942C94.094 39.2 96 49.143 96 60c0 11.314-1.906 21.486-6.249 30.514-4.206 9.029-10.72 16.229-19.54 21.6-8.82 5.257-19.812 7.886-32.975 7.886H4.897c-1.086 0-2.822-.343-3.636-1.029C.446 118.286 0 116.914 0 116V4c0-.914.446-2.286 1.26-2.971C2.076.343 3.812 0 4.898 0h32.34z'
  })));
};

exports.default = function (_ref) {
  var children = _ref.children,
      title = _ref.title;
  return _react2.default.createElement('div', {
    'data-jsx': 722353111,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 7
    }
  }, _react2.default.createElement(_head2.default, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 8
    }
  }, _react2.default.createElement('title', {
    'data-jsx': 722353111,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 9
    }
  }, title ? title + ' - Distense' : 'Distense'), _react2.default.createElement('meta', { charSet: 'utf-8', 'data-jsx': 722353111,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 10
    }
  }), _react2.default.createElement('meta', { name: 'viewport', content: 'initial-scale=1.0, width=device-width', 'data-jsx': 722353111,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 11
    }
  }), _react2.default.createElement('link', { rel: 'shortcut icon', type: 'image/png', href: '/favicon.png', 'data-jsx': 722353111,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 12
    }
  })), _react2.default.createElement('header', {
    'data-jsx': 722353111,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 15
    }
  }, _react2.default.createElement('div', { className: 'container', 'data-jsx': 722353111,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 16
    }
  }, _react2.default.createElement('nav', {
    'data-jsx': 722353111,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 17
    }
  }, _react2.default.createElement(_routes.Link, { route: '/', __source: {
      fileName: _jsxFileName,
      lineNumber: 18
    }
  }, _react2.default.createElement('a', { className: 'logoIcon', 'data-jsx': 722353111,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 19
    }
  }, _react2.default.createElement(LogoIcon, { width: 32, height: 32, __source: {
      fileName: _jsxFileName,
      lineNumber: 20
    }
  }))), _react2.default.createElement('div', { style: { width: 12 }, 'data-jsx': 722353111,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 23
    }
  }), _react2.default.createElement(_routes.Link, { route: '/about', __source: {
      fileName: _jsxFileName,
      lineNumber: 24
    }
  }, _react2.default.createElement('a', {
    'data-jsx': 722353111,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 24
    }
  }, 'About'))))), _react2.default.createElement('div', { className: 'container', 'data-jsx': 722353111,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 29
    }
  }, _react2.default.createElement('div', { className: 'content', 'data-jsx': 722353111,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 30
    }
  }, children)), _react2.default.createElement('footer', {
    'data-jsx': 722353111,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 35
    }
  }, _react2.default.createElement('div', { className: 'container', 'data-jsx': 722353111,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 36
    }
  }, _react2.default.createElement('div', { className: 'footerContent', 'data-jsx': 722353111,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 37
    }
  }, _react2.default.createElement('div', { className: 'footerIcon', 'data-jsx': 722353111,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 38
    }
  }, _react2.default.createElement(LogoIcon, { width: 16, height: 16, __source: {
      fileName: _jsxFileName,
      lineNumber: 39
    }
  })), '\xA9 ', new Date().getFullYear(), ' Distense'))), _react2.default.createElement(_style2.default, {
    styleId: 3341892955,
    css: '.container[data-jsx="722353111"]{max-width:900px;margin:0 auto;padding:0 16px}header[data-jsx="722353111"]{background-color:#fff}.footerContent[data-jsx="722353111"]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;-webkit-align-items:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;padding:32px 0;margin-top:32px;border-top:1px solid #eee;font-size:0.8rem}.footerIcon[data-jsx="722353111"]{position:absolute;left:50%;margin-left:-8px}.footerIcon[data-jsx="722353111"] *{fill:#eee}nav[data-jsx="722353111"]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;-webkit-align-items:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;height:64px}.logoIcon[data-jsx="722353111"]{-webkit-transition:all 0.2s;transition:all 0.2s}.logoIcon[data-jsx="722353111"]:hover{opacity:0.8}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvbGF5b3V0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQTZDZ0IsQUFHeUIsQUFFTSxBQUVULEFBRUssQUFFUixBQUVHLEFBRU8sQUFFUixXQU5LLEVBTUUsSUFkb0IsRUFNSCxJQUpQLE1BSWlDLEdBTkMsZUFNTSxDQU5DLEVBWTNDLDRCQVJjLEFBTUEsd0VBTjRCLEFBTUEsaUdBTndCLEFBTUgsYUFBTyxHQU5xQixpQkFBbUMsMkJBQTBCLGtCQUFPIiwiZmlsZSI6ImNvbXBvbmVudHMvbGF5b3V0LmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9jb25uZXIvZGV2L2Rpc3RlbnNlL2Zyb250ZW5kIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEhlYWQgZnJvbSAnbmV4dC9oZWFkJ1xuaW1wb3J0IHsgTGluayB9IGZyb20gJy4uL3JvdXRlcydcblxuaW1wb3J0IExvZ29JY29uIGZyb20gJy4uL3N0YXRpYy9pY29uLnN2ZydcblxuZXhwb3J0IGRlZmF1bHQgKHsgY2hpbGRyZW4sIHRpdGxlIH0pID0+IChcbiAgPGRpdj5cbiAgICA8SGVhZD5cbiAgICAgIDx0aXRsZT57IHRpdGxlID8gYCR7dGl0bGV9IC0gRGlzdGVuc2VgIDogJ0Rpc3RlbnNlJyB9PC90aXRsZT5cbiAgICAgIDxtZXRhIGNoYXJTZXQ9J3V0Zi04JyAvPlxuICAgICAgPG1ldGEgbmFtZT0ndmlld3BvcnQnIGNvbnRlbnQ9J2luaXRpYWwtc2NhbGU9MS4wLCB3aWR0aD1kZXZpY2Utd2lkdGgnIC8+XG4gICAgICA8bGluayByZWw9J3Nob3J0Y3V0IGljb24nIHR5cGU9J2ltYWdlL3BuZycgaHJlZj0nL2Zhdmljb24ucG5nJyAvPlxuICAgIDwvSGVhZD5cblxuICAgIDxoZWFkZXI+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT0nY29udGFpbmVyJz5cbiAgICAgICAgPG5hdj5cbiAgICAgICAgICA8TGluayByb3V0ZT0nLyc+XG4gICAgICAgICAgICA8YSBjbGFzc05hbWU9J2xvZ29JY29uJz5cbiAgICAgICAgICAgICAgPExvZ29JY29uIHdpZHRoPXszMn0gaGVpZ2h0PXszMn0gLz5cbiAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICA8L0xpbms+XG4gICAgICAgICAgPGRpdiBzdHlsZT17eyB3aWR0aDogMTIgfX0gLz5cbiAgICAgICAgICA8TGluayByb3V0ZT0nL2Fib3V0Jz48YT5BYm91dDwvYT48L0xpbms+XG4gICAgICAgIDwvbmF2PlxuICAgICAgPC9kaXY+XG4gICAgPC9oZWFkZXI+XG5cbiAgICA8ZGl2IGNsYXNzTmFtZT0nY29udGFpbmVyJz5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb250ZW50Jz5cbiAgICAgICAge2NoaWxkcmVufVxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG5cbiAgICA8Zm9vdGVyPlxuICAgICAgPGRpdiBjbGFzc05hbWU9J2NvbnRhaW5lcic+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSdmb290ZXJDb250ZW50Jz5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nZm9vdGVySWNvbic+XG4gICAgICAgICAgICA8TG9nb0ljb24gd2lkdGg9ezE2fSBoZWlnaHQ9ezE2fSAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIMKpIHtuZXcgRGF0ZSgpLmdldEZ1bGxZZWFyKCl9IERpc3RlbnNlXG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9mb290ZXI+XG5cbiAgICA8c3R5bGUganN4PntgXG4gICAgICAuY29udGFpbmVyIHtcbiAgICAgICAgbWF4LXdpZHRoOiA5MDBweDtcbiAgICAgICAgbWFyZ2luOiAwIGF1dG87XG4gICAgICAgIHBhZGRpbmc6IDAgMTZweDtcbiAgICAgIH1cblxuICAgICAgaGVhZGVyIHtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcbiAgICAgIH1cblxuICAgICAgLmZvb3RlckNvbnRlbnQge1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xuICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgICBwYWRkaW5nOiAzMnB4IDA7XG4gICAgICAgIG1hcmdpbi10b3A6IDMycHg7XG4gICAgICAgIGJvcmRlci10b3A6IDFweCBzb2xpZCAjZWVlO1xuICAgICAgICBmb250LXNpemU6IDAuOHJlbTtcbiAgICAgIH1cblxuICAgICAgLmZvb3Rlckljb24ge1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIGxlZnQ6IDUwJTtcbiAgICAgICAgbWFyZ2luLWxlZnQ6IC04cHg7XG4gICAgICB9XG5cbiAgICAgIC5mb290ZXJJY29uIDpnbG9iYWwoKikge1xuICAgICAgICBmaWxsOiAjZWVlO1xuICAgICAgfVxuXG4gICAgICBuYXYge1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xuICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgICBoZWlnaHQ6IDY0cHg7XG4gICAgICB9XG5cbiAgICAgIC5sb2dvSWNvbiB7XG4gICAgICAgIHRyYW5zaXRpb246IGFsbCAwLjJzO1xuICAgICAgfVxuXG4gICAgICAubG9nb0ljb246aG92ZXIge1xuICAgICAgICBvcGFjaXR5OiAwLjg7XG4gICAgICB9XG4gICAgYH08L3N0eWxlPlxuXG4gICAgPHN0eWxlIGpzeCBnbG9iYWw+e2BcbiAgICAgIGJvZHkge1xuICAgICAgICBtYXJnaW46IDA7XG4gICAgICAgIGJhY2tncm91bmQ6ICNmZmY7XG4gICAgICAgIGZvbnQtZmFtaWx5OiAtYXBwbGUtc3lzdGVtLCBCbGlua01hY1N5c3RlbUZvbnQsIFJvYm90bywgXCJTZWdvZSBVSVwiLCBcIkZpcmEgU2Fuc1wiLCBBdmVuaXIsIFwiSGVsdmV0aWNhIE5ldWVcIiwgXCJMdWNpZGEgR3JhbmRlXCIsIHNhbnMtc2VyaWY7XG4gICAgICB9XG5cbiAgICAgIGhyIHtcbiAgICAgICAgYm9yZGVyOiBub25lO1xuICAgICAgICBoZWlnaHQ6IDFweDtcbiAgICAgICAgYmFja2dyb3VuZDogI2NjYztcbiAgICAgIH1cblxuICAgICAgYSB7XG4gICAgICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcbiAgICAgICAgY29sb3I6ICMzQ0EzREM7XG4gICAgICB9XG5cbiAgICAgIGltZyB7XG4gICAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgfVxuICAgIGB9PC9zdHlsZT5cbiAgPC9kaXY+XG4pIl19 */\n/*@ sourceURL=components/layout.js */'
  }), _react2.default.createElement(_style2.default, {
    styleId: 3448610057,
    css: 'body{margin:0;background:#fff;font-family:-apple-system, BlinkMacSystemFont, Roboto, "Segoe UI", "Fira Sans", Avenir, "Helvetica Neue", "Lucida Grande", sans-serif}hr{border:none;height:1px;background:#ccc}a{-webkit-text-decoration:none;text-decoration:none;color:#3CA3DC}img{display:block}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvbGF5b3V0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQTRGdUIsQUFHa0IsQUFFRyxBQUVTLEFBRVAsVUFOb0IsR0FFRixFQUlYLFVBSm9DLEVBRndILGVBRWpILFVBRXBCLGVBQU8sK0ZBSnFJIiwiZmlsZSI6ImNvbXBvbmVudHMvbGF5b3V0LmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9jb25uZXIvZGV2L2Rpc3RlbnNlL2Zyb250ZW5kIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEhlYWQgZnJvbSAnbmV4dC9oZWFkJ1xuaW1wb3J0IHsgTGluayB9IGZyb20gJy4uL3JvdXRlcydcblxuaW1wb3J0IExvZ29JY29uIGZyb20gJy4uL3N0YXRpYy9pY29uLnN2ZydcblxuZXhwb3J0IGRlZmF1bHQgKHsgY2hpbGRyZW4sIHRpdGxlIH0pID0+IChcbiAgPGRpdj5cbiAgICA8SGVhZD5cbiAgICAgIDx0aXRsZT57IHRpdGxlID8gYCR7dGl0bGV9IC0gRGlzdGVuc2VgIDogJ0Rpc3RlbnNlJyB9PC90aXRsZT5cbiAgICAgIDxtZXRhIGNoYXJTZXQ9J3V0Zi04JyAvPlxuICAgICAgPG1ldGEgbmFtZT0ndmlld3BvcnQnIGNvbnRlbnQ9J2luaXRpYWwtc2NhbGU9MS4wLCB3aWR0aD1kZXZpY2Utd2lkdGgnIC8+XG4gICAgICA8bGluayByZWw9J3Nob3J0Y3V0IGljb24nIHR5cGU9J2ltYWdlL3BuZycgaHJlZj0nL2Zhdmljb24ucG5nJyAvPlxuICAgIDwvSGVhZD5cblxuICAgIDxoZWFkZXI+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT0nY29udGFpbmVyJz5cbiAgICAgICAgPG5hdj5cbiAgICAgICAgICA8TGluayByb3V0ZT0nLyc+XG4gICAgICAgICAgICA8YSBjbGFzc05hbWU9J2xvZ29JY29uJz5cbiAgICAgICAgICAgICAgPExvZ29JY29uIHdpZHRoPXszMn0gaGVpZ2h0PXszMn0gLz5cbiAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICA8L0xpbms+XG4gICAgICAgICAgPGRpdiBzdHlsZT17eyB3aWR0aDogMTIgfX0gLz5cbiAgICAgICAgICA8TGluayByb3V0ZT0nL2Fib3V0Jz48YT5BYm91dDwvYT48L0xpbms+XG4gICAgICAgIDwvbmF2PlxuICAgICAgPC9kaXY+XG4gICAgPC9oZWFkZXI+XG5cbiAgICA8ZGl2IGNsYXNzTmFtZT0nY29udGFpbmVyJz5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb250ZW50Jz5cbiAgICAgICAge2NoaWxkcmVufVxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG5cbiAgICA8Zm9vdGVyPlxuICAgICAgPGRpdiBjbGFzc05hbWU9J2NvbnRhaW5lcic+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSdmb290ZXJDb250ZW50Jz5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nZm9vdGVySWNvbic+XG4gICAgICAgICAgICA8TG9nb0ljb24gd2lkdGg9ezE2fSBoZWlnaHQ9ezE2fSAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIMKpIHtuZXcgRGF0ZSgpLmdldEZ1bGxZZWFyKCl9IERpc3RlbnNlXG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9mb290ZXI+XG5cbiAgICA8c3R5bGUganN4PntgXG4gICAgICAuY29udGFpbmVyIHtcbiAgICAgICAgbWF4LXdpZHRoOiA5MDBweDtcbiAgICAgICAgbWFyZ2luOiAwIGF1dG87XG4gICAgICAgIHBhZGRpbmc6IDAgMTZweDtcbiAgICAgIH1cblxuICAgICAgaGVhZGVyIHtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcbiAgICAgIH1cblxuICAgICAgLmZvb3RlckNvbnRlbnQge1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xuICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgICBwYWRkaW5nOiAzMnB4IDA7XG4gICAgICAgIG1hcmdpbi10b3A6IDMycHg7XG4gICAgICAgIGJvcmRlci10b3A6IDFweCBzb2xpZCAjZWVlO1xuICAgICAgICBmb250LXNpemU6IDAuOHJlbTtcbiAgICAgIH1cblxuICAgICAgLmZvb3Rlckljb24ge1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIGxlZnQ6IDUwJTtcbiAgICAgICAgbWFyZ2luLWxlZnQ6IC04cHg7XG4gICAgICB9XG5cbiAgICAgIC5mb290ZXJJY29uIDpnbG9iYWwoKikge1xuICAgICAgICBmaWxsOiAjZWVlO1xuICAgICAgfVxuXG4gICAgICBuYXYge1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xuICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgICBoZWlnaHQ6IDY0cHg7XG4gICAgICB9XG5cbiAgICAgIC5sb2dvSWNvbiB7XG4gICAgICAgIHRyYW5zaXRpb246IGFsbCAwLjJzO1xuICAgICAgfVxuXG4gICAgICAubG9nb0ljb246aG92ZXIge1xuICAgICAgICBvcGFjaXR5OiAwLjg7XG4gICAgICB9XG4gICAgYH08L3N0eWxlPlxuXG4gICAgPHN0eWxlIGpzeCBnbG9iYWw+e2BcbiAgICAgIGJvZHkge1xuICAgICAgICBtYXJnaW46IDA7XG4gICAgICAgIGJhY2tncm91bmQ6ICNmZmY7XG4gICAgICAgIGZvbnQtZmFtaWx5OiAtYXBwbGUtc3lzdGVtLCBCbGlua01hY1N5c3RlbUZvbnQsIFJvYm90bywgXCJTZWdvZSBVSVwiLCBcIkZpcmEgU2Fuc1wiLCBBdmVuaXIsIFwiSGVsdmV0aWNhIE5ldWVcIiwgXCJMdWNpZGEgR3JhbmRlXCIsIHNhbnMtc2VyaWY7XG4gICAgICB9XG5cbiAgICAgIGhyIHtcbiAgICAgICAgYm9yZGVyOiBub25lO1xuICAgICAgICBoZWlnaHQ6IDFweDtcbiAgICAgICAgYmFja2dyb3VuZDogI2NjYztcbiAgICAgIH1cblxuICAgICAgYSB7XG4gICAgICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcbiAgICAgICAgY29sb3I6ICMzQ0EzREM7XG4gICAgICB9XG5cbiAgICAgIGltZyB7XG4gICAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgfVxuICAgIGB9PC9zdHlsZT5cbiAgPC9kaXY+XG4pIl19 */\n/*@ sourceURL=components/layout.js */'
  }));
};

 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } if (typeof module.exports === 'function') { __REACT_HOT_LOADER__.register(module.exports, 'module.exports', "/Users/conner/dev/distense/frontend/components/layout.js"); return; } for (var key in module.exports) { if (!Object.prototype.hasOwnProperty.call(module.exports, key)) { continue; } var namedExport = void 0; try { namedExport = module.exports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "/Users/conner/dev/distense/frontend/components/layout.js"); } } })();

/***/ }),

/***/ 552:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(541);


/***/ })

},[552]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlcy9wYWdlcy9pbmRleC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3JvdXRlcy5qcz9iODZmNGIzIiwid2VicGFjazovLy8uL3BhZ2VzP2I4NmY0YjMiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9sYXlvdXQuanM/Yjg2ZjRiMyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCByb3V0ZXMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJ25leHQtcm91dGVzJykoKVxuXG5yb3V0ZXNcbi5hZGQoJ2luZGV4JywgJy8nKVxuLmFkZCgnYWJvdXQnKVxuLmFkZCgncHJvZmlsZScsICcvcHJvZmlsZS86YWRkcmVzcycpXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcm91dGVzLmpzIiwiaW1wb3J0IHsgTGluayB9IGZyb20gJy4uL3JvdXRlcydcbmltcG9ydCBMYXlvdXQgZnJvbSAnLi4vY29tcG9uZW50cy9sYXlvdXQnXG5cbmV4cG9ydCBkZWZhdWx0ICgpID0+IChcbiAgPExheW91dD5cbiAgICA8ZGl2PlxuICAgICAgPExpbmsgcm91dGU9J3Byb2ZpbGUnIHBhcmFtcz17eyBhZGRyZXNzOiAnMHgwOTg5NjQ1MjA5NDNiYmY2NzMxYWEwMmNhOWM3YjFlYjhjMzRlNGY5JyB9fT48YT5TYW1wbGUgcHJvZmlsZTwvYT48L0xpbms+XG4gICAgPC9kaXY+XG4gIDwvTGF5b3V0PlxuKVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3BhZ2VzP2VudHJ5IiwiaW1wb3J0IEhlYWQgZnJvbSAnbmV4dC9oZWFkJ1xuaW1wb3J0IHsgTGluayB9IGZyb20gJy4uL3JvdXRlcydcblxuaW1wb3J0IExvZ29JY29uIGZyb20gJy4uL3N0YXRpYy9pY29uLnN2ZydcblxuZXhwb3J0IGRlZmF1bHQgKHsgY2hpbGRyZW4sIHRpdGxlIH0pID0+IChcbiAgPGRpdj5cbiAgICA8SGVhZD5cbiAgICAgIDx0aXRsZT57IHRpdGxlID8gYCR7dGl0bGV9IC0gRGlzdGVuc2VgIDogJ0Rpc3RlbnNlJyB9PC90aXRsZT5cbiAgICAgIDxtZXRhIGNoYXJTZXQ9J3V0Zi04JyAvPlxuICAgICAgPG1ldGEgbmFtZT0ndmlld3BvcnQnIGNvbnRlbnQ9J2luaXRpYWwtc2NhbGU9MS4wLCB3aWR0aD1kZXZpY2Utd2lkdGgnIC8+XG4gICAgICA8bGluayByZWw9J3Nob3J0Y3V0IGljb24nIHR5cGU9J2ltYWdlL3BuZycgaHJlZj0nL2Zhdmljb24ucG5nJyAvPlxuICAgIDwvSGVhZD5cblxuICAgIDxoZWFkZXI+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT0nY29udGFpbmVyJz5cbiAgICAgICAgPG5hdj5cbiAgICAgICAgICA8TGluayByb3V0ZT0nLyc+XG4gICAgICAgICAgICA8YSBjbGFzc05hbWU9J2xvZ29JY29uJz5cbiAgICAgICAgICAgICAgPExvZ29JY29uIHdpZHRoPXszMn0gaGVpZ2h0PXszMn0gLz5cbiAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICA8L0xpbms+XG4gICAgICAgICAgPGRpdiBzdHlsZT17eyB3aWR0aDogMTIgfX0gLz5cbiAgICAgICAgICA8TGluayByb3V0ZT0nL2Fib3V0Jz48YT5BYm91dDwvYT48L0xpbms+XG4gICAgICAgIDwvbmF2PlxuICAgICAgPC9kaXY+XG4gICAgPC9oZWFkZXI+XG5cbiAgICA8ZGl2IGNsYXNzTmFtZT0nY29udGFpbmVyJz5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb250ZW50Jz5cbiAgICAgICAge2NoaWxkcmVufVxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG5cbiAgICA8Zm9vdGVyPlxuICAgICAgPGRpdiBjbGFzc05hbWU9J2NvbnRhaW5lcic+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSdmb290ZXJDb250ZW50Jz5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nZm9vdGVySWNvbic+XG4gICAgICAgICAgICA8TG9nb0ljb24gd2lkdGg9ezE2fSBoZWlnaHQ9ezE2fSAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIMKpIHtuZXcgRGF0ZSgpLmdldEZ1bGxZZWFyKCl9IERpc3RlbnNlXG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9mb290ZXI+XG5cbiAgICA8c3R5bGUganN4PntgXG4gICAgICAuY29udGFpbmVyIHtcbiAgICAgICAgbWF4LXdpZHRoOiA5MDBweDtcbiAgICAgICAgbWFyZ2luOiAwIGF1dG87XG4gICAgICAgIHBhZGRpbmc6IDAgMTZweDtcbiAgICAgIH1cblxuICAgICAgaGVhZGVyIHtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcbiAgICAgIH1cblxuICAgICAgLmZvb3RlckNvbnRlbnQge1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xuICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgICBwYWRkaW5nOiAzMnB4IDA7XG4gICAgICAgIG1hcmdpbi10b3A6IDMycHg7XG4gICAgICAgIGJvcmRlci10b3A6IDFweCBzb2xpZCAjZWVlO1xuICAgICAgICBmb250LXNpemU6IDAuOHJlbTtcbiAgICAgIH1cblxuICAgICAgLmZvb3Rlckljb24ge1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIGxlZnQ6IDUwJTtcbiAgICAgICAgbWFyZ2luLWxlZnQ6IC04cHg7XG4gICAgICB9XG5cbiAgICAgIC5mb290ZXJJY29uIDpnbG9iYWwoKikge1xuICAgICAgICBmaWxsOiAjZWVlO1xuICAgICAgfVxuXG4gICAgICBuYXYge1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xuICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgICBoZWlnaHQ6IDY0cHg7XG4gICAgICB9XG5cbiAgICAgIC5sb2dvSWNvbiB7XG4gICAgICAgIHRyYW5zaXRpb246IGFsbCAwLjJzO1xuICAgICAgfVxuXG4gICAgICAubG9nb0ljb246aG92ZXIge1xuICAgICAgICBvcGFjaXR5OiAwLjg7XG4gICAgICB9XG4gICAgYH08L3N0eWxlPlxuXG4gICAgPHN0eWxlIGpzeCBnbG9iYWw+e2BcbiAgICAgIGJvZHkge1xuICAgICAgICBtYXJnaW46IDA7XG4gICAgICAgIGJhY2tncm91bmQ6ICNmZmY7XG4gICAgICAgIGZvbnQtZmFtaWx5OiAtYXBwbGUtc3lzdGVtLCBCbGlua01hY1N5c3RlbUZvbnQsIFJvYm90bywgXCJTZWdvZSBVSVwiLCBcIkZpcmEgU2Fuc1wiLCBBdmVuaXIsIFwiSGVsdmV0aWNhIE5ldWVcIiwgXCJMdWNpZGEgR3JhbmRlXCIsIHNhbnMtc2VyaWY7XG4gICAgICB9XG5cbiAgICAgIGhyIHtcbiAgICAgICAgYm9yZGVyOiBub25lO1xuICAgICAgICBoZWlnaHQ6IDFweDtcbiAgICAgICAgYmFja2dyb3VuZDogI2NjYztcbiAgICAgIH1cblxuICAgICAgYSB7XG4gICAgICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcbiAgICAgICAgY29sb3I6ICMzQ0EzREM7XG4gICAgICB9XG5cbiAgICAgIGltZyB7XG4gICAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgfVxuICAgIGB9PC9zdHlsZT5cbiAgPC9kaXY+XG4pXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY29tcG9uZW50cy9sYXlvdXQuanMiXSwibWFwcGluZ3MiOiI7QTs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0hBO0FBQ0E7QUFFQTtBQUNBOzs7Ozs7O0FBREE7QUFDQTs7QUFBQTtBQUNBO0FBREE7QUFBQTs7QUFDQTtBQUNBO0FBREE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBSEE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDSkE7QUFDQTs7O0FBQUE7QUFDQTs7Ozs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQTtBQUNBO0FBREE7QUFBQTtBQUFBO0FBQ0E7QUFBQTs7QUFBQTtBQUNBO0FBREE7QUFBQTs7QUFDQTtBQUNBO0FBREE7QUFBQTtBQUNBOztBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUNBO0FBQ0E7QUFEQTtBQUNBOztBQUFBO0FBQ0E7QUFEQTtBQUNBOztBQUFBO0FBR0E7QUFIQTtBQUdBO0FBQUE7O0FBQUE7QUFDQTtBQURBO0FBQUE7O0FBQ0E7QUFDQTtBQURBO0FBQ0E7QUFBQTs7QUFBQTtBQUNBO0FBREE7QUFBQTtBQUNBO0FBQ0E7QUFEQTtBQUNBOztBQUFBO0FBQ0E7QUFEQTtBQUNBO0FBQUE7QUFHQTtBQUhBO0FBR0E7O0FBQUE7QUFDQTtBQURBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUtBO0FBQ0E7QUFEQTtBQUNBOztBQUFBO0FBQ0E7QUFEQTtBQUtBO0FBQUE7O0FBQUE7QUFDQTtBQURBO0FBQUE7O0FBQ0E7QUFDQTtBQURBO0FBQ0E7O0FBQUE7QUFDQTtBQURBO0FBQ0E7O0FBQUE7QUFDQTtBQURBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFFQTtBQWxDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFEQTtBQUNBOzs7Ozs7Ozs7Ozs7O0EiLCJzb3VyY2VSb290IjoiIn0=
            return { page: comp.default }
          })
        