window.onload = function () {
    let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');
    let image = document.getElementById('image');
    let map = document.getElementById('map');
    
    
    const audio = new Audio('./assets/sounds/narkaman.mp3');
    const audio2 = new Audio('./assets/sounds/switch.mp3');
    let time = 0;
    let galinha = new Image()
    galinha.src = './assets/images/galinhafoda.png'
    galinha.position = {
        x: 50,
        y: 50,
    }
    galinha.size = {
        width: 100,
        height: 100,
    }
    let galinha2 = {
        position: {
            x: 650,
            y: 307,
        },
        size: {
            width: 1,
            height: 1,
        },
    }

    let galinha3 = {
        position: {
            x: -75,
            y: 575,
            initialY: 575,
        },
        size: {
            width: 100,
            height: 100,
        },
        subindo: true,
        speed: 4,
        jumpSize: 1,
    }


    window.changeState = function animai() {
        canvas.className += ' animate';
        image.className += ' hide';
        map.outerHTML = '';
        audio.volume = 0.05;
        audio2.play();
        audio.play();
        let interval = setInterval(() => {
            if (audio.volume > 0.9) {
                audio.volume = 1;
                clearInterval(interval)
            }

            if (audio.volume < 0.9 && time >= 1) {
                audio.volume = audio.volume + 0.05;
            }
        }, 1000);
        setInterval(() => {
            time += 0.25;
            console.log(time)
            if (time == 7 || time == 8.25 || time == 10 || time == 11) {
                const sizeIncrease = 100;
                galinha2.position.x -= sizeIncrease / 2;
                galinha2.position.y -= sizeIncrease / 2;
                galinha2.size.width += sizeIncrease;
                galinha2.size.height += sizeIncrease;
            }

            if (time == 18) {
                step = 1;
            }



            if (time >= 1) {
                audio.play();
            }
        }, 250);

        update();

        const growthRate = 2;
        let step = 0;
        setInterval(() => {
            if (time >= 1) {
                galinha2.position.x -= growthRate / 2;
                galinha2.position.y -= growthRate / 2;
                galinha2.size.width += growthRate;
                galinha2.size.height += growthRate;
            }

            if (time > 2) {
                if (galinha.position.y == 50 && galinha.position.x != 1150) {
                    galinha.position.x += 100;
                }
                else if (galinha.position.x == 1150 && galinha.position.y != 550) {
                    galinha.position.y += 100;
                }
                else if (galinha.position.y == 550 && galinha.position.x != 150) {
                    galinha.position.x -= 100;
                }
                else {
                    galinha.position.y -= 100;
                }
            }
            if (time > 26) {
                if (galinha3.subindo) {
                    galinha3.subindo = false;
                }
                else {
                    galinha3.subindo = true;
                }
            }
        }, 250)





        function update() {
            if (time < 13) {
                if (time >= 1) {
                    ctx.drawImage(galinha, galinha2.position.x, galinha2.position.y, galinha2.size.width, galinha2.size.height)
                }

                if (time > 2) {
                    ctx.drawImage(galinha, galinha.position.x, galinha.position.y, 100, 100);

                }
            }

            if (time >= 7) {
                ctx.drawImage(galinha, galinha3.position.x, galinha3.position.y, 200, 200);
            }

            if (time >= 8.25) {
                ctx.drawImage(galinha, galinha3.position.x + 100, galinha3.position.y - 200, 200, 200);
            }

            if (time >= 10) {
                ctx.drawImage(galinha, galinha3.position.x, galinha3.position.y - 400, 200, 200);
            }

            if (time >= 11) {
                ctx.drawImage(galinha, galinha3.position.x + 100, galinha3.position.y - 600, 200, 200);
            }

            if (time == 12) {

            }

            if (time >= 13) {
                if (galinha3.position.x > 1400) {
                    galinha3.position.x = -200;
                    galinha3.speed++;
                    if (galinha3.speed > 300) {
                        galinha3.speed = 2;
                        galinha3.jumpSize++;
                    }
                }
                galinha3.position.x += 2 * galinha3.speed;
                if (time > 26) {
                    if (galinha3.subindo) {
                        galinha3.position.y += galinha3.jumpSize;
                    }
                    else {
                        galinha3.position.y -= galinha3.jumpSize;
                    }
                }
            }



            setTimeout(() => {
                if (step == 0) {
                    ctx.clearRect(0, 0, 1400, 715);
                }
                update()
            }, 1);
        }

    }
}

