const DashboardBanner = ({ title, message }) => {
  return (
    <div className="bg-beige font-playfair p-4 rounded-lg shadow-md ">
      <h2 className="text-xl font-semibold mb-2 text-blue-950">{title}</h2>
      <p className="text-teal">{message}</p>
    </div>
  );
};

export default DashboardBanner;
