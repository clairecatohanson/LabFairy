import { Link } from "react-router-dom"

export const ShortMaintenanceList = ({
  admin = undefined,
  maintenanceList,
  title,
}) => {
  return (
    <div>
      <h3>{title}</h3>
      {maintenanceList.map((ticket) => (
        <div key={`ticket-${ticket.id}`}>
          <h4>
            {admin ? (
              <Link to={`/maintenance/${ticket.id}/edit`}>
                {ticket.maintenance.name}
              </Link>
            ) : (
              ticket.maintenance.name
            )}
          </h4>
          <div>
            Date Needed: {ticket.date_needed} (Requested by{" "}
            {ticket.user.first_name} {ticket.user.last_name})
          </div>
          <div>
            Date Scheduled:{" "}
            {ticket.date_scheduled ? ticket.date_scheduled : "Pending"}
          </div>
          <div>
            Suggested Maintenance Interval:{" "}
            {ticket.maintenance.days_interval ? (
              <div>{ticket.maintenance.days_interval} Days</div>
            ) : (
              <div>One-time maintenance</div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
