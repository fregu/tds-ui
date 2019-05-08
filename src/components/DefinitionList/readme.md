Defintionslistor med titel och en eller flera definitioner.

**Standard:**
```jsx
<DefinitionList items={[{
  title: 'Telefonnummer',
  definition: '07070707070'
}, {
  title: 'E-post',
  definitions: ['abc@def.gh', 'metoo@hotmail.com']
}]} />
```
**Inline:**
```jsx
<DefinitionList modifiers={['inline']} items={[{
  title: 'Telefonnummer',
  definition: '07070707070'
}, {
  title: 'E-post',
  definitions: ['abc@def.gh', 'metoo@hotmail.com']
}]} />
```

**HiddenTitle**:
```jsx
<DefinitionList modifiers={['hiddenTitle']} items={[{
  title: 'Telefonnummer',
  definition: '07070707070'
}, {
  title: 'E-post',
  definitions: ['abc@def.gh', 'metoo@hotmail.com']
}]} />
```
