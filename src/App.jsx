import Footer from "./components/Footer"
import Navbar from "./components/Navbar"

function App() {
  
  return (
    <>
     <Navbar  />
     <div className="bg-gray-100 min-h-screen">
       <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
         <h1 className="text-3xl font-bold text-gray-900">
           Welcome to the challenge
         </h1>
         <p className="mt-4 text-lg text-gray-500">
           This is a challenge to test your skills in web development.
         </p>
       </div>
     </div>
     <Footer />
    </>
  )
}

export default App
