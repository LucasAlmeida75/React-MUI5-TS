import { AppThemeProvider, AuthProvider, DrawerProvider } from "./shared/contexts";
import { Login, MenuLateral } from "./shared/components";
import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./routes";
import './shared/forms/TraducoesYup';

export const App = () => {
  return (
    <AuthProvider>
      <AppThemeProvider>
		<Login>
			<DrawerProvider>
				<BrowserRouter>

					<MenuLateral>
						<AppRoutes />
					</MenuLateral>

				</BrowserRouter>
			</DrawerProvider>
		</Login>
      </AppThemeProvider>
    </AuthProvider>
  );
}