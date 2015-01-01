# Growing Input AngularJS directive

This directive allows textarea to grow to limited  height. `jQuery` **FREE**. Requires only AngularJS.

This directive was made with incarnation of @bgrins [ExpandingTextareas](https://github.com/bgrins/ExpandingTextareas) jQuery plugin.

## How to use.

Install using bower

    bower install angular-growing-input

Include to your `index.html`

    <script src="components/angular/angular.js"></script>
    <script src="components/angular-growing-input/angular-grow.js"></script>

Add dependency to your application

     app.module("YourAPP", ["growingInput"]);

Apply directive to `<textarea>`

    <textarea grow="100" ng-model="t"></textarea>

This tells that `textarea` will grow up to `100px` height.