import { createContext, useState } from "react";

const AssignmentContext = createContext({})

export const AssignmentProvider = ({ children }) => {
	const [assignments, setAssignments] = useState()

	return (
		<AssignmentContext.Provider value={{ assignments, setAssignments }}>
			{children}
		</AssignmentContext.Provider>
	)
}

export default AssignmentContext