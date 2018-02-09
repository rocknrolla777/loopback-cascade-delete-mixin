import _debug from './debug';

const debug = _debug();

const idName = m => m.definition.idName() || 'id';
const getIdValue = (m, data) => data && data[idName(m)];

const cascadeDeletes = (modelId, Model, options) =>
  Promise.all(options.relations.map(async (relationData) => {
    let relation;
    let relationForeignKey;
    let relationDeepDelete;

    if (relationData instanceof Object) {
      relation = relationData.name;
      relationForeignKey = relationData.foreignKey;
      relationDeepDelete = relationData.deepDelete;
    } else relation = relationData;

    if (!relation) {
      throw new Error('Please, set relation name! loopback-cascade-mixin');
    }

    debug(`Relation ${relation} model ${Model.definition.name}`);

    if (!Model.relations[relation]) {
      debug(`Relation ${relation} not found for model ${Model.definition.name}`);
      throw new Error(`Relation ${relation} not found for model ${Model.definition.name}`);
    }


    let relationModel = Model.relations[relation].modelTo;
    const relationKey = relationForeignKey || Model.relations[relation].keyTo;

    if (Model.relations[relation].modelThrough) {
      relationModel = Model.relations[relation].modelThrough;
    }

    if (!relationModel.definition.properties[relationKey]) {
      throw new Error(`Bad relation key name! 
      ${Model.definition.name} - ${relationModel.definition.name} 
      loopback cascade-delete-mixin`);
    }


    const where = {};
    where[relationKey] = modelId;

    if (relationDeepDelete || (relationDeepDelete && options.deepDelete)) {
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
