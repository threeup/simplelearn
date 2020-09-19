"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const babylonjs_1 = require("babylonjs");
var canvas = document.getElementById("main");
var engine = new babylonjs_1.Engine(canvas, true);
var box;
function createScene() {
    var scene = new babylonjs_1.Scene(engine);
    var camera = new babylonjs_1.ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 2, 2, new babylonjs_1.Vector3(0, 5, -10), scene);
    camera.attachControl(canvas, true);
    // This targets the camera to scene origin
    camera.setTarget(babylonjs_1.Vector3.Zero());
    // This attaches the camera to the canvas
    camera.attachControl(canvas, true);
    // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
    var light = new babylonjs_1.HemisphericLight("light", new babylonjs_1.Vector3(0, 1, 0), scene);
    // Default intensity is 1. Let's dim the light a small amount
    light.intensity = 0.7;
    var boxMaterial = new babylonjs_1.StandardMaterial("material", scene);
    boxMaterial.emissiveColor = new babylonjs_1.Color3(0, 0.58, 0.86);
    box = babylonjs_1.MeshBuilder.CreateBox("box", { size: 4 }, scene);
    box.rotation.x = -0.2;
    box.rotation.y = -0.4;
    box.material = boxMaterial;
    return scene;
}
var scene = createScene();
engine.runRenderLoop(() => {
    box.rotation.x += 0.01;
    box.rotation.y += 0.01;
    scene.render();
});
