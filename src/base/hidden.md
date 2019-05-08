Hjälpklasser för att dölja innehåll beroende på skärmbredd eller synlighet. Det finns två sätt att dölja innehåll `hidden` (som döljer elementet helt) eller `hidden-text` (som döljer elementet från design, men det finns synligt för skärmläsare)

Dessa går att förknippa med olika prefix för att sätta regler baserat på skärmstorlek.
```html
<div class="hidden">Alltid dold</div>
<div class="hidden-text">Alltid dold ur design</div>
<div class="s-hidden">Dold för skärmar bredare än small</div>
<div class="s-hidden-text">Dold ur design för skärmar bredare än small</div>
<div class="m-hidden">Dold för skärmar bredare än medium</div>
<div class="m-hidden-text">Dold ur design för skärmar bredare än medium</div>
<div class="l-hidden">Dold för skärmar bredare än large</div>
<div class="l-hidden-text">Dold ur design för skärmar bredare än large</div>
<div class="xl-hidden">Dold för skärmar bredare än x-large</div>
<div class="xl-hidden-text">Dold ur design för skärmar bredare än x-large</div>

<div class="xlmax-hidden">Dold för skärmar smalare än x-large</div>
<div class="xlmax-hidden-text">Dold ur design för skärmar smalare än x-large</div>
<div class="lmax-hidden">Dold för skärmar smalare än large</div>
<div class="lmax-hidden-text">Dold ur design för skärmar smalare än large</div>
<div class="mmax-hidden">Dold för skärmar smalare än medium</div>
<div class="mmax-hidden-text">Dold ur design för skärmar smalare än medium</div>
<div class="smax-hidden">Dold för skärmar smalare än small</div>
<div class="smax-hidden-text">Dold ur design för skärmar smalare än small</div>
