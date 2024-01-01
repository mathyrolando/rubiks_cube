import * as THREE from "three";

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

let camera, scene, renderer;
let controls;

let concha;
const cubos = [];
const actionQueue = []
let isRotating = false;

init();
animate();

function inicializarBtnMezclar(){
    document.getElementById('btnMezclar').addEventListener('click', function() {
        mezclar();
    });
}

function inicializarBotonesControl(){
    document.getElementById('btnUp').addEventListener('click', function() {
        enviarTecla('u');
    });
    document.getElementById('btnDown').addEventListener('click', function() {
        enviarTecla('d');
    });
    document.getElementById('btnFront').addEventListener('click', function() {
        enviarTecla('f');
    });
    document.getElementById('btnBack').addEventListener('click', function() {
        enviarTecla('b');
    });
    document.getElementById('btnRight').addEventListener('click', function() {
        enviarTecla('r');
    });
    document.getElementById('btnLeft').addEventListener('click', function() {
        enviarTecla('l');
    });

}


function init(){
    const WIDTH = window.innerWidth;
    const HEIGHT = window.innerHeight;
    camera = new THREE.PerspectiveCamera(
        70,
        WIDTH / HEIGHT,
        1,
        1000
    );
    camera.position.set(3,3,5);

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xDFDFDF);

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

    inicializarBtnMezclar();
    inicializarBotonesControl();

    const pos = 1.05;

    const rbu = generarCubo(pos,pos,-pos);
    const rb  = generarCubo(pos,0,-pos);
    const rbd = generarCubo(pos,-pos,-pos);
    const ru  = generarCubo(pos,pos,0);
    const r   = generarCubo(pos,0,0);
    const rd  = generarCubo(pos,-pos,0);
    const rfu = generarCubo(pos,pos,pos);
    const rf  = generarCubo(pos,0,pos);
    const rfd = generarCubo(pos,-pos,pos);
    const bu  = generarCubo(0,pos,-pos);
    const b   = generarCubo(0,0,-pos);
    const bd  = generarCubo(0,-pos,-pos);
    const u   = generarCubo(0,pos,0);
    const d   = generarCubo(0,-pos,0);
    const fu  = generarCubo(0,pos,pos);
    const f   = generarCubo(0,0,pos);
    const fd  = generarCubo(0,-pos,pos);
    const lbu = generarCubo(-pos,pos,-pos);
    const lb  = generarCubo(-pos,0,-pos);
    const lbd = generarCubo(-pos,-pos,-pos);
    const lu  = generarCubo(-pos,pos,0);
    const l   = generarCubo(-pos,0,0);
    const ld  = generarCubo(-pos,-pos,0);
    const lfu = generarCubo(-pos,pos,pos);
    const lf  = generarCubo(-pos,0,pos);
    const lfd = generarCubo(-pos,-pos,pos);

    cubos.push(rbu, rb, rbd, ru, r, rd, rfu, rf, rfd, bu, b, bd, u, d, fu, f, fd, lbu, lb, lbd, lu, l, ld, lfu, lf, lfd);

    document.addEventListener('keydown', (event) => {
        enviarTecla(event.key);
    })


    controls = new OrbitControls( camera, renderer.domElement );
    //controls.autoRotate = true;
    controls.dynamicDampingFactor = 0.1; // Valores más bajos generan un desplazamiento más prolongado
    controls.dampingFactor = 0.01;

    document.body.appendChild( renderer.domElement );
    window.addEventListener( 'resize', onWindowResize , false);
}

function enviarTecla(modo){
    const chkAntihorario = document.getElementById('chkAntihorario');
    if (chkAntihorario.checked){
        if (modo === modo.toUpperCase()){
            modo = modo.toLowerCase();
        }else{
            modo = modo.toUpperCase();
        }
    }

    const letras = ['u', 'U', 'd', 'D', 'l', 'L', 'r', 'R', 'f', 'F', 'b', 'B'];
    if (letras.includes(modo)){
        if (!isRotating){
            teclas(modo);
        } else{
            actionQueue.push(modo);
        }

    }
}

function teclas(modo){
    concha = 0;
    if (isRotating) return;
    isRotating = true;
    switch (modo){
        case 'u':
            rotateUp(getUp());
            break;
        case 'd':
            rotateDown(getDown());
            break;
        case 'l':
            rotateLeft(getLeft());
            break;
        case 'r':
            console.log("llamo a rotateRight")
            rotateRight(getRight());
            console.log("sigo en rotateright")
            break;
        case 'f':
            rotateFront(getFront());
            break;
        case 'b':
            rotateBack(getBack());
            break;
        case 'U':
            rotateDown(getUp());
            break;
        case 'D':
            rotateUp(getDown());
            break;
        case 'L':
            rotateRight(getLeft());
            break;
        case 'R':
            rotateLeft(getRight());
            break;
        case 'F':
            rotateBack(getFront());
            break;
        case 'B':
            rotateFront(getBack());
            break;
    }
}

function teclasQuick(modo){
    concha = 0;
    if (isRotating) return;
    isRotating = true;
    switch (modo){
        case 'u':
            rotateUpQuick(getUp());
            break;
        case 'd':
            rotateDownQuick(getDown());
            break;
        case 'l':
            rotateLeftQuick(getLeft());
            break;
        case 'r':
            console.log("llamo a rotateRight")
            rotateRightQuick(getRight());
            console.log("sigo en rotateright")
            break;
        case 'f':
            rotateFrontQuick(getFront());
            break;
        case 'b':
            rotateBackQuick(getBack());
            break;
        case 'U':
            rotateDownQuick(getUp());
            break;
        case 'D':
            rotateUpQuick(getDown());
            break;
        case 'L':
            rotateRightQuick(getLeft());
            break;
        case 'R':
            rotateLeftQuick(getRight());
            break;
        case 'F':
            rotateBackQuick(getFront());
            break;
        case 'B':
            rotateFrontQuick(getBack());
            break;
    }
}
function mezclar(){
    const letras = ['u', 'U', 'd', 'D', 'l', 'L', 'r', 'R', 'f', 'F', 'b', 'B'];
    for (let i = 0; i < 20; i++){
        const randomElement = elegirRandom(letras);

        if (!isRotating){
            teclasQuick(randomElement);
        } else{
            actionQueue.push(randomElement);
        }
    }
}
let ultimaLetra = '';
function elegirRandom(letras){
    let randomElement = '';
    do {
        randomElement = letras[Math.floor(Math.random() * letras.length)];
        if (ultimaLetra !== '') {
            if (ultimaLetra === ultimaLetra.toUpperCase()) {
                const letraInvalida = ultimaLetra.toLowerCase();
                if (randomElement === letraInvalida) {
                    randomElement = '';
                }
            } else {
                const letraInvalida = ultimaLetra.toUpperCase();
                if (randomElement === letraInvalida) {
                    randomElement = '';
                }
            }
        }
    } while (randomElement === '')
    ultimaLetra = randomElement;
    return randomElement;
}


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

    const edges = new THREE.EdgesGeometry(geometry);
    const lineMaterial = new THREE.MeshBasicMaterial({ color: 0x000000}); // Establece el color y el grosor de las aristas
    const edgesLines = new THREE.LineSegments(edges, lineMaterial);
    const edgeVertices = edgesLines.geometry.attributes.position.array;
    const thickness = 0.05; // Define el grosor de las aristas. Ajusta este valor según tus necesidades.

    // Crear cilindros delgados para cada arista
    for (let i = 0; i < edgeVertices.length; i += 6) {
        const startPoint = new THREE.Vector3(edgeVertices[i], edgeVertices[i + 1], edgeVertices[i + 2]);
        const endPoint = new THREE.Vector3(edgeVertices[i + 3], edgeVertices[i + 4], edgeVertices[i + 5]);

        // Calcula la posición media para el cilindro
        const midPoint = new THREE.Vector3().addVectors(startPoint, endPoint).multiplyScalar(0.5);

        // Calcula la dirección y la longitud del cilindro
        const direction = new THREE.Vector3().subVectors(endPoint, startPoint);
        const length = direction.length();

        // Crea el cilindro (línea) con el grosor definido
        const cylinderGeometry = new THREE.CylinderGeometry(thickness, thickness, length, 32); // 32 es el número de segmentos del cilindro
        const cylinder = new THREE.Mesh(cylinderGeometry, lineMaterial);
        // Ajusta la posición y la orientación del cilindro
        cylinder.position.copy(midPoint);
        cylinder.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction.clone().normalize());

        cube.add(cylinder);

    }





    scene.add( cube );

    return cube;
}



function getRight(){
    const caras = [];
    for (let cubo of cubos) {
        if (cubo.position.x > 1) {
            caras.push(cubo);
        }
    }
    return caras;
}
function getLeft(){
    const caras = [];
    for (let cubo of cubos) {
        if (cubo.position.x < -1) {
            caras.push(cubo);
        }
    }
    return caras;
}
function getUp(){
    const caras = [];
    for (let cubo of cubos) {
        if (cubo.position.y > 1) {
            caras.push(cubo);
        }
    }
    return caras;
}
function getDown(){
    const caras = [];
    for (let cubo of cubos) {
        if (cubo.position.y < -1) {
            caras.push(cubo);
        }
    }
    return caras;
}
function getFront(){
    const caras = [];
    for (let cubo of cubos) {
        if (cubo.position.z > 1) {
            caras.push(cubo);
        }
    }
    return caras;
}
function getBack(){
    const caras = [];
    for (let cubo of cubos) {
        if (cubo.position.z < -1) {
            caras.push(cubo);
        }
    }
    return caras;
}


function rotateRight(cara){
    const delta = Math.PI/60;
    if (concha < 30) {
        for (let cubo of cara){
            rotarEnEjeX(cubo, -delta);
        }
        concha ++;
        requestAnimationFrame(() => rotateRight(cara));
    } else{
        isRotating = false;
        if (actionQueue.length > 0){
            const nextAction = actionQueue.shift();
            teclas(nextAction);
        }
    }

}
function rotateLeft(cara){
    const delta = Math.PI/60;
    if (concha < 30) {
        for (let cubo of cara){
            rotarEnEjeX(cubo, delta);
        }
        concha ++;
        requestAnimationFrame(() => rotateLeft(cara));
    }else {
        isRotating = false;
        if (actionQueue.length > 0) {
            const nextAction = actionQueue.shift();
            teclas(nextAction);
        }
    }
}
function rotateUp(cara){
    const delta = Math.PI/60;
    if (concha < 30) {
        for (let cubo of cara){
            rotarEnEjeY(cubo, delta);
        }
        concha ++;
        requestAnimationFrame(() => rotateUp(cara));
    }else {
        isRotating = false;
        if (actionQueue.length > 0) {
            const nextAction = actionQueue.shift();
            teclas(nextAction);
        }
    }
}
function rotateDown(cara){
    const delta = Math.PI/60;
    if (concha < 30) {
        for (let cubo of cara){
            rotarEnEjeY(cubo, -delta);
        }
        concha ++;
        requestAnimationFrame(() => rotateDown(cara));
    }else {
        isRotating = false;
        if (actionQueue.length > 0) {
            const nextAction = actionQueue.shift();
            teclas(nextAction);
        }
    }
}
function rotateFront(cara){
    const delta = Math.PI/60;
    if (concha < 30) {
        for (let cubo of cara){
            rotarEnEjeZ(cubo, -delta);
        }
        concha ++;
        requestAnimationFrame(() => rotateFront(cara));
    }else {
        isRotating = false;
        if (actionQueue.length > 0) {
            const nextAction = actionQueue.shift();
            teclas(nextAction);
        }
    }
}
function rotateBack(cara){
    const delta = Math.PI/60;
    if (concha < 30) {
        for (let cubo of cara){
            rotarEnEjeZ(cubo, delta);
        }
        concha ++;
        requestAnimationFrame(() => rotateBack(cara));
    }else {
        isRotating = false;
        if (actionQueue.length > 0) {
            const nextAction = actionQueue.shift();
            teclas(nextAction);
        }
    }
}



function rotateRightQuick(cara){
    const delta = Math.PI/30;
    if (concha < 15) {
        for (let cubo of cara){
            rotarEnEjeX(cubo, -delta);
        }
        concha ++;
        requestAnimationFrame(() => rotateRightQuick(cara));
    } else{
        isRotating = false;
        if (actionQueue.length > 0){
            const nextAction = actionQueue.shift();
            teclasQuick(nextAction);
        }
    }

}
function rotateLeftQuick(cara){
    const delta = Math.PI/30;
    if (concha < 15) {
        for (let cubo of cara){
            rotarEnEjeX(cubo, delta);
        }
        concha ++;
        requestAnimationFrame(() => rotateLeftQuick(cara));
    }else {
        isRotating = false;
        if (actionQueue.length > 0) {
            const nextAction = actionQueue.shift();
            teclasQuick(nextAction);
        }
    }
}
function rotateUpQuick(cara){
    const delta = Math.PI/30;
    if (concha < 15) {
        for (let cubo of cara){
            rotarEnEjeY(cubo, delta);
        }
        concha ++;
        requestAnimationFrame(() => rotateUpQuick(cara));
    }else {
        isRotating = false;
        if (actionQueue.length > 0) {
            const nextAction = actionQueue.shift();
            teclasQuick(nextAction);
        }
    }
}
function rotateDownQuick(cara){
    const delta = Math.PI/30;
    if (concha < 15) {
        for (let cubo of cara){
            rotarEnEjeY(cubo, -delta);
        }
        concha ++;
        requestAnimationFrame(() => rotateDownQuick(cara));
    }else {
        isRotating = false;
        if (actionQueue.length > 0) {
            const nextAction = actionQueue.shift();
            teclasQuick(nextAction);
        }
    }
}
function rotateFrontQuick(cara){
    const delta = Math.PI/30;
    if (concha < 15) {
        for (let cubo of cara){
            rotarEnEjeZ(cubo, -delta);
        }
        concha ++;
        requestAnimationFrame(() => rotateFrontQuick(cara));
    }else {
        isRotating = false;
        if (actionQueue.length > 0) {
            const nextAction = actionQueue.shift();
            teclasQuick(nextAction);
        }
    }
}
function rotateBackQuick(cara){
    const delta = Math.PI/30;
    if (concha < 15) {
        for (let cubo of cara){
            rotarEnEjeZ(cubo, delta);
        }
        concha ++;
        requestAnimationFrame(() => rotateBackQuick(cara));
    }else {
        isRotating = false;
        if (actionQueue.length > 0) {
            const nextAction = actionQueue.shift();
            teclasQuick(nextAction);
        }
    }
}


function rotarEnEjeX(cubo, theta) {
    cubo.position.set(
        cubo.position.x,
        cubo.position.y * Math.cos(theta) - cubo.position.z * Math.sin(theta),
        cubo.position.y * Math.sin(theta) + cubo.position.z * Math.cos(theta));
    cubo.rotateOnWorldAxis(new THREE.Vector3(1,0,0),theta)
}

function rotarEnEjeY(cubo, theta) {
    console.log("rotarEnEjeY");
    cubo.position.set(
        cubo.position.x * Math.cos(theta) - cubo.position.z * Math.sin(theta),
        cubo.position.y,
        cubo.position.x * Math.sin(theta) + cubo.position.z * Math.cos(theta));
    cubo.rotateOnWorldAxis(new THREE.Vector3(0,1,0),-theta)
}
function rotarEnEjeZ(cubo, theta) {
    cubo.position.set(
        cubo.position.x * Math.cos(theta) - cubo.position.y * Math.sin(theta),
        cubo.position.x * Math.sin(theta) + cubo.position.y * Math.cos(theta),
        cubo.position.z);
    cubo.rotateOnWorldAxis(new THREE.Vector3(0,0,1),theta)
}



function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}

function animate(){
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
