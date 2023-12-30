import * as THREE from "three";

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
let rotacionAcumulada;
let vecesPresionadaU = 0;

const start = Date.now();
let uPressed = false;
let camera, scene, renderer;
let controls;
let pivot;
let wlu;
let wlc;
let wld;

let wcu;
let wcc;
let wcd;

let wru;
let wrc;
let wrd;


let rlu;
let rlc;
let rld;

let rcu;
let rcc;
let rcd;

let rru;
let rrc;
let rrd;



let glu;
let glc;
let gld;

let gcu;
let gcc;
let gcd;

let gru;
let grc;
let grd;

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
    camera.position.set(15,15,15);

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




    wlu = generarCubo(0,pos,-pos);
    wlc = generarCubo(0,0,-pos);
    wld = generarCubo(0,-pos,-pos);
    wcu = generarCubo(0,pos,0);

    wcc = generarCubo(pos,0,0);

    wcd = generarCubo(0,-pos,0);
    wru = generarCubo(0,pos,pos);
    wrc = generarCubo(0,0,pos);
    wrd = generarCubo(0,-pos,pos);

    wcc.add(wlu);
    wcc.add(wlc);
    wcc.add(wld);
    wcc.add(wcu);
    wcc.add(wcd);
    wcc.add(wru);
    wcc.add(wrc);
    wcc.add(wrd);


    rlu = generarCubo(0,pos,-pos);
    rlc = generarCubo(0,0,-pos);
    rld = generarCubo(0,-pos,-pos);
    rcu = generarCubo(0,pos,0);
    rcc = generarCubo(0,0,0);
    rcd = generarCubo(0,-pos,0);
    rru = generarCubo(0,pos,pos);
    rrc = generarCubo(0,0,pos);
    rrd = generarCubo(0,-pos,pos);

    glu = generarCubo(-pos,pos,-pos);
    glc = generarCubo(-pos,0,-pos);
    gld = generarCubo(-pos,-pos,-pos);
    gcu = generarCubo(-pos,pos,0);
    gcc = generarCubo(-pos,0,0);
    gcd = generarCubo(-pos,-pos,0);
    gru = generarCubo(-pos,pos,pos);
    grc = generarCubo(-pos,0,pos);
    grd = generarCubo(-pos,-pos,pos);







    document.addEventListener('keydown', (event) => {
        if ((event.key === 'u' || event.key === 'U')) {
            rotacionAcumulada = 0;
            rotacion();  // Llama a la función que realiza la rotación
        }
    });


    controls = new OrbitControls( camera, renderer.domElement );
    //controls.autoRotate = true;
    controls.dynamicDampingFactor = 0.1; // Valores más bajos generan un desplazamiento más prolongado
    controls.dampingFactor = 0.01;

    document.body.appendChild( renderer.domElement );
    window.addEventListener( 'resize', onWindowResize , false);


    document.addEventListener('keydown', function(event) {
        if (event.key === 'u') {
            vecesPresionadaU++;
        }
    });
}



function rotacion(){
    const timer = Date.now() - start;
    if (rotacionAcumulada < Math.PI/2){
        wcc.rotation.x += 0.05;
        rotacionAcumulada += 0.05;
        requestAnimationFrame(() => rotacion());
    } else {
        wcc.rotation.x = (vecesPresionadaU % 4)*Math.PI/2
        rotacionAcumulada = 0;
    }
}
function generarCubo(posX, posY, posZ, colorRubik){
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