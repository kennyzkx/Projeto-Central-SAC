/* =====================================================
   GLOBO TECNOLÓGICO ALCANS
===================================================== */

const canvas =
    document.getElementById("networkCanvas");

const ctx =
    canvas.getContext("2d");


let width;
let height;

let globePoints = [];

let rotation = 0;



/* =====================================================
   CONFIGURAÇÕES DO GLOBO
===================================================== */

const settings = {

    /*
        Quantidade de pontos
    */

    points: 520,


    /*
        Tamanho do planeta
    */

    globeSize: 0.75,


    /*
        Distância máxima entre pontos
    */

    connectionDistance: 0.34,


    /*
        Velocidade de rotação
    */

    rotationSpeed: 0.0007

};



/* =====================================================
   AJUSTAR CANVAS
===================================================== */

function resizeCanvas() {

    width =
        canvas.width =
        canvas.offsetWidth;


    height =
        canvas.height =
        canvas.offsetHeight;


    createGlobe();

}



/* =====================================================
   CRIAR GLOBO
===================================================== */

function createGlobe() {

    globePoints = [];


    /*
        Ângulo dourado.

        Permite distribuir os pontos
        uniformemente na esfera.
    */

    const goldenAngle =
        Math.PI *
        (3 - Math.sqrt(5));


    for (
        let i = 0;
        i < settings.points;
        i++
    ) {


        /*
            Coordenada vertical
        */

        const y =
            1 -
            (
                i /
                (settings.points - 1)
            ) *
            2;


        /*
            Raio da posição
        */

        const radius =
            Math.sqrt(
                1 -
                y * y
            );


        /*
            Ângulo
        */

        const theta =
            goldenAngle * i;


        /*
            Coordenadas 3D
        */

        const x =
            Math.cos(theta) *
            radius;


        const z =
            Math.sin(theta) *
            radius;


        globePoints.push({

            x,

            y,

            z,

            brightness:
                Math.random() *
                0.5 +
                0.5

        });

    }

}



/* =====================================================
   PROJEÇÃO 3D
===================================================== */

function projectPoint(point) {


    /*
        Rotação horizontal
    */

    const cos =
        Math.cos(rotation);


    const sin =
        Math.sin(rotation);


    const x =
        point.x * cos -
        point.z * sin;


    const z =
        point.x * sin +
        point.z * cos;



    /*
        Tamanho do globo
    */

    const radius =
        Math.min(width, height) *
        settings.globeSize;



    /*
        Perspectiva
    */

    const perspective =
        1 /
        (
            1.8 -
            z * 0.55
        );



    return {

        x:
            width * 0.48 +
            x *
            radius *
            perspective,


        y:
            height * 0.50 +
            point.y *
            radius *
            perspective,


        z,


        scale:
            perspective

    };

}



/* =====================================================
   DESENHAR GLOBO
===================================================== */

function drawGlobe() {


    /*
        Limpar tela
    */

    ctx.clearRect(
        0,
        0,
        width,
        height
    );



    /* =================================================
       BRILHO DO GLOBO
    ================================================= */

    const glow =
        ctx.createRadialGradient(

            width * 0.48,

            height * 0.50,

            20,

            width * 0.48,

            height * 0.50,

            Math.min(
                width,
                height
            ) * 0.46

        );



    glow.addColorStop(
        0,
        "rgba(255,90,0,0.14)"
    );


    glow.addColorStop(
        0.45,
        "rgba(255,70,0,0.05)"
    );


    glow.addColorStop(
        1,
        "rgba(255,50,0,0)"
    );



    ctx.fillStyle = glow;



    ctx.beginPath();


    ctx.arc(

        width * 0.48,

        height * 0.50,

        Math.min(
            width,
            height
        ) * 0.46,

        0,

        Math.PI * 2

    );


    ctx.fill();



    /* =================================================
       PROJETAR PONTOS
    ================================================= */

    const projected =
        globePoints.map(
            point => ({

                original:
                    point,

                projected:
                    projectPoint(point)

            })
        );



    /*
        Organizar por profundidade
    */

    projected.sort(
        (a, b) =>
            a.projected.z -
            b.projected.z
    );



    /* =================================================
       CONEXÕES
    ================================================= */

    for (
        let i = 0;
        i < projected.length;
        i++
    ) {


        const a =
            projected[i];



        for (
            let j = i + 1;
            j < projected.length;
            j++
        ) {


            const b =
                projected[j];



            const dx =
                a.original.x -
                b.original.x;


            const dy =
                a.original.y -
                b.original.y;


            const dz =
                a.original.z -
                b.original.z;



            const distance =
                Math.sqrt(
                    dx * dx +
                    dy * dy +
                    dz * dz
                );



            if (
                distance <
                settings.connectionDistance
            ) {


                /*
                    Profundidade

                    Pontos da parte traseira
                    ficam mais discretos.
                */

                const depth =
                    Math.max(
                        0,
                        (
                            a.projected.z +
                            1
                        ) / 2
                    );



                const opacity =
                    (
                        1 -
                        distance /
                        settings.connectionDistance
                    ) *
                    depth *
                    0.65;



                ctx.beginPath();



                ctx.moveTo(

                    a.projected.x,

                    a.projected.y

                );



                ctx.lineTo(

                    b.projected.x,

                    b.projected.y

                );



                ctx.strokeStyle =
                    `rgba(
                        255,
                        100,
                        20,
                        ${opacity}
                    )`;



                ctx.lineWidth =
                    0.55;



                ctx.stroke();

            }

        }

    }



    /* =================================================
       PONTOS
    ================================================= */

    projected.forEach(
        item => {


            const point =
                item.projected;



            /*
                Profundidade
            */

            const depth =
                Math.max(
                    0,
                    (
                        point.z +
                        1
                    ) / 2
                );



            /*
                Tamanho
            */

            const size =
                0.65 +
                depth * 1.7;



            /*
                Transparência
            */

            const opacity =
                0.15 +
                depth * 0.85;



            /*
                Ponto
            */

            ctx.beginPath();



            ctx.arc(

                point.x,

                point.y,

                size,

                0,

                Math.PI * 2

            );



            ctx.fillStyle =
                `rgba(
                    255,
                    ${80 + depth * 80},
                    ${20 + depth * 40},
                    ${opacity}
                )`;



            ctx.fill();



            /*
                Brilho nos pontos próximos
            */

            if (
                depth > 0.7
            ) {


                ctx.beginPath();



                ctx.arc(

                    point.x,

                    point.y,

                    size * 4,

                    0,

                    Math.PI * 2

                );



                ctx.fillStyle =
                    `rgba(
                        255,
                        80,
                        0,
                        ${0.035 * depth}
                    )`;



                ctx.fill();

            }

        }
    );



    /* =================================================
       ROTAÇÃO
    ================================================= */

    rotation +=
        settings.rotationSpeed;



    requestAnimationFrame(
        drawGlobe
    );

}



/* =====================================================
   INICIALIZAÇÃO DO GLOBO
===================================================== */

window.addEventListener(
    "resize",
    resizeCanvas
);


resizeCanvas();


drawGlobe();



/* =====================================================
   MOSTRAR / ESCONDER SENHA
===================================================== */

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


        const showing =
            passwordInput.type ===
            "text";



        if (showing) {


            passwordInput.type =
                "password";


            eyeOpen.classList.remove(
                "hidden"
            );


            eyeClosed.classList.add(
                "hidden"
            );


            togglePassword.setAttribute(
                "aria-label",
                "Mostrar senha"
            );


        } else {


            passwordInput.type =
                "text";


            eyeOpen.classList.add(
                "hidden"
            );


            eyeClosed.classList.remove(
                "hidden"
            );


            togglePassword.setAttribute(
                "aria-label",
                "Ocultar senha"
            );

        }

    }
);



/* =====================================================
   LOGIN — PREPARADO PARA SUPABASE
===================================================== */

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
            document
                .getElementById(
                    "password"
                )
                .value;



        /*
            Limpar mensagem
        */

        loginMessage.textContent =
            "";



        /*
            Validação básica
        */

        if (
            !username ||
            !password
        ) {


            loginMessage.textContent =
                "Preencha usuário e senha.";


            return;

        }



        /*
            Estado de carregamento
        */

        loginButton.disabled =
            true;


        buttonText.classList.add(
            "hidden"
        );


        buttonLoader.classList.remove(
            "hidden"
        );



        /*
            Simulação temporária.

            ESTA PARTE SERÁ SUBSTITUÍDA
            PELO SUPABASE AUTH.
        */

        await new Promise(
            resolve =>
                setTimeout(
                    resolve,
                    1000
                )
        );



        /*
            Voltar botão
        */

        loginButton.disabled =
            false;


        buttonText.classList.remove(
            "hidden"
        );


        buttonLoader.classList.add(
            "hidden"
        );



        /*
            Mensagem temporária
        */

        loginMessage.textContent =
            "Login ainda não conectado ao Supabase.";

    }
);
