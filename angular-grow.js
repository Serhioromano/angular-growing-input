/**
 * Created by Sergey on 1/1/15.
 * https://github.com/Serhioromano/angular-growing-input
 */
(!function(a) {
	a.
		module('growingInput', []).
		directive('grow', ['$timeout', function($timeout) {

			// Returns the version of Internet Explorer or -1
			// (indicating the use of another browser).
			// From: http://msdn.microsoft.com/en-us/library/ms537509(v=vs.85).aspx#ParsingUA
			var ieVersion = (function() {
				var v = -1;
				if(navigator.appName === "Microsoft Internet Explorer") {
					var ua = navigator.userAgent;
					var re = new RegExp("MSIE ([0-9]{1,}[\\.0-9]{0,})");
					if(re.exec(ua) !== null) v = parseFloat(RegExp.$1);
				}
				return v;
			})();

			// Check for oninput support
			// IE9 supports oninput, but not when deleting text, so keyup is used.
			// onpropertychange _is_ supported by IE8/9, but may not be fired unless
			// attached with `attachEvent`
			// (see: http://stackoverflow.com/questions/18436424/ie-onpropertychange-event-doesnt-fire),
			// and so is avoided altogether.
			var inputSupported = "oninput" in document.createElement("input") && ieVersion !== 9;

			function Expanding(scope, element, attrs) {

				this.$textarea = element;
				this.$textCopy = a.element("<span />");
				this.$clone = a.element("<pre class='expanding-clone'><br /></pre>").prepend(this.$textCopy);
				this.$wrapper = a.element("<div class='expanding-wrapper' style='position:relative' />");

				_resetStyles();
				_setCloneStyles();
				_setTextareaStyles();

				this.$textarea
					.css({
						'margin':             0,
						'-webkit-box-sizing': 'border-box',
						'-moz-box-sizing':    'border-box',
						'box-sizing':         'border-box',
						'width':              '100%',
						'max-height':         parseInt(attrs.grow || 100) + 'px'
					})
					.wrap(this.$wrapper)
					.after(this.$clone);

				attach();
				update();

				function attach() {
					var events = 'keydown keyup keypress change blur focus';
					if(!inputSupported) events += ' keyup.expanding';
					this.$textarea.bind(events, function() {
						update();
					});
				}

				// Updates the clone with the textarea value
				function update() {
					var text = this.$textarea.val().replace(/\r\n/g, "\n");
					this.$textCopy.text(text);
				}

				// Applies reset styles to the textarea and clone
				// Stores the original textarea styles in case of destroying
				function _resetStyles() {
					this._oldTextareaStyles = this.$textarea.attr('style');

					this.$textarea.css({
						margin:          0,
						webkitBoxSizing: "border-box",
						mozBoxSizing:    "border-box",
						boxSizing:       "border-box",
						width:           "100%"
					});
				}

				// Sets the basic clone styles and copies styles over from the textarea
				function _setCloneStyles() {
					var css = {
						display:    'block',
						border:     '0 solid',
						visibility: 'hidden',
						minHeight:  this.$textarea.prop('offsetHeight')
					};

					if(this.$textarea.attr("wrap") === "off") css.overflowX = "scroll";
					else css.whiteSpace = "pre-wrap";

					this.$clone.css(css);
					_copyTextareaStylesToClone();
				}

				function _copyTextareaStylesToClone() {

					angular.element(document).ready(function () {
						var styles = window.getComputedStyle(element[0], null);
						console.log(styles['fontSize']);
						var _this = this,
							properties = [
								'lineHeight', 'textDecoration', 'letterSpacing',
								'fontSize', 'fontFamily', 'fontStyle',
								'fontWeight', 'textTransform', 'textAlign',
								'direction', 'wordSpacing', 'fontSizeAdjust',
								'wordWrap', 'word-break',
								'borderLeftWidth', 'borderRightWidth',
								'borderTopWidth', 'borderBottomWidth',
								'paddingLeft', 'paddingRight',
								'paddingTop', 'paddingBottom', 'maxHeight'];

						a.forEach(properties, function(property, i) {
							var val = styles[property];
							// Prevent overriding percentage css values.
							if(_this.$clone.css(property) !== val) {
								_this.$clone.css(property, val);
								if(property === 'maxHeight' && val !== 'none') {
									_this.$clone.css('overflow', 'hidden');
								}
							}
						});
					});
				}

				function _setTextareaStyles() {
					this.$textarea.css({
						position:     "absolute",
						top:          0,
						left:         0,
						height:       "100%",
						resize:       "none",
						'overflow-x': "hidden",
						'overflow-y': "scroll"
					});
				}
			}

			return {
				restrict: 'A',
				link:     Expanding
			}
		}]);
}(angular));
