const papanDadu = document.querySelector(".papan-dadu");
const btnStart = document.querySelector(".btn-start");
const btnStop = document.querySelector(".btn-stop");
const form = document.querySelector(".form");
const papanSkor = document.getElementById("papan-skor");
let skor = 0;

papanDadu.innerHTML = "Dadu belum dikocok.";

function KocokDadu() {
  let dadu = Math.floor(Math.random() * 6);

  switch (dadu) {
    case 1:
      console.log(1);
      papanDadu.innerHTML = `
      <div class="dadu">
      <span></span>
      </div>
      `;
      break;

    case 2:
      console.log(2);
      papanDadu.innerHTML = `
      <div class="dadu">
      <span></span>
      <span></span>
      </div>
      `;
      break;

    case 3:
      console.log(3);
      papanDadu.innerHTML = `
      <div class="dadu">
      <span></span>
      <span></span>
      <span></span>
      </div>
      `;
      break;

    case 4:
      console.log(4);
      papanDadu.innerHTML = `
      <div class="dadu">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      </div>
      `;
      break;

    case 5:
      console.log(5);
      papanDadu.innerHTML = `
      <div class="dadu">
      <span></span>
      <span></span>
      <span></span>
          <span></span>
          <span></span>
          </div>
          `;
      break;

    case 6:
      console.log(6);
      papanDadu.innerHTML = `
        <div class="dadu">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
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

  let dadu = setInterval(function () {
    let value = KocokDadu();
    i++;

    if (i >= timeout) {
      btnStop.click();
      btnStart.disabled = true;
      localStorage.setItem("nilai_dadu", value);

      clearInterval(dadu);
    }
  }, 20);

  return () => clearInterval(dadu);
}

btnStart.addEventListener("click", onStart);
btnStop.addEventListener("click", function () {
  papanDadu.classList.add("hidden");
  form.classList.remove("hidden");
});

function handleSubmit(e) {
  e.preventDefault();
  const { tebakNilaiDadu } = e.target;
  let skor = localStorage.getItem("skor");

  if (localStorage.getItem("nilai_dadu") === tebakNilaiDadu.value) {
    alert("Jawaban anda benar nilai dadu adalah " + tebakNilaiDadu.value);
    localStorage.setItem("skor", parseInt(skor) + 1);
    window.location.reload();
  } else {
    alert("Jawaban anda salah!");
    window.location.reload();
  }
}

form.btnSubmit.addEventListener("click", function (e) {
  form.onsubmit = handleSubmit;
});

papanSkor.innerHTML = localStorage.getItem("skor");
