const CHARS = `ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍｦｲｸｺｿﾁﾄﾉﾌﾔﾖﾙﾚﾛﾝ`.split('');
const COLS = 50;
const ROWS = 50;

function render(col) {
  const blockEl = document.querySelector(`.block .col-${col}`);

  setTimeout(() => {
    blockEl.querySelectorAll('.row').forEach((row) => {
      // shift down previous chars
      let rowNum = Array.from(row.classList)
      rowNum = rowNum.find(klass => klass.match("row-"))
      rowNum = rowNum.match(/row\-(\d*)/)[1];
      row.classList.replace(`row-${rowNum}`, `row-${parseInt(rowNum) + 1}`);

      // shuffle green
      let green = Array.from(row.classList)
      green = green.find(klass => klass.match("green-"))
      green = green.match(/green\-(\d*)/)[1];
      row.classList.replace(`green-${green}`, `green-${randomGreen(green)}`);

      // shuffle characters
      row.innerText = randomChar(row.innerText);
    })

    // create new char at top
    const rowEl = document.createElement('span');
    rowEl.classList.add('row', `row-1`);
    rowEl.innerText = randomChar();
    rowEl.classList.add(`green-${randomGreen()}`);
    blockEl.prepend(rowEl);

    // stop when we run out of rows
    if (blockEl.querySelectorAll('.row').length < blockEl.dataset.length) {
      setTimeout(() => { render(col) }, blockEl.dataset.speed);
    } else {
      setTimeout(() => { clearAndRestart(col, blockEl.dataset.speed) });
    }
  // randomize start of rain
  }, Math.random() * 100);
}

function clearAndRestart(col) {
  const blockEl = document.querySelector(`.block .col-${col}`);

  setTimeout(() => {
    let minRowNum = ROWS;

    blockEl.querySelectorAll('.row').forEach((row) => {
      // shift down previous chars
      let rowNum = Array.from(row.classList)
      rowNum = rowNum.find(klass => klass.match("row-"))
      rowNum = rowNum.match(/row\-(\d*)/)[1];

      if (parseInt(rowNum) >= ROWS) {
        blockEl.removeChild(row);
      } else {
        row.classList.replace(`row-${rowNum}`, `row-${parseInt(rowNum) + 1}`);
      }
    });

    // create new char at top
    const rowEl = document.createElement('span');
    rowEl.classList.add('row', `row-1`);
    // rowEl.innerText = randomChar();
    rowEl.classList.add(`green-${randomGreen()}`);
    blockEl.prepend(rowEl);

    if (Array.from(blockEl.querySelectorAll('.row')).map(el => el.innerText).filter(text => text).length) {
      // still have clearing out to do
      setTimeout(() => { clearAndRestart(col, blockEl.dataset.speed) });
    } else {
      // reset column speed, length, rows, and render again
      blockEl.innerHTML = null;
      blockEl.dataset.speed = Math.ceil(Math.random() * 1000);
      blockEl.dataset.length = Math.ceil(Math.random() * ROWS);
      setTimeout(() => { render(col) }, blockEl.dataset.speed);
    }

  }, blockEl.dataset.speed);
}

function randomChar(char) {
  if (char && Math.random() > .75) {
    return char;
  }

  return CHARS[Math.floor(Math.random() * CHARS.length)];
}

function randomGreen(green) {
  if (green && (Math.random() > .75)) {
    return green;
  }

  return Math.ceil(Math.random() * 4);
}

window.onload = () => {
  // dynamically define styles
  const inlineStyleEl = document.createElement('style')
  inlineStyleEl.setAttribute('type', 'text/css');
  let contents = '';
  for(let i = 1; i < ROWS; i++) {
    contents += `.row-${i} { top: ${i - 1}em; }`
    contents += "\n"
  }
  inlineStyleEl.innerText = contents;
  document.querySelector('body').appendChild(inlineStyleEl);

  for(let i = 1; i <= COLS; i++) {
    // setup columns
    const blockEl = document.querySelector('.block');
    const colEl = document.createElement('div');
    colEl.classList.add('col');
    colEl.classList.add(`col-${i}`);
    blockEl.appendChild(colEl);

    document.querySelectorAll('.block .col').forEach(colEl => {
      // randomize column speeds
      colEl.dataset.speed = Math.ceil(Math.random() * 1000);

      // randomize column lengths
      colEl.dataset.length = Math.ceil(Math.random() * ROWS);
    });

    render(i)
  }
}