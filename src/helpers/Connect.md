Hjälpwrapper för att ansluta react komponent till Redux utan att behöva deklarera en class komponent.

Lägg in `<Connect>` som en wrapper runt innehållet i jsx, så kommer resten av innehållet åt innehållet i Redux.

Stöder uthämtning av state från redux genom propertyn `mapStateToProps` eller om man föredrar bara `props`.

```jsx static
<Connect props={({ user }) => ({ user })}>
  {({ user }) => <div>{user.firstName}</div>}
</Connect>
```

Den kan även koppla upp action creators mot dispatch, med parametern `mapDispatchToProps`.

```jsx static
<Connect mapDispatchToProps={{ someActionCreator }}>
  {({ someActionCreator }) => <Button onClick={() => someActionCreator()} />}
</Connect>
```

eller om man önskar använda dispatch som också returneras från `Connect`

```jsx static
<Connect>
  {({ dispatch }) => <Button onClick={() => dispatch(someActionCreator())} />}
</Connect>
```
