// ======================================================
//  Credits
//  Script Revamped by Fatal
// ======================================================


function ReportButtonNames(intButton) {
    switch (intButton) {
        case 0:
            return "HATE SPEECH.";
        case 1:
            return "CHEATING.";
        case 2:
            return "TOXICITY.";
        case 3:
            return "CANCEL.";
        default:
            return "NOT ASSIGNED.";
    }
}

const CheatReasons = [
    "tee hee",  
    "changing room master",
    "gorvity bisdabled",
    "trying to inappropriately create game managers",
    "trying to create multiple game managers",
    "taking master to ban player",
    "too many rpc calls! SetTaggedTime",
    "too many rpc calls! PlayTagSound",
    "inappropriate tag data being sent play tag sound",
    "messing with game mode data",
    "messing with room size",
    "too many players",
    "invalid room name",
    "invalid game mode",
    "changing private to visible",
    "changing public to invisible",
    "changing others player names",
    "detsroy payler",
    "wack rad. ",
    "invalid RPC stuff",
    "changing player Ttl",
    "changing room Ttl",
    "incorrect mic data",
    "posib onwur futht",
    "possible kick attempt",
    "missing player ids",
    "creating voice link for someone else",
    "detsroy copmand room object",
    "network delete room object",
    "inappropriate tag data being sent set join tagged time",
    "inapproprigate tag data being sent bonk",
    "inappropriate tag data being sent geode effect",
    "inappropriate tag data being sent hand tap",
    "inappropriate tag data being sent self only instrument",
    "inappropriate tag data being sent set slowed time",
    "inappropriate tag data being sent set tagged time",
    "inappropriate tag data being sent splash effect",
    "inappropriate tag data being sent update cosmetics",
    "inappropriate tag data being sent update cosmetics with tryon"
];

const FalseReasons = [
    "too many rpc calls!",
    "bypassing dlc",
    "Network Overload",
    "odd netsync"
];


const OwnerInsta = [
    "59D793B8E098534A", //DARKZ 
    "", // 
    "", // 
    "", // 
    "", // 
    "", // 
    "", // 
];

const ModInsta = [
    "",
    "",
    "",
    "",
    "",
];

// trusted reps are not set up
const TrustedReports = [
    "", //  |  
    "", //  | 
    "", //  |  
    "", //  | 
    "", //  | 
    "", //  | 
    "", //  |  
    "", //  |  
    "", //  |
    "", //  |
    "", //  | 
    "", //  | 
    "" //   |

];
const BadNames = [
  "NIGGER", "NIGGA", "N1GGER", "N1GGA", "NIGG3R", "NIGG@", "N1GG@", "NLGGA", "NLGGER", "NIG", "N1G",
  "FAG", "FAGGOT", "F4GGOT", "F@GGOT", "FA9GOT", "FA660T",
  "CUNT", "SLUT", "WHORE", "BITCH", "B1TCH", "B!TCH", "8ITCH",
  "PUSSY", "PUS5Y", "PUS$Y",
  "RAPE", "RAPIST",
  "ASSHOLE", "A55HOLE", "4SSHOLE",
  "DICK", "COCK", "TWAT", "TITS",
  "SHIT", "SH1T", "5HIT",
  "FUCK", "FUXK", "FUQ", "FUK", "FUCKER", "FUKKER", "FUCKU", "FUCKYOU",
  "RETARD", "R3TARD", "RE7ARD",
  "SPASTIC", "SPAZ", "SP4Z",
  "CHINK", "CH1NK", "C7H1NK",
  "GOOK", "G00K",
  "KYKE", "KIKE", "K1KE",
  "TRANNY", "TR4NNY", "TR@NNY",
  "TROON",
  "NIGGERLOVER", "FAGGOTLOVER", "FAGLOVER",
  "MONKEY", "FUCKER", "COON",
  "PORCHMONKEY", "JUNGLEBUNNY",
  "BEANER", "WETBACK",
  "SANDNIGGER", "RAGHEAD", "CAMELJOCKEY",
  "MUZZIE", "ISLAMTARD",
  "JIHADIST", "TERRORIST",
  "KILLALL", "GASALL", "GASNIGGERS", "GASJEWS",
  "@EVERYONE"
];



BlockedCustoms = [
    "OCULUS2",
    "OCULUS3",
    "OCULUS4",
    "OCULUS5",
    "OCULUS6",
    "OCULUS7",
    "OCULUS8",
    "OCULUS9",
    "OCULUS10",
    "OCULUS5",
    "OCULUS0000000000000000",
    "OCULUS12"
]


handlers.ReturnCurrentVersion = function(args) {
    const motd = "IAMAGOONER";
    return {ResultCode: 0,BannedUsers: server.GetTitleData({}).Data.bannedusers,MOTD: motd.toString(), Message : live2114};
}

handlers.ReturnCurrentVersionNew = function(args) {
    const motd = "IAMAGOONER";
    return {ResultCode: 0,BannedUsers: server.GetTitleData({}).Data.bannedusers,MOTD: motd.toString()};
}


///////////////////////// Auths ///////////////////////////////////////


handlers.HellaAuth = function(args, content){
    var result = server.GetUserAccountInfo({
        PlayFabId: currentPlayerId
    });
 
    var customid = result.UserInfo.CustomIdInfo.CustomId
    var playfabid = result.UserInfo.PlayFabId;
    var event = context.playStreamEvent;
    var DeviceModel = event.DeviceInfo.DeviceModel;
    var ProductBundle = event.DeviceInfo.ProductBundle;
    var Platform = event.DeviceInfo.Platform;


    
    var HWIDSaved = server.GetUserData({
        PlayFabId: currentPlayerId
    }).Data['HWIDCached']
    var HWID = event.DeviceInfo.DataPath.split('/')[3].toString();

    var inventory = server.GetUserInventory({
        PlayFabId: currentPlayerId
    })

    

    let concatItems = ""

    for (var items in inventory.Inventory) {

        concatItems += result.Inventory[items].ItemId

    }

    if (ProductBundle == null || ProductBundle == "null") {
        server.BanUsers({
            Bans: [{
                DurationInHours: 24,
                IPAddress: 0,
                PlayfabID: currentPlayerId,
                Reason: "INVALID ACCOUNT"
            }]
        });
        var contentBody = {
            "content": null,
            "embeds": [
            {
                "title": null,
                "color": 16711680, 
                "author": {
                    "name": "Invalid ProductBundle"
                },
                "description": "USER ID: " + currentPlayerId + "\nCUSTOMID: " + customid,
            }],
            "attachments": []
        };
 
        var url = "https://discord.com/api/webhooks/1522696969670103132/Q_QKTlFKZxKOdcs5OQIJaHoJMd-i_OCsgkKVLZFLYRuoTFFYzuSAr273ZCdKaSHknVjB"
        var method = "POST";
        var contentType = "application/json";
        var headers = {};
        var responseString = http.request(url, method, JSON.stringify(contentBody), contentType, headers);
    }
    if (ProductBundle != null || ProductBundle != "null") {
        if (!ProductBundle == "com.Ape.Jumpers") {
            var applab_token = "";
            BadId = ValidateOculusID(CustomId, applab_token)
            if(BadId == true){
                server.BanUsers({
                    Bans: [{
                        DurationInHours: 72,
                        IPAddress: 0,
                        PlayfabID: currentPlayerId,
                        Reason: "INVALID ACCOUNT"
                    }]
                });
            }
            var contentBody = {
                "content": null,
                "embeds": [
                {
                    "title": null,
                    "color": 16711680, 
                    "author": {
                        "name": "Invalid Product Bundle"
                    },
                    "description": "USER ID: " + currentPlayerId + "\nCUSTOMID: " + customid,
                }],
                "attachments": []
            };
 
            var url = "https://discord.com/api/webhooks/1522696969670103132/Q_QKTlFKZxKOdcs5OQIJaHoJMd-i_OCsgkKVLZFLYRuoTFFYzuSAr273ZCdKaSHknVjB"
            var method = "POST";
            var contentType = "application/json";
            var headers = {};
            var responseString = http.request(url, method, JSON.stringify(contentBody), contentType, headers);
        }
    }
    if (HWIDSaved  != null) {
        if (HWID != HWIDSaved) {
            log.debug("HWID is different then saved")
        }else{
            server.UpdateUserData({
                PlayFabId: currentPlayerId,
                Data: {

                    "HWIDCached": HWID
                }
            })
        }
        if (HWID == null) {
            server.BanUsers({
                Bans: [{
                    DurationInHours: 72,
                    IPAddress: 0,
                    PlayfabID: currentPlayerId,
                    Reason: "INVALID ACCOUNT"
                }]
            });
            var contentBody = {
                "content": null,
                "embeds": [
                {
                    "title": null,
                    "color": 16711680, 
                    "author": {
                        "name": "HWID Is Null"
                    },
                    "description": "USER ID: " + currentPlayerId + "\nCUSTOMID: " + customid,
                }],
                "attachments": []
            };
 
            var url = "https://discord.com/api/webhooks/1522696969670103132/Q_QKTlFKZxKOdcs5OQIJaHoJMd-i_OCsgkKVLZFLYRuoTFFYzuSAr273ZCdKaSHknVjB"
            var method = "POST";
            var contentType = "application/json";
            var headers = {};
            var responseString = http.request(url, method, JSON.stringify(contentBody), contentType, headers);
        }
    }
    if (Platform == null || Platform == "null") {
        server.BanUsers({
            Bans: [{
                DurationInHours: 24,
                IPAddress: 0,
                PlayfabID: currentPlayerId,
                Reason: "INVALID ACCOUNT"
            }]
        });
        var contentBody = {
            "content": null,
            "embeds": [
            {
                "title": null,
                "color": 16711680, 
                "author": {
                    "name": "Playform Is Null"
                },
                "description": "USER ID: " + currentPlayerId + "\nCUSTOMID: " + customid,
            }],
            "attachments": []
        };
 
        var url = "https://discord.com/api/webhooks/1522696969670103132/Q_QKTlFKZxKOdcs5OQIJaHoJMd-i_OCsgkKVLZFLYRuoTFFYzuSAr273ZCdKaSHknVjB"
        var method = "POST";
        var contentType = "application/json";
        var headers = {};
        var responseString = http.request(url, method, JSON.stringify(contentBody), contentType, headers);
    }
    if (DeviceModel != "Oculus Quest") {
        server.BanUsers({
            Bans: [{
                DurationInHours: 72,
                IPAddress: 0,
                PlayfabID: currentPlayerId,
                Reason: "INVALID ACCOUNT"
            }]
        });
        var contentBody = {
            "content": null,
            "embeds": [
            {
                "title": null,
                "color": 16711680, 
                "author": {
                    "name": "DeviceModel Is Not Oculus Quest"
                },
                "description": "USER ID: " + currentPlayerId + "\DeviceModel: " + DeviceModel,
            }],
            "attachments": []
        };
 
        var url = "https://discord.com/api/webhooks/1522696969670103132/Q_QKTlFKZxKOdcs5OQIJaHoJMd-i_OCsgkKVLZFLYRuoTFFYzuSAr273ZCdKaSHknVjB"
        var method = "POST";
        var contentType = "application/json";
        var headers = {};
        var responseString = http.request(url, method, JSON.stringify(contentBody), contentType, headers);
    }
    if (Platform != "Android") {
        server.BanUsers({
            Bans: [{
                DurationInHours: 72,
                IPAddress: 0,
                PlayfabID: currentPlayerId,
                Reason: "INVALID ACCOUNT"
            }]
        });
        var contentBody = {
            "content": null,
            "embeds": [
            {
                "title": null,
                "color": 16711680, 
                "author": {
                    "name": "Platform Is Not Android"
                },
                "description": "USER ID: " + currentPlayerId + "\Platform: " + Platform,
            }],
            "attachments": []
        };
 
        var url = "https://discord.com/api/webhooks/1522696969670103132/Q_QKTlFKZxKOdcs5OQIJaHoJMd-i_OCsgkKVLZFLYRuoTFFYzuSAr273ZCdKaSHknVjB"
        var method = "POST";
        var contentType = "application/json";
        var headers = {};
        var responseString = http.request(url, method, JSON.stringify(contentBody), contentType, headers);
    }
        

    if(!customid.includes("OCULUS")){
    }else{
        server.BanUsers({
            Bans: [{
                DurationInHours: 144,
                IPAddress: 0,
                PlayfabID: currentPlayerId,
                Reason: "INVALID ACCOUNT"
            }]
        });
        var contentBody = {
            "content": null,
            "embeds": [
            {
                "title": null,
                "color": 16711680, 
                "author": {
                    "name": "Invalid Custom Id"
                },
                "description": "USER ID: " + currentPlayerId + "\CustomId: " + customid,
            }],
            "attachments": []
        };
 
        var url = "https://discord.com/api/webhooks/1522696969670103132/Q_QKTlFKZxKOdcs5OQIJaHoJMd-i_OCsgkKVLZFLYRuoTFFYzuSAr273ZCdKaSHknVjB"
        var method = "POST";
        var contentType = "application/json";
        var headers = {};
        var responseString = http.request(url, method, JSON.stringify(contentBody), contentType, headers);
    }
    if(customid.length > 22 && customid.length !== 23){
        server.BanUsers({
            Bans: [{
                DurationInHours: 72,
                IPAddress: 0,
                PlayfabID: currentPlayerId,
                Reason: "INVALID ACCOUNT"
            }]
        });
        var contentBody = {
            "content": null,
            "embeds": [
            {
                "title": null,
                "color": 16711680, 
                "author": {
                    "name": "Invalid Custom Id length > 22 + !== 23"
                },
                "description": "USER ID: " + currentPlayerId + "\CustomId: " + customid,
            }],
            "attachments": []
        };
 
        var url = "https://discord.com/api/webhooks/1522696969670103132/Q_QKTlFKZxKOdcs5OQIJaHoJMd-i_OCsgkKVLZFLYRuoTFFYzuSAr273ZCdKaSHknVjB"
        var method = "POST";
        var contentType = "application/json";
        var headers = {};
        var responseString = http.request(url, method, JSON.stringify(contentBody), contentType, headers);
    }
    if(customid.length < 22){
        server.BanUsers({
            Bans: [{
                DurationInHours: 72,
                IPAddress: 0,
                PlayfabID: currentPlayerId,
                Reason: "INVALID ACCOUNT"
            }]
        });
        var contentBody = {
            "content": null,
            "embeds": [
            {
                "title": null,
                "color": 16711680, 
                "author": {
                    "name": "Invalid Custom Id length < 22"
                },
                "description": "USER ID: " + currentPlayerId + "\CustomId: " + customid,
            }],
            "attachments": []
        };
 
        var url = "https://discord.com/api/webhooks/1522696969670103132/Q_QKTlFKZxKOdcs5OQIJaHoJMd-i_OCsgkKVLZFLYRuoTFFYzuSAr273ZCdKaSHknVjB"
        var method = "POST";
        var contentType = "application/json";
        var headers = {};
        var responseString = http.request(url, method, JSON.stringify(contentBody), contentType, headers);
    }
    if (customid.includes("H") || customid.includes("J") || customid.includes("T")||customid.includes("A")||customid.includes("B")||customid.includes("D")||customid.includes("E")||customid.includes("F")|| customid.includes("G")||customid.includes("H")||customid.includes("I")||customid.includes("J")||customid.includes("K")||customid.includes("M")||customid.includes("N")||customid.includes("P")||customid.includes("Q")||customid.includes("R")||customid.includes("T")||customid.includes("V")||customid.includes("W")||customid.includes("X")||customid.includes("Y")||customid.includes("Z")||customid.includes("h") || customid.includes("j") || customid.includes("t")||customid.includes("a")||customid.includes("b")||customid.includes("d")||customid.includes("e")||customid.includes("f")|| customid.includes("g")||customid.includes("h")||customid.includes("i")||customid.includes("j")||customid.includes("k")||customid.includes("l")||customid.includes("m")||customid.includes("n")||customid.includes("p")||customid.includes("q")||customid.includes("r")||customid.includes("t")||customid.includes("v")||customid.includes("w")||customid.includes("x")||customid.includes("y")||customid.includes("z")||customid.includes(".")||customid.includes("@")  || customid.includes(".4")){
        server.BanUsers({
            Bans: [{
                DurationInHours: 72,
                IPAddress: 0,
                PlayfabID: currentPlayerId,
                Reason: "INVALID ACCOUNT"
            }]
        });
        var contentBody = {
            "content": null,
            "embeds": [
            {
                "title": null,
                "color": 16711680, 
                "author": {
                    "name": "Invalid Custom Id Letters"
                },
                "description": "USER ID: " + currentPlayerId + "\CustomId: " + customid,
            }],
            "attachments": []
        };
 
        var url = "https://discord.com/api/webhooks/1522696969670103132/Q_QKTlFKZxKOdcs5OQIJaHoJMd-i_OCsgkKVLZFLYRuoTFFYzuSAr273ZCdKaSHknVjB"
        var method = "POST";
        var contentType = "application/json";
        var headers = {};
        var responseString = http.request(url, method, JSON.stringify(contentBody), contentType, headers);
    }
}

handlers.BetterAuthenticator = function(args) {
    var getUserInforesult = server.GetUserAccountInfo({PlayFabId:currentPlayerId}).UserInfo;
    if (!getUserInforesult.ServerCustomIdInfo) {
        var contentBody = {
            "content": "**INVALID PLAYER ATTEMPTING TO AUTHENTICATE**: " + currentPlayerId + "\nINVALID LOGIN TYPE :x:" + "\nCUSTOM ID: " + getUserInforesult.ServerCustomIdInfo.CustomId
        };
        var url = "https://discord.com/api/webhooks/1522696969670103132/Q_QKTlFKZxKOdcs5OQIJaHoJMd-i_OCsgkKVLZFLYRuoTFFYzuSAr273ZCdKaSHknVjB";
        var method = "POST";
        var contentType = "application/json";
        var headers = {};
        var responseString = http.request(url, method, JSON.stringify(contentBody), contentType, headers);
        server.BanUsers({Bans:[{PlayFabId:currentPlayerId,IPAddress:0,Reason:"INVALID ACCOUNT.",DurationInHours: 672}]})
        server.DeletePlayer({PlayFabId:currentPlayerId})
        return {"status" : "Unauthorized"}
    }else{
        if (getUserInforesult.ServerCustomIdInfo.CustomId.startsWith("OCULUS")) {
            if (getUserInforesult.ServerCustomIdInfo.CustomId.substring(6).length == 16 || getUserInforesult.ServerCustomIdInfo.CustomId.substring(6).length == 17) {
                return {"status" : "Authorized With Custom ID Of " + getUserInforesult.ServerCustomIdInfo.CustomId + " and the org scope of " + getUserInforesult.ServerCustomIdInfo.CustomId.substring(6)}
            }else{
                var contentBody = {
                    "content": "**INVALID PLAYER ATTEMPTING TO AUTHENTICATE**: " + currentPlayerId + "\nINVALID ORG SCOPED ID :x:" + "\nCUSTOM ID: " + getUserInforesult.ServerCustomIdInfo.CustomId
                };
                var url = "https://discord.com/api/webhooks/1522696969670103132/Q_QKTlFKZxKOdcs5OQIJaHoJMd-i_OCsgkKVLZFLYRuoTFFYzuSAr273ZCdKaSHknVjB";
                var method = "POST";
                var contentType = "application/json";
                var headers = {};
                var responseString = http.request(url, method, JSON.stringify(contentBody), contentType, headers);
                server.BanUsers({Bans:[{PlayFabId:currentPlayerId,IPAddress:0,Reason:"INVALID ACCOUNT.",DurationInHours: 672}]})
                server.DeletePlayer({PlayFabId:currentPlayerId})
            }
        }else{
            return {"status" : "Invalid Custom Id Type"}
        }
    }
}
function getPlayerProfile(playFabId) {
    var result = server.GetPlayerProfile({ PlayFabId: playFabId });
    return result.PlayerProfile;
}

function getUserAccountInfo(playFabId) {
    var result = server.GetUserAccountInfo({ PlayFabId: playFabId });
    return result.UserInfo;
}

function checkIfPlayerIsBanned(playFabId) {
    var result = server.GetUserBans({ PlayFabId: playFabId });
    return result.BanData.some(ban => ban.Active);
}

function getPlayerBansCount(playFabId) {
    var result = server.GetUserBans({ PlayFabId: playFabId });
    return result.BanData.length;
}

function safeJSONStringify(obj, maxLength = 950) {
    try {
        let json = JSON.stringify(obj, null, 2);
        if (json.length > maxLength) {
            json = json.slice(0, maxLength) + '\n...truncated...';
        }
        return json;
    } catch {
        return '"[Unserializable object]"';
    }
}

handlers.Authenticated = function (args, context) {
    var playerId = currentPlayerId;

    var playerProfile = getPlayerProfile(playerId);
    var userInfo = getUserAccountInfo(playerId);

    var playerName = playerProfile?.DisplayName || "Unknown";
    var platform = userInfo?.TitleInfo?.Origination || "Unknown";

    var isPlayerBanned = checkIfPlayerIsBanned(playerId);
    var bansOnRecord = getPlayerBansCount(playerId);

    var argsJson = safeJSONStringify(args);
    if (!argsJson || argsJson.length === 0) argsJson = '"[No args received]"';

    var profileJson = safeJSONStringify(playerProfile);
    var accountJson = safeJSONStringify(userInfo);

    var embedContent = {
        content: null,
        embeds: [
            {
                title: "PLAYER AUTHED",
                color: isPlayerBanned ? 0xFF0000 : 0x00FF00,
                timestamp: new Date().toISOString(),
                footer: { text: "PlayFab Authentication Log" },
                fields: [
                    {
                        name: "👤 Player Info",
                        value:
                            `**Display Name:** ${playerName}\n` +
                            `**Player ID:** ${playerId}\n` +
                            `**Platform:** ${platform}\n` +
                            `**Bans On Record:** ${bansOnRecord}`
                    },
                    {
                        name: "📥 ARGS",
                        value: "```json\n" + argsJson + "\n```"
                    },
                    {
                        name: "🧾 Profile",
                        value: "```json\n" + profileJson + "\n```"
                    },
                    {
                        name: "🧾 Account Info",
                        value: "```json\n" + accountJson + "\n```"
                    }
                ]
            }
        ]
    };

    var headers = { "Content-Type": "application/json" };
    var webhookUrl = "https://discord.com/api/webhooks/1522696969670103132/Q_QKTlFKZxKOdcs5OQIJaHoJMd-i_OCsgkKVLZFLYRuoTFFYzuSAr273ZCdKaSHknVjB";

    http.request(webhookUrl, "POST", JSON.stringify(embedContent), "application/json", headers);

    return { success: true };
};




function getPlayerProfile(playFabId) {
    var result = server.GetPlayerProfile({ PlayFabId: playFabId });
    return result.PlayerProfile;
}

function getUserAccountInfo(playFabId) {
    var result = server.GetUserAccountInfo({ PlayFabId: playFabId });
    return result.UserInfo;
}

function safeJSONStringify(obj, maxLength = 950) {
    try {
        let json = JSON.stringify(obj, null, 2);
        if (json.length > maxLength) {
            json = json.slice(0, maxLength) + '\n...truncated...';
        }
        return json;
    } catch {
        return '"[Unserializable object]"';
    }
}



handlers.Authentication = function(args, context) {
    var playerData = server.GetUserAccountInfo({
        PlayFabId: currentPlayerId
    }).UserInfo;
    
    if (playerData.CustomIdInfo && playerData.CustomIdInfo.CustomId.length < 22) {
        var banRequest = {
            Bans: [{
                PlayFabId: currentPlayerId,
                DurationInHours: 72,
                Reason: "INVALID ACCOUNT"
            }]
        };
        
        server.BanUsers(banRequest);

        
        sendBanNotificationToDiscord(playerData.CustomIdInfo.CustomId, playerData.TitleInfo.DisplayName, currentPlayerId);

        return { message: "User banned." };
    } else {
        return { message: "Player authentication successful." };
    }
};



handlers.AuthenticatePlayer = function(playerid) {
    var playerId = playerid;
    
    var userResult = server.GetUserAccountInfo({
        PlayFabId: currentPlayerId
    });

    if(JSON.stringify(userResult.UserInfo.CustomIdInfo?.CustomId) != null)
    {
        if (userResult.UserInfo.CustomIdInfo?.CustomId.length > 23)
        {
            server.BanUsers({
                Bans: [{
                    PlayFabId: currentPlayerId,
                    Reason: "BANNED FOR USING STEAM"
                }]
            });
            server.DeletePlayer({
                PlayFabId: currentPlayerId
            });
        }
        if(userResult.UserInfo.CustomIdInfo?.CustomId.startsWith("OCULUS"))
        {
            return false;
        }
        if(userResult.UserInfo.CustomIdInfo?.CustomId.length < 20)
        {
            server.BanUsers({
                Bans: [{
                    PlayFabId: currentPlayerId,
                    Reason: "INVALID ACCOUNT"
                }]
            });
            server.DeletePlayer({
                PlayFabId: currentPlayerId
            });
        }
        if (userResult.UserInfo.CustomIdInfo?.CustomId == "OCULUS0")
        {
            server.BanUsers({
                Bans: [{
                    PlayFabId: currentPlayerId,
                    Reason: "UNPATCH UR GAME TO BE UNBANNED"
                }]
            });
            server.DeletePlayer({
                PlayFabId: currentPlayerId
            });
        }
    } 
    else {
        server.BanUsers({
            Bans: [{
                PlayFabId: currentPlayerId,
                Reason: "BANNED FOR USING STEAM"
            }]
        });
        server.DeletePlayer({
            PlayFabId: currentPlayerId
        });
        return false;
    }    
}



handlers.Authenticator = function(args, context) {
    var playerxd = server.GetUserAccountInfo({
        PlayFabId: currentPlayerId
    }).UserInfo;
    if (playerxd.CustomIdInfo && !playerxd.CustomIdInfo.CustomId.startsWith("OCULUS") && playerxd.CustomIdInfo && !playerxd.CustomIdInfo.CustomId.startsWith("ANDROID")) {
        var contentBody = {
            "content": "**PLAYER ATTEMPTING TO AUTHENTICATE**: " + currentPlayerId + "\nPLAYER FAILED TO AUTHENTICATE :x:" + "\nCUSTOM ID: " + playerxd.CustomIdInfo.CustomId
        };
        var url = "https://discord.com/api/webhooks/1522696969670103132/Q_QKTlFKZxKOdcs5OQIJaHoJMd-i_OCsgkKVLZFLYRuoTFFYzuSAr273ZCdKaSHknVjB";
        var method = "POST";
        var contentType = "application/json";
        var headers = {};
        var responseString = http.request(url, method, JSON.stringify(contentBody), contentType, headers);
        server.BanUsers({
            Bans: [{
                PlayFabId: currentPlayerId,
                IPAddress: 0,
                DurationInHours: 72,
                Reason: "INVALID ACCOUNT."
            }]
        });

        server.DeletePlayer({
            PlayFabId: currentPlayerId
        })
    } else {
        var contentBody = {
            "content": "**PLAYER ATTEMPTING TO AUTHENTICATE**: " + currentPlayerId + "\nPLAYER AUTHENTICATED SUCCESSFULLY :white_check_mark:" + "\nCUSTOM ID: ```json" + "     " + playerxd.CustomIdInfo.CustomId + "```"
        };
        var url = "https://discord.com/api/webhooks/1522696969670103132/Q_QKTlFKZxKOdcs5OQIJaHoJMd-i_OCsgkKVLZFLYRuoTFFYzuSAr273ZCdKaSHknVjB";
        var method = "POST";
        var contentType = "application/json";
        var headers = {};
        var responseString = http.request(url, method, JSON.stringify(contentBody), contentType, headers);
    }
}

handlers.SigmaAuth = function(args) {
    var r = server.GetUserAccountInfo({ PlayFabId: currentPlayerId })
    var cid = (r && r.UserInfo && r.UserInfo.CustomIdInfo && r.UserInfo.CustomIdInfo.CustomId) || ""
    var web = ""

    function yeetUser(reason, title, details) {
        var c = {
            content: null,
            embeds: [
                {
                    title: title + "INVALID LOG",
                    color: 11339013,
                    fields: [
                        {
                            name: "User Infooooooo",
                            value: "```diff\n+ CustomId: " + cid + "\n- UserId: " + currentPlayerId + "\n" + details + "\n```"
                        }
                    ]
                }
            ],
            attachments: []
        }

        s4geauthRequestSystem(web, "POST", c)

        EasierBanning(currentPlayerId, 8, reason + "CHEATING")
        EasierDeletePlayer(currentPlayerId)
    }

    if (!cid.startsWith("OCULUS")) {
        yeetUser("EWWWWW", "this guy custom id is super weird brooo", "")
        return
    }

    if (cid === "OCULUS0") {
        yeetUser("EWWWW LEMON LOADER", "this guy custom id smells like lemon lol", "")
        return
    }

    if (cid !== cid.toUpperCase()) {
        yeetUser("INVALID CASE", "this guy custom id is all lowercase yikes", "")
        return
    }

    if (cid.length < 21 || cid.length > 23) {
        yeetUser("INVALID LENGTH", "this guy custom id is wayyyyy too long or short", "Length: " + cid.length)
        return
    }

    if (!/^OCULUS\d+$/.test(cid)) {
        yeetUser("EWWW", "this guy custom id has sneaky letters or something", "")
        return
    }

    var passEmbed = {
        content: null,
        embeds: [
            {
                title: "chat this guy is sigma af lmaoooo",
                color: 3066993,
                fields: [
                    {
                        name: "User Infooooooo",
                        value: "```diff\n+ CustomId: " + cid + "\n- UserId: " + currentPlayerId + "\n```"
                    }
                ]
            }
        ],
        attachments: []
    }

    sigmaauth(web, "POST", passEmbed)
}


function sigmaauth(url, method, content) {
    var ct = "application/json"
    var noHeaders = null
    var noFollow = false
    return http.request(url, method, JSON.stringify(content), ct, noHeaders, noFollow)
}

handlers.SigmaAuth = function(args) {
    var r = server.GetUserAccountInfo({ PlayFabId: currentPlayerId })
    var cid = (r && r.UserInfo && r.UserInfo.CustomIdInfo && r.UserInfo.CustomIdInfo.CustomId) || ""
    var web = ""

    function yeetUser(reason, title, details) {
        var c = {
            content: null,
            embeds: [
                {
                    title: title + "INVALID LOG",
                    color: 11339013,
                    fields: [
                        {
                            name: "User Infooooooo",
                            value: "```diff\n+ CustomId: " + cid + "\n- UserId: " + currentPlayerId + "\n" + details + "\n```"
                        }
                    ]
                }
            ],
            attachments: []
        }

        s4geauthRequestSystem(web, "POST", c)

        EasierBanning(currentPlayerId, 8, reason + "!!!!!!!")
        EasierDeletePlayer(currentPlayerId)
    }

    if (!cid.startsWith("OCULUS")) {
        yeetUser("EWWWWW", "this guy custom id is super weird brooo", "")
        return
    }

    if (cid === "OCULUS0") {
        yeetUser("EWWWW LEMON LOADER", "this guy custom id smells like lemon lol", "")
        return
    }

    if (cid !== cid.toUpperCase()) {
        yeetUser("INVALID CASE", "this guy custom id is all lowercase yikes", "")
        return
    }

    if (cid.length < 21 || cid.length > 23) {
        yeetUser("INVALID LENGTH", "this guy custom id is wayyyyy too long or short", "Length: " + cid.length)
        return
    }

    if (!/^OCULUS\d+$/.test(cid)) {
        yeetUser("EWWW", "this guy custom id has sneaky letters or something", "")
        return
    }

    var passEmbed = {
        content: null,
        embeds: [
            {
                title: "chat this guy is sigma af lmaoooo",
                color: 3066993,
                fields: [
                    {
                        name: "User Infooooooo",
                        value: "```diff\n+ CustomId: " + cid + "\n- UserId: " + currentPlayerId + "\n```"
                    }
                ]
            }
        ],
        attachments: []
    }

    sigmaauth(web, "POST", passEmbed)
}



handlers.PlayFabIDAuth = function(args) {
    var result = server.GetUserAccountInfo({
        PlayFabId: currentPlayerId
    })

    const playfabid = result.UserInfo.PlayFabId;
    const customid = result.UserInfo.CustomIdInfo.CustomId;

    if (playfabid.length > 16 && playfab.length != 16) {
    var contentBody = {
        "content": null,
        "embeds": [
            {
                "title": null,
                "color": 16711680, 
                "author": {
                    "name": "INVALID PLAYER ID FOUND"
                },
                "description": "USER ID: " + currentPlayerId + "\nCUSTOMID: " + customid + "",
                "thumbnail": {
                    "url": ""
                }
            }
        ],
        "attachments": []
     };
 
        var url = "https://discord.com/api/webhooks/1522696969670103132/Q_QKTlFKZxKOdcs5OQIJaHoJMd-i_OCsgkKVLZFLYRuoTFFYzuSAr273ZCdKaSHknVjB"
        var method = "POST";
        var contentType = "application/json";
        var headers = {};
        var responseString = http.request(url, method, JSON.stringify(contentBody), contentType, headers);
 
        server.DeletePlayer({
            PlayFabId: currentPlayerId
        })
 
        server.BanUsers({
            Bans: [{
                DurationInHours: 0,
                IPAddress: 0,
                PlayFabId: currentPlayerId,
                Reason: "CHEATING, INVALID PLAYFAB ID"
            }]
        })
    }
 
}

handlers.SexyAuth = function(args) {
    var result = server.GetUserAccountInfo({
        "PlayfabID": currentPlayerId
    })
    
       
        const CustomID = result.UserInfo.CustomIdInfo.CustomId.toString()
        if (CustomID.includes("OCULUS")) {
            log.debug("NORMAL USER LOGGED IN!!!") 
        }
        
        if (!CustomID.includes("OCULUS")) {
            server.BanUsers({
                Bans: [{
                    DurationInHours: 72,
                    IPAddress: 0,
                    PlayfabID: currentPlayerId,
                    Reason: "INVALID ACCOUNT"
                }]
            })
            
            server.DeletePlayer({
            "PlayfabID" : currentPlayerId
        })
     }
}

handlers.GorillaAuth = function(args) {
    var result = server.GetUserAccountInfo({
        PlayFabId: currentPlayerId
    })
 
    const customid = result.UserInfo.CustomIdInfo.CustomId;
 
 
 
    if (customid.includes("OCULUS1") || customid.includes("OCULUS2") || customid.includes("OCULUS2") || customid.includes("OCULUS3") || customid.includes("OCULUS4") || customid.includes("OCULUS5") || customid.includes("OCULUS6") || customid.includes("OCULUS7") || customid.includes("OCULUS8") || customid.includes("OCULUS9")) {
 
         var contentBody = {
        "content": null,
        "embeds": [
            {
                "title": "NORMAL USER LOGGED ON",
                "color": 65280, 
                "author": {
                    "name": "NORMAL USER LOGGED ON"
                },
                "description": "**USER ID:** " + currentPlayerId + "\nCUSTOMID:|| " + customid + "||",
                "thumbnail": {
                    "url": ""
                }
            }
        ],
        "attachments": []
     };
 
        var url = "https://discord.com/api/webhooks/1522696969670103132/Q_QKTlFKZxKOdcs5OQIJaHoJMd-i_OCsgkKVLZFLYRuoTFFYzuSAr273ZCdKaSHknVjB"
        var method = "POST";
        var contentType = "application/json";
        var headers = {};
        var responseString = http.request(url, method, JSON.stringify(contentBody), contentType, headers);
 
    }else{
         var contentBody = {
        "content": null,
        "embeds": [
            {
                "title": "INVALID USER LOGGED IN",
                "color": 16711680, 
                "author": {
                    "name": "INVALID USER LOGGED IN"
                },
                "description": "**USER ID:** " + currentPlayerId + "\nCUSTOMID:|| " + customid + "||",
                "thumbnail": {
                    "url": ""
                }
            }
        ],
        "attachments": []
     };
 
        var url = "https://discord.com/api/webhooks/1522696969670103132/Q_QKTlFKZxKOdcs5OQIJaHoJMd-i_OCsgkKVLZFLYRuoTFFYzuSAr273ZCdKaSHknVjB"
        var method = "POST";
        var contentType = "application/json";
        var headers = {};
        var responseString = http.request(url, method, JSON.stringify(contentBody), contentType, headers);
 
 
        server.DeletePlayer({
            PlayFabId: currentPlayerId
        })
 
        server.BanUsers({
            Bans: [{
                DurationInHours: 0,
                IPAddress: 0,
                PlayFabId: currentPlayerId,
                Reason: "CHEATING"
            }]
        })
    }
 
 
    if (customid.includes("H") || customid.includes("J") || customid.includes("T")||customid.includes("A")||customid.includes("B")||customid.includes("D")||customid.includes("E")||customid.includes("F")|| customid.includes("G")||customid.includes("H")||customid.includes("I")||customid.includes("J")||customid.includes("K")||customid.includes("M")||customid.includes("N")||customid.includes("P")||customid.includes("Q")||customid.includes("R")||customid.includes("T")||customid.includes("V")||customid.includes("W")||customid.includes("X")||customid.includes("Y")||customid.includes("Z")||customid.includes("h") || customid.includes("j") || customid.includes("t")||customid.includes("a")||customid.includes("b")||customid.includes("d")||customid.includes("e")||customid.includes("f")|| customid.includes("g")||customid.includes("h")||customid.includes("i")||customid.includes("j")||customid.includes("k")||customid.includes("l")||customid.includes("m")||customid.includes("n")||customid.includes("p")||customid.includes("q")||customid.includes("r")||customid.includes("t")||customid.includes("v")||customid.includes("w")||customid.includes("x")||customid.includes("y")||customid.includes("z")||customid.includes(".")||customid.includes("@")) {
 
 
                server.DeletePlayer({
            PlayFabId: currentPlayerId
        })
 
 
        server.BanUsers({
            Bans: [{
                DurationInHours: 0,
                IPAddress: 0,
                PlayFabId: currentPlayerId,
                Reason: "CHEATING"
            }]
        })
 
 
 
    }
 
    if (customid.length > 22 && customid.length != 23) {
         var contentBody = {
        "content": null,
        "embeds": [
            {
                "title": null,
                "color": 16711680, 
                "author": {
                    "name": "INVALID CUSTOM ID FOUND"
                },
                "description": "**USER ID:** " + currentPlayerId + "\n**CUSTOMID:** || " + customid + "||",
                "thumbnail": {
                    "url": ""
                }
            }
        ],
        "attachments": []
     };
 
        var url = "https://discord.com/api/webhooks/1522696969670103132/Q_QKTlFKZxKOdcs5OQIJaHoJMd-i_OCsgkKVLZFLYRuoTFFYzuSAr273ZCdKaSHknVjB"
        var method = "POST";
        var contentType = "application/json";
        var headers = {};
        var responseString = http.request(url, method, JSON.stringify(contentBody), contentType, headers);
 
        server.DeletePlayer({
            PlayFabId: currentPlayerId
        })
 
        server.BanUsers({
            Bans: [{
                DurationInHours: 0,
                IPAddress: 0,
                PlayFabId: currentPlayerId,
                Reason: "CHEATING, INVALID CUSTOM ID"
            }]
        })
    }
 
}

handlers.GorillaTagV9Auth = function(args){
 const info = server.GetUserAccountInfo({PlayFabId: currentPlayerId});
    var customId = info.UserInfo?.CustomIdInfo?.CustomId;

    if (!customId.startsWith("OCULUS")) 
    {
        sendNotAuthedNotificationToDiscord();
    }

    if (info.UserInfo.CustomIdInfo.CustomId.includes("OCULUS7618099004982475") || info.CustomIdInfo.CustomId.includes("OCULUS0000000000000000") || info.CustomIdInfo.CustomId.includes("OCULUS000") || info.CustomIdInfo.CustomId.includes("OCULUS28142994208678466") || info.CustomIdInfo.CustomId.includes("OCULUS9") || info.CustomIdInfo.CustomId.includes("OCULUS8") || info.CustomIdInfo.CustomId.includes("OCULUS7") || info.CustomIdInfo.CustomId.includes("OCULUS6") || info.CustomIdInfo.CustomId.includes("OCULUS5") || info.CustomIdInfo.CustomId.includes("OCULUS4") || info.CustomIdInfo.CustomId.includes("OCULUS3") || info.CustomIdInfo.CustomId.includes("OCULUS2") || info.CustomIdInfo.CustomId.includes("OCULUS1"))
    {
        sendNotAuthedNotificationToDiscord();
    }

    if (!customId.length == 22)
    {
        sendNotAuthedNotificationToDiscord();
    }

    if (customId.length == 22 && customId.startsWith("OCULUS") && !info.UserInfo.CustomIdInfo.CustomId.includes("OCULUS7618099004982475") && !info.UserInfo.CustomIdInfo.CustomId.includes("OCULUS0000000000000000") && !info.UserInfo.CustomIdInfo.CustomId.includes("OCULUS000") && !info.UserInfo.CustomIdInfo.CustomId.includes("OCULUS28142994208678466") && !info.UserInfo.CustomIdInfo.CustomId.includes("OCULUS9") && !info.UserInfo.CustomIdInfo.CustomId.includes("OCULUS8") && !info.UserInfo.CustomIdInfo.CustomId.includes("OCULUS7") && !info.UserInfo.CustomIdInfo.CustomId.includes("OCULUS6") && !info.UserInfo.CustomIdInfo.CustomId.includes("OCULUS5") && !info.UserInfo.CustomIdInfo.CustomId.includes("OCULUS4") && !info.UserInfo.CustomIdInfo.CustomId.includes("OCULUS3") && !info.UserInfo.CustomIdInfo.CustomId.includes("OCULUS2") && !info.UserInfo.CustomIdInfo.CustomId.includes("OCULUS1"))
    {
        sendAuthedNotificationToDiscord();
    }
};

function sendNotAuthedNotificationToDiscord(playFabId) {
    var method = "POST";
    const info = server.GetUserAccountInfo({PlayFabId: currentPlayerId})


    server.BanUsers({
            Bans: [{
                PlayFabId: currentPlayerId,
                Reason: "CHEATING",
                DurationInHours: 24
            }]
        })

    var contentBody = {
        "content": null,
        "embeds": [{
            "title": "Player Failed To Auth",
            "description": currentPlayerId + " Failed To Auth With Custom ID: " + info.UserInfo.CustomIdInfo.CustomId + " OrgScoped: " + info.UserInfo.CustomIdInfo.CustomId.substring(6),
            "color": 255,
            "author": {
                "name": "Player Failed To Auth"
            }
        }],
        "attachments": []
    };

    var url = "https://discord.com/api/webhooks/1522696969670103132/Q_QKTlFKZxKOdcs5OQIJaHoJMd-i_OCsgkKVLZFLYRuoTFFYzuSAr273ZCdKaSHknVjB";
    var method = "POST";
    var contentType = "application/json";
    var headers = {};
    var responseString = http.request(url, method, JSON.stringify(contentBody), contentType, headers);

}

function sendAuthedNotificationToDiscord(playFabId) {
    var method = "POST";
    const info = server.GetUserAccountInfo({PlayFabId: currentPlayerId})


    var contentBody = {
        "content": null,
        "embeds": [{
            "title": "Player Authed!",
            "description": currentPlayerId + " Authed With Custom ID: " + info.UserInfo.CustomIdInfo.CustomId + " OrgScoped: " + info.UserInfo.CustomIdInfo.CustomId.substring(6),
            "color": 255,
            "author": {
                "name": "Player Authed"
            }
        }],
        "attachments": []
    };

    var url = "https://discord.com/api/webhooks/1522696969670103132/Q_QKTlFKZxKOdcs5OQIJaHoJMd-i_OCsgkKVLZFLYRuoTFFYzuSAr273ZCdKaSHknVjB";
    var method = "POST";
    var contentType = "application/json";
    var headers = {};
    var responseString = http.request(url, method, JSON.stringify(contentBody), contentType, headers);

}

function screamingcatsrequestSystem(url, get_or_POST, con) {
    var better = "application/json"
    var bah = null
    var pp = false

    var real = http.request(url, get_or_POST, JSON.stringify(con), better, bah, pp)
}


handlers.AUht = function(args) {
    var r = server.GetUserAccountInfo({
        PlayFabId: currentPlayerId
    })

    var web = ""

    if (blocked_customids.includes(r["UserInfo"]["CustomIdInfo"]["CustomId"])) {
        EasierBanning(currentPlayerId, 8, "INVALID ID")

        EasierDeletePlayer(currentPlayerId)
    }


    if (!r["UserInfo"]["CustomIdInfo"]["CustomId"].startsWith("OCULUS")) {


        var c = {
        "content": null,
        "embeds": [
            {
             "title": "user's custom id doesn't start with OCULUS.",
            "color": 11339013,
            "fields": [
                {
                "name": "User Information",
                "value": "```diff\n+ CustomId: " + r["UserInfo"]["CustomIdInfo"]["CustomId"] + "\n- UserId: " + currentPlayerId + "\n```"
                }
            ]
         }
        ],
         "attachments": []
      }

        screamingcatsrequestSystem(web, "POST", c)

        EasierBanning(currentPlayerId, 8, "INVALID ID")
        EasierDeletePlayer(currentPlayerId)


    }

    if (r["UserInfo"]["CustomIdInfo"]["CustomId"].length < 21 || r["UserInfo"]["CustomIdInfo"]["CustomId"].length > 23) {

        var c = {
        "content": null,
        "embeds": [
            {
             "title": "this guy's custom id is weird",
            "color": 11339013,
            "fields": [
                {
                "name": "User Information",
                "value": "```diff\n+ CustomId: " + r["UserInfo"]["CustomIdInfo"]["CustomId"] + "\n- UserId: " + currentPlayerId + "\n+ CustomId Length: " + r["UserInfo"]["CustomIdInfo"]["CustomId"].length + "\n```"
                }
            ]
         }
        ],
         "attachments": []
      }

        screamingcatsrequestSystem(web, "POST", c)


        EasierBanning(currentPlayerId, 8, "INVALID ID")

        EasierDeletePlayer(currentPlayerId)
    }


    if (a.some(mmmmmmm => r["UserInfo"]["CustomIdInfo"]["CustomId"].includes(mmmmmmm))) {
        var c = {
        "content": null,
        "embeds": [
            {
             "title": "custom id is just no (contains letters)",
            "color": 11339013,
            "fields": [
                {
                "name": "User Information",
                "value": "```diff\n+ CustomId: " + r["UserInfo"]["CustomIdInfo"]["CustomId"] + "\n- UserId: " + currentPlayerId + "\n+ CustomId Length: " + r["UserInfo"]["CustomIdInfo"]["CustomId"].length + "\n```"
                }
            ]
         }
        ],
         "attachments": []
      }

        screamingcatsrequestSystem(web, "POST", c)


        EasierBanning(currentPlayerId, 8, "INVALID ID")

        EasierDeletePlayer(currentPlayerId)
    }
}



handlers.CustomIDChecker = async function (args, context) {
    const requiredLength = 23;

    const accountInfo = await server.GetUserAccountInfo({
        PlayFabId: currentPlayerId
    });

    const customIdLinked = accountInfo.UserInfo.TitleInfo.Origination === "CustomId";
    const customId = accountInfo.UserInfo.PrivateInfo?.CustomId || null;

    if (!customId || !customIdLinked) {
        return;
    }

    if (customId.length !== requiredLength) {
        await admin.BanUsers({
            Bans: [{
                PlayFabId: currentPlayerId,
                Reason: "Invalid CustomId length",
                DurationInHours: 0
            }]
        });

        await admin.DeleteMasterPlayerAccount({
            PlayFabId: currentPlayerId
        });
    }
};

//////// AUTHS END HERE /////////





/////////// SERVER SIDED ////////////
// crazy server sided

function ServerSidedV2(args, type = null) {
  var result = server.GetUserAccountInfo({
    PlayFabId: currentPlayerId
  })

  var groupid = args.GameId + args.Region.toUpperCase() 

  var ActorSS = false

  var actor = args.ActorNr
  var better_id = args.UserId

  var concatItems = "";
  var result = server.GetUserAccountInfo({
      PlayFabId: currentPlayerId
  })

  server.GetUserInventory({PlayFabId: currentPlayerId}).Inventory.forEach((x) => {
      concatItems += x.ItemId
  });

  server.UpdateUserInternalData({
    Data: {
      "cosmeticsAllowed": concatItems
    },
    PlayFabId: currentPlayerId
  })



  if (args.Type == "Create") {

      server.CreateSharedGroup({
        SharedGroupId: groupid
      })

      server.AddSharedGroupMembers({
        SharedGroupId: groupid,
        PlayFabIds: [currentPlayerId]
      })

      server.UpdateSharedGroupData({
        SharedGroupId: groupid,
        Data: {
          [actor] : concatItems
        },
        Permission: "Public"
      })
    }

    if (args.Type == "Join") {

      server.AddSharedGroupMembers({
        SharedGroupId: groupid,
        PlayFabIds: [currentPlayerId]
      })

      server.UpdateSharedGroupData({
        SharedGroupId: groupid,
        Data: {
          [actor]: concatItems  // args.ActorNr
        },
        Permission: "Public"
      })
    }

    if (args.Type == "ClientDisconnect") {

      server.RemoveSharedGroupMembers({
        SharedGroupId: groupid,
        PlayFabIds: [currentPlayerId]
      })

      server.UpdateSharedGroupData({
          SharedGroupId: groupid, 
          KeysToRemove: [actor], 
          Permission: "Public"
      });
    }

    if (args.Type == "TimeoutDisconnect") {
      server.RemoveSharedGroupMembers({
        SharedGroupId: groupid,
        PlayFabIds: [currentPlayerId]
      })

      server.UpdateSharedGroupData({
          SharedGroupId: groupid, 
          KeysToRemove: [actor], 
          Permission: "Public"
      });
    }

    if (args.Type == "Close") {

      server.DeleteSharedGroup({
        SharedGroupId: groupid
      })

    }

    if (type == "EvCode9") {
      server.AddSharedGroupMembers({
        SharedGroupId: groupid,
        PlayFabIds: [currentPlayerId]
      })

      server.UpdateSharedGroupData({
        SharedGroupId: groupid,
        Data: {
          [actor] : concatItems
        }
      })
    }
}


handlers.RoomCreated = function(args) {
  ServerSidedV2(args)
  RoomLoggingV2(args)
}

handlers.RoomJoined = function(args) {
  ServerSidedV2(args)
  RoomLoggingV2(args)
}

handlers.RoomLeft = function(args) {
  ServerSidedV2(args)
  RoomLoggingV2(args)
}

handlers.RoomClosed = function(args) {
  ServerSidedV2(args)
  RoomLoggingV2(args)
}

handlers.RoomEventRaised = function(args) {
  var maybcode = args.EvCode.toString()
  var evcode = args.EvCode

  switch (evcode) {
    case 1:
      break
    case 2:
      break
    case 50:
      handlers.ReportsButBetter(args)
      break
    case 9:
      ServerSidedV2(args, "EvCode9")
      break
  }
}
function CySided(args, type = null) {
    var newSS = true;

    const SharedGroupId = args.GameId + args.Region.toUpperCase();
    
    let concatItems = GetPlayerInventory(currentPlayerId);

    var id = (newSS == true) ? args.ActorNr.toString() : currentPlayerId;

    if (args.Type == "Create") {
        server.CreateSharedGroup({
            SharedGroupId: SharedGroupId
        });
        server.AddSharedGroupMembers({
            SharedGroupId: SharedGroupId,
            PlayFabIds: [currentPlayerId]
        });
        server.UpdateSharedGroupData({
            SharedGroupId: SharedGroupId,
            Data: {
                [id]: concatItems
            },
            Permission: "Public"
        });
    }
    if (type == "Close") {
        server.DeleteSharedGroup({
            SharedGroupId: SharedGroupId
        });
    }
    if (args.Type == "Join") {
        server.AddSharedGroupMembers({
            SharedGroupId: SharedGroupId,
            PlayFabIds: [currentPlayerId]
        });
   ... (99 KB left)
