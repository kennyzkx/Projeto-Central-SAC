/* ==========================================
   CENTRAL SAC ALCANS
   GLOBO + REDE DE CONEXÕES
========================================== */


const canvas =
    document.getElementById("networkCanvas");

const ctx =
    canvas.getContext("2d");


let particles = [];


const particleCount = 65;

const connectionDistance = 155;


/* ==========================================
   CONFIGURAÇÃO DO CANVAS
========================================== */

function resizeCanvas() {

    const ratio =
        window.devicePixelRatio || 1;


    canvas.width =
        canvas.clientWidth * ratio;


    canvas.height =
        canvas.clientHeight * ratio;


    ctx.setTransform(
        ratio,
        0,
        0,
        ratio,
        0,
        0
    );
}


resizeCanvas();


window.addEventListener(
    "resize",
    () => {

        resizeCanvas();

        createParticles();

    }
);


/* ==========================================
   CRIAR PARTÍCULAS
========================================== */

function createParticles() {

    particles = [];


    for (
        let i = 0;
        i < particleCount;
        i++
    ) {

        particles.push({

            x:
                Math.random() *
                canvas.clientWidth,

            y:
                Math.random() *
                canvas.clientHeight,

            vx:
                (Math.random() - 0.5)
                * 0.22,

            vy:
                (Math.random() - 0.5)
                * 0.22,

            radius:
                Math.random() *
                1.4 +
                0.6

        });

    }
}


createParticles();


/* ==========================================
   MOVIMENTO
========================================== */

function updateParticles() {

    particles.forEach(
        p => {

            p.x += p.vx;

            p.y += p.vy;


            if (
                p.x < 0
            ) {

                p.x =
                    canvas.clientWidth;
            }


            if (
                p.x >
                canvas.clientWidth
            ) {

                p.x = 0;
            }


            if (
                p.y < 0
            ) {

                p.y =
                    canvas.clientHeight;
            }


            if (
                p.y >
                canvas.clientHeight
            ) {

                p.y = 0;
            }

        }
    );
}


/* ==========================================
   CONEXÕES DA REDE
========================================== */

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
                connectionDistance
            ) {

                const opacity =
                    (
                        1 -
                        distance /
                        connectionDistance
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
                    `rgba(
                        255,
                        255,
                        255,
                        ${opacity}
                    )`;


                ctx.lineWidth =
                    0.7;


                ctx.stroke();

            }

        }

    }
}


/* ==========================================
   PARTÍCULAS
========================================== */

function drawParticles() {

    particles.forEach(
        p => {

            ctx.beginPath();


            ctx.arc(
                p.x,
                p.y,
                p.radius,
                0,
                Math.PI * 2
            );


            ctx.fillStyle =
                "rgba(255,255,255,0.42)";


            ctx.fill();

        }
    );
}


/* ==========================================
   POSIÇÃO DO GLOBO
========================================== */

function getGlobePosition() {

    return {

        x:
            canvas.clientWidth * 0.70,

        y:
            canvas.clientHeight * 0.52

    };
}


/* ==========================================
   GLOBO
========================================== */

function drawGlobe(time) {

    const position =
        getGlobePosition();


    const centerX =
        position.x;

    const centerY =
        position.y;


    /*
        Globo pequeno,
        mas claramente visível.
    */

    const radius = 65;


    /* =====================================
       BRILHO EXTERNO
    ====================================== */

    const glow =
        ctx.createRadialGradient(
            centerX,
            centerY,
            radius * 0.3,
            centerX,
            centerY,
            radius * 2.2
        );


    glow.addColorStop(
        0,
        "rgba(255,255,255,0.15)"
    );


    glow.addColorStop(
        0.5,
        "rgba(255,255,255,0.05)"
    );


    glow.addColorStop(
        1,
        "rgba(255,255,255,0)"
    );


    ctx.beginPath();


    ctx.arc(
        centerX,
        centerY,
        radius * 2.2,
        0,
        Math.PI * 2
    );


    ctx.fillStyle =
        glow;


    ctx.fill();


    /* =====================================
       ESFERA
    ====================================== */

    ctx.beginPath();


    ctx.arc(
        centerX,
        centerY,
        radius,
        0,
        Math.PI * 2
    );


    ctx.fillStyle =
        "rgba(88,28,0,0.42)";


    ctx.fill();


    ctx.strokeStyle =
        "rgba(255,255,255,0.88)";


    ctx.lineWidth = 2;


    ctx.stroke();


    /* =====================================
       LINHA EQUATORIAL
    ====================================== */

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
        "rgba(255,255,255,0.48)";


    ctx.lineWidth = 1;


    ctx.stroke();


    /* =====================================
       LATITUDE SUPERIOR
    ====================================== */

    ctx.beginPath();


    ctx.ellipse(
        centerX,
        centerY,
        radius,
        radius * 0.38,
        0,
        0,
        Math.PI * 2
    );


    ctx.strokeStyle =
        "rgba(255,255,255,0.55)";


    ctx.lineWidth = 1;


    ctx.stroke();


    /* =====================================
       LATITUDE INFERIOR
    ====================================== */

    ctx.beginPath();


    ctx.ellipse(
        centerX,
        centerY,
        radius,
        radius * 0.70,
        0,
        0,
        Math.PI * 2
    );


    ctx.strokeStyle =
        "rgba(255,255,255,0.28)";


    ctx.stroke();


    /* =====================================
       LONGITUDE CENTRAL
    ====================================== */

    ctx.beginPath();


    ctx.ellipse(
        centerX,
        centerY,
        radius * 0.38,
        radius,
        0,
        0,
        Math.PI * 2
    );


    ctx.strokeStyle =
        "rgba(255,255,255,0.55)";


    ctx.stroke();


    /* =====================================
       LONGITUDE LATERAL
    ====================================== */

    ctx.beginPath();


    ctx.ellipse(
        centerX,
        centerY,
        radius * 0.72,
        radius,
        0,
        0,
        Math.PI * 2
    );


    ctx.strokeStyle =
        "rgba(255,255,255,0.28)";


    ctx.stroke();


    /* =====================================
       PONTO CENTRAL PULSANTE
    ====================================== */

    const pulse =
        Math.sin(
            time * 0.003
        ) * 2 + 5;


    ctx.beginPath();


    ctx.arc(
        centerX,
        centerY,
        pulse,
        0,
        Math.PI * 2
    );


    ctx.fillStyle =
        "rgba(255,255,255,0.90)";


    ctx.fill();
}


/* ==========================================
   CONEXÕES DO GLOBO
========================================== */

function drawGlobeConnections(time) {

    const position =
        getGlobePosition();


    const centerX =
        position.x;

    const centerY =
        position.y;


    const points = [

        {
            x:
                centerX - 180,

            y:
                centerY - 95,

            label:
                "CLIENTE"
        },

        {
            x:
                centerX + 180,

            y:
                centerY - 80,

            label:
                "ATENDIMENTO"
        },

        {
            x:
                centerX - 175,

            y:
                centerY + 105,

            label:
                "PROCEDIMENTO"
        },

        {
            x:
                centerX + 175,

            y:
                centerY + 100,

            label:
                "SOLUÇÃO"
        }

    ];


    points.forEach(
        (point, index) => {

            const pulse =
                Math.sin(
                    time * 0.002 +
                    index
                ) * 0.15 + 0.85;


            /* =================================
               LINHA
            ================================= */

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
                `rgba(
                    255,
                    255,
                    255,
                    ${0.20 * pulse}
                )`;


            ctx.lineWidth = 1;


            ctx.stroke();


            /* =================================
               PONTO
            ================================= */

            ctx.beginPath();


            ctx.arc(
                point.x,
                point.y,
                3,
                0,
                Math.PI * 2
            );


            ctx.fillStyle =
                `rgba(
                    255,
                    255,
                    255,
                    ${0.75 * pulse}
                )`;


            ctx.fill();


            /* =================================
               TEXTO
            ================================= */

            ctx.font =
                "700 9px Nunito";


            ctx.fillStyle =
                `rgba(
                    255,
                    255,
                    255,
                    ${0.65 * pulse}
                )`;


            ctx.textAlign =
                "center";


            ctx.fillText(
                point.label,
                point.x,
                point.y - 11
            );

        }
    );
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


    drawGlobeConnections(
        time
    );


    drawGlobe(
        time
    );


    requestAnimationFrame(
        animate
    );
}


requestAnimationFrame(
    animate
);


/* ==========================================
   MOSTRAR / ESCONDER SENHA
========================================== */

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


/* ==========================================
   LOGIN
========================================== */

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
    function (event) {

        event.preventDefault();


        const username =
            document
                .getElementById(
                    "username"
                )
                .value
                .trim();


        const password =
            document
                .getElementById(
                    "password"
                )
                .value
                .trim();


        loginMessage.textContent =
            "";


        /* =================================
           VALIDAR CAMPOS
        ================================= */

        if (
            !username ||
            !password
        ) {

            loginMessage.textContent =
                "Preencha o usuário e a senha.";

            return;
        }


        /* =================================
           LOADING
        ================================= */

        buttonText.classList.add(
            "hidden"
        );


        buttonLoader.classList.remove(
            "hidden"
        );


        loginButton.disabled =
            true;


        /* =================================
           SIMULAÇÃO
        ================================= */

        setTimeout(
            () => {

                buttonText.classList.remove(
                    "hidden"
                );


                buttonLoader.classList.add(
                    "hidden"
                );


                loginButton.disabled =
                    false;


                loginMessage.textContent =
                    "Login ainda não conectado ao Supabase.";

            },
            1000
        );

    }
);
