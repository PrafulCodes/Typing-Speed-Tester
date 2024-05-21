const paragraphs = [
    "Compound interest is a powerful financial concept that can help investments grow exponentially. Before the 20th century, economists like Albert Einstein and Warren Buffett were only beginning to understand its potential. The first rule of compound interest is to start early, as even small investments can add up over time. Those who fail to take advantage of compound interest are missing out on a key opportunity for financial growth.",
    "The history of artificial intelligence dates back to the 1950s, when computer scientists like Alan Turing and Marvin Minsky first proposed the idea of machines that could think and learn like humans. Today, AI is a rapidly growing field with applications in everything from healthcare to finance. Few can name a industry that hasn't been transformed by AI in some way. The future of AI holds much promise, but also raises important ethical questions about bias and accountability.",
    "In modern times, the field of quantum physics has led to numerous breakthroughs in our understanding of the universe. From the discovery of subatomic particles to the development of quantum computers, scientists like Richard Feynman and Stephen Hawking have pushed the boundaries of human knowledge. A recorder is a grade from the right perspective, and the study of quantum physics requires a deep understanding of mathematical concepts like wave functions and probability amplitudes.",
    "What we don't know for sure is whether or not the next major breakthrough in science will come from the field of biotechnology. The literature would have us believe that gene editing tools like CRISPR are not but a revolution in the making. Few can name a disease that hasn't been impacted by advances in biotechnology. The bow is a mitten, and the study of biotechnology requires a deep understanding of genetic code and molecular biology.",
    "An algorithm is a bassoon from the right perspective. As far as we can estimate, some posit the melic myanmar to be less than kutcha. One cannot separate foods from blowzy bows. The scampish closet reveals itself as a sclerous llama to those who look. A hip is the skirt of a peak, and the study of algorithms requires a deep understanding of computational complexity and data structures.",
    "A programming language is a shingle from the right perspective. Before defenses, collars were only operations. Bails are gleesome relatives, and a fighter of the scarecrow is assumed to be a leisured laundry. A stamp can hardly be considered a peddling payment without also being a crocodile, and the study of programming languages requires a deep understanding of syntax and semantics.",
    "A broadband jam is a network of the mind. One cannot separate chickens from glowing periods, and a production is a faucet from the right perspective. The lines could be said to resemble zincoid females, and a deborah is a tractor's whale. Cod are elite japans, and some posit the wig like norwegian to be less than plashy.",
    "In recent years, some teeming herons are thought of simply as numbers. Nowhere is it disputed that an unpaid fur is a marble of the mind, and far from the truth, few can name a glossy lier that isn't an ingrate bone. The chicken is a giraffe, and they were lost without the abscessed leek that composed their fowl.",
    "A cough is a talk from the right perspective, and a designed tractor's tray comes with it the thought that the snuffly flax is a rainbow. Their health was, in this moment, an earthy passbook, and this could be, or perhaps the swordfishes could be said to resemble healthy sessions. A capricorn is a helium from the right perspective, and the study of computer science requires a deep understanding of algorithms and data structures.",
];
const typingText = document.querySelector(".typing-text p");
const inpField = document.querySelector(".wrapper .input-field");
const tryAgainBtn = document.querySelector(".content button");
const timeTag = document.querySelector(".time span b");
const mistakeTag = document.querySelector(".mistake span");
const wpmTag = document.querySelector(".wpm span");
const cpmTag = document.querySelector(".cpm span");
const notification = document.querySelector(".notification");
const notificationMessage = document.querySelector(".notification-message");
const closeBtn = document.querySelector(".notification .close-btn");
const countdown = document.getElementById("countdown");
let timer;
let maxTime = 60;
let timeLeft = maxTime;
let charIndex = mistakes = isTyping = 0;
let countdownTimer;
function loadParagraph() {
    const ranIndex = Math.floor(Math.random() * paragraphs.length);
    typingText.innerHTML = "";
    paragraphs[ranIndex].split("").forEach(char => {
        let span = document.createElement("span");
        span.textContent = char;
        typingText.appendChild(span);
    });
    typingText.querySelectorAll("span")[0].classList.add("active");
    document.addEventListener("keydown", () => inpField.focus());
    typingText.addEventListener("click", () => inpField.focus());
}
function initTyping() {
    const characters = typingText.querySelectorAll("span");
    const typedChar = inpField.value.split("")[charIndex];

    if (charIndex < characters.length && timeLeft > 0) {
        if (!isTyping) {
            timer = setInterval(initTimer, 1000);
            isTyping = true;
        }

        if (typedChar == null) {
            if (charIndex > 0) {
                charIndex--;
                if (characters[charIndex].classList.contains("incorrect")) {
                    mistakes--;
                }
                characters[charIndex].classList.remove("correct", "incorrect");
            }
        } else {
            if (characters[charIndex].textContent === typedChar) {
                characters[charIndex].classList.add("correct");
            } else {
                mistakes++;
                characters[charIndex].classList.add("incorrect");
            }
            charIndex++;
        }

        characters.forEach(span => span.classList.remove("active"));
        characters[charIndex].classList.add("active");

        const wpm = Math.round(((charIndex - mistakes) / 5) / ((maxTime - timeLeft) / 60));
        wpmTag.innerText = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
        mistakeTag.innerText = mistakes;
        cpmTag.innerText = charIndex - mistakes;
    } else {
        clearInterval(timer);
        inpField.value = "";
    }
}
function initTimer() {
    if (timeLeft > 0) {
        timeLeft--;
        timeTag.innerText = timeLeft;
        const wpm = Math.round(((charIndex - mistakes) / 5) / ((maxTime - timeLeft) / 60));
        wpmTag.innerText = wpm;
    } else {
        clearInterval(timer);
        showNotification();
    }
}
function showNotification() {
    notificationMessage.innerHTML = `
        Time's up!<br>
        Words Per Minute (WPM): ${wpmTag.innerText}<br>
        Characters Per Minute (CPM): ${cpmTag.innerText}<br>
        Mistakes: ${mistakeTag.innerText}
    `;
    notification.style.display = "block";
    startCountdown();
}
function startCountdown() {
    let timeLeft = 5;
    countdown.innerText = timeLeft;
    countdownTimer = setInterval(() => {
        timeLeft--;
        countdown.innerText = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(countdownTimer);
            resetGame();
        }
    }, 1000);
}
function closeNotification() {
    clearInterval(countdownTimer);
    notification.style.display = "none";
    resetGame();
}
function resetGame() {
    loadParagraph();
    clearInterval(timer);
    timeLeft = maxTime;
    charIndex = mistakes = isTyping = 0;
    inpField.value = "";
    timeTag.innerText = timeLeft;
    wpmTag.innerText = 0;
    mistakeTag.innerText = 0;
    cpmTag.innerText = 0;
    notification.style.display = "none";
}
loadParagraph();
inpField.addEventListener("input", initTyping);
tryAgainBtn.addEventListener("click", resetGame);
closeBtn.addEventListener("click", closeNotification);