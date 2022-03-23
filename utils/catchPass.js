let localData = undefined;


function catchPass(data){
    localData = data;
}

function passData(){
    const data = pass();
    localData = undefined;
    return data;
}

function pass(){
    return localData;
}

module.exports = {catchPass, passData}