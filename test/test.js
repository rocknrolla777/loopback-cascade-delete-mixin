'use strict';

describe('Cascade Delete Mixin', () => {
    let Product;
    let Category;
    let CategoryMapping;
    let Purchase;
    let User;
    let CascadeDelete = require('../cascade-delete');
    let ModelBuilder = require('loopback-datasource-juggler').ModelBuilder;
    let modelBuilder = new ModelBuilder();
    let mixins = modelBuilder.mixins;
    let sandbox;
    let db;

    before(() => {
        db = new loopback.DataSource('memory', {
            connector: loopback.Memory
        }, modelBuilder);
        mixins.define('CascadeDelete', CascadeDelete);
    });

    beforeEach(() => {
        sandbox = sinon.sandbox.create();
    });

    afterEach(() => {
        sandbox.restore();
    });

    describe('belongsTo', () => {
        before(done => {
            User = db.createModel('User', {name: String}, {
                mixins: {
                    CascadeDelete: {
                        relations: ['product']
                    }
                }
            });
            Product = db.createModel('Product', {name: 'string'});

            User.belongsTo('product', {model: Product});
            db.automigrate(['User', 'Product'], done);
        });

        it('should delete related model --  Product', done => {
            let user;
            sandbox.spy(Product, 'destroyAll');
            User.create({name: 'John User'})
                .then(_user => {
                    user = _user;
                    sandbox.spy(user, 'destroy');
                    return user.product.create({name: 'phone'});
                }).then(() => {
                return user.destroy();
            }).then(() => {
                expect(user.destroy).to.have.been.called;
                expect(Product.destroyAll).to.have.been.called;
                done();
            }).catch(err => {
                done(err);
            });
        });

        it('should delete related model --  Product (deep delete)', done => {
            User.settings.mixins.CascadeDelete.deepDelete = true;
            let user;
            User.create({name: 'John User'})
                .then(_user => {
                    user = _user;
                    sandbox.spy(user, 'destroy');
                    return user.product.create({name: 'phone'});
                }).then(() => {
                return user.destroy();
            })
                .then(() => {
                    expect(user.destroy).to.have.been.called;
                    return Product.find()
                })
                .then(products => {
                    expect(products).to.be.an('array').that.is.empty;
                    done()
                })
                .catch(err => {
                    done(err);
                });
        });

    });

    describe('hasOne', () => {
        before(done => {
            User = db.createModel('User', {name: String}, {
                mixins: {
                    CascadeDelete: {
                        relations: ['product']
                    }
                }
            });
            Product = db.createModel('Product', {name: 'string'});

            User.hasOne('product', {model: Product});
            db.automigrate(['User', 'Product'], done);
        });

        it('should delete related model --  Product', done => {
            let user;
            sandbox.spy(Product, 'destroyAll');
            User.create({name: 'John User'})
                .then(_user => {
                    user = _user;
                    sandbox.spy(user, 'destroy');
                    return user.product.create({name: 'phone'});
                }).then(() => {
                return user.destroy();
            }).then(() => {
                expect(user.destroy).to.have.been.called;
                expect(Product.destroyAll).to.have.been.called;
                done();
            }).catch(err => {
                done(err);
            });
        });
        it('should delete related model --  Product (deep delete)', done => {
            User.settings.mixins.CascadeDelete.deepDelete = true;
            let user;

            User.create({name: 'John User'})
                .then(_user => {
                    user = _user;
                    sandbox.spy(user, 'destroy');
                    return user.product.create({name: 'phone'});
                }).then(() => {
                return user.destroy();
            })
                .then(() => {
                    expect(user.destroy).to.have.been.called;
                    return Product.find()
                })
                .then(products => {
                    expect(products).to.be.an('array').that.is.empty;
                    done();
                })
                .catch(err => {
                    done(err);
                });
        });
    });

    describe('hasMany', () => {
        before(done => {
            User = db.createModel('User', {name: String}, {
                mixins: {
                    CascadeDelete: {
                        relations: ['products', 'purchases']
                    }
                }
            });
            Product = db.createModel('Product', {name: 'string'});
            Purchase = db.createModel('Purchase', {name: 'string'});

            User.hasMany('products', {model: Product});
            User.hasMany('purchases', {model: Purchase});
            db.automigrate(['User', 'Product', 'Purchase'], done);
        });

        it('should delete related models --  Product, Purchase', done => {
            let user;
            sandbox.spy(Product, 'destroyAll');
            sandbox.spy(Purchase, 'destroyAll');
            User.create({name: 'John User'})
                .then(_user => {
                    user = _user;
                    sandbox.spy(user, 'destroy');
                    return Promise.all([user.products.create({name: 'phone'}), user.products.create({name: 'phone1'})]);
                }).then(() => {
                return user.purchases.create({name: 'purchase 1'})
            }).then(() => {
                return user.destroy();
            }).then(() => {
                expect(user.destroy).to.have.been.called;
                expect(Product.destroyAll).to.have.been.called;
                expect(Purchase.destroyAll).to.have.been.called;
                done();
            }).catch(err => {
                done(err);
            });
        });

        it('should delete related models --  Product, Purchase (deep delete)', done => {
            User.settings.mixins.CascadeDelete.deepDelete = true;
            let user;

            User.create({name: 'John User'})
                .then(_user => {
                    user = _user;
                    sandbox.spy(user, 'destroy');
                    return Promise.all([user.products.create({name: 'phone'}), user.products.create({name: 'phone1'})]);
                }).then(() => {
                return user.purchases.create({name: 'purchase 1'})
            }).then(() => {
                return user.destroy();
            })
                .then(() => {
                    expect(user.destroy).to.have.been.called;
                    return Promise.all([Product.find(), Purchase.find()]);
                })
                .then(([products, purchases]) => {
                    expect(products).to.be.an('array').that.is.empty;
                    expect(purchases).to.be.an('array').that.is.empty;
                    done();
                })
                .catch(err => {
                    done(err);
                });
        });
    });

    describe('hasMany through', () => {

        before(done => {
            Product = db.define('Product', {name: String}, {
                mixins: {
                    CascadeDelete: {
                        relations: ['categories']
                    }
                }
            });
            Category = db.define('Category', {name: String});
            CategoryMapping = db.define('CategoryMapping', {name: String});

            Product.hasMany('categories', {model: Category, through: CategoryMapping});
            Category.hasMany('products', {model: Product, through: CategoryMapping});
            CategoryMapping.belongsTo(Product);
            CategoryMapping.belongsTo(Category);

            db.automigrate(['Category', 'CategoryMapping', 'Product'], done);
        });

        it('should delete through models -- CategoryMapping', done => {
            let product;
            sandbox.spy(CategoryMapping, 'destroyAll');
            Product.create({name: 'product1'})
                .then(_product => {
                    product = _product;
                    return Category.create({name: 'category1'});
                }).then(category => {
                return category.products.add(product);
            }).then(() => {
                sandbox.spy(product, 'destroy');
                return product.destroy();
            })
                .then(() => {
                    expect(CategoryMapping.destroyAll).to.have.been.called;
                    expect(product.destroy).to.have.been.called;
                    done();
                })
                .catch(err => done(err));
        });

        it('should delete through models -- CategoryMapping (deep delete)', done => {
            let product;

            Product.create({name: 'product1'})
                .then(_product => {
                    product = _product;
                    return Category.create({name: 'category1'});
                }).then(category => {
                return category.products.add(product);
            }).then(() => {
                sandbox.spy(product, 'destroy');
                return product.destroy();
            })
                .then(() => {
                    expect(product.destroy).to.have.been.called;
                    return CategoryMapping.find()
                })
                .then(cm => {
                    expect(cm).to.be.an('array').that.is.empty;
                    done();
                })
                .catch(err => done(err));
        });
    });
});
