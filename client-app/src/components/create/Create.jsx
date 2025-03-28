import { useContext } from 'react';

import styles from './Create.module.css';

import AuthContext from '../../contexts/authContext';
import { useNavigation } from '../../contexts/navigationContext';

import { useForm } from '../../hooks/useForm';
import { createNewPost } from '../../services/otherPostServices';
import Dropdown from '../dropdown /Dropdown';
import Dropdown2 from '../dropdown2/Dropdown2';


function Create() {
  const navigate = useNavigation();
  const { accessToken, userId } = useContext(AuthContext)

  const categories = ["News", "Discussion", "Review", "Support"]  
  const initialValues = {
    title: '',
    body: '',
    ownerId: userId,
    category: ''
  }

  const { values, onChange, onSubmit } = useForm({ submitHandler: createNewPost, initialValues, navigate, accessToken });



  const hancleDropdownChange = (selectedCategory) => {
    onChange({ target: { name: 'category', value: selectedCategory } })
  }

  return (

    <div className="isolate px-6 py-24 sm:py-32 lg:px-8">


      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Create your post </h2>
        <p className="mt-2 text-lg leading-8 text-gray-600">Share what's on you mind, whether it's news, review, discusison or you need support for something.</p>
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
          <Dropdown2 onSelect={hancleDropdownChange} categories={categories} currentChoice={values.category}/>

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
          <button type="submit" className="block w-full rounded-md bg-cyan-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Create post</button>
        </div>

      </form>
    </div>

  );
}

export default Create;





// function oldCreate() {
//   return (
//     <div classNameNameName={styles.container}>
//       <form id={styles.contact} action="" method="post"
//         onSubmit={onSubmit}
//       >
//         <h3 classNameNameName={styles.h3}>Create post</h3>
//         <h4 classNameNameName={styles.h4}>Enter post details!</h4>

//         <fieldset classNameNameName={styles.fieldset}>
//           <input
//             placeholder="Title"
//             type="text"
//             tabIndex={2}
//             required
//             name='title'
//             classNameNameName={styles.input}
//             onChange={onChange}
//             value={values.title}
//           />
//         </fieldset>

//         <fieldset classNameNameName={styles.fieldset}>
//           <input
//             placeholder="Body"
//             type="text"
//             tabIndex={1}
//             required
//             autoFocus
//             name='body'
//             classNameNameName={styles.input}
//             onChange={onChange}
//             value={values.body}
//           />
//         </fieldset>

//         <fieldset>
//           <button
//             name="submit"
//             type="submit"
//             id="contact-submit"
//             data-submit="...Sending"
//           >
//             Submit
//           </button>
//         </fieldset>

//       </form>
//     </div>
//   )
// }