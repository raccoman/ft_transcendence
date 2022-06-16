import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {

	public async login(): Promise<Number> {
		return 1234578;
	}

}
