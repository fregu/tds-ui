Modalfönster för enklare uppgifter i separat lager.

Den använder redux när det är tillgängligt för att anropa stänging

```jsx
<div
  style={{
    position: 'relative',
    overflow: 'hidden',
    zIndex: 1,
    transform: 'translateZ(0)',
    padding: '50px'
  }}
>
  <Modal title="Rubrik" modifiers={['block']}>
    Detta är innehållet i en modalruta
  </Modal>
</div>
```
