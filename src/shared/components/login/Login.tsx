import { Box, Button, Card, CardActions, CardContent, CircularProgress, TextField, Typography } from "@mui/material"
import { useAuthContext } from "../../contexts";
import { useState } from "react";
import * as yup from 'yup';

interface ILoginProps {
    children: React.ReactNode;
}

const loginSchema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required().min(5)
});

export const Login: React.FC<ILoginProps> = ({children}) => {
    const [isLoading, setIsLoading] = useState(false);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const { isAuthenticated, login } = useAuthContext();

    if ( isAuthenticated) {
        return (
            <>{children}</>
        )
    }

    const handleSubmit = () => {
        setIsLoading(true);
        loginSchema.validate({email, password}, {abortEarly: false})
            .then((dadosValidados) => {
                login(dadosValidados.email, dadosValidados.password)
                    .then(() => {
                        setIsLoading(false);
                    });
            })
            .catch((errors: yup.ValidationError) => {
                setIsLoading(false);
                errors.inner.forEach((error) => {
                    if (error.path === 'email') {
                        setEmailError(error.message);
                    } else if (error.path === 'password') {
                        setPasswordError(error.message);
                    }
                });
            });
    }

    //else
    return (
        <Box width="100vw" height="100vh" display="flex" alignItems="center" justifyContent="center">
            <Card>
                <CardContent>
                    <Box display="flex" flexDirection="column" gap={2} width={250}>
                        <Typography variant="h6" align="center">Identifique-se</Typography>

                        <TextField
                            fullWidth
                            label="E-mail"
                            type="email"
                            disabled={isLoading}
                            error={!!emailError}
                            helperText={emailError}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onKeyDown={() => setEmailError('')}
                        />
                        <TextField
                            fullWidth
                            label="Senha"
                            type="password"
                            disabled={isLoading}
                            error={!!passwordError}
                            helperText={passwordError}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onKeyDown={() => setPasswordError('')}
                        />
                    </Box>
                </CardContent>
                <CardActions>
                    <Box width="100%" display="flex" justifyContent="center">
                        <Button
                            variant="contained"
                            onClick={handleSubmit}
                            disabled={isLoading}
                            endIcon={isLoading ? <CircularProgress variant="indeterminate" color="inherit" size={20}/> : undefined}
                        >
                            Entrar
                        </Button>
                    </Box>
                </CardActions>
            </Card>
        </Box>
    )
}