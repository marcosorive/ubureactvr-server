let modelDir = "../../public/obj/";
let textureDir = "../../public/mtl/";
let pictureDir = "../../public/img/";

if(process.env.NODE_ENV === 'production'){
    pictureDir = "../../../public/img/";
    textureDir = "../../../public/mtl/";
    modelDir = "../../../public/obj/";
}


export {modelDir, textureDir, pictureDir};