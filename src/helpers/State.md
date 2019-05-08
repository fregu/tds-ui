State hanterare som inte kräver en class komponent.

```jsx static
<State state={{ counter: 0 }}>
  {({ counter, setState }) => (
    <Button onClick={() => setState({ counter: counter + 1 })}>
      {counter}
    </Button>
  )}
</State>
```
