import { Engine, Scene, ArcRotateCamera, HemisphericLight, Vector3, MeshBuilder, Mesh, StandardMaterial, Color3 } from "babylonjs";

var canvas: any = document.getElementById("main");
var engine: Engine = new Engine(canvas, true);
var box: Mesh;

function createScene(): Scene {
  var scene: Scene = new Scene(engine);

  var camera: ArcRotateCamera = new ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 2, 2, new Vector3(0, 5, -10), scene);
  camera.attachControl(canvas, true);

  // This targets the camera to scene origin
  camera.setTarget(Vector3.Zero());

  // This attaches the camera to the canvas
  camera.attachControl(canvas, true);

  // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
  var light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);

  // Default intensity is 1. Let's dim the light a small amount
  light.intensity = 0.7;

  
  var boxMaterial = new StandardMaterial("material",scene);
  boxMaterial.emissiveColor = new Color3(0, 0.58, 0.86); 
  
  box = MeshBuilder.CreateBox("box",{size:4},scene);
  box.rotation.x = -0.2;
  box.rotation.y = -0.4;
  box.material = boxMaterial;

  return scene;
}

var scene: Scene = createScene();

engine.runRenderLoop(() => {
  box.rotation.x += 0.01;
  box.rotation.y += 0.01;
  scene.render();
});
