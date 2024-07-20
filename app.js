const btn = document.querySelector(".talk");
const content = document.querySelector(".content");

function speak(text) {
  const text_speak = new SpeechSynthesisUtterance(text);

  text_speak.rate = 1;
  text_speak.volume = 1;
  text_speak.pitch = 1;

  window.speechSynthesis.speak(text_speak);
}

function wishMe() {
  var day = new Date();
  var hour = day.getHours();

  if (hour >= 0 && hour < 12) {
    speak("Bom dia, querida...");
  } else if (hour >= 12 && hour < 17) {
    speak("Boa tarde, mestre...");
  } else {
    speak("Boa noite, senhora...");
  }
}

window.addEventListener("load", () => {
  speak("Inicializando SEXTA-FEIRA...");
  wishMe();
});

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.onresult = (event) => {
  const currentIndex = event.resultIndex;
  const transcript = event.results[currentIndex][0].transcript;
  content.textContent = transcript;
  takeCommand(transcript.toLowerCase());
};

btn.addEventListener("click", () => {
  content.textContent = "Ouvindo...";
  recognition.start();
});

function takeCommand(message) {
  if (message.includes("oi") || message.includes("olá")) {
    speak("Olá Sara Raquel, em que me encomodas?");
  } else if (message.includes("abrir google")) {
    window.open("https://google.com", "_blank");
    speak("Abrindo Pai dos burros...");
  } else if (message.includes("abrir youtube")) {
    window.open("https://youtube.com", "_blank");
    speak("Abrindo Youtube...");
  } else if (message.includes("abrir facebook")) {
    window.open("https://facebook.com", "_blank");
    speak("Serio que voce ainda usa o Facebook?...");
  } else if (message.includes("abrir instagram")) {
    window.open("https://instagram.com", "_blank");
    speak("Abrindo instagram...");
  } else if (message.includes("abrir twitter")) {
    window.open("https://x.com", "_blank");
    speak("Ninguem merece chamar esta obra de arte de X nao é mesmo?...");
  } else if (
    message.includes("o que é") ||
    message.includes("quem é") ||
    message.includes("o que são")
  ) {
    window.open(
      `https://www.google.com/search?q=${message.replace(" ", "+")}`,
      "_blank"
    );
    const finalText =
      "Isto é o que encontrei na internet sobre, se ta certo eu ja nao sei lhe informar " +
      message;
    speak(finalText);
  } else if (message.includes("wikipedia")) {
    window.open(
      `https://pt.wikipedia.org/wiki/${message
        .replace("wikipedia", "")
        .trim()}`,
      "_blank"
    );
    const finalText = "Isto é o que encontrei na Wikipedia sobre " + message;
    speak(finalText);
  } else if (message.includes("horas")) {
    const time = new Date().toLocaleString(undefined, {
      hour: "numeric",
      minute: "numeric",
    });
    const finalText = "Sao exatamente " + time;
    speak(finalText);
  } else if (message.includes("data")) {
    const date = new Date().toLocaleString(undefined, {
      month: "short",
      day: "numeric",
    });
    const finalText = "Hoje é dia " + date;
    speak(finalText);
  } else if (message.includes("calculadora")) {
    window.open("Calculator:///");
    const finalText = "Abrindo Calculadora";
    speak(finalText);
  } else {
    window.open(
      `https://www.google.com/search?q=${message.replace(" ", "+")}`,
      "_blank"
    );
    const finalText =
      "Encontrei algumas informações sobre " + message + " no Google";
    speak(finalText);
  }
}
