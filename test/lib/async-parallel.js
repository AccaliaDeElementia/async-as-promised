'use strict';

var chai = require('chai'),
    chaiAsPromised = require('chai-as-promised'),
    sinon = require('sinon');

if (!global.Promise) {
    global.Promise = require('promise-polyfill');
}
chai.use(chaiAsPromised);
chai.should();

var async = require('../../lib/async-as-promised');

describe('async.parallel()', function () {
    var sandbox;
    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        sandbox.spy(async, 'each');
    });
    afterEach(function () {
        sandbox.restore();
    });
    it('should spawn processes via async.each with task array', function () {
        var input = [function () {
            return Promise.resolve(1);
        }];
        return async.parallel(input).then(function () {
            async.each.called.should.equal(true);
        });
    });
    it('should operate on an array of tasks returning promises', function () {
        var input = [function () {
                return Promise.resolve(1);
            }, function () {
                return Promise.resolve(2);
            }, function () {
                return Promise.resolve(4);
            }, function () {
                return Promise.resolve(3);
            }, function () {
                return Promise.resolve(5);
            }],
            expected = [1, 2, 4, 3, 5];
        return async.parallel(input).then(function (value) {
            value.should.eql(expected);
        });
    });
    it('should operate on an array of tasks returning values', function () {
        var input = [function () {
                return 1;
            }, function () {
                return 2;
            }, function () {
                return 4;
            }, function () {
                return 3;
            }, function () {
                return 5;
            }],
            expected = [1, 2, 4, 3, 5];
        return async.parallel(input).then(function (value) {
            value.should.eql(expected);
        });
    });
    it('should operate on an array of tasks returning thenables', function () {
        var input = [function () {
                return {
                    then: function (resolve) {
                        resolve(1);
                    }
                };
            }, function () {
                return {
                    then: function (resolve) {
                        resolve(2);
                    }
                };
            }, function () {
                return {
                    then: function (resolve) {
                        resolve(4);
                    }
                };
            }, function () {
                return {
                    then: function (resolve) {
                        resolve(3);
                    }
                };
            }, function () {
                return {
                    then: function (resolve) {
                        resolve(5);
                    }
                };
            }],
            expected = [1, 2, 4, 3, 5];
        return async.parallel(input).then(function (value) {
            value.should.eql(expected);
        });
    });
    it('should reject when inner promise rejects from task array', function () {
        var expected = new Error('i am error' + Math.random()),
            input = [function () {
                return Promise.resolve(1);
            }, function () {
                return Promise.reject(expected);
            }, function () {
                return Promise.resolve(1);
            }];
        return async.parallel(input).then(function () {
            chai.assert.fail('Should not accept promise');
        }).catch(function (rejection) {
            rejection.should.equal(expected);
        });
    });
    it('should spawn processes via async.each with task array', function () {
        var input = {
            one: function () {
                return Promise.resolve(1);
            }
        };
        return async.parallel(input).then(function () {
            async.each.called.should.equal(true);
        });
    });
    it('should operate on a map of tasks returning promises', function () {
        var input = {
                one: function () {
                    return Promise.resolve(1);
                },
                two: function () {
                    return Promise.resolve(4);
                },
                three: function () {
                    return Promise.resolve(9);
                },
                four: function () {
                    return Promise.resolve(16);
                },
                five: function () {
                    return Promise.resolve(25);
                },
            },
            expected = {
                one: 1,
                two: 4,
                three: 9,
                four: 16,
                five: 25
            };
        return async.parallel(input).then(function (value) {
            value.should.eql(expected);
        });
    });
    it('should operate on a map of tasks returning values', function () {
        var input = {
                one: function () {
                    return 1;
                },
                two: function () {
                    return 4;
                },
                three: function () {
                    return 9;
                },
                four: function () {
                    return 16;
                },
                five: function () {
                    return 25;
                },
            },
            expected = {
                one: 1,
                two: 4,
                three: 9,
                four: 16,
                five: 25
            };
        return async.parallel(input).then(function (value) {
            value.should.eql(expected);
        });
    });
    it('should operate on a map of tasks returning thenables', function () {
        var input = {
                one: function () {
                    return {
                        then: function (resolve) {
                            resolve(1);
                        }
                    };
                },
                two: function () {
                    return {
                        then: function (resolve) {
                            resolve(4);
                        }
                    };
                },
                three: function () {
                    return {
                        then: function (resolve) {
                            resolve(9);
                        }
                    };
                },
                four: function () {
                    return {
                        then: function (resolve) {
                            resolve(16);
                        }
                    };
                },
                five: function () {
                    return {
                        then: function (resolve) {
                            resolve(25);
                        }
                    };
                },
            },
            expected = {
                one: 1,
                two: 4,
                three: 9,
                four: 16,
                five: 25
            };
        return async.parallel(input).then(function (value) {
            value.should.eql(expected);
        });
    });
    it('should reject when inner promise rejects from task map', function () {
        var expected = new Error('i am error' + Math.random()),
            input = {
                one: function () {
                    return Promise.resolve(1);
                },
                two: function () {
                    return Promise.reject(expected);
                },
                three: function () {
                    return Promise.resolve(1);
                }
            };
        return async.parallel(input).then(function () {
            chai.assert.fail('Should not accept promise');
        }).catch(function (rejection) {
            rejection.should.equal(expected);
        });
    });
});



describe('async.parallelLimit()', function () {
    var sandbox;
    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        sandbox.spy(async, 'eachLimit');
    });
    afterEach(function () {
        sandbox.restore();
    });
    it('should spawn processes via async.eachLimit with task array', function () {
        var input = [function () {
            return Promise.resolve(1);
        }];
        return async.parallelLimit(input, 5).then(function () {
            async.eachLimit.called.should.equal(true);
        });
    });
    it('should operate on an array of tasks returning promises', function () {
        var input = [function () {
                return Promise.resolve(1);
            }, function () {
                return Promise.resolve(2);
            }, function () {
                return Promise.resolve(4);
            }, function () {
                return Promise.resolve(3);
            }, function () {
                return Promise.resolve(5);
            }],
            expected = [1, 2, 4, 3, 5];
        return async.parallelLimit(input, 2).then(function (value) {
            value.should.eql(expected);
        });
    });
    it('should operate on an array of tasks returning values', function () {
        var input = [function () {
                return 1;
            }, function () {
                return 2;
            }, function () {
                return 4;
            }, function () {
                return 3;
            }, function () {
                return 5;
            }],
            expected = [1, 2, 4, 3, 5];
        return async.parallelLimit(input, 2).then(function (value) {
            value.should.eql(expected);
        });
    });
    it('should operate on an array of tasks returning thenables', function () {
        var input = [function () {
                return {
                    then: function (resolve) {
                        resolve(1);
                    }
                };
            }, function () {
                return {
                    then: function (resolve) {
                        resolve(2);
                    }
                };
            }, function () {
                return {
                    then: function (resolve) {
                        resolve(4);
                    }
                };
            }, function () {
                return {
                    then: function (resolve) {
                        resolve(3);
                    }
                };
            }, function () {
                return {
                    then: function (resolve) {
                        resolve(5);
                    }
                };
            }],
            expected = [1, 2, 4, 3, 5];
        return async.parallelLimit(input, 2).then(function (value) {
            value.should.eql(expected);
        });
    });
    it('should reject when inner promise rejects from task array', function () {
        var expected = new Error('i am error' + Math.random()),
            input = [function () {
                return Promise.resolve(1);
            }, function () {
                return Promise.reject(expected);
            }, function () {
                return Promise.resolve(1);
            }];
        return async.parallelLimit(input, 2).then(function () {
            chai.assert.fail('Should not accept promise');
        }).catch(function (rejection) {
            rejection.should.equal(expected);
        });
    });
    it('should not spawn additional promises after promise rejects from task array', function () {
        var promises = 0,
            input = [function () {
                promises++;
                return Promise.resolve(1);
            }, function () {
                promises++;
                return Promise.reject(new Error('foo'));
            }, function () {
                promises++;
                return Promise.resolve(1);
            }, function () {
                promises++;
                return Promise.resolve(1);
            }, function () {
                promises++;
                return Promise.resolve(1);
            }, function () {
                promises++;
                return Promise.resolve(1);
            }];
        return async.parallelLimit(input, 2).catch(function () {
            promises.should.be.lessThan(input.length);
        });
    });
    it('should spawn processes via async.each with task array', function () {
        var input = {
            one: function () {
                return Promise.resolve(1);
            }
        };
        return async.parallelLimit(input, 2).then(function () {
            async.eachLimit.called.should.equal(true);
        });
    });
    it('should operate on a map of tasks returning promises', function () {
        var input = {
                one: function () {
                    return Promise.resolve(1);
                },
                two: function () {
                    return Promise.resolve(4);
                },
                three: function () {
                    return Promise.resolve(9);
                },
                four: function () {
                    return Promise.resolve(16);
                },
                five: function () {
                    return Promise.resolve(25);
                },
            },
            expected = {
                one: 1,
                two: 4,
                three: 9,
                four: 16,
                five: 25
            };
        return async.parallelLimit(input, 2).then(function (value) {
            value.should.eql(expected);
        });
    });
    it('should operate on a map of tasks returning values', function () {
        var input = {
                one: function () {
                    return 1;
                },
                two: function () {
                    return 4;
                },
                three: function () {
                    return 9;
                },
                four: function () {
                    return 16;
                },
                five: function () {
                    return 25;
                },
            },
            expected = {
                one: 1,
                two: 4,
                three: 9,
                four: 16,
                five: 25
            };
        return async.parallelLimit(input, 2).then(function (value) {
            value.should.eql(expected);
        });
    });
    it('should operate on a map of tasks returning thenables', function () {
        var input = {
                one: function () {
                    return {
                        then: function (resolve) {
                            resolve(1);
                        }
                    };
                },
                two: function () {
                    return {
                        then: function (resolve) {
                            resolve(4);
                        }
                    };
                },
                three: function () {
                    return {
                        then: function (resolve) {
                            resolve(9);
                        }
                    };
                },
                four: function () {
                    return {
                        then: function (resolve) {
                            resolve(16);
                        }
                    };
                },
                five: function () {
                    return {
                        then: function (resolve) {
                            resolve(25);
                        }
                    };
                },
            },
            expected = {
                one: 1,
                two: 4,
                three: 9,
                four: 16,
                five: 25
            };
        return async.parallelLimit(input, 2).then(function (value) {
            value.should.eql(expected);
        });
    });
    it('should reject when inner promise rejects from task map', function () {
        var expected = new Error('i am error' + Math.random()),
            input = {
                one: function () {
                    return Promise.resolve(1);
                },
                two: function () {
                    return Promise.reject(expected);
                },
                three: function () {
                    return Promise.resolve(1);
                }
            };
        return async.parallelLimit(input, 2).then(function () {
            chai.assert.fail('Should not accept promise');
        }).catch(function (rejection) {
            rejection.should.equal(expected);
        });
    });
    it('should not spawn additional promises after promise rejects from task map', function () {
        var promises = 0,
            input = {
                one: function () {
                    promises++;
                    return Promise.resolve(1);
                },
                two: function () {
                    promises++;
                    return Promise.reject(new Error('foo'));
                },
                three: function () {
                    promises++;
                    return Promise.resolve(1);
                },
                four: function () {
                    promises++;
                    return Promise.resolve(1);
                },
                five: function () {
                    promises++;
                    return Promise.resolve(1);
                },
                six: function () {
                    promises++;
                    return Promise.resolve(1);
                }
            };
        return async.parallelLimit(input, 2).catch(function () {
            promises.should.be.lessThan(6);
        });
    });
});
