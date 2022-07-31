import './style.css'
import * as THREE from 'three'

import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
// import vertex from './shaders/vertex.glsl'
// import fragment from './shaders/fragment.glsl'


export default class Sketch {
  constructor(options) {
    this.clock = new THREE.Clock()  
    this.container = options.domElement
    this.height = this.container.offsetHeight
    this.width = this.container.offsetWidth
    this.camera = new THREE.PerspectiveCamera(
        75,
        this.width / this.height,
        0.1,
        1000,
    )
    this.camera.position.set(0,0,2)
    this.scene = new THREE.Scene()
    // this.scene.destination = {x:0, y:0}
    this.renderer = new THREE.WebGLRenderer({antialias: true, alpha: true})
    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.setClearColor('black', 1)
    this.container.appendChild(this.renderer.domElement)
    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.resize()
    this.addObjects()
    this.render()
    this.setUpResize()
  }



  addObjects() {
 
  //  this.material = new THREE.ShaderMaterial({
  //     side: THREE.DoubleSide,
  //     // transparent:true,
  //     // wireframe: true,
  //     uniforms: {
  //       uTime: {type: 'f', value: 0},
  //       uResolution: {type: 't', value: new THREE.Vector4()},
  //       progress: {type: 'f', value: 0}
  //     },
  //     vertexShader: vertex,
  //     fragmentShader: fragment
  //   })
  this.geometry = new THREE.PlaneBufferGeometry(1,1,1)
  this.material = new THREE.MeshBasicMaterial({color: 0xFFFFFF, side: THREE.DoubleSide});

  this.mesh = new THREE.Mesh(this.geometry, this.material)
    
  this.scene.add(this.mesh)
  }


  
  render() {
     this.controls.update()
     this.camera.lookAt(this.scene.position);

    requestAnimationFrame(this.render.bind(this))
    this.renderer.render(this.scene, this.camera)
  }


  resize() {
    this.width = this.container.offsetWidth
    this.height = this.container.offsetHeight
    this.renderer.setSize(this.width, this.height)
    this.camera.aspect = this.width / this.height
    this.camera.updateProjectionMatrix()
  }


  setUpResize() {
    window.addEventListener('resize', this.resize.bind(this))
  }
}

new Sketch({
  domElement: document.getElementById('container'),
})