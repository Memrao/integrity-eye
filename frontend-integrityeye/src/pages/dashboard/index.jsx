import { useState } from "react";

const Dashboard = () => {
  const menuItems = [
    { name: "Home", icon: "🏠" },
    { name: "Classrooms", icon: "🖥️" },
    { name: "Live Monitoring", icon: "🔍" },
    { name: "Analytics", icon: "📊" },
    { name: "Reports", icon: "📋" },
    { name: "Settings", icon: "⚙️" },
  ];

  // State for classrooms
  const [classrooms, setClassrooms] = useState([
    { id: 1, room: "Room 01", img: "/path/to/classroom1.jpg" },
    { id: 2, room: "Room 02", img: "/path/to/classroom2.jpg" },
    { id: 3, room: "Room 03", img: "/path/to/classroom3.jpg" },
    { id: 4, room: "Room 04", img: "/path/to/classroom4.jpg" },
    { id: 5, room: "Room 05", img: "/path/to/classroom5.jpg" },
    { id: 6, room: "Room 06", img: "/path/to/classroom6.jpg" },
    { id: 7, room: "Room 07", img: "/path/to/classroom7.jpg" },
    { id: 8, room: "Room 08", img: "/path/to/classroom8.jpg" },
    { id: 9, room: "Room 09", img: "/path/to/classroom9.jpg" },
  ]);

  // State for modal and form
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentRoom, setCurrentRoom] = useState({ id: null, room: "", img: "" });

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4);

  // Search state
  const [searchQuery, setSearchQuery] = useState("");

  // Add or Update Classroom
  const handleSave = () => {
    if (currentRoom.id) {
      // Update classroom
      setClassrooms((prev) =>
        prev.map((cls) => (cls.id === currentRoom.id ? currentRoom : cls))
      );
    } else {
      // Add new classroom
      setClassrooms((prev) => [
        ...prev,
        { ...currentRoom, id: Date.now() }, // Generate unique ID
      ]);
    }
    setIsModalOpen(false);
    setCurrentRoom({ id: null, room: "", img: "" });
  };

  // Open modal for editing
  const handleEdit = (classroom) => {
    setCurrentRoom(classroom);
    setIsModalOpen(true);
  };

  // Delete classroom
  const handleDelete = (id) => {
    setClassrooms((prev) => prev.filter((cls) => cls.id !== id));
  };

  // Filter classrooms based on search query
  const filteredClassrooms = classrooms.filter((classroom) =>
    classroom.room.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination logic
  const indexOfLastClassroom = currentPage * itemsPerPage;
  const indexOfFirstClassroom = indexOfLastClassroom - itemsPerPage;
  const currentClassrooms = filteredClassrooms.slice(
    indexOfFirstClassroom,
    indexOfLastClassroom
  );

  const totalPages = Math.ceil(filteredClassrooms.length / itemsPerPage);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Open live monitoring for a classroom (could be a modal or new page)
  const handleLiveMonitoring = (classroomId) => {
    alert(`Live monitoring for ${classroomId} is now active!`);
    // Here you can add more complex logic like opening a modal or redirecting
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header */}
      <header className="flex justify-between items-center px-6 py-4 bg-gray-800 text-white">
        <h1 className="text-lg font-bold">Integrity Eye</h1>
        <input
          type="text"
          placeholder="Search"
          className="p-2 rounded-lg text-gray-700"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </header>

      <div className="flex flex-grow">
        {/* Sidebar */}
        <aside className="w-1/6 bg-gray-200 p-4">
          <nav>
            <ul>
              {menuItems.map((item, index) => (
                <li
                  key={index}
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-300 cursor-pointer"
                >
                  <span>{item.icon}</span>
                  <span>{item.name}</span>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-grow p-6">
          <h2 className="text-2xl font-bold mb-4">Cheating Prevention Dashboard</h2>

          {/* Classrooms */}
          <section className="mb-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold mb-2">Classrooms</h3>
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
              >
                Add Classroom
              </button>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {currentClassrooms.map((classroom) => (
                <div
                  key={classroom.id}
                  className="bg-white shadow-md rounded-lg overflow-hidden"
                >
                  <img
                    src={classroom.img}
                    alt={classroom.room}
                    className="w-full h-32 object-cover"
                  />
                  <div className="p-2 text-center">
                    <h4 className="font-semibold">{classroom.room}</h4>
                    <div className="flex justify-center space-x-2 mt-2">
                      <div className="space-y-2">
                        <button
                          onClick={() => handleEdit(classroom)}
                          className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(classroom.id)}
                          className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                        >
                          Delete
                        </button>
                      </div>
                      <button
                        onClick={() => handleLiveMonitoring(classroom.room)}
                        className="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                      >
                        Live Monitoring
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-center mt-4">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg mr-2"
              >
                Prev
              </button>
              <span className="px-4 py-2 text-gray-700">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg ml-2"
              >
                Next
              </button>
            </div>
          </section>
        </main>
      </div>

      {/* Footer */}
      <footer className="text-center py-4 bg-gray-800 text-white">
        <p>© 2024 Integrity Eye. All rights reserved.</p>
      </footer>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">
              {currentRoom.id ? "Edit Classroom" : "Add Classroom"}
            </h3>
            <input
              type="text"
              placeholder="Classroom Name"
              value={currentRoom.room}
              onChange={(e) => setCurrentRoom({ ...currentRoom, room: e.target.value })}
              className="border p-2 mb-4 w-full"
            />
            <input
              type="text"
              placeholder="Classroom Image URL"
              value={currentRoom.img}
              onChange={(e) => setCurrentRoom({ ...currentRoom, img: e.target.value })}
              className="border p-2 mb-4 w-full"
            />
            <div className="flex justify-between">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
