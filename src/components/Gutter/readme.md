Det här är en separator som ser till att skapa konsekvent stora mellanrum mella komponenter.

Lägg `<Gutter />` runt en uppsättning element, så kommer de automatisk att separeras.

Man kan även välja propertyn `vertical` för att separera element i blockens riktning.

```jsx
<Gutter vertical>
  <Gutter>
    <span>Text</span>
    <Button>Knapp</Button>
    <Button>Knapp</Button>
  </Gutter>
  <Gutter>
    <span>Hej</span>
    <Button>Klick</Button>
  </Gutter>
</Gutter>
