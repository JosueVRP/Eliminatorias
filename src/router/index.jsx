import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomeView,MatchView,SignInView } from "../pages";

export default function Router() {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomeView/>}/>
                <Route path="/sign-in" element={<SignInView/>}/>
                <Route path="/matches" element={<MatchView/>}/>
            </Routes>
        </BrowserRouter>
    )
}