const script = [{
    type: "command",
    prompt: "[~]$ ",
    text: "sudo yum update -y"
}, {
    type: "instant",
    text: "System packages updated."
}, {
    type: "command",
    prompt: "[~]$ ",
    text: "sudo yum install -y git npm nodejs"
}, {
    type: "instant",
    text: "Git, npm, and Node.js installed."
}, {
    type: "command",
    prompt: "[~]$ ",
    text: "git clone https://github.com/LiF-Lee"
}, {
    type: "progress",
    text: "Cloning into 'LiF-Lee'..."
}, {
    type: "instant",
    text: "Repository cloned successfully."
}, {
    type: "command",
    prompt: "[~]$ ",
    text: "cd LiF-Lee"
}, {
    type: "command",
    prompt: "[LiF-Lee]$ ",
    text: "npm install"
}, {
    type: "progress",
    text: "Installing dependencies..."
}, {
    type: "command",
    prompt: "[LiF-Lee]$ ",
    text: "npm start"
}, {
    type: "instant",
    text: "Project started. Listening on port 3000."
}];

const outputDiv = document.getElementById('output');
const promptSpan = document.getElementById('promptSpan');
const currentLine = document.getElementById('currentLine');
let currentScriptIndex = 0;

function appendOutputNoFade(text) {
    const newLine = document.createElement("div");
    newLine.className = "line";
    newLine.textContent = text;
    outputDiv.appendChild(newLine);
    outputDiv.scrollTop = outputDiv.scrollHeight;
}

function appendOutputFade(text) {
    const newLine = document.createElement("div");
    newLine.className = "line fade";
    newLine.textContent = text;
    outputDiv.appendChild(newLine);
    outputDiv.scrollTop = outputDiv.scrollHeight;
}

function processScript() {
    if (currentScriptIndex >= script.length) {
        document.getElementById('inputLine').style.display = 'none';
        const greetingContainer = document.createElement("div");
        greetingContainer.id = "greetingContainer";
        greetingContainer.innerHTML = `<span id="greetingText"></span>`;
        outputDiv.appendChild(greetingContainer);
        outputDiv.scrollTop = outputDiv.scrollHeight;
        setTimeout(typeGreetings, 500);
        return;
    }
    const lineObj = script[currentScriptIndex];
    if (lineObj.type === "command") {
        typeCommandLine(lineObj, () => {
            currentScriptIndex++;
            setTimeout(processScript, 500);
        });
    } else if (lineObj.type === "instant") {
        appendOutputFade(lineObj.text);
        setTimeout(() => {
            currentScriptIndex++;
            processScript();
        }, 500);
    } else if (lineObj.type === "progress") {
        progressLine(lineObj, () => {
            currentScriptIndex++;
            setTimeout(processScript, 500);
        });
    }
}

function typeCommandLine(lineObj, callback) {
    let promptText = lineObj.prompt;
    promptSpan.textContent = "";
    currentLine.textContent = "";
    promptSpan.textContent = promptText;
    let charIndex = 0;

    function typeChar() {
        if (charIndex < lineObj.text.length) {
            currentLine.textContent += lineObj.text.charAt(charIndex);
            charIndex++;
            setTimeout(typeChar, 80);
        } else {
            appendOutputNoFade(promptSpan.textContent + currentLine.textContent);
            promptSpan.textContent = "";
            currentLine.textContent = "";
            callback();
        }
    }
    typeChar();
}

function progressLine(lineObj, callback) {
    currentLine.classList.add("fade");
    currentLine.textContent = lineObj.text + " ";
    let progress = 0;

    function updateProgress() {
        if (progress <= 100) {
            currentLine.textContent = lineObj.text + " [" + progress + "%]";
            progress += 5;
            setTimeout(updateProgress, 100);
        } else {
            currentLine.classList.remove("fade");
            appendOutputNoFade(currentLine.textContent);
            currentLine.textContent = "";
            callback();
        }
    }
    updateProgress();
}

function typeGreetings() {
    const greetings = ['Hello, LiF', '안녕, 리프', '你好, LiF', 'こんにちは, LiF', 'Hola, LiF', 'Bonjour, LiF', 'Olá, LiF', 'Ciao, LiF', 'Привет, LiF'];
    const greetingTextEl = document.getElementById("greetingText");
    let greetingIndex = 0;

    function typeText(text, callback) {
        greetingTextEl.textContent = "";
        let charIndex = 0;

        function typeChar() {
            if (charIndex < text.length) {
                greetingTextEl.textContent += text.charAt(charIndex);
                charIndex++;
                setTimeout(typeChar, 100);
            } else {
                setTimeout(callback, 1500);
            }
        }
        typeChar();
    }

    function eraseText(callback) {
        function eraseChar() {
            if (greetingTextEl.textContent.length > 0) {
                greetingTextEl.textContent = greetingTextEl.textContent.slice(0, -1);
                setTimeout(eraseChar, 50);
            } else {
                callback();
            }
        }
        eraseChar();
    }

    function nextGreeting() {
        const currentGreeting = greetings[greetingIndex];
        typeText(currentGreeting, () => {
            eraseText(() => {
                greetingIndex = (greetingIndex + 1) % greetings.length;
                nextGreeting();
            });
        });
    }
    nextGreeting();
}

setTimeout(processScript, 500);

const container3D = document.getElementById("crtContainer");
document.addEventListener("mousemove", (e) => {
    const x = e.clientX / window.innerWidth - 0.5;
    const y = e.clientY / window.innerHeight - 0.5;
    const rotateX = -y * 25;
    const rotateY = x * 20;
    container3D.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
});