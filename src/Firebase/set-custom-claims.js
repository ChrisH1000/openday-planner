// Run in commandline with UID from Users tab in Firebase console
// node src/Firebase/set-custom-claims-watcher.js UID

var admin = require('firebase-admin');

var serviceAccount = require('./openday-planner-firebase-adminsdk-8200l-0898bcab76.json');

var uid = process.argv[2];

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

admin.auth().setCustomUserClaims(uid, { admin: true })
  .then(() => {
    console.log('custom claims set for user', uid);
    process.exit()
  })
  .catch(error => {
    console.log(error);
    process.exit(1);
  })
