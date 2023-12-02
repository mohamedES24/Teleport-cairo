import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
// import * as dat from 'dat.gui'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';  
import sphere360 from './models/environmentMaps/0/Street View 360.jpg'

export default class Sketch{
    constructor(options){
        this.initialize(options);
    }
    initialize(options){
      
        this.container = options.domElement;
        this.width=this.container.offsetWidth;
        this.height=this.container.offsetHeight;

        this.camera = new THREE.PerspectiveCamera( 30, this.width/this.height, 10, 1000 );
        this.camera.position.z = 10;

        this.camera.fov = 2*Math.atan( (this.height/2)/600 ) * 180/Math.PI;

        this.camera1 = new THREE.PerspectiveCamera( 30, this.width/this.height, 10, 1000 );
        this.camera1.position.z = 10;

        this.camera1.fov = 2*Math.atan( (this.height/2)/600 ) * 180/Math.PI;
        
        this.scene360 = new THREE.Scene();
        this.scene = new THREE.Scene();
        // this.cubeTextureLoader = new THREE.CubeTextureLoader()
        // const environmentMap = cubeTextureLoader.load([
        //     '/environmentMaps/0/px.png',
        //     '/environmentMaps/0/nx.png',
        //     '/environmentMaps/0/py.png',
        //     '/environmentMaps/0/ny.png',
        //     '/environmentMaps/0/pz.png',
        //     '/environmentMaps/0/nz.png'
        // ])
        // this.scene.background = environmentMap
        
        this.light = new THREE.AmbientLight({color:0x404040,intensity:20});
        this.scene.add(this.light);
        // this.parcelLoader = new URL([
        //     '../js/models/environmentMaps/0/px.png',
        //     '../js/models/environmentMaps/0/nx.png',
        //     '../js/models/environmentMaps/0/py.png',
        //     '../js/models/environmentMaps/0/ny.png',
        //     '../js/models/environmentMaps/0/pz.png',
        //     '../js/models/environmentMaps/0/nz.png'
        // ], import.meta.url);
        // this.environmentMap = new THREE.CubeTextureLoader().load(this.parcelLoader.href)
       
        // this.parcelLoader = new URL('../js/models/environmentMaps/0/plain.svg', import.meta.url);
        // this.Textureloader = new THREE.TextureLoader().load(this.parcelLoader.href);
        // this.scene.background = this.Textureloader;
        this.renderer = new THREE.WebGLRenderer( { 
            antialias: true,
            alpha: true,
         } );
        // this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setPixelRatio(2);
        this.container.appendChild(this.renderer.domElement);
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls1 = new OrbitControls(this.camera1, this.renderer.domElement);
        this.controls.enableZoom=true;

        // this.clock = new THREE.Clock();
        this.clock = new THREE.Clock();
        
        this.controls.enableDamping = true; 
        this.controls.dampingFactor = 0.25;
        this.controls.screenSpacePanning = false;

        this.time = 0;
        // this.setupSettings()
        this.resize()
        // this.addObjects()
        this.create360()
        this.loadModel()
        // this.animateModel()
        this.render();
        
        this.setupResize()
    }    
        create360(){
            let that = this;
            this.geometry = new THREE.SphereGeometry(30,30,30);
            this.sphere = new THREE.Mesh(this.geometry,
                new THREE.MeshBasicMaterial({
                    map: new THREE.TextureLoader().load(sphere360),
                    side: THREE.BackSide
                })
                );
            this.scene360.add(this.sphere);
               
        }
        loadModel(){
            const loader = new GLTFLoader();
            const parcelPath = new URL('../js/models/test.glb', import.meta.url);
            loader.load(parcelPath.href,(gltf)=>{
                // gltf.scene.traverse(c =>{
                //     c.castShadow =true;
                // });
                
                while(gltf.scene.children.length){
                    // this.scene.add(gltf.scene.children[0]).scale.multiplyScalar(10);
                    this.scene.add(gltf.scene.children[0]).rotateX(0);
                    this.scene.add(gltf.scene.children[0]).rotateY(0);    
                }
                // gltf.scene.scale.set(0.25,0.25,0.25)
                
                // this.scene.add(gltf.scene.children[0])
                
                this.scene.add(gltf.scene);
            });
            
            
        }

    resize(){
        this.width = this.container.offsetWidth;
        this.height = this.container.offsetHeight;
        this.renderer.setSize( this.width, this.height );
        this.camera.aspect = this.width/this.height;
        this.camera.updateProjectionMatrix();

    }

    setupResize(){
        window.addEventListener('resize',this.resize.bind(this));
    }

    // addObjects(){
    //     this.geometry = new THREE.PlaneGeometry( 50, 50,50,50);
    //     this.material = new THREE.MeshBasicMaterial({
    //         // wireframe: true,
    //         color: 0xFF6600,
    //     })

       
    //     this.mesh = new THREE.Mesh( this.geometry, this.material );
    //     this.scene.add( this.mesh );
    //     // this.mesh.position.x = 300
    //     // this.mesh.rotation.z = 0.5
    // }

    render(){
        // this.time += 0.05;
        this.controls.update()
        // this.renderer.render( this.scene360, this.camera );
        this.renderer.render( this.scene, this.camera );
        // console.log(this.time);
        requestAnimationFrame(this.render.bind(this))
    }
    
        // animateModel(){
        //   this.elapsedTime = clock.getElapsedTime();
    
        //   // Update animation objects
        //   // box.rotation.x = elapsedTime;
        //   // box.rotation.y = elapsedTime;
        //   // box.rotation.z = elapsedTime;
    
        //   // torus.rotation.x = -elapsedTime;
        //   // torus.rotation.y = -elapsedTime;
        //   // torus.rotation.z = -elapsedTime;
    
        //   // Render
        // //   renderer.render(scene, camera);
    
        //   // Call animateGeometry again on the next frame
        // //   window.requestAnimationFrame(animateGeometry);
        // }

    }
        


    

