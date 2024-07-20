const btn = document.querySelector(".talk");
const content = document.querySelector(".content");

let numeroSecreto;
let tentativas = 0;

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

function startGame() {
  numeroSecreto = Math.floor(Math.random() * 100) + 1;
  tentativas = 0;
  speak(
    "Bem-vindo ao Akinator dos números! Eu escolhi um número entre 1 e 100. Tente adivinhar!"
  );
  content.textContent = "Jogo iniciado. Faça um palpite.";
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
  if (
    typeof window.AudioContext !== "undefined" ||
    typeof window.webkitAudioContext !== "undefined"
  ) {
    const audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();
    if (audioContext.state === "suspended") {
      audioContext.resume();
    }
  }
  window.speechSynthesis.cancel();
  speak("Ouvindo...");
  content.textContent = "Ouvindo...";
  recognition.start();
});

function takeCommand(message) {
  if (message.includes("oi") || message.includes("olá")) {
    speak("Olá Sara Raquel, em que posso ser útil?");
  } else if (message.includes("jogar") || message.includes("akinator")) {
    startGame();
  } else if (numeroSecreto !== undefined) {
    let palpite = parseInt(message, 10);
    if (!isNaN(palpite)) {
      tentativas++;
      if (palpite === numeroSecreto) {
        speak(
          `Excelente! Você adivinhou o número em ${tentativas} tentativas!`
        );
        numeroSecreto = undefined; // Reseta o jogo
      } else if (palpite < numeroSecreto) {
        speak("Muito baixo. Tente novamente.");
      } else {
        speak("Muito alto. Tente novamente.");
      }
    } else {
      speak("Por favor, diga um número entre 1 e 100.");
    }
  } else {
    // Outros comandos
    if (message.includes("abrir google")) {
      window.open("https://google.com", "_blank");
      speak("Abrindo Google...");
    } else if (message.includes("abrir youtube")) {
      window.open("https://youtube.com", "_blank");
      speak("Abrindo YouTube...");
    } else if (message.includes("abrir facebook")) {
      window.open("https://facebook.com", "_blank");
      speak("Sério que você ainda usa o Facebook?...");
    } else if (message.includes("abrir instagram")) {
      window.open("https://instagram.com", "_blank");
      speak("Abrindo Instagram...");
    } else if (message.includes("abrir twitter")) {
      window.open("https://x.com", "_blank");
      speak("Ninguém merece chamar esta obra de arte de X não é mesmo?...");
    } else if (message.includes("abrir spotify")) {
      window.open(
        "https://open.spotify.com/playlist/28aSpx8ZgdItnwJEkARSQm",
        "_blank"
      );
      speak("Seu pedido é uma ordem, abrindo Spotify...");
    } else if (
      message.includes("o que é") ||
      message.includes("quem é") ||
      message.includes("o que são")
    ) {
      window.open(
        `https://www.google.com/search?q=${message.replace(" ", "+")}`,
        "_blank"
      );
      const finalText = "Encontrei algumas coisas na internet sobre " + message;
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
      const finalText = "São exatamente " + time;
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
}
