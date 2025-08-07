import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Button, Stack, Container, Grid } from "@mui/material";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import EventNoteIcon from "@mui/icons-material/EventNote";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import { motion } from "framer-motion";

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2 },
  }),
};

const Home = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #a0cad4ff, #6dd5ed)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        px: 3,
      }}
    >
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Typography
            variant="h2"
            fontWeight="bold"
            fontFamily={"inherit"}
            gutterBottom
            color="#00325bff"
            mt={3}
          >
            AllSet - Smart Study Scheduler
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: "#005da9ff",
              maxWidth: 700,
              mx: "auto",
              fontFamily: "inherit",
            }}
          >
            Plan, schedule, and achieve your study goals efficiently. Powered by
            AI, personalized for you.
          </Typography>
        </motion.div>

        <Grid container spacing={4} justifyContent="center" mt={5}>
          {[
            {
              icon: <MenuBookIcon sx={{ fontSize: 40, color: "#1976d2" }} />,
              title: "Create Study Plans",
              description:
                "Organize your syllabus into structured study plans to stay focused and in control.",
            },
            {
              icon: <EventNoteIcon sx={{ fontSize: 40, color: "#0288d1" }} />,
              title: "Auto-Generate Schedules",
              description:
                "Let the system create optimal daily schedules based on your goals, deadlines, and availability.",
            },
            {
              icon: (
                <RocketLaunchIcon sx={{ fontSize: 40, color: "#01579b" }} />
              ),
              title: "Boost Productivity",
              description:
                "Track your tasks, mark your progress, and stay motivated throughout your academic journey.",
            },
          ].map((card, i) => (
            <Grid item xs={12} sm={6} md={4} key={i}>
              <motion.div
                custom={i}
                initial="hidden"
                animate="visible"
                variants={cardVariants}
              >
                <Box
                  sx={{
                    p: 3,
                    bgcolor: "white",
                    borderRadius: 4,
                    boxShadow: 5,
                    height: "100%",
                    transition: "transform 0.3s",
                    "&:hover": {
                      transform: "translateY(-8px)",
                    },
                  }}
                >
                  {card.icon}
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    {card.title}
                  </Typography>
                  <Typography color="text.secondary">
                    {card.description}
                  </Typography>
                </Box>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Stack direction="row" justifyContent="center" mt={6} spacing={3}>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate("/register")}
              sx={{
                bgcolor: "#0d47a1",
                "&:hover": { bgcolor: "#1565c0" },
              }}
            >
              Get Started
            </Button>
            <Button
              variant="outlined"
              color="inherit"
              size="large"
              onClick={() => navigate("/login")}
              sx={{
                borderColor: "white",
                color: "white",
                "&:hover": {
                  borderColor: "lightgray",
                  background: "rgba(255,255,255,0.1)",
                },
              }}
            >
              Login
            </Button>
          </Stack>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Home;

// import React from "react";
// import { Box, Typography, Button, Container, Stack } from "@mui/material";
// import { motion } from "framer-motion";

// const Home = () => {
//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         background: "linear-gradient(to right, #00325bff, #21CBF3)",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         color: "white",
//         textAlign: "center",
//         p: 4,
//       }}
//     >
//       <Container maxWidth="md">
//         <motion.div
//           initial={{ opacity: 0, y: -50 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 1 }}
//         >
//           <Typography variant="h2" fontWeight="bold" gutterBottom>
//             Welcome to Smart Study Scheduler
//           </Typography>
//         </motion.div>

//         <motion.div
//           initial={{ opacity: 0, y: 50 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 1, delay: 0.5 }}
//         >
//           <Typography variant="h6" mb={4}>
//             Organize your tasks, track progress, and stay productive with your
//             personalized smart study planner.
//           </Typography>
//         </motion.div>

//         <motion.div
//           initial={{ scale: 0 }}
//           animate={{ scale: 1 }}
//           transition={{ duration: 0.8, delay: 1 }}
//         >
//           <Stack
//             direction={{ xs: "column", sm: "row" }}
//             spacing={2}
//             justifyContent="center"
//           >
//             <Button
//               variant="contained"
//               size="large"
//               sx={{
//                 backgroundColor: "#ffffff",
//                 color: "#2196F3",
//                 fontWeight: "bold",
//                 "&:hover": { backgroundColor: "#e0f2f1" },
//               }}
//             >
//               Get Started
//             </Button>
//             <Button
//               variant="outlined"
//               size="large"
//               sx={{
//                 borderColor: "#ffffff",
//                 color: "white",
//                 fontWeight: "bold",
//                 "&:hover": { backgroundColor: "#1976d2" },
//               }}
//             >
//               Learn More
//             </Button>
//           </Stack>
//         </motion.div>
//       </Container>
//     </Box>
//   );
// };

// export default Home;
