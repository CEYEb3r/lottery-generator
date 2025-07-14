/* ===== element references ===== */
const btn        = document.getElementById('mybutton');
const modeSel    = document.getElementById('gameMode');
const out        = document.getElementById('numberContainer');
const cCount     = document.getElementById('customCount');
const cMax       = document.getElementById('customMax');
const cJokerChk  = document.getElementById('customJoker');
const cInputsDiv = document.getElementById('customInputs');

/* show / hide custom panel */
modeSel.onchange = () => {
  cInputsDiv.style.display = modeSel.value === 'custom' ? 'block' : 'none';
};

/* unique random ints in [1 .. max] */
const uniqueNums = (k, max) => {
  const set = new Set();
  while (set.size < k) set.add(Math.floor(Math.random() * max) + 1);
  return [...set];
};

/* main click */
btn.onclick = () => {
  out.innerHTML = '';

  let total     = 0;
  let maxValue  = 0;
  let addJoker  = false;

  switch (modeSel.value) {
    case 'joker':
      total    = 5;
      maxValue = 45;
      addJoker = true;
      break;

    case 'lotto':
      total    = 6;
      maxValue = 49;
      break;

    case 'custom':
      total    = Number(cCount.value);
      maxValue = Number(cMax.value);
      addJoker = cJokerChk.checked;

      const invalid =
        !total || !maxValue ||          // blank / NaN
        total <= 0 || maxValue <= 0 ||  // non-positive
        total > 20  || total > maxValue;

      if (invalid) {
        alert('Count must be 1–20 and not exceed the max.');
        return;
      }
      break;

    default:
      alert('Select a game mode first.');
      return;
  }

  /* main numbers */
  uniqueNums(total, maxValue).forEach(n => {
    const p = document.createElement('p');
    p.textContent = n;
    p.className   = 'ball';
    out.appendChild(p);
  });

  /* optional joker */
  if (addJoker) {
    const p = document.createElement('p');
    p.textContent = Math.floor(Math.random() * 20) + 1;
    p.className   = 'ball joker';
    out.appendChild(p);
  }
};
