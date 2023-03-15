import ListGroup from "react-bootstrap/ListGroup";

function SensorDataListGroup({ children }) {
  return (
    <ListGroup className="h-75 w-50" style={{ overflowY: "auto" }}>
      {children}
    </ListGroup>
  );
}

export default SensorDataListGroup;
