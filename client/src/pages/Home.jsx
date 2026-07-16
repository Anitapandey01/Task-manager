import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-blue-200 flex items-center justify-center px-6">
      <div className="bg-white shadow-xl rounded-2xl p-10 max-w-3xl text-center">

        <h1 className="text-5xl font-bold text-blue-700 mb-4">
          Task Manager
        </h1>

        <p className="text-gray-600 text-lg leading-8">
          Organize your daily tasks efficiently with our secure and easy-to-use
          Task Management Application. Create, update, track, and manage your
          tasks anytime, anywhere.
        </p>

        <div className="mt-10 flex justify-center gap-5 flex-wrap">

          <Link
            to="/login"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-6 py-3 rounded-lg font-semibold transition"
          >
            Register
          </Link>

        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className="bg-gray-50 rounded-xl p-5 shadow">
            <h2 className="text-xl font-semibold text-blue-700">
              Secure Login
            </h2>

            <p className="text-gray-600 mt-2">
              User authentication with JWT for secure access.
            </p>
          </div>

          <div className="bg-gray-50 rounded-xl p-5 shadow">
            <h2 className="text-xl font-semibold text-blue-700">
              Manage Tasks
            </h2>

            <p className="text-gray-600 mt-2">
              Create, update, delete and organize your daily tasks.
            </p>
          </div>

          <div className="bg-gray-50 rounded-xl p-5 shadow">
            <h2 className="text-xl font-semibold text-blue-700">
              Responsive UI
            </h2>

            <p className="text-gray-600 mt-2">
              Works smoothly across desktop, tablet, and mobile devices.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}

export default Home;