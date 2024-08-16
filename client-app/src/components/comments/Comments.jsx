import {useEffect} from "react";
import SingleComment from "../singleComment/SingleComment";
import {useParams} from "react-router-dom"
import {useContext} from "react";


import {getCommentsForPost} from "../../services/commentService"
import {useState} from "react";
import AuthContext from "../../contexts/authContext";
import AddComment from "../addComment/AddComment";
import DemoComponent from "../demoComponent/DemoComponent.jsx";


function Comments() {
    const [commentsState, setCommentsState] = useState([])
    const {postId} = useParams()

    const {isAuthenticated} = useContext(AuthContext)

    const updateComments = (newComment) => {

        if (newComment.length > 0) {
            let newCommentsState = [...commentsState, ...newComment]
            setCommentsState(newCommentsState)
        }
        console.log(commentsState)
    }

    useEffect(() => {
        getCommentsForPost({postId, updateComments}).catch(error => console.log(error))
    }, [postId])

    useEffect(() => {
        console.log(commentsState)
    })

    let demoArray = [
        // {
        //     date: '1',
        //     number: 123,
        //     id: '#$S!J@5xwdYdVN%b6YEXv7KhbJxkPaQC*kU6%kjv2%TRE^yZTo5FvVpFYif$HX8h'
        // },
        // {
        //     date: '123',
        //     number: 123,
        //     id: 'g!v*sH$pgQoa#Q$CbcrYHouSCE7&Efe8z8BP9Wf4%8Qc#KweTg@2wFDbeM^oR!wM'
        // },
        // {
        //     date: '22',
        //     number: 123,
        //     id: '^32wiN2pdYKT$98nd4CLBW!WgPS7TAH$8HBQxoace@f#y7$Tse^UNiRvJcUikLhB'
        // },
        // {
        //     date: '33',
        //     number: 123,
        //     id: '2DK#74mYjk7t^4RuG%S@gzv36baLBqw%peVR58B!$9f@Vq!HfGbYeHRAbLts%7Z4'
        // },
        // {
        //     date: 'to43534day',
        //     number: 123,
        //     id: '@G&XHzR%3pHZ$riw7s8j%jwgFBMvNg@rod6#sHc%Ww!pYRmojY%K5EaGRGKCErq#'
        // },
    ]

    // function demoButtonHandler() {
    //     console.log(commentsState.length)
    //     console.log(commentsState)
    //     let mapped
    //     if (demoArray.length > 0) {
    //         mapped = demoArray.map(comment => {
    //                 console.log(comment);
    //                 return comment.date
    //             }
    //         )
    //         console.log(mapped)
    //     }
    // }

    return (
        <div className="container mt-5">
            <div className="row  d-flex justify-content-center">
                <div className="col-md-8">
                    <div className="headings d-flex justify-content-between align-items-center mb-3">
                        <h5>User comments</h5>
                        <div className="buttons">
              <span className="badge bg-white d-flex flex-row align-items-center">

              </span>
                        </div>
                    </div>

                    {isAuthenticated && (
                        <div className="blog-comments-section">
                            <AddComment updateComments={updateComments}/>
                        </div>)}

                    {commentsState.map((commentData) => {
                        return <SingleComment key={commentData.id} text={commentData.text}/>
                    })}

                    {commentsState.length > 0 && (
                        <p className="no-comment">show comments or smth.</p>
                    )}

                    {/*<button onClick={demoButtonHandler}>Demo</button>*/}
                    {demoArray.map((input) => {
                        return <DemoComponent key={input.id} date={input.date} number={input.number}/>
                    })}
                </div>
            </div>
        </div>
    )
}

export default Comments