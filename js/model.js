const model={}
model.currentUser=undefined 
model.conversations = []
model.currentConversation = undefined
model.register= async (data)=>{
    try{
        const response=await firebase.auth()
        .createUserWithEmailAndPassword(data.email, data.password)
        firebase.auth().currentUser.updateProfile({
            displayName: data.firstName+' '+data.lastName
        })
        firebase.auth().currentUser.sendEmailVerification()

        //console.log(response)
    } catch(err){
        alert(err.message)
        console.log(err)
    }
}

model.login= async ({email,password})=>{
    try{
    const response = await firebase.auth().signInWithEmailAndPassword(email, password)
    // console.log(response)
    // if(response && response.user.emailVerified){
    //     //enter chat
    //     model.currentUser={
    //         email: response.user.email,
    //         displayName: response.user.displayName
    //     }
    //     view.setActiveScreen('chatPage')
    // } else{
    //     alert('Please verify your email')
    // }
    } catch(err) {
        alert(err.message)
        //console.log(err)
    }
}

model.getConversations = async () =>{
    const response = await firebase.firestore().collection('conversations').where('users','array-contains',model.currentUser.email).get()
    model.conversations = getManyDocuments(response)
    if(model.conversations.length>0){
        model.currentConversation=model.conversations[0]
        view.showCurrentConversation()
    }   
}

model.addMessage=(message)=>{
    dataToUpdate = {
        messages: firebase.firestore.FieldValue.arrayUnion(message)
    }
 firebase.firestore().collection('conversations').doc(model.currentConversation.id).update(dataToUpdate)   
}

model.listenConversationChange=()=>{
    firebase.firestore().collection('conversations').where('users','array-contains', model.currentUser.email).onSnapshot((snapshot)=>{
        for (oneChange of snapshot.docChanges()){
        console.log(getOneDocument(oneChange.doc))
        }
    })
}