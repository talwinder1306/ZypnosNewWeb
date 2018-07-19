const firebase = require('firebase-admin');
const functions = require('firebase-functions');
const request = require('request');

// const firebaseApp = firebase.initializeApp(
//     functions.config().firebase
// );
const firebaseApp = firebase.initializeApp({
    credential: firebase.credential.cert({
        "type": "service_account",
        "project_id": "zypnos-70985",
        "private_key_id": "70804f5dd8bbf65b386535e94c4eee8222f5143d",
        "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDyPP/y6EZPk+Ot\nbB2/+n6l/gxeVezitCUTnCG87RQpmrw7lYsGNha5xkFCuI27h8z8aRl2pzMSTXPt\nIouCukQ+hEdBTs9SfuqcMU21q0JyVYf4sHMvQVq0+zN6PsnfMCn4fPUXBNWgU+rT\nv8jVXsRuSjNzdFyUGLvpy1dvNeMH8uBGheksFzgYdSTvVJsBb6VQmGJNNE1Mejlk\n59KwfrnxzUzCfggEnn2wqioi3G/nCNZQxL88RJpp+Hhk0+pkaBYTzIoEptLCb8wu\nQmnO3rkRANpw7NLNnF/QCcB3Ob3nNdvvJ7IGx46UAazsfkMqNiUIjHIyM6CL/MhG\nohOwkaLxAgMBAAECggEAdvR7oBZuSK/QM56PMXJadTs/aaf6bw2V035tlvA5YYDq\nBLyYC9HN8Sapb5FfkILMp/sYlQrgapF8Zyv6pJTB5I1izHBeIR3QKimQBrF2LN1R\nq09DESaf25YsHlDtI1vskGkUllw6Z8Qt4hQhFJ64CY0InR68Q8Gtrc68PhGRTpoC\n8C3UDg3HY1X1+MrzvZzSKtsw3HE1hfPC62iwN0C2oxdtF978W9+WGtptO9+4+q0z\nf7YdQSGhGZkS7vEFZR1YRnjob0dmQefkXPkCcikqsRV37jy1idnutk6w23nPYV/H\n0SMitvAV5P6kSNP+0x3Ayqi4sYHjI0gb8TaJ0s6mPQKBgQD7REQy6FlsS7uN991d\nT0dfLgvHCJPs1I9RY9Pf4Ei0N0zYlUa7JoblFCDSQxWWrVlFm8Mtum54T7HnJmGd\nVWtOzFFi/lObOcT2jL9pyTtjyJr7vBc3YJdBxmfUHgvObtYm7UdibHcy1sSzjI2e\nSXSxkYBkMEfVGwNU9PnaBlTLBwKBgQD2zTGqdgf36BPnHD12kPFZjfK8mbML3Ov1\nEGzf/EeSJqqsxUYYBNbKeYxfjD8tdd5BwFQWuCqsAhex9fEFidjOFvkWx7VfDrER\nlcqw1WGO94f2fiJUhdmoSPyqvwYPhHisvDwfgl1NOsOYEks3hLmwK6qDgnw2LnkF\n6wQpxu8MRwKBgBhQpODgRzcJpR6567wJ3fhB9nXOSLJUZ4ISzQAPLjnyWAdlerDF\nq6wjZIG0aDRqlgb8acjVD7eozqh1uGCHUZkQgJe50NFmp77MJAHSrWKcmRLfQsfj\nGwAMeSO3vKC/bQ3bTFsj7+0Fh4dwhIvaw+YjFG+dlHX05T+lbUBB+JalAoGAPPYa\nWnylIzsUD3YOSIcs1m4Vkzhz3W5IalQQUJNEKnmalupzkeNAGutDHSbLRDNlHuCe\n5K3A/JPXvoF9c1zFTMKn7FSQHFbIrgtN8bgDTQkfcGdfm3kkdkjxAEwG9zZFiIVG\nZJIS8cyeG6YJJkGGjFl82NcWT1vTUP7oHFmjGmkCgYEA9JMuSxqcFRG9bZo+kW1s\n2JyAO+mTUq+3sBEjt84GfLjeRAITp+Dtn2LJoVYMSjskj7UYTBwBLl4JjY4yE8a2\nsZguHYTaFFbmO2Wk+3RivBDDSOIuFUzlGkYZNIb36DZ2j5TBi3TrW1vcOfJ10ALD\nrOP5u0HhgKiqV8SNT6Uo+Uc=\n-----END PRIVATE KEY-----\n",
        "client_email": "firebase-adminsdk-v7n9c@zypnos-70985.iam.gserviceaccount.com",
        "client_id": "117745427828442029537",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://accounts.google.com/o/oauth2/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-v7n9c%40zypnos-70985.iam.gserviceaccount.com"
      }),
    databaseURL: "https://zypnos-70985.firebaseio.com",
    storageBucket: "zypnos-70985.appspot.com"
});

const bucket = firebaseApp.storage().bucket();
var userRef = null, botRef = null, testCaseRef = null;

setUserRef = (uid) => {
    userRef = firebaseApp.database().ref(uid);
};
setBotRef = (botId) => {
    botRef = userRef.child('bots').child(botId);
};
setTestCaseRef = (testCaseId) => {
    testCaseRef = botRef.child('testCase').child(testCaseId);
};

saveTestCase = (sTestName, oTestCase) => {
    return new Promise((resolve, reject) => {
        bucket.file('convo/' + sTestName + '.json').save(oTestCase, (error) => {
            if (!error)
                resolve();
            else
                reject(error);
        });
    });
};

getTestCaseUrl = (sTestName) => {
    return new Promise((resolve, reject) => {
        bucket.file('convo/' + sTestName + '.json').getSignedUrl({
            action: 'read',
            expires: '01-01-2050'
        }).then(signedUrls => {
            resolve(signedUrls[0]);
        }).catch((error) => {
            reject(error);
        });
    });
};

saveBot = (botDetails) => {
    var botId = 'B_' + new Date().getTime();
    setBotRef(botId);
    return new Promise((resolve, reject) => {
        botRef.child('botDetails').set(botDetails).then(() => {
            resolve(botId);
        }, (err) => {
            reject(err);
        });
    });
}

saveTestCaseDetails = (testCaseDetails, testCaseId) => {
    setTestCaseRef(testCaseId);
    return new Promise((resolve, reject) => {
        testCaseRef.set(testCaseDetails).then(() => {
            resolve();
        }, () => {
            reject();
        });
    });
}

getAllBots = () => {
    return new Promise((resolve, reject) => {
        userRef.child('bots').once('value').then(snapshot => {
            var payload = snapshot.val();
            resolve(payload);
        }, () => {
            reject();
        });
    });
}

deleteBot = (botId) => {
    return new Promise((resolve, reject) => {
        setBotRef(botId);
        botRef.remove().then(() => {
            resolve();
        }, () => {
            reject();
        });;
    });
}

deleteTestCaseDetails = (testCaseId) => {
    return new Promise((resolve, reject) => {
        setTestCaseRef(testCaseId);
        testCaseRef.remove().then(() => {
            resolve();
        }, () => {
            reject();
        });
    });
}

deleteTestCase = (sTestName) => {
    return new Promise((resolve, reject) => {
        bucket.file('convo/' + sTestName + '.json').delete().then( () => {
            resolve();
        }).catch( err => {
            reject(err);
        });
    });
}

getTestCaseFromUrl = url => {
    return new Promise((resolve, reject) => {
        request(url, { json: true }, (err, res, body) => {
            if (err)
                reject(err);
            else
                resolve(body);
        })
    });
}

module.exports = {
    saveTestCase, getTestCaseUrl, saveBot, saveTestCaseDetails, setBotRef,
    setUserRef, setTestCaseRef, getAllBots, deleteBot, deleteTestCaseDetails, 
    deleteTestCase, getTestCaseFromUrl
};