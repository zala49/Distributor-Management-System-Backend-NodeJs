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