```jsx
<Table modifiers={['striped', 'fill']} headers={['rubrik', 'rubrik']} rows={[['cell', 'cell'], ['cell', 'cell']]} />
```

```jsx
<Table modifiers={['striped', 'fill']} headers={['rubrik', 'rubrik']} rows={[['cell', 'cell'], {to: '#table', cells: ['cell', 'cell']}, {cells: ['cell', 'cell'], content: <div>Expandera mig</div>}]} />
```
