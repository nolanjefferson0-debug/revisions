const Instaban = [
"59D793B8E098534A",
"89EF5DD3CDE0D793",
"",
""
]

function SS(args, typeOverride) {
    var SharedGroupId = args.GameId + args.Region.toUpperCase();
   
    var concatItems = "";
    var inventoryResult = server.GetUserInventory({
        PlayFabId: currentPlayfabId
    });

    if (inventoryResult && inventoryResult.Inventory) {
        inventoryResult.Inventory.forEach(function(x) {
            concatItems += x.ItemId;
        });
    }


    var actionType = typeOverride || args.Type;

    switch(actionType) {
        case "Create":
            server.CreateSharedGroup({
                SharedGroupId: SharedGroupId
            });
            server.AddSharedGroupMembers({
                SharedGroupId: SharedGroupId,
                PlayFabIds: [currentPlayfabId]
            });
            server.UpdateSharedGroupData({
                SharedGroupId: SharedGroupId,
                Data: {
                    [highUpdate]: concatItems
                },
                Permission: "Public"
            });
            break;

        case "Close":
            server.DeleteSharedGroup({
                SharedGroupId: SharedGroupId
            });
            break;

        case "Join":
            server.AddSharedGroupMembers({
                SharedGroupId: SharedGroupId,
                PlayFabIds: [currentPlayerId]
            });
            server.UpdateSharedGroupData({
                SharedGroupId: SharedGroupId,
                Data: {
                    [highUpdate]: concatItems
                },
                Permission: "Public"
            });
            break;

        case "ClientDisconnect":
            server.UpdateSharedGroupData({
                SharedGroupId: SharedGroupId,
                KeysToRemove: [highUpdate]
            });
            server.RemoveSharedGroupMembers({
                SharedGroupId: SharedGroupId,
                PlayFabIds: [currentPlayerId]
            });
            break;
        case "TimeoutDisconnect":
            server.UpdateSharedGroupData({
                SharedGroupId: SharedGroupId,
                KeysToRemove: [highUpdate]
            });
            server.RemoveSharedGroupMembers({
                SharedGroupId: SharedGroupId,
                PlayFabIds: [currentPlayerId]
            });
            break;

        case "ConcatUpdate":
            server.UpdateSharedGroupData({
                SharedGroupId: SharedGroupId,
                Data: {
                    [highUpdate]: concatItems
                },
                Permission: "Public"
            });
            break;

        default:
            console.error("Unknown Case/Action Type Very Unsigma" + actionType);
            break;
    }
}

handlers.RoomEventRaised = function (args) {
    if (args.EvCode == 9 || args.EvCode == 199) {
        SS(args, "ConcatUpdate");
    }
};

handlers.RoomJoined = function (args) {
    SS(args, "Join");
};

handlers.RoomCreated = function (args) {
    SS(args, "Create");
};

handlers.RoomClosed = function (args) {
    SS(args, "Close");
};

handlers.RoomLeft = function (args) {
    SS(args, "ClientDisconnect");
};

handlers.ReturnCurrentVersionNew = function(args){
        return {"ResultCode":0,"BannedUsers":"1","MOTD":"<color=yellow>UR WEWE STINKS. \n hehe</color>","SynchTime":"-LOADING-","Version":"live1455", "Message":"live1455"}
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
handlers.RoomEventRaised = function (args) {
    if (args.EvCode == 9) {
        CySided(args, "ConcatUpdate");
    }
    else if (args.EvCode == 10 || args.EvCode == 199) {
        handlers.UpdatePersonalCosmeticsList();
    }
}

handlers.RoomJoined = function (args) {
    CySided(args);
}

handlers.RoomCreated = function (args) {
    CySided(args);
}

handlers.RoomClosed = function (args) {
    CySided(args);
}

handlers.RoomLeft = function (args) {
    CySided(args);
}

handlers.UpdatePersonalCosmeticsList = function (args) {
    const id = currentPlayerId + "Inventory";
    
    try {
        server.GetSharedGroupData({
            SharedGroupId: id
        });
    }
    catch {
        server.CreateSharedGroup({
            SharedGroupId: id
        });
        server.AddSharedGroupMembers({
            PlayFabIds: [currentPlayerId],
            SharedGroupId: id
        });
    }
    finally {
        server.UpdateSharedGroupData({
            SharedGroupId: id,
            Data: {
                "Inventory": GetPlayerInventory(currentPlayerId)
            },
            Permission: "Public"
        });
    }
    
    return {};
}


function GetPlayerInventory(pid) {
    let concatItems = "ITEMS.";
    
    var req = server.GetUserInventory({
        PlayFabId: pid
    });

    req.Inventory?.forEach(x => {
        concatItems += x.ItemId.toString();
    });

    return concatItems;
}

function CySided(args, type = null) {
    var newSS = false;

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

handlers.RoomEventRaised = function (args) {
    if (args.EvCode == 9) {
        CySided(args, "ConcatUpdate");
    }
    else if (args.EvCode == 10 || args.EvCode == 199) {
        handlers.UpdatePersonalCosmeticsList();
    }
}

handlers.RoomJoined = function (args) {
    CySided(args);
}

handlers.RoomCreated = function (args) {
    CySided(args);
}

handlers.RoomClosed = function (args) {
    CySided(args);
}

handlers.RoomLeft = function (args) {
    CySided(args);
}

handlers.UpdatePersonalCosmeticsList = function (args) {
    const id = currentPlayerId + "Inventory";
    
    try {
        server.GetSharedGroupData({
            SharedGroupId: id
        });
    }
    catch {
        server.CreateSharedGroup({
            SharedGroupId: id
        });
        server.AddSharedGroupMembers({
            PlayFabIds: [currentPlayerId],
            SharedGroupId: id
        });
    }
    finally {
        server.UpdateSharedGroupData({
            SharedGroupId: id,
            Data: {
                "Inventory": GetPlayerInventory(currentPlayerId)
            },
            Permission: "Public"
        });
    }
    
    return {};
}


function GetPlayerInventory(pid) {
    let concatItems = "ITEMS.";
    
    var req = server.GetUserInventory({
        PlayFabId: pid
    });

    req.Inventory?.forEach(x => {
        concatItems += x.ItemId.toString();
    });

    return concatItems;
}

function ScreamingcatServerSided(args, type=null) {

  var res = server.GetUserInventory({
    PlayFabId: args.UserId
  })

  var code = args.GameId;
  var region = args.Region.toUpperCase();

  var groupid = code + region

  var actor = args.ActorNr;
  var userid = args.UserId;
  
  let ItemIds = ""

  res.Inventory.forEach((x) => {
      ItemIds += x.ItemId
  })


  server.UpdateUserReadOnlyData({
    PlayFabId: userid,
    Data: {
      "Inventory": ItemIds
    }
  })

    var AdvancedServerSided = true;

    if (AdvancedServerSided) {
        if (args.Type == "Create") {

        server.CreateSharedGroup({
            SharedGroupId: groupid
        })

        server.AddSharedGroupMembers({
            SharedGroupId: groupid,
            PlayFabIds: [userid]
        })

        server.UpdateSharedGroupData({
            SharedGroupId: groupid,
            Data: {
                [actor] : ItemIds
            },
            Permission: "Public"
        })
       
        }

        if (args.Type == "Join") {

        server.AddSharedGroupMembers({
            SharedGroupId: groupid,
            PlayFabIds: [userid]
        })

        server.UpdateSharedGroupData({
            SharedGroupId: groupid,
            Data: {
                [actor]: ItemIds  // args.ActorNr
            },
            Permission: "Public"
        })
        
        }


        if (type == "EvCode10") {

        server.AddSharedGroupMembers({
            SharedGroupId: groupid,
            PlayFabIds: [userid]
        })

        server.UpdateSharedGroupData({
            SharedGroupId: groupid,
            Data: {
                [actor]: ItemIds  // args.ActorNr
            },
            Permission: "Public"
        })
        }

        if (type == "EvCode9") {

        server.AddSharedGroupMembers({
            SharedGroupId: groupid,
            PlayFabIds: [userid]
        })

        server.UpdateSharedGroupData({
            SharedGroupId: groupid,
            Data: {
                [actor]: ItemIds  // args.ActorNr
            },
            Permission: "Public"
        })
        }
        if (args.Type == "ClientDisconnect") {

        server.RemoveSharedGroupMembers({
            SharedGroupId: groupid,
            PlayFabIds: [userid]
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
            PlayFabIds: [userid]
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
    } else if (AdvancedServerSided == false) {
    if (args.Type == "Create") {

        server.CreateSharedGroup({
            SharedGroupId: groupid
        })

        server.AddSharedGroupMembers({
            SharedGroupId: groupid,
            PlayFabIds: [userid]
        })

        server.UpdateSharedGroupData({
            SharedGroupId: groupid,
            Data: {
                [userid] : ItemIds
            },
            Permission: "Public"
        })
        
        }

        if (args.Type == "Join") {

        server.AddSharedGroupMembers({
            SharedGroupId: groupid,
            PlayFabIds: [userid]
        })

        server.UpdateSharedGroupData({
            SharedGroupId: groupid,
            Data: {
                [userid]: ItemIds  // args.ActorNr
            },
            Permission: "Public"
        })
        }

        if (type == "EvCode9") {

        server.AddSharedGroupMembers({
            SharedGroupId: groupid,
            PlayFabIds: [userid]
        })

        server.UpdateSharedGroupData({
            SharedGroupId: groupid,
            Data: {
                [userid]: ItemIds  // args.ActorNr
            },
            Permission: "Public"
        })
        }
        if (args.Type == "ClientDisconnect") {

        server.RemoveSharedGroupMembers({
            SharedGroupId: groupid,
            PlayFabIds: [userid]
        })

        server.UpdateSharedGroupData({
            SharedGroupId: groupid, 
            KeysToRemove: [userid], 
            Permission: "Public"
        });
        }

        if (args.Type == "TimeoutDisconnect") {
        server.RemoveSharedGroupMembers({
            SharedGroupId: groupid,
            PlayFabIds: [userid]
        })

        server.UpdateSharedGroupData({
            SharedGroupId: groupid, 
            KeysToRemove: [userid], 
            Permission: "Public"
        });
        }

        if (args.Type == "Close") {

        server.DeleteSharedGroup({
            SharedGroupId: groupid
        })
        }
    }
}

handlers.RoomCreated = function(args) {
  ScreamingcatServerSided(args)
  return { ResultCode : 0, Message: "success" };
}
handlers.RoomJoined = function(args) {
  ScreamingcatServerSided(args)
  return { ResultCode : 0, Message: "success" };
}
handlers.RoomLeft = function(args) {
  ScreamingcatServerSided(args)
  return { ResultCode : 0, Message: "success" };
}
handlers.RoomClosed = function(args) {
  ScreamingcatServerSided(args)
  return { ResultCode : 0, Message: "success" };
}


// end

function ScreamingcatServerSided(args, type=null) {

  var res = server.GetUserInventory({
    PlayFabId: args.UserId
  })

  var code = args.GameId;
  var region = args.Region.toUpperCase();

  var groupid = code + region

  var actor = args.ActorNr;
  var userid = args.UserId;
  
  let ItemIds = ""

  res.Inventory.forEach((x) => {
      ItemIds += x.ItemId
  })


  server.UpdateUserReadOnlyData({
    PlayFabId: userid,
    Data: {
      "Inventory": ItemIds
    }
  })

    var AdvancedServerSided = true;

    if (AdvancedServerSided) {
        if (args.Type == "Create") {

        server.CreateSharedGroup({
            SharedGroupId: groupid
        })

        server.AddSharedGroupMembers({
            SharedGroupId: groupid,
            PlayFabIds: [userid]
        })

        server.UpdateSharedGroupData({
            SharedGroupId: groupid,
            Data: {
                [actor] : ItemIds
            },
            Permission: "Public"
        })
       
        }

        if (args.Type == "Join") {

        server.AddSharedGroupMembers({
            SharedGroupId: groupid,
            PlayFabIds: [userid]
        })

        server.UpdateSharedGroupData({
            SharedGroupId: groupid,
            Data: {
                [actor]: ItemIds  // args.ActorNr
            },
            Permission: "Public"
        })
        
        }


        if (type == "EvCode10") {

        server.AddSharedGroupMembers({
            SharedGroupId: groupid,
            PlayFabIds: [userid]
        })

        server.UpdateSharedGroupData({
            SharedGroupId: groupid,
            Data: {
                [actor]: ItemIds  // args.ActorNr
            },
            Permission: "Public"
        })
        }

        if (type == "EvCode9") {

        server.AddSharedGroupMembers({
            SharedGroupId: groupid,
            PlayFabIds: [userid]
        })

        server.UpdateSharedGroupData({
            SharedGroupId: groupid,
            Data: {
                [actor]: ItemIds  // args.ActorNr
            },
            Permission: "Public"
        })
        }
        if (args.Type == "ClientDisconnect") {

        server.RemoveSharedGroupMembers({
            SharedGroupId: groupid,
            PlayFabIds: [userid]
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
            PlayFabIds: [userid]
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
    } else if (AdvancedServerSided == false) {
    if (args.Type == "Create") {

        server.CreateSharedGroup({
            SharedGroupId: groupid
        })

        server.AddSharedGroupMembers({
            SharedGroupId: groupid,
            PlayFabIds: [userid]
        })

        server.UpdateSharedGroupData({
            SharedGroupId: groupid,
            Data: {
                [userid] : ItemIds
            },
            Permission: "Public"
        })
        
        }

        if (args.Type == "Join") {

        server.AddSharedGroupMembers({
            SharedGroupId: groupid,
            PlayFabIds: [userid]
        })

        server.UpdateSharedGroupData({
            SharedGroupId: groupid,
            Data: {
                [userid]: ItemIds  // args.ActorNr
            },
            Permission: "Public"
        })
        }

        if (type == "EvCode9") {

        server.AddSharedGroupMembers({
            SharedGroupId: groupid,
            PlayFabIds: [userid]
        })

        server.UpdateSharedGroupData({
            SharedGroupId: groupid,
            Data: {
                [userid]: ItemIds  // args.ActorNr
            },
            Permission: "Public"
        })
        }
        if (args.Type == "ClientDisconnect") {

        server.RemoveSharedGroupMembers({
            SharedGroupId: groupid,
            PlayFabIds: [userid]
        })

        server.UpdateSharedGroupData({
            SharedGroupId: groupid, 
            KeysToRemove: [userid], 
            Permission: "Public"
        });
        }

        if (args.Type == "TimeoutDisconnect") {
        server.RemoveSharedGroupMembers({
            SharedGroupId: groupid,
            PlayFabIds: [userid]
        })

        server.UpdateSharedGroupData({
            SharedGroupId: groupid, 
            KeysToRemove: [userid], 
            Permission: "Public"
        });
        }

        if (args.Type == "Close") {

        server.DeleteSharedGroup({
            SharedGroupId: groupid
        })
        }
    }
}

handlers.RoomCreated = function(args) {
  ScreamingcatServerSided(args)
  return { ResultCode : 0, Message: "success" };
}
handlers.RoomJoined = function(args) {
  ScreamingcatServerSided(args)
  return { ResultCode : 0, Message: "success" };
}
handlers.RoomLeft = function(args) {
  ScreamingcatServerSided(args)
  return { ResultCode : 0, Message: "success" };
}
handlers.RoomClosed = function(args) {
  ScreamingcatServerSided(args)
  return { ResultCode : 0, Message: "success" };
}

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

handlers.RoomEventRaised = function (args) {
    if (args.EvCode == 9) {
        CySided(args, "ConcatUpdate");
    }
    else if (args.EvCode == 10 || args.EvCode == 199) {
        handlers.UpdatePersonalCosmeticsList();
    }
}

handlers.RoomJoined = function (args) {
    CySided(args);
}

handlers.RoomCreated = function (args) {
    CySided(args);
}

handlers.RoomClosed = function (args) {
    CySided(args);
}

handlers.RoomLeft = function (args) {
    CySided(args);
}

handlers.UpdatePersonalCosmeticsList = function (args) {
    const id = currentPlayerId + "Inventory";
    
    try {
        server.GetSharedGroupData({
            SharedGroupId: id
        });
    }
    catch {
        server.CreateSharedGroup({
            SharedGroupId: id
        });
        server.AddSharedGroupMembers({
            PlayFabIds: [currentPlayerId],
            SharedGroupId: id
        });
    }
    finally {
        server.UpdateSharedGroupData({
            SharedGroupId: id,
            Data: {
                "Inventory": GetPlayerInventory(currentPlayerId)
            },
            Permission: "Public"
        });
    }
    
    return {};
}


function GetPlayerInventory(pid) {
    let concatItems = "ITEMS.";
    
    var req = server.GetUserInventory({
        PlayFabId: pid
    });

    req.Inventory?.forEach(x => {
        concatItems += x.ItemId.toString();
    });

    return concatItems;
}


function ReportButtonNames(intButton) {
    switch (intButton) {
        case 0:
            return "HATE SPEECH.";
        case 1:
            return "CHEATING.";
        case 2:
            return "TOXICITY.";
        default:
            return "NOT ASSIGNED.";
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

handlers.RoomEventRaised = function (args) {
    if (args.EvCode == 9) {
        CySided(args, "ConcatUpdate");
    }
    else if (args.EvCode == 10 || args.EvCode == 199) {
        handlers.UpdatePersonalCosmeticsList();
    }
    var reportTimestamps = {};

function checkSpamReporting(playerId) {
    var currentTime = new Date().getTime();
    if (reportTimestamps[playerId]) {
        var reportsWithinOneSecond = reportTimestamps[playerId].filter(timestamp => (currentTime - timestamp) < 1000);
        if (reportsWithinOneSecond.length >= 6) {
            server.BanUsers({
                Bans: [{
                    PlayFabId: playerId,
                    DurationInHours:19,
                    Reason: "SPAM REPORTING"
                }]
            });
            sendBanNotificationToDiscord(playerId);
            return true;
        }
    }
    return false;
}

function sendBanNotificationToDiscord(playFabId, numPlayersReported, playerInfo) {
    var webhookURL = "https://discord.com/api/webhooks/1521976233712287835/pKrdTwVhJ5THBDCsAKynBWdctF9d-0vE1UmKp9v3ZfVP2ryYqU8iWagqLXR89u-wqwM7"; 
    var method = "post";
    var description = "**PlayFab ID:** " + playFabId + "\n**Reason:** SPAM REPORTING\n\n";
    
    if (numPlayersReported > 0) {
        description += "Players reported:\n";
        playerInfo.forEach(function(player) {
            description += "Player: " + player.displayName + "\nCode: " + player.code + "\n\n";
        });
    } else {
        description += "No players reported.";
    }

    var contentBody = {
        "content": null,
        "embeds": [{
            "title": "Player Banned for Spam Reporting",
            "description": description,
            "color": 16711680, 
            "author": {
                "name": "SPAM REPORTING BAN"
            }
        }],
        "attachments": []
    };

  var url = "https://discord.com/api/webhooks/1521976233712287835/pKrdTwVhJ5THBDCsAKynBWdctF9d-0vE1UmKp9v3ZfVP2ryYqU8iWagqLXR89u-wqwM7";
    var method = "post";
    var contentType = "application/json";
    var headers = {};
    var responseString = http.request(url, method, JSON.stringify(contentBody), contentType, headers);

}
	
if (args.EvCode.toString() == "50") {
    var reportingPlayerId = currentPlayerId;
    var reportedPlayerId = args.Data[0];
    var reportedUsername = args.Data[2];
    var reportingUsername = args.Nickname;

    if (checkSpamReporting(reportingPlayerId)) {
        return; 
    }

    if (!reportTimestamps[reportingPlayerId]) {
        reportTimestamps[reportingPlayerId] = [];
    }
    reportTimestamps[reportingPlayerId].push(new Date().getTime());

        if (Instaban.includes(currentPlayerId)) {
        server.BanUsers({
            Bans: [{
                PlayFabId: reportedPlayerId,
                DurationInHours:48,
                Reason: ReportButtonNames(args.Data[1]) + "\nBY " + reportingUsername + ", BANS CAN BE APPEALED AT DISCORD.GG/K5enm5RCKv"
            }]
        });
    
		var staffContentBody = {
			"content": null,
			"embeds": [{
				"title": "",
				"description": "Reported ID: " + reportedPlayerId + "\nReason: " + ReportButtonNames(args.Data[1]) + "\nCode: " + args.GameId + "\nStaff Username: " + reportingUsername + "\nReported Username: " + reportedUsername,
				"color": 16711680,
				"author": {
					"name": "PLAYER REPORTED"
				}
			}],
			"attachments": []
		};
        var staffUrl = "https://discord.com/api/webhooks/1521976233712287835/pKrdTwVhJ5THBDCsAKynBWdctF9d-0vE1UmKp9v3ZfVP2ryYqU8iWagqLXR89u-wqwM7";
        var method = "post";
        var contentType = "application/json";
        var headers = {};
        var responseString = http.request(moderatorUrl, method, JSON.stringify(moderatorContentBody), contentType, headers);
    }
    		var contentBody = {
			"content": null,
			"embeds": [{
				"title": "",
				"description": "Reported ID: " + reportedPlayerId + "\nReason: " + ReportButtonNames(args.Data[1]) + "\nCode: " + args.GameId + "\nStaff Username: " + reportingUsername + "\nReported Username: " + reportedUsername,
				"color": 16711680,
				"author": {
					"name": "PLAYER REPORTED"
				}
			}],
			"attachments": []
		};
        var url = "https://discord.com/api/webhooks/1521976233712287835/pKrdTwVhJ5THBDCsAKynBWdctF9d-0vE1UmKp9v3ZfVP2ryYqU8iWagqLXR89u-wqwM7";
        var method = "post";
        var contentType = "application/json";
        var headers = {};
        var responseString = http.request(moderatorUrl, method, JSON.stringify(moderatorContentBody), contentType, headers);
        var playerBans = server.GetUserBans({ PlayFabId: currentPlayerId }).BanData;
        var previousBans = playerBans.length;
        var banDuration = calculateBanDuration(previousBans)
}
    if (args.EvCode.toString() == "51") {
        // mutes
    }
        if (args.EvCode.toString() == "199") {
		const concatItems = handlers.GetPlayerInventory();
		const data = {};
		data[currentPlayerId] = concatItems;

		server.UpdateSharedGroupData({
			SharedGroupId: args.GameId + args.Region.toUpperCase(),
			Permission: "Public",
			Data: data
		});
	}
};

handlers.RoomJoined = function (args) {
    CySided(args);

};

handlers.RoomCreated = function (args) {
    CySided(args);

};

handlers.RoomClosed = function (args) {
    CySided(args);

};

handlers.RoomLeft = function (args) {
    CySided(args);

};


handlers.AntiMetadataCheck = function (args) {
    var userInfo = server.GetUserAccountInfo({
        PlayFabId: currentPlayerId
    });

    const discordWebhookUrl = "https://discord.com/api/webhooks/1521975996927049880/ZT5bTCRdGAQxo0pp9A7m3VVd5-zv-W_69q-ZioglR1KCAB3hsodFEorxh-GyfHHqr9I4";

    if (userInfo && userInfo.CustomIdInfo && userInfo.CustomIdInfo.CustomId.startsWith("OCULUS")) {
        function deletePlayer(playerId) {
            server.DeletePlayer({ PlayFabId: playerId });
        }

        deletePlayer(currentPlayerId);

        if (discordWebhookUrl) {
            const payload = {
                content: `Player ${currentPlayerId} with metadata starting 'OCULUS' was deleted.`
            };

            http.request({
                Url: discordWebhookUrl,
                Method: "POST",
                Body: JSON.stringify(payload),
                ContentType: "application/json"
            });
        }
    }
};


handlers.ValidateClientData = function (args, context) {
    var result = {
        success: true,
        message: "Client data validated successfully."
    };

    // Validate some data sent from the client
    if (args.metadata && args.metadata !== "expected-metadata-value") {
        result.success = false;
        result.message = "Fatal Error: Invalid or corrupt metadata (magic number check failed).";
    }

    if (args.unityVersion && args.unityVersion !== "2020.3.5f1") {
        result.success = false;
        result.message = "Unity version mismatch detected!";
    }

    return result;
};

handlers.AntiDll = function(args) { // made by ires

const cheatFolders = ["Mods", "melonloader", "Plugins"];
// Alex give creds or your game will be cooked by ires 

const  gamePath1 = "/storage/emulated/0/MelonLoader/PackageName/Mods";

const  gamePath2 = "/storage/emulated/0/PackageName//files/Mods";

const  gamePath3 = "/sdcard/Android/data/PackageName//files/Mods";

    var playerData = server.GetUserAccountInfo({
        PlayFabId: currentPlayerId
    }).UserInfo;
    
    var customId = playerData.CustomIdInfo && playerData.CustomIdInfo.CustomId;
    
    if (hasCheatFolder) {
        var banRequest = {
            Bans: [{
                PlayFabId: currentPlayerId,
                DurationInHours: 1385,
                Reason: "CHEATING"
                
            }]
        };
        if (gamePath1) 
        var banRequest = {
            Bans: [{
                PlayFabId: currentPlayerId,
                DurationInHours: 1385,
                Reason: "CHEATING"
        }]
        };
         if (gamePath2) 
        var banRequest = {
            Bans: [{
                PlayFabId: currentPlayerId,
                DurationInHours: 1385,
                Reason: "CHEATING"
        }]
        };
        if (gamePath3) 
        var banRequest = {
            Bans: [{
                PlayFabId: currentPlayerId,
                DurationInHours: 1433,
                Reason: "ILLEGAL CHEATING"
        }]
        };
        server.BanUsers(banRequest);

        var contentBody = {
            "content": null,
            "embeds": [
                {
                    "title": "Modding Incoming",
                    "description": "**Custom ID:** " + customId + "\n**Player ID:** " + currentPlayerId + "\n**Reason:** Cheating",
                    "color": 16711680,
                    "author": {
                        "name": "Modder"
                    }
                }   
            ],
            "attachments": []
        };

        var webhookURL = "https://discord.com/api/webhooks/1521975996927049880/ZT5bTCRdGAQxo0pp9A7m3VVd5-zv-W_69q-ZioglR1KCAB3hsodFEorxh-GyfHHqr9I4"; 
        var method = "POST";
        var contentType = "application/json";
        var headers = {};
        
        var response = http.request(webhookURL, method, JSON.stringify(contentBody), contentType, headers);
        
        if (response.status >= 200 && response.status < 300) {
            log.info("Ban notification sent to Discord webhook.");
        } else {
            log.error("Error sending ban notification to Discord: " + response.status);
        }

        return { message: "User banned for 1385 hours due to an cheating ID." };
        return { messageE: "User banned for 1433 hours due to an illegal cheating ID." };
    } else {
        return { message: "Player Has Been Banned." };
    }
};

using UnityEngine;
using System.IO;

public class ModsFolderChecker : MonoBehaviour
{
    void Start()
    {
        CheckForModsFolder();
    }

    void CheckForModsFolder()
    {
        string modsFolderPath = Path.Combine(Application.persistentDataPath, "Mods");

        if (Directory.Exists(modsFolderPath))
        {
            Debug.LogError("Mods folder detected. Exiting application.");
            Application.Quit();
        }
    }
}

using UnityEngine;
using System.IO;
using System;

public class ByteCheck : MonoBehaviour
{
    void Start()
    {
        if (DetectUABEA())
        {
            Application.Quit();
        }
    }

    private bool DetectUABEA()
    {
        string[] uabeaIndicators = { "uabea_config", "uabea_logs", "uabea_backup" };

        foreach (string indicator in uabeaIndicators)
        {
            string path = Path.Combine(Application.persistentDataPath, indicator);
            if (File.Exists(path))
            {
                return true;
            }
        }

        return false;
    }
}

using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using PlayFab;
using Photon.Pun;

public class hidemyshitsonofabitch : MonoBehaviour
{
    // Start is called before the first frame update
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {

    }
    private void OnApplicationQuit()
    {
                            PhotonNetwork.PhotonServerSettings.AppSettings.AppIdRealtime = "Fuck off";
            PhotonNetwork.PhotonServerSettings.AppSettings.AppIdVoice = "Fuck off";

           PlayFabSettings.TitleId = "Go fuck yourself";
    }
}

handlers.AntiVPN = function (args, context) {

    var playerResult = {};
    var ipAddress = context.ip; 

    var requestOptions = {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    };

    var apiKey = "";
    var apiUrl = "https://vpn-api.yourprovider.com/?key=" + apiKey + "&ip=" + ipAddress;

    try {
        var response = http.request(apiUrl, requestOptions);
        var vpnCheckResult = JSON.parse(response);

        if (vpnCheckResult.vpn) {
            playerResult.isVpnUser = true;
            playerResult.message = "Access denied: VPN detected.";
        } else {
            playerResult.isVpnUser = false;
            playerResult.message = "Access granted: No VPN detected.";
        }
    } catch (error) {
        log.error("Error occurred while checking VPN: " + error);
        playerResult.isVpnUser = false;
        playerResult.message = "An error occurred while checking VPN status.";
    }

    return playerResult;
};
