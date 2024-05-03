import { Link } from "react-router-dom"

export const ShortMaintenanceList = ({
  admin = undefined,
  maintenanceList,
  title,
}) => {
  return (
    <div>
      {maintenanceList.length ? (
        <div>
          <h3 className="dashboard-heading">{title}</h3>
          <div className="flex flex-col space-y-2 mb-6">
            {maintenanceList.map((ticket) => (
              <div
                className="p-2 bg-bluegreen-300 rounded"
                key={`ticket-${ticket.id}`}
              >
                <h4 className="font-bold">
                  {admin ? (
                    <Link to={`/maintenance/${ticket.id}/edit`}>
                      {ticket.maintenance.name}
                    </Link>
                  ) : (
                    ticket.maintenance.name
                  )}
                </h4>
                <div className="italic">
                  (Requested by {ticket.user.first_name} {ticket.user.last_name}
                  )
                </div>
                <div className="mb-2">
                  <div>Suggested Maintenance Interval: </div>
                  <div>
                    {ticket.maintenance.days_interval ? (
                      <div>{ticket.maintenance.days_interval} Days</div>
                    ) : (
                      <div>One-time maintenance</div>
                    )}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <div className="min-w-32">Date Needed: </div>
                  <div className="min-w-24">{ticket.date_needed}</div>
                </div>
                <div className="flex space-x-2">
                  <div className="min-w-32">Date Scheduled: </div>
                  <div className="min-w-24">
                    {ticket.date_scheduled ? ticket.date_scheduled : "Pending"}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <div className="min-w-32">Date Completed: </div>
                  <div className="min-w-24">
                    {ticket.date_completed
                      ? ticket.date_completed.split("T")[0]
                      : "Pending"}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <h3 className="dashboard-heading">{title}</h3>
          <div className="mb-4">
            There are no {title.toLowerCase()} tickets for this equipment
          </div>
        </div>
      )}
    </div>
  )
}
