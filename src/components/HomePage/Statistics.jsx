
export const Statistics = ({ number, description, index, totalItems }) => {
    return (
      <div
        className={`border border-[#262626] p-4 lg:p-8 ${
          index === 0 ? "border-l-0" : "" // No left border for first item
        } ${index === totalItems - 1 ? "border-r-0" : ""}`} // No right border for last item
      >
        <h3 className="text-3xl font-bold pb-3">
          {number}
          <span className="text-yellow-500">+</span>
        </h3>
        <p className="text-[#98989A]">{description}</p>
      </div>
    );
  };