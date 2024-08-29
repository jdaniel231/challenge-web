import Feature from "./components/Feature"
import Footer from "./components/Footer"
import Navbar from "./components/Navbar"

function App() {
  
  return (
    <>
     <Navbar  />
     <div className="bg-gray-50">
       <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <Feature />
       </div>
     </div>
     <Footer />
    </>
  )
}

export default App
