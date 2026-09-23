/* ==========================================
   CENTRAL SAC ALCANS
   Globo + rede de conexões
========================================== */

const canvas = document.getElementById("networkCanvas");
const ctx = canvas.getContext("2d");

let particles = [];

const particleCount = 65;
const connectionDistance = 155;


/* ==========================================
   AJUSTAR CANVAS
========================================== */

function resizeCanvas() {

    const ratio = window.devicePixelRatio || 1;

    canvas.width = canvas.clientWidth * ratio;
    canvas.height = canvas.clientHeight * ratio;

    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
}

resizeCanvas();

window.addEventListener("resize", () => {

    resizeCanvas();

    createParticles();

});


/* ==========================================
   PARTÍCULAS
========================================== */

function createParticles() {

    particles = [];

    for (let i = 0; i < particleCount; i++) {

        particles.push({

            x: Math.random() * canvas.clientWidth,

            y: Math.random() * canvas.clientHeight,

            vx: (Math.random() - 0.5) * 0.22,

            vy: (Math.random() - 0.5) * 0.22,

            radius: Math.random() * 1.4 + 0.6

        });

    }
}


createParticles();


/* ==========================================
   ATUALIZAR PARTÍCULAS
========================================== */

function updateParticles() {

    particles.forEach(p => {

        p.x += p.vx;
        p.y += p.vy;


        if (p.x < 0) {
            p.x = canvas.clientWidth;
        }

        if (p.x > canvas.clientWidth) {
            p.x = 0;
        }

        if (p.y < 0) {
            p.y = canvas.clientHeight;
        }

        if (p.y > canvas.clientHeight) {
            p.y = 0;
        }

    });
}


/* ==========================================
   CONEXÕES
========================================== */

function drawConnections() {

    for (let i = 0; i < particles.length; i++) {

        for (let j = i + 1; j < particles.length; j++) {

            const a = particles[i];
            const b = particles[j];

            const dx = a.x - b.x;
            const dy = a.y - b.y;

            const distance = Math.sqrt(
                dx * dx + dy * dy
            );


            if (distance < connectionDistance) {

                const opacity =
                    (1 - distance / connectionDistance) * 0.22;

                ctx.beginPath();

                ctx.moveTo(a.x, a.y);

                ctx.lineTo(b.x, b.y);

                ctx.strokeStyle =
                    `rgba(255,255,255,${opacity})`;

                ctx.lineWidth = 0.7;

                ctx.stroke();
            }

        }

    }
}


/* ==========================================
   PARTÍCULAS
========================================== */

function drawParticles() {

    particles.forEach(p => {

        ctx.beginPath();

        ctx.arc(
            p.x,
            p.y,
            p.radius,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
            "rgba(255,255,255,0.45)";

        ctx.fill();

    });
}


/* ==========================================
   GLOBO CENTRAL
========================================== */

function drawGlobe(time) {

    const centerX = canvas.clientWidth * 0.72;
    const centerY = canvas.clientHeight * 0.51;

    const radius = Math.min(
        canvas.clientWidth,
        canvas.clientHeight
    ) * 0.105;


    /* brilho atrás do globo */

    const glow = ctx.createRadialGradient(
        centerX,
        centerY,
        radius * 0.3,
        centerX,
        centerY,
        radius * 2.4
    );

    glow.addColorStop(
        0,
        "rgba(255,255,255,0.12)"
    );

    glow.addColorStop(
        1,
        "rgba(255,255,255,0)"
    );


    ctx.beginPath();

    ctx.arc(
        centerX,
        centerY,
        radius * 2.4,
        0,
        Math.PI * 2
    );

    ctx.fillStyle = glow;

    ctx.fill();


    /* esfera */

    ctx.beginPath();

    ctx.arc(
        centerX,
        centerY,
        radius,
        0,
        Math.PI * 2
    );

    ctx.fillStyle =
        "rgba(110,38,0,0.30)";

    ctx.fill();


    ctx.strokeStyle =
        "rgba(255,255,255,0.75)";

    ctx.lineWidth = 1.4;

    ctx.stroke();


    /* latitude */

    ctx.save();

    ctx.beginPath();

    ctx.arc(
        centerX,
        centerY,
        radius * 0.52,
        0,
        Math.PI * 2
    );

    ctx.strokeStyle =
        "rgba(255,255,255,0.40)";

    ctx.lineWidth = 0.8;

    ctx.stroke();


    /* longitude */

    ctx.beginPath();

    ctx.ellipse(
        centerX,
        centerY,
        radius * 0.42,
        radius,
        0,
        0,
        Math.PI * 2
    );

    ctx.strokeStyle =
        "rgba(255,255,255,0.40)";

    ctx.stroke();


    ctx.beginPath();

    ctx.ellipse(
        centerX,
        centerY,
        radius * 0.78,
        radius,
        0,
        0,
        Math.PI * 2
    );

    ctx.strokeStyle =
        "rgba(255,255,255,0.25)";

    ctx.stroke();

    ctx.restore();


    /* linhas horizontais */

    ctx.beginPath();

    ctx.moveTo(
        centerX - radius,
        centerY
    );

    ctx.lineTo(
        centerX + radius,
        centerY
    );

    ctx.strokeStyle =
        "rgba(255,255,255,0.35)";

    ctx.lineWidth = 0.8;

    ctx.stroke();


    /* ponto pulsante */

    const pulse =
        Math.sin(time * 0.003) * 2 + 4;

    ctx.beginPath();

    ctx.arc(
        centerX,
        centerY,
        pulse,
        0,
        Math.PI * 2
    );

    ctx.fillStyle =
        "rgba(255,255,255,0.75)";

    ctx.fill();
}


/* ==========================================
   CONEXÕES DO GLOBO
========================================== */

function drawGlobeConnections(time) {

    const centerX = canvas.clientWidth * 0.72;
    const centerY = canvas.clientHeight * 0.51;

    const radius = Math.min(
        canvas.clientWidth,
        canvas.clientHeight
    ) * 0.105;


    const points = [

        {
            x: centerX - radius * 2.8,
            y: centerY - radius * 1.3,
            label: "CLIENTE"
        },

        {
            x: centerX + radius * 2.7,
            y: centerY - radius * 1.1,
            label: "ATENDIMENTO"
        },

        {
            x: centerX - radius * 2.5,
            y: centerY + radius * 1.6,
            label: "PROCEDIMENTO"
        },

        {
            x: centerX + radius * 2.5,
            y: centerY + radius * 1.5,
            label: "SOLUÇÃO"
        }

    ];


    points.forEach((point, index) => {

        const wave =
            Math.sin(time * 0.002 + index) * 0.15 + 0.85;


        /* linha */

        ctx.beginPath();

        ctx.moveTo(
            centerX,
            centerY
        );

        ctx.lineTo(
            point.x,
            point.y
        );

        ctx.strokeStyle =
            `rgba(255,255,255,${0.13 * wave})`;

        ctx.lineWidth = 1;

        ctx.stroke();


        /* pequeno ponto */

        ctx.beginPath();

        ctx.arc(
            point.x,
            point.y,
            3,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
            `rgba(255,255,255,${0.65 * wave})`;

        ctx.fill();


        /* etiqueta */

        ctx.font =
            "700 9px Nunito";

        ctx.fillStyle =
            `rgba(255,255,255,${0.55 * wave})`;

        ctx.textAlign = "center";

        ctx.fillText(
            point.label,
            point.x,
            point.y - 10
        );

    });
}


/* ==========================================
   ANIMAÇÃO
========================================== */

function animate(time) {

    ctx.clearRect(
        0,
        0,
        canvas.clientWidth,
        canvas.clientHeight
    );


    updateParticles();

    drawConnections();

    drawParticles();

    drawGlobeConnections(time);

    drawGlobe(time);


    requestAnimationFrame(animate);
}


requestAnimationFrame(animate);


/* ==========================================
   MOSTRAR / ESCONDER SENHA
========================================== */

const passwordInput =
    document.getElementById("password");

const togglePassword =
    document.getElementById("togglePassword");

const eyeOpen =
    document.getElementById("eyeOpen");

const eyeClosed =
    document.getElementById("eyeClosed");


togglePassword.addEventListener(
    "click",
    () => {

        const isPassword =
            passwordInput.type === "password";


        passwordInput.type =
            isPassword ? "text" : "password";


        eyeOpen.classList.toggle(
            "hidden",
            isPassword
        );

        eyeClosed.classList.toggle(
            "hidden",
            !isPassword
        );

    }
);


/* ==========================================
   LOGIN
========================================== */

const loginForm =
    document.getElementById("loginForm");

const loginButton =
    document.getElementById("loginButton");

const buttonText =
    document.getElementById("buttonText");

const buttonLoader =
    document.getElementById("buttonLoader");

const loginMessage =
    document.getElementById("loginMessage");


loginForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        const username =
            document
                .getElementById("username")
                .value
                .trim();


        const password =
            document
                .getElementById("password")
                .value
                .trim();


        loginMessage.textContent = "";


        if (!username || !password) {

            loginMessage.textContent =
                "Preencha o usuário e a senha.";

            return;
        }


        buttonText.classList.add("hidden");

        buttonLoader.classList.remove("hidden");

        loginButton.disabled = true;


        setTimeout(() => {

            buttonText.classList.remove("hidden");

            buttonLoader.classList.add("hidden");

            loginButton.disabled = false;


            loginMessage.textContent =
                "Login ainda não conectado ao Supabase.";

        }, 1000);

    }
);
