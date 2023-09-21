import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import firebaseConfig from './firebase.config.js';


export const initialzeLoginFramework = () => {
    if (firebase.apps.length ===0){
        firebase.initializeApp(firebaseConfig);

    }

}

export const handleGoogleSignIn= ()=> {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(googleProvider)
    
    .then(res => {   
    console.log(res);
    const {email,name,picture}= res.additionalUserInfo.profile
    const signnedInUser = {
        isSignnedIn : true,
        name: name,
        email: email,
        photo: picture,
        success: true,
    }
    return signnedInUser;
    console.log(email, name, picture);
    })
    .catch (err => {
    console.log(err);
    console.log(err.message);
    })
}



export const handleFbSignIn = () =>{
    const fbProvider = new firebase.auth.FacebookAuthProvider();
    return firebase
    .auth()
    .signInWithPopup(fbProvider)
    .then((result) => {
        /** @type {firebase.auth.OAuthCredential} */
        var credential = result.credential;

        // The signed-in user info.
        var user = result.user;
        user.success=true;
        return user;
        // IdP data available in result.additionalUserInfo.profile.
        // ...

        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        var accessToken = credential.accessToken;

        // ...
    })
    .catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;

        // ...
    });


}

export const handleSignOut = () => {
    return firebase.auth().signOut()
    .then (res => {
        const signedOutUser = {
            isSignnedIn: false,
            name: '',
            photo: '',
            email:'',
            error:'',
            success: false,
        }
        return signedOutUser;
        console.log(res);
    })
    .catch(err => {

    })
}


export const createUserWithEmailAndPassword = (name, email, password) => {

   return firebase.auth().createUserWithEmailAndPassword(email, password)
                .then (res => {
                const newUserInfo = res.user;
                newUserInfo.error="";
                newUserInfo.success = true;
                //console.log(res);
                updateUserName(name);
                return newUserInfo
            })
            .catch(error => {
                const newUserInfo= {};
                newUserInfo.error = error.message;
                newUserInfo.success = false;
                var errorMessage = error.message;
                console.log(errorMessage);
                return newUserInfo;
            });
}


export const signInWithEmailAndPassword=(email,password) => {

   return firebase.auth().signInWithEmailAndPassword(email, password)
    .then (res => {
        const newUserInfo = res.user;
        newUserInfo.error="";
        newUserInfo.success = true;
        return newUserInfo;

        })
    .catch((error) => {
        const newUserInfo= {};
        newUserInfo.error = error.message;
        newUserInfo.success = false;
        return newUserInfo;
    });

}

const updateUserName= name => {

    const user = firebase.auth().currentUser;

            user.updateProfile({
            displayName: name
            }).then(() => {
            console.log("User name updated successfully!")
            }).catch((error) => {
            console.log(error)
            });  

}
 
