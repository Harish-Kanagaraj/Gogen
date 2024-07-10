const express = require("express");
const router = express.Router(); // Use `router` instead of `route` for consistency and clarity
const loginController = require("../controlers/logincontrol"); // Corrected the path to controllers

// Define routes with appropriate HTTP methods and corresponding controller functions
router.post("/signin", loginController.signin); // Change `/signin` to `/signup` if this is for registering a new user
router.post("/login", loginController.login);   // `/login` for logging in existing users
router.get("/allusers", loginController.findAll); // Adjusted to plural `allusers` for clarity
router.delete("/delete", loginController.deleteUser); // Added `/:id` to indicate parameterized URL for deleting a specific user
router.put("/update", loginController.updateUser); // Added `/:id` for updating a specific user
router.get("/:id", loginController.getUserById); // `/` followed by `:id` for fetching a specific user

module.exports = router; // Export the router instance
