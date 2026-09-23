/* ==========================================
   CENTRAL SAC ALCANS
   CONSTELAÇÕES
========================================== */


const canvas =
    document.getElementById("networkCanvas");

const ctx =
    canvas.getContext("2d");


let particles = [];


const particleCount = 95;

const connectionDistance = 145;


/* ==========================================
   TAMANHO DO CANVAS
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
   CRIAR CONSTELAÇÕES
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
                * 0.25,

            vy:
                (Math.random() - 0.5)
                * 0.25,

            radius:
                Math.random() *
                1.5 +
                0.5

        });

    }
}


createParticles();


/* ==========================================
   MOVIMENTO
========================================== */

function updateParticles() {

    particles.forEach(
        particle => {

            particle.x +=
                particle.vx;


            particle.y +=
                particle.vy;


            if (
                particle.x < 0
            ) {

                particle.x =
                    canvas.clientWidth;
            }


            if (
                particle.x >
                canvas.clientWidth
            ) {

                particle.x = 0;
            }


            if (
                particle.y < 0
            ) {

                particle.y =
                    canvas.clientHeight;
            }


            if (
                particle.y >
                canvas.clientHeight
            ) {

                particle.y = 0;
            }

        }
    );
}


/* ==========================================
   LINHAS DAS CONSTELAÇÕES
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
   PONTOS DAS CONSTELAÇÕES
========================================== */

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
                "rgba(255,255,255,0.55)";


            ctx.fill();

        }
    );
}


/* ==========================================
   ANIMAÇÃO
========================================== */

function animate() {

    ctx.clearRect(
        0,
        0,
        canvas.clientWidth,
        canvas.clientHeight
    );


    updateParticles();


    drawConnections();


    drawParticles();


    requestAnimationFrame(
        animate
    );
}


animate();


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


        if (
            !username ||
            !password
        ) {

            loginMessage.textContent =
                "Preencha o usuário e a senha.";

            return;
        }


        buttonText.classList.add(
            "hidden"
        );


        buttonLoader.classList.remove(
            "hidden"
        );


        loginButton.disabled =
            true;


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
