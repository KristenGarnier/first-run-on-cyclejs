import Rx from 'rx'
import Cycle from '@Cycle/core'

// Logic (functional)
function main (DOMSource) {
  const click$ = DOMSource.DOM
  const sinks = {
    DOM: click$
      .startWith(null)
      .flatMapLatest(() =>
        Rx.Observable.timer(0, 1000)
         .map(i => `Seconds elapsed ${i}`)
      ),
    Log: Rx.Observable.timer(0, 2000).map(i => 2 * i)
  }

  return sinks
}

// source: input (read) effects
// sink: output (write) effects

// Effects (imperative)
function DOMDriver (text$) {
  text$.subscribe(text => {
    const container = document.querySelector('#app')
    container.textContent = text
  })
  const DOMSource = Rx.Observable.fromEvent(document, 'click')
  return DOMSource
}

function consoleLogDriver (msg$) {
  msg$.subscribe(msg => console.log(msg))
}

const drivers = {
  DOM: DOMDriver,
  Log: consoleLogDriver
}

Cycle.run(main, drivers)
