# Button

```jsx
<Gutter>
  <Button onClick={() => console.log('You did it!')}>Klicka mig!</Button>
  <Button primary onClick={() => console.log('You did it!')}>
    Primary
  </Button>
  <Button icon={{ type: 'arrowRight' }} iconAfter>
    Knapp med ikon
  </Button>
  <Button theme="purple">Tema lila</Button>
  <Button theme="red" icon={{ type: 'upload' }}>
    Tema röd
  </Button>
  <Button modifiers={['square']}>Square</Button>
  <Button modifiers={['plain']}>Plain</Button>
  <Button to="/#button">Linked</Button>
  <Button modifiers={['hiddenText']} icon={{ type: 'close' }}>
    Stäng
  </Button>
  <Button modifiers={['hiddenText', 'plain']} icon={{ type: 'close' }}>
    Stäng
  </Button>
</Gutter>
```

Med attributet `confirm` triggas en redux-action som applikationen kan hentera för att visa en dialogruta se `<Dialog />`
