import _debug from './debug';

const debug = _debug();

const idName = m => m.definition.idName() || 'id';
const getIdValue = (m, data) => data && data[idName(m)];

export default (Model, options) => {
  const cascadeDeletes = modelId => Promise.all(options.relations.map(async (relation) => {
    debug(`Relation ${relation} model ${Model.definition.name}`);

    if (!Model.relations[relation]) {
      debug(`Relation ${relation} not found for model ${Model.definition.name}`);
      throw new Error(`Relation ${relation} not found for model ${Model.definition.name}`);
    }


    let relationModel = Model.relations[relation].modelTo;
    const relationKey = Model.relations[relation].keyTo;

    if (Model.relations[relation].modelThrough) {
      relationModel = Model.relations[relation].modelThrough;
    }

    const where = {};
    where[relationKey] = modelId;

    // if (options.deepDelete) {
    //   const relationModelIdName = relationModel.getIdName();
    //   const fields = {};
    //   fields[relationModelIdName] = true;
    //   return relationModel.find({ where, fields }).then((instancesToDelete) => {
    //     const deleteOperations = [];
    //     for (const instance of instancesToDelete) {
    //       deleteOperations.push(relationModel.deleteById(instance[relationModelIdName]));
    //     }
    //     return Promise.all(deleteOperations);
    //   });
    // }
    await relationModel.destroyAll(where);
    return true;
  }));

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

    return cascadeDeletes(modelInstanceId)
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
