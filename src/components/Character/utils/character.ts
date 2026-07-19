import * as THREE from "three";
import { DRACOLoader, GLTF, GLTFLoader } from "three-stdlib";
import { setCharTimeline, setAllTimeline } from "../../utils/GsapScroll";
import { decryptFile } from "./decrypt";

const setCharacter = (
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera
) => {
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("/draco/");
  loader.setDRACOLoader(dracoLoader);

  const loadCharacter = () => {
    return new Promise<GLTF | null>(async (resolve, reject) => {
      try {
        const encryptedBlob = await decryptFile(
          "/models/character.enc",
          "Character3D#@"
        );
        const blobUrl = URL.createObjectURL(new Blob([encryptedBlob]));

        let character: THREE.Object3D;
        loader.load(
          blobUrl,
          async (gltf) => {
            character = gltf.scene;
            await renderer.compileAsync(character, camera, scene);
            character.traverse((child: any) => {
              if (child.isMesh) {
                const mesh = child as THREE.Mesh;
                child.castShadow = true;
                child.receiveShadow = true;
                mesh.frustumCulled = true;

                // Programmatically personalize character styling to match Gaurav Vennamwar
                if (mesh.material) {
                  const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
                  mats.forEach((mat: any) => {
                    // 1. Skin Tone (warm Indian/brown skin tone)
                    if (mat.name === "Material.025" || 
                        ["Face.002", "Neck", "Hand", "Ear.001"].includes(mesh.name)) {
                      mat.color.setHex(0x91604f);
                      mat.roughness = 0.6;
                    }
                    
                    // 2. Hair & Eyebrows (deep black)
                    if (mat.name === "Material.014" || 
                        ["hair", "Eyebrow"].includes(mesh.name)) {
                      mat.color.setHex(0x0a0a0a);
                    }
                    
                    // 3. Shirt (white polo style)
                    if (mesh.name === "BODY.SHIRT") {
                      mat.color.setHex(0xf8f9fa);
                      mat.roughness = 0.8;
                    }
                    
                    // 4. Pants (cream/off-white)
                    if (mesh.name === "Pant") {
                      mat.color.setHex(0xeae5db);
                      mat.roughness = 0.95;
                    }
                    
                    // 5. Shoes (white sneakers)
                    if (mesh.name === "Shoe") {
                      mat.color.setHex(0xffffff);
                      mat.roughness = 0.5;
                    }
                  });
                }
              }
            });
            resolve(gltf);
            setCharTimeline(character, camera);
            setAllTimeline();
            character!.getObjectByName("footR")!.position.y = 3.36;
            character!.getObjectByName("footL")!.position.y = 3.36;
            dracoLoader.dispose();
          },
          undefined,
          (error) => {
            console.error("Error loading GLTF model:", error);
            reject(error);
          }
        );
      } catch (err) {
        reject(err);
        console.error(err);
      }
    });
  };

  return { loadCharacter };
};

export default setCharacter;
