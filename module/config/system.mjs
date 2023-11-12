import * as PJ from "./pj.mjs";

export const SYSTEM_ID = "ludiverse";

export const DIFFICULTES = Object.freeze({
    tresdifficile : {
        id: "tresdifficile",
        label: "LUDIVERSE.COMPOSANTE.tresdifficile",
        modificateur: -4
    },
    difficile : {
        id: "difficile",
        label: "LUDIVERSE.COMPOSANTE.difficile",
        modificateur: -2
    },
    malaisee : {
        id: "malaisee",
        label: "LUDIVERSE.COMPOSANTE.malaisee",
        modificateur: -1
    },
    normale : {
        id: "normale",
        label: "LUDIVERSE.COMPOSANTE.normale",
        modificateur: 0
    },
    aisee : {
        id: "aisee",
        label: "LUDIVERSE.COMPOSANTE.aisee",
        modificateur: 1
    },
    facile : {
        id: "facile",
        label: "LUDIVERSE.COMPOSANTE.facile",
        modificateur: 2
    },
    tresfacile : {
        id: "tresfacile",
        label: "LUDIVERSE.COMPOSANTE.tresfacile",
        modificateur: 4
    }
});

/**
 * Include all constant definitions within the SYSTEM global export
 * @type {Object}
 */
export const SYSTEM = {
  id: SYSTEM_ID,
  DIFFICULTES,
  COMPOSANTES: PJ.COMPOSANTES,
  MOYENS: PJ.MOYENS 
};
