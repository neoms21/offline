(function (app) {
    'use strict';
    function databaseService($log, $q) {
        var service = new Object();


        var databaseName = 'acoach';

        var db = {
            instance: null,

            transactionTypes: {
                readonly: 'readonly',
                readwrite: 'readwrite'
            },

            handleError: function (verb, err, entityName, reject, additionalInfo) {
                // $log.error(String.format("Unable to {0} {1} {2}", verb, entityName, additionalInfo));
                $log.error(verb, entityName, additionalInfo);
                reject(err);
            }
        };

        function upgradeHelper(db, entityName, params) {

        }

        service.openDatabase = function () {
            if (db.instance) {
                return $q.when(db.instance);
            }

            return $q(function (resolve, reject) {
                var version = 13;
                var request = indexedDB.open(databaseName, version);

                request.onupgradeneeded = function (e) {
                    // NB IE doesn't support multikey pk/index e.g. can't pass in ['key', 'languageCode'] for keypath :-(
                    // TODO rework this - probably should use if newVersion < 1 do A if newVersion < 2 do B, rather than just blat objectStore and rebuild - latter quicker for dev though :-)
                    var db = e.target.result;
                    $log.info("Upgraded db from v" + e.oldVersion + " to v" + e.newVersion);
                    e.target.transaction.onerror = reject;

                    // // // Also probably need index on languageCode so can delete all en when sync?
                    // _.each(dbModels.models, function (model) {
                    //     upgradeHelper(db, model.name, model.params);
                    // })
                };

                request.onsuccess = function (e) {
                    $log.info("Opened " + databaseName + " database v" + version);
                    db.instance = e.target.result;
                    resolve(db.instance);
                };
                request.onerror = function (err) {
                    db.handleError('open Database', err, '', reject)
                };
            });
        };

        service.get = function (entityName, key) {
            return $q(function (resolve, reject) {
                try {
                    var transaction = db.instance.transaction(entityName, db.transactionTypes.readonly);
                    var store = transaction.objectStore(entityName);
                    var request = store.get(key);
                    request.onsuccess = function (e) {
                        var result = e.target.result;
                        resolve(result);
                    };
                    request.onerror = function (err) {
                        db.handleError('get', err, entityName, reject)
                    }
                } catch (e) {
                    db.handleError('get', e, entityName, reject)
                }
            });
        };

        service.getAll = function (entityName) {
            $log.info('In DB SERVICE:-> ' + entityName)
            return $q(function (resolve, reject) {
                var transaction = db.instance.transaction(entityName, db.transactionTypes.readonly);
                var store = transaction.objectStore(entityName);

                // Get everything in the store
                var keyRange = IDBKeyRange.lowerBound(0);
                var cursorRequest = store.openCursor(keyRange);

                var data = [];
                cursorRequest.onsuccess = function (e) {
                    var result = e.target.result;

                    if (result) {
                        data.push(result.value);
                        result.continue();
                    } else {
                        resolve(data);
                    }
                };
                cursorRequest.onerror = function (err) {
                    db.handleError('getAll', err, entityName, reject)
                }
            });
        };
        return service;
    }

    databaseService.$inject = ['$log', '$q'];
    app.factory('databaseService', databaseService);
})(angular.module('app'));