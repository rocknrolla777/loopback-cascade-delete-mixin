'use strict';

import _debug from './debug';
const debug = _debug();

export default (Model, options) => {
    Model.observe('after delete', (ctx, next) => {
        let name = idName(Model);
        let hasInstanceId = ctx.instance && ctx.instance[name];
        let hasWhereId = ctx.where && ctx.where[name];
        let hasMixinOption = options && Array.isArray(options.relations);

        if (!(hasWhereId || hasInstanceId)) {
            debug('Skipping delete for ', Model.definition.name);
            return next();
        }

        if (!hasMixinOption) {
            debug('Skipping delete for', Model.definition.name, 'Please add mixin options');
            return next();
        }

        let modelInstanceId = getIdValue(Model, ctx.instance || ctx.where);

        cascadeDeletes(modelInstanceId)
            .then(() => {
                debug('Cascade delete has successfully finished');
                next();
            })
            .catch(err => {
                debug('Error with cascading deletes', err);
                next(err);
            });
    });

    function cascadeDeletes(modelId) {
        return Promise.all(options.relations.map(async relation => {
            debug('Relation ' + relation + ' model ' + Model.definition.name);

            if (!Model.relations[relation]) {
                debug('Relation ' + relation + ' not found for model ' + Model.definition.name);
                throw 'Relation ' + relation + ' not found for model ' + Model.definition.name;
            }


            let relationModel = Model.relations[relation].modelTo;
            let relationKey = Model.relations[relation].keyTo;

            if (Model.relations[relation].modelThrough) {
                relationModel = Model.relations[relation].modelThrough;
            }

            let where = {};
            where[relationKey] = modelId;

            if (options.deepDelete) {
                let relationModelIdName = relationModel.getIdName();
                let fields = {};
                fields[relationModelIdName] = true;
                return relationModel.find({where: where, fields: fields}).then(instancesToDelete => {
                    let deleteOperations = [];
                    for (let instance of instancesToDelete) {
                        deleteOperations.push(relationModel.deleteById(instance[relationModelIdName]));
                    }
                    return Promise.all(deleteOperations);
                });
            } else {
                return await relationModel.destroyAll(where);
            }
        }));
    }

    function idName(m) {
        return m.definition.idName() || 'id';
    }

    function getIdValue(m, data) {
        return data && data[idName(m)];
    }
};
