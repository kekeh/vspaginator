# vspaginator v. 0.0.1

**Paginator - AngularJS reusable UI component**

## Description
AngularJS paginator directive.


## Usage

* include the **vspaginator-0.0.1.min.js** and the **vspaginator-0.0.1.min.css** files into your project. See the **Build project** and the **Installation** chapters below.
```html
<script src="vspaginator-0.0.1.min.js"></script>
<link href="vspaginator-0.0.1.min.css" rel="stylesheet" type="text/css">
```
* inject the **vspaginator** module into your application module.
```js
angular.module('vssampleapp', ['vspaginator']);
```
* add **vspaginator** HTML tag into your HTML file. See the **HTML example** chapter below.
* add needed Javascript code. See the **Javascript example** chapter below.

### HTML example
```html
<vspaginator options="opt"></vspaginator>
```

### Tags
| Tag  | Description | Mandatory | 
| :------------ |:---------------|:---------------|
| vspaginator | vspaginator tag | yes |


### Attributes
| Attribute | Description | Mandatory | 
| :------------ |:---------------|:---------------|
| options | vspaginator option passed to the directive. See the **Options data** chapter below. | yes |


### Options data (an option attribute in the vspaginator directive)

| Attribute | Description | Values | Mandatory |
| :------------ |:---------------|:---------------|:---------------|
| **totalPages** | Count of total pages. This can be dynamically changed by setting new value to this property. | number | yes |
| **activePage** | Selected page. This can be dynamically changed by setting new value to this property. | number | no |
| **visibleBtnCount** | Count of visible number buttons. The default value is 3. | number | no |
| **prevNextBtn** | Object which contain sub properties. | See below. | no |
| prevNextBtn.**visible** | Is previous page and next page buttons visible on the paginator or not. | true or false | no |
| prevNextBtn.**labels** | Array of two strings. Labels (visible in UI) of the buttons. | string array | no |
| **prevNextSetBtn** | Object which contain sub properties. | See below. | yes |
| prevNextSetBtn.**visible** | Is previous set of pages and next set of pages buttons visible on the paginator or not. | true or false | no |
| prevNextSetBtn.**labels** | Array of two strings. Labels (visible in UI) of the buttons. | string array | no |
| **firstLastBtn** | Object which contain sub properties. | See below. | no |
| firstLastBtn.**visible** | Is first page and last page buttons visible on paginator or not. | true or false | no |
| firstLastBtn.**labels** | Array of two strings. Labels (visible in UI) of the buttons. | string array | no |
| **pageChangedCb** | Page changed callback. See below. | function | no |


#### pageChangedCb

Example of the function. See description of the parameters below the example.

```js
var onPageChanged = function (newPage, oldPage) {
    console.log('PARENT: page changed: new page: ', newPage, ' old page: ', oldPage);
}
```

| Function | Parameters | Description | 
| :------------ |:---------------|:---------------|
| dataOperationCb | fromPage, toPage  | Called when the page changes. |

##### Parameters
* fromPage - Current page before change.
* toPage - Current page after change.


### Javascript example
```js
var sampleapp = angular.module('vssampleapp', ['vspaginator']);
sampleapp.controller('sampleappctrl', function ($scope, vspgConf) {
    vspgConf.visibleBtnCount = 4;
    vspgConf.prevNextSetBtn.visible = false;
    ...
}
```

By injecting the **vspgConf** the parent can change some of the default configuration values of the vspaginator. See the example above.


## Demo
In the **examples** folder of this project has the sample application and the online demo is [here](http://kekeh.github.io/vspaginator)

## Dependencies
Depends on AngularJS. Implemented using the AngularJS version 1.4.4. No other dependencies.

## Build project
* Build can be done by executing the **grunt** command. It creates the **dist/debug** and the **dist/min** folders and put needed files to these folders.
```js
grunt
```

## Installation
* Installation can be done using the **bower**. It installs files from the **dist/debug** and the **dist/min** folders. Needed CSS and javascript files are located in these folders.
```js
bower install vspaginator
```

## Compatibility (tested with)
* IE 10+
* Firefox 36.0.4
* Google Chrome 41.0.2272.101
* Opera 28.0
* Safari Mobile 8

## License
* License: MIT

## Author
* Author: kekeh
