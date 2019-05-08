Datumhanterare som beräkar datum och returnera på önskat format.

```jsx
const dateHandler = require('./dateHandler').default
;<div>
  <div>
    dateHandler().get('date') -> <strong>{dateHandler().get('date')}</strong>
  </div>
  <div>
    dateHandler().modify(-1, 'day').get('relative') ->
    <strong>
      {dateHandler()
        .modify(-1, 'day')
        .get('relative')}
    </strong>
  </div>
  <div>
    dateHandler('2015-09-22 18:59').get('shortDate') ->
    <strong>{dateHandler('2015-09-22 18:59').get('shortDate')}</strong>
  </div>
  <div>
    dateHandler().get('time') ->
    <strong>{dateHandler().get('time')}</strong>
  </div>
  <div>
    dateHandler().modify(3, 'years').get('iso') ->
    <strong>
      {dateHandler()
        .modify(3, 'years')
        .get('iso')}
    </strong>
  </div>
</div>
```
