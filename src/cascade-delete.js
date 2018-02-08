import _debug from './debug';

const debug = _debug();

const idName = m => m.definition.idName() || 'id';
const getIdValue = (m, data) => data && data[idName(m)];

const cascadeDeletes = (modelId, Model, options) =>
  Promise.all(options.relations.map(async (relation) => {
    debug(`Relation ${relation} model ${Model.definition.name}`);

    if (!Model.relations[relation]) {
      debug(`Relation ${relation} not found for model ${Model.definition.name}`);
      throw new Error(`Relation ${relation} not found for model ${Model.definition.name}`);
    }


    let relationModel = Model.relations[relation].modelTo;
    let relationKey = Model.relations[relation].keyTo;

    if (Model.relations[relation].modelThrough) {
      relationModel = Model.relations[relation].modelThrough;
    }

    try {
      const relationConfigKey = options.relationsConfig[relation].foreignKey;
      if (relationConfigKey) {
        relationKey = relationConfigKey;
        debug(`Custom foreign key '${relationKey}' set for ${relation}.`);
      }
    } catch (error) {
      debug(`No custom foreign key set for ${relation}.`);
    }

    const where = {};
    where[relationKey] = modelId;

    if (options.deepDelete) {
      const instancesToDelete = await relationModel.find({ where });

      instancesToDelete.forEach(async (instance) => {
        await instance.destroy();
      });
    } else {
      await relationModel.destroyAll(where);
    }
  }));

export default (Model, options) => {
  Model.observe('after delete', (ctx) => {
    const name = idName(Model);
    const hasInstanceId = ctx.instance && ctx.instance[name];
    const hasWhereId = ctx.where && ctx.where[name];
    const hasMixinOption = options && Array.isArray(options.relations);

    if (!(hasWhereId || hasInstanceId)) {
      debug('Skipping delete for ', Model.definition.name);
      return Promise.resolve();
    }

    if (!hasMixinOption) {
      debug('Skipping delete for', Model.definition.name, 'Please add mixin options');
      return Promise.resolve();
    }

    const modelInstanceId = getIdValue(Model, ctx.instance || ctx.where);

    return cascadeDeletes(modelInstanceId, Model, options)
      .then(() => {
        debug('Cascade delete has successfully finished');
        return true;
      })
      .catch((err) => {
        debug('Error with cascading deletes', err);
        return Promise.reject(err);
      });
  });
};
