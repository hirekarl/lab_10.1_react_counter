import { Card, Button, ButtonGroup, ListGroup } from "react-bootstrap"

export default function Counter() {
  return (
    <Card>
      <Card.Body className="text-center">
        <Card.Title className="my-3">
          <h2>Counter</h2>
        </Card.Title>
        <Card.Subtitle className="my-3">
          <h3>Current Count: 0</h3>
        </Card.Subtitle>
        <ButtonGroup
          className="my-3"
          role="group"
          aria-label="Change Counter properties.">
          <Button variant="secondary">- Decrement</Button>
          <Button variant="primary">Increment +</Button>
          <Button variant="danger">Reset</Button>
        </ButtonGroup>
        <Card.Text>
          <div className="container my-3">
            <div className="row g-3 align-items-center">
              <div className="col-3 offset-3">
                <label htmlFor="step-value-input" className="col-form-label">
                  Step Value:
                </label>
              </div>
              <div className="col-3">
                <input
                  id="step-value-input"
                  type="number"
                  className="form-control"
                />
              </div>
            </div>
          </div>
          <div className="my-3">
            <em>Changes saved.</em>
          </div>
        </Card.Text>
      </Card.Body>
      <Card.Footer>
        <h3 className="mb-3 text-center">Count History</h3>
        <ListGroup className="mb-3">
          <ListGroup.Item>1</ListGroup.Item>
          <ListGroup.Item>2</ListGroup.Item>
          <ListGroup.Item>3</ListGroup.Item>
        </ListGroup>
        <p className="text-muted text-center">
          Use ArrowUp to increment and ArrowDown to decrement.
        </p>
      </Card.Footer>
    </Card>
  )
}
