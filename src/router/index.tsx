import { Route } from "react-router-dom";
import routes from "./routes";
import App from "../App";

function getRoutes() {
    return (
        <Route path='/' element={<App />}>
            {
                routes.map(route => {
                    return <Route key={route.name} path={route.path} element={route.element} />
                })
            }
        </Route>
    )
}

export default getRoutes;