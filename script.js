/* =====================================================
   REDE / CONSTELAÇÕES
===================================================== */

const canvas = document.getElementById("networkCanvas");
const ctx = canvas.getContext("2d");

let particles = [];


/* =====================================================
   CONFIGURAÇÕES
===================================================== */

const networkSettings = {

    // Quanto maior, mais pontos aparecem
    density: 4000,

    // Distância máxima para criar conexões
    connectionDistance: 165,

    // Tamanho dos pontos
    minRadius: 0.7,
    maxRadius: 2.2,

    // Velocidade da movimentação
    speed: 0.30

};


/* =====================================================
   TAMANHO DO CANVAS
===================================================== */

function resizeCanvas() {

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    createParticles();
}


/* =====================================================
   CRIAR PONTOS
===================================================== */

function createParticles() {

    particles = [];

    const amount = Math.floor(
        (canvas.width * canvas.height) /
        networkSettings.density
    );

    for (let i = 0; i < amount; i++) {

        particles.push({

            x: Math.random() * canvas.width,

            y: Math.random() * canvas.height,

            vx:
                (Math.random() - 0.5) *
                networkSettings.speed,

            vy:
                (Math.random() - 0.5) *
                networkSettings.speed,

            radius:
                Math.random() *
                (
                    networkSettings.maxRadius -
                    networkSettings.minRadius
                ) +
                networkSettings.minRadius,

            // Alguns pontos brilham mais
            brightness:
                Math.random() * 0.5 + 0.5

        });

    }

}


/* =====================================================
   DESENHAR REDE
===================================================== */

function drawNetwork() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    /* ---------------------------------------------
       MOVIMENTO DOS PONTOS
    --------------------------------------------- */

    particles.forEach((particle) => {

        particle.x += particle.vx;
        particle.y += particle.vy;


        // Faz o ponto voltar para a tela
        if (particle.x < -10) {
            particle.x = canvas.width + 10;
        }

        if (particle.x > canvas.width + 10) {
            particle.x = -10;
        }

        if (particle.y < -10) {
            particle.y = canvas.height + 10;
        }

        if (particle.y > canvas.height + 10) {
            particle.y = -10;
        }

    });


    /* ---------------------------------------------
       CONEXÕES
    --------------------------------------------- */

    for (let i = 0; i < particles.length; i++) {

        const particle = particles[i];


        for (
            let j = i + 1;
            j < particles.length;
            j++
        ) {

            const other = particles[j];


            const dx =
                particle.x - other.x;

            const dy =
                particle.y - other.y;


            const distance =
                Math.sqrt(
                    dx * dx +
                    dy * dy
                );


            if (
                distance <
                networkSettings.connectionDistance
            ) {

                const opacity =
                    (
                        1 -
                        distance /
                        networkSettings.connectionDistance
                    ) * 0.38;


                ctx.beginPath();

                ctx.moveTo(
                    particle.x,
                    particle.y
                );

                ctx.lineTo(
                    other.x,
                    other.y
                );


                ctx.strokeStyle =
                    `rgba(
                        255,
                        255,
                        255,
                        ${opacity}
                    )`;


                ctx.lineWidth = 0.8;

                ctx.stroke();

            }

        }

    }


    /* ---------------------------------------------
       DESENHAR PONTOS
    --------------------------------------------- */

    particles.forEach((particle) => {

        ctx.beginPath();

        ctx.arc(
            particle.x,
            particle.y,
            particle.radius,
            0,
            Math.PI * 2
        );


        ctx.fillStyle =
            `rgba(
                255,
                255,
                255,
                ${particle.brightness}
            )`;


        ctx.fill();


        /* Pequeno brilho */

        if (particle.radius > 1.7) {

            ctx.beginPath();

            ctx.arc(
                particle.x,
                particle.y,
                particle.radius * 3.5,
                0,
                Math.PI * 2
            );


            ctx.fillStyle =
                `rgba(
                    255,
                    255,
                    255,
                    0.06
                )`;


            ctx.fill();

        }

    });


    requestAnimationFrame(drawNetwork);

}


/* =====================================================
   INICIALIZAÇÃO
===================================================== */

window.addEventListener(
    "resize",
    resizeCanvas
);


resizeCanvas();

drawNetwork();

/* =====================================================
   MOSTRAR / ESCONDER SENHA
===================================================== */

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

        const showing =
            passwordInput.type === "text";


        if (showing) {

            passwordInput.type = "password";

            eyeOpen.classList.remove("hidden");

            eyeClosed.classList.add("hidden");

            togglePassword.setAttribute(
                "aria-label",
                "Mostrar senha"
            );

        } else {

            passwordInput.type = "text";

            eyeOpen.classList.add("hidden");

            eyeClosed.classList.remove("hidden");

            togglePassword.setAttribute(
                "aria-label",
                "Ocultar senha"
            );
        }

    }
);


/* =====================================================
   LOGIN
===================================================== */

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
            document.getElementById("username").value.trim();

        const password =
            document.getElementById("password").value;


        loginMessage.textContent = "";


        if (!username || !password) {

            loginMessage.textContent =
                "Preencha usuário e senha.";

            return;
        }


        /* ESTADO DE CARREGAMENTO */

        loginButton.disabled = true;

        buttonText.classList.add("hidden");

        buttonLoader.classList.remove("hidden");


        /*
            POR ENQUANTO É APENAS UMA SIMULAÇÃO.

            NO PRÓXIMO PASSO:

            supabase.auth.signInWithPassword({
                email: username,
                password: password
            })
        */


        await new Promise(
            resolve => setTimeout(resolve, 1000)
        );


        loginButton.disabled = false;

        buttonText.classList.remove("hidden");

        buttonLoader.classList.add("hidden");


        loginMessage.textContent =
            "Autenticação do Supabase ainda não configurada.";

    }
);
    canvas.height = canvas.offsetHeight;

    createParticles();
}


function createParticles() {

    particles = [];

    const amount = Math.floor(
        (canvas.width * canvas.height) / 15000
    );

    for (let i = 0; i < amount; i++) {

        particles.push({

            x: Math.random() * canvas.width,

            y: Math.random() * canvas.height,

            vx: (Math.random() - 0.5) * 0.25,

            vy: (Math.random() - 0.5) * 0.25,

            radius: Math.random() * 1.8 + 0.7

        });
    }
}


function drawNetwork() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    particles.forEach((particle, index) => {

        particle.x += particle.vx;
        particle.y += particle.vy;


        if (particle.x < 0 || particle.x > canvas.width) {
            particle.vx *= -1;
        }

        if (particle.y < 0 || particle.y > canvas.height) {
            particle.vy *= -1;
        }


        /* PONTO */

        ctx.beginPath();

        ctx.arc(
            particle.x,
            particle.y,
            particle.radius,
            0,
            Math.PI * 2
        );

        ctx.fillStyle = "rgba(255,255,255,0.8)";

        ctx.fill();


        /* CONEXÕES */

        for (
            let j = index + 1;
            j < particles.length;
            j++
        ) {

            const other = particles[j];

            const dx = particle.x - other.x;
            const dy = particle.y - other.y;

            const distance = Math.sqrt(
                dx * dx + dy * dy
            );


            if (distance < 130) {

                const opacity =
                    1 - distance / 130;


                ctx.beginPath();

                ctx.moveTo(
                    particle.x,
                    particle.y
                );

                ctx.lineTo(
                    other.x,
                    other.y
                );

                ctx.strokeStyle =
                    `rgba(255,255,255,${opacity * 0.25})`;

                ctx.lineWidth = 0.7;

                ctx.stroke();
            }
        }

    });


    requestAnimationFrame(drawNetwork);
}


window.addEventListener(
    "resize",
    resizeCanvas
);

resizeCanvas();
drawNetwork();


/* =====================================================
   MOSTRAR / ESCONDER SENHA
===================================================== */

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

        const showing =
            passwordInput.type === "text";


        if (showing) {

            passwordInput.type = "password";

            eyeOpen.classList.remove("hidden");

            eyeClosed.classList.add("hidden");

            togglePassword.setAttribute(
                "aria-label",
                "Mostrar senha"
            );

        } else {

            passwordInput.type = "text";

            eyeOpen.classList.add("hidden");

            eyeClosed.classList.remove("hidden");

            togglePassword.setAttribute(
                "aria-label",
                "Ocultar senha"
            );
        }

    }
);


/* =====================================================
   LOGIN
===================================================== */

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
            document.getElementById("username").value.trim();

        const password =
            document.getElementById("password").value;


        loginMessage.textContent = "";


        if (!username || !password) {

            loginMessage.textContent =
                "Preencha usuário e senha.";

            return;
        }


        /* ESTADO DE CARREGAMENTO */

        loginButton.disabled = true;

        buttonText.classList.add("hidden");

        buttonLoader.classList.remove("hidden");


        /*
            POR ENQUANTO É APENAS UMA SIMULAÇÃO.

            NO PRÓXIMO PASSO:

            supabase.auth.signInWithPassword({
                email: username,
                password: password
            })
        */


        await new Promise(
            resolve => setTimeout(resolve, 1000)
        );


        loginButton.disabled = false;

        buttonText.classList.remove("hidden");

        buttonLoader.classList.add("hidden");


        loginMessage.textContent =
            "Autenticação do Supabase ainda não configurada.";

    }
);
