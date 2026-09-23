/* =========================================
   VISUAL DA CENTRAL DE ATENDIMENTO
========================================= */

const canvas = document.getElementById("networkCanvas");
const ctx = canvas.getContext("2d");

let width;
let height;
let animationFrame;


/* =========================================
   CONFIGURAÇÃO
========================================= */

const config = {

    particles: 95,

    connectionDistance: 145,

    particleSpeed: 0.25,

    pulseSpeed: 0.012

};


/* =========================================
   PARTICULAS
========================================= */

let particles = [];

let pulses = [];


/* =========================================
   REDIMENSIONAR
========================================= */

function resizeCanvas() {

    const ratio = window.devicePixelRatio || 1;

    width = canvas.clientWidth;
    height = canvas.clientHeight;

    canvas.width = width * ratio;
    canvas.height = height * ratio;

    ctx.setTransform(
        ratio,
        0,
        0,
        ratio,
        0,
        0
    );

    createParticles();
}


/* =========================================
   CRIAR PARTICULAS
========================================= */

function createParticles() {

    particles = [];

    for (let i = 0; i < config.particles; i++) {

        particles.push({

            x: Math.random() * width,

            y: Math.random() * height,

            vx: (Math.random() - 0.5) *
                config.particleSpeed,

            vy: (Math.random() - 0.5) *
                config.particleSpeed,

            radius:
                Math.random() * 1.7 + 0.6,

            alpha:
                Math.random() * 0.5 + 0.25

        });

    }

}


/* =========================================
   HEADSET
========================================= */

function drawHeadset(time) {

    /*
        Centro do headset
    */

    const centerX = width * 0.68;

    const centerY = height * 0.50;

    const scale =
        Math.min(width, height) * 0.20;


    ctx.save();

    ctx.translate(centerX, centerY);


    /*
        Glow externo
    */

    ctx.shadowColor =
        "rgba(255,101,0,0.7)";

    ctx.shadowBlur = 25;


    /*
        Arco do headset
    */

    ctx.beginPath();

    ctx.arc(
        0,
        0,
        scale,
        Math.PI,
        Math.PI * 2
    );

    ctx.lineWidth = 5;

    ctx.strokeStyle =
        "rgba(255,101,0,0.9)";

    ctx.stroke();


    /*
        segundo arco
    */

    ctx.shadowBlur = 10;

    ctx.beginPath();

    ctx.arc(
        0,
        0,
        scale - 13,
        Math.PI,
        Math.PI * 2
    );

    ctx.lineWidth = 1.5;

    ctx.strokeStyle =
        "rgba(255,145,70,0.35)";

    ctx.stroke();


    /*
        lado esquerdo
    */

    drawHeadphoneSide(
        -scale,
        0,
        -1
    );


    /*
        lado direito
    */

    drawHeadphoneSide(
        scale,
        0,
        1
    );


    /*
        microfone
    */

    ctx.shadowBlur = 18;

    ctx.beginPath();

    ctx.moveTo(
        scale + 16,
        42
    );

    ctx.bezierCurveTo(
        scale + 55,
        45,
        scale + 60,
        75,
        scale + 32,
        82
    );

    ctx.strokeStyle =
        "rgba(255,101,0,0.95)";

    ctx.lineWidth = 5;

    ctx.lineCap = "round";

    ctx.stroke();


    /*
        ponta do microfone
    */

    ctx.beginPath();

    ctx.arc(
        scale + 28,
        82,
        5,
        0,
        Math.PI * 2
    );

    ctx.fillStyle =
        "#ff6500";

    ctx.fill();


    /*
        pequenas ondas de comunicação
    */

    const wave =
        Math.sin(time * 0.002) * 4;


    ctx.shadowBlur = 15;

    ctx.beginPath();

    ctx.arc(
        scale + 38,
        80,
        17 + wave,
        -Math.PI / 2,
        Math.PI / 2
    );

    ctx.strokeStyle =
        "rgba(255,101,0,0.4)";

    ctx.lineWidth = 1.5;

    ctx.stroke();


    ctx.beginPath();

    ctx.arc(
        scale + 38,
        80,
        27 + wave,
        -Math.PI / 2,
        Math.PI / 2
    );

    ctx.strokeStyle =
        "rgba(255,101,0,0.18)";

    ctx.stroke();


    ctx.restore();

}


/* =========================================
   LATERAIS DO HEADSET
========================================= */

function drawHeadphoneSide(x, y, direction) {

    const size =
        Math.min(width, height) * 0.20;


    ctx.save();

    ctx.translate(x, y);


    /*
        concha
    */

    ctx.beginPath();

    ctx.roundRect(
        direction * -14,
        -15,
        28,
        65,
        12
    );

    ctx.fillStyle =
        "rgba(255,101,0,0.12)";

    ctx.fill();

    ctx.strokeStyle =
        "rgba(255,101,0,0.85)";

    ctx.lineWidth = 4;

    ctx.stroke();


    /*
        detalhe interno
    */

    ctx.beginPath();

    ctx.roundRect(
        direction * -7,
        -5,
        14,
        45,
        7
    );

    ctx.strokeStyle =
        "rgba(255,145,70,0.3)";

    ctx.lineWidth = 1;

    ctx.stroke();


    ctx.restore();

}


/* =========================================
   PARTICULAS
========================================= */

function updateParticles() {

    particles.forEach(p => {

        p.x += p.vx;
        p.y += p.vy;


        /*
            limites
        */

        if (p.x < 0 || p.x > width) {
            p.vx *= -1;
        }

        if (p.y < 0 || p.y > height) {
            p.vy *= -1;
        }

    });

}


/* =========================================
   CONEXÕES
========================================= */

function drawConnections() {

    for (let i = 0; i < particles.length; i++) {

        for (
            let j = i + 1;
            j < particles.length;
            j++
        ) {

            const a = particles[i];

            const b = particles[j];


            const dx = a.x - b.x;

            const dy = a.y - b.y;

            const distance =
                Math.sqrt(
                    dx * dx +
                    dy * dy
                );


            if (
                distance <
                config.connectionDistance
            ) {

                const opacity =
                    (1 -
                        distance /
                        config.connectionDistance
                    ) * 0.22;


                ctx.beginPath();

                ctx.moveTo(
                    a.x,
                    a.y
                );

                ctx.lineTo(
                    b.x,
                    b.y
                );


                ctx.strokeStyle =
                    `rgba(255,101,0,${opacity})`;

                ctx.lineWidth = 0.7;

                ctx.stroke();

            }

        }

    }

}


/* =========================================
   DESENHAR PARTICULAS
========================================= */

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
            `rgba(255,130,45,${p.alpha})`;

        ctx.fill();

    });

}


/* =========================================
   NÓS DE ATENDIMENTO
========================================= */

function drawNodes(time) {

    const centerX = width * 0.68;

    const centerY = height * 0.50;


    /*
        posições dos nós
    */

    const nodes = [

        {
            x: centerX - 210,
            y: centerY - 130,
            label: "CLIENTE"
        },

        {
            x: centerX + 220,
            y: centerY - 120,
            label: "ATENDIMENTO"
        },

        {
            x: centerX - 230,
            y: centerY + 140,
            label: "PROCEDIMENTO"
        },

        {
            x: centerX + 220,
            y: centerY + 150,
            label: "SOLUÇÃO"
        }

    ];


    nodes.forEach((node, index) => {

        /*
            linha até o centro
        */

        ctx.beginPath();

        ctx.moveTo(
            node.x,
            node.y
        );

        ctx.lineTo(
            centerX,
            centerY
        );

        ctx.strokeStyle =
            "rgba(255,101,0,0.18)";

        ctx.lineWidth = 1;

        ctx.stroke();


        /*
            pulso
        */

        const pulse =
            (Math.sin(
                time * 0.002 +
                index
            ) + 1) / 2;


        ctx.beginPath();

        ctx.arc(
            node.x,
            node.y,
            4 + pulse * 3,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
            "#ff6500";

        ctx.shadowColor =
            "#ff6500";

        ctx.shadowBlur =
            10 + pulse * 10;

        ctx.fill();

        ctx.shadowBlur = 0;


        /*
            label
        */

        ctx.font =
            "700 9px Nunito";

        ctx.fillStyle =
            "rgba(255,255,255,0.35)";

        ctx.textAlign = "center";

        ctx.fillText(
            node.label,
            node.x,
            node.y + 22
        );

    });

}


/* =========================================
   ANIMAÇÃO
========================================= */

function animate(time) {

    ctx.clearRect(
        0,
        0,
        width,
        height
    );


    updateParticles();


    drawConnections();

    drawParticles();

    drawNodes(time);

    drawHeadset(time);


    animationFrame =
        requestAnimationFrame(animate);

}


/* =========================================
   INICIALIZAÇÃO
========================================= */

window.addEventListener(
    "resize",
    resizeCanvas
);


resizeCanvas();

animate(0);


/* =========================================
   MOSTRAR / ESCONDER SENHA
========================================= */

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
            isPassword
                ? "text"
                : "password";


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


/* =========================================
   LOGIN
========================================= */

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
    async (event) => {

        event.preventDefault();


        const username =
            document
                .getElementById("username")
                .value
                .trim();


        const password =
            passwordInput
                .value;


        if (!username || !password) {

            loginMessage.textContent =
                "Preencha usuário e senha.";

            return;

        }


        /*
            Estado carregando
        */

        loginMessage.textContent = "";

        loginButton.disabled = true;

        buttonText.classList.add(
            "hidden"
        );

        buttonLoader.classList.remove(
            "hidden"
        );


        /*
            Simulação temporária.

            Aqui vamos conectar
            o Supabase depois.
        */

        await new Promise(
            resolve =>
                setTimeout(
                    resolve,
                    1000
                )
        );


        loginButton.disabled = false;

        buttonText.classList.remove(
            "hidden"
        );

        buttonLoader.classList.add(
            "hidden"
        );


        loginMessage.textContent =
            "Login ainda não conectado ao Supabase.";

    }
);
