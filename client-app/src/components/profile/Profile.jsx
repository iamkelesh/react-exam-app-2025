import { useEffect, useState, useContext } from "react"
import { collection, addDoc, getDocs, serverTimestamp, doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';

import AuthContext from "../../contexts/authContext";
import { firestoreDB } from "../../firebase/config";


export default function Profile() {

    const { userId } = useContext(AuthContext)
    const [profileState, setProfile] = useState({})

    useEffect(() => {

        getDoc(doc(firestoreDB, 'user-info', userId))
            .then(docSnap => {
                if (docSnap.exists()) {
                    setProfile(docSnap.data())
                } else {
                    throw new Error('No such document!')
                }
            })
            .catch(error => {
                window.alert('Error while getting user info: ', error)
            })


    }, [userId])



    return (
        <div className="max-w-lg mx-auto my-10 bg-white rounded-lg shadow-md p-5">
            {/* <img className="w-32 h-32 rounded-full mx-auto" src="https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/user-profile-icon.png" alt="Profile picture" /> */}
            <h2 className="text-center text-2xl font-semibold mt-3">{profileState.fullName}</h2>
            <p className="text-center text-gray-600 mt-1">{profileState.jobTitle}</p>
            <div className="flex justify-center mt-5">
                {/* <a href="#" className="text-blue-500 hover:text-blue-700 mx-3">Twitter</a>
            <a href="#" className="text-blue-500 hover:text-blue-700 mx-3">LinkedIn</a>
            <a href="#" className="text-blue-500 hover:text-blue-700 mx-3">GitHub</a> */}
            </div>
            <div className="mt-5">
                <h3 className="text-xl font-semibold">Bio</h3>
                <p className="text-gray-600 mt-2">{profileState.bio}</p>
            </div>
        </div>
    )
}