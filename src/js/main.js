import Cycle from '@cycle/core'
import {makeDOMDriver, div, input, p} from '@cycle/dom'

const chooseMessage = function chooseMessage (message) {
  switch (message.toLowerCase()) {
    case 'love you':
      return 'Ho, U SWEET'
    case 'hate you':
      return 'Well too bad for you'
    default:
      return 'Well you are not saying something i am interested in'
  }
}

function main (drivers) {
  return {
    DOM: drivers.DOM.select('input').events('keyup')
        .map(ev => ev.target.value)
        .startWith('')
        .map(message =>
            div([
              input({type: 'text', placeholder: 'Tapez moi'}),
              p(chooseMessage(message))
            ])
        )
  }
}

// another comment
const drivers = {
  DOM: makeDOMDriver('#app')
}

// adding some comments
Cycle.run(main, drivers)
