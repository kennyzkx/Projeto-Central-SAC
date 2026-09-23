/* =========================================================
   CENTRAL SAC ALCANS
   VISUAL + LOGIN
========================================================= */


/* =========================================================
   CANVAS
========================================================= */

const canvas = document.getElementById("networkCanvas");

const ctx = canvas.getContext("2d");

let width;
let height;

let animationFrame;


/* =========================================================
   CONFIGURAÇÕES
========================================================= */

const config = {

    // Quantidade de pontos da rede
    particles: 95,

    // Distância máxima entre pontos conectados
    connectionDistance: 145,

    // Velocidade dos pontos
    particleSpeed: 0.25

};


/* =========================================================
   PARTICULAS
========================================================= */

let particles = [];


/* =========================================================
   REDIMENSIONAR CANVAS
========================================================= */

function resizeCanvas() {

    const ratio =
        window.devicePixelRatio || 1;

    width =
        canvas.clientWidth;

    height =
        canvas.clientHeight;


    canvas.width =
        width * ratio;

    canvas.height =
        height * ratio;


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


/* =========================================================
   CRIAR PARTICULAS
========================================================= */

function createParticles() {

    particles = [];


    for (
        let i = 0;
        i < config.particles;
        i++
    ) {

        particles.push({

            x:
                Math.random() * width,

            y:
                Math.random() * height,

            vx:
                (Math.random() - 0.5) *
                config.particleSpeed,

            vy:
                (Math.random() - 0.5) *
                config.particleSpeed,

            radius:
                Math.random() * 1.7 + 0.6,

            alpha:
                Math.random() * 0.45 + 0.2

        });

    }

}


/* =========================================================
   ATUALIZAR PARTICULAS
========================================================= */

function updateParticles() {

    particles.forEach(
        particle => {

            particle.x +=
                particle.vx;

            particle.y +=
                particle.vy;


            /*
                Rebater nas bordas
            */

            if (
                particle.x < 0 ||
                particle.x > width
            ) {

                particle.vx *= -1;

            }


            if (
                particle.y < 0 ||
                particle.y > height
            ) {

                particle.vy *= -1;

            }

        }
    );

}


/* =========================================================
   DESENHAR CONEXÕES
========================================================= */

function drawConnections() {

    for (
        let i = 0;
        i < particles.length;
        i++
    ) {

        for (
            let j = i + 1;
            j < particles.length;
            j++
        ) {

            const a =
                particles[i];

            const b =
                particles[j];


            const dx =
                a.x - b.x;

            const dy =
                a.y - b.y;


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
                    (
                        1 -
                        distance /
                        config.connectionDistance
                    ) * 0.20;


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
                    `rgba(255,255,255,${opacity})`;


                ctx.lineWidth =
                    0.7;


                ctx.stroke();

            }

        }

    }

}


/* =========================================================
   DESENHAR PARTICULAS
========================================================= */

function drawParticles() {

    particles.forEach(
        particle => {

            ctx.beginPath();


            ctx.arc(
                particle.x,
                particle.y,
                particle.radius,
                0,
                Math.PI * 2
            );


            ctx.fillStyle =
                `rgba(255,255,255,${particle.alpha})`;


            ctx.fill();

        }
    );

}


/* =========================================================
   HEADSET
========================================================= */

function drawHeadset(time) {

    /*
        Centro do headset
    */

    const centerX =
        width * 0.68;

    const centerY =
        height * 0.50;


    /*
        Tamanho proporcional
    */

    const scale =
        Math.min(
            width,
            height
        ) * 0.20;


    ctx.save();


    ctx.translate(
        centerX,
        centerY
    );


    /* =====================================================
       GLOW ESCURO
    ===================================================== */

    ctx.shadowColor =
        "rgba(0,0,0,0.75)";

    ctx.shadowBlur =
        35;


    /* =====================================================
       ARCO PRINCIPAL PRETO
    ===================================================== */

    ctx.beginPath();


    ctx.arc(
        0,
        0,
        scale,
        Math.PI,
        Math.PI * 2
    );


    ctx.lineWidth =
        13;


    ctx.strokeStyle =
        "#111111";


    ctx.stroke();


    /* =====================================================
       CONTORNO BRANCO
    ===================================================== */

    ctx.shadowColor =
        "rgba(255,255,255,0.45)";

    ctx.shadowBlur =
        8;


    ctx.beginPath();


    ctx.arc(
        0,
        0,
        scale,
        Math.PI,
        Math.PI * 2
    );


    ctx.lineWidth =
        3;


    ctx.strokeStyle =
        "rgba(255,255,255,0.9)";


    ctx.stroke();


    /* =====================================================
       LINHA LARANJA INTERNA
    ===================================================== */

    ctx.shadowColor =
        "#ff6500";

    ctx.shadowBlur =
        12;


    ctx.beginPath();


    ctx.arc(
        0,
        0,
        scale - 7,
        Math.PI,
        Math.PI * 2
    );


    ctx.lineWidth =
        2;


    ctx.strokeStyle =
        "#ff6500";


    ctx.stroke();


    /* =====================================================
       FONE ESQUERDO
    ===================================================== */

    drawHeadphoneSide(
        -scale,
        0,
        -1
    );


    /* =====================================================
       FONE DIREITO
    ===================================================== */

    drawHeadphoneSide(
        scale,
        0,
        1
    );


    /* =====================================================
       MICROFONE — CORPO
    ===================================================== */

    ctx.shadowColor =
        "rgba(0,0,0,0.85)";

    ctx.shadowBlur =
        15;


    ctx.beginPath();


    ctx.moveTo(
        scale + 13,
        40
    );


    ctx.bezierCurveTo(
        scale + 48,
        43,
        scale + 56,
        68,
        scale + 30,
        82
    );


    ctx.strokeStyle =
        "#111111";


    ctx.lineWidth =
        11;


    ctx.lineCap =
        "round";


    ctx.stroke();


    /* =====================================================
       MICROFONE — CONTORNO
    ===================================================== */

    ctx.shadowColor =
        "rgba(255,255,255,0.4)";

    ctx.shadowBlur =
        8;


    ctx.beginPath();


    ctx.moveTo(
        scale + 13,
        40
    );


    ctx.bezierCurveTo(
        scale + 48,
        43,
        scale + 56,
        68,
        scale + 30,
        82
    );


    ctx.strokeStyle =
        "rgba(255,255,255,0.85)";


    ctx.lineWidth =
        3;


    ctx.stroke();


    /* =====================================================
       PONTA DO MICROFONE
    ===================================================== */

    ctx.shadowColor =
        "#ff6500";

    ctx.shadowBlur =
        22;


    ctx.beginPath();


    ctx.arc(
        scale + 28,
        82,
        6,
        0,
        Math.PI * 2
    );


    ctx.fillStyle =
        "#ff6500";


    ctx.fill();


    /* =====================================================
       ONDAS DE COMUNICAÇÃO
    ===================================================== */

    const wave =
        Math.sin(
            time * 0.002
        ) * 4;


    ctx.shadowColor =
        "#ff6500";

    ctx.shadowBlur =
        10;


    /*
        Onda 1
    */

    ctx.beginPath();


    ctx.arc(
        scale + 38,
        80,
        18 + wave,
        -Math.PI / 2,
        Math.PI / 2
    );


    ctx.strokeStyle =
        "rgba(255,255,255,0.9)";


    ctx.lineWidth =
        2;


    ctx.stroke();


    /*
        Onda 2
    */

    ctx.beginPath();


    ctx.arc(
        scale + 38,
        80,
        29 + wave,
        -Math.PI / 2,
        Math.PI / 2
    );


    ctx.strokeStyle =
        "rgba(255,255,255,0.45)";


    ctx.lineWidth =
        1.5;


    ctx.stroke();


    /* =====================================================
       PONTO CENTRAL
    ===================================================== */

    ctx.shadowColor =
        "#ff6500";

    ctx.shadowBlur =
        25;


    ctx.beginPath();


    ctx.arc(
        0,
        0,
        5,
        0,
        Math.PI * 2
    );


    ctx.fillStyle =
        "#ff6500";


    ctx.fill();


    ctx.restore();

}


/* =========================================================
   FONES LATERAIS
========================================================= */

function drawHeadphoneSide(
    x,
    y,
    direction
) {

    ctx.save();


    ctx.translate(
        x,
        y
    );


    /* =====================================================
       CORPO PRETO
    ===================================================== */

    ctx.shadowColor =
        "rgba(0,0,0,0.8)";

    ctx.shadowBlur =
        20;


    ctx.beginPath();


    ctx.roundRect(
        direction * -16,
        -17,
        32,
        68,
        13
    );


    ctx.fillStyle =
        "#111111";


    ctx.fill();


    /* =====================================================
       BORDA BRANCA
    ===================================================== */

    ctx.shadowColor =
        "rgba(255,255,255,0.4)";

    ctx.shadowBlur =
        8;


    ctx.strokeStyle =
        "rgba(255,255,255,0.9)";


    ctx.lineWidth =
        2.5;


    ctx.stroke();


    /* =====================================================
       DETALHE INTERNO LARANJA
    ===================================================== */

    ctx.shadowColor =
        "#ff6500";

    ctx.shadowBlur =
        12;


    ctx.beginPath();


    ctx.roundRect(
        direction * -8,
        -6,
        16,
        46,
        7
    );


    ctx.fillStyle =
        "rgba(255,101,0,0.4)";


    ctx.fill();


    ctx.strokeStyle =
        "#ff6500";


    ctx.lineWidth =
        1.5;


    ctx.stroke();


    /* =====================================================
       LED
    ===================================================== */

    ctx.beginPath();


    ctx.arc(
        0,
        28,
        2.5,
        0,
        Math.PI * 2
    );


    ctx.fillStyle =
        "#ff6500";


    ctx.fill();


    ctx.restore();

}


/* =========================================================
   NÓS DE ATENDIMENTO
========================================================= */

function drawNodes(time) {

    const centerX =
        width * 0.68;

    const centerY =
        height * 0.50;


    /*
        Nós da Central
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


    nodes.forEach(
        (node, index) => {

            /* =============================================
               LINHA ATÉ O HEADSET
            ============================================= */

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
                "rgba(255,255,255,0.28)";


            ctx.lineWidth =
                1;


            ctx.stroke();


            /* =============================================
               PULSO
            ============================================= */

            const pulse =
                (
                    Math.sin(
                        time * 0.002 +
                        index
                    ) + 1
                ) / 2;


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
                12 + pulse * 12;


            ctx.fill();


            ctx.shadowBlur = 0;


            /* =============================================
               LABEL
            ============================================= */

            ctx.font =
                "800 9px Nunito";


            ctx.fillStyle =
                "rgba(255,255,255,0.7)";


            ctx.textAlign =
                "center";


            ctx.fillText(
                node.label,
                node.x,
                node.y + 22
            );

        }
    );

}


/* =========================================================
   ANIMAÇÃO
========================================================= */

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
        requestAnimationFrame(
            animate
        );

}


/* =========================================================
   INICIAR CANVAS
========================================================= */

window.addEventListener(
    "resize",
    resizeCanvas
);


resizeCanvas();


animate(0);


/* =========================================================
   MOSTRAR / ESCONDER SENHA
========================================================= */

const passwordInput =
    document.getElementById(
        "password"
    );


const togglePassword =
    document.getElementById(
        "togglePassword"
    );


const eyeOpen =
    document.getElementById(
        "eyeOpen"
    );


const eyeClosed =
    document.getElementById(
        "eyeClosed"
    );


togglePassword.addEventListener(
    "click",
    () => {

        const isPassword =
            passwordInput.type ===
            "password";


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


/* =========================================================
   LOGIN
========================================================= */

const loginForm =
    document.getElementById(
        "loginForm"
    );


const loginButton =
    document.getElementById(
        "loginButton"
    );


const buttonText =
    document.getElementById(
        "buttonText"
    );


const buttonLoader =
    document.getElementById(
        "buttonLoader"
    );


const loginMessage =
    document.getElementById(
        "loginMessage"
    );


loginForm.addEventListener(
    "submit",
    async event => {

        event.preventDefault();


        const username =
            document
                .getElementById(
                    "username"
                )
                .value
                .trim();


        const password =
            passwordInput.value;


        /* =============================================
           VALIDAÇÃO
        ============================================= */

        if (
            !username ||
            !password
        ) {

            loginMessage.textContent =
                "Preencha usuário e senha.";

            return;

        }


        /* =============================================
           LOADING
        ============================================= */

        loginMessage.textContent =
            "";


        loginButton.disabled =
            true;


        buttonText.classList.add(
            "hidden"
        );


        buttonLoader.classList.remove(
            "hidden"
        );


        /* =============================================
           SIMULAÇÃO TEMPORÁRIA
           
           Depois vamos substituir
           isso pelo Supabase Auth.
        ============================================= */

        await new Promise(
            resolve => {

                setTimeout(
                    resolve,
                    1000
                );

            }
        );


        /* =============================================
           FINALIZAR LOADING
        ============================================= */

        loginButton.disabled =
            false;


        buttonText.classList.remove(
            "hidden"
        );


        buttonLoader.classList.add(
            "hidden"
        );


        /* =============================================
           MENSAGEM TEMPORÁRIA
        ============================================= */

        loginMessage.textContent =
            "Login ainda não conectado ao Supabase.";

    }
);
