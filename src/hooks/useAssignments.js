import { useContext } from "react";
import AssignmentContext from "../context/AssignmentProvider";

const useAssignments = () => {
	return useContext(AssignmentContext)
}

export default useAssignments