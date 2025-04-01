import { useContext, useEffect, useRef } from 'react';
import { useForm } from '../../hooks/useForm';
import { useParams } from 'react-router-dom';

import AuthContext from '../../contexts/authContext';
import ErrorContext from '../../contexts/errorContext';

import { useNavigation } from '../../contexts/navigationContext';

import { updatePostDetails } from '../../services/otherPostServices';
import { getPostsDetails } from '../../services/getPostService';

import Dropdown2 from '../dropdown2/Dropdown2';

const initialValues = {
  title: '',
  subTitle: '',
  body: '',
  category: '',
}
const categories = ["News", "Discussion", "Review", "Support"]

function UpdatePost() {
  const { showErrorHandler } = useContext(ErrorContext)
  const { accessToken } = useContext(AuthContext)

  const { postId } = useParams()
  const navigate = useNavigation();

  const isMounted = useRef(false);

  const formSubmit = async (e) => {
    try {
      updatePostDetails(e)
    } catch (error) {
      console.error("Error while updating post at UpdatePost.jsx: ", error)
      showErrorHandler('Error while updating post!')
    }
  }

  const { values, onChange, onSubmit } = useForm({ submitHandler: formSubmit, initialValues, accessToken, navigate, postId });

  const hancleDropdownChange = (selectedCategory) => {
    onChange({ target: { name: 'category', value: selectedCategory } })
  }

  useEffect(() => {

    isMounted.current = true

    getPostsDetails(postId)
      .then(postData => {

        if (!isMounted.current) return

        onChange({ target: { name: 'title', value: postData.title } })
        onChange({ target: { name: 'subTitle', value: postData.subTitle } })
        onChange({ target: { name: 'body', value: postData.body } })
        onChange({ target: { name: 'category', value: postData.category } })

      })
      .catch(error => {
        console.error("Error while getting post details at PostDetails.jsx: ", error)
        showErrorHandler('Error while getting post details!')
      })

    return () => {
      isMounted.current = false;
    };
  }, [postId])

  return (
    <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]" aria-hidden="true">
        <div className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
        // style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
        ></div>
      </div>

      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Text </h2>
        <p className="mt-2 text-lg leading-8 text-gray-600">Text who ever you want where ever you want any time you want enjoy contacting freinds and families.</p>
      </div>

      <form action="#" method="POST"
        onSubmit={onSubmit}
        className="mx-auto mt-16 max-w-xl sm:mt-20">
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">


          <div className="sm:col-span-2">
            <label htmlFor="email" className="block text-sm font-semibold leading-6 text-red-600">Title</label>
            <div className="mt-2.5">
              <input
                type="text"
                name="title"
                id="title"
                autoComplete="title"
                onChange={onChange}

                value={values.title}

                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset shadow-blue-500 ring-blue-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6" />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="company" className="block text-sm font-semibold leading-6 text-black">Sub title</label>
            <div className="mt-2.5">
              <input
                type="text"
                name="subTitle"
                id="subTitle"
                onChange={onChange}
                autoComplete="organization"
                value={values.subTitle}

                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset shadow-blue-500 ring-blue-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6" />
            </div>
          </div>

          {/* <Dropdown /> */}

          <Dropdown2 onSelect={hancleDropdownChange} categories={categories} currentChoice={values.category} />

          <div className="sm:col-span-2">
            <label htmlFor="message" className="block text-sm font-semibold leading-6 text-green-600">Post body</label>
            <div className="mt-2.5">
              <textarea
                name="body"
                id="body"
                rows="10"
                onChange={onChange}

                value={values.body}

                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></textarea>
            </div>
          </div>



        </div>

        <div className="mt-10">
          <button type="submit" className="block w-full rounded-md bg-cyan-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Update post</button>
        </div>

      </form>
    </div>
  );
}

export default UpdatePost;