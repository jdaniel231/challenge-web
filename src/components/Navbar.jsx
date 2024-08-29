const Navbar = () => {
  return (
    <div className="bg-white shadow">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <p className="text-2xl font-bold text-gray-800">
            Code Challenge
          </p>
          <div className="flex items-center justify-center">
            <button className="bg-indigo-500 rounded px-3 py-1.5 text-black my-4">
              Sign In
              
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar