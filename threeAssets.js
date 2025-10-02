import * as THREE from "three"
import {OrbitControls} from "three/addons/controls/OrbitControls.js"
import {GLTFLoader} from "three/addons/loaders/GLTFLoader.js"


const container = document.getElementById("three") //container
const renderer = new THREE.WebGLRenderer({antialias:true}) //renderer
renderer.setSize(container.clientWidth,container.clientHeight) //sizing
container.appendChild(renderer.domElement) // append

//cam
const camera = new THREE.PerspectiveCamera(75,container.clientWidth/container.clientHeight,0.1,1000)
camera.position.z = 5


const scene = new THREE.Scene()
const controls = new OrbitControls(camera,renderer.domElement)
controls.enableZoom = false
const loader = new GLTFLoader()

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({color:0xE12E84})
const mesh = new THREE.Mesh(geometry,material)
scene.add(mesh)
//animation loop

function animate() {
    
    mesh.rotation.x += 0.01
    controls.update()
    renderer.render(scene,camera)
}
renderer.setAnimationLoop(animate)


//resizer 
window.addEventListener("resize",()=>{
    const {clientWidth,clientHeight} = container
    camera.aspect = clientWidth/clientHeight
    camera.updateProjectionMatrix()
    
    renderer.setSize(clientWidth,clientHeight)
})

container.addEventListener("scroll",(e)=>{
    e.preventDefault()
})