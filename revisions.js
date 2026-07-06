const Instaban = [
"",
"",
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
                    DurationInHours:2,
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
    var webhookURL = "DISCORD_URL"; 
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

  var url = "DISCORD_URL";
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
        var staffUrl = "DISCORD_URL";
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
        var url = "DISCORD_URL";
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
