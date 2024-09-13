
const Button = ({ children, handleClick }) => {
  return (
    <div>
      <button
        type="submit"
        onClick={handleClick}
        className="mt-4 w-full rounded-lg bg-gray-200 text-black px-3 py-2 text-sm font-semibold shadow-md hover:bg-indigo-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-transform duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl"
      >
        {children}
      </button>
    </div>
  )
}

export default Button