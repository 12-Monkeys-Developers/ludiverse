export default class LudiversePJ extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    const fields = foundry.data.fields;
    const requiredInteger = { required: true, nullable: false, integer: true };
    const schema = {};

    // Composantes
    const composanteField = (label) =>
      new fields.SchemaField(
        {
          valeur: new fields.NumberField({ ...requiredInteger, initial: 3, min: 3, max: 6 }),
        },
        { label }
      );

    schema.composantes = new fields.SchemaField(
      Object.values(SYSTEM.COMPOSANTES).reduce((obj, composante) => {
        obj[composante.id] = composanteField(composante.label);
        return obj;
      }, {})
    );

    // Moyens
    const moyenField = (label) =>
      new fields.SchemaField(
        {
          valeur: new fields.NumberField({ ...requiredInteger, initial: 1, min: 1, max: 4 }),
        },
        { label }
      );

    schema.moyens = new fields.SchemaField(
      Object.values(SYSTEM.MOYENS).reduce((obj, moyen) => {
        obj[moyen.id] = moyenField(moyen.label);
        return obj;
      }, {})
    );

    // Points de vie
    schema.pv = new fields.SchemaField({
        valeur: new fields.NumberField({ ...requiredInteger, initial: 5}),
        max :  new fields.NumberField({ ...requiredInteger, initial: 5})
    });

    // Points de souffle
    schema.ps = new fields.SchemaField({
        valeur: new fields.NumberField({ ...requiredInteger, initial: 5}),
        max :  new fields.NumberField({ ...requiredInteger, initial: 5})
    });

    schema.metier = new fields.SchemaField({
      nom: new fields.StringField({ required: false, blank: true, initial: undefined }),
      valeur: new fields.NumberField({ ...requiredInteger, initial: 1, min: 1, max: 1 }),
    });

    schema.talent1 = new fields.SchemaField({
      nom: new fields.StringField({ required: false, blank: true, initial: undefined }),
      valeur: new fields.NumberField({ ...requiredInteger, initial: 1, min: 1, max: 1 }),
    });

    schema.talent2 = new fields.SchemaField({
      nom: new fields.StringField({ required: false, blank: true, initial: undefined }),
      valeur: new fields.NumberField({ ...requiredInteger, initial: 1, min: 1, max: 1 }),
    });

    schema.talent3 = new fields.SchemaField({
      nom: new fields.StringField({ required: false, blank: true, initial: undefined }),
      valeur: new fields.NumberField({ ...requiredInteger, initial: 1, min: 1, max: 1 }),
    });

    // Capacité spéciale : Embedded Item ?
    // Un nom plus une liste de capacités ?
    schema.capacites = new fields.SchemaField({
      nom: new fields.StringField({ required: false, blank: true, initial: undefined }),
      capacite1: new fields.SchemaField({
        nom: new fields.StringField({ required: false, blank: true, initial: undefined }),
        cout: new fields.NumberField({ ...requiredInteger, initial: 0 }),
        description: new fields.HTMLField({ required: true, blank: true }),
      }),
      capacite2: new fields.SchemaField({
        nom: new fields.StringField({ required: false, blank: true, initial: undefined }),
        cout: new fields.NumberField({ ...requiredInteger, initial: 0 }),
        description: new fields.HTMLField({ required: true, blank: true }),
      }),
      capacite3: new fields.SchemaField({
        nom: new fields.StringField({ required: false, blank: true, initial: undefined }),
        cout: new fields.NumberField({ ...requiredInteger, initial: 0 }),
        description: new fields.HTMLField({ required: true, blank: true }),
      }),

    });

    // Equipement : 
    schema.equipement = new fields.HTMLField({required: true, blank: true});

    // Armes et armures : Embedded Item ? 

    schema.description = new fields.HTMLField({required: true, blank: true});
    schema.indications = new fields.StringField({ required: false, blank: true, initial: undefined });

    return schema;
  }
}
