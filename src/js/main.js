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
         .map(i => {
           return {
             tagName: 'H1',
             children: [
               {
                 tagName: 'SPAN',
                 children: [
                   `Seconds enlapsed ${i}`
                 ]
               }
             ]
           }
         })
      ),
    Log: Rx.Observable.timer(0, 2000).map(i => 2 * i)
  }

  return sinks
}

// source: input (read) effects
// sink: output (write) effects

// Effects (imperative)
function DOMDriver (obj$) {
  const createElement = (obj) => {
    const element = document.createElement(obj.tagName)
    obj.children
        .filter(c => typeof c === 'object')
        .map(createElement)
        .forEach(c => element.appendChild(c))
    obj.children
        .filter(c => typeof c === 'string')
        .forEach(c => element.innerHTML += c)
    return element
  }

  obj$.subscribe(obj => {
    const container = document.querySelector('#app')
    container.innerHTML = ''
    const element = createElement(obj)
    container.appendChild(element)
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
