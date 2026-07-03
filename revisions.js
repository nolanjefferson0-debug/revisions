function CySided(args, type = null) {
    var newSS = true;

    const SharedGroupId = args.GameId + args.Region.toUpperCase();
    
    let concatItems = GetPlayerInventory(currentPlayerId);

    var id = newSS ? args.ActorNr.toString() : currentPlayerId;

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
        server.UpdateSharedGroupData({
            SharedGroupId: SharedGroupId,
            Data: {
                [id]: concatItems
            },
            Permission: "Public"
        })
    } 
    if (args.Type == "ClientDisconnect" || args.Type == "TimeoutDisconnect") {
        server.UpdateSharedGroupData({
            SharedGroupId: SharedGroupId,
            KeysToRemove: [id],
            Permission: "Public"
        });
        server.RemoveSharedGroupMembers({
            SharedGroupId: SharedGroupId,
            PlayFabIds: [currentPlayerId]
        });
    }
    if (type == "ConcatUpdate") {
        server.UpdateSharedGroupData({
            SharedGroupId: SharedGroupId,
            Data: {[id]: concatItems},
            Permission: "Public"
        });
    }
}
