export default function Button({ label, type,  onClick, onSubmit }) {
  return (
    <button
      type={ type || "button"}
      onClick={onClick}
      onSubmit={onSubmit}
      className="w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-3 py-1 m-1"
    >
      {label}
    </button>
  );
}
