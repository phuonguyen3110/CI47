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
    view.setActiveScreen('registerPage')

}

