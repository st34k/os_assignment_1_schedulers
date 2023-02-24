const PX_MULTIPLIER = 15; // multiply every pixel by 15

export function generateRandomColor() {
  return '#' + (0x1000000 + (Math.random()) * 0xffffff).toString(16).substr(1, 6)
}

export function getProcessDivDef({ pid, start, end, bgcolor }) {
  const processDisplayBar = document.getElementById('processes')

  return {
    type: 'div',
    parent: processDisplayBar,
    innerText: `P${ pid }`,
    width: `${ (end - start) * PX_MULTIPLIER }px`,
    bgcolor,
    textAlign: 'center',
    border: '1px solid black',
    pos: 'absolute',
    left: start * PX_MULTIPLIER
  }
}

export function getTimestampDivDef({ start = 0, end = 0 }) {
  const timestampDisplayBar = document.getElementById('timestamps')

  return {
    type: 'div',
    parent: timestampDisplayBar,
    left: start ? start * PX_MULTIPLIER : end * PX_MULTIPLIER,
    innerText: start ? `${ start }` : `${ end }`,
    top: '20px',
    pos: 'absolute'
  }
}

export function calcAndDisplayAverageWT({ terminated }) {
  document.getElementById('averageWt').textContent = `${ terminated.reduce((acc, p) => acc + p.waiting, 0) / terminated.length }ms`
}