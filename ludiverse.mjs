import { SYSTEM } from "./module/config/system.mjs";

globalThis.SYSTEM = SYSTEM;

// Import modules
import * as applications from "./module/applications/_module.mjs";
import * as dice from "./module/dice/_module.mjs";
import * as documents from "./module/documents/_module.mjs";
import * as models from "./module/data/_module.mjs";

Hooks.once("init", async function () {
  console.log(`LUDIVERSE - Initialisation du système...`);
  game.system.CONST = SYSTEM;

  CONFIG.Actor.documentClass =  documents.LudiverseActor;
  CONFIG.Actor.dataModels = {
    pj: models.LudiversePJ
  };
  Actors.unregisterSheet("core", ActorSheet);
  Actors.registerSheet(SYSTEM.id, applications.PJSheet, { types: ["pj"], makeDefault: true });
  // Dice system configuration
  
  CONFIG.Dice.rolls.push(dice.StandardCheck);

  Handlebars.registerHelper("times", function (n, block) {
    var accum = "";
    for (var i = 1; i <= n; ++i) {
      block.data.index = i;
      block.data.first = i === 0;
      block.data.last = i === n - 1;
      accum += block.fn(this);
    }
    return accum;
  });

});

Hooks.once("ready", async function () {
  console.log("LUDIVERSE - Initialisation du système fini");
});
