export default interface AuthGateway {
  login(body: LoginRequest): Promise<LoginResponse>;
  logout(): Promise<void>;
}

export type LoginRequest = {
  username: string;
  password: string;
};

export type LoginResponse = {
	"access_token": string,
	"expires_in": number,
	"refresh_expires_in": number,
	"refresh_token": string,
	"token_type": string
}
