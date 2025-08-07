import React from "react";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Checkbox,
  Stack,
  Box,
  Tooltip,
  Divider,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { format } from "date-fns";

const TaskCard = ({ task, onDelete, onEdit, onStatusToggle }) => {
  const isCompleted = task.status === "completed";

  const handleCheckboxChange = () => {
    const updatedStatus = isCompleted ? "pending" : "completed";
    onStatusToggle(task._id, updatedStatus);
  };

  return (
    <Card
      sx={{
        borderLeft: isCompleted ? "6px solid green" : "6px solid #1976d2",
        borderRadius: 2,
        boxShadow: 3,
        marginBottom: 2,
        backgroundColor: isCompleted ? "#f0fff4" : "#fff",
        position: "relative",
      }}
    >
      <CardContent>
        <Box>
          <Typography
            variant="h6"
            fontWeight={600}
            fontFamily="inherit"
            gutterBottom
          >
            {task.title}
          </Typography>

          <Box
            sx={{
              display: "inline-block",
              border: "1px solid #1976d2",
              borderRadius: "4px",
              padding: "2px 8px",
              marginBottom: "6px",
            }}
          >
            <Typography
              variant="caption"
              fontWeight={500}
              fontFamily="inherit"
              color="#1976d2"
            >
              Priority: {task.priority}
            </Typography>
          </Box>

          <Typography
            variant="body2"
            color="text.secondary"
            fontFamily="inherit"
          >
            Deadline: {format(new Date(task.deadline), "dd MMM yyyy")}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            fontFamily="inherit"
          >
            Estimated Time: {task.estimatedTime} hr
            {task.estimatedTime > 1 ? "s" : ""}
          </Typography>

          <Typography
            variant="body2"
            color={isCompleted ? "green" : "orange"}
            fontWeight={500}
            fontFamily="inherit"
            mt={0.5}
          >
            Status: {isCompleted ? "Completed ✅" : "Pending"}
          </Typography>
        </Box>

        {/* Divider Line */}
        <Divider sx={{ my: 2 }} />

        {/* Icons Below */}
        <Stack direction="row" justifyContent="center" spacing={2}>
          <Tooltip title="Mark Completed/Pending">
            <Checkbox
              checked={isCompleted}
              onChange={handleCheckboxChange}
              sx={{
                color: isCompleted ? "green" : "grey.500",
                "&.Mui-checked": {
                  color: "green",
                },
              }}
            />
          </Tooltip>

          <Tooltip title="Edit Task">
            <IconButton onClick={() => onEdit(task)}>
              <EditIcon color="primary" />
            </IconButton>
          </Tooltip>

          <Tooltip title="Delete Task">
            <IconButton onClick={() => onDelete(task._id)}>
              <DeleteIcon color="error" />
            </IconButton>
          </Tooltip>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default TaskCard;

// import React from "react";
// import {
//   Card,
//   CardContent,
//   Typography,
//   IconButton,
//   Checkbox,
//   Stack,
//   Box,
//   Tooltip,
// } from "@mui/material";
// import DeleteIcon from "@mui/icons-material/Delete";
// import EditIcon from "@mui/icons-material/Edit";
// import CheckCircleIcon from "@mui/icons-material/CheckCircle";
// import { format } from "date-fns";

// const TaskCard = ({ task, onDelete, onEdit, onStatusToggle }) => {
//   const isCompleted = task.status === "completed";

//   const handleCheckboxChange = () => {
//     const updatedStatus = isCompleted ? "pending" : "completed";
//     onStatusToggle(task._id, updatedStatus);
//   };

//   return (
//     <Card
//       sx={{
//         borderLeft: isCompleted ? "6px solid green" : "6px solid #1976d2",
//         borderRadius: 2,
//         boxShadow: 3,
//         marginBottom: 2,
//         backgroundColor: isCompleted ? "#f0fff4" : "#fff",
//         position: "relative",
//       }}
//     >
//       <CardContent>
//         <Stack
//           direction="row"
//           justifyContent="space-between"
//           alignItems="center"
//         >
//           <Box>
//             <Typography variant="h6" fontWeight={600} fontFamily={"inherit"}>
//               {task.title}
//             </Typography>
//             <Typography variant="body2" color="text.secondary">
//               Deadline: {format(new Date(task.deadline), "dd MMM yyyy")}
//             </Typography>
//             <Typography variant="body2" color="text.secondary">
//               Estimated Time: {task.estimatedTime} hr
//               {task.estimatedTime > 1 ? "s" : ""}
//             </Typography>
//             <Typography
//               variant="body2"
//               color={isCompleted ? "green" : "orange"}
//               fontWeight={500}
//               mt={0.5}
//             >
//               Status: {isCompleted ? "Completed ✅" : "Pending"}
//             </Typography>
//           </Box>

//           <Stack direction="row" alignItems="center" spacing={1}>
//             <Tooltip title="Mark Completed/Pending">
//               <Checkbox
//                 checked={isCompleted}
//                 onChange={handleCheckboxChange}
//                 sx={{
//                   color: isCompleted ? "green" : "grey.500",
//                   "&.Mui-checked": {
//                     color: "green",
//                   },
//                 }}
//               />
//             </Tooltip>

//             <Tooltip title="Edit Task">
//               <IconButton onClick={() => onEdit(task)}>
//                 <EditIcon color="primary" />
//               </IconButton>
//             </Tooltip>

//             <Tooltip title="Delete Task">
//               <IconButton onClick={() => onDelete(task._id)}>
//                 <DeleteIcon color="error" />
//               </IconButton>
//             </Tooltip>
//           </Stack>
//         </Stack>
//       </CardContent>
//     </Card>
//   );
// };

// export default TaskCard;
