const Heading = ({ label }) => {
//   return <div className="font-bold text-4xl pt-6">{label}</div>;
  return <div className="font-bold text-4xl pt-2">
    <img className="mx-1 my-2 mb-10" src="/logo.png" alt="TransactEase"/>
    {label}
  </div>;
};

export default Heading;
