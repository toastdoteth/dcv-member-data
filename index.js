const client = require("./twitterClient");
const { dcvMembers} = require("./models/model.js");
const { processMemberData } = require("./models/model.js");
const { saveProfileImage, saveBanner } = require("./imageController")
const fs = require('fs');

//convert object to json -> save
async function stringifyObject(obj) {
    try {
        var json = JSON.stringify(obj);
        fs.writeFileSync("./json/members.json", json) 
    } catch (err) {
        console.log(err);
    }
} 

async function imageDownload() {
    //create json file/containing folder if not exist
    if(!fs.existsSync("./json/members.json")) {
        if (!fs.existsSync("./json")){
            fs.mkdirSync("./json");
        }
        stringifyObject(dcvMembers)
    }

    //read existing json data and compare to current twitter data
    const data = JSON.parse(fs.readFileSync("./json/members.json"));
    for (let key in data) {
        const savedName = dcvMembers[key].screen_name.slice(1);
        const userObj = data[key];

        //check if obj image urls have changed
        function isProfileImageEqual(obj1,obj2){
            return obj1.profile_image_url === obj2.profile_image_url;
        }
        function isBannerEqual(obj1,obj2){
            return obj1.profile_banner_url === obj2.profile_banner_url;
        }

        //save bool result of comparison
        const imageResult = isProfileImageEqual(userObj, dcvMembers[key]);
        const bannerResult = isBannerEqual(userObj, dcvMembers[key]);

        //if URL has changed or file doesnt exist -> save image to disk
        if (!imageResult || (!fs.existsSync(`./images/profile/${savedName + "_profile"}.png`))) {
            // create images/profile folder if doesnt exist
            if (!fs.existsSync("./images/profile/")){
                fs.mkdirSync("./images/profile/", { recursive: true });
            }
            saveProfileImage(savedName, dcvMembers[key].profile_image_url)
        }
        
        //check if banner URL exists
        if(dcvMembers[key].profile_banner_url) {
            if (!bannerResult || (!fs.existsSync(`./images/banner/${savedName + "_banner"}.png`))) {
                //create images/banner folder if doesnt exist
                if (!fs.existsSync("./images/banner/")){
                    fs.mkdirSync("./images/banner/", { recursive: true });
                }
                saveBanner(savedName, dcvMembers[key].profile_banner_url)
            }
        }
    }
}

//run
(async() => {
    await processMemberData();
    await imageDownload();
    await stringifyObject(dcvMembers);
})()
