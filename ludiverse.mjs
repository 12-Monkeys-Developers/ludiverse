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

  CONFIG.Actor.documentClass = documents.LudiverseActor;
  CONFIG.Actor.dataModels = {
    pj: models.LudiversePJ,
    pnj: models.LudiversePNJ,
  };
  Actors.unregisterSheet("core", ActorSheet);
  Actors.registerSheet(SYSTEM.id, applications.PJSheet, { types: ["pj"], makeDefault: true });
  Actors.registerSheet(SYSTEM.id, applications.PNJSheet, { types: ["pnj"], makeDefault: true });
  
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

  game.settings.register("ludiverse", "univers_graphique", {
    name: "Selection de l'univers graphique",
    hint: "Choisissez l'univers pour l'aspect graphique des feuilles de personnage",
    scope: "world",
    config: true,
    default: "neutre",
    type: String,
    choices: {
      neutre: "Aspect neutre",
      steampunk: "Steampunk Belle Epoque",
      renaissance: "Renaissance fantastique",
      sf: "Science-fiction",
    },
    onChange: () => debouncedReload(),
  });
});

Hooks.once("ready", async function () {
  let aspect = game.settings.get("ludiverse", "univers_graphique");
  let r = document.querySelector(':root');
  switch (aspect) {
    case "renaissance":
      await r.style.setProperty("--font-pj-color", "black");
      await r.style.setProperty("--font-pj-name", "50px 'philosopher'");
      await r.style.setProperty("--font-pj-name-color", "#00508C");
      await r.style.setProperty("--background_pj", "no-repeat url('/systems/ludiverse/assets/background-renaissance.webp')");
      await r.style.setProperty("--font-pj-indications", "20px 'philosopher'");
      await r.style.setProperty("--font-pj-indications-color", "#00508C");
      await r.style.setProperty("--font-pj-titre", "30px 'philosopher'");
      await r.style.setProperty("--font-pj-titre-color", "#00508C");
      await r.style.setProperty("--font-pj-pv", "15px 'philosopher'");
      await r.style.setProperty("--font-pj-pv-color", "#885430");
      await r.style.setProperty("--font-pj-label", "15px 'philosopher'");
      await r.style.setProperty("--font-pj-label-color", "#00508C");
      await r.style.setProperty("--font-pj-comp-lbl-color", "#D0AB68");
      await r.style.setProperty("--font-pj-nb", "20px 'garamond'");
      await r.style.setProperty("--font-pj-nb-color", "black");
      break;
    case "sf":
      await r.style.setProperty("--font-pj-color", "white");
      await r.style.setProperty("--font-pj-name", "40px 'codebold'");
      await r.style.setProperty("--font-pj-name-color", "#FBB911");
      await r.style.setProperty("--background_pj", "no-repeat url('/systems/ludiverse/assets/background-sf.webp')");
      await r.style.setProperty("--font-pj-indications", "20px 'philosopher'");
      await r.style.setProperty("--font-pj-indications-color", "#F49C6A");
      await r.style.setProperty("--font-pj-titre", "30px 'codebold'");
      await r.style.setProperty("--font-pj-titre-color", "#FBB911");
      await r.style.setProperty("--font-pj-pv", "15px 'philosopher'");
      await r.style.setProperty("--font-pj-pv-color", "#885430");
      await r.style.setProperty("--font-pj-label", "15px 'philosopher'");
      await r.style.setProperty("--font-pj-label-color", "#F49C6A");
      await r.style.setProperty("--font-pj-comp-lbl-color", "#FBB911");
      await r.style.setProperty("--font-pj-nb", "20px 'garamond'");
      await r.style.setProperty("--font-pj-nb-color", "white");
      break;
    case "steampunk":
      await r.style.setProperty("--font-pj-color", "black");
      await r.style.setProperty("--font-pj-name", "50px 'ovidius'");
      await r.style.setProperty("--font-pj-name-color", "#24A59A");
      await r.style.setProperty("--background_pj", "no-repeat url('/systems/ludiverse/assets/background-sp.webp')");
      await r.style.setProperty("--font-pj-indications", "20px 'philosopher'");
      await r.style.setProperty("--font-pj-indications-color", "#885430");
      await r.style.setProperty("--font-pj-titre", "36px 'ovidius'");
      await r.style.setProperty("--font-pj-titre-color", "#24A59A");
      await r.style.setProperty("--font-pj-pv", "15px 'philosopher'");
      await r.style.setProperty("--font-pj-pv-color", "#885430");
      await r.style.setProperty("--font-pj-label", "15px 'philosopher'");
      await r.style.setProperty("--font-pj-label-color", "#24A59A");
      await r.style.setProperty("--font-pj-comp-lbl-color", "#4c4732");
      await r.style.setProperty("--font-pj-nb", "20px 'garamond'");
      await r.style.setProperty("--font-pj-nb-color", "black");
      break;
  }
  console.log("LUDIVERSE - Initialisation du système finie");

});

Hooks.once("i18nInit", function () {
  // Prélocalisation des objets de configuration
  preLocalizeConfig();
});

function preLocalizeConfig() {
  const localizeConfigObject = (obj, keys) => {
    for (let o of Object.values(obj)) {
      for (let k of keys) {
        o[k] = game.i18n.localize(o[k]);
      }
    }
  };

  localizeConfigObject(SYSTEM.DIFFICULTES, ["label"]);
}