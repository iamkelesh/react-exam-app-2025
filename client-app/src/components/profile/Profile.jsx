import { useEffect, useState, useContext } from "react"
import { doc, getDoc } from 'firebase/firestore';
import { Link, useLocation, useParams } from "react-router-dom";

import AuthContext from "../../contexts/authContext";
import { firestoreDB } from "../../firebase/config";


export default function Profile() {

    const { userId } = useContext(AuthContext)
    const [profileState, setProfile] = useState({})
    const location = useLocation()
    const { profileId } = useParams()

    const idToUse = location.pathname === "/my-profile" ? userId : profileId;


    useEffect(() => {

        getDoc(doc(firestoreDB, 'user-info', idToUse))
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


    }, [userId, profileId])



    return (
        <div className="max-w-lg mx-auto my-10 bg-white rounded-lg shadow-md p-5">
            {/* <img className="w-32 h-32 rounded-full mx-auto" src="https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/user-profile-icon.png" alt="Profile picture" /> */}
            <h2 className="text-center text-2xl font-semibold mt-3">{profileState.fullName}</h2>
            <p className="text-center text-gray-600 mt-1">{profileState.jobTitle}</p>
            <div className="flex justify-center mt-5">
                {location.pathname === "/my-profile" && userId ?
                    <>
                        <Link to="/user/my-posts" className="text-blue-500 hover:text-blue-700 mx-3">My posts</Link>
                        <Link to="/user/saved-posts" className="text-blue-500 hover:text-blue-700 mx-3">Saved posts</Link>
                    </> : ""
                }


                {/* <Link href="#" className="text-blue-500 hover:text-blue-700 mx-3">GitHub</Link> */}
            </div>
            <div className="mt-5">
                <h3 className="text-xl font-semibold">Bio</h3>
                <p className="text-gray-600 mt-2">{profileState.bio}</p>
            </div>
        </div>
    )
}