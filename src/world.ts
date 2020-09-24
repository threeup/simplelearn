import { Scene, ArcRotateCamera, Light, HemisphericLight, Vector3, MeshBuilder, Mesh, StandardMaterial, Color3 } from "babylonjs";


export class World {

    public camera: ArcRotateCamera;
    public light: Light;
    public box: Mesh;

    public createWorld(scene: Scene, canvas: any): void {

        this.camera = new ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 2, 2, new Vector3(0, 5, -10), scene);
        this.camera.attachControl(canvas, true);

        this.camera.setTarget(Vector3.Zero());

        this.camera.attachControl(canvas, true);

        // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
        this.light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);

        // Default intensity is 1. Let's dim the light a small amount
        this.light.intensity = 0.7;


        var boxMaterial = new StandardMaterial("material", scene);
        boxMaterial.emissiveColor = new Color3(0, 0.58, 0.86);

        this.box = MeshBuilder.CreateBox("box", { size: 4 }, scene);
        this.box.rotation.x = -0.2;
        this.box.rotation.y = -0.4;
        this.box.material = boxMaterial;

    }

    public loop(): void {

    }
}