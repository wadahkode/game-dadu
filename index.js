const container = document.querySelector(".papan");
const papanDadu = document.querySelector(".papan-dadu");
const btnStart = document.querySelector(".btn-start");
const btnStop = document.querySelector(".btn-stop");
const form = document.querySelector(".form");
const papanCredit = document.getElementById("papan-credit");
const creditBet = document.getElementById("credit");
const audio = document.createElement("audio");
const btnCreditMin = document.getElementById("btn-credit-min");
const btnCreditPlus = document.getElementById("btn-credit-plus");
const btnReload = document.querySelector(".btn-reload");
const btnDadu = document.querySelectorAll(".btn-dadu");
let credit =
  localStorage.getItem("credit") === null
    ? 20000
    : parseInt(localStorage.getItem("credit"));
let bet =
  localStorage.getItem("credit_bet") === null
    ? 250
    : parseInt(localStorage.getItem("credit_bet"));
let betMax = 5000;

btnReload.onclick = () => {
  localStorage.removeItem("credit");
  localStorage.removeItem("credit_bet");
  window.location.reload();
};

papanDadu.innerHTML = `
  <div class="dadu-preview">
    <div>
      <img src="assets/images/dadu-1.png" width="80" alt=""/>
      <img src="assets/images/dadu-2.png" width="80" alt=""/>
      <img src="assets/images/dadu-3.png" width="80" alt=""/>
    </div>
    <div>
      <img src="assets/images/dadu-4.png" width="80" alt=""/>
      <img src="assets/images/dadu-5.png" width="80" alt=""/>
      <img src="assets/images/dadu-6.png" class="rotate-90" width="80" alt=""/>
    </div>
  </div>
`;

creditBet.innerHTML = toRupiah(parseInt(bet), "Rp. ");

btnCreditMin.onclick = (e) => {
  if (bet === 250) return false;
  else bet -= 250;

  localStorage.setItem("credit_bet", bet);
  creditBet.innerHTML = toRupiah(bet, "Rp. ");
};

btnCreditPlus.onclick = (e) => {
  bet += 250;

  if (bet >= betMax) {
    e.currentTarget.disabled = true
    return false
  }
  
  localStorage.setItem("credit_bet", bet)
  creditBet.innerHTML = toRupiah(bet, "Rp. ");
};

function KocokDadu() {
  let dadu = Math.floor(Math.random() * 6) + 1;

  switch (dadu) {
    case 1:
      papanDadu.innerHTML = `
      <div class="dadu">
        <img src="assets/images/dadu-1.png" alt=""/>
      </div>
      `;
      break;

    case 2:
      papanDadu.innerHTML = `
      <div class="dadu">
        <img src="assets/images/dadu-2.png" alt=""/>
      </div>
      `;
      break;

    case 3:
      papanDadu.innerHTML = `
      <div class="dadu">
        <img src="assets/images/dadu-3.png" alt=""/>
      </div>
      `;
      break;

    case 4:
      papanDadu.innerHTML = `
      <div class="dadu">
        <img src="assets/images/dadu-4.png" alt=""/>
      </div>
      `;
      break;

    case 5:
      papanDadu.innerHTML = `
      <div class="dadu">
        <img src="assets/images/dadu-5.png" alt=""/>
      </div>
      `;
      break;

    case 6:
      papanDadu.innerHTML = `
        <div class="dadu">
          <img src="assets/images/dadu-6.png" class="rotate-90" alt=""/>
        </div>
      `;
      break;
  }

  return dadu;
}

function onStart() {
  let timeout = 240;
  let i = 1;

  btnStart.disabled = true;

  if (credit < 250) {
    alert("Kredit tidak cukup, Silahkan ulangi permainan.");

    return reloadPapanDadu();
  } else if (credit < bet) {
    alert("Kredit tidak cukup, Silahkan turunkan taruhan anda.");

    return reloadPapanDadu();
  }

  if (papanDadu.classList.contains("hidden")) {
    papanDadu.classList.remove("hidden");
  }

  if (!form.classList.contains("hidden")) {
    form.classList.add("hidden");
  }

  audio.src = "./assets/audio/sound.mp3";
  audio.autoplay = true;
  audio.loop = true;

  let dadu = setInterval(function () {
    let value = KocokDadu();

    if (i >= timeout) {
      audio.loop = false;

      btnStop.click();
      btnStart.disabled = true;
      localStorage.setItem("nilai_dadu", value);
      container.style.height = "500px";

      clearInterval(dadu);
    }

    i++;
  }, 20);
}

btnStart.addEventListener("click", onStart);
btnStop.addEventListener("click", function () {
  papanDadu.classList.add("hidden");
  form.classList.remove("hidden");
  form.classList.add("flex");
});

function handleSubmit(e) {
  const { tebakNilaiDadu } = e.target;

  let win = 0;

  if (tebakNilaiDadu.value <= 3) {
    win = tebakNilaiDadu.value * bet + 2000;
  } else if (tebakNilaiDadu.value >= 6) {
    win = tebakNilaiDadu.value * bet + 5000;
  }

  if (localStorage.getItem("nilai_dadu") === tebakNilaiDadu.value) {
    alert("Jawaban anda benar nilai dadu adalah " + tebakNilaiDadu.value);
    localStorage.setItem("credit", parseInt(credit) + win);
    window.location.reload();
  } else {
    alert("Jawaban anda salah!");
    localStorage.setItem("credit", parseInt(credit) - bet);
    window.location.reload();
  }

  e.preventDefault();
}

function toRupiah(angka, prefix) {
  var number_string = new Intl.NumberFormat().format(angka);
  return `${prefix}${number_string}`;
}

function tebakNilaiDadu(event) {
  const audioLose = document.createElement("audio");
  const audioWin = document.createElement("audio");
  let x = parseInt(event.currentTarget.dataset.target);
  let y = parseInt(localStorage.getItem("nilai_dadu"));
  let win = 0;
  let lose = 0;

  if (y === x) {
    audioWin.src = "./assets/audio/win.wav";
    audioWin.autoplay = true;
    // alert("Jawaban anda benar nilai dadu adalah " + x);
    if (audioWin.readyState) {
      audioWin.autoplay = false;
      papanDadu.appendChild(audioWin);
    }

    win = x <= 3 ? x * bet + 2500 + credit : x * bet + 5000 + credit;
    localStorage.setItem("credit", win);

    return reloadPapanDadu();
  } else {
    audioLose.src = "./assets/audio/lose.wav";
    audioLose.autoplay = true;

    // alert("Jawaban anda salah!");
    if (audioLose.readyState) {
      audioLose.autoplay = false;
      papanDadu.appendChild(audioLose);
    }

    lose = credit - bet;
    localStorage.setItem("credit", lose);

    return reloadPapanDadu();
  }
}

function reloadPapanDadu() {
  form.classList.add("hidden");
  form.classList.remove("flex");
  btnStart.disabled = false;
  papanDadu.classList.remove("hidden");
  papanDadu.innerHTML = `
      <div class="dadu-preview">
        <div>
          <img src="assets/images/dadu-1.png" width="80" alt=""/>
          <img src="assets/images/dadu-2.png" width="80" alt=""/>
          <img src="assets/images/dadu-3.png" width="80" alt=""/>
        </div>
        <div>
          <img src="assets/images/dadu-4.png" width="80" alt=""/>
          <img src="assets/images/dadu-5.png" width="80" alt=""/>
          <img src="assets/images/dadu-6.png" class="rotate-90" width="80" alt=""/>
        </div>
      </div>
    `;
}

btnDadu.forEach((btn) => {
  btn.onclick = tebakNilaiDadu;
});

form.btnSubmit.addEventListener("click", function (e) {
  form.onsubmit = handleSubmit;
});

setInterval(() => {
  credit =
    localStorage.getItem("credit") === null
      ? 20000
      : parseInt(localStorage.getItem("credit"));

  papanCredit.innerHTML = toRupiah(credit, "Rp. ");
}, 20);
