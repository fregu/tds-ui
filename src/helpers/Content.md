Styckeuppdelare som tar in en parameter content med en sträng, en array med strängar eller dom.

Den styckar automatiskt upp strängar på blankrader och returerar som separata paragrafer, för arrayer renderar den varje sträng instans som en paragraph (eller annan önskad tag)

**Array med strängar**

```
<Content content={['Ibland blir man tokig', 'Alla dessa strängar', 'Som man måste ta hand om']} />
```

**Sträng med blankrader**

```
<Content content={`
  Ibland blir man tokig
  Alla dessa strängar
  Som man måste ta hand om`} />
```
