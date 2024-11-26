import {Header} from '../components/Index'

export default function TestPage() {
    return (
      <div className="min-h-screen flex flex-col items-center bg-white">
        <Header/>
        {/* Main Content */}
        <main className="flex-1 container mx-auto p-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
            
          <div className="flex flex-col items-center">
            <h2 className="text-lg font-bold text-orange-500 mb-4">Cooking</h2>
            <img
              src="/images/HappyCooking.jpg"
              alt="Cooking"
              className="rounded-lg shadow-md hover:shadow-lg transition w-full"
            />
          </div>
          <div className="flex flex-col items-center">
            <h2 className="text-lg font-bold text-orange-500 mb-4">Health</h2>
            <img
              src="/images/FamilyHealth.jpg"
              alt="Health"
              className="rounded-lg shadow-md hover:shadow-lg transition w-full"
            />
          </div>
          <div className="flex flex-col items-center">
            <h2 className="text-lg font-bold text-orange-500 mb-4">Shopping</h2>
            <img
              src="/images/FamilyShopping.jpg"
              alt="Shopping"
              className="rounded-lg shadow-md hover:shadow-lg transition w-full"
            />
          </div>
        </main>
      </div>
    );
  }


  