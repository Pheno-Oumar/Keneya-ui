
export interface UserRequestInterface {
    nom: string;
    prenom: string;
    email: string;
    password: string;
    telephone?: string;
}

export interface UserResponse{
    success: boolean;
    message: string;
    data: UserRequestInterface;
    date: string;
}
