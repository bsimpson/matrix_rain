const CHARS = `ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍｦｲｸｺｿﾁﾄﾉﾌﾔﾖﾙﾚﾛﾝ`.split('');
let times = 0;

function render() {
  const blockEl = document.querySelector('.block');

  setTimeout(() => {
    // shift down previous chars
    document.querySelectorAll('.row').forEach((row) => {
      let rowNum = Array.from(row.classList)
      rowNum = rowNum.find(klass => klass.match("row-"))
      rowNum = rowNum.match(/row\-(\d+)/)[1];
      row.classList.replace(`row-${rowNum}`, `row-${parseInt(rowNum) + 1}`);
    })

    // create new char
    const rowEl = document.createElement('span');
    rowEl.classList.add('row', `row-${1 + 1}`);
    rowEl.innerText = randomChar();
    rowEl.classList.add(`green-${Math.ceil(Math.random() * 4)}`)
    blockEl.prepend(rowEl);

    times++;

    if (times < 5) {
      setTimeout(render, 1000);
    }
  }, 1000)
}

function randomChar() {
  return CHARS[Math.floor(Math.random() * CHARS.length)];
}

window.onload = render;