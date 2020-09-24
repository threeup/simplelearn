"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.World = void 0;
const babylonjs_1 = require("babylonjs");
class World {
    createWorld(scene, canvas) {
        this.camera = new babylonjs_1.ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 2, 2, new babylonjs_1.Vector3(0, 5, -10), scene);
        this.camera.attachControl(canvas, true);
        this.camera.setTarget(babylonjs_1.Vector3.Zero());
        this.camera.attachControl(canvas, true);
        // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
        this.light = new babylonjs_1.HemisphericLight("light", new babylonjs_1.Vector3(0, 1, 0), scene);
        // Default intensity is 1. Let's dim the light a small amount
        this.light.intensity = 0.7;
        var boxMaterial = new babylonjs_1.StandardMaterial("material", scene);
        boxMaterial.emissiveColor = new babylonjs_1.Color3(0, 0.58, 0.86);
        this.box = babylonjs_1.MeshBuilder.CreateBox("box", { size: 4 }, scene);
        this.box.rotation.x = -0.2;
        this.box.rotation.y = -0.4;
        this.box.material = boxMaterial;
    }
    loop() {
    }
}
exports.World = World;
