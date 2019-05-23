Input field for any type of form where single row input is needed

```js
<Input type="search" icon={{ type: 'magnifier' }} />
```

```jsx
<Gutter vertical>
  <Input label="standard" type="text" placeholder="test" />
  <Input label="Obligatoriskt" required type="text" placeholder="test" />
  <Input label="Disabled" disabled type="text" placeholder="test" />
  <Input label="E-post" type="email" placeholder="f@g.se" />
  <Input label="Nummer" type="number" defaultValue="2" />
  <Input
    label="Datum"
    icon={{ type: 'calendar', className: 'color-red', size: 'big' }}
    type="date"
  />
  <Input label="Size" size="2" type="number" defaultValue="2" />
  <Input
    label="Egen validering (3+2)"
    size="3"
    validate={val => val === '5'}
    errorMessage="Fel värde gissa igen"
    type="number"
  />
  <Input
    label="Med ikon"
    icon={{ type: 'calculator' }}
    size="2"
    type="number"
    defaultValue="2"
  />
  <Input label="Fyll raden" fill type="tel" />
</Gutter>
```
