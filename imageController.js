const axios = require("axios")
const sharp = require("sharp")

async function saveProfileImage(name, url) {
    const { data } = await axios.get(url, {
        responseType: "arraybuffer"
    })
    
    await sharp(data).resize(120,120).toFile(`./images/profile/${name + "_profile"}.png`)
}

async function saveBanner(name, url) {
    const { data } = await axios.get(url, {
        responseType: "arraybuffer"
    })
    
    await sharp(data).resize(501,167).toFile(`./images/banner/${name + "_banner"}.png`)
}

module.exports = { saveProfileImage, saveBanner }