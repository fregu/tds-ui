**default**

```jsx
<Loader />
```

**overlay**
Med overlay, så dimmas bakgrunden ut och spinnern får en vit bakgrund. Kan även kombineras med fixed då hela loadern fixeras mot center av skärmytan

```jsx
<div
  className={cx('')}
  style={{
    position: 'relative',
    overflow: 'hidden',
    zIndex: 1,
    transform: 'translateZ(0)'
  }}
>
  <Loader overlay />
</div>
```
