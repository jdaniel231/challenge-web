import { useState } from "react";
import Button from "../elements/Button"
import Datepicker from "react-tailwindcss-datepicker";

const AddChallenge = () => {

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState({
    startDate: null,
    endDate: null,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('envio')
  }


  return (
    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <h3 className="text-2xl font-bold">
        Add Challenge
      </h3>

      <form action="" className="mt-10 flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-8">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Title
            </label>
            <div className="border border-gray-300 rounded-md shadow-sm focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500 transition-colors">
              <input
                type="text"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                id="title"
                className="mt-1 block w-full px-3 py-2 rounded-md border-transparent bg-gray-50 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm transition-shadow"
                placeholder="Title"
              />
            </div>
          </div>


          <div>
            <label 
              htmlFor="description" 
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Description
            </label>
            <div className="border border-gray-300 rounded-md shadow-sm focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500 transition-colors">
              <textarea
                id="description"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows="3"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Description"
              />

            </div>
          </div>
          <div className="border border-gray-300 rounded-md shadow-sm focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500 transition-colors">
            <Datepicker
              placeholder="Select date"
              minDate={new Date()}
              value={value}
              displayFormat="DD/MM/YYYY"
              onChange={(newValue) => setValue(newValue)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
        </div>
        <div className="mt-4">
         <Button>
          Add
         </Button>
        </div>
      </form>
    </div>
  )
}

export default AddChallenge