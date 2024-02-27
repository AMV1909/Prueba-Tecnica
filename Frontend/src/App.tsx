import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { PathRoutes } from "./Types/types.d";
import { ProtectedRoute } from "./Auth/ProtectedRoute";
import { PageLoader, Navbar } from "./Components";
import {
    Home,
    Login,
    Admin,
    Patients,
    Records,
    LaboratoryExams,
} from "./Pages";

import "./PageStyles.css";
import "./App.css";

export function App() {
    const [loading, setLoading] = useState(true);

    return (
        <>
            {loading ? (
                <PageLoader setLoading={setLoading} />
            ) : (
                <Router>
                    <Navbar />

                    <Routes>
                        <Route
                            path={PathRoutes.Home}
                            element={
                                <ProtectedRoute>
                                    <Home />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path={PathRoutes.Login}
                            element={
                                <ProtectedRoute>
                                    <Login />
                                </ProtectedRoute>
                            }
                        />

                        <Route
                            path={PathRoutes.Admin}
                            element={
                                <ProtectedRoute>
                                    <Admin />
                                </ProtectedRoute>
                            }
                        />

                        <Route
                            path={PathRoutes.Patients}
                            element={
                                <ProtectedRoute>
                                    <Patients />
                                </ProtectedRoute>
                            }
                        />

                        <Route
                            path={PathRoutes.Records}
                            element={
                                <ProtectedRoute>
                                    <Records />
                                </ProtectedRoute>
                            }
                        />

                        <Route
                            path={PathRoutes.Labs}
                            element={
                                <ProtectedRoute>
                                    <LaboratoryExams />
                                </ProtectedRoute>
                            }
                        />

                        <Route path="*" element={<h1>Not Found</h1>} />
                    </Routes>

                    <Toaster />
                </Router>
            )}
        </>
    );
}
