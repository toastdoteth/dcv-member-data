const client = require("../twitterClient");

// Twitter IDs
const members = {
    toast : "1076915521835225088",
    scoopy : "1012777913299689477",
    block : "962932834418790400",
    foobazz: "706407124079775744",
    mathieu: "106882516",
    cl: "1073132650309726208",
    maki: "1269408213876846592",
    marc: "2190759643",
    davis: "1249193324461916161",
    state: "1249460237913874433",
    rafi: "899962415135297538",
    ted: "910814692032917506",
    validator: "29965756",
    chop: "1299328228444831744",
    inugami: "1272288920403767296",
    techno: "1230030444030300160",
    zer0: "2255425337",
    mick: "362625515",
    dan: "1177187922258341888",
    finesseb0i: "1252222862418681858",
    gorby: "772457882755276800",
    ross: "517856571",
    aribma: "1447605049790803973"
}


//get Twitter user object
async function getUser(user_id) {
    const user = await client.v1.user({user_id})
       return user;
}

//extract data from user obj -> save into dcvMembers obj
const dcvMembers = {};
async function processMemberData() {
    for (let key in members) {
        const savedUser = {}
        const user = await getUser(members[key])
        savedUser.name = user.name;
        savedUser.screen_name = "@" + user.screen_name;
        savedUser.followers_count = user.followers_count;
        savedUser.description = user.description.replace(/\n/g, ' ').replace("  ", "");
        savedUser.profile_image_url = user.profile_image_url.replace("_normal", "");
        savedUser.profile_banner_url = user.profile_banner_url;
        dcvMembers[key] = savedUser;
    }
    return dcvMembers;
}

module.exports = {
    processMemberData,
    dcvMembers
}