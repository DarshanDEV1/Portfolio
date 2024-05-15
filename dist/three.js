import * as THREE from 'three';

var camera, scene, renderer;
var mouseX = 0, mouseY = 0;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;
var group;

init();
animate();

function init() {
    try {
        camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 1, 10000);
        camera.position.z = 1000;
        scene = new THREE.Scene();
        scene.background = new THREE.Color(255, 255, 255);
        scene.fog = new THREE.Fog(0x2b2b2b, 1, 10000);

        group = new THREE.Group();

         createLetterD();
         createLetterR();
         createLetterZ();

        scene.add(group);

        initRenderer();
    } catch (error) {
        console.error('Error initializing Three.js:', error);
    }
}

function createLetterD() {
    var letterD = new THREE.Group();

    // Create left vertical part
    var geometry = new THREE.BoxGeometry(50, 200, 50);
    var material = new THREE.MeshNormalMaterial();
    var cube1 = new THREE.Mesh(geometry, material);
    cube1.position.set(-140, 0, 0);
    letterD.add(cube1);

    // Create right vertical part
    var cube2 = new THREE.Mesh(geometry, material);
    cube2.position.set(0, 0, 0);
    letterD.add(cube2);

    // Create top horizontal part
    var cube3 = new THREE.Mesh(geometry, material);
    cube3.rotation.z = Math.PI / 2;
    cube3.position.set(-100, 100, 0);
    letterD.add(cube3);

    // Create bottom horizontal part
    var cube4 = new THREE.Mesh(geometry, material);
    cube4.rotation.z = Math.PI / 2;
    cube4.position.set(-100, -100, 0);
    letterD.add(cube4);

    group.add(letterD);
}

function createLetterR() {
    var letterR = new THREE.Group();

    // Create vertical part
    var geometry = new THREE.BoxGeometry(50, 200, 50);
    var material = new THREE.MeshNormalMaterial();
    var cube0 = new THREE.Mesh(geometry, material);
    cube0.position.set(-10, 0, 0);
    letterR.add(cube0);

    var geometry_1 = new THREE.BoxGeometry(50, 100, 50);
    var material_1 = new THREE.MeshNormalMaterial();
    var cube1 = new THREE.Mesh(geometry_1, material_1);
    cube1.position.set(150, 60, 0);
    letterR.add(cube1);

    // Create top horizontal part
    var cube2 = new THREE.Mesh(geometry, material);
    cube2.rotation.z = Math.PI / 2;
    cube2.position.set(50, 100, 0);
    letterR.add(cube2);

    // Create bottom horizontal part
    var cube3 = new THREE.Mesh(geometry, material);
    cube3.rotation.z = Math.PI / 2;
    cube3.position.set(50, 0, 0);
    letterR.add(cube3);

    // Create diagonal part
    var cube4 = new THREE.Mesh(geometry, material);
    cube4.rotation.z = Math.PI / 4;
    cube4.position.set(100, -50, 0);
    letterR.add(cube4);

    group.add(letterR);
}

function createLetterZ() {
    var letterZ = new THREE.Group();

    // Create top horizontal part
    var geometry = new THREE.BoxGeometry(200, 50, 50);
    var material = new THREE.MeshNormalMaterial();
    var cube1 = new THREE.Mesh(geometry, material);
    cube1.position.set(260, 100, 0);
    letterZ.add(cube1);

    // Create bottom horizontal part
    var cube2 = new THREE.Mesh(geometry, material);
    cube2.position.set(280, -100, 0);
    letterZ.add(cube2);

    // Create diagonal part
    var cube3 = new THREE.Mesh(geometry, material);
    cube3.rotation.z = Math.PI / 3.4;
    cube3.position.set(-100+100+100+100+50, 0, 0);
    letterZ.add(cube3);

    group.add(letterZ);
}

function initRenderer() {
    try {
        renderer = new THREE.WebGLRenderer({ antialias: false });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);

        document.addEventListener('mousemove', onDocumentMouseMove, false);
        window.addEventListener('resize', onWindowResize, false);
    } catch (error) {
        console.error('Error initializing renderer:', error);
    }
}

function onWindowResize() {
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function onDocumentMouseMove(event) {
    mouseX = (event.clientX - windowHalfX) * 10;
    mouseY = (event.clientY - windowHalfY) * 10;
}

function animate() {
    try {
        requestAnimationFrame(animate);
        render();
    } catch (error) {
        console.error('Error animating:', error);
    }
}

function render() {
    if (renderer) {
        var time = Date.now() * 0.001;
        var rx = Math.sin(time * 0.7) * 0.5,
            ry = Math.sin(time * 0.3) * 0.5,
            rz = Math.sin(time * 0.2) * 0.5;
        camera.position.x += (mouseX - camera.position.x) * 0.05;
        camera.position.y += (-mouseY - camera.position.y) * 0.05;
        camera.lookAt(scene.position);
        group.rotation.x = rx;
        group.rotation.y = ry;
        group.rotation.z = rz;
        renderer.render(scene, camera);
    }
}
