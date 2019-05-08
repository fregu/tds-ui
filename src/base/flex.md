Uppsättning av hjälpklasser för att skapa flexibel layout med flexbox.

```html
<!-- Wrapper classes -->
  <div class="flex-row">Direction in row</div>
  <div class="flex-row-reverse">Reversed order row</div>
  <div class="flex-wrap">Allow row wrapping</div>
  <div class="flex-nowrap">Prevent row wrapping</div>
  <div class="flex-column">Direction in column</div>
  <div class="flex-column-reverse">Reversed order column</div>

<!-- Alignment -->
  <div class="flex-spread">Spread children eaqual over space</div>
  <div class="flex-center">Justify children to center</div>
  <div class="flex-left">Justify children from left</div>
  <div class="flex-right">Justify children from right</div>
  <div class="flex-top">Align children to the top</div>
  <div class="flex-middle">Align children middle to each orther</div>
  <div class="flex-bottom">Align children to the bottom</div>

<!-- Child classes -->
  <div class="flex-grow">Allow child to fill out available space</div>
  <div class="flex-shrink">Allow child to shrink it's size</div>
  <div class="flex-auto">Automatic size based on width styles or content</div>
  <div class="flex-fixed">No growing nor shrinking, stay same size</div>
  <div class="flex-order1">Define order of children</div>
  <div class="flex-order2">Define order of children</div>
  <div class="flex-order3">Define order of children</div>
  ...
  <div class="flex-order10">Define order of children</div>


```

```js
<div className="flex-row flex-top flex-spread" style={{height: '75px', background: '#eee'}}>
  <div className="theme-purple flex-order2">1</div>
  <div className="theme-red flex-order4">12</div>
  <div className="theme-turquoise">123</div>
</div>
```
