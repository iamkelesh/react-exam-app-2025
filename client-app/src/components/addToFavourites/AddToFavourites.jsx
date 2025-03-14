import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import Button from 'react-bootstrap/Button';

import { addToFavourites, checkForFavourite, removeFromFavorites } from "../../services/favouritesFirestoreService";


function AddToFavourites({ userId, postId, ownerId }) {
    const [canAddFavorite, setCanAddFavorite] = useState(false)
    const [canBeRemoved, setCanBeRemoved] = useState(false)

    function addFavouritesHandler() {
        // Add to favourites
        addToFavourites({ postId, userId })
            .then(() => {
                setCanAddFavorite(false)
                setCanBeRemoved(true)
                window.alert('Added to favourites')
            })
            .catch(error => console.error(error))

    }

    function removeFavouritesHandler() {
        // Remove from favourites
        removeFromFavorites({ userId, postId }).then(() => {
            setCanAddFavorite(true)
            setCanBeRemoved(false)
            window.alert('Post removed from favourites successfully!')
        })
    }


    useEffect(() => {

        checkForFavourite({ postId, userId })
            .then(({ canBeFavourite, canBeRemoved }) => {
                setCanAddFavorite(canBeFavourite)
                setCanBeRemoved(canBeRemoved)
            })

    }, [postId])

    return (<>
        {
            canAddFavorite && (
                <button onClick={addFavouritesHandler}>Add to favourites</button>
            )
        }

        {
            canBeRemoved && (
                <button onClick={removeFavouritesHandler}>Remove from favourites</button>
            )
        }


    </>
    )
}

export default AddToFavourites