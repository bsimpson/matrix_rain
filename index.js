const CHARS = `ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍｦｲｸｺｿﾁﾄﾉﾌﾔﾖﾙﾚﾛﾝ`.split('');
const COLS = 10;
ROWS = 10;

function render(col) {
  const blockEl = document.querySelector(`.block .col-${col}`);

  setTimeout(() => {
    blockEl.querySelectorAll('.row').forEach((row) => {
      // shift down previous chars
      let rowNum = Array.from(row.classList)
      rowNum = rowNum.find(klass => klass.match("row-"))
      rowNum = rowNum.match(/row\-(\d+)/)[1];
      row.classList.replace(`row-${rowNum}`, `row-${parseInt(rowNum) + 1}`);

      // shuffle green
      let green = Array.from(row.classList)
      green = green.find(klass => klass.match("green-"))
      green = green.match(/green\-(\d+)/)[1];
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
    // TODO randomize length of tail
    if (blockEl.querySelectorAll('.row').length < ROWS) {
      setTimeout(() => { render(col) }, blockEl.dataset.speed);
    }
  // randomize start of rain
  }, Math.random() * 100);
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
  for(let i = 1; i <= COLS; i++) {

    // randomize column speeds
    document.querySelectorAll('.block .col').forEach(colEl => {
      colEl.dataset.speed = Math.ceil(Math.random() * 1000);
    });

    render(i)

    // TODO repeat rain drop when at bottom
  }
}