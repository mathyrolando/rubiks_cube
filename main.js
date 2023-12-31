import * as THREE from "three";

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
let rotacionAcumuladaR;
let rotacionAcumuladaL;
let rotacionAcumuladaU;

let vecesPresionadaR = 0;
let vecesPresionadaL = 0;
let vecesPresionadaU = 0;



const up    = []
const down  = []
const right = []
const left  = []
const front = []
const back  = []


const start = Date.now();
let uPressed = false;
let camera, scene, renderer;
let controls;
let bu
let b
let bd
let u

let d
let fu
let f

let fd
let lbu
let lb


let rbu;
let rb;
let rbd;

let ru;
let r;
let rd;

let rfu;
let rf;
let rfd;



let lbd
let lu
let l

let ld
let lfu
let lf

let lfd

init();
animate();

function init(){
    const WIDTH = window.innerWidth;
    const HEIGHT = window.innerHeight;
    camera = new THREE.PerspectiveCamera(
        70,
        WIDTH / HEIGHT,
        1,
        1000
    );
    camera.position.set(0,15,15);

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0,0,0);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize( WIDTH, HEIGHT );
    document.body.appendChild( renderer.domElement );

    const ambientLight = new THREE.AmbientLight(
        0xffffff,
        5
    )
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(
        0xffffff,
        3,
        0,
        0
    )
    pointLight.position.set(15,15,15);
    scene.add(pointLight);

    const pointLight2 = new THREE.PointLight(
        0xffffff,
        3,
        0,
        0
    )
    pointLight2.position.set(-15,15,15);
    scene.add(pointLight2);



    //Color//Column//Row
    const pos = 1.05;

    //Right View:

    // rfu // ru // rbu
    // rf  // r  // rb
    // rfd // rd // rbd


    rbu = generarCubo(pos,pos,-pos);
    rb  = generarCubo(pos,0,-pos);
    rbd = generarCubo(pos,-pos,-pos);
    ru  = generarCubo(pos,pos,0);

    r   = generarCubo(pos,0,0);

    rd  = generarCubo(pos,-pos,0);
    rfu = generarCubo(pos,pos,pos);
    rf  = generarCubo(pos,0,pos);
    rfd = generarCubo(pos,-pos,pos);




    bu  = generarCubo(0,pos,-pos);
    b   = generarCubo(0,0,-pos);
    bd  = generarCubo(0,-pos,-pos);
    u   = generarCubo(0,pos,0);
    d   = generarCubo(0,-pos,0);
    fu  = generarCubo(0,pos,pos);
    f   = generarCubo(0,0,pos);
    fd  = generarCubo(0,-pos,pos);

    lbu = generarCubo(-pos,pos,-pos);
    lb  = generarCubo(-pos,0,-pos);
    lbd = generarCubo(-pos,-pos,-pos);
    lu  = generarCubo(-pos,pos,0);
    l   = generarCubo(-pos,0,0);
    ld  = generarCubo(-pos,-pos,0);
    lfu = generarCubo(-pos,pos,pos);
    lf  = generarCubo(-pos,0,pos);
    lfd = generarCubo(-pos,-pos,pos);

    up.push(rbu, ru, lfu, lbu, fu, u, bu, lu, rfu);
    down.push(rbd, rd, rfd, bd, d, fd, lbd, ld, lfd);
    right.push(rbu, rb, rbd, ru, r, rd, rfu, rf, rfd);
    left.push(lbu, lb, lbd, lu, l, ld, lfu, lf, lfd);
    front.push(rfu, rf, rfd, fu, f, fd, lfu, lf, lfd);
    back.push(rbu, rb, rbd, bu, b, bd, lbu, lb, lbd);


    document.addEventListener('keydown', (event) => {
        if ((event.key === 'u' || event.key === 'U')) {
            rotacionAcumuladaU = 0;
            rotacion(up);  // Llama a la función que realiza la rotación
        }
        if ((event.key === 'd' || event.key === 'D')) {
            rotacionAcumuladaR = 0;
            rotacion(down);  // Llama a la función que realiza la rotación
        }
        if ((event.key === 'l' || event.key === 'L')) {
            rotacionAcumuladaL = 0;
            rotacion(left);  // Llama a la función que realiza la rotación
        }
        if ((event.key === 'r' || event.key === 'R')) {
            rotacionAcumuladaR = 0;
            rotacion(right);  // Llama a la función que realiza la rotación
        }
        if ((event.key === 'f' || event.key === 'F')) {
            rotacionAcumuladaR = 0;
            rotacion(front);  // Llama a la función que realiza la rotación
        }
        if ((event.key === 'b' || event.key === 'B')) {
            rotacionAcumuladaR = 0;
            rotacion(back);  // Llama a la función que realiza la rotación
        }
    });


    controls = new OrbitControls( camera, renderer.domElement );
    //controls.autoRotate = true;
    controls.dynamicDampingFactor = 0.1; // Valores más bajos generan un desplazamiento más prolongado
    controls.dampingFactor = 0.01;

    document.body.appendChild( renderer.domElement );
    window.addEventListener( 'resize', onWindowResize , false);


    document.addEventListener('keydown', function(event) {
        if (event.key === 'r') {
            vecesPresionadaR++;
        }
        if (event.key === 'l') {
            vecesPresionadaL++;
        }
        if (event.key === 'u') {
            vecesPresionadaU++;
        }
    });
}


/*
function rotacion(centro){

    centro.add(rbu);
    centro.add(rb);
    centro.add(rbd);
    centro.add(ru);
    centro.add(rd);
    centro.add(rfu);
    centro.add(rf);
    centro.add(rfd);

    if (rotacionAcumuladaR < Math.PI/2){
        centro.rotation.x += 0.05;
        rotacionAcumuladaR += 0.05;
        requestAnimationFrame(() => rotacion(centro));
    } else {
        centro.rotation.x = (vecesPresionadaR % 4)*Math.PI/2
        rotacionAcumuladaR = 0;
        let pos = rbu.position.clone();
        let rot = rbu.rotation.clone();
        centro.clear();
        scene.add(
            rbu,
            rb,
            rbd,
            ru,
            rd,
            rfu,
            rf,
            rfd
        )
        rbu.position = pos;
        rbu.rotation = rot;

    }
}
 */

function generarCubo(posX, posY, posZ){
    const geometry = new THREE.BoxGeometry( 1, 1, 1 );
    const white = 0xffffff;
    const red = 0xb71234;
    const yellow = 0xffd500;
    const orange = 0xff5800;
    const blue = 0x0046ad;
    const green = 0x009b48;
    const material = [
        new THREE.MeshLambertMaterial({color:orange}),
        new THREE.MeshLambertMaterial({color:red}),
        new THREE.MeshLambertMaterial({color:white}),
        new THREE.MeshLambertMaterial({color:yellow}),
        new THREE.MeshLambertMaterial({color:blue}),
        new THREE.MeshLambertMaterial({color:green})
        ];


    const cube = new THREE.Mesh( geometry, material );
    cube.position.set(posX,posY,posZ);
    scene.add( cube );

    return cube;
}


function rotacion(cara){
    const pos = 1.05;
    const delta = Math.PI/2/30;

    const c1 = cara[0];
    const c2 = cara[1];
    const c3 = cara[2];
    const c4 = cara[3];
    const c5 = cara[4];
    const c6 = cara[5];
    const c7 = cara[6];
    const c8 = cara[7];
    const c9 = cara[8];

    if (cara === right) {
        if (rotacionAcumuladaR < Math.PI / 2) {
            rotarPuntoAlrededorOrigenR(c1, c1.position.x, c1.position.y, c1.position.z, delta)
            rotarPuntoAlrededorOrigenR(c2, c2.position.x, c2.position.y, c2.position.z, delta)
            rotarPuntoAlrededorOrigenR(c3, c3.position.x, c3.position.y, c3.position.z, delta)
            rotarPuntoAlrededorOrigenR(c4, c4.position.x, c4.position.y, c4.position.z, delta)
            rotarPuntoAlrededorOrigenR(c5, c5.position.x, c5.position.y, c5.position.z, delta)
            rotarPuntoAlrededorOrigenR(c6, c6.position.x, c6.position.y, c6.position.z, delta)
            rotarPuntoAlrededorOrigenR(c7, c7.position.x, c7.position.y, c7.position.z, delta)
            rotarPuntoAlrededorOrigenR(c8, c8.position.x, c8.position.y, c8.position.z, delta)
            rotarPuntoAlrededorOrigenR(c9, c9.position.x, c9.position.y, c9.position.z, delta)
            rotacionAcumuladaR += delta;
            requestAnimationFrame(() => rotacion(cara));
        } else {
            const theta = (vecesPresionadaR % 4) * Math.PI / 2;
            rotarPuntoAlrededorOrigenR(c1, pos, pos, -pos, theta)
            rotarPuntoAlrededorOrigenR(c2, pos, 0, -pos, theta)
            rotarPuntoAlrededorOrigenR(c3, pos, -pos, -pos, theta)
            rotarPuntoAlrededorOrigenR(c4, pos, pos, 0, theta)
            rotarPuntoAlrededorOrigenR(c5, pos, 0, 0, theta)
            rotarPuntoAlrededorOrigenR(c6, pos, -pos, 0, theta)
            rotarPuntoAlrededorOrigenR(c7, pos, pos, pos, theta)
            rotarPuntoAlrededorOrigenR(c8, pos, 0, pos, theta)
            rotarPuntoAlrededorOrigenR(c9, pos, -pos, pos, theta)

            c1.rotation.x = -theta;
            c2.rotation.x = -theta;
            c3.rotation.x = -theta;
            c4.rotation.x = -theta;
            c5.rotation.x = -theta;
            c6.rotation.x = -theta;
            c7.rotation.x = -theta;
            c8.rotation.x = -theta;
            c9.rotation.x = -theta;

            rotacionAcumuladaR = 0;

            //up
            const up1 = up.indexOf(rfu);
            const up3 = up.indexOf(ru);
            const up2 = up.indexOf(rbu);
            up[up1] = rfd;
            up[up2] = rf;
            up[up3] = rfu;

            //down
            const down1 = down.indexOf(rfd);
            const down3 = down.indexOf(rd);
            const down2 = down.indexOf(rbd);
            down[down1] = rbd;
            down[down2] = rb;
            down[down3] = rbu;

            //front
            const front1 = front.indexOf(rfu);
            const front3 = front.indexOf(rf);
            const front2 = front.indexOf(rfd);
            front[front1] = rfd;
            front[front2] = rd;
            front[front3] = rbd;

            //back
            const back1 = back.indexOf(rbu);
            const back3 = back.indexOf(rb);
            const back2 = back.indexOf(rbd);
            back[back1] = rfu;
            back[back2] = ru;
            back[back3] = rbu;


        }
    }
    if (cara === left) {
        if (rotacionAcumuladaL < Math.PI / 2) {
            rotarPuntoAlrededorOrigenL(c1, c1.position.x, c1.position.y, c1.position.z, delta)
            rotarPuntoAlrededorOrigenL(c2, c2.position.x, c2.position.y, c2.position.z, delta)
            rotarPuntoAlrededorOrigenL(c3, c3.position.x, c3.position.y, c3.position.z, delta)
            rotarPuntoAlrededorOrigenL(c4, c4.position.x, c4.position.y, c4.position.z, delta)
            rotarPuntoAlrededorOrigenL(c5, c5.position.x, c5.position.y, c5.position.z, delta)
            rotarPuntoAlrededorOrigenL(c6, c6.position.x, c6.position.y, c6.position.z, delta)
            rotarPuntoAlrededorOrigenL(c7, c7.position.x, c7.position.y, c7.position.z, delta)
            rotarPuntoAlrededorOrigenL(c8, c8.position.x, c8.position.y, c8.position.z, delta)
            rotarPuntoAlrededorOrigenL(c9, c9.position.x, c9.position.y, c9.position.z, delta)
            rotacionAcumuladaL += delta;
            requestAnimationFrame(() => rotacion(cara));
        } else {
            const theta = (vecesPresionadaL % 4) * Math.PI / 2;
            rotarPuntoAlrededorOrigenL(c1,-pos,pos,-pos, theta);
            rotarPuntoAlrededorOrigenL(c2,-pos,0,-pos, theta);
            rotarPuntoAlrededorOrigenL(c3,-pos,-pos,-pos, theta);
            rotarPuntoAlrededorOrigenL(c4,-pos,pos,0, theta);
            rotarPuntoAlrededorOrigenL(c5,-pos,0,0,theta);
            rotarPuntoAlrededorOrigenL(c6,-pos,-pos,0, theta);
            rotarPuntoAlrededorOrigenL(c7,-pos,pos,pos , theta);
            rotarPuntoAlrededorOrigenL(c8,-pos,0,pos , theta);
            rotarPuntoAlrededorOrigenL(c9,-pos,-pos,pos , theta);

            c1.rotation.x = theta;
            c2.rotation.x = theta;
            c3.rotation.x = theta;
            c4.rotation.x = theta;
            c5.rotation.x = theta;
            c6.rotation.x = theta;
            c7.rotation.x = theta;
            c8.rotation.x = theta;
            c9.rotation.x = theta;

            rotacionAcumuladaL = 0;
        }
    }
    if (cara === up) {
        if (rotacionAcumuladaU < 30) {
            rotarPuntoAlrededorOrigenU(c1, c1.position.x, c1.position.y, c1.position.z, delta)
            rotarPuntoAlrededorOrigenU(c2, c2.position.x, c2.position.y, c2.position.z, delta)
            rotarPuntoAlrededorOrigenU(c3, c3.position.x, c3.position.y, c3.position.z, delta)
            rotarPuntoAlrededorOrigenU(c4, c4.position.x, c4.position.y, c4.position.z, delta)
            rotarPuntoAlrededorOrigenU(c5, c5.position.x, c5.position.y, c5.position.z, delta)
            rotarPuntoAlrededorOrigenU(c6, c6.position.x, c6.position.y, c6.position.z, delta)
            rotarPuntoAlrededorOrigenU(c7, c7.position.x, c7.position.y, c7.position.z, delta)
            rotarPuntoAlrededorOrigenU(c8, c8.position.x, c8.position.y, c8.position.z, delta)
            rotarPuntoAlrededorOrigenU(c9, c9.position.x, c9.position.y, c9.position.z, delta)
            rotacionAcumuladaU ++;
            requestAnimationFrame(() => rotacion(cara));
        }  /*else {

            const theta = (vecesPresionadaU % 4) * Math.PI / 2;

            rotarPuntoAlrededorOrigenU(c1,pos,pos,pos, theta);
            rotarPuntoAlrededorOrigenU(c2,0,pos,pos, theta);
            rotarPuntoAlrededorOrigenU(c3,-pos,pos,-pos, theta);
            rotarPuntoAlrededorOrigenU(c4,pos,pos,-pos, theta);
            rotarPuntoAlrededorOrigenU(c5,-pos,pos,0,theta);
            rotarPuntoAlrededorOrigenU(c6,0,pos,0, theta);
            rotarPuntoAlrededorOrigenU(c7,pos,pos,0 , theta);
            rotarPuntoAlrededorOrigenU(c8,0,pos,-pos , theta);
            rotarPuntoAlrededorOrigenU(c9,-pos,pos,pos , theta);


            // Aplicar la rotación a cada objeto c1, c2, ..., c9
            c1.setRotationFromAxisAngle(new THREE.Vector3(0,1,0), -theta);
            c2.setRotationFromAxisAngle(new THREE.Vector3(0,1,0), -theta);
            c3.setRotationFromAxisAngle(new THREE.Vector3(0,1,0), -theta);
            c4.setRotationFromAxisAngle(new THREE.Vector3(0,1,0), -theta);
            c5.setRotationFromAxisAngle(new THREE.Vector3(0,1,0), -theta);
            c6.setRotationFromAxisAngle(new THREE.Vector3(0,1,0), -theta);
            c7.setRotationFromAxisAngle(new THREE.Vector3(0,1,0), -theta);
            c8.setRotationFromAxisAngle(new THREE.Vector3(0,1,0), -theta);
            c9.setRotationFromAxisAngle(new THREE.Vector3(0,1,0), -theta);



            rotacionAcumuladaU = 0;


        }
        */
    }


}

function rotarPuntoAlrededorOrigenR(cubo, x, y, z, theta) {
    cubo.position.set(
        x,
        y * Math.cos(-theta) - z * Math.sin(-theta),
        y * Math.sin(-theta) + z * Math.cos(-theta)

    );
    cubo.rotation.x -= theta;
}
function rotarPuntoAlrededorOrigenL(cubo, x, y, z, theta) {
    cubo.position.set(
        x,
        y * Math.cos(theta) - z * Math.sin(theta),
        y * Math.sin(theta) + z * Math.cos(theta));
    cubo.rotation.x += theta;
}

function rotarPuntoAlrededorOrigenU(cubo, x, y, z, theta) {
    cubo.position.set(
        x * Math.cos(theta) - z * Math.sin(theta),
        y,
        x * Math.sin(theta) + z * Math.cos(theta));
    cubo.rotateOnWorldAxis(new THREE.Vector3(0,1,0),-theta);
}


function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}

function animate(){
    requestAnimationFrame(animate);
    render();
}

function render(){
    controls.update();
    renderer.render(scene, camera);
}