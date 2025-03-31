import { useForm } from '../../hooks/useForm';
import { useNavigate } from "react-router"

export default function SearchComponent() {

    const navigate = useNavigate()

    const initialValues = {
        searchInput: '',
    }


    const { values, onChange } = useForm({
        initialValues
    })


    const onSubmit = (e) => {
        e.preventDefault()

        if (values.searchInput.trim() === '') {
            alert('Please, enter search input')
            return
        }

        navigate(`/search/${values.searchInput}`)
    }
    return (
        <>

            <form className="flex items-center w-full"
            onSubmit={onSubmit}>
                <div className="relative w-full">


                    <input type="text"
                        name='searchInput'
                        onChange={onChange}
                        value={values.searchInput}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 "
                        placeholder="Search..."
                        // required 
                        />

                    <button
                        type="submit"
                        className="absolute inset-y-0 right-0 px-3 text-sm font-medium text-white bg-blue-700 rounded-r-lg hover:bg-blue-800"
                    >
                        Search
                    </button>
                </div>
            </form>

        </>
    )
}