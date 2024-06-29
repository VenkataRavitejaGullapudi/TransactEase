const InputBox = ({ label, type, placeholder, onChange }) => {
  const elementId = `input-${Math.random()}`;

  return (
    <div className="m-1">
      {label && <label  htmlFor={elementId} className="leading-none text-sm font-medium text-left py-2">{label}</label>}
      <input
        type={type || "text"}
        onChange={onChange}
        placeholder={placeholder}
        id={elementId}
        className="my-1 w-full px-2 py-2 border rounded-md border-slate-200 text-sm"
      />
    </div>
  );
};

export default InputBox;
