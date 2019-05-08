Expandera och kollapsa innehåll

```jsx
<Accordion title="Expandera mig">
  <p>Det som göms i snö...</p>
</Accordion>
<Accordion theme="dark-grey" title="Dark mode">
  <p>Det som göms i snö...</p>
</Accordion>
<Accordion title="Utan content padding" noPadding>
  <div className="theme-primary layout-gutter layout-vertical-gutter">...kommer fram i tö</div>
</Accordion>
<Accordion title="Jag kan också fylla hela skärmen" fill>
  <p>Om du vill att jag ska göra det alltså</p>
  <p>Fill antar bredden av nuvarande skärmyta, men kräver att den placeras centrerat för att täcka kant till kant.</p>
</Accordion>
```
