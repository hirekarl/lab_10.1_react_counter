import React, { useCallback, useEffect, useState } from "react"
import { Card, Button, ButtonGroup, ListGroup } from "react-bootstrap"
import type { status } from "../../types"

const Counter = () => {
  const MIN_COUNT = 0
  const MIN_STEP_VALUE = 1

  const [count, setCount] = useState<number>(MIN_COUNT)
  const [stepValue, setStepValue] = useState<number>(MIN_STEP_VALUE)
  const [countHistory, setCountHistory] = useState<number[]>([MIN_COUNT])
  const [status, setStatus] = useState<status>("Saving to localStorage...")

  // These handlers need to be wrapped in useCallback to
  // - use for both mouse and keyboard events
  // - memoize and update only on change in stepValue
  const handleDecrement = useCallback((): void => {
    setCount((prevCount) =>
      // Don't ever let count go below MIN_COUNT
      prevCount - stepValue <= MIN_COUNT ? MIN_COUNT : prevCount - stepValue
    )
  }, [stepValue])

  const handleIncrement = useCallback((): void => {
    setCount((prevCount) => prevCount + stepValue)
  }, [stepValue])

  const handleReset = (): void => {
    setCount(MIN_COUNT)
    setStepValue(MIN_STEP_VALUE)
    setCountHistory([MIN_COUNT])
  }

  const handleStepValueChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const newStepValue = parseInt(event.target.value)
    setStepValue(newStepValue > MIN_STEP_VALUE ? newStepValue : MIN_STEP_VALUE)
  }

  // Update countHistory
  useEffect(() => {
    // Prevent double registering of first history item.
    if (countHistory[countHistory.length - 1] !== count) {
      setCountHistory((prevCountHistory) => [...prevCountHistory, count])
    }
  }, [count, countHistory])

  // Save countHistory to localStorage as item with key "counts"
  useEffect(() => {
    // Not sure I need this setStatus right here?
    // But also not sure where else it would go...
    setStatus("Saving to localStorage...")
    try {
      localStorage.setItem("counts", JSON.stringify(countHistory))
      setStatus("Changes saved.")
    } catch (error) {
      setStatus(String(error))
    }
  }, [countHistory])

  // Set up event listeners for keyboard events
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === "ArrowUp") handleIncrement()
      else if (event.key === "ArrowDown") handleDecrement()
    }
    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [handleIncrement, handleDecrement])

  // Map the counts in countHistory as Bootstrap List Group Items
  const countHistoryList = countHistory.map((count, index) => (
    <ListGroup.Item key={index}>{count}</ListGroup.Item>
  ))

  return (
    <Card>
      <Card.Body className="text-center">
        <Card.Title className="my-3">
          <h2>Counter</h2>
        </Card.Title>
        <Card.Subtitle className="my-3">
          <h3>Current Count: {count}</h3>
        </Card.Subtitle>
        <ButtonGroup
          className="my-3"
          role="group"
          aria-label="Change Counter properties.">
          <Button
            variant="secondary"
            onClick={handleDecrement}
            disabled={count <= MIN_COUNT}>
            - Decrement
          </Button>
          <Button variant="primary" onClick={handleIncrement}>
            Increment +
          </Button>
          <Button variant="danger" onClick={handleReset}>
            Reset
          </Button>
        </ButtonGroup>
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
                min={MIN_STEP_VALUE}
                onChange={handleStepValueChange}
                value={stepValue}
              />
            </div>
          </div>
        </div>
        <div className="my-3">{status}</div>
      </Card.Body>
      <Card.Footer>
        <h3 className="mb-3 text-center">Count History</h3>
        <ListGroup className="mb-3">{countHistoryList}</ListGroup>
        <p className="text-muted text-center">
          Use ArrowUp to increment and ArrowDown to decrement.
        </p>
      </Card.Footer>
    </Card>
  )
}

export default Counter
