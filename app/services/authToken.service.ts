import axios from "axios";
import { development, environment } from "../../config/environment";
import { BadRequestError, UnAuthorizedError } from "../common/ApiErrorResponse";
import { UserInfoEntity } from "../model/Tables/userInfo.model";
import { connectToDatabase } from "../utils/DatabaseUtils";

const getAccessTokenOption = (env: 'development') => {
    switch (env) {
        case 'development': {
            return {
                method: 'POST',
                url: development.managementApiCred.url,
                headers: { 'content-type': 'application/x-www-form-urlencoded' },
                data: new URLSearchParams({
                    grant_type: 'client_credentials',
                    client_id: development.managementApiCred.client_id,
                    client_secret: development.managementApiCred.client_secret,
                    audience: development.managementApiCred.audience
                })
            };
        }
    }
};

export class AuthTokenService {
    static async getAccessToken() {
        const options = getAccessTokenOption(environment)
        return new Promise((res, rej) => {
            axios.request(options).then(function (response: any) {
                res(response.data.access_token)
            }).catch(function (error: any) {
                rej(error);
            });
        })
    };

    static async getUserInfoByToken(token: string) {
        try {
            const result = await axios.get(`https://${process.env.AUTH0_DOMAIN}/userinfo`, {
                headers: { authorization: token },
            });
            return result.data;
        } catch (error: any) {
            console.error(error);
            if(error.response && error.response?.status === 401){
                throw new UnAuthorizedError();
            }
            throw new BadRequestError();
        };
    };

    static async getUserInfoDbByAuth0UserId(ReqAuth0UserId: string): Promise<UserInfoDetails> {
        const database = await connectToDatabase();
        const userInfoRepo = database.getRepository(UserInfoEntity);
        const userInfoData = await userInfoRepo.findOne({ where: { Auth0UserId: ReqAuth0UserId } });
        return userInfoData!;
    };
};

type UserInfoDetails = {
    Id: string,
    Auth0UserId: string,
    Name: string,
    Email: string,
    EmailVerified: boolean,
    Nickname: string,
    Picture: string,
    Role: string,
    Auth0RoleId: string
};