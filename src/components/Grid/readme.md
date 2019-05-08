Dela upp element i olika delar baserat på ledigt utrymme för att göra fullständiga rader.
Styrs med hjälpklasserna `width` för att sätt bredder baserat på skrämbredd.



```jsx
<Grid withGap>
  <GridCell widths={{s: '2of3', m: '3of4'}}><div className={cx('theme-purple')}>Cell 1</div></GridCell>

  <GridCell widths={{'': '1of2', s: '1of3', m: '1of4'}}><div className={cx('theme-turquoise')}>Cell 2</div></GridCell>

  <GridCell widths={{'': '1of2', m: '1of3'}}><div className={cx('theme-blue')}>Cell 3</div></GridCell>

  <GridCell widths={{'': '1of1', s: '1of2', m: '1of3'}}><div className={cx('theme-red')}>Cell 3</div></GridCell>

  <GridCell widths={{ m: '1of3'}}><div className={cx('theme-green')}>Cell 3</div></GridCell>
</Grid>
```
