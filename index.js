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
let credit = !localStorage.getItem("credit")
  ? 200000
  : localStorage.getItem("credit");
let bet = !localStorage.getItem("credit_bet")
  ? 250
  : localStorage.getItem("credit_bet");
let betMax = bet * 20;

// localStorage.removeItem("credit");
// localStorage.removeItem("credit_bet");

papanDadu.innerHTML = "Dadu belum dikocok.";
creditBet.innerHTML = toRupiah(parseInt(bet), "Rp. ");

btnCreditMin.onclick = () => {
  bet = parseInt(bet);

  if (bet === 250) return false;
  bet -= 250;

  localStorage.setItem("credit_bet", bet);
  creditBet.innerHTML = toRupiah(bet, "Rp. ");
};

btnCreditPlus.onclick = () => {
  bet = parseInt(bet);
  bet += 250;

  if (bet > betMax) return false;

  localStorage.setItem("credit_bet", bet);
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
          <img src="assets/images/dadu-6.png" alt=""/>
        </div>
      `;
      break;
  }

  return dadu;
}

function onStart() {
  let timeout = 200;
  let i = 1;

  if (papanDadu.classList.contains("hidden")) {
    papanDadu.classList.remove("hidden");
  }

  if (!form.classList.contains("hidden")) {
    form.classList.add("hidden");
  }

  audio.src = "./sound.mp3";
  audio.autoplay = true;
  audio.loop = true;

  let dadu = setInterval(function () {
    let value = KocokDadu();
    i++;

    if (i >= timeout) {
      btnStop.click();
      btnStart.disabled = true;
      localStorage.setItem("nilai_dadu", value);
      audio.loop = false;
      container.style.height = "500px";

      clearInterval(dadu);
    }
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

form.btnSubmit.addEventListener("click", function (e) {
  form.onsubmit = handleSubmit;
});

papanCredit.innerHTML = toRupiah(parseInt(credit), "Rp. ");
