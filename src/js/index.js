import * as THREE from "three";
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader }  from 'three/examples/jsm/loaders/GLTFLoader'

const glbUrl = new URL('../assets/Teashop.glb', import.meta.url);

const renderer = new THREE.WebGLRenderer({ antialias: true});
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.setClearColor("#18F90C", 2);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    1,
    1000
);
// camera.position.set(1, 1, 20);
camera.position.set(4, 5, 11);
camera.lookAt(0, 0, 0);

const ambientLight = new THREE.AmbientLight(0xffffff, 1 * Math.PI);
scene.add(ambientLight);

const orbit = new OrbitControls(camera, renderer.domElement);
orbit.update();

// const groundGeometry = new THREE.PlaneGeometry(20, 20, 32, 32);
// groundGeometry.rotateX(-Math.PI / 2);
// const groundMaterial = new THREE.MeshStandardMaterial({
//     color: 0x555555,
//     side: THREE.DoubleSide
// })
// const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
// scene.add(groundMesh);

// const spotLight = new THREE.SpotLight(0xffffff, 3, 100, 0.2, 0.5);
// spotLight.position.set(0, 25, 0);
// scene.add(spotLight);


const directionalLighting = new THREE.DirectionalLight(0xffffff, 1);
directionalLighting.position.set(2, 3, 4);
scene.add(directionalLighting);

const assetLoader = new GLTFLoader();

assetLoader.load(glbUrl.href, (gltf) => {
    const model = gltf.scene;
    scene.add(model);
})

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();