import Rx from 'rx'
import Cycle from '@cycle/core'
import {h1, span, makeDOMDriver} from '@cycle/dom'

const style = {
  h1: {
    color: 'deepskyblue',
    fontFamily: 'helvetica',
    fontWeight: '100'
  }
}

// Logic (functional)
function main (DOMSource) {
  const click$ = DOMSource.DOM.select('span').events('mouseover')
  const sinks = {
    DOM: click$
      .startWith(null)
      .flatMapLatest(() =>
        Rx.Observable.timer(0, 1000)
         .map(i => h1({style: style.h1}, [
           span([
             `Seconds enlapsed ${i}`
           ])
         ])
         )
      ),
    Log: Rx.Observable.timer(0, 2000).map(i => 2 * i)
  }

  return sinks
}

// source: input (read) effects
// sink: output (write) effects

// Effects (imperative)

function consoleLogDriver (msg$) {
  msg$.subscribe(msg => console.log(msg))
}

const drivers = {
  DOM: makeDOMDriver('#app'),
  Log: consoleLogDriver
}

Cycle.run(main, drivers)
