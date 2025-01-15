import React, {Component} from "react";
import {Navigate , useLocation} from "react-router-dom"
import ApiService from "./ApiService";

// For every protected routes
export const protectedRoute = ({element : Component}) => {
    const location = useLocation();
    return ApiService.isAuthenticated() ? Component : <Navigate to="/login" replace state={{from: location}}/>
}

// For every Admin Routes
export const adminRoute = ({element : Componet}) => {
    const location = useLocation();
    return ApiService.isAdmin() ? Component : <Navigate to="/login" replace state={{from: location}}/>
}