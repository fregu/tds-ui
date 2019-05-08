valfri wrappning av annan komponent baserat på någon parameter.

```jsx static
<ConditionalWrapper
  if={!!to}
  wrap={children => <Link to={to}>{children}</Link>}
>
  <div>...</div>
</ConditionalWrapper>
```
