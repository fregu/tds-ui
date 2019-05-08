Den definierar CSS variabler för max-bredd och avstånd som används av andra komponenter
```css { "cssvar": "../layout.css" }
```

och definierar också hjälpklasser för layout enligt
```html
<div class="layout-container">Centrerad med maxbredd på --layout-max-width</div>
<div class="layout-small-container">Centrerad med maxbredd på --layout-small-max-width</div>
<div class="layout-gutter">Sätter sidomarginaler enligt --layout-gutter</div>
<div class="layout-container layout-gutter">Standard sid-container som sätter maxbredd och marginaler</div>
```
