import { useContext } from "react"
import { AppContext } from "../context/AppWrapper"

export const SupplyRequestList = ({
  addedClasses = undefined,
  clickFunction,
  buttonClasses = undefined,
  supplyRequests,
  title,
}) => {
  const { user } = useContext(AppContext)

  return (
    <div className={addedClasses}>
      <header className="page-header">
        <h2 className="page-heading">
          {user.admin ? "Researcher" : "My"} {title}
        </h2>
      </header>
      <section className="w-4/5 mx-auto">
        {supplyRequests.length ? (
          <ul className=" flex-col space-y-1 items-center max-w-4xl mx-auto">
            <li className="flex flex-nowrap font-bold p-1">
              <div className="w-64">Item</div>
              <div className="w-36">Vendor</div>
              <div className="w-24">Price (each)</div>
              <div className="w-24">Quantity</div>
              <div className="w-48">Requested By</div>
              <div className="w-36">Date Requested</div>
              {title === "Open Supply Requests" ? (
                <div
                  className={`w-24 text-center text-bluegreen-600 bg-bluegreen-100 rounded p-1 ${buttonClasses}`}
                >
                  {user.admin && "Add to Cart"}
                </div>
              ) : (
                <div
                  className={`w-24 text-center text-bluegreen-600 bg-bluegreen-100 rounded ${buttonClasses}`}
                >
                  Mark Received
                </div>
              )}
            </li>
            {supplyRequests.map((request) => (
              <li
                className="flex flex-nowrap p-1 items-center"
                key={request.id}
              >
                <div className="w-64">{request.consumable.name}</div>
                <div className="w-36">{request.consumable.vendor}</div>
                <div className="w-24">${request.consumable.price}</div>
                <div className="w-24">{request.quantity}</div>
                <div className="w-48">
                  {request.researcher?.user.first_name
                    ? request.researcher?.user.first_name
                    : "Lab Manager"}{" "}
                  {request.researcher?.user.last_name &&
                    request.researcher?.user.last_name}
                </div>
                <div className="w-36">
                  {request.date_requested.split("T")[0]}
                </div>
                {title === "Open Supply Requests" ? (
                  <div className={`w-24 centered`}>
                    {user.admin && (
                      <button
                        className={`btn ${buttonClasses}`}
                        onClick={() => {
                          clickFunction(request)
                        }}
                      >
                        <i className="fa-solid fa-cart-plus"></i>
                      </button>
                    )}
                  </div>
                ) : (
                  <div className={`w-24 centered`}>
                    <button
                      className={`btn ${buttonClasses}`}
                      onClick={() => {
                        clickFunction(request)
                      }}
                    >
                      <i className="fa-solid fa-circle-check"></i>
                    </button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center text-lg mt-12">
            There are currently no {title}
          </div>
        )}
      </section>
    </div>
  )
}
