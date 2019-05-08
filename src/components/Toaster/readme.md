Toasters används för enklare statushändelser när någonting är uppdaterat eller om någonting går fel.

Den triggas genom redux och försvinner automatiskt efter 5 sekunder (om inte parameter `persistent` sätts)

```
<Toaster persistent>Nånting har hänt</Toaster>
<Toaster persistent title="Lyckades" status="success">Nånting har gått bra</Toaster>
<Toaster persistent title="Misslyckades" status="error">Nånting har gått på tok</Toaster>
```
