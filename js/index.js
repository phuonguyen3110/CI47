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
    //console.log(firebase.app())

    firebase.auth().onAuthStateChanged((user)=>{
        if(user){
            //console.log(user)
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
            //view.setActiveScreen('chatPage')
        } else {
            view.setActiveScreen('registerPage')
        }
    })

    //templateFirestore()
}

// const templateFirestore=async()=>{
//     //get one
//     const docID='hWwMZ5DledTm0NNxv9mi'
//     const response = await firebase.firestore().collection('users').doc(docID).get()
//     const user=getOneDocument(response)
//     //console.log(user)
//     //get many
//     const responseMany = await firebase.firestore().collection('users').where('phone','array-contains','0123').get()
//     const users = getManyDocuments(responseMany)
//     //console.log(users)

//     //create
//     const dataToCreate = {
//         age: 100,
//         name: 'ABC'
//     }
//     //firebase.firestore().collection('users').add(dataToCreate)

//     //update
//     const idToUpdate='hWwMZ5DledTm0NNxv9mi'
//     const dataToUpdate={
//         name: 'Updated',
//         phone: firebase.firestore.FieldValue.arrayUnion('3456')
//     }
//     firebase.firestore().collection('users').doc(idToUpdate).update(dataToUpdate)

//     //delete
//     const idToDelete = 'nkDyPZUkBrEjrQFMiY8K'
//     firebase.firestore().collection('users').doc(idToDelete).delete()
// }

const getManyDocuments=(response)=>{
    const listData=[]
    for(const doc of response.docs){
        listData.push(getOneDocument(doc))
    }
    return listData
}

const getOneDocument=(response)=>{
    const data = response.data()
    data.id=response.id
    return data
}