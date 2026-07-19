const fs = require('fs');
const path = require('path');

const glbPath = path.join(__dirname, 'temp_portfolio', 'public', 'models', 'character.glb');

try {
  const buffer = fs.readFileSync(glbPath);
  
  // Read GLB header
  const magic = buffer.readUInt32LE(0);
  const version = buffer.readUInt32LE(4);
  const length = buffer.readUInt32LE(8);
  
  // Skip magic number check and read JSON directly
  const chunkLength = buffer.readUInt32LE(12);
  const chunkType = buffer.readUInt32LE(16);

  
  if (chunkType !== 0x4E4F534A) { // "JSON"
    console.error('Invalid GLB file: first chunk is not JSON');
    process.exit(1);
  }
  
  // Read JSON chunk data
  const jsonString = buffer.toString('utf8', 20, 20 + chunkLength);
  const gltf = JSON.parse(jsonString);
  
  console.log('--- METADATA ---');
  console.log('Generator:', gltf.asset.generator);
  console.log('Version:', gltf.asset.version);
  
  console.log('\n--- MATERIALS ---');
  if (gltf.materials) {
    gltf.materials.forEach((mat, idx) => {
      console.log(`[Material ${idx}] Name: "${mat.name}", BaseColorFactor:`, mat.pbrMetallicRoughness?.baseColorFactor);
    });
  } else {
    console.log('No materials found');
  }
  
  console.log('\n--- MESHES ---');
  if (gltf.meshes) {
    gltf.meshes.forEach((mesh, idx) => {
      console.log(`[Mesh ${idx}] Name: "${mesh.name}"`);
    });
  } else {
    console.log('No meshes found');
  }
  
  console.log('\n--- NODES ---');
  if (gltf.nodes) {
    gltf.nodes.forEach((node, idx) => {
      if (node.name) {
        console.log(`[Node ${idx}] Name: "${node.name}"${node.mesh !== undefined ? ` (Mesh: ${node.mesh})` : ''}`);
      }
    });
  }

} catch (error) {
  console.error('Error reading GLB:', error);
}
