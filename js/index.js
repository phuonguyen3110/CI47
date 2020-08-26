window.onload = () => {
    var firebaseConfig = {
        apiKey: "AIzaSyDdg7kosjkn-GfWGvZp0A5kr6fIexkPbkM",
        authDomain: "chatapp-5408f.firebaseapp.com",
        databaseURL: "https://chatapp-5408f.firebaseio.com",
        projectId: "chatapp-5408f",
        storageBucket: "chatapp-5408f.appspot.com",
        messagingSenderId: "553471423052",
        appId: "1:553471423052:web:f94255e4818bdb7ae2bae9"
    };
    firebase.initializeApp(firebaseConfig);
    console.log(firebase.app())

    firebase.auth().onAuthStateChanged((user)=>{
        if(user){
            console.log(user)
            model.currentUser = {
                displayName: user.displayName,
                email: user.email
            }
            if(user.emailVerified){
                view.setActiveScreen('chatPage')
            } else {
                alert ('Please verify your email')
                firebase.auth().signOut()
                view.setActiveScreen('loginPage')
            }
            view.setActiveScreen('chatPage')
        } else {
            view.setActiveScreen('registerPage')
        }
    })

}

